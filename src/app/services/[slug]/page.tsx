import StructuredData from "@/components/structured-data";
import { pageMetadata, serviceSchema } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/content/catalog";
import { EnquiryCTA } from "@/components/enquiry-popup";
import { PageShell } from "@/components/page-shell";
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = services.find((s) => s.slug === slug);
  return s
    ? pageMetadata(
        `${s.title} — Wexoraa Infotech`,
        s.intro,
        `/services/${slug}`,
      )
    : { title: "Page not found", robots: { index: false, follow: false } };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = services.find((s) => s.slug === slug);
  if (!s) notFound();
  return (
    <PageShell
      eyebrow={`${s.group.toUpperCase()} / ${s.title.toUpperCase()}`}
      title={s.title}
      intro={s.intro}
    >
      <StructuredData data={serviceSchema(s.title, s.intro, s.slug)} />
      <section className="section detail-grid">
        <div>
          <p className="eyebrow">THE CHALLENGE</p>
          <h2>{s.problem}</h2>
          <h3>Our approach</h3>
          <p>{s.approach}</p>
        </div>
        <aside className="deliverable-card">
          <h3>What a project can include</h3>
          <ul>
            {s.deliverables.map((d) => (
              <li key={d}>✓ {d}</li>
            ))}
          </ul>
          <p>
            Scope, responsibilities, timeline and costs are agreed in your
            proposal. No one-size-fits-all package.
          </p>
          <EnquiryCTA
            interest={s.title}
            className="button"
            label={`Enquire about ${s.title}`}
          >
            Discuss this service ↗
          </EnquiryCTA>
        </aside>
      </section>
      <section className="section service-faq">
        <h2>A useful question.</h2>
        <details open>
          <summary>{s.question}</summary>
          <p>{s.answer}</p>
        </details>
        <Link className="text-link" href={`/solutions/${s.group}`}>
          Explore connected {s.group} solutions ↗
        </Link>
      </section>
      <section className="section">
        <p className="eyebrow">CONNECTED CAPABILITIES</p>
        <div className="catalog-grid">
          {services
            .filter((r) => r.group === s.group && r.slug !== s.slug)
            .map((r) => (
              <Link
                className="catalog-card"
                key={r.slug}
                href={`/services/${r.slug}`}
              >
                <h3>{r.title}</h3>
                <p>{r.intro}</p>
                <strong>Explore service ↗</strong>
              </Link>
            ))}
        </div>
      </section>
    </PageShell>
  );
}
