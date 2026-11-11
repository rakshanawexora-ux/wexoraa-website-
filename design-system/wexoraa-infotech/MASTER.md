# Wexoraa Infotech — adopted UI/UX system

This is the project-specific system synthesized after running the user-requested UI UX Pro Max skill. `DESIGN_SYSTEM.md` contains the full implemented component/token documentation. User requirements and supplied assets take precedence over generated defaults.

## Verified guidance and applicability

- **Product**: integrated digital/creative/technology agency; business owners and company decision-makers; conversion through service discovery or a 12-question assessment.
- **Style search**: `minimalism --domain style` matched `minimalism-and-swiss-style` (active). Adopt its clear grid, high-contrast sans-serif typography, whitespace and purposeful hover feedback. Preserve Material 3-inspired rounded controls instead of copying the generic zero-radius style variable.
- **Narrative pattern**: the narrowed `creative design agency --design-system` search matched scroll-triggered storytelling. Adopt problem → capability → clear next action, complete DOM reading order and simplified reduced-motion behavior. Do not require visitors to complete a tour or animation before enquiring.
- **Motion guidance**: `reduced motion parallax --domain ux` returned reduced motion, motion sensitivity and excessive-motion rules. Keep motion concentrated on one scene per viewport, bound parallax, preserve native scrolling and provide a pause control.
- **Focus guidance**: `focus not obscured --domain ux` returned explicit WCAG 2.2 focus-obscuration rules. Do not render a global motion controller (latest user request); reserve sticky-header scroll offset.
- **Next.js stack**: the initial motion query had no database match; the permitted narrower retry `image optimization --stack nextjs` returned next/image, LCP priority and remote-image restrictions. Images remain self-hosted with reserved sizes; the video uses a local poster, manual playback and no third-party embed.

## Recommendations deliberately not adopted

The first broad design-system result proposed Web3 typography and a dark/red palette. The narrowed result proposed Brutalism, Inter and pink/cyan. Those complete palette/font/style combinations do not fit this brief, so neither raw generated system was persisted as an authoritative project result. This master contains only verified applicable guidance and explicit user requirements. General visual refinements beyond those database matches are project judgment.

## Brand and type

- Exact supplied logo SVG, unchanged proportions/colors; no approximation.
- Primary #86C232; supporting #61892F; secondary #222629; neutrals #474B4F / #6B6E70. Keep official SVG unchanged. Use dark readable on-primary text.
- Keep the recording-led cinematic dark hero and inner-page entrances. Shared header and entire footer are white (latest user preference); use light reading/survey surfaces and the retained dark motion-film section.
- Space Grotesk headings and DM Sans body, self-hosted with OFL notices. No Inter substitution.
- Primary actions share a green rectangular button, 8px radius, 48px minimum height and a clear label; secondary actions keep the same shape with an outline. Icon-only compact header controls remain 44px.
- Human language comes before slogans: explain the task, benefit and next step. Design includes branding/UI/UX/websites/stores/apps; business systems includes CRM/ERP/integrations/automation; digital marketing includes SEO/paid ads/social/video/conversion improvements.
- Base reading/input text 16px where practical; smaller metadata remains supporting information, not the sole source of meaning. Balanced headings and natural reflow; no forced nonbreaking words.

## Interaction contract

- Cinematic hero uses original Wexoraa artwork, oversized white/green type, orbital paths and two functional discovery cards. Hero depth reacts to pointer position; orbit animation pauses offscreen and with reduced motion. Keep initial header/hero boundary steady. Inner-page scene selection changes copy and a real destination link.
- Service filters/search solve discovery; empty results include a reset and a contact route.
- Pointer tilt is bounded and omitted for coarse pointers/reduced motion. Essential actions also work by click/tap/keyboard.
- Section entry uses translation, not faded body copy. State correctness does not wait for an animation end.
- No global motion controller (user request). Respect browser reduced-motion preferences.
- Header services disclosure contains all 12 direct service URLs, visibly grouped Design & development / Business systems / Digital marketing. Build/operate/grow remain stable route IDs, not unexplained visitor-facing labels. Keep the Services overview link separate, with a 44px disclosure button, keyboard access and Escape/focus restoration.
- Use a fully white footer with a clear invitation heading, one standard enquiry CTA and clearly separated navigation columns.
- Explicit film play/pause; no autoplay, no audio, no external embed.
- No locked scroll, cursor removal, fake urgency, invented client proof or email-gated assessment results.

## Verification

Validate text contrast with axe plus screenshots, keyboard focus, 360/375/390px phones, tablet/desktop and landscape. Native web targets meet their semantic requirements; primary touch controls aim for at least 44px. Preserve the existing survey, email-retry and route tests. Automated results are not a complete WCAG certification or real-user study.

## Homepage flow and service guidance

Cinematic hero → retained original motion film → conversational 12-question growth-readiness survey → explained service categories with original related illustrations → examples/process/support. The growth-readiness score is the existing transparent digital-capability rubric, not a forecast of sales or revenue. Keep the no-signup result and methodology available.
