import { pageMetadata } from "@/lib/seo";
import { Header, Footer } from "@/components/home";
import WorkShowcase from "@/components/work-showcase";
export const metadata = pageMetadata(
  "Website, Ecommerce & Creative Projects | Wexoraa",
  "Explore Wexoraa website, ecommerce, video production and social media projects, with supplied project artwork and website references.",
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
            Websites, online stores and creative work for businesses with different
            goals. Explore the projects and the work behind them.
          </p>
        </section>
        <WorkShowcase />
      </main>
      <Footer />
    </div>
  );
}
