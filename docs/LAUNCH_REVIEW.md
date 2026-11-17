# Final website review — 17 November 2026

> Enquiry setup update: custom website forms now save through an owner-deployed Apps Script Web App. Resend credentials are not needed for the active form. See [current setup](GOOGLE_SHEETS.md). The Web App URL and live save test are still pending.

## Implemented

- Main pages and all 22 service detail pages have descriptive, distinct titles/descriptions and one main heading. Service detail metadata is generated from the central catalog.
- Open Graph/Twitter share metadata and branded social image are implemented.
- Canonical URLs, Organization/WebSite/Service structured data and sitemap derive from `NEXT_PUBLIC_SITE_URL`.
- `src/app/sitemap.ts` lists public marketing/service routes; removed Solutions URLs redirect permanently and are excluded. Thank-you is noindex and excluded.
- `src/app/robots.ts` permits public crawling and publishes the sitemap only when a valid site origin is configured. An unconfigured build intentionally blocks indexing.
- Square SVG favicon uses the supplied official monogram. Search Console HTML-tag verification is supported through optional `GOOGLE_SITE_VERIFICATION` in root metadata.
- Forms have visible labels, autocomplete, explicit privacy consent, mobile 16px fields, clear focus states and honest send status. Contact and enquiry modal visual styling is refreshed.
- Work index introduction now describes the supplied projects rather than old dummy imagery. Separate legacy studio concepts retain their honest concept labels.

## Configuration still required before public launch

No local production values were supplied at review time. Hosting values cannot be verified from this checkout.

Set these in hosting environment settings (or `.env.local` for local testing), then rebuild:

```
NEXT_PUBLIC_SITE_URL=https://YOUR-CONFIRMED-DOMAIN
NEXT_PUBLIC_WEXORAA_PHONE=YOUR-APPROVED-INTERNATIONAL-NUMBER
NEXT_PUBLIC_WEXORAA_WHATSAPP=YOUR-APPROVED-COUNTRY-CODE-AND-NUMBER
RESEND_API_KEY=YOUR-SERVER-ONLY-KEY
WEXORAA_FROM_EMAIL=YOUR-VERIFIED-SENDER
WEXORAA_LEAD_EMAIL=YOUR-RECEIVING-INBOX
GOOGLE_SITE_VERIFICATION=OPTIONAL-HTML-TAG-TOKEN
```

Never commit real credentials. Search Console DNS verification is an alternative to the optional HTML token. Resend sender-domain verification and a controlled real form submission are still needed; mocked tests do not establish inbox delivery. Confirm business identity/privacy contact and email-retention details before collecting leads.

## Google / domain steps

1. Confirm the final HTTPS domain and hosting. Choose one canonical hostname; redirect the alternate www/apex hostname in hosting.
2. Attach DNS and TLS in hosting, set the production origin and rebuild. Keep draft/preview hosts excluded from indexing.
3. Inspect the live home and service source: canonical/social URLs must use the real domain and robots meta must allow indexing. Check `/robots.txt`, `/sitemap.xml` and `/icon.svg` return 200. Confirm legacy redirects and a true 404 response.
4. Add the domain in Google Search Console, verify ownership, submit `https://YOUR-DOMAIN/sitemap.xml`, and inspect/request indexing for the home page and key service pages. Google determines indexing timing; site files do not submit themselves.
5. Google Business Profile is a separate listing: verify the actual business details, address or service-area eligibility, phone, hours and website in the business's Google account. Do not invent an address, reviews or opening hours in schema.
6. Test actual email receipt, mobile contact details and WhatsApp/call destinations on the deployed domain. A repository push alone does not complete these launch steps.

## Validation

Build/lint passed. The full suite passed 57 checks; two outdated Work-layout assertions were updated for the existing editorial portfolio, and both then passed in the five-check design/SEO rerun. This verifies all 59 checks with no unresolved failures. The SEO audit covers 33 content pages and 32 configured-domain sitemap URLs. Contact layout was also visually checked at 390px/1440px and the favicon returns 200. No domain deployment, DNS change, Google submission or real email send is claimed.
