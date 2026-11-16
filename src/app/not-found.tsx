import Link from "next/link";
import { Header, Footer } from "@/components/home";
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="simple-page missing-page">
        <p className="eyebrow">404 / LET’S GET YOU BACK ON TRACK</p>
        <h1>Looking for something?</h1>
        <p>
          This page may have moved, or the link may be incomplete. Our services
          are a good place to find the help you need.
        </p>
        <div className="hero-actions">
          <Link className="button" href="/">
            Back to home ↗
          </Link>
          <Link className="button button-outline" href="/services">
            Explore our services ↗
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
