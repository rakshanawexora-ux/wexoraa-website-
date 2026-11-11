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
