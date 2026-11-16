import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { fillBusinessDetails } from "./business-details";
for (const width of [320, 360, 390, 430])
  test(`growth invitation and entire modal fit ${width}px mobile`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    await page.getByRole("heading", { level: 1 }).waitFor();
    const invitation = page.locator("#challenge");
    await invitation.scrollIntoViewIfNeeded();
    const copy = await page.locator(".growth-invite-copy").boundingBox(),
      art = await page.locator(".growth-invite-art").boundingBox();
    expect(art!.y).toBeGreaterThanOrEqual(copy!.y + copy!.height);
    expect(
      await page.locator(".growth-invite-art").evaluate((el) => {
        const text = el
          .querySelector(".growth-radar > span")!
          .getBoundingClientRect();
        return Array.from(el.querySelectorAll(".radar-tag")).every((tag) => {
          const r = tag.getBoundingClientRect();
          return (
            r.right <= text.left ||
            r.left >= text.right ||
            r.bottom <= text.top ||
            r.top >= text.bottom
          );
        });
      }),
    ).toBe(true);
    const button = page.locator(".survey-start");
    expect((await button.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    await button.click();
    const dialog = page.locator(".growth-dialog");
    const fits = async () =>
      expect(
        await dialog.evaluate((el) => el.scrollWidth <= el.clientWidth),
      ).toBe(true);
    await fits();
    await expect(dialog.getByLabel("Business name", { exact: true })).toHaveCSS(
      "font-size",
      "16px",
    );
    await fillBusinessDetails(page);
    await fits();
    await dialog.getByRole("button", { name: "Skip for now" }).click();
    for (let i = 0; i < 4; i++) {
      await fits();
      await dialog.getByRole("radio").nth(1).check();
      await dialog
        .getByRole("button", {
          name: i === 3 ? "See my snapshot" : "Continue",
          exact: true,
        })
        .click();
    }
    await expect(
      dialog.getByRole("img", { name: "Digital readiness 50 out of 100" }),
    ).toBeVisible();
    await fits();
    const ring = await page.locator(".animated-score").boundingBox(),
      bounds = await dialog.boundingBox();
    expect(ring!.x).toBeGreaterThanOrEqual(bounds!.x);
    expect(ring!.x + ring!.width).toBeLessThanOrEqual(
      bounds!.x + bounds!.width,
    );
    await page.setViewportSize({ width, height: 420 });
    await dialog.getByLabel("Your name", { exact: true }).fill("Mobile Owner");
    await fits();
    const close = dialog.getByRole("button", { name: "Close growth checker" });
    expect((await close.boundingBox())!.y).toBeGreaterThanOrEqual(0);
    await page.emulateMedia({ reducedMotion: "reduce" });
    const scan = await new AxeBuilder({ page })
      .include(".growth-dialog")
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(scan.violations).toEqual([]);
    await close.click();
    await expect(button).toBeFocused();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });
