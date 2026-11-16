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

## Current homepage interaction refinements

Client marks default to monochrome and reveal their supplied colours on hover. No visible Pause logos control: the focusable client strip pauses on hover or keyboard focus and uses a static grid for reduced motion. Hover CTAs use #222629 with white text/icons; change both colours immediately, preserving only small transform feedback. Keep the homepage free of repeated generic enquiry CTAs in the film, process, capability cards and partnership sections. Header, hero, survey and final footer actions are the main entry points.

## Purposeful motion polish

Buttons may use a bounded 3px/2px cursor attraction, rolling arrow, subtle light and press response. Preserve immediate #222629/white colour changes and readable labels. Touch and reduced motion omit attraction. The capability section's Website / Systems / Marketing graphic changes actual readable DOM stages and explanations; decorative travelling packets pause offscreen and stop for reduced motion. Stagger card entry and bound project-image depth; keep native scrolling and no extra generic enquiry prompts.

## FAQ and compact discovery

Native homepage FAQ disclosures share one content source with FAQPage structured data. Services must open on desktop hover while retaining touch click and keyboard Escape/focus behavior. Use compact borderless monochrome client marks, colour on hover and no visible pause button. Keep cursor effects small and transparent. Rolling-arrow wrappers must never inherit legacy footer-circle dimensions/backgrounds/colours. The systems service illustration uses wrapping DOM text rather than baked-in SVG labels to avoid clipped or overlapping captions on small screens.

## Projects and client stories

Use a large project image with a charcoal detail panel and manual previous/next browsing. Existing projects are labelled studio concepts until real commissioned work is supplied. The user requested existing client names in testimonial cards pending later updates: use `src/content/testimonials.ts`, with explicit pending states while quote fields are null. Never fill real client names with invented praise, people, ratings or results. Actual supplied feedback can replace the placeholder through the same content source. No autoplay or extra generic enquiry CTAs.

## Native scroll chapters

Latest project behavior: desktop/tablet >=768px wide and >=500px high uses a 230svh native scroll track, sticky stage at 112px, scroll-driven image depth/scale and concept changes. Manual arrows navigate through that same track. Do not intercept wheel events or lock scrolling. Mobile/short/reduced-motion views retain normal flow and manual browsing. Keep the scene and controls within the viewport; supplementary service lists may be omitted in short pinned stages because the full project route remains available. Sticky service menus/process introductions and stronger bounded hero depth support the same scroll narrative.

Responsive sticky visibility: do not restrict to tall desktop-only windows. Enable the pinned scene at 768×500 and larger, with compact typography and stage sizing. Phones use native image-only sticky stacking; reduced motion stays static. Manual navigation reads the actual sticky top offset rather than assuming a fixed desktop header.

## Native homepage snapping

Use home-only `scroll-snap-type: y proximity` on suitable desktop/tablet viewports. Major sections snap to their starts using native header scroll padding. No mandatory stops or wheel interception. Suppress snapping for focused survey/project/client controls and open enquiry dialogs. Phone, reduced-motion and other routes retain free scrolling. Long sections must remain readable/traversable, and existing sticky project storytelling must keep working.

## Clean editorial redesign

The user rejected W-cut containers and approved a white, rounded editorial direction. Use simple 16–28px rounded feature surfaces, a white hero with charcoal type and a green underline, and a separate interactive charcoal artwork panel. Keep Space Grotesk / DM Sans and the supplied brand palette. Service tabs use charcoal selection with white copy; the adjacent visual panel stays light. Preserve the native sticky project chapter, survey, reduced-motion behavior and enquiry flow. No decorative clipping paths on reading or interactive surfaces.

## Interactive snapshot and portfolio update

The homepage now uses four capability questions (website, marketing, follow-up, systems), followed by a visible score and optional contact-only form. Unknowns are excluded, at least two known answers are required; no external audit is implied. Contact data is not stored locally. The detailed 12-question assessment remains on its own route. The short report is included in enquiry message text, not passed as a legacy twelve-answer payload.

Replace the previous project carousel/sticky chapter with an asymmetric two-concept portfolio grid and two clearly labelled service tiles. Never present service tiles as completed client work. Testimonials retain real client names and pending quotes, with decorative pointer response. Service tabs switch on mouse hover while preserving click, touch and keyboard; do not steal keyboard focus. Blur/fade reveals keep content visible by default and stop under reduced motion. Use loading animation for route boundaries and the short result transition.

## Modal checker

Show the short growth checker inside a native modal, launched from a compact invitation. Preserve answers on close/reopen, trap focus natively, restore trigger focus, allow Escape/backdrop dismissal and lock background scrolling. Services and portfolio precede the studio mask scene; the growth invitation remains immediately after the client strip. See `docs/motion-effects.md` for current independent studio and marquee implementations.

## Growth placement, contact step and roadmap

Place the growth invitation immediately after the client logo strip. Use a charcoal surface, primary green emphasis and prominent “Check my score” button. Collect contact details as the first modal step, with a skip option. Keep contact data in component memory; do not submit it automatically. Results animate a real final score with a count-up and SVG ring, static under reduced motion. Prefill the optional send form and collapse completed contact fields to avoid asking twice. Replace the old process accordion with six accessible tabs, a numbered visual panel and a short stage explanation. Preserve arrow/Home/End keyboard selection.

## Floating studio navigation

Use an inset white glass frame with a charcoal desktop navigation capsule, green active state and project CTA. Retain normal header flow and height so the scroll studio offset remains correct. The services disclosure uses three light category cards and all twelve real service links. On mobile use a rounded scrollable white panel, with click and Escape support; preserve keyboard focus visibility.

The user subsequently authorized original equivalents without a Pro license. Use the independently built circular scroll-mask scene and curved SVG brand marquee. They replace ScrollExpand and do not use or claim to be React Bits Pro source. See `docs/motion-effects.md`. Keep native scrolling, manual video controls, offscreen pausing, hover/focus marquee pause, readable static reduced-motion states and unchanged client marks.
