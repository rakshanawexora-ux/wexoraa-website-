import type { Page } from "@playwright/test";
export async function fillBusinessDetails(page: Page) {
  const check = page.locator(".quick-check");
  await check
    .getByLabel("Business name", { exact: true })
    .fill("Sample Studio");
  await check.getByLabel("Type of business", { exact: true }).fill("Retail");
  await check
    .getByLabel("Business stage", { exact: true })
    .selectOption("Running and looking to grow");
  await check
    .getByLabel("What needs the most help?", { exact: true })
    .selectOption("Marketing");
  await check
    .getByLabel("Tell us what’s happening", { exact: true })
    .fill("We need more enquiries from local customers.");
  await check.getByRole("button", { name: "Continue", exact: true }).click();
}
