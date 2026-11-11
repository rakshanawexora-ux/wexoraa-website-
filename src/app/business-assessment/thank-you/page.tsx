import Link from "next/link";
import { Header, Footer } from "@/components/home";
export const metadata = {
  title: "Your next conversation — Wexoraa",
  robots: { index: false, follow: true },
};
export default function Page() {
  return (
    <>
      <Header />
      <main id="main" className="simple-page">
        <p className="eyebrow">THE NEXT STEP</p>
        <h1>
          A little clarity.
          <br />A useful conversation.
        </h1>
        <p>
          If you submitted an enquiry and saw provider acceptance, Wexoraa can
          review your context and follow up using your preferred contact method.
          Visiting this page alone does not submit an enquiry.
        </p>
        <h2>What to have in mind</h2>
        <p>
          Your main priority, current tools, any important timeline and the
          people involved in the decision will help make the conversation
          useful.
        </p>
        <Link className="button" href="/services">
          Explore our capabilities ↗
        </Link>
      </main>
      <Footer />
    </>
  );
}
