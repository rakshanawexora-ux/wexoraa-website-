import { test, expect } from "@playwright/test";
test("solutions redirect to what we do and the page keeps enquiry prompts minimal", async ({
  page,
  request,
}) => {
  for (const path of [
    "/solutions",
    "/solutions/build",
    "/solutions/operate",
    "/solutions/grow",
  ]) {
    const r = await request.get(path, { maxRedirects: 0 });
    expect(r.status()).toBe(308);
    expect(r.headers().location).toContain("/services");
  }
  await page.goto("/services");
  await expect(
    page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "What we do", exact: true }),
  ).toBeVisible();
  await expect(page.locator('a[href="/solutions"]')).toHaveCount(0);
  await expect(page.locator(".what-area")).toHaveCount(3);
  await expect(page.locator(".service-results .catalog-card")).toHaveCount(12);
  await expect(
    page.locator(".service-card-actions,.page-hero-actions,.page-final"),
  ).toHaveCount(0);
  await expect(page.locator(".service-card-includes")).toHaveCount(12);
  await page.setViewportSize({ width: 390, height: 950 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
