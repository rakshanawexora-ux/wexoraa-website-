import Link from "next/link";
import { Header, Footer } from "@/components/home";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Start a conversation — Wexoraa Infotech",
  robots: { index: false, follow: true },
};
export default function Contact() {
  const phone = process.env.NEXT_PUBLIC_WEXORAA_PHONE;
  const whatsapp = process.env.NEXT_PUBLIC_WEXORAA_WHATSAPP;
  return (
    <>
      <Header />
      <main id="main" className="simple-page">
        <p className="eyebrow">LET’S FIND YOUR NEXT MOVE</p>
        <h1>
          Good things start
          <br />
          with a conversation.
        </h1>
        <p>
          A website, a connected business system or a broader digital ambition.
          Start with what you want to change.
        </p>
        {phone || whatsapp ? (
          <div className="hero-actions">
            {phone && (
              <Link
                className="button"
                href={`tel:${phone.replace(/[^+\d]/g, "")}`}
              >
                Call Wexoraa ↗
              </Link>
            )}
            {whatsapp && (
              <Link
                className="button button-outline"
                href={`https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hi Wexoraa, I'd like to discuss a technology or digital growth requirement for my business.")}`}
              >
                Message on WhatsApp ↗
              </Link>
            )}
          </div>
        ) : (
          <div className="notice">
            Contact details are awaiting confirmation. Online enquiries will be
            available when the email integration is configured. This preview
            does not collect or submit personal information.
          </div>
        )}
        <Link className="text-link" href="/#solutions">
          Explore how we can help ↗
        </Link>
      </main>
      <Footer />
    </>
  );
}
