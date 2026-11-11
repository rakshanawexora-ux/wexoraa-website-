# Wexoraa Infotech

A Next.js App Router / TypeScript website with a brand-led Motion hero, connected service pages, 12-question digital-strength survey and email-only enquiries.

## Run

Node 24 / npm 11 are tested. In your checkout:

```sh
npm ci
npm run dev
```

Cloud tasks should use the existing isolated checkout at `/workspace/wexoraa-website-`, without creating a worktree unless requested. If needed, use `npm ci --cache /workspace/.npm-cache` in this cloud environment.

## Validate

```sh
npm run lint
npm run typecheck
npm run build
npx playwright test
```

Build before browser tests; they start the production server. Chromium defaults to `/usr/bin/chromium`; override PLAYWRIGHT_CHROMIUM_PATH elsewhere. Tests cover all content routes, responsive/accessibility checks, scoring, survey flows, cursor interaction, form failure/retry and mocked email-handler security/delivery acceptance. No real provider email has been sent.

## Routes

- `/`: full homepage, pointer-reactive depth/light visual, original SVG doodles, parallax, embedded 12-question survey.
- `/solutions`, `/solutions/build`, `/solutions/operate`, `/solutions/grow`.
- `/services` and 12 `/services/[slug]` pages with problems, approach, deliverables, FAQ and enquiry links.
- `/work` and two `/work/[slug]` illustrative studio concepts. No commissioned client work or results are fabricated.
- `/about`, `/process`, `/contact`, `/privacy`.
- `/business-assessment`, `/business-assessment/thank-you`.
- `/api/enquiry`, `/sitemap.xml`, `/robots.txt`.

Service/project content is centralized in src/content/catalog.ts. The official SVG is preserved unchanged. UI greens are #83C040 and #53B900, with darker accessible text and derived tonal surfaces.

## Survey score

Exactly 12 questions: 4 contextual (industry, stage, priorities, timing) and 8 scored capability questions. Known capability answers earn 0–3 points with equal weight. Overall = earned ÷ eligible maximum × 100. Unknown/not-applicable answers are excluded. At least 4 known capability responses and all 12 answered questions are required for a score. Categories show digital presence, customer journey, systems/operations, marketing/measurement.

The method and bands are visible in the result. This is an explained self-report rubric, not a validated audit, external benchmark or revenue predictor. Results are available without contact capture. Only selected business answers persist in tab session storage; contacts do not. The server recalculates the score when an assessment enquiry is sent.

## Enquiry configuration

Copy `.env.example` to `.env.local` locally, or enter values securely in hosting settings:

- RESEND_API_KEY: server-only Resend API credential.
- WEXORAA_FROM_EMAIL: **bare email address on a verified sending domain**.
- WEXORAA_LEAD_EMAIL: approved receiving inbox, bare email address.
- NEXT_PUBLIC_WEXORAA_PHONE and NEXT_PUBLIC_WEXORAA_WHATSAPP: approved business numbers. WhatsApp includes country code.
- NEXT_PUBLIC_SITE_URL: actual HTTPS deployment origin, required for canonical/sitemap and indexable robots output.

Never commit credentials or send them in chat. Public values are embedded at build time and require a rebuild. Resend access requires outbound HTTPS to api.resend.com. No domain or credentials are currently supplied; forms display an honest configuration notice and return 503 rather than claiming delivery.

## Email behavior and limits

The handler uses Zod validation, a 16KB streaming body limit, same-origin browser checks, honeypot, temporary hashed throttling, bounded duplicate state, escaped HTML/plain-text templates, provider idempotency and a timeout. Contact details, consent timestamp, all survey answers and a server-calculated result are included for assessment leads. No form contents are logged by the handler.

Success appears only after an email provider response with an acceptance ID. Acceptance is not guaranteed inbox delivery. Failure preserves entered values for retry. No database or admin dashboard is created; there is no durable application lead backup. Mailbox/provider retention and legal/privacy details need business approval.

Temporary throttling and duplicate maps are process-local and reset on restart; use platform WAF/shared rate limiting for multi-instance serverless production. Vercel-provided forwarding metadata is used only when VERCEL is set. Other deployments share one conservative process bucket unless adapted to their trusted proxy.

See docs/DEPLOYMENT.md, docs/QA_RESULTS.md, docs/SCORING.md and DESIGN_SYSTEM.md. Real provider delivery, approved business/privacy details and deployment verification remain launch prerequisites; a production-readiness claim is not made.

## Studio-wide motion layer

Inner-page heroes now include a pointer-reactive, selectable Build/Operate/Grow scene. Service discovery supports category filters, keyword search and a resettable empty state. Catalog/project/engineering cards share pointer tilt and a positional highlight; sections enter with translation only so text contrast remains stable. The custom cursor is available across routes.

The homepage includes an original silent 8-second MP4 brand graphic (`public/motion/wexoraa-studio.mp4`, approximately 473KB) and a 40KB WebP poster. It uses `preload="none"`, starts on request and has play/pause controls. The site-wide Pause motion control pauses ambient motion and active film playback; reduced-motion preferences disable nonessential pointer/parallax effects. The footer is rebuilt as an enquiry panel, grouped navigation and a quiet animated brand motif.

The optional source renderer is `scripts/render-studio-film.mjs`. It requires Chromium, Playwright's video tooling, system ffmpeg and the existing font/logo assets. The cloud's prepared video-tooling cache can be selected with `PLAYWRIGHT_BROWSERS_PATH=/workspace/.playwright node scripts/render-studio-film.mjs`; another machine needs its own installed browser/video tooling and `PLAYWRIGHT_CHROMIUM_PATH` if Chromium is elsewhere. The committed film and poster mean rerendering is not required for install/build/start. Temporary render files go to ignored `.studio-render/`.

## Imported UI/UX skill

The user-requested UI UX Pro Max skill is vendored at `.agents/skills/ui-ux-pro-max`, with MIT license and pinned source revision in IMPORTED.md. Read its SKILL.md and run its Python search script by the absolute installed path. Adopted project guidance is in `design-system/wexoraa-infotech/MASTER.md`; official brand constraints override mismatched generic palettes/fonts. The motion pause control is integrated into the header so it cannot cover search or enquiry fields.
