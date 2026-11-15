import { test, expect } from "@playwright/test";
test("home settles near section edges while forms, other pages and reduced motion keep free scrolling", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(page.locator("html")).toHaveCSS(
    "scroll-snap-type",
    /^y(?: proximity)?$/,
  );
  const faq = page.locator(".home-faq");
  const top = await faq.evaluate(
    (el) => el.getBoundingClientRect().top + scrollY,
  );
  await page.evaluate((y) => {
    document.documentElement.style.scrollBehavior = "auto";
    scrollTo(0, y - 80);
  }, top);
  await expect
    .poll(async () => Math.round((await faq.boundingBox())!.y))
    .toBe(100);
  await page.locator(".embedded-survey input").first().focus();
  await expect(page.locator("html")).toHaveCSS("scroll-snap-type", "none");
  await page
    .locator(".embedded-survey input")
    .first()
    .evaluate((el) => el.blur());
  await expect(page.locator("html")).toHaveCSS(
    "scroll-snap-type",
    /^y(?: proximity)?$/,
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).toHaveCSS("scroll-snap-type", "none");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator("html")).toHaveCSS("scroll-snap-type", "none");
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/services");
  await expect(page.locator("html")).toHaveCSS("scroll-snap-type", "none");
});
