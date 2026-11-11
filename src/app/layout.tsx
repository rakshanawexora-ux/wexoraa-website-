import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
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
      <body className={`${display.variable} ${body.variable}`}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
