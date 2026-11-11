import { pageMetadata } from "@/lib/seo";
import { PageShell } from "@/components/page-shell";
export const metadata = pageMetadata(
  "About Wexoraa Infotech — Connected technology partner",
  "An integrated technology, creative and business growth partner in Coimbatore and Tamil Nadu.",
  "/about",
);
export default function Page() {
  return (
    <PageShell
      eyebrow="WEXORAA INFOTECH / COIMBATORE"
      title="One team for your website, software and marketing."
      intro="We help businesses in Coimbatore and beyond look good online, manage everyday work and reach more customers. You can work with one team for design, development and digital marketing."
    >
      <section className="section detail-grid">
        <h2>
          Fewer people to chase.
          <br />
          One team that understands your business.
        </h2>
        <div>
          <p>
            Businesses often manage separate vendors for branding, websites,
            software and marketing. Useful context can disappear between each
            handoff.
          </p>
          <p>
            We keep those conversations in one place. Tell us what you want to
            improve, and we will help you choose the design, software or
            marketing work that makes sense.
          </p>
          <p>
            We work with businesses in Coimbatore and Tamil Nadu, and can work
            with your team remotely too.
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
            "Support you after launch",
            "We plan for updates, support and the next things your business may need.",
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
