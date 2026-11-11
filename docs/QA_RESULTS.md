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
