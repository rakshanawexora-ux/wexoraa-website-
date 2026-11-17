import { pageMetadata } from "@/lib/seo";
import Survey from "@/components/assessment";
import { Header, Footer } from "@/components/home";
import { emailConfigured } from "@/lib/enquiry";
export const metadata = pageMetadata(
  "Check your business growth readiness — Wexoraa",
  "Share your business details and challenges in five guided steps. Get a self-reported readiness score and practical next steps after submitting your enquiry.",
  "/business-assessment",
);
export default function Page() {
  return (
    <div className="page-frame">
      <Header />
      <main id="main" className="assessment-page">
        <div className="assessment-heading">
          <p className="eyebrow">
            <span /> CHECK YOUR BUSINESS GROWTH READINESS
          </p>
          <h1>Where could your business work better?</h1>
          <p>
            Five guided steps about your business, daily work and digital
            presence. Submit your enquiry to save your report and see a
            self-reported readiness score with practical next steps. This is not
            a sales forecast.
          </p>
        </div>
        <Survey configured={emailConfigured()} />
      </main>
      <Footer />
    </div>
  );
}
