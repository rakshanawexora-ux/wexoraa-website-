import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return process.env.NEXT_PUBLIC_SITE_URL
    ? {
        rules: {
          userAgent: "*",
          allow: "/",
          disallow: ["/api/", "/business-assessment/thank-you"],
        },
        sitemap: new URL(
          "/sitemap.xml",
          process.env.NEXT_PUBLIC_SITE_URL,
        ).toString(),
      }
    : { rules: { userAgent: "*", disallow: "/" } };
}
