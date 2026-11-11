import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import Image from "next/image";
import { PageShell } from "@/components/page-shell";
import { projects } from "@/content/catalog";
export const metadata = pageMetadata(
  "Studio concepts and approach — Wexoraa",
  "Explore illustrative brand and connected-system concepts, with clear context and no fabricated client results.",
  "/work",
);
export default function Page() {
  return (
    <PageShell
      eyebrow="THINKING, MADE TANGIBLE"
      title="A look at the possibilities."
      intro="Original studio concepts showing creative and technical thinking. These are illustrative explorations, not commissioned client work or verified case studies."
    >
      <section className="section work-grid">
        {projects.map((p) => (
          <Link className="work-card" key={p.slug} href={`/work/${p.slug}`}>
            <div className="project-image">
              <Image
                src={p.image}
                alt={p.alt}
                fill
                sizes="(max-width:640px) 100vw,50vw"
              />
              <span className="project-pill">STUDIO CONCEPT</span>
            </div>
            <div className="work-title">
              <div>
                <h2>{p.title}</h2>
                <p>{p.type}</p>
              </div>
              <span>EXPLORE ↗</span>
            </div>
          </Link>
        ))}
      </section>
    </PageShell>
  );
}
