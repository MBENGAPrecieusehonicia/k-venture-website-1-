import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { EmailService } from "@/lib/email-service"
import type { EbookDownload } from "@/lib/supabase"

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
    const downloadData: EbookDownload = {
      first_name: firstName,
      email,
      ebook_title: ebookTitle,
    }

    const { data, error } = await supabase.from("ebook_downloads").insert([downloadData]).select().single()

    if (error) {
      console.error("Erreur insertion ebook:", error)
      return NextResponse.json({ error: "Erreur lors de l'enregistrement" }, { status: 500 })
    }

    // Ajouter automatiquement à la newsletter s'il n'y est pas déjà
    try {
      const { error: newsletterError } = await supabase.from("newsletters").upsert(
        [
          {
            email,
            first_name: firstName,
            source: "ebook_download",
            status: "active",
          },
        ],
        {
          onConflict: "email",
          ignoreDuplicates: true,
        },
      )

      if (newsletterError) {
        console.error("Erreur ajout newsletter:", newsletterError)
      }
    } catch (newsletterError) {
      console.error("Erreur newsletter depuis ebook:", newsletterError)
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
      downloadUrl: "/https://www.promethee-devperso.com/wp-content/uploads/2011/10/La-ma%C3%AEtrise-de-soi-m%C3%AAme-%C3%89mile-Cou%C3%A9.pdf", // URL de votre fichier PDF
      data,
    })
  } catch (error) {
    console.error("Erreur API ebook:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}
