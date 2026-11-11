import { Header, Footer } from "@/components/home";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Privacy — Wexoraa Infotech",
  robots: { index: false, follow: true },
};
export default function Privacy() {
  return (
    <>
      <Header />
      <main id="main" className="simple-page">
        <p className="eyebrow">PRIVACY / DEVELOPMENT PREVIEW</p>
        <h1>
          Your information
          <br />
          deserves care.
        </h1>
        <p>
          This development preview has no enquiry submission, assessment storage
          or analytics integration. It does not request contact information.
        </p>
        <h2>Before enquiries launch</h2>
        <p>
          The published privacy notice will explain the legal business identity,
          contact details, email processing provider, retention practices and
          how to make a privacy request. Those details require business approval
          before forms are enabled.
        </p>
        <h2>External contact services</h2>
        <p>
          If configured, WhatsApp and telephone links open the respective
          services. Their privacy practices apply when you use them.
        </p>
      </main>
      <Footer />
    </>
  );
}
