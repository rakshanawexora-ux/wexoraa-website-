# Wexoraa Infotech

A Next.js App Router / TypeScript website with a brand-led Motion hero, connected service pages, 4-question homepage snapshot, detailed assessment and custom Google Sheets enquiries.

## Active enquiry setup

Original custom website forms save directly to an owner-deployed Google Apps Script Web App. No Google Form is embedded. See [Google Sheets setup](docs/GOOGLE_SHEETS.md). The owner-supplied `/exec` URL is configured as the default; hosting may override it with `NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL`. Rebuild/redeploy to activate the change. Actual Google delivery still needs an owner test. Resend settings and `/api/enquiry` below refer to the retained legacy email handler. Scores and business context are sent with the custom form automatically after explicit submission.

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

Build before browser tests; they start the production server. For the current Sheets submission tests, use the mocked endpoint build profile documented in docs/GOOGLE_SHEETS.md; never deploy the test URL. Chromium defaults to `/usr/bin/chromium`; override PLAYWRIGHT_CHROMIUM_PATH elsewhere. Tests cover all content routes, responsive/accessibility checks, scoring, survey flows, cursor interaction, form failure/retry and mocked email-handler security/delivery acceptance. No real provider email has been sent.

## Routes

- `/`: full homepage, pointer-reactive depth/light visual, original SVG doodles, short 4-question business snapshot, optional contact details and asymmetric concept portfolio grid. The testimonial section is removed.
- `/services`: What we do, with three illustrated service groups, a searchable 22-service directory and a simple working-together overview. Repeated enquiry buttons are removed from this page.
- `/services/[slug]`: 22 service detail pages with problems, approach, deliverables, FAQ and enquiry links.
- Legacy `/solutions` and `/solutions/build`, `/solutions/operate`, `/solutions/grow` permanently redirect to `/services` and its relevant section; they are absent from navigation and the sitemap.
- `/work` and two `/work/[slug]` illustrative studio concepts. No commissioned client work or results are fabricated.
- `/about`, `/process`, `/contact`, `/privacy`.
- `/business-assessment`, `/business-assessment/thank-you`.
- `/api/enquiry`, `/sitemap.xml`, `/robots.txt`.

Service/project content is centralized in src/content/catalog.ts. The official SVG is preserved unchanged. UI colours are #86C232, #61892F, #222629, #474B4F and #6B6E70, with accessible derived surfaces; the original logo artwork is unchanged.

## Survey score

The homepage asks four capability questions (website, marketing, follow-up, systems). Known answers earn 0–2 points, unknowns are excluded, and at least two known responses are required. Contact details are optional after the result; its self-reported summary is included in the enquiry message. No contact details are stored locally.

The separate `/business-assessment` route retains the detailed assessment. Exactly 12 questions: 4 contextual (industry, stage, priorities, timing) and 8 scored capability questions. Known capability answers earn 0–3 points with equal weight. Overall = earned ÷ eligible maximum × 100. Unknown/not-applicable answers are excluded. At least 4 known capability responses and all 12 answered questions are required for a score. Categories show digital presence, customer journey, systems/operations, marketing/measurement.

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

Inner-page heroes now include a pointer-reactive, selectable Build/Operate/Grow scene. Service discovery supports category filters, keyword search and a resettable empty state. Catalog/project/engineering cards share pointer tilt and a positional highlight; reading content uses a subtle one-time fade, without blur or large parent/form animations. The custom cursor is available across routes.

The homepage includes an original silent 8-second MP4 brand graphic (`public/motion/wexoraa-studio.mp4`, approximately 473KB) and a 40KB WebP poster. It uses `preload="none"`, starts on request and has play/pause controls. The site-wide Pause motion control pauses ambient motion and active film playback; reduced-motion preferences disable nonessential pointer/parallax effects. The footer is rebuilt as an enquiry panel, grouped navigation and a quiet animated brand motif.

The optional source renderer is `scripts/render-studio-film.mjs`. It requires Chromium, Playwright's video tooling, system ffmpeg and the existing font/logo assets. The cloud's prepared video-tooling cache can be selected with `PLAYWRIGHT_BROWSERS_PATH=/workspace/.playwright node scripts/render-studio-film.mjs`; another machine needs its own installed browser/video tooling and `PLAYWRIGHT_CHROMIUM_PATH` if Chromium is elsewhere. The committed film and poster mean rerendering is not required for install/build/start. Temporary render files go to ignored `.studio-render/`.

## Imported UI/UX skill

The user-requested UI UX Pro Max skill is vendored at `.agents/skills/ui-ux-pro-max`, with MIT license and pinned source revision in IMPORTED.md. Read its SKILL.md and run its Python search script by the absolute installed path. Adopted project guidance is in `design-system/wexoraa-infotech/MASTER.md`; official brand constraints override mismatched generic palettes/fonts. The motion pause control is integrated into the header so it cannot cover search or enquiry fields.

### After pulling changes locally

Stop the currently running server with Ctrl+C. `git pull origin main` updates source files; it does not rebuild an already-running production server. For a fresh production preview, run `npm run build` followed by `npm run start`. For development, restart with `npm run dev`. Check `git log -1 --oneline` to confirm the expected commit, then refresh the browser. No new dependency installation is required for the responsive sticky fix.

## Original mask reveal and curved marquee

The studio uses an original circular scroll-mask reveal, replacing the earlier ScrollExpand. An original curved SVG brand marquee sits between portfolio and studio media. These are independently implemented Wexoraa effects, not licensed React Bits Pro components. No key or registry setup is required. See [motion behavior and source files](docs/motion-effects.md).

The growth invitation follows the client logo marquee. Its native dialog includes business details and a problem statement, optional contact details, four readiness questions, and an animated score with challenge-based suggestions. Answers persist when the modal closes; contact details are not submitted automatically. The process section uses the six-stage keyboard-accessible roadmap.

## Scroll performance

Page scrolling is native and free: no scroll snapping, blur or continuously scroll-linked text fades, global parallax loop, progress-bar root CSS writes or per-card scroll measurements. Hero interaction is pointer-only. Studio media opens with two composited scale transforms and a static circular boundary, rather than an animated clip-path; its copy stays visible. Header glass uses an opaque surface rather than a live backdrop filter. Pointer card/button bounds are read once in a single animation frame before style writes, on fine pointers only.

## Consistent page design and SEO

All marketing routes share the homepage’s white/charcoal/green design and a clear “design, software and marketing—one team” promise. Main-route search snippets live in `src/content/page-seo.ts`; dynamic detail routes generate their own titles and descriptions. Canonical/social URLs still depend on `NEXT_PUBLIC_SITE_URL`; thank-you remains noindex. A single intersection observer provides subtle one-time content fades without blur or per-scroll layout work, and reduced motion stays static.

## Page navigation scrolling

Each marketing page has one normal-flow `.page-frame` root around its header, content and footer. Keep this wrapper: the current Next.js fragment scroll handler can otherwise scroll the separate footer into view after a page change. The root HTML declares `data-scroll-behavior="smooth"` so Next.js temporarily disables anchor smoothing during route changes. Section links retain native anchor scrolling; there is no global scroll reset listener.

## Supplied Work portfolio

The `/work` index uses `src/content/portfolio.ts`, transcribed from the supplied Wexoraa completed-projects document: eight website/ecommerce references and three creative entries. Matching uploaded compositions live in `public/work` as optimized WebP files. Edit each entry's `url` to update its external website; null URLs omit the visit button. Hita's public video URL is pending. VLASY retains the document's concept label. Older `/work/[slug]` studio explorations remain separate from these supplied project references.

## 20-second Wexoraa brand film

The website video section uses `public/motion/wexoraa-brand-20s.mp4` (20 seconds, 1280×720, 30fps, silent H.264 MP4). It is an original programmatically rendered brand animation inspired by the supplied reference, not output from a generative-video model. It uses the official logo, supplied project artwork and one-team messaging. Re-render with `node scripts/render-brand-film.mjs`; Chromium and ffmpeg are required. The section retains native play/pause, offscreen pausing and reduced-motion behavior; lightweight decorative particles pause out of view.

Latest video selection: the user chose the original uploaded reference again. The section now plays `public/motion/reference-showreel.mp4`, with its matching poster and no headline/description overlay. The generated Wexoraa 20-second film remains available as a separate asset.

Latest playback behavior: the reference video starts muted automatically when its section enters the viewport and loops. It pauses offscreen, in a hidden browser tab or under reduced motion, and resumes automatically when eligible. The manual play/pause button is removed. Browsers that block playback keep the poster and show the existing failure notice.

Latest film: the uploaded Wexoraa business motion video is served as `public/motion/wexoraa-business-film.mp4` (10 seconds, 1920×864, silent web copy). Its bottom 216px are cropped from the 1920×1080 source to exclude the bottom-right Gemini mark; the matching poster uses the same crop. The video uses contain framing to keep the remaining text visible, retaining in-view muted autoplay/loop and no manual control.
