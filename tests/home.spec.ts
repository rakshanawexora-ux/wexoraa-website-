import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { services, projects } from "../src/content/catalog";
for (const width of [360, 390, 768, 1024, 1440])
  test(`responsive homepage and accessibility ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Good design.",
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    for (const img of await page.locator("img").all()) {
      await img.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          img.evaluate(
            (el) =>
              el instanceof HTMLImageElement &&
              el.complete &&
              el.naturalWidth > 0,
          ),
        )
        .toBe(true);
    }
    if (width < 641) {
      await page.getByRole("button", { name: "Open navigation" }).click();
      await expect(
        page.getByRole("navigation", { name: "Main navigation" }),
      ).toBeVisible();
      await page.keyboard.press("Escape");
    }
    const scan = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      scan.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
    ).toEqual([]);
    expect(errors).toEqual([]);
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({
      path: `/workspace/artifacts/complete-site-${width}.png`,
      fullPage: true,
      style: ".cursor-accent{visibility:hidden}",
    });
  });
test("cursor position changes hero depth; scroll and reduced motion stay supported", async ({
  page,
}) => {
  await page.goto("/");
  const visual = page.locator(".hero-image-wrap");
  await page.locator(".hero-media").scrollIntoViewIfNeeded();
  const before = await visual.evaluate((el) => getComputedStyle(el).transform);
  const bounds = await page.locator(".hero-media").boundingBox();
  await page.mouse.move(
    bounds!.x + bounds!.width * 0.85,
    bounds!.y + bounds!.height * 0.25,
  );
  await expect
    .poll(() => visual.evaluate((el) => getComputedStyle(el).transform))
    .not.toBe(before);
  await expect(page.locator(".cursor-accent")).toHaveAttribute(
    "data-label",
    "Explore",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(visual).toHaveCSS("transform", "none");
  await expect(page.locator(".cursor-accent")).toHaveCSS("display", "none");
  await expect(page.locator(".scroll-progress")).toHaveCSS("display", "none");
});
test("every published content route renders, unknown routes 404 and navigation uses real pages", async ({
  page,
  request,
}) => {
  const routes = [
    "/solutions",
    "/solutions/build",
    "/solutions/operate",
    "/solutions/grow",
    "/services",
    "/work",
    "/about",
    "/process",
    "/contact",
    "/privacy",
    "/business-assessment",
    "/business-assessment/thank-you",
    ...services.map((s) => `/services/${s.slug}`),
    ...projects.map((p) => `/work/${p.slug}`),
  ];
  for (const path of routes) {
    const r = await request.get(path);
    expect(r.status(), path).toBe(200);
    expect(await r.text(), path).toContain("<h1");
  }
  expect((await request.get("/services/no-such-service")).status()).toBe(404);
  expect((await request.get("/solutions/no-such-solution")).status()).toBe(404);
  await page.goto("/");
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Services", exact: true })
    .click();
  await expect(page).toHaveURL(/\/services$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "The right skills.",
  );
  await page
    .getByRole("link", { name: /Websites & e-commerce/ })
    .first()
    .click();
  await expect(page).toHaveURL(/\/services\/websites-ecommerce$/);
});
test("contact form keeps values after failure and confirms only accepted requests", async ({
  page,
}) => {
  await page.goto("/contact?interest=Website");
  await page.getByLabel("Your name", { exact: true }).fill("Test Visitor");
  await page.getByLabel("Company name", { exact: true }).fill("Test Company");
  await page
    .getByLabel("Work email", { exact: true })
    .fill("visitor@example.com");
  await page.getByLabel("Phone number", { exact: true }).fill("+919876543210");
  await page
    .getByLabel("Tell us a little about your goals")
    .fill("We need a clearer mobile website and enquiry journey.");
  await page.getByRole("checkbox").check();
  await page.route("**/api/enquiry", (r) =>
    r.fulfill({
      status: 502,
      json: { error: "Temporary email service failure. Please retry." },
    }),
  );
  await page.getByRole("button", { name: "Send project enquiry" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Temporary email service failure",
  );
  await expect(page.getByLabel("Your name", { exact: true })).toHaveValue(
    "Test Visitor",
  );
  await expect(
    page.getByRole("heading", { name: "Thanks. Your enquiry is on its way." }),
  ).toHaveCount(0);
  await page.route("**/api/enquiry", (r) =>
    r.fulfill({ status: 200, json: { accepted: true } }),
  );
  await page.getByRole("button", { name: "Try sending again" }).click();
  await expect(
    page.getByRole("heading", { name: "Thanks. Your enquiry is on its way." }),
  ).toBeVisible();
});
for (const route of [
  "/contact",
  "/services/websites-ecommerce",
  "/solutions/operate",
  "/work/considered-brand-experience",
  "/about",
  "/process",
  "/privacy",
])
  test(`mobile content accessibility ${route}`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 950 });
    await page.goto(route);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const scan = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      scan.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
    ).toEqual([]);
  });

test("studio film plays, pauses and reacts to browser reduced motion", async ({
  page,
}) => {
  await page.goto("/");
  const video = page.locator(".brand-film");
  await expect(
    page.getByRole("button", { name: "Play studio film" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Play studio film" }).click();
  await expect
    .poll(() =>
      video.evaluate((el) =>
        el instanceof HTMLVideoElement ? el.currentTime : 0,
      ),
    )
    .toBeGreaterThan(0.2);
  await expect(
    page.getByRole("button", { name: "Pause studio film" }),
  ).toBeVisible();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect
    .poll(() =>
      video.evaluate((el) => el instanceof HTMLVideoElement && el.paused),
    )
    .toBe(true);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.getByRole("button", { name: "Play studio film" }).click();
  await page.getByRole("button", { name: "Pause studio film" }).click();
  await expect
    .poll(() =>
      video.evaluate((el) => el instanceof HTMLVideoElement && el.paused),
    )
    .toBe(true);
});
test("inner page graphic changes selection and service card reacts to pointer movement", async ({
  page,
}) => {
  await page.goto("/services");
  await page
    .locator(".studio-scene")
    .getByRole("button", { name: "Operate", exact: true })
    .click();
  await expect(page.locator(".scene-bottom")).toContainText(
    "Connect the way work happens.",
  );
  await expect(
    page.getByRole("link", { name: "Explore Operate solutions" }),
  ).toHaveAttribute("href", "/solutions/operate");
  const card = page.locator(".catalog-card").first();
  await card.scrollIntoViewIfNeeded();
  const box = await card.boundingBox();
  await page.mouse.move(
    box!.x + box!.width * 0.85,
    box!.y + box!.height * 0.25,
  );
  await expect
    .poll(() => card.evaluate((el) => el.style.getPropertyValue("--tilt-y")))
    .not.toBe("");
  await expect
    .poll(() => card.evaluate((el) => getComputedStyle(el).transform))
    .not.toBe("none");
  await expect(
    page.getByRole("navigation", { name: "Footer explore" }),
  ).toBeVisible();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect
    .poll(() =>
      card.evaluate(
        (el) =>
          new DOMMatrixReadOnly(getComputedStyle(el).transform).isIdentity,
      ),
    )
    .toBe(true);
});

test("service explorer filters, searches and recovers from no results", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 950 });
  await page.goto("/services");
  await expect(page.locator(".service-results .catalog-card")).toHaveCount(12);
  await page
    .getByRole("button", { name: "Operate", exact: true })
    .last()
    .click();
  await expect(page.locator(".service-results .catalog-card")).toHaveCount(4);
  await page.getByRole("searchbox", { name: "Search services" }).fill("CRM");
  await expect(page.locator(".service-results .catalog-card")).toHaveCount(1);
  await page
    .getByRole("searchbox", { name: "Search services" })
    .fill("unmatched-example");
  await expect(
    page.getByRole("heading", { name: "No exact match yet." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Reset filters" }).click();
  await expect(page.locator(".service-results .catalog-card")).toHaveCount(12);
  const scan = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(
    scan.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
  ).toEqual([]);
});

test("simple service enquiry popup is accessible and restores focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/services");
  await expect(
    page.getByRole("button", { name: "Pause motion", exact: true }),
  ).toHaveCount(0);
  const cta = page.locator(".service-card-actions a").first();
  await cta.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('input[name="name"]')).toBeFocused();
  await expect(
    dialog.locator(
      'input[name="name"], input[name="email"], input[name="phone"]',
    ),
  ).toHaveCount(3);
  const scan = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(
    scan.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
  ).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(cta).toBeFocused();
  await cta.click();
  await page.route("**/api/enquiry", async (route) => {
    const payload = route.request().postDataJSON();
    expect(payload.company).toBe("");
    expect(payload.interest).toBeTruthy();
    expect(payload.consent).toBe(true);
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ accepted: true }),
    });
  });
  await dialog.locator('input[name="name"]').fill("Test Person");
  await dialog.locator('input[name="email"]').fill("person@example.com");
  await dialog.locator('input[name="phone"]').fill("9876543210");
  await dialog
    .locator("textarea")
    .fill("We need help improving our business website.");
  await dialog.getByRole("checkbox").check();
  await dialog.getByRole("button", { name: "Send project enquiry" }).click();
  await expect(
    dialog.getByRole("heading", {
      name: "Thanks. Your enquiry is on its way.",
    }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
