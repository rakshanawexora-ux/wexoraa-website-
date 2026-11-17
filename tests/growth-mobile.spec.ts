import { test, expect } from "./fixtures";
import AxeBuilder from "@axe-core/playwright";
import {
  fillBusinessDetails,
  completeChallenges,
  completeDigital,
  leadEndpoint,
} from "./business-details";
for (const width of [320, 360, 390, 430])
  test(`five-step check fits ${width}px and short mobile screens`, async ({
    page,
  }) => {
    await page.route(leadEndpoint, async (r) => {
      const p = JSON.parse(
        new URLSearchParams(r.request().postData()!).get("payload")!,
      );
      return r.fulfill({
        headers: { "Access-Control-Allow-Origin": "*" },
        json: { accepted: true, requestId: p.requestId },
      });
    });
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    await page.locator(".survey-start").click();
    const dialog = page.locator(".growth-dialog");
    const fits = async () => {
      expect(
        await dialog.evaluate((el) => el.scrollWidth <= el.clientWidth),
      ).toBe(true);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    };
    await fits();
    await expect(dialog.getByLabel("Full name", { exact: true })).toHaveCSS(
      "font-size",
      "16px",
    );
    await fillBusinessDetails(page);
    await fits();
    await completeChallenges(page);
    await fits();
    await completeDigital(page);
    await fits();
    await page.setViewportSize({ width, height: 420 });
    await dialog.locator(".consent-label input").check();
    await page
      .getByRole("button", { name: "Get my business report", exact: true })
      .click();
    await expect(dialog.locator(".solution-report")).toBeVisible();
    await fits();
    await page.emulateMedia({ reducedMotion: "reduce" });
    const scan = await new AxeBuilder({ page })
      .include(".growth-dialog")
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(scan.violations).toEqual([]);
    const close = dialog.getByRole("button", { name: "Close growth checker" });
    await close.click();
    await expect(page.locator(".survey-start")).toBeFocused();
  });
