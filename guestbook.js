import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, limit, query, serverTimestamp, where } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { getToken, initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app-check.js";
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

function showLoading(isReload) {
  messages.replaceChildren();
  const loading = document.createElement("div");
  loading.className = "loading-message";
  const note = document.createElement("p");
  note.textContent = isReload ? "CONTACTING THE GUESTBOOK SERVER... PLEASE WAIT!" : "Loading guestbook messages...";
  loading.append(note);
  if (isReload) {
    const bar = document.createElement("div");
    bar.className = "guestbook-loading-bar";
    bar.setAttribute("role", "progressbar");
    bar.setAttribute("aria-label", "Reloading guestbook messages");
    bar.setAttribute("aria-valuetext", "Loading");
    const fill = document.createElement("span");
    bar.append(fill);
    loading.append(bar);
    const finePrint = document.createElement("small");
    finePrint.textContent = "This may take a moment on our 56k connection...";
    loading.append(finePrint);
  }
  messages.append(loading);
}

let db;
let appCheckReady = Promise.resolve();
if (!configured()) {
  setStatus("Guestbook setup is almost complete — please check back soon.", "warning");
  messages.innerHTML = '<p class="loading-message">The guestbook is not connected yet.</p>';
  submitButton.disabled = true;
  reloadButton.disabled = true;
} else {
  const app = initializeApp(firebaseConfig);
  if (appCheckSiteKey) {
    const appCheck = initializeAppCheck(app, { provider: new ReCaptchaV3Provider(appCheckSiteKey), isTokenAutoRefreshEnabled: true });
    appCheckReady = getToken(appCheck, false);
  }
  db = getFirestore(app);
  loadMessages(false);
}

async function loadMessages(isReload = false) {
  showLoading(isReload);
  try {
    await appCheckReady;
    const approved = query(collection(db, collectionName), where("status", "==", "approved"), limit(50));
    const [snapshot] = await Promise.all([
      getDocs(approved),
      isReload ? new Promise((resolve) => window.setTimeout(resolve, 1200)) : Promise.resolve()
    ]);
    displayEntries(snapshot.docs);
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
    await appCheckReady;
    await addDoc(collection(db, collectionName), { name, message, status: "approved", createdAt: serverTimestamp() });
    localStorage.setItem("weddingGuestbookLastSubmission", String(Date.now()));
    form.reset();
    setStatus("Thank you! Your message is now in the guestbook. ♥", "success");
  } catch {
    setStatus("We couldn't send that message. Please try again later.", "error");
  } finally {
    submitButton.disabled = false;
  }
});

reloadButton.addEventListener("click", () => loadMessages(true));
