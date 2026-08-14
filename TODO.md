# TODO: Wedding Guestbook

Add a public guestbook to the wedding site using the existing Firebase project.

## Firebase details

- Firebase project ID: `tim-apple-8ad80`
- The project currently hosts `bestmormon.com`.
- Keep the wedding site hosted on GitHub Pages at <https://llamashoes.github.io/jr/>; Firebase is only the guestbook backend.

## Setup

- [ ] In the Firebase Console, enable Cloud Firestore for `tim-apple-8ad80`.
- [ ] Register a Firebase web app for the wedding site and add `llamashoes.github.io` as an authorized domain if required.
- [ ] Copy the public Firebase web configuration into this repository. Do **not** add a service-account key or other private credentials.
- [ ] Add a `weddingGuestbook` Firestore collection.
- [ ] Add Firestore rules that let visitors create pending entries and read approved entries, but never approve, edit, or delete entries.
- [ ] Add the guestbook form and approved-message list to `index.html`, preserving the GeoCities styling.
- [ ] Validate and limit the name/message lengths, strip markup, add a hidden honeypot field, and prevent repeat rapid submissions.
- [ ] Add Firebase App Check or equivalent abuse protection before broadly sharing the site.
- [ ] Provide a simple moderation workflow in the Firebase Console: change an entry's `status` from `pending` to `approved`.
- [ ] Test successful submission, failed validation, pending-entry privacy, approved-entry display, and the GitHub Pages deployment.

## Suggested document shape

```text
weddingGuestbook/{documentId}
  name: string
  message: string
  status: "pending" | "approved"
  createdAt: server timestamp
```

