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
  heroActions = true,
  finalCTA = true,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: React.ReactNode;
  heroActions?: boolean;
  finalCTA?: boolean;
}) {
  return (
    <>
      <Header />
      <main id="main" className="inner-page">
        <nav className="page-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span>{eyebrow.split("/")[0].trim()}</span>
        </nav>
        <section className="page-hero section">
          <div className="page-hero-copy">
            <p className="eyebrow">
              <span />
              {eyebrow}
            </p>
            <h1>{title}</h1>
            <span className="page-team-promise">
              Design, software & marketing. One team that gets your business.
            </span>
            <p>{intro}</p>
            {heroActions && (
              <div className="page-hero-actions">
                <EnquiryCTA interest={title} className="button">
                  Discuss your project <ArrowUpRight size={18} />
                </EnquiryCTA>
                <Link className="button text-link" href="/business-assessment">
                  Check your growth score <ArrowUpRight size={17} />
                </Link>
              </div>
            )}
          </div>
          <StudioScene />
        </section>
        {children}
        {finalCTA && (
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
        )}
      </main>
      <Footer />
    </>
  );
}
