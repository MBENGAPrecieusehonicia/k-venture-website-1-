"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { trackingEvents } from "@/lib/analytics"
import { useFormTracking } from "@/hooks/use-analytics"

interface NewsletterFormProps {
  className?: string
  showNames?: boolean
  placeholder?: string
  buttonText?: string
  source?: string
}

export default function NewsletterForm({
  className = "",
  showNames = false,
  placeholder = "Votre adresse e-mail",
  buttonText = "S'abonner",
  source = "website",
}: NewsletterFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const { trackFormStart, trackFormError, trackFormSuccess } = useFormTracking("newsletter")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    trackFormStart()

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, source }),
      })

      const result = await response.json()

      if (result.success) {
        setStatus("success")
        setMessage(result.message)
        setFormData({ email: "", firstName: "", lastName: "" })

        // Track successful newsletter signup
        trackFormSuccess()
        trackingEvents.newsletterSignup(source)
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

  const handleFocus = () => {
    trackingEvents.trackEvent("form_field_focus", "engagement", "newsletter_email")
  }

  if (status === "success") {
    return (
      <div className={`text-center p-6 bg-green-50 rounded-lg border border-green-200 ${className}`}>
        <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-green-800 mb-2">Inscription réussie !</h3>
        <p className="text-green-700">{message}</p>
        <Button onClick={() => setStatus("idle")} variant="ghost" className="mt-4 text-green-600 hover:text-green-700">
          S'inscrire avec un autre email
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {showNames && (
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            type="text"
            name="firstName"
            placeholder="Votre prénom"
            value={formData.firstName}
            onChange={handleChange}
            onFocus={handleFocus}
            className="bg-white"
          />
          <Input
            type="text"
            name="lastName"
            placeholder="Votre nom"
            value={formData.lastName}
            onChange={handleChange}
            onFocus={handleFocus}
            className="bg-white"
          />
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          type="email"
          name="email"
          placeholder={placeholder}
          value={formData.email}
          onChange={handleChange}
          onFocus={handleFocus}
          required
          className="flex-grow bg-white"
          disabled={status === "loading"}
        />
        <Button
          type="submit"
          disabled={status === "loading" || !formData.email}
          className="bg-green-600 hover:bg-green-700 text-white px-6 whitespace-nowrap"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Inscription...
            </>
          ) : (
            <>
              <Mail className="mr-2 h-4 w-4" />
              {buttonText}
            </>
          )}
        </Button>
      </div>

      {status === "error" && (
        <div className="flex items-center text-red-600 text-sm">
          <AlertCircle className="h-4 w-4 mr-2" />
          {message}
        </div>
      )}

      <p className="text-xs text-gray-500 text-center">
        Vos données sont protégées. Pas de spam, promis !
        <br />
        Plus de 2000 dirigeants nous font déjà confiance.
      </p>
    </form>
  )
}
