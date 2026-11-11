# Wexoraa Infotech

Next.js App Router + React + TypeScript website. This revision implements the foundation and long-scroll homepage for the design approval checkpoint requested in the brief. It is not the completed production website.

## Run

Requires Node.js 24 (tested 24.22.1), npm 11.

```sh
cd /workspace/wexoraa-website-
npm ci --cache /workspace/.npm-cache
npm run dev
```

Use the existing isolated checkout; do not create a worktree unless requested. No environment values are required for homepage development. Dependencies are locked in package-lock.json. Fonts are bundled official Google Fonts OFL files because Google Fonts build requests are blocked here. See DESIGN_SYSTEM.md.

## Verify

```sh
npm run lint
npm run typecheck
npm run build
npx playwright test
```

Browser tests start the production server, so build first. Chromium defaults to `/usr/bin/chromium`. Set `PLAYWRIGHT_CHROMIUM_PATH` for another installed Chromium or install Playwright Chromium with the supported package tools and set its executable path. Screenshots currently write to `/workspace/artifacts`. Tests cover connected controls, keyboard navigation, axe, working contact navigation and overflow at 360, 390, 768, 1024 and 1440px. Axe cannot prove WCAG conformance.

## Implemented

- Material 3 semantic design tokens and Syne/Manrope typography.
- Responsive homepage with connected system diagram, delivery comparison, solution tabs, engineering architecture, labelled concept cards, process timeline and partnership sections.
- Accessible mobile navigation, reduced motion and visible focus.
- Honest contact and privacy preview routes; optional configured call/WhatsApp actions.
- Homepage title/description and Open Graph metadata; canonical only when a real site URL is configured.

## Next phases after design approval

1. Replace text name with supplied official logo; sample exact green. Add approved clients, projects and testimonials only when available.
2. Build 15-question assessment, conditional questions, session answer persistence, rules engine, contact capture and thank-you summary.
3. Add Resend route handlers with Zod validation, request limits, throttling, honeypot, duplicate protection, escaped templates, acceptance-only success and retry behavior.
4. Add solution/service pages, approved case-study content, about/process pages and finalized privacy policy.
5. Complete sitemap, robots, social image and appropriate structured data once canonical deployment details are confirmed.
6. Complete full accessibility, performance, security and submission QA before deployment.

## Configuration

`.env.example` lists planned email and contact variables; there are no secrets in this repository. Phone and WhatsApp must be real approved numbers. Set WhatsApp with country code. `NEXT_PUBLIC_SITE_URL` must be the actual HTTPS deployment origin. Do not enable an enquiry form without a verified Resend sender and recipients.

An email-only lead system has no durable lead backup; acceptance is not guaranteed inbox delivery. Next-phase implementation must document failed sends and retry semantics without logging personal information. In-memory rate limiting cannot protect multiple serverless instances; choose a platform-level shared limit or edge protection without introducing a lead database.

See `docs/DEPLOYMENT.md`, `docs/UX_STRATEGY.md`, `docs/HEURISTIC_EVALUATION.md` and `DESIGN_SYSTEM.md`.
