import { test, expect } from "./fixtures";
import { services } from "../src/content/catalog";
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
  await expect(page.locator(".service-results .catalog-card")).toHaveCount(
    services.length,
  );
  await expect(
    page.locator(".service-card-actions,.page-hero-actions,.page-final"),
  ).toHaveCount(0);
  await expect(page.locator(".service-card-includes")).toHaveCount(
    services.length,
  );
  const search = page.getByRole("searchbox", { name: "Search services" });
  for (const [term, service] of [
    ["packaging", "Packaging & label design"],
    ["newsletters", "Email & WhatsApp marketing"],
    ["GA4", "Analytics & campaign reporting"],
    ["YouTube", "Google, Meta & paid ads"],
  ]) {
    await search.fill(term);
    await expect(
      page.locator(".service-results").getByRole("heading", {
        name: service,
        exact: true,
      }),
    ).toBeVisible();
  }
  await search.clear();
  await page.setViewportSize({ width: 390, height: 950 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
