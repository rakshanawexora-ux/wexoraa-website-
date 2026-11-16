import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { Header, Footer } from "@/components/home";
export const metadata = {
  ...pageMetadata(
    "Your Next Step | Wexoraa",
    "What to prepare for your project conversation.",
    "/business-assessment/thank-you",
  ),
  robots: { index: false, follow: true },
};
export default function Page() {
  return (
    <div className="page-frame">
      <Header />
      <main id="main" className="simple-page">
        <p className="eyebrow">THE NEXT STEP</p>
        <h1>
          A little clarity.
          <br />A useful conversation.
        </h1>
        <p>
          If your form showed a success message, your enquiry has been accepted
          and we can review your details. Opening this page alone does not send
          an enquiry.
        </p>
        <h2>What to have in mind</h2>
        <p>
          Think about what you want to improve, the tools you use and when you
          need it. We can work through the rest together.
        </p>
        <Link className="button" href="/services">
          Explore our services ↗
        </Link>
      </main>
      <Footer />
    </div>
  );
}
