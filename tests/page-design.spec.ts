import { test, expect } from "@playwright/test";
for (const width of [390, 1440])
  test(`inner pages share the homepage design at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of [
      "/about",
      "/services",
      "/solutions/build",
      "/services/crm-lead-management",
      "/work",
      "/work/considered-brand-experience",
    ]) {
      await page.goto(route);
      await expect(page.locator(".page-team-promise")).toContainText(
        "One team",
      );
      await expect(page.locator(".page-hero")).toHaveCSS(
        "background-color",
        "rgb(255, 255, 255)",
      );
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        route,
      ).toBe(true);
    }
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/about");
    await expect(page.locator(".page-hero h1")).toHaveCSS("opacity", "1");
    await expect(page.locator(".page-hero h1")).toHaveCSS("filter", "none");
  });
