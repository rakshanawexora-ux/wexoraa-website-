# Custom website forms → private Google Sheet

The original website forms are restored. There is no Google Form iframe or redirect. All four enquiry entry points use the same custom form and send directly to an owner-deployed Apps Script Web App. A Next.js API handler is not needed for this submission flow; the rest of the Next.js website still requires compatible hosting.

## Owner setup

1. Open the SAME Google Apps Script project previously used to create the form and sheet. Script Properties retain `WEXORAA_SHEET_ID`, so existing responses need not be deleted.
2. Replace the script editor content with `integrations/Wexoraa-Website-Enquiries.gs`. Save. Run `setupWebsiteEnquiries` and authorize it. It reuses the private spreadsheet or creates one if needed, then adds a **Website Enquiries** tab. It does not use Google Form destination APIs.
3. Deploy → New deployment → Web app. Execute as **Me**; access **Anyone**, without Google sign-in. Do not publish or share the spreadsheet itself. Workspace administrators may restrict this deployment mode.
4. Copy the deployed Web App URL ending in `/exec` (not `/dev`, a Form URL or the Sheet URL).
5. In hosting environment settings set `NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL` to this URL and rebuild/redeploy. This endpoint is public by design, not an API secret. Do not place Google account credentials or private signing keys in frontend variables.
6. Submit one labelled test through the actual deployed website. Confirm a new row appears in **Website Enquiries** and the site reports success. Check desktop/mobile, score follow-up and retries. Google authorization/CORS/redirect behavior must be verified against the real deployment. An opaque response is never treated as a confirmed save.
7. If script code changes later, update the Web App deployment to a new version. Saving script editor changes alone does not update an existing versioned deployment.

## Payload and behavior

The form sends a simple URL-encoded POST with a JSON `payload`, avoiding a custom-header preflight. It follows Google's response redirect and requires a readable JSON reply with `accepted: true`; only then is success displayed. No no-cors fallback is used. There is a 30-second timeout; failed or blocked requests retain the entered fields.

Rows contain received date, name, company, email, phone, website, interest, message/business problem, preferred contact, source, page, self-reported score, assessment answers, consent, request ID, payload hash and submitted date. Quick-check details are included in the message; the score is passed separately. No manual copying into Google Forms is required. Scores are self-reported website rubric outputs, not verified business metrics.

A lock and stored request ID/hash prevent duplicate rows on identical retries, including lost acknowledgements. Changed form content receives a new request ID. Validation, honeypot and temporary per-email rate limits reduce basic spam; a public endpoint can still be abused and Google execution/storage quotas apply. Add stronger abuse protection if traffic requires it. Text beginning with spreadsheet formula characters is escaped before storage.

No email notification is configured by this handler. Google Sheets notification rules can be configured in the owner's account separately. Spreadsheet access/retention remain the owner's responsibility.

## Current activation status

The live Web App `/exec` URL has not yet been supplied, so local forms show the connection notice and cannot claim a saved response. The website does not silently fall back to email or the old Google Form. Script behavior is verified with local mocked services; actual Google delivery still requires the owner's deployment and a real end-to-end test.

## Local verification

Browser submission tests use a mock endpoint and never send real enquiries. Build the test profile with:

```sh
NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/wexoraa-test/exec npm run build
npx playwright test --workers=2
```

The suite intercepts that specific test URL. Do not deploy this mock URL. Rebuild without it for an unconfigured preview, or with the actual owner-deployed URL for production. All 61 checks passed in the mocked profile. The production profile with no endpoint must show the connection notice and reject submission without an external request.
