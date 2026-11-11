import Link from "next/link";
import { Header, Footer, ContactLinks } from "@/components/home";
import EnquiryForm from "@/components/enquiry-form";
import { emailConfigured } from "@/lib/enquiry";
export const metadata = {
  title: "Discuss your project — Wexoraa Infotech",
  description:
    "Tell Wexoraa about your website, software, automation or growth requirement. Start with a clear, focused conversation.",
  alternates: { canonical: "/contact" },
};
export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ interest?: string }>;
}) {
  const query = await searchParams;
  return (
    <>
      <Header />
      <main id="main">
        <section className="section contact-layout">
          <div className="contact-intro">
            <p className="eyebrow">
              <span /> YOUR NEXT CHAPTER STARTS HERE
            </p>
            <h1>
              Good things start
              <br />
              with a conversation.
            </h1>
            <p>
              A focused project, a connected business system or a bigger
              ambition. Tell us what you want to change.
            </p>
            <div className="contact-expectations">
              <h2>What happens next?</h2>
              <ol>
                <li>We review the context you share.</li>
                <li>We clarify the goals and practical next steps.</li>
                <li>If there is a fit, we define a clear scope together.</li>
              </ol>
              <p>
                No automatic marketing subscription. No obligation to commit.
              </p>
            </div>
            <ContactLinks />
            <Link className="text-link" href="/business-assessment">
              Not sure where to start? Try 12 questions ↗
            </Link>
          </div>
          <div className="contact-form-card">
            <h2>Tell us about your project.</h2>
            <EnquiryForm
              configured={emailConfigured()}
              interest={
                typeof query.interest === "string"
                  ? query.interest.slice(0, 120)
                  : ""
              }
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
