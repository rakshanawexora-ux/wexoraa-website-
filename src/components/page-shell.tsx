import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Header, Footer } from "@/components/home";
import { EnquiryCTA } from "@/components/enquiry-popup";
import StudioScene from "@/components/studio-scene";
export function PageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main id="main">
        <section className="page-hero section">
          <div className="page-hero-copy">
            <p className="eyebrow">
              <span />
              {eyebrow}
            </p>
            <h1>{title}</h1>
            <p>{intro}</p>
            <div className="page-hero-actions">
              <EnquiryCTA interest={title} className="button">
                Discuss your project <ArrowUpRight size={18} />
              </EnquiryCTA>
              <Link className="button text-link" href="/business-assessment">
                Check your growth score <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
          <StudioScene />
        </section>
        {children}
        <section className="page-final section">
          <p className="eyebrow">
            <span /> LET’S TALK ABOUT YOUR BUSINESS
          </p>
          <h2>
            Not sure where to start?
            <br />
            Let’s work it out together.
          </h2>
          <p>
            Tell us what is getting in the way, or what you would like to do
            next. We will help you find a practical first step.
          </p>
          <EnquiryCTA interest={title} className="button">
            Tell us what you need <ArrowUpRight size={18} />
          </EnquiryCTA>
        </section>
      </main>
      <Footer />
    </>
  );
}
