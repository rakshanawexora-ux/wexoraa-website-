import { test, expect } from "@playwright/test";
import {
  pageMetadata,
  organizationSchema,
  serviceSchema,
} from "../src/lib/seo";
test("SEO uses configured domain and safely excludes unconfigured domains", () => {
  const original = process.env.NEXT_PUBLIC_SITE_URL;
  try {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    expect(
      pageMetadata("Services", "Description", "/services").alternates,
    ).toBeUndefined();
    expect(organizationSchema()).toBeNull();
    process.env.NEXT_PUBLIC_SITE_URL = "https://wexoraa.test";
    const metadata = pageMetadata("Services", "Description", "/services");
    expect(metadata.alternates?.canonical).toBe(
      "https://wexoraa.test/services",
    );
    expect(organizationSchema()).toBeTruthy();
    expect(
      serviceSchema("Web development", "Description", "web-development"),
    ).toBeTruthy();
    process.env.NEXT_PUBLIC_SITE_URL = "javascript:alert(1)";
    expect(
      pageMetadata("Services", "Description", "/services").alternates,
    ).toBeUndefined();
  } finally {
    if (original === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = original;
  }
});
test("social image renders and pages have unique descriptive metadata", async ({
  request,
}) => {
  const image = await request.get("/opengraph-image");
  expect(image.ok()).toBe(true);
  expect(image.headers()["content-type"]).toContain("image/png");
  const home = await (await request.get("/")).text();
  const services = await (await request.get("/services")).text();
  expect(home).toContain('name="description"');
  expect(services).toContain('property="og:title"');
  expect(home.match(/<title>(.*?)<\/title>/)?.[1]).not.toBe(
    services.match(/<title>(.*?)<\/title>/)?.[1],
  );
});

test("every page has a unique title, description and one clear main heading", async ({
  page,
}) => {
  const { services, projects } = await import("../src/content/catalog");
  const paths = [
    "/",
    "/about",
    "/services",
    "/process",
    "/work",
    "/contact",
    "/privacy",
    "/business-assessment",
    "/business-assessment/thank-you",
    ...services.map((s) => `/services/${s.slug}`),
    ...projects.map((p) => `/work/${p.slug}`),
  ];
  const titles = new Set<string>();
  for (const path of paths) {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    const title = await page.title();
    expect(title.length).toBeGreaterThan(15);
    expect(titles.has(title), path).toBe(false);
    titles.add(title);
    const description = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(description?.length, path).toBeGreaterThan(60);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      title,
    );
  }
});
