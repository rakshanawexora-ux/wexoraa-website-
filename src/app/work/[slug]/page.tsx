import Image from "next/image";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { projects } from "@/content/catalog";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return {
    title: p ? `${p.title} Studio concept — Wexoraa` : "Concept not found",
    description: p?.solution,
    alternates: { canonical: `/work/${slug}` },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <PageShell
      eyebrow="STUDIO CONCEPT / NOT CLIENT WORK"
      title={p.title}
      intro={p.type}
    >
      <section className="section concept-detail">
        <div className="concept-cover">
          <Image src={p.image} alt={p.alt} fill priority sizes="90vw" />
        </div>
        <div className="case-narrative">
          {[
            ["The illustrative challenge", p.problem],
            ["A proposed direction", p.solution],
            ["Outcome status", p.outcome],
          ].map(([t, d]) => (
            <article key={t}>
              <h2>{t}</h2>
              <p>{d}</p>
            </article>
          ))}
        </div>
        <div className="service-chips">
          {p.services.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
