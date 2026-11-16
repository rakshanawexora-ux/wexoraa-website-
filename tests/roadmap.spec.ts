import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("growth invitation directly follows logos and roadmap supports touch and keyboard", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 950 });
  await page.goto("/");
  expect(
    await page
      .locator(".client-marquee")
      .evaluate((el) => el.nextElementSibling?.id),
  ).toBe("challenge");
  expect(
    await page
      .locator("#challenge")
      .evaluate((el) =>
        el.nextElementSibling?.nextElementSibling?.classList.contains(
          "bending-brand-strip",
        ),
      ),
  ).toBe(true);
  expect(
    await page
      .locator("#solutions")
      .evaluate((el) =>
        el.nextElementSibling?.classList.contains("mask-reveal"),
      ),
  ).toBe(true);
  await expect(page.locator(".client-stories")).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "View more projects" }),
  ).toHaveAttribute("href", "/work");
  const process = page.locator("#process");
  const tabs = process.getByRole("tab");
  await tabs.nth(5).click();
  await expect(process.getByRole("tabpanel")).toContainText(
    "Improve as your business grows.",
  );
  await tabs.nth(5).focus();
  await page.keyboard.press("Home");
  await expect(tabs.first()).toHaveAttribute("aria-selected", "true");
  await page.emulateMedia({ reducedMotion: "reduce" });
  const scan = await new AxeBuilder({ page }).include("#process").analyze();
  expect(scan.violations).toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
