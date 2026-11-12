# UI/UX review — interactive studio revision

The user supplied https://github.com/nextlevelbuilder/ui-ux-pro-max-skill after the initial manual review. The skill is now imported at `.agents/skills/ui-ux-pro-max/SKILL.md`, pinned to revision `6ae86f61f520d6ca229d2f40e070410638c908c5` with its MIT license. Its local search workflow and references were read and applied. The project-specific synthesis is `design-system/wexoraa-infotech/MASTER.md`; generic palette/font recommendations conflicting with the official brand were not adopted.

Actual searches: two design-system queries (initial broad query, then one narrower retry), an explicit minimalism style search, focus-not-obscured UX search, reduced-motion/parallax UX search, and a Next.js image-optimization query after the first stack query returned no match. The verified rules led to a header-mounted motion control, larger touch/search targets, balanced wrapping, preserved brand/type and retained reduced-motion/manual film controls. This is skill-assisted expert review, not a real-user study.

## Goal

Make the site feel expressive and interactive while keeping service discovery, assessment and enquiry readable and usable. Motion should reinforce feedback and hierarchy rather than gate content.

| Finding                                          | Severity | Applied correction                                                                                    |
| ------------------------------------------------ | -------- | ----------------------------------------------------------------------------------------------------- |
| Inner pages feel like plain text templates       | 3        | Pointer-reactive, selectable brand scene and shared section-entry movement                            |
| Hover feedback is too quiet                      | 2        | Bounded card tilt, positional highlight, arrow movement, border and elevation changes                 |
| Services are a long passive list                 | 2        | Pressed-state filters, labelled search, count and resettable empty state                              |
| Footer is dominated by plain oversized lettering | 2        | Enquiry invitation, grouped Explore/Connect navigation and restrained brand motif                     |
| Continuous effects can distract                  | 3        | Site-wide pause, reduced-motion behavior, native scrolling and explicit film playback                 |
| Fading body text lowers contrast mid-transition  | 3        | Removed opacity transitions; reveals move fully opaque content                                        |
| Video could add an unnecessary download          | 2        | Original 473KB MP4, 40KB poster, no autoplay, preload none and no third-party embed                   |
| Mobile users lack a fine pointer                 | 2        | Native clickable controls and direct links remain; pointer tilt is disabled on coarse-pointer devices |
| Extra decoration could interfere with enquiries  | 3        | Form controls and reading text do not receive pointer transforms                                      |

## Validation

Existing survey/form/API and route checks continue to pass. Automated responsive/axe checks cover 360, 390, 768, 1024 and 1440px on the homepage and representative inner pages. New functional checks cover actual local film playback/pause, the global motion control, brand-scene selection, card pointer response, filtering/search/reset and reduced-motion behavior. Desktop/mobile/footer screenshots and a live interaction recording support visual review.

This is partial automated and expert evidence. No real-user study, full assistive-technology certification, performance benchmark or live Resend delivery claim is made.

## Latest user-directed refinement

The latest request overrides the previous motion-controller decision: no global controller is rendered. Browser reduced-motion preferences remain respected and the local film retains its own playback button. UI tokens now use #86C232, #61892F, #222629, #474B4F and #6B6E70, with white surfaces. Original SVG artwork is unchanged. Header navigation gains active states and a project enquiry CTA; the footer is a compact white invitation above charcoal navigation. Services now offer simple native-dialog enquiries (name, email, phone, requirement, consent) with service context and restored trigger focus.

SEO metadata includes distinct page titles/descriptions, canonical/OG URLs and Organization/WebSite/Service JSON-LD when NEXT_PUBLIC_SITE_URL is configured, plus sitemap and robots. Without a real domain, previews remain noindex. Social image uses a static-weight derivative of the licensed Space Grotesk font and a PNG rendition of the unchanged logo for Satori compatibility.

## Recording-led cinematic direction

User supplied a 14.33-second screen recording of Hanusek Studio after direct reference-site access was blocked. Inspected sampled frames from the full recording. Visible evidence covers the hero: dark photographic backdrop, oversized tight typography, one accent word, orbital lines/satellites and two translucent destination cards. The clip does not demonstrate lower-page layouts or scroll transitions; those are Wexoraa-specific design decisions, not claimed observations of the reference.

Built an original Wexoraa hero with the existing self-owned sculptural artwork, exact #86C232 accent, original supplied logo, new studio copy, four rotating orbital paths, a pointer-responsive background/field, bounded Motion scroll depth and real assessment/services/enquiry actions. No reference imagery, wording, video or branding was copied. Orbit animation pauses offscreen and follows browser reduced-motion preferences. The original global motion controller remains absent. Shared header and inner-page hero/scene colors now continue this dark studio language, while the existing survey, content, enquiry forms and restored green footer CTA remain available.

Skill search: `motion sensitivity parallax --domain ux` verified reduced-motion, motion sensitivity and excessive-motion guidance. No new general palette/font output was adopted. Hero entrance is excluded from the shared section-translation observer to keep the dark header/hero boundary stable during loading.

## Plain-language content and consistent actions

Latest user direction retains the cinematic hero and original motion animation, restores the light header, places the film immediately after the hero and the growth-readiness survey next, explains service categories and makes the footer fully white. Visitor-facing Build/Operate/Grow labels now explain the work: Design, websites & apps / Business software & automation / Digital marketing & content. All 12 service routes stay stable. The design group includes branding, UI/UX, websites/stores and mobile apps; marketing includes SEO, ads/social, content/video and website conversion improvements.

Three original SVG interface/workflow illustrations explain each group, with descriptive image text and direct links to the selected services. Service copy, about/process/solutions copy, shared CTAs and enquiry feedback use shorter, task-oriented language. The survey adds friendly prompts, answer feedback and a growth-readiness invitation; its scoring rubric and unknown-answer exclusions are unchanged. Visible wording explains that this is a digital-readiness check, not a sales forecast. Results remain available without email.

Primary CTA geometry is shared (green fill, 8px corners, 48px height, clear text and consistent arrow); secondary/back actions share the shape with an outline. Navigation links, choice controls and discovery cards retain their appropriate roles. Skill search `plain language instructions --domain ux` had no match; the narrower retry `form labels instructions --domain ux` verified label, accessible-name and submission-feedback guidance. Copywriting choices are project editorial judgment, not claims derived from that database result.

## Client marquee

Added a white client strip between the cinematic hero and motion film. Four accessible client images are displayed in original colours using a transparent sprite, with charcoal plates only for white-lettered taxi marks. Duplicate visual tracks are hidden from accessibility APIs. Motion pauses on hover and with a local pause/resume button, and becomes a static two-column layout under reduced-motion settings. The initial skill query `pause moving content --domain ux` was off-topic; the explicit retry `reduced motion --domain ux` returned applicable reduced-motion and motion-sensitivity guidance.

Scope limitation: four of the user's eight unique marks were available to the image editor; four earlier inline marks were inaccessible as original files/reference inputs. No stand-in brands or invented logo artwork were added. Details and provenance are in `public/ASSETS.md`.

## Homepage visibility and CTA cleanup

Latest user request removes the visible marquee pause button. The strip is now a server-rendered component: default `grayscale(1)` and full colour only on the hovered logo card, with hover/focus pausing and reduced-motion static layout. The focusable viewport exposes a clear accessible description; duplicate logo tracks remain hidden from accessibility APIs. Logo files themselves were not altered.

Removed repeated homepage CTA links from the film description, selected service panel, process introduction, three engineering cards, partnership section and duplicate footer contact entries. Retained header/hero enquiry, survey progression/invitation, contextual service discovery and the main footer enquiry. This preserves routes and the enquiry dialog while reducing repeated prompts.

Primary action hovers use #222629 with white labels/icons. Dark backgrounds gain a visible button border. Background and text colours change together; only the small transform is transitioned. Visual review and a footer accessibility check found that interpolating from green to charcoal while changing text to white could temporarily lower contrast, so colour interpolation was removed rather than delaying the test. Skill query `color contrast hover --domain ux` returned applicable minimum contrast and contrast-readability guidance.

## Button polish and live motion graphic

Added bounded cursor attraction (3px horizontal / 2px vertical), rolling diagonal arrows, a restrained pointer light and press feedback to primary actions. The existing charcoal/white hover colours still change immediately for contrast; only geometry/light/shadow animate. Keyboard focus also rolls the arrow; reduced-motion and touch omit pointer attraction. Mobile header arrow visibility is preserved when the label is hidden.

Homepage capability section now contains an original browser-rendered motion graphic. Website, Systems and Marketing buttons change the three illustrated stages and their plain-language explanation; travelling green packets show the connection. All essential text is real DOM content, not tiny SVG labels or an external animation. It is an illustrative flow, not live customer data or a performance claim. Packet animation pauses offscreen and is removed for reduced motion. Added staggered card/menu/title entry and bounded project-image scroll depth without scroll locking, new enquiry CTAs, autoplay video or external animation dependencies. The original film remains unchanged.

Verified skill query: `motion sensitivity --domain ux` returned applicable motion-sensitivity/reduced-motion rules. These informed the static readable fallback and bounded effects; no generated palette or typography replaced the supplied brand system.

## FAQ, hover navigation and compact logos

Added six native FAQ disclosures covering project size, pricing, timelines, existing tools, support and the optional assessment enquiry. Homepage FAQPage JSON-LD uses the same content array as the visible answers. No price, delivery-time or rich-result promise was invented.

Services open on desktop mouse hover with a short close grace period across the trigger/panel boundary; existing keyboard Escape/focus and touch disclosure remain. Panel width, typography, spacing and border treatment now match the minimal light header. Client marks are smaller, borderless monochrome wordmarks rather than large cards; original colours reveal on hover (white-lettered marks get a small charcoal backing only on hover). Direct access to the Tenlyr reference was blocked by the environment network policy, so this is based on the user's explicit small/simple direction, not a claim of inspecting that website.

Investigated the user's screenshots: the large opaque circle was a legacy `.footer-invite-link > span` rule applying to the new rolling-arrow wrapper. Its size, background, position, rotate/scale and inherited hover colour are now explicitly reset for `.action-arrow`. The decorative cursor is also limited to a small transparent ring with no text bubble. The overflowing systems SVG labels were replaced with responsive real text in cards, preserving category meaning and readable wrapping at phone widths. Other illustrations and the original motion film remain.

The compact-strip visual review caught that a pure-black brightness filter erased internal lettering/stripe detail. Final treatment is true grayscale; white-lettered taxi marks use inverted grayscale against white, reverting to their supplied colours on hover. This retains the salon stripes and readable taxi names without permanent logo cards.
