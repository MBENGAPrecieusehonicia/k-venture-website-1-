"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, AlertCircle, Loader2, Send } from "lucide-react"
import { trackingEvents } from "@/lib/analytics"
import { useFormTracking } from "@/hooks/use-analytics"

interface ContactFormProps {
  onSuccess?: (contactData: any) => void
}

export default function ContactForm({ onSuccess }: ContactFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const { trackFormStart, trackFormError, trackFormSuccess } = useFormTracking("contact")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    trackFormStart()

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setStatus("success")
        setMessage(result.message)
        if (onSuccess && result.data) {
          onSuccess(result.data)
        }

        // Track successful contact form submission
        trackFormSuccess()
        trackingEvents.contactFormSubmit(formData.subject)

        // Track high-intent event for consultation requests
        if (formData.subject === "coaching" || formData.subject === "transformation") {
          trackingEvents.consultationRequest(formData.subject)
        }

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          company: "",
          position: "",
          subject: "",
          message: "",
        })
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const subject = e.target.value
    setFormData((prev) => ({ ...prev, subject }))

    if (subject) {
      trackingEvents.serviceInterest(subject)
    }
  }

  const handleFocus = (fieldName: string) => {
    trackingEvents.trackEvent("form_field_focus", "engagement", `contact_${fieldName}`)
  }

  if (status === "success") {
    return (
      <div className="text-center p-8 bg-green-50 rounded-lg border border-green-200">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
        <h3 className="text-2xl font-semibold text-green-800 mb-4">Message envoyé !</h3>
        <p className="text-green-700 mb-6">{message}</p>
        <Button onClick={() => setStatus("idle")} className="bg-green-600 hover:bg-green-700 text-white">
          Envoyer un autre message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
            Prénom *
          </label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="Votre prénom"
            value={formData.firstName}
            onChange={handleChange}
            onFocus={() => handleFocus("firstName")}
            required
            disabled={status === "loading"}
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
            Nom *
          </label>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Votre nom"
            value={formData.lastName}
            onChange={handleChange}
            onFocus={() => handleFocus("lastName")}
            required
            disabled={status === "loading"}
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          E-mail professionnel *
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="votre.email@entreprise.com"
          value={formData.email}
          onChange={handleChange}
          onFocus={() => handleFocus("email")}
          required
          disabled={status === "loading"}
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Téléphone
        </label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+241 XX XX XX XX"
          value={formData.phone}
          onChange={handleChange}
          onFocus={() => handleFocus("phone")}
          disabled={status === "loading"}
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
          Entreprise / Organisation
        </label>
        <Input
          id="company"
          name="company"
          type="text"
          placeholder="Nom de votre entreprise"
          value={formData.company}
          onChange={handleChange}
          onFocus={() => handleFocus("company")}
          disabled={status === "loading"}
        />
      </div>

      <div>
        <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
          Fonction
        </label>
        <Input
          id="position"
          name="position"
          type="text"
          placeholder="Votre fonction"
          value={formData.position}
          onChange={handleChange}
          onFocus={() => handleFocus("position")}
          disabled={status === "loading"}
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
          Sujet de votre demande *
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleSubjectChange}
          onFocus={() => handleFocus("subject")}
          required
          disabled={status === "loading"}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="">Sélectionnez un sujet</option>
          <option value="coaching">Coaching individuel</option>
          <option value="team-coaching">Coaching d'équipe</option>
          <option value="formation">Formation</option>
          <option value="transformation">Transformation organisationnelle</option>
          <option value="conference">Conférence / Séminaire</option>
          <option value="autre">Autre</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Votre message *
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Décrivez-nous votre projet, vos défis et vos objectifs..."
          rows={6}
          value={formData.message}
          onChange={handleChange}
          onFocus={() => handleFocus("message")}
          required
          disabled={status === "loading"}
        />
      </div>

      <Button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Envoi en cours...
          </>
        ) : (
          <>
            <Send className="mr-2 h-5 w-5" />
            Envoyer ma demande
          </>
        )}
      </Button>

      {status === "error" && (
        <div className="flex items-center text-red-600 text-sm">
          <AlertCircle className="h-4 w-4 mr-2" />
          {message}
        </div>
      )}

      <p className="text-sm text-gray-500 text-center">Nous nous engageons à vous répondre sous 24h ouvrées</p>
    </form>
  )
}
