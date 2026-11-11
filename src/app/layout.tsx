import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
const syne = localFont({
  src: "../../public/fonts/syne.ttf",
  weight: "600 700",
  variable: "--font-display",
  display: "swap",
});
const manrope = localFont({
  src: "../../public/fonts/manrope.ttf",
  weight: "400 700",
  variable: "--font-body",
  display: "swap",
});
export const metadata: Metadata = {
  title: "Wexoraa Infotech — Build. Operate. Grow.",
  description:
    "Strategy, design, engineering and growth, connected through one technology partner. Wexoraa Infotech serves growing businesses in Coimbatore and Tamil Nadu.",
  ...(process.env.NEXT_PUBLIC_SITE_URL
    ? {
        metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),
        alternates: { canonical: "/" },
      }
    : {}),
  openGraph: {
    title: "Wexoraa Infotech — Build. Operate. Grow.",
    description: "Connected thinking. Better business systems.",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${manrope.variable}`}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
