import { pageMetadata } from "@/lib/seo";
import { Header, Footer } from "@/components/home";
export const metadata = pageMetadata(
  "Privacy and enquiry information — Wexoraa",
  "How this website handles assessment answers, contact enquiries and email processing.",
  "/privacy",
);
export default function Privacy() {
  return (
    <div className="page-frame">
      <Header />
      <main id="main" className="simple-page privacy-page">
        <p className="eyebrow">PRIVACY & INFORMATION USE</p>
        <h1>
          Your information
          <br />
          deserves care.
        </h1>
        <p>
          Here is how this website uses the details you share. Wexoraa still
          needs to confirm its legal business details, privacy contact and how
          long enquiry emails are kept before online lead collection goes live.
        </p>
        <h2>Your business check</h2>
        <p>The five-step check asks for contact details, business context, daily challenges and digital presence. Answers and contacts stay in page memory while you complete the check. They are not saved to browser storage or sent when you move between steps. Nothing is submitted until you agree to contact permission and send the final step.</p>
        <h2>When you send an enquiry</h2>
        <p>Website enquiries and completed business checks are sent through Wexoraa’s Google Apps Script connection to its private Lead Master spreadsheet. A check includes contact details, business answers, the problem you describe, a self-reported readiness score and suggested services. Simple enquiries have no score. The score is a planning guide, not a professional audit, benchmark or prediction of sales.</p>
        <h2>Where your enquiry goes</h2>
        <p>Google processes submitted details and stores them in the private response spreadsheet. It may process information outside your country under its policies. Wexoraa uses the enquiry to discuss your requirements, not to automatically subscribe you to marketing. Its authorised team can add call status, follow-up dates and notes to manage your enquiry. Wexoraa still needs to confirm its privacy contact and retention period.</p>
        <h2>Save confirmation</h2>
        <p>The website only shows a saved result after the connection confirms the submission. Failed attempts keep your entries in page memory for retry. A request identifier is reused for an unchanged retry to help prevent duplicate records. The connection includes basic validation and spam checks; there is no embedded Google Form.</p>
        <h2>Your choices</h2>
        <p>
          You can change your answers or close the check before submitting. A
          saved report is shown after you share the final enquiry with consent. To ask about access,
          corrections or deletion of a submitted enquiry, use the approved
          contact options on our Contact page. Please avoid putting sensitive
          personal information in your message.
        </p>
        <h2>Phone, WhatsApp and tracking</h2>
        <p>
          When phone and WhatsApp links are configured, they open those
          services, which have their own privacy policies. This website does not
          currently use advertising or analytics trackers.
        </p>
      </main>
      <Footer />
    </div>
  );
}
