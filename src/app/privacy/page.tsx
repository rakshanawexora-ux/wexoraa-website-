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
          We ask for your name, email, phone number and what you need help with.
          A business snapshot can include the business details, problem and
          answers you chose to share. The detailed assessment includes your
          answers and calculated summary. You must agree to the privacy notice
          before sending. These details are used to understand your enquiry and
          reply to you, not to automatically subscribe you to marketing.
        </p>
        <h2>Where your enquiry goes</h2>
        <p>
          When email sending is set up, your enquiry goes to the configured
          Wexoraa inbox through Resend and the website host. Those providers may
          process information outside your country. Enquiries may remain in
          their systems and the inbox under the relevant retention policies.
          This website does not have a separate lead database or backup. An
          accepted email is not a guarantee that it reaches the inbox.
        </p>
        <h2>Spam checks and website records</h2>
        <p>
          The website checks form entries and limits repeated requests to help
          prevent spam. The enquiry handler does not log the contents of your
          form. Temporary request identifiers are kept in server memory for
          these checks and reset when the server restarts; they are not shared
          between servers. The hosting provider may keep its own technical logs.
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
