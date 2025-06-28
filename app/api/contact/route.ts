import { type NextRequest, NextResponse } from "next/server"
import { EmailService } from "@/lib/email-service"
import prisma from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, company, position, subject, message } = body

    // Validation des données requises
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json({ error: "Tous les champs obligatoires doivent être remplis" }, { status: 400 })
    }

    if (!email.includes("@")) {
      return NextResponse.json({ error: "Adresse email invalide" }, { status: 400 })
    }

    // Vérifier ou créer l'entrée newsletter pour respecter la contrainte de clé étrangère
    let newsletter = await prisma.newsletter.findUnique({ where: { email } })
    if (!newsletter) {
      newsletter = await prisma.newsletter.create({
        data: { email, status: "active" },
      })
    }

    // Enregistrer la demande de contact
    let contact
    try {
      contact = await prisma.contactRequest.create({
        data: {
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          company,
          position,
          subject,
          message,
        },
      })
    } catch (dbError) {
      console.error("Erreur insertion contact:", dbError)
      return NextResponse.json({ error: "Erreur lors de l'envoi de votre demande" }, { status: 500 })
    }

    // Envoyer l'email au contact principal de l'entreprise
    try {
      await EmailService.sendEmail({
        to: "Buhlehonicia@gmail.com", // email de contact de l'entreprise
        subject: `📩 Nouvelle demande de contact de ${firstName} ${lastName}`,
        html: `
          <h2>Nouvelle demande de contact reçue</h2>
          <p><b>Nom :</b> ${firstName} ${lastName}</p>
          <p><b>Email :</b> ${email}</p>
          <p><b>Téléphone :</b> ${phone || "-"}</p>
          <p><b>Entreprise :</b> ${company || "-"}</p>
          <p><b>Poste :</b> ${position || "-"}</p>
          <p><b>Sujet :</b> ${subject}</p>
          <p><b>Message :</b><br/>${message}</p>
        `,
      })
    } catch (emailError) {
      console.error("Erreur envoi email contact entreprise:", emailError)
    }

    // Envoyer l'email de confirmation au client
    try {
      await EmailService.sendEmail({
        to: email,
        subject: "✅ Demande reçue - K-Venture vous recontacte sous 24h",
        html: EmailService.getContactConfirmationTemplate(firstName, lastName),
      })
    } catch (emailError) {
      console.error("Erreur envoi email confirmation:", emailError)
    }

    return NextResponse.json({
      success: true,
      message: "Votre demande a bien été envoyée. Nous vous contacterons sous 24h.",
      data: contact,
    })
  } catch (error) {
    console.error("Erreur API contact:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}
