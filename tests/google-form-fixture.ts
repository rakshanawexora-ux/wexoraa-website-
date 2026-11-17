import type { Page } from "@playwright/test";
// Do not send real enquiries or depend on Google's network in browser tests.
export async function stubGoogleForm(page: Page) {
  await page.route("https://docs.google.com/forms/**", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: '<!doctype html><html lang="en"><head><title>Hosted form test placeholder</title></head><body><main><p>Google-hosted form placeholder. External delivery is not tested here.</p></main></body></html>',
    }),
  );
}
