import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Header, Footer } from "@/components/home";
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
              <Link className="button" href="/contact">
                Discuss your project <ArrowUpRight size={18} />
              </Link>
              <Link className="text-link" href="/business-assessment">
                Find your starting point <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
          <StudioScene />
        </section>
        {children}
        <section className="page-final section">
          <p className="eyebrow">
            <span /> LET’S MAKE THE NEXT STEP CLEAR
          </p>
          <h2>
            Bring the challenge.
            <br />
            We’ll connect the possibilities.
          </h2>
          <p>
            A focused project or a bigger ambition. Start with a conversation
            about what you want to change.
          </p>
          <Link className="button" href="/contact">
            Tell us what you have in mind <ArrowUpRight size={18} />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
