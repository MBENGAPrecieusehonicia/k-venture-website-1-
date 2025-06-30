"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Target, Heart, Lightbulb, Play, Users, TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  const aboutRef = useRef<HTMLElement>(null)

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

  const values = [
    {
      icon: Award,
      title: "Leadership",
      description: "Développer des leaders authentiques et inspirants capables de transformer leur environnement.",
      color: "from-green-50 to-green-100",
    },
    {
      icon: Target,
      title: "Performance",
      description: "Optimiser les résultats individuels et collectifs par des méthodes éprouvées et innovantes.",
      color: "from-green-100 to-green-200",
    },
    {
      icon: Heart,
      title: "Bienveillance",
      description: "Accompagner avec empathie et respect dans un climat de confiance et de sécurité psychologique.",
      color: "from-green-50 to-green-100",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Proposer des approches créatives et adaptées aux défis contemporains du leadership.",
      color: "from-green-100 to-green-200",
    },
  ]

  const achievements = [
    { icon: Users, number: "500+", label: "Leaders accompagnés" },
    { icon: TrendingUp, number: "98%", label: "Taux de satisfaction" },
    { icon: Award, number: "50+", label: "Organisations transformées" },
  ]

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
              À Propos de <span className="gradient-text">K-Venture</span>
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
              Découvrez l'expertise et la vision qui guident notre mission de transformation des leaders et des
              organisations
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-400 mx-auto mt-8 rounded-full animate-fade-in-up delay-400"></div>
          </div>
        </div>
      </section>

      {/* Sylvère Boussamba Section */}
      <section ref={aboutRef} className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-50 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 animate-on-scroll">
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in-up">
                  Sylvère Boussamba
                </h2>
                <p className="text-xl text-green-600 font-semibold animate-fade-in-up delay-100">
                  Coach Certifié John C. Maxwell
                </p>
              </div>

              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p className="animate-fade-in-up delay-200">
                  Coach certifié John C. Maxwell avec <strong className="text-green-700">9 années d'expérience</strong>{" "}
                  en développement du leadership et transformation organisationnelle. Sylvère accompagne dirigeants,
                  entrepreneurs et équipes dans leur quête d'excellence et de performance durable.
                </p>
                <p className="animate-fade-in-up delay-300">
                  Fort de son expertise acquise auprès d'organisations prestigieuses comme l'
                  <strong className="text-green-700">UNESCO</strong>, la{" "}
                  <strong className="text-green-700">Banque Mondiale</strong> et l'
                  <strong className="text-green-700">Union Européenne</strong>, il développe des approches innovantes
                  qui allient intelligence émotionnelle, leadership transformationnel et conduite du changement.
                </p>
                <p className="animate-fade-in-up delay-400">
                  Sa mission :{" "}
                  <em className="text-green-700 font-semibold">
                    révéler le potentiel de chaque leader pour créer des organisations résilientes, performantes et
                    humaines.
                  </em>
                </p>
              </div>

              <div className="mt-10 animate-fade-in-up delay-500">
                <Button
                  asChild
                  className="group bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <Link href="/contact">
                    Prendre rendez-vous
                    <div className="ml-3 w-6 h-6 rounded-full bg-white bg-opacity-20 group-hover:bg-opacity-30 flex items-center justify-center transition-all duration-300">
                      <span className="text-sm">→</span>
                    </div>
                  </Link>
                </Button>
              </div>
            </div>

            <div className="order-1 lg:order-2 animate-on-scroll">
              <div className="relative group">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                  <Image src="/CC.jpeg?height=600&width=500" alt="Sylvère Boussamba, Coach certifié John C. Maxwell" width={500} height={600} className="w-full h-auto group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-600 via-transparent to-transparent opacity-20 group-hover:opacity-30 transition-opacity duration-500">

                  </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 mt-4">
                  <iframe
                    className="w-full aspect-[9/16]"
                    src="https://www.youtube.com/embed/XdmWNQ7AOVI"
                    title="Présentation de Sylvère Boussamba - Coach Certifié"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-3 gap-8 animate-on-scroll">
            {achievements.map((achievement, index) => (
              <div key={index} className={`text-center group animate-fade-in-up delay-${index * 100}`}>
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-opacity-30 group-hover:scale-110 transition-all duration-300">
                    <achievement.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-white rounded-2xl opacity-0 group-hover:opacity-10 scale-150 transition-all duration-300"></div>
                </div>
                <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  {achievement.number}
                </div>
                <p className="text-green-100 font-medium">{achievement.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-32 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-20 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 animate-fade-in-up">
              Notre Mission & <span className="text-green-600">Vision</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-400 mx-auto rounded-full animate-fade-in-up delay-200"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 animate-on-scroll">
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-10 text-center relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-green-600 mb-6">Mission</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Transformer les dirigeants et les organisations pour une performance durable en développant le
                  leadership authentique, l'intelligence émotionnelle et la capacité d'adaptation au changement.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-10 text-center relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500">
                  <Lightbulb className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-green-600 mb-6">Vision</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Être le partenaire de référence en Afrique pour la transformation du leadership et l'accompagnement
                  des organisations vers l'excellence et l'impact positif.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-50 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up">
              Nos <span className="text-green-600">Valeurs</span>
            </h2>
            <p className="text-xl text-gray-600 animate-fade-in-up delay-200">
              Les principes qui guident notre approche et notre engagement
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-400 mx-auto mt-8 rounded-full animate-fade-in-up delay-400"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 animate-on-scroll">
            {values.map((value, index) => (
              <Card
                key={index}
                className={`group text-center hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden hover:-translate-y-2 animate-fade-in-up delay-${index * 100}`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>
                <CardContent className="p-8 relative z-10">
                  <div className="relative mb-8">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500">
                      <value.icon className="h-8 w-8 text-green-600 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="absolute inset-0 bg-green-200 rounded-2xl opacity-0 group-hover:opacity-20 scale-150 transition-all duration-500"></div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-green-800 transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
