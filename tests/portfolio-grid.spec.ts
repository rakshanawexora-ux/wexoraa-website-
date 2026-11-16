import { test, expect } from "@playwright/test";
for (const width of [390, 800, 1440])
  test(`portfolio grid stays readable and navigable at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 950 });
    await page.goto("/");
    const cards = page.locator(".portfolio-card");
    await expect(cards).toHaveCount(4);
    for (const card of await cards.all()) {
      await card.scrollIntoViewIfNeeded();
      await expect(card.locator("h3")).toBeVisible();
      const r = await card.boundingBox();
      expect(r!.width).toBeGreaterThan(200);
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await cards.first().getByRole("link").first().click();
    await expect(page).toHaveURL(/work#/);
  });
