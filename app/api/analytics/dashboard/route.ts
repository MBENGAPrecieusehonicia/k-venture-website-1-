import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    // Vérifier l'authentification (à implémenter selon vos besoins)
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ") || !process.env.ANALYTICS_API_SECRET) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }
    const token = authHeader.split(" ")[1]
    if (token !== process.env.ANALYTICS_API_SECRET) {
      return NextResponse.json({ error: "Jeton invalide" }, { status: 403 })
    }

    // Récupérer les métriques réelles
    const total_newsletters = await prisma.newsletter.count({ where: { status: "active" } })
    const total_contacts = await prisma.contactRequest.count()
    const total_ebooks = await prisma.ebookDownload.count()
    // Exemples de stats supplémentaires
    const newsletters = await prisma.newsletter.findMany({ where: { status: "active" } })
    const contacts = await prisma.contactRequest.findMany()
    const ebooks = await prisma.ebookDownload.findMany()

    return NextResponse.json({
      total_newsletters,
      total_contacts,
      total_ebooks,
      newsletters,
      contacts,
      ebooks,
    })
  } catch (error) {
    console.error("Erreur API analytics dashboard:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}
