# Local-only Lead Master and five-step check

The owner has now explicitly authorised the Git push for live verification. This work leaves `next.config.ts`, hosting commands and deployment settings unchanged.

## Agreed schema

The owner's private **Leads** tab uses exactly these 19 columns:
Date | Lead ID | Name | Company | Role | Phone | Email | Preferred Contact | Lead Source | Service Needed | Business Type | Business Age | Main Problem | Readiness Score | Recommended Services | All Answers | Status | Next Follow-up | Notes

The bound Google Apps Script was supplied and deployed by the owner. Its `doGet` was confirmed by the owner as `Wexoraa Lead Master`, configured true. The public Web App URL is in `src/lib/lead-master.ts`; it may be overridden with `NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL`. An existing hosting override must be changed to the NEW Lead Master URL, not the older Website Enquiries endpoint. Explicitly empty/invalid overrides prevent sending.

## Frontend

- Custom contact page and enquiry popup retain their existing design; no Google Form iframe or redirect.
- Home checker and `/business-assessment` share `SolutionCheck`. Source values distinguish **Home growth checker**, **Detailed assessment**, **Contact page**, **Enquiry popup**.
- Five steps follow the uploaded outline: six contact fields; three business context questions; four operations/challenge questions; four digital-presence questions; final optional notes, review and explicit permission.
- No requests are made between steps. Contact details and answers stay only in React memory, never browser storage.
- Final submission sends context, all answers, role, self-reported score and suggestions automatically. Simple enquiries use a null score and keep their optional website in All Answers.
- Confirmation requires readable JSON, `accepted: true` and the SAME request ID. Failure/blocked CORS/timeout preserves entries and does not show the report or a saved claim. Identical retries reuse an ID; changed content gets a new ID. There is no opaque/no-cors success fallback.
- Nothing sends emails, subscribes clients to marketing or makes the Sheet public.

## Scoring

Six equal areas earn 0–3 points each (18 maximum); score is rounded earned/18×100. Contact data, industry, age, reach channels and mobile app ownership carry no points. Tracking: software 3 / Sheets 2 / calls or separate tools 1 / no process 0. Website: well-represented 3 / improve presentation 2 / basic or redesign 1 / absent 0. Online reach: multiple/happy 3 / search, paid or agency 2 / mainly social 1 / none 0. Daily work, manual tasks and marketing start at 3 and lose one point per selected issue, capped at 3; their positive exclusive options earn 3. All required choice questions must be complete before a score exists. This is an explained planning heuristic, not an audited result, scientific benchmark or revenue forecast. Suggestions prioritise selected gaps; not having a mobile app does not automatically recommend an app.

## Before any future launch

1. Local flow and mocked save tests have passed; the owner has authorised the Git push.
2. Push/redeploy once for live verification; avoid repeated Hostinger processes.
3. Set hosting public URL to the new Lead Master deployment and rebuild.
4. Send one clearly labelled test from each entry point, with consent. Verify all 19 columns in **Leads**, zero vs empty score, All Answers, Source and no duplicate on retry. No real submissions were made during local tests.
5. Google Apps Script permissions, quotas, CORS redirects and actual row persistence still need real deployment testing. Owner-approved privacy contact/retention details remain to be finalised.

Browser tests block real script.google.com traffic by default; acknowledgement/error replies are mocked. No Google Sheet was modified by the assistant.
