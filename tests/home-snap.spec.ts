import { test, expect } from "@playwright/test";
test("native scrolling stays free and content never uses scroll blur or fade", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.getByRole("heading", { level: 1 }).waitFor();
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator("html")).toHaveCSS("scroll-snap-type", "none");
  await page.evaluate(() => scrollTo({ top: 1237, behavior: "instant" }));
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(1237);
  for (const selector of [
    "#solutions h2",
    "#work h2",
    ".portfolio-card",
    "#process h2",
    ".home-faq h2",
  ]) {
    const item = page.locator(selector).first();
    await item.scrollIntoViewIfNeeded();
    await expect(item).toHaveCSS("opacity", "1");
    await expect(item).toHaveCSS("filter", "none");
  }
  expect(
    await page.evaluate(() => ({
      progress:
        document.documentElement.style.getPropertyValue("--site-progress"),
      drifts: Array.from(
        document.querySelectorAll<HTMLElement>(".project-image"),
      ).some((e) => e.style.getPropertyValue("--image-drift")),
    })),
  ).toEqual({ progress: "", drifts: false });
  await page.locator(".survey-start").click();
  await expect(
    page.getByRole("dialog", { name: "YOUR BUSINESS GROWTH CHECK" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("html")).toHaveCSS("scroll-snap-type", "none");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
});
