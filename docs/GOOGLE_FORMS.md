# Current enquiry provider: Google Forms

The owner supplied this public responder URL:
https://docs.google.com/forms/d/e/1FAIpQLSfe_XQpPiY3_zFr585f2q-fEqx3ALdbdPQzJVBTN5WfAcbODw/viewform

`src/content/enquiry-provider.ts` stores the public URL and its embedded variant. Do not use a private edit URL. The shared `src/components/enquiry-form.tsx` now renders the Google Form on the Contact page, generic enquiry popup, short-check follow-up and detailed assessment follow-up. It offers a direct new-tab link if embedding is blocked. The existing email form is retained separately in `email-enquiry-form.tsx`; the active Google integration does not use `/api/enquiry` or require Resend keys.

## What gets saved

Visitors complete and submit the Google-hosted form. Google handles the confirmation, validation, consent question and response recording. The setup script links that form to the owner's private response spreadsheet. Loading the iframe does not submit anything, and the website does not claim success from an iframe load event.

Field identifiers could not be inspected because the cloud network blocks docs.google.com. Consequently the website does not guess Google entry IDs or submit with no-cors requests. Service interest, source path, business-check score/answers and previously supplied contact details appear in a local read-only summary. The visitor may copy it into **Project Details** before submitting. Those details are not automatically prefilled or saved in separate Sheet columns. An actual prefilled responder URL is needed to map fields reliably if automatic prefilling is wanted later.

## Owner verification (still needed)

1. Open the public form in an incognito window. It should not require a Google login. Check Publish/responder access if it does.
2. Open the form in Google Forms edit mode, then Responses. Confirm it is accepting responses and the linked Sheets icon opens the intended private spreadsheet.
3. Submit one clearly labelled test enquiry through the website or direct form. Check the Google Forms response count and the linked response tab. A template tab is not the automatically created Google response tab.
4. For notification emails, enable **Responses → three-dot menu → Get email notifications for new responses** in the owner's account.
5. Keep the Sheet and edit URL private. Only the responder URL is used in the site.

No real enquiry was submitted by this task. Browser tests stub the third-party iframe to verify the local integration without sending data or claiming Google delivery. Google Form appearance and availability are controlled by Google; parent-page CSS cannot restyle its fields.
