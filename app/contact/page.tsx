"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Linkedin, Twitter, Instagram, Clock, Users } from "lucide-react"
import ContactForm from "@/components/forms/contact-form"
import Image from "next/image"

export default function ContactPage() {
  const contactRef = useRef<HTMLElement>(null)
  const [lastContact, setLastContact] = useState<any>(null)

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up")
        }
      })
    }, observerOptions)

    const animatedElements = document.querySelectorAll(".animate-on-scroll")
    animatedElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // Ajout d'un callback pour récupérer les infos du dernier contact soumis
  const handleContactSuccess = (contactData: any) => {
    setLastContact(contactData)
  }

  return (
    <div className="min-h-screen pt-20 overflow-hidden">
      {/* Hero Section */}
      <section className="py-32 bg-gradient-to-br from-green-50 via-white to-green-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-5"></div>
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-green-300 rounded-full opacity-30 animate-float-delayed"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 animate-fade-in-up">
              Contactez <span className="gradient-text">K-Venture</span>
            </h1>
            <div className="w-16 h-16 rounded-xl overflow-hidden mx-auto mb-8 shadow-lg bg-white p-2 animate-fade-in-up delay-300">
              <Image
                src="/images/k-venture-logo.jpeg"
                alt="K-Venture Logo"
                width={64}
                height={64}
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-xl text-gray-600 leading-relaxed animate-fade-in-up delay-200">
              Prêt à transformer votre leadership ? Discutons de vos défis et objectifs
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-400 mx-auto mt-8 rounded-full animate-fade-in-up delay-400"></div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section ref={contactRef} className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-50 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="animate-on-scroll">
              <h2 className="text-4xl font-bold text-gray-900 mb-8 animate-fade-in-up">
                Parlons de votre <span className="text-green-600">projet</span>
              </h2>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed animate-fade-in-up delay-200">
                Que vous souhaitiez développer votre leadership, former vos équipes ou transformer votre organisation,
                nous sommes là pour vous accompagner. Partagez-nous vos besoins et nous vous recontacterons rapidement.
              </p>

              <Card className="shadow-2xl border-0 animate-fade-in-up delay-300">
                <CardContent className="p-10">
                  <ContactForm onSuccess={handleContactSuccess} />
                  {lastContact && (
                    <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                      <div className="font-bold mb-2">Dernier contact enregistré :</div>
                      <div>Prénom : {lastContact.first_name}</div>
                      <div>Nom : {lastContact.last_name}</div>
                      <div>Email : {lastContact.email}</div>
                      <div>Téléphone : {lastContact.phone || "-"}</div>
                      <div>Entreprise : {lastContact.company || "-"}</div>
                      <div>Poste : {lastContact.position || "-"}</div>
                      <div>Sujet : {lastContact.subject}</div>
                      <div>Message : {lastContact.message}</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="animate-on-scroll">
              <h2 className="text-4xl font-bold text-gray-900 mb-10 animate-fade-in-up">
                Informations de <span className="text-green-600">contact</span>
              </h2>

              <div className="space-y-8 mb-12">
                <div className="flex items-start group animate-fade-in-up delay-100">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mr-6 flex-shrink-0 group-hover:bg-green-200 group-hover:scale-110 transition-all duration-300">
                    <MapPin className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">Adresse</h3>
                    <p className="text-gray-600">
                      Libreville, Gabon
                      <br />
                      (Rendez-vous sur demande)
                    </p>
                  </div>
                </div>

                <div className="flex items-start group animate-fade-in-up delay-200">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mr-6 flex-shrink-0 group-hover:bg-green-200 group-hover:scale-110 transition-all duration-300">
                    <Phone className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">Téléphone</h3>
                    <p className="text-gray-600">+241 77 32 32 11</p>
                  </div>
                </div>

                <div className="flex items-start group animate-fade-in-up delay-300">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mr-6 flex-shrink-0 group-hover:bg-green-200 group-hover:scale-110 transition-all duration-300">
                    <Mail className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">E-mail</h3>
                    <p className="text-gray-600">fabriqueecole241@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start group animate-fade-in-up delay-400">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mr-6 flex-shrink-0 group-hover:bg-green-200 group-hover:scale-110 transition-all duration-300">
                    <Clock className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">Horaires</h3>
                    <p className="text-gray-600">
                      Lun - Ven: 8h30 - 18h30
                      <br />
                      Sam: 8h30 - 16h30
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mb-12 animate-fade-in-up delay-500">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Suivez-nous</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="group w-14 h-14 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center text-white hover:from-green-700 hover:to-green-800 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                  >
                    <Linkedin className="h-7 w-7 group-hover:scale-110 transition-transform duration-300" />
                  </a>
                  <a
                    href="#"
                    className="group w-14 h-14 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center text-white hover:from-green-700 hover:to-green-800 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                  >
                    <Twitter className="h-7 w-7 group-hover:scale-110 transition-transform duration-300" />
                  </a>
                  <a
                    href="#"
                    className="group w-14 h-14 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center text-white hover:from-green-700 hover:to-green-800 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                  >
                    <Instagram className="h-7 w-7 group-hover:scale-110 transition-transform duration-300" />
                  </a>
                </div>
              </div>

              {/* Quick Stats */}
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-xl animate-fade-in-up delay-600">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Pourquoi choisir K-Venture ?</h3>
                  <div className="space-y-6">
                    <div className="flex items-center group">
                      <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white font-bold text-lg">9</span>
                      </div>
                      <span className="text-gray-700 font-medium">Années d'expérience</span>
                    </div>
                    <div className="flex items-center group">
                      <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-gray-700 font-medium">
                        Clients prestigieux (UNESCO, Banque Mondiale...)
                      </span>
                    </div>
                    <div className="flex items-center group">
                      <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white font-bold text-lg">✓</span>
                      </div>
                      <span className="text-gray-700 font-medium">Coach certifié John C. Maxwell</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-32 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-50 via-transparent to-green-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 animate-fade-in-up">Notre Localisation</h2>
            <p className="text-lg text-gray-600 animate-fade-in-up delay-200">
              Basés à Libreville, nous intervenons dans toute l'Afrique Centrale
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl h-96 flex items-center justify-center shadow-xl animate-on-scroll">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <MapPin className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Carte Google Maps</h3>
              <p className="text-gray-600">Libreville, Gabon</p>
              <p className="text-sm text-gray-500 mt-2">Intégration Google Maps à venir</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
