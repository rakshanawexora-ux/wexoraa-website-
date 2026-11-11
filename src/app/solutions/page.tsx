import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { solutions } from "@/content/site";
export const metadata = pageMetadata(
  "Connected business solutions — Wexoraa",
  "Build your brand and platforms, operate with connected systems and grow with considered marketing.",
  "/solutions",
);
export default function Page() {
  return (
    <PageShell
      eyebrow="DESIGN. SIMPLIFY. REACH MORE PEOPLE."
      title="Find the help your business needs."
      intro="Choose a starting point: design and development, business software, or digital marketing. We can help you bring them together when you need more."
    >
      <section className="section catalog-grid">
        {solutions.map((s) => (
          <Link className="catalog-card" key={s.id} href={`/solutions/${s.id}`}>
            <span>0{s.number.replace("0", "")} / SOLUTIONS ↗</span>
            <h2>{s.title}</h2>
            <p>{s.description}</p>
            <ul>
              {s.services.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <strong>Explore {s.title.toLowerCase()} ↗</strong>
          </Link>
        ))}
      </section>
    </PageShell>
  );
}
