# Jen & Ryan's Wedding Website

A delightfully over-the-top, GeoCities-inspired wedding announcement for Jen and Ryan's reception on September 28, 2026.

## View the site

The website is published with GitHub Pages at:

**https://llamashoes.github.io/jr/**

## What's here

- `index.html` — the complete single-page wedding announcement
- `styles.css` — the circa-1999 colors, animations, beveled windows, and responsive layout
- `public/engagement-portrait.jpeg` — the featured photo
- `public/favicon.svg` — the browser icon
- `guestbook.js` — the Firebase-backed guestbook behavior
- `firebase-config.js` — public Firebase web configuration (fill this in before launch)
- `firestore.rules` — Firestore rules for public, moderation-only guestbook access

## Edit locally

No build tools or dependencies are required. Open `index.html` directly in a browser, or serve this folder with any simple local web server.

Changes pushed to the `main` branch are published through GitHub Pages.

See [TODO.md](TODO.md) for the planned Firebase-backed guestbook.

## Enable the guestbook

1. In Firebase project `tim-apple-8ad80`, create a Firestore database in production mode.
2. Register a Web app, add `llamashoes.github.io` to Authorized domains if Firebase requests it, and paste its **public** configuration into `firebase-config.js`. Never add a service-account key.
3. In Firestore Database → Rules, publish the contents of `firestore.rules`.
4. Enable Firebase App Check for the Web app (reCAPTCHA v3), paste its site key into `appCheckSiteKey` in `firebase-config.js`, then enforce App Check for Cloud Firestore.
5. To moderate, open Firestore Database → `weddingGuestbook`, and change a submitted document’s `status` from `pending` to `approved`.

The site reads only documents where `status` is `approved`; pending notes are never shown publicly.
