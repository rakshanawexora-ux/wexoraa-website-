import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { PageShell } from "@/components/page-shell";
import ServiceExplorer from "@/components/service-explorer";
import SystemsIllustration from "@/components/systems-illustration";
import { solutions } from "@/content/site";
import { serviceFor } from "@/content/catalog";
export const metadata = pageMetadata(
  "What We Do | Wexoraa",
  "One team for brand design, websites, apps, business systems and digital marketing. Find practical help for your next business challenge.",
  "/services",
);
export default function Page() {
  return (
    <PageShell
      eyebrow="WHAT WE DO"
      title="Better design. Easier work. More ways to grow."
      intro="We help you look the part, run things better and reach the right people. Start with the problem you want to solve—we’ll bring the right design, software and marketing skills together."
      heroActions={false}
      finalCTA={false}
    >
      <section className="section what-overview">
        <div className="what-overview-heading">
          <div>
            <p className="eyebrow">
              <span /> THREE WAYS WE CAN HELP
            </p>
            <h2>
              Good for your customers.
              <br />
              Useful for your business.
            </h2>
          </div>
          <p>
            You don’t need everything at once. Start with one area, and we’ll
            make sure it works with the rest of your business.
          </p>
        </div>
        <div className="what-area-grid">
          {solutions.map((area, i) => (
            <article className="what-area" id={area.id} key={area.id}>
              <div className="what-area-visual">
                {area.id === "operate" ? (
                  <SystemsIllustration label={area.imageAlt} />
                ) : (
                  <Image
                    src={area.image}
                    alt={area.imageAlt}
                    width={800}
                    height={450}
                    sizes="(max-width:900px) 100vw,33vw"
                  />
                )}
              </div>
              <div className="what-area-copy">
                <span>
                  0{i + 1} / {area.shortTitle.toUpperCase()}
                </span>
                <h2>{area.title}</h2>
                <p>{area.detail}</p>
                <ul>
                  {area.services.map((service) => (
                    <li key={service}>
                      <Link href={`/services/${serviceFor(service)!.slug}`}>
                        {service}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
      <ServiceExplorer />
      <section className="section what-expect">
        <p className="eyebrow">
          <span /> SIMPLE FROM THE START
        </p>
        <h2>Know what you’re getting.</h2>
        <div>
          {[
            [
              "A useful first conversation",
              "We ask about your business, what is getting in the way and the result you need.",
            ],
            [
              "Clear work, timing and costs",
              "You review the scope and quote before deciding. No guessing what is included.",
            ],
            [
              "Updates you can follow",
              "We share progress, ask for your feedback and agree on support before launch.",
            ],
          ].map(([title, copy], i) => (
            <article key={title}>
              <span>0{i + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
