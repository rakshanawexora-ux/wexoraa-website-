import { pageMetadata } from "@/lib/seo";
import Survey from "@/components/assessment";
import { Header, Footer } from "@/components/home";
import { emailConfigured } from "@/lib/enquiry";
export const metadata = pageMetadata(
  "12-question digital-strength assessment — Wexoraa",
  "Understand your digital foundations with 12 questions, a transparent score and practical opportunities. No email required to view your results.",
  "/business-assessment",
);
export default function Page() {
  return (
    <>
      <Header />
      <main id="main" className="assessment-page">
        <div className="assessment-heading">
          <p className="eyebrow">
            <span /> FIND YOUR BUSINESS PROBLEM
          </p>
          <h1>
            12 questions.
            <br />A clearer next move.
          </h1>
          <p>
            See how strong your digital foundations are, understand the gaps and
            find a practical starting point. No email required for your result.
          </p>
        </div>
        <Survey configured={emailConfigured()} />
      </main>
      <Footer />
    </>
  );
}
