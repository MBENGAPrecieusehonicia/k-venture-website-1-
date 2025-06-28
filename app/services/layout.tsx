import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services - Coaching, Formations & Transformation Organisationnelle",
  description:
    "Découvrez nos services de coaching individuel et collectif, formations en leadership et accompagnement en transformation organisationnelle.",
  openGraph: {
    title: "Services - Coaching, Formations & Transformation Organisationnelle",
    description: "Des solutions personnalisées pour développer votre leadership et transformer votre organisation.",
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
