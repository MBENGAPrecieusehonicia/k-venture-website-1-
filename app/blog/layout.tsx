import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog & Ressources - Conseils en Leadership et Développement",
  description:
    "Découvrez nos articles, guides et ressources pour développer votre leadership et transformer votre organisation.",
  openGraph: {
    title: "Blog & Ressources - Conseils en Leadership et Développement",
    description: "Insights, conseils et ressources pour développer votre leadership et transformer votre organisation.",
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
