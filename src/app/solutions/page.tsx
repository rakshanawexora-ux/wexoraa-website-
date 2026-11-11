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
      eyebrow="BUILD. OPERATE. GROW."
      title="One partner. Three connected possibilities."
      intro="Start with what your business needs today. Connect the rest as your priorities evolve."
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
