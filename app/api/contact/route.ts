import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { EmailService } from "@/lib/email-service"
import type { ContactRequest } from "@/lib/supabase"

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

    // Créer la demande de contact
    const contactData: ContactRequest = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      company,
      position,
      subject,
      message,
      status: "new",
    }

    const { data, error } = await supabase.from("contact_requests").insert([contactData]).select().single()

    if (error) {
      console.error("Erreur insertion contact:", error)
      return NextResponse.json({ error: "Erreur lors de l'envoi de votre demande" }, { status: 500 })
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

    // Envoyer une notification à l'équipe K-Venture
    try {
      await EmailService.sendEmail({
        to: "fabriqueecole241@gmail.com",
        subject: `🔔 Nouvelle demande de contact - ${subject}`,
        html: `
          <h2>Nouvelle demande de contact</h2>
          <p><strong>Nom :</strong> ${firstName} ${lastName}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Téléphone :</strong> ${phone || "Non renseigné"}</p>
          <p><strong>Entreprise :</strong> ${company || "Non renseignée"}</p>
          <p><strong>Fonction :</strong> ${position || "Non renseignée"}</p>
          <p><strong>Sujet :</strong> ${subject}</p>
          <p><strong>Message :</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${message.replace(/\n/g, "<br>")}
          </div>
          <p><em>Demande reçue le ${new Date().toLocaleString("fr-FR")}</em></p>
        `,
      })
    } catch (emailError) {
      console.error("Erreur envoi notification équipe:", emailError)
    }

    return NextResponse.json({
      success: true,
      message: "Votre demande a été envoyée avec succès ! Nous vous recontacterons sous 24h.",
      data,
    })
  } catch (error) {
    console.error("Erreur API contact:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}
