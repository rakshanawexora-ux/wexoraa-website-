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
          Our enquiry form is hosted by Google Forms. You enter your name,
          email, phone, service and project details in that form and agree to
          its contact permission before submitting. Loading the form does not
          automatically send your business-check answers or contact details.
        </p>
        <h2>Where your enquiry goes</h2>
        <p>
          When you press Submit in Google Forms, Google records your response.
          Wexoraa can manage responses in the private Google Sheet linked to
          that form. Google may process data outside your country under its own
          terms and privacy policy. Wexoraa still needs to confirm its privacy
          contact and how long responses are retained.
        </p>
        <h2>Sharing your business check</h2>
        <p>
          You can copy the summary shown on this website and paste it into
          Project Details in Google Forms. This is optional and is not an
          automatic transfer. Opening the embedded Google Form or its new-tab
          link connects your browser to Google, which may process technical data
          or use cookies under its own policies.
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
