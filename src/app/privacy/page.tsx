import { pageMetadata } from "@/lib/seo";
import { Header, Footer } from "@/components/home";
export const metadata = pageMetadata(
  "Privacy and enquiry information — Wexoraa",
  "How this website handles assessment answers, contact enquiries and email processing.",
  "/privacy",
);
export default function Privacy() {
  return (
    <>
      <Header />
      <main id="main" className="simple-page privacy-page">
        <p className="eyebrow">PRIVACY & INFORMATION USE</p>
        <h1>
          Your information
          <br />
          deserves care.
        </h1>
        <p>
          This notice describes the implemented website features. Business legal
          identity, a dedicated privacy contact and an approved inbox retention
          schedule must be finalized by Wexoraa before public lead collection is
          enabled.
        </p>
        <h2>Business assessment</h2>
        <p>
          The 12-question assessment stores your selected business answers in
          session storage in the current browser tab so you can revise them. It
          does not store contact details locally. Use “Clear answers and start
          again” on the results screen to remove those answers. A score is
          calculated from an explained self-reported rubric; it is not a
          validated diagnostic or business-performance guarantee.
        </p>
        <h2>Project and assessment enquiries</h2>
        <p>
          If email sending is configured and you choose to submit, we request
          your name, company, email, phone, preferred contact method,
          requirement and explicit privacy consent. Website information is
          optional. An assessment enquiry also includes your answers and a
          server-calculated summary. These details are used to understand and
          respond to your requirement. You are not automatically subscribed to
          marketing.
        </p>
        <h2>Email processing and storage</h2>
        <p>
          Submitted information is sent to the configured Wexoraa inbox through
          Resend and the hosting platform. Their infrastructure may process data
          outside your country. This application has no lead database or admin
          dashboard. Information can remain in the recipient mailbox and
          provider systems according to the relevant policies; email-only
          capture has no durable application backup. Provider acceptance does
          not guarantee inbox delivery.
        </p>
        <h2>Security and operational data</h2>
        <p>
          Server validation, request limits, spam checks and temporary duplicate
          controls protect the enquiry endpoint. The handler does not log form
          contents. Short-lived hashed request identifiers support throttling;
          in-memory controls do not persist across server restarts or coordinate
          multiple server instances. Hosting providers may maintain their own
          operational logs.
        </p>
        <h2>Your choices</h2>
        <p>
          You can view your assessment without supplying contacts, revise or
          clear answers, and choose whether to enquire. For access, correction
          or deletion of a submitted enquiry, contact Wexoraa through the
          approved contact options on the Contact page. Do not submit sensitive
          personal data in the message.
        </p>
        <h2>External contact services</h2>
        <p>
          When configured, telephone and WhatsApp actions open their respective
          services, which have their own privacy practices. This site does not
          currently include analytics or advertising trackers.
        </p>
      </main>
      <Footer />
    </>
  );
}
