# Architecture & Delivery Plan

This document outlines a pragmatic path to build a web-based “App Store” experience with AI-assisted app generation.

## Product pillars
- **Catalog & discovery:** Paginated browsing, categories, search, ratings, curated features.
- **Safe launching:** External apps open via new tabs or sandboxed iframes with a safelisted domain policy and CSP/headers.
- **Developer portal:** Authenticated submissions, media uploads (icons/screens), review queue, and publishing controls.
- **AI App Maker:** Prompt + template picker that scaffolds a web app, shows a live preview, and allows download/publish.

## Suggested stack
- **Frontend:** React + Vite, Tailwind for fast UI, React Router, and component testing (Vitest/RTL).
- **Backend:** FastAPI or Fastify with OpenAPI schema; JWT/OAuth; Prisma/SQLAlchemy toward Postgres.
- **Storage:** Postgres for metadata; S3-compatible bucket for icons/screenshots/build artifacts; Redis for cache/queues.
- **AI service:** Internal endpoint mediating LLM calls; returns generated ZIP or preview bundle.
- **Deployment:** Dockerized services; Nginx/edge CDN for static assets; HTTPS and WAF; observability via structured logs + metrics.

## Data model (MVP)
- **User**: `id`, `email`, `role`, `plan`, `verified`, timestamps
- **App**: `id`, `ownerId`, `name`, `description`, `category`, `launchUrl`, `iconUrl`, `screenshots[]`, `status`, `rating`, `installs`
- **AppVersion**: `id`, `appId`, `changelog`, `createdAt`
- **Review**: `userId`, `appId`, `stars`, `text`, `createdAt`
- **AIProject**: `id`, `ownerId`, `prompt`, `template`, `bundleUrl`, `previewUrl`, `status`, `createdAt`

## Key flows
1. **Browse/search**: REST or GraphQL API with pagination and filters; client caching via SWR/RTK Query.
2. **App detail**: Hero, screenshots, reviews, “Open” button → new tab or iframe with sandbox/csp; track view/open analytics.
3. **Submit app**: Developer fills metadata and uploads assets → review queue → publish on approval.
4. **AI generation**: Prompt + template → LLM → scaffold bundle → serve preview URL; allow ZIP download or “Publish” into catalog.

## Security & compliance
- CSP + iframe sandboxing; domain safelist; input validation and file scanning; rate limiting.
- Auth with short-lived tokens + refresh; optional passkey/OAuth; role-based permissions (user/dev/admin).
- Logging/auditing of submissions, publishes, and AI generations; alerting on anomalies.

## Milestones
1) **MVP catalog**: Auth, catalog browsing, manual app submission, safe external launch.  
2) **Quality layer**: Ratings/reviews, moderation tools, analytics.  
3) **AI App Maker v1**: 1–2 templates, prompt → bundle, live preview + download.  
4) **Publish from AI**: Promote generated bundle to catalog as a new app entry with assets.  
5) **Commercialization (optional)**: Paid plans, external checkout links, or per-install billing.

## Testing & operations
- Component/unit tests for UI + API contracts; E2E smoke (Playwright/Cypress) for browse/install/open.
- Health checks, request tracing, latency/error dashboards; SLOs for API and AI latency.

## Next steps
- Scaffold the frontend (Vite + React + Tailwind) with tabs: Discover, Categories, AI Maker, My Apps.
- Implement backend skeleton (FastAPI/Fastify) with OpenAPI schema for catalog and auth.
- Add AI generation stub service returning template bundles; wire preview iframe.
