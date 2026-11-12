# Current website QA evidence

Validated against the local production build in the cloud environment with Node 24, Next.js 16.4.6 and system Chromium.

- Lint: passed without warnings.
- Production build/type validation: passed. Build enumerates all static marketing pages, dynamic service/solution/concept routes and the enquiry API.
- Playwright: **22 passed, 0 failed, 0 skipped** (31.2 seconds).

## Coverage

- All requested content URLs plus all 12 services and both concepts return 200; unknown service/solution slugs return 404.
- Home survey completes all 12 questions, restores session answers, shows score/interpretation, offers explanation/revision and keeps contact capture optional.
- Unknown answers do not fabricate a score; mobile survey results pass configured axe checks.
- Score boundary/context tests cover 0, 67 and 100, denominator exclusions and incomplete data.
- Home image loading, no document overflow and axe at 360, 390, 768, 1024 and 1440px.
- Mobile axe/overflow for contact, a service, solution, concept, about, process and privacy.
- Pointer movement changes hero transform. Reduced-motion disables the transform, cursor and progress effect.
- Contact form keeps data on mocked failure and shows success only after mocked provider acceptance.
- Imported real route handler with mocked fetch: consent/schema errors, body limit, cross-origin rejection, missing configuration, escaped complete emails, server score, repeatable provider payload, retry, duplicate acceptance and throttling.

No actual Resend credential was used. The provider calls are mocked; live acceptance/inbox receipt remains untested. Axe is partial automated accessibility evidence, not full WCAG certification. No Lighthouse/Core Web Vitals benchmark or real-user usability test is claimed.

Screenshots: `/workspace/artifacts/complete-site-<width>.png`. Score/inner-page previews are captured separately for review.

After the step-focus scroll refinement and an explicit honeypot rejection assertion, the production build/lint passed again and all 7 focused survey/enquiry tests passed (10.6 seconds). Homepage/inner-page tests were not repeated unnecessarily. Real provider delivery remains untested.

## Studio-wide interaction revision

- Production build and lint passed after the new shared motion layer, inner-page graphics, footer and service explorer.
- The full 24-check suite passed (49.1 seconds), including all existing route, form, survey and responsive checks plus real local film play/pause and interactive scene/card behavior.
- After adding service filtering/search and consolidating progress indicators, focused checks verified search/filter/empty-state reset with mobile axe, actual video playback/pause and pointer/reduced-motion behavior. The graphic test was scoped to its scene when the service filter introduced another Operate button; its corrected focused rerun passed.
- Initial reveal opacity caused temporary contrast failures. Removed the opacity transition rather than suppressing contrast rules; text keeps full opacity throughout reveals.
- ffprobe confirms the MP4 is 7.96 seconds, H.264/yuv420p, 1280×720, no audio, 473405 bytes. It is self-hosted and loaded only when played.
- The optional motion source renderer passes Node syntax checking. Artwork/fonts/logo remain local; no external video/embed dependency was added.

## Imported UI UX Pro Max skill pass

Imported the user-supplied upstream skill at pinned revision `6ae86f61f520d6ca229d2f40e070410638c908c5`, preserving its files/license. Ran and evaluated its design-system, explicit style, UX outcome and detected Next.js stack searches; adopted only guidance consistent with the actual product and official brand. `design-system/wexoraa-infotech/MASTER.md` records verified matches and rejected mismatched defaults.

After moving motion controls into the header, increasing search/clear touch targets and input text, and balancing headings, **all 26 tests passed** (51.6 seconds). Coverage includes a new 375px/landscape check: the motion control does not obscure the focused search field, touch controls are at least 44px, search text is 16px, no horizontal overflow appears, and the motion preference survives route navigation. Lint and the full production build passed in the same verification run.

## Palette, navigation, enquiry and SEO refinement

Latest user request: remove global motion controls; use #86C232, #61892F, #222629, #474B4F and #6B6E70; simplify header/footer; add service enquiry popup and SEO. Original supplied SVG remains unchanged. UI surfaces, motion-film vector colors and primary CTA styles now use the supplied palette. Responsive previews: `/workspace/artifacts/refined-header.png`, `refined-footer.png`, `refined-enquiry-mobile.png`.

Browser checks exercise native modal opening, initial focus, Escape closing and trigger focus restoration, mobile axe accessibility, compact payload and accepted-submission UI using a mocked API (no live email). SEO checks cover domain-dependent canonical/structured metadata and the actual generated social PNG. A live browser reduced-motion change exposed a nonreactive hook; the hook now subscribes to media-query changes, without any visible global controller. Contact delivery still requires the documented Resend configuration; indexing/canonical URLs require the actual `NEXT_PUBLIC_SITE_URL` at build time.

Verification: production build, lint, TypeScript and diff whitespace checks pass. The 28-case suite passed 26 cases before two motion regressions were corrected. Targeted rechecks pass for film playback/reduced-motion changes, compact popup submission and card reduced-motion behavior. The card assertion accepts an identity transform matrix as well as `none` because both represent zero movement. The film's playback controls stay outside parallax movement; other scene/hero scroll effects remain.

## Header services and footer follow-up

Added all 12 service URLs to a server-rendered header disclosure, grouped Build/Operate/Grow. Services overview stays a direct link; the separate toggle supports keyboard/touch, Escape and focus restoration. Mobile navigation scrolls within the available viewport. Restored the large green “Got a good challenge?” enquiry CTA, followed by an inset rounded charcoal footer with capabilities links. Skill query `keyboard navigation dropdown --domain ux` returned applicable keyboard navigation, skip-link and sticky-navigation guidance. Existing skip links and brand palette remain.

Verification includes desktop/mobile disclosure activation and service navigation, rendered HTML service URLs, restored CTA/dialog, responsive homepage accessibility at five widths, inner-page footer accessibility and route checks. Green-panel supporting text was darkened after axe identified insufficient contrast.

Final result: all 8 targeted navigation/route/responsive accessibility tests pass (35.6 seconds). Production build, lint, TypeScript and whitespace checks pass.

## Cinematic hero from supplied reference recording

Production build and lint/TypeScript checks pass. Full existing suite: **30 passed (58.0s)**. Following visual refinements to the hero entrance and dark inner-page graphic, targeted pointer/reduced-motion, new orbit offscreen-pause/discovery and seven inner-page accessibility checks: **9 passed (11.6s)**. Checks include keyboard/touch-friendly actual links and enquiry dialog access under reduced motion; no scroll locking or global motion controller was introduced.

Visual artifacts: `/workspace/artifacts/wexoraa-cinematic-desktop.png`, `wexoraa-cinematic-mobile.png`, `wexoraa-cinematic-services.png`; interaction recording: `/workspace/artifacts/wexoraa-cinematic-preview.webm`. The MP4 supplied by the user is an inspection reference, not a production asset.

## Plain-language service and growth-survey refinement

Final verification: **32 tests passed (57.5s)**, production build, lint, TypeScript and whitespace checks pass. The new service-guidance test verifies hero → retained motion film → survey DOM order, all three descriptive service tabs, each illustration loading, the four relevant service URLs per group, and keyboard focus from the growth-score invitation. Existing scoring, unknown-answer, resume, optional enquiry, provider/retry, SEO, route, motion, responsive and axe checks remain passing. Early review found long mobile tab labels causing overflow and a light film CTA label on green; the mobile tabs now stack and CTA text uses readable charcoal.

Final artifacts: `/workspace/artifacts/clear-header-1440.png`, `clear-services-1440.png`, `clear-services-390.png`, `growth-survey-1440.png`, `growth-survey-390.png`, `white-footer-1440.png`, `white-footer-390.png`. The original motion MP4/poster and supplied logo were not modified.

## Client-logo marquee

Added four unique supplied client marks as a cleaned transparent sprite; unavailable earlier inline marks are documented in `public/ASSETS.md`, not replaced with fabricated logos. Checks: **6 passed (42.6s)**, covering five homepage viewport/axe/image-loading cases and local pause/resume, accessible unique names, reduced-motion static grid and no horizontal overflow. Production build, lint, TypeScript and whitespace checks pass. Review captures: `/workspace/artifacts/client-marquee-1440.png` and `client-marquee-390.png`.

## Homepage monochrome logos, fewer CTAs and readable hovers

The full 34-case run passed 33 cases and exposed a transient footer-hover contrast issue in the remaining navigation check. Foreground/background colours now change together without colour interpolation; targeted rechecks passed **4/4 (11.3s)** for light/dark CTA hover contrast, desktop/mobile navigation/footer accessibility and marquee grayscale/colour reveal, hover/focus pause and reduced-motion behavior. The full run also checked normal homepage visibility at 360, 390, 768, 1024 and 1440px, survey, service groups, enquiry and inner-page routes. Small white project-photo captions get a darker image treatment (brightness .4) so even the brightest image areas remain dark enough for normal white text.

Removed the visible Pause logos button and repeated homepage CTAs from the film, selected service panel, process, three capability cards, partnership block and footer contact duplicates. Header, hero, survey and final footer actions remain. Client logo colours are changed only by CSS display filters; underlying assets remain untouched. Preview captures: `/workspace/artifacts/monochrome-clients.png`, `colour-client-hover.png`, and `clean-home-mobile.png`.

## Enhanced buttons and live business motion

**35 tests passed (1.2m)**, including a new live graphic selection/reduced-motion/mobile accessibility check. Existing hover contrast, five-width homepage scans, client-logo behavior, survey/scoring, routes/SEO, service tabs, card interactions, video playback and enquiry retry/popup checks remain passing. Production build, lint, TypeScript and whitespace checks pass.

Visual/interaction artifacts: `/workspace/artifacts/live-motion-desktop.png`, `live-motion-mobile.png`, `/workspace/artifacts/button-and-motion-preview.webm`.

## FAQ, hover services and compact client strip

**36 tests passed (1.3m)**. Coverage includes native FAQ mouse/keyboard expansion and mobile axe, matching visible FAQ/schema content, desktop services hover traversal/closing and existing touch/keyboard navigation, compact monochrome/colour client marks, responsive systems illustration and the footer arrow remaining 18px rather than inheriting a legacy circle. Following a final footer-arrow colour inheritance fix, targeted FAQ/navigation and light/dark hover contrast rechecks passed **2/2 (6.4s)**. Production build, lint, TypeScript and whitespace checks pass.

Review images: `/workspace/artifacts/refined-service-dropdown.png`, `compact-client-logos.png`, `home-faq-desktop.png`, `fixed-footer-arrow.png`, `responsive-systems-illustration.png`.

Final logo visual refinement retains tonal detail with grayscale instead of flattening artwork to solid black. White-lettered marks use inverted grayscale on the white canvas and return to their original colours/dark backing on hover. The original sprite is unchanged. Final marquee behavior/reduced-motion check passed **1/1 (5.4s)** and production build passed after this CSS-only adjustment.
