import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { solutions } from "@/content/site";
import { services } from "@/content/catalog";
import { PageShell } from "@/components/page-shell";
export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = solutions.find((s) => s.id === slug);
  return s
    ? pageMetadata(
        `${s.title} — Wexoraa Infotech`,
        s.description,
        `/solutions/${slug}`,
      )
    : { title: "Page not found", robots: { index: false, follow: false } };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = solutions.find((s) => s.id === slug);
  if (!s) notFound();
  return (
    <PageShell
      eyebrow={`${s.title.toUpperCase()} / CONNECTED SOLUTIONS`}
      title={s.description}
      intro={s.detail}
    >
      <section className="section solution-explanation">
        <h2>
          {slug === "build"
            ? "Help customers understand and use your business online."
            : slug === "operate"
              ? "Make everyday work easier for your team."
              : "Get found by people who need what you offer."}
        </h2>
        <p>
          {slug === "build"
            ? "We start with your customers and what they need to do. Then we design your brand, website or app so it is clear, easy to use and ready for your business."
            : slug === "operate"
              ? "If your team keeps copying information between spreadsheets, inboxes and tools, we can help. We look at how you work and recommend software that saves those extra steps."
              : "We help you choose where to show up, what to say and how to measure the response. That can include search, social media, ads, videos and changes to your website."}
        </p>
      </section>
      <section className="section catalog-grid">
        {services
          .filter((x) => x.group === slug)
          .map((x) => (
            <Link
              key={x.slug}
              className="catalog-card"
              href={`/services/${x.slug}`}
            >
              <span>SERVICE ↗</span>
              <h3>{x.title}</h3>
              <p>{x.intro}</p>
              <strong>Explore the approach ↗</strong>
            </Link>
          ))}
      </section>
    </PageShell>
  );
}
