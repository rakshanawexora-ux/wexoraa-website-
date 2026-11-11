import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { services } from "../src/content/catalog";
for (const width of [390, 1440]) {
  test(`service discovery and footer ${width}px`, async ({ page, request }) => {
    await page.setViewportSize({ width, height: 950 });
    await page.goto("/");
    if (width < 901)
      await page.getByRole("button", { name: "Open navigation" }).click();
    const toggle = page.getByRole("button", { name: "Browse all services" });
    await toggle.focus();
    await page.keyboard.press("Enter");
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    const dropdown = page.locator("#services-dropdown");
    for (const service of services)
      await expect(
        dropdown.getByRole("link", { name: service.title, exact: true }),
      ).toHaveAttribute("href", `/services/${service.slug}`);
    expect(await dropdown.locator("section a").count()).toBe(12);
    expect(await (await request.get("/")).text()).toContain(
      "/services/websites-ecommerce",
    );
    await page.keyboard.press("Escape");
    await expect(toggle).toBeFocused();
    await expect(dropdown).toBeHidden();
    await toggle.click();
    await dropdown
      .getByRole("link", { name: services[0].title, exact: true })
      .click();
    await expect(page).toHaveURL(new RegExp(`/services/${services[0].slug}$`));
    await expect(page.locator("#services-dropdown")).toBeHidden();
    await page.locator("footer").scrollIntoViewIfNeeded();
    await expect(page.locator(".footer-invite-link")).toContainText(
      "Got a good",
    );
    await page.locator(".footer-invite-link").click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const scan = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      scan.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
  });
}
