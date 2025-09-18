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
  title: "Luminovo - AI Design Studio | Create Your Perfect Lamp in 3 Minutes",
  description: "Revolutionary AI Design Studio creates unique, personalized lighting that matches your exact vision. From concept to creation in minutes, not months.",
  keywords: "AI design, custom lighting, lamp design, interior design, Scandinavian design, smart lighting",
  authors: [{ name: "Luminovo" }],
  openGraph: {
    title: "Luminovo - AI Design Studio",
    description: "Create your perfect lamp in 3 minutes with AI",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
