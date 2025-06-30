import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import AnalyticsProvider from "@/components/analytics/analytics-provider"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "K-Venture - Coaching Transformationnel au Gabon",
    template: "%s | K-Venture",
  },
  description:
    "Cabinet de coaching transformationnel, d'accompagnement et de formations dirigé par Sylvère Boussamba, coach certifié John C. Maxwell. 9 ans d'expertise pour transformer votre leadership.",
  keywords: [
    "coaching",
    "leadership",
    "formation",
    "transformation organisationnelle",
    "Gabon",
    "Libreville",
    "John C Maxwell",
  ],
  authors: [{ name: "K-Venture" }],
  creator: "K-Venture",
  publisher: "K-Venture",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://k-venture.com",
    siteName: "K-Venture",
    title: "K-Venture - Coaching Transformationnel au Gabon",
    description:
      "Transformez votre leadership avec K-Venture. 9 ans d'expertise en coaching transformationnel pour dirigeants et organisations.",
    images: [
      {
        url: "/images/k-venture-logo.jpeg",
        width: 1200,
        height: 630,
        alt: "K-Venture - Coaching Transformationnel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "K-Venture - Coaching Transformationnel au Gabon",
    description: "Transformez votre leadership avec K-Venture. 9 ans d'expertise en coaching transformationnel.",
    images: ["/images/k-venture-logo.jpeg"],
  },
  icons: {
    icon: "/images/k-venture-logo.jpeg",
    apple: "/images/k-venture-logo.jpeg",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Suspense fallback={<div>Loading...</div>}>
          {/* La balise <head> est gérée par Next.js, les métadonnées ci-dessus suffisent */}
          <AnalyticsProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </AnalyticsProvider>
        </Suspense>
      </body>
    </html>
  )
}
