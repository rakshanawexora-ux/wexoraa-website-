# Vercel deployment preparation

This phase is a design review build. Do not present it as a complete lead-generation site.

1. Import the GitHub repository into Vercel with the Next.js preset and repository root as the root directory. Use Node 24 and `npm ci` / `npm run build`.
2. Use a protected preview deployment for design review. The current root page has standard marketing metadata; restrict preview access rather than assuming robots prevents discovery.
3. Configure the actual public site URL, approved phone and WhatsApp values. Public variables are embedded at build time; redeploy after changes.
4. The browser-only assessment is implemented; add approved contact capture and the enquiry backend before launch. Add Resend server credentials securely in Vercel, a verified domain sender, and the approved recipient inbox. Never prefix secrets with NEXT_PUBLIC.
5. Confirm sender domain DNS, consent language, legal identity, privacy contact/retention, and the lack of durable backup. Test provider acceptance, failure and retry before making forms available.
6. Require lint, type check, build and browser checks. Complete supporting routes, metadata, sitemap, robots and approved assets. Test the actual preview deployment as well as the local production server.
7. Promote only when the remaining phases and business review are complete.

No deployment, domain registration, Resend configuration or secret entry has been performed in this task.
