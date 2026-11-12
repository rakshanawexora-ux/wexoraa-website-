import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { homeFaqs } from "../src/content/faqs";
test("services open on mouse hover and remain keyboard/touch accessible; FAQ answers match schema", async ({
  page,
  request,
}) => {
  await page.goto("/");
  await page.locator(".nav-services-trigger > a").hover();
  await expect(page.locator("#services-dropdown")).toBeVisible();
  await page
    .locator("#services-dropdown")
    .getByRole("link", { name: "UI/UX design", exact: true })
    .hover();
  await expect(page.locator("#services-dropdown")).toBeVisible();
  await page.locator(".wordmark").hover();
  await expect(page.locator("#services-dropdown")).toBeHidden();
  const faq = page.locator(".home-faq");
  await faq.getByText(homeFaqs[0].question, { exact: true }).click();
  await expect(
    faq.getByText(homeFaqs[0].answer, { exact: true }),
  ).toBeVisible();
  const second = faq.locator("summary").nth(1);
  await second.focus();
  await page.keyboard.press("Enter");
  await expect(
    faq.getByText(homeFaqs[1].answer, { exact: true }),
  ).toBeVisible();
  await page.setViewportSize({ width: 390, height: 900 });
  const scan = await new AxeBuilder({ page })
    .include(".home-faq")
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(scan.violations.map((v) => v.id)).toEqual([]);
  const html = await (await request.get("/")).text();
  expect(html).toContain("FAQPage");
  expect(html).toContain(homeFaqs[0].question);
  await page.locator(".footer-invite-link").hover();
  const arrow = page.locator(".footer-invite-link > .action-arrow");
  expect((await arrow.boundingBox())!.width).toBeLessThanOrEqual(20);
  await expect(arrow).toHaveCSS("color", "rgb(255, 255, 255)");
});
