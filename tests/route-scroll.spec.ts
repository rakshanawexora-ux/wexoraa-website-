import { test, expect } from "@playwright/test";

for (const width of [390, 1440]) {
  test(`page navigation starts at the top and preserves section links at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 950 });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.locator("footer").scrollIntoViewIfNeeded();
    await page
      .getByRole("navigation", { name: "Footer explore" })
      .getByRole("link", { name: "What we do", exact: true })
      .click();
    await expect(page).toHaveURL(/\/services$/);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Better design. Easier work. More ways to grow.",
      }),
    ).toBeVisible();
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);

    // A detail-page link far down the page should also open at its hero.
    await page
      .locator(".what-area#grow")
      .getByRole("link", {
        name: "Analytics & campaign reporting",
        exact: true,
      })
      .click();
    await expect(page).toHaveURL(/\/services\/analytics-tracking-reporting$/);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Analytics & campaign reporting",
        exact: true,
      }),
    ).toBeVisible();
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);

    // Header navigation from a scrolled page must not inherit its old position.
    await page.evaluate(() => scrollTo({ top: 600, behavior: "instant" }));
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(600);
    if (width < 901)
      await page.getByRole("button", { name: "Open navigation" }).click();
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "About", exact: true })
      .click();
    await expect(page).toHaveURL(/\/about$/);
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
    await page
      .locator(".studio-scene")
      .getByRole("button", { name: "Systems", exact: true })
      .click();
    await page.getByRole("link", { name: "Explore Systems services" }).click();
    await expect(page).toHaveURL(/\/services#operate$/);
    await expect
      .poll(async () =>
        page
          .locator("#operate")
          .evaluate((element) =>
            Math.round(element.getBoundingClientRect().top),
          ),
      )
      .toBe(210);
  });
}
