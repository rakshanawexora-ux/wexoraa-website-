# Wexoraa design system — modern agency revision

## Direction

Light mineral surfaces, dark typography, olive secondary tones, controlled Wexoraa green accents, large editorial imagery and restrained technical sections. Material 3 principles underpin semantic roles, shapes, states, adaptive layouts and motion. This is a custom implementation, not a claim of official component certification. The supplied official SVG is used unchanged in the header and on a light footer plate. Its 296:60 aspect ratio and original colors are preserved. Brand primary #83C040 is sampled directly from the symbol; the supplied wordmark also contains #53B900. The oversized footer lettering remains decorative text.

## Color roles

All values live in `src/app/globals.css`.

| Role                                     | Value             | Purpose                                        |
| ---------------------------------------- | ----------------- | ---------------------------------------------- |
| primary / on-primary                     | #83C040 / #15210C | Brand accents and readable green surfaces      |
| primary-container / on-primary-container | #E7F1DC / #243817 | Selected assessment options and tonal emphasis |
| secondary / on-secondary                 | #36571C / #FFFFFF | Supporting emphasis                            |
| surface / on-surface                     | #FAFBF8 / #181B16 | Main canvas and primary text                   |
| surface-container-low                    | #F0F2EC           | Quiet supporting surfaces                      |
| surface-container                        | #E9ECE3           | Supporting cards                               |
| surface-container-high                   | #DFE5D7           | Stronger tonal surfaces                        |
| surface-variant                          | #E3E7DE           | Supporting decoration                          |
| outline / outline-variant                | #6D7766 / #D4DBCC | Strong and quiet boundaries                    |
| error / on-error                         | #B3261E / #FFFFFF | Inline selection-limit feedback                |
| inverse-surface / inverse-on-surface     | #1A1E17 / #F8FAF2 | Dark sections and inverse filled actions       |

Never place white text on the brand green without checking contrast. The principal filled CTA uses exact logo green with dark on-primary text; hover uses the secondary logo green #53B900. Radio/checkbox selection uses both a native control and tonal/border changes. Contrast is checked through axe at the five responsive targets; automated results are not full WCAG certification.

## Typography

The redesign replaces Syne and Manrope with **Space Grotesk** for editorial headings and **DM Sans** for body/interface text, following the user's request to change typography. Variable OFL font files and license notices are bundled in `public/fonts`. `next/font/local` avoids network dependencies; Google Fonts endpoints were blocked in this environment.

All 15 Material-inspired typography roles remain available as CSS custom properties. Display sizes are fluid using clamp; body copy is generally 15–16px, supporting metadata 9–12px. Compact image labels are supplemental, not the sole source of essential information. Use short headings and controlled negative tracking.

## Spacing, shapes and elevation

4px spacing scale; fluid 24–80px gutters and 72–144px section padding. Small 8px, medium 12px, large 20px, extra-large 28px and full shape tokens. Full radius is reserved for actions/chips, while media use large rounded rectangles and assessment cards use medium corners. Elevation is quiet and concentrated on the business-problem finder.

## Components and states

Filled/outlined/text/icon actions, responsive navigation, image cards, selectable problem cards, accessible solution tabs, process accordion, native radio/checkbox cards, step progress, inline notices and result chips. Default/hover/pressed/focus-visible/disabled/selected states are implemented. Enquiry forms implement loading, retryable error and provider-acceptance success states, plus explicit privacy consent. The survey shows an on-device score without collecting contacts; sending its summary is optional and uses server recalculation.

Selection states expose aria-selected/aria-pressed or native checked state. Process controls expose aria-expanded and matching panel IDs. Focus-visible uses a 3px high-contrast ring. The selection-limit notice uses role=status. Buttons and inputs use semantic controls, not clickable decorative elements.

## Motion

Motion for React (the current Framer Motion package): spring-smoothed layered hero parallax for image, title, caption and official-logo sticker; scroll-drawn SVG doodle; global scroll-progress line; subtle viewport translation; spring cursor-follow accent and magnetic primary CTA. Official-logo doodles embed the original SVG with preserved aspect ratio, surrounded by separate decorative strokes. The small floating doodle is hidden on mobile, while the logo sticker and scroll doodle remain visible. CSS: project-image zoom, arrow direction, tonal hover, card lift and slow decorative marquee. Shared short 180ms and medium 360ms durations with standard Material-inspired easing. Nothing uses scroll hijacking or removes the native cursor.

Fine-pointer devices alone receive the cursor accent. Touch and reduced-motion users do not. Reduced motion also disables parallax, marquee and CSS transitions; essential content is visible before animation or hydration. Cursor overlays are aria-hidden and pointer-events:none, so they cannot intercept controls or text selection.

## Adaptive behavior

Desktop uses split editorial introductions and staggered image cards. Mobile stacks the content, changes solution tabs to a horizontal row, uses a navigation disclosure and keeps assessment controls comfortably spaced. Tested at 360, 390, 768, 1024 and 1440px. No horizontal document overflow is allowed.

## Survey and conversion components

The 12-question survey is shared between homepage and standalone route. Radio/checkbox option cards, visible progress, four category tracks, a numeric score ring with an accessible text alternative, expandable methodology and optional enquiry all use the same tokens. Unknown data never silently scores as zero. Contacts remain out of session storage. Inner pages reuse a hero, content grid, service-specific enquiry path and final conversation CTA.

## Asset usage

`hero-art.webp`: original AI-generated silver/green sculptural concept, approximately 155KB. `brand-art.webp`: original AI-generated unbranded packaging concept, approximately 192KB. Both use next/image with reserved dimensions, responsive sizes and lazy loading below the fold. Neither is evidence of client work; the section explicitly says studio concepts. No fake client identities, testimonials or project results are introduced.
