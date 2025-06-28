import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact - Parlons de votre projet de transformation",
  description:
    "Contactez K-Venture pour discuter de vos besoins en coaching, formation ou transformation organisationnelle. Réponse sous 24h.",
  openGraph: {
    title: "Contact - Parlons de votre projet de transformation",
    description: "Prêt à transformer votre leadership ? Discutons de vos défis et objectifs.",
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
