import { test, expect } from "@playwright/test";
test("signature frames preserve interactive content and export reusable SVG artwork", async ({
  page,
  request,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(page.locator("#wexoraa-signature-frame")).toHaveCount(1);
  const hero = page.locator(".hero-cinematic");
  await expect(hero).toHaveCSS("clip-path", /wexoraa-signature-frame/);
  expect(
    await hero.evaluate((el) => {
      const r = el.getBoundingClientRect();
      const point = document.elementFromPoint(
        r.left + r.width * 0.25,
        r.top + r.height * 0.02,
      );
      return el.contains(point);
    }),
  ).toBe(false);
  await hero.getByRole("link", { name: "Let’s build something" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  for (const name of [
    "wexoraa-signature-frame",
    "wexoraa-signature-frame-charcoal",
    "wexoraa-signature-frame-outline",
  ]) {
    const asset = await request.get(`/brand/${name}.svg`);
    expect(asset.ok()).toBe(true);
    expect(asset.headers()["content-type"]).toContain("image/svg+xml");
  }
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await hero.getByRole("link", { name: "Let’s build something" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
});
