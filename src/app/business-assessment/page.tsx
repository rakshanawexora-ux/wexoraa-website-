import { pageMetadata } from "@/lib/seo";
import Survey from "@/components/assessment";
import { Header, Footer } from "@/components/home";
import { emailConfigured } from "@/lib/enquiry";
export const metadata = pageMetadata(
  "Check your business growth readiness — Wexoraa",
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
            <span /> CHECK YOUR BUSINESS GROWTH READINESS
          </p>
          <h1>Want to see your business growth score?</h1>
          <p>
            Answer 12 simple questions about your website, marketing and daily
            work. Get a growth-readiness score and practical next steps, with no
            email needed. This checks your digital setup; it does not predict
            sales.
          </p>
        </div>
        <Survey configured={emailConfigured()} />
      </main>
      <Footer />
    </>
  );
}
