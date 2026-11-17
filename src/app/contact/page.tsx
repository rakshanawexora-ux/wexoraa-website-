import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { Header, Footer, ContactLinks } from "@/components/home";
import EnquiryForm from "@/components/enquiry-form";
import { emailConfigured } from "@/lib/enquiry";
export const metadata = pageMetadata(
  "Discuss your project — Wexoraa Infotech",
  "Tell Wexoraa about your website, software, automation or growth requirement. Start with a clear, focused conversation.",
  "/contact",
);
export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ interest?: string }>;
}) {
  const query = await searchParams;
  return (
    <div className="page-frame">
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
              A better website, less manual work or more enquiries—tell us what
              would make a difference to your business. You’ll speak with one
              team for design, technology and marketing.
            </p>
            <div className="contact-expectations">
              <h2>What happens next?</h2>
              <ol>
                <li>We read what you tell us about your business.</li>
                <li>We clarify the goals and practical next steps.</li>
                <li>If we can help, we explain the work, timing and costs.</li>
              </ol>
              <p>
                No automatic marketing subscription. No obligation to commit.
              </p>
            </div>
            <ContactLinks />
            <Link className="button text-link" href="/business-assessment">
              Not sure where to start? Try the business check ↗
            </Link>
          </div>
          <div className="contact-form-card">
            <p className="eyebrow">
              <span /> A SIMPLE FIRST STEP
            </p>
            <h2>Tell us what you have in mind.</h2>
            <p className="contact-form-intro">
              A few details about you and what you need. We’ll take the
              conversation from there.
            </p>
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
    </div>
  );
}
