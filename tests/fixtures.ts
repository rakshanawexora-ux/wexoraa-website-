import { test as base, expect } from "@playwright/test";
export const test = base.extend({
  page: async ({ page }, providePage) => {
    // Never send test leads to a real Google Sheet. Individual tests mock replies.
    await page.route("https://script.google.com/**", (route) => route.abort());
    await providePage(page);
  },
});
export { expect };
