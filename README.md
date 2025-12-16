# App Store Web Platform

This repository now includes a runnable Vite + React prototype that demonstrates an App Store-style web hub and an AI app maker. Use it directly in GitHub Codespaces or run it locally.

## Run in GitHub Codespaces
1. Open this repo in a Codespace.
2. Dependencies install automatically via the devcontainer (or run `npm install` inside `web/`).
3. Start the dev server from the `web` folder: `npm run dev -- --host`.
4. Open forwarded port **5173** to view the experience.

## Local run
```bash
cd web
npm install
npm run dev -- --host
```

## What’s inside
- `web/` – Vite + React frontend with a curated catalog view and AI bundle generator.
- `docs/architecture.md` – the broader architecture and delivery plan.

The prototype highlights safe external launch links, search/filterable discovery, and a downloadable AI-generated HTML starter.
