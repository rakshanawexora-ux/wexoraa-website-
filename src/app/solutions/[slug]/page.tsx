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
            ? "Make the experience match your ambition."
            : slug === "operate"
              ? "Let your systems support your people."
              : "Give your next move a clearer direction."}
        </h2>
        <p>
          {slug === "build"
            ? "A website, application or identity should solve a clear problem. We align positioning, user needs and engineering decisions before creating the experience."
            : slug === "operate"
              ? "Disconnected information creates extra work. We look at the workflow, responsibilities and existing tools before recommending software or automation."
              : "Growth needs a consistent message and a way to learn what works. We connect creative, channels and measurement around practical business priorities."}
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
