import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("page scroll expands and releases the media; reduced motion removes the long pin", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator(".scroll-expand")).toHaveAttribute(
    "data-progress",
    /./,
  );
  const root = page.locator(".scroll-expand");
  const stage = root.locator(".scroll-expand__stage");
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
  await expect.poll(() => root.getAttribute("data-progress")).toBe("0.000");
  const before = await root
    .locator(".scroll-expand__frame")
    .evaluate((el) => (el as HTMLElement).style.clipPath);
  expect(before).toContain("19%");
  await page.evaluate(
    (y) => scrollTo(0, y),
    start - header + (1000 - header) * 0.95,
  );
  await expect
    .poll(async () => Number(await root.getAttribute("data-progress")))
    .toBeGreaterThan(0.99);
  expect(Math.round((await stage.boundingBox())!.y)).toBe(Math.round(header));
  await expect(root.locator(".scroll-expand__title")).toHaveCSS("opacity", "0");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(root).toHaveAttribute("data-static", "true");
  await expect(stage).toHaveCSS("position", "relative");
  const heights = await root.evaluate((el) => ({
    track: (el.querySelector(".scroll-expand__track") as HTMLElement)
      .offsetHeight,
    stage: (el.querySelector(".scroll-expand__stage") as HTMLElement)
      .offsetHeight,
  }));
  expect(heights.track).toBe(heights.stage);
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
  await dialog.getByRole("button", { name: "Skip for now" }).click();
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
