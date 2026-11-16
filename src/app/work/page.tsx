import { pageMetadata } from "@/lib/seo";
import { Header, Footer } from "@/components/home";
import WorkShowcase from "@/components/work-showcase";
export const metadata = pageMetadata(
  "Studio concepts and approach — Wexoraa",
  "Explore illustrative brand and connected-system concepts, with clear context and no fabricated client results.",
  "/work",
);
export default function Page() {
  return (
    <div className="page-frame">
      <Header />
      <main id="main" className="work-page section">
        <section className="work-intro">
          <p className="eyebrow">
            <span /> OUR WORK / OUR THINKING
          </p>
          <h1>
            Explore our projects<span>.</span>
          </h1>
          <p>
            A few ideas for better brands, useful websites and simpler ways to
            work. These are studio concepts with placeholder imagery.
          </p>
        </section>
        <WorkShowcase />
      </main>
      <Footer />
    </div>
  );
}
