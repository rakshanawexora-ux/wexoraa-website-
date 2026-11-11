import { PageShell } from "@/components/page-shell";
export const metadata = {
  title: "About Wexoraa Infotech — Connected technology partner",
  description:
    "An integrated technology, creative and business growth partner in Coimbatore and Tamil Nadu.",
  alternates: { canonical: "/about" },
};
export default function Page() {
  return (
    <PageShell
      eyebrow="WEXORAA INFOTECH / COIMBATORE"
      title="Different disciplines. One shared direction."
      intro="Wexoraa is an integrated technology, creative and business growth partner. We connect what your business shows the world with the systems that run behind it."
    >
      <section className="section detail-grid">
        <h2>
          Less coordination.
          <br />
          More shared context.
        </h2>
        <div>
          <p>
            Businesses often manage separate vendors for branding, websites,
            software and marketing. Useful context can disappear between each
            handoff.
          </p>
          <p>
            Our partnership model brings those conversations together. We start
            with the business problem, then connect strategy, design,
            engineering and growth around it.
          </p>
          <p>
            Based around the needs of businesses in Coimbatore and Tamil Nadu,
            with the care and clarity expected of a modern technology partner.
          </p>
        </div>
      </section>
      <section className="section catalog-grid">
        {[
          [
            "Understand before recommending",
            "We ask about your people, processes, customers and constraints before choosing a solution.",
          ],
          [
            "Make the scope clear",
            "We define deliverables, responsibilities and expectations so the next step is easier to understand.",
          ],
          [
            "Build for continuity",
            "We consider maintenance, integrations and future priorities alongside the first release.",
          ],
        ].map(([t, d]) => (
          <article className="catalog-card" key={t}>
            <h3>{t}</h3>
            <p>{d}</p>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
