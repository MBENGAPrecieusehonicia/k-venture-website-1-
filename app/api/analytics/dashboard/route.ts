import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    // Vérifier l'authentification (à implémenter selon vos besoins)
    const authHeader = request.headers.get("authorization")
    // Vérifie la présence de l'en-tête et de la variable d'environnement
    if (!authHeader || !authHeader.startsWith("Bearer ") || !process.env.ANALYTICS_API_SECRET) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Extrait et valide le jeton
    const token = authHeader.split(" ")[1]
    if (token !== process.env.ANALYTICS_API_SECRET) {
      return NextResponse.json({ error: "Jeton invalide" }, { status: 403 }) // 403 Forbidden est plus approprié pour un jeton invalide
    }

    // Obtenir les métriques du dashboard
    const { data: metrics, error } = await supabase.rpc("get_dashboard_metrics")

    if (error) {
      console.error("Erreur métriques dashboard:", error)
      return NextResponse.json({ error: "Erreur lors de la récupération des métriques" }, { status: 500 })
    }

    // Métriques en temps réel
    const today = new Date().toISOString().split("T")[0]

    const { data: todayStats, error: todayError } = await supabase
      .from("analytics_conversions")
      .select("conversion_type, count")
      .eq("date", today)

    if (todayError) {
      console.error("Erreur stats du jour:", todayError)
    }

    const response = {
      ...metrics,
      today_stats: todayStats || [],
      last_updated: new Date().toISOString(),
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Erreur API analytics:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}
