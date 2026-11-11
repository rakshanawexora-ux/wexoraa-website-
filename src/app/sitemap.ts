import type { MetadataRoute } from "next";
import { services, projects } from "@/content/catalog";
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_SITE_URL;
  if (!origin) return [];
  const paths = [
    "",
    "/solutions",
    "/solutions/build",
    "/solutions/operate",
    "/solutions/grow",
    "/services",
    "/work",
    "/about",
    "/process",
    "/business-assessment",
    "/contact",
    "/privacy",
    ...services.map((s) => `/services/${s.slug}`),
    ...projects.map((p) => `/work/${p.slug}`),
  ];
  return paths.map((path) => ({
    url: new URL(path, origin).toString(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
