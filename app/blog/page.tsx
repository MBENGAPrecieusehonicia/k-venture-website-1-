"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight, Mail } from "lucide-react"
import Image from "next/image"
import NewsletterForm from "@/components/forms/newsletter-form"
import EbookForm from "@/components/forms/ebook-form"

export default function BlogPage() {
  const blogRef = useRef<HTMLElement>(null)

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

  const articles = [
    {
      title: "5 Clés pour un Leadership Transformationnel",
      excerpt:
        "Découvrez les principes fondamentaux qui distinguent les leaders transformationnels et comment les appliquer dans votre contexte professionnel.",
      image: "/Leadership.jpg?height=250&width=400",
      date: "15 Mars 2024",
      author: "Sylvère Boussamba",
      category: "Leadership",
      readTime: "5 min",
    },
    {
      title: "L'Intelligence Émotionnelle au Service du Management",
      excerpt:
        "Comment développer votre intelligence émotionnelle pour améliorer vos relations professionnelles et votre efficacité managériale.",
      image: "/intelligence.jpg?height=250&width=400",
      date: "8 Mars 2024",
      author: "Sylvère Boussamba",
      category: "Développement Personnel",
      readTime: "7 min",
    },
    {
      title: "10 Livres Incontournables pour Développer son Leadership",
      excerpt:
        "Une sélection de lectures essentielles pour enrichir votre vision du leadership et nourrir votre développement personnel.",
      image: "/10.png?height=250&width=400",
      date: "1 Mars 2024",
      author: "Sylvère Boussamba",
      category: "Ressources",
      readTime: "3 min",
    },
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
              Blog & <span className="gradient-text">Ressources</span>
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
              Insights, conseils et ressources pour développer votre leadership et transformer votre organisation
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-400 mx-auto mt-8 rounded-full animate-fade-in-up delay-400"></div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section ref={blogRef} className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-50 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up">
              Articles <span className="text-green-600">Récents</span>
            </h2>
            <p className="text-xl text-gray-600 animate-fade-in-up delay-200">
              Découvrez nos dernières réflexions sur le leadership et le développement organisationnel
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-on-scroll">
            {articles.map((article, index) => (
              <Card
                key={index}
                className={`group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 shadow-lg hover:-translate-y-2 animate-fade-in-up delay-${index * 100}`}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 left-4 bg-green-600 text-white shadow-lg">{article.category}</Badge>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="mr-4">{article.date}</span>
                    <User className="h-4 w-4 mr-2" />
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Par {article.author}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-green-600 hover:text-green-700 hover:bg-green-50 rounded-full px-4"
                    >
                      Lire la suite <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* E-book Section */}
      <section className="py-32 bg-gradient-to-br from-green-50 to-green-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="animate-on-scroll">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 animate-fade-in-up">
                  Guide Gratuit du Leadership <span className="text-green-600">Transformationnel</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed animate-fade-in-up delay-200">
                  Téléchargez notre guide complet de 50 pages qui vous révèle les secrets du leadership
                  transformationnel. Découvrez les méthodes éprouvées pour développer votre influence, motiver vos
                  équipes et créer un impact durable.
                </p>
                <ul className="space-y-4 mb-10 animate-fade-in-up delay-300">
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-4"></div>
                    Les 7 piliers du leadership transformationnel
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-4"></div>
                    Outils d'auto-évaluation et exercices pratiques
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-4"></div>
                    Études de cas et exemples concrets
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-4"></div>
                    Plan d'action personnalisé
                  </li>
                </ul>

                <Card className="bg-white shadow-xl border-0 animate-fade-in-up delay-400">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Téléchargez votre guide gratuit</h3>
                    <EbookForm />
                  </CardContent>
                </Card>
              </div>

              <div className="text-center animate-on-scroll">
                <div className="relative group">
                  <Image
                    src="/guide.jpg?height=600&width=400"
                    alt="Guide du Leadership Transformationnel"
                    width={400}
                    height={600}
                    className="mx-auto shadow-2xl rounded-lg group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-600 via-transparent to-transparent opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-50 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-on-scroll">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-fade-in-up">
              <Mail className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 animate-fade-in-up delay-100">
              Newsletter <span className="text-green-600">Mensuelle</span>
            </h2>
            <p className="text-lg text-gray-600 mb-12 leading-relaxed animate-fade-in-up delay-200">
              Recevez chaque mois nos meilleurs conseils en leadership, nos analyses des tendances du management et nos
              invitations exclusives à nos événements.
            </p>

            <Card className="bg-gradient-to-br from-gray-50 to-white shadow-xl border-0 animate-fade-in-up delay-300">
              <CardContent className="p-10">
                <NewsletterForm
                  showNames={true}
                  placeholder="Votre adresse e-mail professionnelle"
                  buttonText="S'abonner à la newsletter"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
