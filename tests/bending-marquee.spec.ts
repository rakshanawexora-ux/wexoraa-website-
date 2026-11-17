import { test, expect } from "./fixtures";
test("curved text moves only in view, pauses on hover/focus, and respects reduced motion", async ({
  page,
}) => {
  await page.goto("/");
  const strip = page.locator(".bending-marquee");
  await strip.scrollIntoViewIfNeeded();
  await expect(strip).toHaveAttribute("data-motion", "running");
  await expect(strip).toHaveAttribute("data-paused", "false");
  const first = await strip.getAttribute("data-offset");
  await expect.poll(() => strip.getAttribute("data-offset")).not.toBe(first);
  await strip.hover();
  await expect(strip).toHaveAttribute("data-paused", "true");
  const held = await strip.getAttribute("data-offset");
  await page.waitForTimeout(180);
  expect(await strip.getAttribute("data-offset")).toBe(held);
  await strip.focus();
  await page.mouse.move(0, 0);
  await expect(strip).toHaveAttribute("data-paused", "true");
  await strip.evaluate((el) => (el as HTMLElement).blur());
  await expect(strip).toHaveAttribute("data-paused", "false");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(strip).toHaveAttribute("data-motion", "static");
  const stopped = await strip.locator("textPath").getAttribute("startOffset");
  await page.waitForTimeout(180);
  expect(await strip.locator("textPath").getAttribute("startOffset")).toBe(
    stopped,
  );
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
