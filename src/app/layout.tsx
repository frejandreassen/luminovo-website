import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Luminovo - Skandinavisk Lyxbelysning | Handgjorda Geometriska Lampor",
  description: "Exklusiv kollektion av handgjorda geometriska lampor inspirerade av skandinavisk design. Upptäck våra unika ljusskulpturer som skapar varm och mysig atmosfär.",
  keywords: "skandinavisk design, lyxlampor, geometriska lampor, handgjord belysning, svensk design, inredning",
  authors: [{ name: "Luminovo" }],
  openGraph: {
    title: "Luminovo - Skandinavisk Lyxbelysning",
    description: "Handgjorda geometriska lampor i skandinavisk design",
    type: "website",
    locale: "sv_SE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body className={`${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
