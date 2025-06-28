import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "À Propos - Sylvère Boussamba, Coach Certifié John C. Maxwell",
  description:
    "Découvrez Sylvère Boussamba, coach certifié John C. Maxwell avec 9 ans d'expérience en développement du leadership et transformation organisationnelle.",
  openGraph: {
    title: "À Propos - Sylvère Boussamba, Coach Certifié John C. Maxwell",
    description:
      "Découvrez l'expertise et la vision qui guident notre mission de transformation des leaders et des organisations.",
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
