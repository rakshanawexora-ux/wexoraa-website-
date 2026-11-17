import type { Page } from "@playwright/test";
import { expect } from "./fixtures";
export const leadEndpoint =
  "https://script.google.com/macros/s/AKfycbygoEEdr_nZjIOT5RRDDl_cY2-CJc262nASU41o6iW2esfPXqWj0MJ5Vasy9crCbRMSpg/exec";
export async function fillBusinessDetails(page: Page) {
  const c = page.locator(".solution-check");
  await c.getByLabel("Full name", { exact: true }).fill("Test Owner");
  await c
    .getByLabel("Organisation name", { exact: true })
    .fill("Sample Studio");
  await c.getByLabel("Designation / role", { exact: true }).fill("Owner");
  await c.getByLabel("Work email", { exact: true }).fill("owner@example.com");
  await c
    .getByLabel("Phone number (with country code)", { exact: true })
    .fill("+919876543210");
  await c.getByRole("button", { name: "Continue", exact: true }).click();
  await c
    .getByRole("radio", { name: "Retail / Shopping", exact: true })
    .check();
  await c.getByRole("radio", { name: "1–3 years", exact: true }).check();
  await c
    .getByRole("checkbox", { name: "They visit our website", exact: true })
    .check();
  await c.getByRole("button", { name: "Continue", exact: true }).click();
}
export async function completeChallenges(page: Page) {
  const c = page.locator(".solution-check");
  await c
    .getByRole("checkbox", { name: "Getting new customers", exact: true })
    .check();
  await c
    .getByRole("checkbox", { name: "We manage things smoothly", exact: true })
    .check();
  await c
    .getByRole("radio", { name: "Using business software", exact: true })
    .check();
  await c
    .getByRole("checkbox", { name: "No major repetitive tasks", exact: true })
    .check();
  await c.getByRole("button", { name: "Continue", exact: true }).click();
}
export async function completeDigital(page: Page) {
  const c = page.locator(".solution-check");
  await c
    .getByRole("radio", {
      name: "Our website represents our business well",
      exact: true,
    })
    .check();
  await c
    .getByRole("radio", {
      name: "We use multiple online channels",
      exact: true,
    })
    .check();
  await c
    .getByRole("checkbox", {
      name: "Our current marketing is delivering good results",
      exact: true,
    })
    .check();
  await c.getByRole("radio", { name: "No", exact: true }).check();
  await c.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(
    c.getByRole("heading", { name: "Anything else we should understand?" }),
  ).toBeVisible();
}
