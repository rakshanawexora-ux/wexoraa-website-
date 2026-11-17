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
        <p>
          The short homepage check keeps your business details and contact
          information in page memory while you use it. It does not save them in
          browser storage or send them automatically. The separate 12-question
          assessment saves your selected answers in the current browser tab so
          you can return to them. Use “Clear answers and start again” to remove
          those saved answers. Neither score is a prediction of sales or a
          professional business audit.
        </p>
        <h2>When you send an enquiry</h2>
        <p>
          Our website form asks for your contact details, service and project
          needs. If you send an enquiry from a business check, the summary and
          self-reported score are included. Your answers are not sent
          automatically when you view your score. You choose whether to submit
          and agree to the privacy notice first.
        </p>
        <h2>Where your enquiry goes</h2>
        <p>
          When you press Send, the website sends your details to Wexoraa’s
          Google Apps Script connection, which records them in its private
          Google Sheet. Google may process information outside your country
          under its own policies. There is no embedded Google Form, and no
          automatic marketing subscription. Wexoraa still needs to confirm its
          privacy contact and response-retention period.
        </p>
        <h2>Duplicate and spam checks</h2>
        <p>
          A request identifier helps avoid duplicate rows when a submission is
          retried. Basic validation, a hidden spam field and temporary
          per-address limits protect the response sheet. A temporary hashed
          email identifier is used for rate limiting. The website does not save
          your contact details in browser storage.
        </p>
        <h2>Your choices</h2>
        <p>
          You can see a score without sharing contact details, change your
          answers and decide whether to send an enquiry. To ask about access,
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
