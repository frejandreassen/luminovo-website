// app/layout.tsx

import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

// Konfigurera Google Font
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'Luminovo - Designa Din Egen Lampa med AI',
  description: 'AI-designade, handgjorda lampor som ger unik värme och elegans till ditt hem. Skapa din drömlampa på sekunder.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Ladda Tailwind CSS via CDN (som i ditt exempel) */}
        <Script src="https://cdn.tailwindcss.com?plugins=forms,container-queries" strategy="beforeInteractive" />
      </head>
      {/* Applicera typsnitt och grundläggande stilar på body */}
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  )
}