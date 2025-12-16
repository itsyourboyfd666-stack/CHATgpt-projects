# App Store Web Hub (Vite + React)

A Codespaces-ready prototype that showcases a curated list of external web apps and a lightweight AI app maker. The frontend is built with Vite + React and runs locally on port **5173**.

## Quick start (GitHub Codespaces)
1. Open this repository in a Codespace.
2. Run `npm install` inside the `web` folder (automated if you use the devcontainer).
3. Start the dev server: `npm run dev -- --host`.
4. Open the forwarded port **5173** to view the app.

## Local development
```bash
cd web
npm install
npm run dev -- --host
```

## Available scripts
- `npm run dev` – start the Vite dev server
- `npm run build` – build the production bundle
- `npm run preview` – preview the production build locally
- `npm run lint` – run ESLint over the source

## Features
- **Catalog browser:** Filter and search through a small set of curated web apps; open them in a new tab for safe launch.
- **AI App Maker:** Enter a prompt, pick a template, and generate a downloadable HTML starter with live iframe preview.
- **Codespaces friendly:** Port forwarding configured for Vite (5173) with automated dependency install via the devcontainer.

## Repository layout
- `src/` – React components and styles for the web hub.
- `public/` – static assets served by Vite.
- `docs/architecture.md` – the broader architecture blueprint.
- `README.md` (root) – high-level overview and links.
