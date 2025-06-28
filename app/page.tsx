"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Users, BookOpen, Building2, Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  // Utiliser des refs typés pour correspondre à l'élément DOM ciblé
  const heroRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLElement>(null)
  const clientsRef = useRef<HTMLElement>(null)

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

    // Observe all animated elements
    const animatedElements = document.querySelectorAll(".animate-on-scroll")
    animatedElements.forEach((el) => observer.observe(el))

    // Parallax effect for hero
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.pageYOffset
        const parallax = scrolled * 0.5
        heroRef.current.style.transform = `translateY(${parallax}px)`
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const clients = [
    { name: "UNESCO", logo: "/UNESCO.png?height=60&width=120" },
    { name: "Banque Mondiale", logo: "/banque.jpg?height=60&width=120" },
    { name: "SEEG", logo: "/SEEG.jpg?height=60&width=120" },
    { name: "Orabank", logo: "/orabank.jpg?height=60&width=120" },
    { name: "AFG Bank", logo: "/AFG.png?height=60&width=120" },
    { name: "Trianon", logo: "/trianon.jpg?height=60&width=120" },
    { name: "Union Européenne", logo: "/union.jpg?height=60&width=120" },
  ]

  const services = [
    {
      icon: Users,
      title: "Coaching Individuel & Collectif",
      description:
        "Développement du leadership et de l'intelligence émotionnelle pour transformer votre potentiel en performance exceptionnelle.",
      color: "from-green-50 to-green-100",
      iconColor: "text-green-700",
      delay: "delay-100",
    },
    {
      icon: BookOpen,
      title: "Formations",
      description:
        "Programmes de formation sur-mesure en leadership transformationnel et conduite du changement pour vos équipes.",
      color: "from-green-100 to-green-200",
      iconColor: "text-green-800",
      delay: "delay-200",
    },
    {
      icon: Building2,
      title: "Transformation Organisationnelle",
      description: "Optimisation des structures et développement d'une culture d'entreprise performante et durable.",
      color: "from-green-50 to-green-100",
      iconColor: "text-green-700",
      delay: "delay-300",
    },
  ]

  const stats = [
    { number: "9", label: "Années d'expérience", suffix: "+" },
    { number: "500", label: "Leaders accompagnés", suffix: "+" },
    { number: "50", label: "Organisations transformées", suffix: "+" },
    { number: "98", label: "Taux de satisfaction", suffix: "%" },
  ]

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-green-100">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-5"></div>
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-float"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-green-300 rounded-full opacity-30 animate-float-delayed"></div>
          <div className="absolute bottom-40 left-20 w-12 h-12 bg-green-400 rounded-full opacity-25 animate-float-slow"></div>
        </div>

        <div ref={heroRef} className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Logo Animation */}
            <div className="mb-8 animate-fade-in">
              <div className="w-24 h-24 rounded-2xl overflow-hidden mx-auto mb-6 shadow-2xl animate-pulse-slow bg-white p-2">
                <Image
                  src="/images/k-venture-logo.jpeg"
                  alt="K-Venture Logo"
                  width={96}
                  height={96}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight animate-fade-in-up">
              Transformez votre{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800 animate-gradient">
                leadership
              </span>
              <br />
              <span className="text-4xl md:text-6xl">boostez votre organisation</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto animate-fade-in-up delay-200">
              9 ans d'expertise en coaching transformationnel pour développer des leaders exceptionnels et des
              organisations performantes avec <span className="font-semibold text-green-700">Sylvère Boussamba</span>,
              coach certifié John C. Maxwell
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up delay-400">
              <Button
                asChild
                size="lg"
                className="group bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-10 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Link href="/services">
                  Découvrir nos services
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="group border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-10 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 bg-transparent"
              >
                <Link href="/contact">
                  Nous contacter
                  <div className="ml-3 w-6 h-6 rounded-full bg-green-600 group-hover:bg-white flex items-center justify-center transition-colors duration-300">
                    <ArrowRight className="h-4 w-4 text-white group-hover:text-green-600" />
                  </div>
                </Link>
              </Button>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-green-600 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-green-600 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-50 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-on-scroll">
            {stats.map((stat, index) => (
              <div key={index} className={`text-center group animate-fade-in-up delay-${index * 100}`}>
                <div className="relative">
                  <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                    <span className="text-green-500">{stat.suffix}</span>
                  </div>
                  <div className="absolute inset-0 bg-green-200 rounded-full opacity-0 group-hover:opacity-20 scale-150 transition-all duration-300"></div>
                </div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section with Advanced Animations */}
      <section ref={servicesRef} className="py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(46,125,50,0.1),transparent_50%)]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up">
              Nos Services d'<span className="text-green-600">Excellence</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200">
              Des solutions personnalisées pour transformer votre leadership et optimiser la performance de votre
              organisation
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-400 mx-auto mt-8 rounded-full animate-fade-in-up delay-400"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 animate-on-scroll">
            {services.map((service, index) => (
              <Card
                key={index}
                className={`group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden relative animate-fade-in-up ${service.delay} hover:-translate-y-2`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>
                <CardContent className="p-8 text-center relative z-10">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500">
                      <service.icon
                        className={`h-10 w-10 ${service.iconColor} group-hover:scale-110 transition-transform duration-300`}
                      />
                    </div>
                    <div className="absolute inset-0 bg-green-200 rounded-2xl opacity-0 group-hover:opacity-20 scale-150 transition-all duration-500"></div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-green-800 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {service.description}
                  </p>
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Button
                      variant="ghost"
                      className="text-green-600 hover:text-green-700 hover:bg-green-50 rounded-full px-6"
                    >
                      En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section with Hover Effects */}
      <section ref={clientsRef} className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-50 via-transparent to-green-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up">
              Ils nous font <span className="text-green-600">confiance</span>
            </h2>
            <p className="text-xl text-gray-600 animate-fade-in-up delay-200">
              Des organisations prestigieuses qui ont choisi K-Venture pour leur transformation
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 items-center animate-on-scroll">
            {clients.map((client, index) => (
              <div
                key={index}
                className={`group relative animate-fade-in-up delay-${index * 100} hover:scale-110 transition-all duration-500`}
              >
                <div className="relative overflow-hidden rounded-xl p-6 bg-white shadow-lg group-hover:shadow-2xl transition-all duration-500">
                  <Image
                    src={client.logo || "/placeholder.svg"}
                    alt={`Logo ${client.name}`}
                    width={120}
                    height={60}
                    className="mx-auto grayscale group-hover:grayscale-0 transition-all duration-500 opacity-70 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-400 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-xl"></div>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-green-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-32 bg-gradient-to-br from-green-600 to-green-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 animate-fade-in-up">
              Découvrez notre approche transformationnelle
            </h2>
            <p className="text-xl text-green-100 mb-12 leading-relaxed animate-fade-in-up delay-200">
              Plongez dans l'univers du coaching transformationnel avec Sylvère Boussamba
            </p>

            <div className="relative inline-block animate-fade-in-up delay-400">
              <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center group hover:bg-opacity-30 transition-all duration-300 cursor-pointer hover:scale-110">
                <Play className="h-12 w-12 text-white ml-2 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="absolute inset-0 rounded-full border-4 border-white border-opacity-30 animate-ping"></div>
            </div>

            <p className="text-green-100 mt-6 animate-fade-in-up delay-600">Cliquez pour voir notre présentation</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-r from-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-5"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 animate-fade-in-up">
              Prêt à transformer votre <span className="text-green-400">organisation</span> ?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
              Rejoignez les leaders qui ont choisi K-Venture pour développer leur potentiel et celui de leurs équipes
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up delay-400">
              <Button
                asChild
                size="lg"
                className="group bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-10 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Link href="/contact">
                  Commencer votre transformation
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="group border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900 px-10 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 bg-transparent"
              >
                <Link href="/blog">
                  Télécharger notre e-book gratuit
                  <div className="ml-3 w-6 h-6 rounded-full bg-green-400 group-hover:bg-gray-900 flex items-center justify-center transition-colors duration-300">
                    <ArrowRight className="h-4 w-4 text-gray-900 group-hover:text-green-400" />
                  </div>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
