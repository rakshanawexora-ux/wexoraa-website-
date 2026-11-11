# Wexoraa Infotech

A Next.js App Router + TypeScript website with a modern minimal agency design, image-led storytelling, Material 3-inspired UI and interactive business discovery.

## Develop

Node.js 24 and npm 11 are tested.

```sh
cd /workspace/wexoraa-website-
npm ci --cache /workspace/.npm-cache
npm run dev
```

Use the existing isolated checkout; do not create a worktree unless requested. No secrets are required to run the homepage or browser-only assessment. On another machine, run `npm ci` in your project folder; the workspace cache option is specific to this cloud environment.

## Validate

```sh
npm run lint
npm run typecheck
npm run build
npx playwright test
```

Tests start the production server, so build first. System Chromium defaults to `/usr/bin/chromium`; set PLAYWRIGHT_CHROMIUM_PATH to another installed Chromium executable where needed. Screenshots are saved under `/workspace/artifacts/redesign-<width>.png` in cloud runs.

## Implemented

- Complete agency homepage redesign with Space Grotesk / DM Sans, generous editorial typography, rounded media, tonal Material-inspired components and responsive layouts.
- Original optimized WebP artwork, explicitly labelled as studio concepts.
- Fine-pointer cursor accent, contextual cursor labels, magnetic CTA, bounded hero parallax, viewport movement, image zoom and hover transitions. Reduced-motion and touch alternatives.
- Two-step homepage problem finder with four challenge-specific recommendation paths.
- `/business-assessment`: 15-question browser-only flow, conditional 14-question manual-process path, accurate progress, native radio/multi-select cards, up-to-three ranked priorities, skip/back/revision, session-only answer persistence and transparent deterministic recommendations.
- Header/footer, solution tabs, process accordion, contact availability route and updated preview privacy information.
- Automated interaction, image-loading, responsive, accessibility, cursor, reduced-motion and assessment tests.

## Current limits

The assessment does not collect contacts or submit leads. Its result explicitly states that no data has been sent to Wexoraa. Email infrastructure, verified company contacts, finalized privacy/legal details, supporting service/solution/case-study routes, full SEO crawl configuration and deployment validation remain separate work. This is not a complete production lead-generation system.

Official logo, approved client evidence, testimonials and contact numbers have not been supplied. Never invent these. Main navigation points to implemented homepage sections. Contact route honestly explains when company contacts are unconfigured.

## Configuration

`.env.example` lists planned Resend credentials and optional approved phone/WhatsApp values. Credentials must stay server-only and must not be committed. NEXT_PUBLIC_SITE_URL is the actual HTTPS deployment origin; public variables require a rebuild after changes. Phone and WhatsApp links only render when configured.

Email-only lead capture has no durable lead backup. Provider acceptance does not guarantee inbox delivery. Future implementation requires safe templates, Zod validation, request limits, duplicate/spam protection, accepted-only success, retries, secure credentials and shared/platform rate limits appropriate for serverless instances.

See DESIGN_SYSTEM.md, docs/UX_STRATEGY.md, docs/HEURISTIC_EVALUATION.md, docs/QA_RESULTS.md and docs/DEPLOYMENT.md. All fonts and illustrations are self-hosted; fonts retain their OFL notices.
