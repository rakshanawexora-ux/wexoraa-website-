import { siteOrigin } from "@/lib/seo";
import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  const origin = siteOrigin();
  return origin
    ? {
        rules: {
          userAgent: "*",
          allow: "/",
          disallow: ["/api/", "/business-assessment/thank-you"],
        },
        sitemap: new URL("/sitemap.xml", origin).toString(),
      }
    : { rules: { userAgent: "*", disallow: "/" } };
}
