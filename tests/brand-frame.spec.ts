import { test, expect } from "./fixtures";
test("rounded hero keeps discovery and enquiry accessible on desktop and mobile", async ({
  page,
}) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    const hero = page.locator(".hero-cinematic");
    await expect(hero).toHaveCSS("background-color", "rgb(255, 255, 255)");
    await expect(hero).toHaveCSS("clip-path", "none");
    const visual = page.locator(".hero-visual");
    await expect(visual).toBeVisible();
    const bounds = await visual.boundingBox();
    expect(bounds!.width).toBeGreaterThan(250);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await hero.getByRole("link", { name: "Let’s build something" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
  }
});
