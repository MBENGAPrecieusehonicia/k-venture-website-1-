"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { trackingEvents } from "@/lib/analytics"
import { useFormTracking } from "@/hooks/use-analytics"

interface EbookFormProps {
  className?: string
  ebookTitle?: string
}

export default function EbookForm({
  className = "",
  ebookTitle = "Guide du Leadership Transformationnel",
}: EbookFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [downloadUrl, setDownloadUrl] = useState("")

  const { trackFormStart, trackFormError, trackFormSuccess } = useFormTracking("ebook")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    trackFormStart()

    try {
      const response = await fetch("/api/ebook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          ebookTitle,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setStatus("success")
        setMessage(result.message)
        setDownloadUrl(result.downloadUrl)

        // Déclencher le téléchargement automatiquement
        const link = document.createElement("a")
        link.href = result.downloadUrl
        link.setAttribute("download", "maitrise-de-soi.pdf")
        document.body.appendChild(link)
        link.click()
        link.parentNode?.removeChild(link)

        // Track successful ebook download
        trackFormSuccess()
        trackingEvents.ebookDownload(ebookTitle)

        setFormData({ firstName: "", email: "" })
      } else {
        setStatus("error")
        setMessage(result.error || "Une erreur est survenue")
        trackFormError("submission_failed")
      }
    } catch (error) {
      setStatus("error")
      setMessage("Erreur de connexion. Veuillez réessayer.")
      trackFormError("network_error")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleFocus = (fieldName: string) => {
    trackingEvents.trackEvent("form_field_focus", "engagement", `ebook_${fieldName}`)
  }

  const handleDownloadClick = () => {
    trackingEvents.trackEvent("ebook_download_click", "engagement", ebookTitle)
  }

  if (status === "success") {
    return (
      <div className={`text-center p-6 bg-green-50 rounded-lg border border-green-200 ${className}`}>
        <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-green-800 mb-2">E-book envoyé !</h3>
        <p className="text-green-700 mb-4">{message}</p>
        {downloadUrl && (
          <Button asChild className="bg-green-600 hover:bg-green-700 text-white mb-4" onClick={handleDownloadClick}>
            <a href={downloadUrl} download="maitrise-de-soi.pdf">
              <Download className="mr-2 h-4 w-4" />
              Télécharger maintenant
            </a>
          </Button>
        )}
        <Button
          onClick={() => setStatus("idle")}
          variant="ghost"
          className="block mx-auto text-green-600 hover:text-green-700"
        >
          Télécharger un autre e-book
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div>
        <Input
          type="text"
          name="firstName"
          placeholder="Votre prénom"
          value={formData.firstName}
          onChange={handleChange}
          onFocus={() => handleFocus("firstName")}
          required
          className="w-full"
          disabled={status === "loading"}
        />
      </div>
      <div>
        <Input
          type="email"
          name="email"
          placeholder="Votre adresse e-mail"
          value={formData.email}
          onChange={handleChange}
          onFocus={() => handleFocus("email")}
          required
          className="w-full"
          disabled={status === "loading"}
        />
      </div>
      <Button
        type="submit"
        disabled={status === "loading" || !formData.firstName || !formData.email}
        className="w-full bg-green-600 hover:bg-green-700 text-white"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Envoi en cours...
          </>
        ) : (
          <>
            <Download className="mr-2 h-5 w-5" />
            Télécharger le guide
          </>
        )}
      </Button>

      {status === "error" && (
        <div className="flex items-center text-red-600 text-sm">
          <AlertCircle className="h-4 w-4 mr-2" />
          {message}
        </div>
      )}

      <p className="text-xs text-gray-500 text-center">Vos données sont protégées. Pas de spam, promis !</p>
    </form>
  )
}
