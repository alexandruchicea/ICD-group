# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Marketing website for ICD Group (real estate development + energy solutions, Bucharest, Romania). Two independently-built apps in one repo, wired together by a PM2 `ecosystem.config.js` at the root:

- `client/` — Angular 20 SSR frontend (the actual monorepo `package.json` lives here).
- `server/` — Express + TypeScript API whose sole job is the contact form (reCAPTCHA verify → send email).

There is no root `package.json`; run `npm` commands from inside `client/` or `server/`.

## Commands

### Client (`cd client`)
- `npm start` — dev server on `http://localhost:4200` (`ng serve`, defaults to Romanian, no localization).
- `npm run serve -- --configuration=en` / `... =ro` — dev server for a specific locale (the `serve` `en`/`ro` targets in `angular.json`).
- `npm run build` — production build (localized ro+en, output to `dist/client/`).
- `npm run serve:ssr:client` — run the built SSR server (`node dist/client/server/server.mjs`, port 4000).
- `npm test` — Karma + Jasmine unit tests (headless Chrome). To run a single test, temporarily use `fdescribe`/`fit` in the `.spec.ts` — there is no name-filter flag configured.
- `ng extract-i18n` — regenerate `src/locale/messages.xlf` after adding/changing translatable text.

### Server (`cd server`)
- `npm start` — build then run in watch mode (`tsc` → then `nodemon dist/server.js`). Note: `tsc` compiles to `dist/`, and the process runs the compiled JS from `dist/`, not the `.ts` source.
- `npm run build-ts` — one-off compile (`tsc --skipLibCheck`).
- The `server/README.md` is stale: it references `npm run dev` and `src/index.ts`, neither of which exist. The real entry point is `src/server.ts`.

### Deploy (root)
- `pm2 start ecosystem.config.js` — runs both apps: `icd-client` (port 4000, `serve:ssr:client`) and `icd-server` (port 5000, `cwd: ./server/dist`, `server.js`). Prod is fronted by a reverse proxy at `https://icdd.ro`.

## Architecture

### Client
- **Standalone + zoneless.** No NgModules; components are `standalone: true` and lazy-loaded via `loadComponent` in `src/app/app.routes.ts` (only `home` is eager). Change detection is zoneless (`provideZonelessChangeDetection` in `app.config.ts`) — do not rely on Zone.js auto-detection; inject `ChangeDetectorRef` and call `markForCheck`/`detectChanges` when updating state from async callbacks (see `contact.component.ts`).
- **SSR.** Entry is `src/server.ts` (Express + `AngularNodeAppEngine`), built to `dist/client/server/server.mjs`. Any browser-only API (DOM, `localStorage`, `window.grecaptcha`, GSAP) must be guarded with `isPlatformBrowser(PLATFORM_ID)` — several components already do this.
- **i18n.** Source locale is **Romanian** (`ro`) — Romanian strings live inline in templates; English comes from `src/locale/messages.en.xlf`. Production builds emit both locales. Language switching (`services/language.service.ts`) is done by redirecting to a `/en` or `/ro` URL prefix (full page reload via `location.href`), driven by `LOCALE_ID` — not by an in-app state toggle.
- **API base URL** is hardcoded in `src/app.config.url.ts` (`isDevMode()` → `http://localhost:3001/api`, else `https://icdd.ro/api`), not read from an env file.
- **Animations.** GSAP with `ScrollTrigger` + `ScrollSmoother`, initialized inside `isPlatformBrowser` guards. `ScrollSmoother` expects `#smooth-wrapper` / `#smooth-content` elements to exist in the template before it's created.
- **reCAPTCHA v2** is rendered explicitly via the global `window.grecaptcha` (loaded through a `<script>`, typed with a `declare global`), not via the `ng-recaptcha` component API.

### Server
- Thin single-purpose API. `src/server.ts` wires Helmet, CORS, a global rate limiter (100 req / 15 min per IP), JSON body parsing, then mounts `routes/contact.ts` under `/api` plus a `/health` check.
- **Contact flow** (`POST /api/contact`): validate required fields + email regex → `services/recaptcha.ts` verifies the token against Google's `siteverify` → `services/mail.ts` (`MailService`) sends an email via Nodemailer's Gmail transport to `TO_EMAIL`. Responses and logs are timestamped in `Europe/Bucharest` (helpers in `utils/timezone.ts`).
- **CORS** allows `localhost:4200`/`localhost:3000` in dev and `process.env.PRODUCTION_URL` in production.

### Server environment variables
Loaded from `server/.env` (via `dotenv`, resolved relative to the compiled file). None are committed.
- `RECAPTCHA_SECRET` (required) — Google reCAPTCHA v2 secret.
- `SMTP_USER`, `SMTP_PASS` — Gmail account credentials for the Nodemailer transport.
- `TO_EMAIL` — recipient of contact-form submissions.
- `PRODUCTION_URL` — allowed CORS origin in production.
- `PORT` (default 3001 in code; PM2 sets 5000), `NODE_ENV`.
