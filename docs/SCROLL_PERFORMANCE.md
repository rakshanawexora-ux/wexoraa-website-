# Scroll performance verification

Synthetic local Chromium run: 1440 × 1000 viewport, 4× CPU slowdown, 180 animation-frame scroll steps across the homepage. Same script and viewport before/after. Values are local browser measurements, not a claim about every device.

| Metric | Before | After |
| --- | ---: | ---: |
| Main-thread task duration | 11.86s | 3.09s |
| Style recalculation time | 8.09s | 0.25s |
| Frames taking >50ms | 119 | 4 |
| 95th percentile frame interval | 134.6ms | 41.5ms |

Changes: removed scroll-time blur/fade/section entry effects, root CSS progress writes, per-image/parallax bounding-box loops, hero scroll transforms, snap points and live header backdrop blur. The studio circle now uses composited outer/inverse scale transforms with a static rounded boundary and stable text. Hover pointer work is batched into one frame with reads before writes. Browser-native anchor scrolling remains smooth; wheel/touch scrolling is not intercepted.
