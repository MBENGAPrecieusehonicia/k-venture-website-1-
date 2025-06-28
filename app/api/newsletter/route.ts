import { type NextRequest, NextResponse } from "next/server"
import { EmailService } from "@/lib/email-service"
import prisma from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, firstName, lastName } = body

    // Validation des données
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Adresse email invalide" }, { status: 400 })
    }

    // Vérifier si l'email existe déjà
    let existing = await prisma.newsletter.findUnique({ where: { email } })
    if (existing) {
      if (existing.status === "unsubscribed") {
        // Réactiver l'abonnement
        await prisma.newsletter.update({
          where: { email },
          data: {
            status: "active",
            first_name: firstName || existing.first_name,
            last_name: lastName || existing.last_name,
            updated_at: new Date(),
          },
        })
        return NextResponse.json({ success: true, message: "Abonnement réactivé avec succès !", reactivated: true })
      } else {
        return NextResponse.json({ success: true, message: "Vous êtes déjà abonné(e) à notre newsletter !", alreadySubscribed: true })
      }
    }

    // Créer un nouvel abonnement
    let newsletter
    try {
      newsletter = await prisma.newsletter.create({
        data: {
          email,
          first_name: firstName,
          last_name: lastName,
          status: "active",
          source: "website",
        },
      })
    } catch (dbError) {
      console.error("Erreur insertion newsletter:", dbError)
      return NextResponse.json({ error: "Erreur lors de l'inscription" }, { status: 500 })
    }

    // Envoyer l'email de bienvenue
    try {
      await EmailService.sendEmail({
        to: email,
        subject: "🎉 Bienvenue dans la communauté K-Venture !",
        html: EmailService.getWelcomeNewsletterTemplate(firstName),
      })
    } catch (emailError) {
      console.error("Erreur envoi email bienvenue:", emailError)
    }

    return NextResponse.json({
      success: true,
      message: "Inscription réussie ! Vérifiez votre boîte mail.",
      data: newsletter,
    })
  } catch (error) {
    console.error("Erreur API newsletter:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")
    if (!email) {
      return NextResponse.json({ error: "Email requis" }, { status: 400 })
    }
    // Désabonnement
    await prisma.newsletter.update({
      where: { email },
      data: { status: "unsubscribed", updated_at: new Date() },
    })
    return NextResponse.json({ success: true, message: "Vous avez été désabonné de la newsletter." })
  } catch (error) {
    console.error("Erreur désabonnement newsletter:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}
