import { pageMetadata, organizationSchema } from "@/lib/seo";
import StructuredData from "@/components/structured-data";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SiteExperience from "@/components/site-experience";
import { EnquiryProvider } from "@/components/enquiry-popup";
import { emailConfigured } from "@/lib/enquiry";
import { Cursor } from "@/components/home";
const display = localFont({
  src: "../../public/fonts/space-grotesk.ttf",
  weight: "400 700",
  variable: "--font-display",
  display: "swap",
});
const body = localFont({
  src: "../../public/fonts/dm-sans.ttf",
  weight: "400 700",
  variable: "--font-body",
  display: "swap",
});
export const metadata: Metadata = pageMetadata(
  "Wexoraa Infotech — Design, Technology & Growth in Coimbatore",
  "Connected branding, websites, software, CRM, automation and digital growth for businesses in Coimbatore and Tamil Nadu.",
  "/",
);

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable}`}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <EnquiryProvider configured={emailConfigured()}>
          <StructuredData data={organizationSchema()} />
          <SiteExperience />
          <Cursor />
          {children}
        </EnquiryProvider>
      </body>
    </html>
  );
}
