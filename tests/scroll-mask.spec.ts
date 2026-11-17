import { fillBusinessDetails } from "./business-details";
import { test, expect } from "./fixtures";
import AxeBuilder from "@axe-core/playwright";
test("original circle mask expands with native scroll and becomes static under reduced motion", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const root = page.locator(".mask-reveal"),
    stage = root.locator(".mask-reveal-stage");
  await expect(root).toHaveAttribute("data-static", "false");
  const start = await root.evaluate(
    (el) => el.getBoundingClientRect().top + scrollY,
  );
  const header = await page
    .locator(".header")
    .evaluate((el) => el.getBoundingClientRect().height);
  await page.evaluate((y) => {
    document.documentElement.style.scrollBehavior = "auto";
    document.documentElement.style.scrollSnapType = "none";
    scrollTo(0, y);
  }, start - header);
  await expect
    .poll(async () => Number(await root.getAttribute("data-progress")) || 0)
    .toBeLessThan(0.01);
  await expect(root.locator(".mask-reveal-media")).toHaveCSS(
    "clip-path",
    "none",
  );
  await expect(root.locator(".mask-reveal-copy")).toHaveCount(0);
  await expect(root.locator(".mask-reveal-media")).toHaveCSS(
    "transform",
    /matrix\(0.22,/,
  );
  await page.evaluate((y) => scrollTo(0, y), start + 920);
  await expect
    .poll(async () => Number(await root.getAttribute("data-progress")))
    .toBeGreaterThan(0.95);
  expect(Math.round((await stage.boundingBox())!.y)).toBe(Math.round(header));
  await expect(root.locator(".mask-reveal-copy")).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(root).toHaveAttribute("data-static", "true");
  await expect(stage).toHaveCSS("position", "relative");
  expect(
    await root.evaluate(
      (el) =>
        (el as HTMLElement).offsetHeight ===
        (el.querySelector(".mask-reveal-stage") as HTMLElement).offsetHeight,
    ),
  ).toBe(true);
});
test("growth dialog traps focus, restores trigger and preserves answers on reopen", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.locator(".survey-start");
  const dialog = page.getByRole("dialog", {
    name: "YOUR BUSINESS GROWTH CHECK",
  });
  await expect(dialog).not.toBeVisible();
  await trigger.click();
  await expect(dialog).toBeVisible();
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  await expect(page.locator("#home-survey-question")).toBeFocused();
  await fillBusinessDetails(page);
  await dialog.getByRole("radio").nth(1).check();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await expect(dialog.getByRole("radio").nth(1)).toBeChecked();
  for (let i = 0; i < 8; i++) await page.keyboard.press("Tab");
  expect(
    await page.evaluate(() =>
      document
        .querySelector(".growth-dialog")
        ?.contains(document.activeElement),
    ),
  ).toBe(true);
  const scan = await new AxeBuilder({ page })
    .include(".growth-dialog")
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();
  expect(scan.violations).toEqual([]);
  await dialog.getByRole("button", { name: "Close growth checker" }).click();
  await expect(trigger).toBeFocused();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
