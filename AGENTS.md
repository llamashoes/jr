# Repository Guidelines

## Project Structure & Module Organization

This is a dependency-free static site published from `main` through GitHub Pages. Keep the page structure in `index.html`, presentation rules in `styles.css`, and Firebase guestbook behavior in `guestbook.js`.

- `firebase-config.js` contains public Firebase and App Check identifiers.
- `firestore.rules` is the deployed Cloud Firestore security ruleset.
- `public/` holds static assets such as `engagement-portrait.jpeg` and `favicon.svg`.
- `README.md` documents setup; `TODO.md` records planned work.

Do not introduce a build system for small page changes. Use relative asset paths so the site continues to work at `https://llamashoes.github.io/jr/`.

## Build, Test, and Development Commands

No package manager, build step, linter, or automated test suite is configured.

Run a local server instead of opening the page from `file://` URLs, since ES modules and Firebase require HTTP:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/` for layout-only work. With App Check enforcement, test real Firebase writes on the deployed GitHub Pages URL; do not weaken rules or register `localhost` as a production reCAPTCHA domain.

## Coding Style & Naming Conventions

Use two-space indentation in HTML and JavaScript. Keep CSS compact and preserve the intentionally over-the-top GeoCities visual language: high-contrast colors, beveled controls, Courier/Comic Sans-era typography, and accessible labels.

Use lowercase kebab-case for CSS classes and filenames (`guestbook-loading-copy`), camelCase for JavaScript variables/functions (`loadMessages`), and clear Firestore fields (`name`, `message`, `status`, `createdAt`). Render guest messages with DOM APIs or `textContent`; never insert visitor input with `innerHTML`.

## Testing Guidelines

Manually verify form validation, honeypot behavior, reload behavior, and responsive layout. For Firebase changes, verify that a submitted document has the expected `status`, public queries show only approved records, and App Check enforcement still permits the deployed site.

## Commit & Pull Request Guidelines

Use short, imperative commit subjects consistent with history, such as `Add moderated Firebase guestbook` or `Remove guestbook reload animation`. Stage only related files. Include a concise PR description, the tested URL, and screenshots for visible design changes.

## Security & Configuration

Public Firebase web configuration may be committed. Never commit service-account keys, reCAPTCHA secret keys, debug tokens, or access tokens. Keep Firestore client rules restrictive: visitors may create only valid guestbook documents and must never edit or delete them.
