# Deployment and email activation

No deployment, environment publication, sender verification or real email delivery has been performed in this task.

1. Import the repository using Vercel's Next.js preset, Node 24, npm ci and npm run build. Use protected previews while business details are being reviewed.
2. Enter the real HTTPS NEXT_PUBLIC_SITE_URL. Page canonicals and sitemap entries use it. Without this value robots blocks indexing and the sitemap is empty.
3. Configure approved public phone/WhatsApp numbers. Do not use dummy contact details. Public variables require a rebuild.
4. Verify a domain with Resend, configure required DNS, and set RESEND_API_KEY, WEXORAA_FROM_EMAIL and WEXORAA_LEAD_EMAIL securely. Sender/recipient configuration uses bare email addresses. Allow HTTPS api.resend.com where outbound networking is restricted.
5. Confirm actual legal business identity, privacy contact, retention in the receiving inbox/provider systems and cross-border processor arrangements. The current privacy page states the outstanding approval clearly.
6. Add platform-level rate limits/WAF suitable for the deployment. The built-in maps are bounded and process-local, not a distributed store. No lead database is permitted by the brief; email-only capture has no durable application backup.
7. Run lint, typecheck, build and Playwright. Mocked provider tests are not a substitute for a controlled real send. Test an approved inbox, provider rejection, duplicate request, timeout, retries and receipt from the deployed site. Confirm hosting-origin forwarding is correct.
8. Verify actual responsive behavior, approved content and contact links, complete manual accessibility review and performance measurement. Publish publicly only after the required business/configuration checks are completed.

Provider acceptance is the application's success condition, not guaranteed inbox delivery. Contacts are not written to browser storage. Business answers can remain in tab session storage until cleared. Review platform logging separately to avoid accidental form-data collection outside the handler.

## Hostinger Next.js standalone deployment

The repository explicitly builds `output: "standalone"`. `npm run build` includes a postbuild step that copies `public` and `.next/static` into `.next/standalone`; Next does not copy these by default. `npm run start` launches that generated server on all interfaces and preserves the platform-assigned `PORT`. Do not guess or hardcode a different port in hPanel. Node 22 meets Next 16's declared Node >=20.9 requirement; Node 24 is also used for local checks.

Keep application type Next.js, build command `npm run build`, output `.next`. If the host exposes a start command, use `npm run start`; a standalone entry is `.next/standalone/server.js`. A successful build is not proof that domain-to-process routing is healthy. `/api/health` returns uncached `{ "status": "ok" }` from the running app and performs no external calls.

Investigation of deployment beb51b9: the latest commit changes the public Sheets endpoint, documentation and tests, not server binding or start commands. Local baseline home/contact returned HTTP 200. The actual Hostinger 503 could not be reproduced or inspected from the cloud network. Standalone packaging is a compatibility fix, not proof of the live root cause. After redeployment, if `/api/health` still returns 503 while runtime logs say Ready, Hostinger must inspect upstream routing, health checks, process exits and resource limits.

Validation: local launcher honored a non-default assigned port despite an inherited hostname; a relocated standalone directory served home, contact, services, work, health, favicon, Open Graph/font assets, video, optimized images and 12 CSS/JS/font asset URLs with HTTP 200. No live domain deployment is claimed.
