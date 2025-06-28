import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { EmailService } from "@/lib/email-service"
import type { Newsletter } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, firstName, lastName, source = "website" } = body

    // Validation des données
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Adresse email invalide" }, { status: 400 })
    }

    // Vérifier si l'email existe déjà
    const { data: existingSubscriber, error: checkError } = await supabase
      .from("newsletters")
      .select("*")
      .eq("email", email)
      .single()

    if (checkError && checkError.code !== "PGRST116") {
      console.error("Erreur vérification email:", checkError)
      return NextResponse.json({ error: "Erreur lors de la vérification" }, { status: 500 })
    }

    // Si l'email existe déjà
    if (existingSubscriber) {
      if (existingSubscriber.status === "unsubscribed") {
        // Réactiver l'abonnement
        const { error: updateError } = await supabase
          .from("newsletters")
          .update({
            status: "active",
            first_name: firstName || existingSubscriber.first_name,
            last_name: lastName || existingSubscriber.last_name,
            updated_at: new Date().toISOString(),
          })
          .eq("email", email)

        if (updateError) {
          console.error("Erreur réactivation:", updateError)
          return NextResponse.json({ error: "Erreur lors de la réactivation" }, { status: 500 })
        }

        return NextResponse.json({
          success: true,
          message: "Abonnement réactivé avec succès !",
          reactivated: true,
        })
      } else {
        return NextResponse.json({
          success: true,
          message: "Vous êtes déjà abonné(e) à notre newsletter !",
          alreadySubscribed: true,
        })
      }
    }

    // Créer un nouvel abonnement
    const newsletterData: Newsletter = {
      email,
      first_name: firstName,
      last_name: lastName,
      source,
      status: "active",
    }

    const { data, error } = await supabase.from("newsletters").insert([newsletterData]).select().single()

    if (error) {
      console.error("Erreur insertion newsletter:", error)
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
      // Ne pas faire échouer l'inscription si l'email ne part pas
    }

    return NextResponse.json({
      success: true,
      message: "Inscription réussie ! Vérifiez votre boîte mail.",
      data,
    })
  } catch (error) {
    console.error("Erreur API newsletter:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}

// Endpoint pour se désabonner
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")

    if (!email) {
      return NextResponse.json({ error: "Email requis" }, { status: 400 })
    }

    const { error } = await supabase
      .from("newsletters")
      .update({ status: "unsubscribed", updated_at: new Date().toISOString() })
      .eq("email", email)

    if (error) {
      console.error("Erreur désabonnement:", error)
      return NextResponse.json({ error: "Erreur lors du désabonnement" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Désabonnement effectué avec succès",
    })
  } catch (error) {
    console.error("Erreur API désabonnement:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}
