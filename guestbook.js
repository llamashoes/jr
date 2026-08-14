import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, limit, query, serverTimestamp, where } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app-check.js";
import { appCheckSiteKey, firebaseConfig } from "./firebase-config.js";

const form = document.querySelector("#guestbook-form");
const nameInput = document.querySelector("#guestbook-name");
const messageInput = document.querySelector("#guestbook-message");
const websiteInput = document.querySelector("#guestbook-website");
const status = document.querySelector("#guestbook-status");
const messages = document.querySelector("#guestbook-messages");
const reloadButton = document.querySelector("#guestbook-reload");
const submitButton = form.querySelector('button[type="submit"]');
const cooldownMs = 30_000;
const collectionName = "weddingGuestbook";

function configured() {
  return Object.values(firebaseConfig).every((value) => value && !value.startsWith("PASTE_"));
}

function clean(value) {
  return value.replace(/<[^>]*>/g, "").replace(/[<>]/g, "").replace(/\s+/g, " ").trim();
}

function setStatus(message, kind = "") {
  status.textContent = message;
  status.className = `guestbook-status ${kind}`;
}

function formatDate(timestamp) {
  if (!timestamp?.toDate) return "Just now";
  return timestamp.toDate().toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
}

function displayEntries(entries) {
  messages.replaceChildren();
  if (!entries.length) {
    const empty = document.createElement("p");
    empty.className = "loading-message";
    empty.textContent = "Be the first to leave a message!";
    messages.append(empty);
    return;
  }
  entries.sort((a, b) => (b.data().createdAt?.toMillis?.() || 0) - (a.data().createdAt?.toMillis?.() || 0));
  entries.forEach((entry) => {
    const data = entry.data();
    const article = document.createElement("article");
    article.className = "guestbook-entry";
    const heading = document.createElement("h3");
    heading.textContent = `♥ ${data.name}`;
    const note = document.createElement("p");
    note.textContent = data.message;
    const date = document.createElement("time");
    date.textContent = formatDate(data.createdAt);
    article.append(heading, note, date);
    messages.append(article);
  });
}

let db;
if (!configured()) {
  setStatus("Guestbook setup is almost complete — please check back soon.", "warning");
  messages.innerHTML = '<p class="loading-message">The guestbook is not connected yet.</p>';
  submitButton.disabled = true;
  reloadButton.disabled = true;
} else {
  const app = initializeApp(firebaseConfig);
  if (appCheckSiteKey) initializeAppCheck(app, { provider: new ReCaptchaV3Provider(appCheckSiteKey), isTokenAutoRefreshEnabled: true });
  db = getFirestore(app);
  loadMessages();
}

async function loadMessages() {
  messages.innerHTML = '<p class="loading-message">Loading guestbook messages...</p>';
  try {
    const approved = query(collection(db, collectionName), where("status", "==", "approved"), limit(50));
    displayEntries((await getDocs(approved)).docs);
  } catch {
    messages.innerHTML = '<p class="loading-message">Messages are temporarily unavailable. Please try again later.</p>';
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!db || websiteInput.value) return;
  const name = clean(nameInput.value);
  const message = clean(messageInput.value);
  if (!name || !message) return setStatus("Please enter both your name and a message.", "error");
  if (name.length > 60 || message.length > 500) return setStatus("Please keep your name under 60 characters and your message under 500.", "error");
  const lastSubmission = Number(localStorage.getItem("weddingGuestbookLastSubmission") || 0);
  const remaining = cooldownMs - (Date.now() - lastSubmission);
  if (remaining > 0) return setStatus(`Please wait ${Math.ceil(remaining / 1000)} seconds before submitting another message.`, "error");

  submitButton.disabled = true;
  setStatus("Sending your message...", "");
  try {
    await addDoc(collection(db, collectionName), { name, message, status: "pending", createdAt: serverTimestamp() });
    localStorage.setItem("weddingGuestbookLastSubmission", String(Date.now()));
    form.reset();
    setStatus("Thank you! Your message will appear after approval. ♥", "success");
  } catch {
    setStatus("We couldn't send that message. Please try again later.", "error");
  } finally {
    submitButton.disabled = false;
  }
});

reloadButton.addEventListener("click", loadMessages);
