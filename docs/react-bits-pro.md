# React Bits Pro integration prerequisites

Requested components:

- `@reactbits-starter/scroll-mask-tw` — replace the studio video reveal.
- `@reactbits-starter/bending-marquee-tw` — add a curved brand/services marquee.

## Current status

Neither Pro component is installed. The existing `ScrollExpand` studio reveal remains active so the page keeps working.

The environment has no nonempty `REACTBITS_LICENSE_KEY`, and the official installation/component docs are blocked by the cloud network proxy (403). Both requested shadcn commands were attempted; they failed fetching `https://ui.shadcn.com/r/registries.json` before installation. No registry endpoints, Pro source, or authorization settings have been guessed.

## Complete setup

1. Supply the license through the environment/secret manager as `REACTBITS_LICENSE_KEY`. A blank placeholder is in `.env.example`. Never prefix it with `NEXT_PUBLIC_`, commit the real value, or paste it into chat.
2. Obtain the **official registries configuration** from <https://pro.reactbits.dev/docs/installation>. Add it to `components.json`, preserving its documented URL templates and Authorization header environment-variable reference. The Pro registry URLs could not be verified here, so `components.json` has not been fabricated.
3. With registry access and the key available to the CLI, run:

   ```sh
   npx shadcn@latest add @reactbits-starter/scroll-mask-tw
   npx shadcn@latest add @reactbits-starter/bending-marquee-tw
   ```

4. Inspect the installed source, dependencies and Tailwind requirements before importing it. The current website uses plain global CSS; adapt its tokens to #86C232, #222629, #61892F, #474B4F and #6B6E70 without resetting existing page styles.
5. Replace the studio `ScrollExpand` only once Scroll Mask is installed and tested. Use a separate curved brand/services text strip for Bending Marquee, preserving the existing compact client-logo treatment and reduced-motion behavior.
