# Original Wexoraa motion effects

The user chose independently implemented effects instead of licensed React Bits Pro components. No Pro source, private registry, license key, Tailwind installation or additional package is required.

- `src/components/scroll-mask-reveal.tsx`: a static circular boundary expands across the studio media through an outer scale transform with an inverse inner viewport scale. Motion provides smooth mask progress; copy stays fully visible and the video has no scroll zoom. The stage is pinned below the header; its 195svh track is reserved in CSS. Reduced motion removes the long track and shows the final static scene. Playback is manual and pauses offscreen.
- `src/components/bending-marquee.tsx`: repeated brand text runs along an original quadratic SVG curve. The loop length is measured from the rendered text; requestAnimationFrame runs only in view. Hover or keyboard focus pauses it, reduced motion stops it. Repeated decorative text is hidden from accessibility APIs and one readable label is provided.

Reading text uses a gentle one-time 320ms opacity/8px entrance, disabled under reduced motion. There is no text blur, continuous scroll-linked opacity, scroll snap, global scroll-parallax loop or root progress-variable write. Pointer hover is limited to fine pointers and frame-batched reads/writes.

The compact client-logo marquee stays unchanged. The new curved strip sits between portfolio and studio media. Use the supplied palette, existing fonts and no fabricated client/project claims. These components are not represented as React Bits Pro products.
