import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { services } from "@/content/catalog";
export const metadata = {
  title: "Design, engineering and growth services — Wexoraa",
  description:
    "Explore Wexoraa services from branding and websites to CRM, ERP, AI automation, SEO and creative production.",
  alternates: { canonical: "/services" },
};
export default function Page() {
  return (
    <PageShell
      eyebrow="OUR CAPABILITIES"
      title="The right skills. One shared direction."
      intro="Choose a focused service or combine disciplines around a bigger business challenge."
    >
      <section className="section">
        <nav className="catalog-filters" aria-label="Service groups">
          {["build", "operate", "grow"].map((g) => (
            <a href={`#${g}`} key={g}>
              {g.toUpperCase()} ↓
            </a>
          ))}
        </nav>
        {["build", "operate", "grow"].map((g) => (
          <section key={g} id={g} className="service-group">
            <h2>{g.charAt(0).toUpperCase() + g.slice(1)}.</h2>
            <div className="catalog-grid">
              {services
                .filter((s) => s.group === g)
                .map((s) => (
                  <Link
                    className="catalog-card"
                    key={s.slug}
                    href={`/services/${s.slug}`}
                  >
                    <span>{g.toUpperCase()} ↗</span>
                    <h3>{s.title}</h3>
                    <p>{s.intro}</p>
                    <strong>See how we can help ↗</strong>
                  </Link>
                ))}
            </div>
          </section>
        ))}
      </section>
    </PageShell>
  );
}
