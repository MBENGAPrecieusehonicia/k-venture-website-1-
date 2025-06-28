import { type NextRequest, NextResponse } from "next/server"
import { EmailService } from "@/lib/email-service"
import prisma from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, email, ebookTitle = "Guide du Leadership Transformationnel" } = body

    // Validation
    if (!firstName || !email) {
      return NextResponse.json({ error: "Nom et email requis" }, { status: 400 })
    }

    if (!email.includes("@")) {
      return NextResponse.json({ error: "Adresse email invalide" }, { status: 400 })
    }

    // Enregistrer le téléchargement
    let ebookDownload
    try {
      ebookDownload = await prisma.ebookDownload.create({
        data: {
          first_name: firstName,
          email,
          ebook_title: ebookTitle,
        },
      })
    } catch (dbError) {
      console.error("Erreur insertion ebook:", dbError)
      return NextResponse.json({ error: "Erreur lors de l'enregistrement" }, { status: 500 })
    }

    // Ajouter automatiquement à la newsletter s'il n'y est pas déjà
    try {
      await prisma.newsletter.upsert({
        where: { email },
        update: { status: "active", first_name: firstName },
        create: {
          email,
          first_name: firstName,
          status: "active",
          source: "ebook_download",
        },
      })
    } catch (newsletterError) {
      console.error("Erreur ajout newsletter:", newsletterError)
    }

    // Envoyer l'email avec le lien de téléchargement
    try {
      await EmailService.sendEmail({
        to: email,
        subject: '📚 Votre e-book "Guide du Leadership Transformationnel" est prêt !',
        html: EmailService.getEbookDownloadTemplate(firstName),
      })
    } catch (emailError) {
      console.error("Erreur envoi email ebook:", emailError)
      return NextResponse.json({ error: "Erreur lors de l'envoi de l'email" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "E-book envoyé ! Vérifiez votre boîte mail.",
      downloadUrl: "https://www.promethee-devperso.com/wp-content/uploads/2011/10/La-ma%C3%AEtrise-de-soi-m%C3%AAme-%C3%89mile-Cou%C3%A9.pdf",
      data: ebookDownload,
    })
  } catch (error) {
    console.error("Erreur API ebook:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}
