# Wexoraa design system — homepage review

## Foundation

A custom implementation of Material 3 principles, with an editorial Syne display layer. This is not a claim of official Material component certification. The current component set covers the homepage; forms, dialogs, feedback and assessment components belong to subsequent phases.

## Color roles

Centralized in `src/app/globals.css`. Brand green `#84C341` is provisional until the official logo is supplied. Never use it behind white button text: the primary action uses dark `#17220E` text. Secondary text uses darker neutral greens after axe contrast review.

| Role                                     | Value             | Purpose                        |
| ---------------------------------------- | ----------------- | ------------------------------ |
| primary / on-primary                     | #84C341 / #17220E | Main actions, selected accents |
| primary-container / on-primary-container | #E9F3DC / #283D13 | Tonal emphasis                 |
| secondary / on-secondary                 | #536348 / #FFFFFF | Secondary emphasis             |
| surface / on-surface                     | #FDFDFB / #20221E | Main canvas and text           |
| surface-container-low                    | #F5F6F1           | Quiet sections                 |
| surface-container                        | #EEF0E9           | Cards                          |
| surface-container-high                   | #E5E8DE           | Stronger tonal surfaces        |
| surface-variant                          | #E7EADF           | Decorative supporting surfaces |
| outline / outline-variant                | #74796B / #DCE0D4 | Strong and quiet boundaries    |
| error / on-error                         | #B3261E / #FFFFFF | Reserved for form feedback     |
| inverse-surface / inverse-on-surface     | #171C18 / #F4F5EF | Technical section              |

## Typography

Syne variable weights 600–700: display and heading roles. Manrope 400–700: body and interface. Official OFL fonts are bundled, with licenses in `public/fonts`. Google Fonts requests were denied by the cloud policy, so this stage uses `next/font/local`; switch to `next/font/google` only when `fonts.googleapis.com` and `fonts.gstatic.com` are allowed and a new build succeeds.

All 15 requested type roles are CSS variables: display large/medium/small, headline large/medium/small, title large/medium/small, body large/medium/small and label large/medium/small. Hero and section sizes use clamp. Body copy uses 16px, with smaller interface metadata. Display text uses negative tracking and short line lengths.

## Spacing and adaptive layout

4px scale, from `--space-1` to `--space-24`. Fluid section padding 64–120px; container gutters 24–80px. Six-column process becomes three columns on mobile; solution panels and project grids become single-column. Mobile navigation uses a disclosure with Escape and focus restoration.

## Shape and elevation

Extra-small 4, small 8, medium 12, large 20, extra-large 28, full 999px. Quiet cards favor borders and tonal fill; only technical nodes and concept art receive restrained shadows. Full radius is reserved for small status dots and the final action.

## Motion

Short 160ms and medium 300ms, standard `cubic-bezier(.2,0,0,1)`. Motion for React supports the hero transition, CSS handles simple state changes and signal flow. Content remains visible before hydration. Reduced motion removes transitions and signal animation. No scroll hijacking, custom cursor or parallax is included at this review stage.

## Components and states

Filled/outlined/text actions, icon action, responsive navigation, segmented comparison, tab group, selectable system nodes, process steps, project cards, content notice. Hover and pressed states use tonal changes; focus-visible has a 3px ring with offset. Selected state is exposed through aria-pressed/aria-selected. Disabled buttons have opacity and cursor treatment. Loading/error/success form components are not yet implemented.

Example: `.button` = filled; `.button.button-outline` = outlined; `.text-link` = supporting action. Interactive options must be buttons; navigation must use links. Future form primitives should follow the same tokens and use Radix where it materially improves keyboard behavior.

## Accessibility

Semantic headings and landmarks, skip link, visible focus, keyboard-operated tabs (arrows/Home/End), selected states, live comparison/process feedback, labelled icon actions, reduced motion. Do not convey selection through color alone. Maintain at least 4.5:1 contrast for regular text and 3:1 for large text. Automated axe checks supplement manual keyboard/layout review and do not establish complete WCAG conformance.
