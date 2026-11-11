import type { Metadata } from "next";
export function siteOrigin() {
  const value = process.env.NEXT_PUBLIC_SITE_URL;
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return undefined;
    return url.origin;
  } catch {
    return undefined;
  }
}
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const origin = siteOrigin();
  const url = origin ? new URL(path, origin).toString() : undefined;
  return {
    title,
    description,
    ...(origin
      ? { metadataBase: new URL(origin), alternates: { canonical: url } }
      : {}),
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "Wexoraa Infotech",
      locale: "en_IN",
      ...(url
        ? {
            url,
            images: [
              {
                url: new URL("/opengraph-image", origin!).toString(),
                width: 1200,
                height: 630,
                alt: "Wexoraa Infotech — Build. Operate. Grow.",
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(origin
        ? { images: [new URL("/opengraph-image", origin).toString()] }
        : {}),
    },
    robots: { index: !!origin, follow: true },
  };
}
export function organizationSchema() {
  const origin = siteOrigin();
  if (!origin) return null;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${origin}/#organization`,
        name: "Wexoraa Infotech",
        url: origin,
        logo: `${origin}/brand/wexoraa-logo.svg`,
        description:
          "An integrated technology, creative and business growth partner.",
        areaServed: [
          { "@type": "Place", name: "Coimbatore, Tamil Nadu, India" },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        url: origin,
        name: "Wexoraa Infotech",
        publisher: { "@id": `${origin}/#organization` },
      },
    ],
  };
}
export function serviceSchema(
  title: string,
  description: string,
  slug: string,
) {
  const origin = siteOrigin();
  if (!origin) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description,
    url: `${origin}/services/${slug}`,
    provider: {
      "@type": "Organization",
      name: "Wexoraa Infotech",
      "@id": `${origin}/#organization`,
    },
  };
}
