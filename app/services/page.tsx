import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, Building2, ArrowRight, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ServicesPage() {
  const services = [
    {
      icon: Users,
      title: "Coaching Individuel & Collectif",
      description:
        "Développement personnalisé du leadership et de l'intelligence émotionnelle pour révéler votre plein potentiel et celui de vos équipes.",
      features: [
        "Coaching de dirigeants et cadres supérieurs",
        "Développement de l'intelligence émotionnelle",
        "Gestion du stress et de la pression",
        "Communication et influence",
        "Coaching d'équipe et team building",
      ],
      duration: "3-6 mois",
      format: "Présentiel & Distanciel",
    },
    {
      icon: BookOpen,
      title: "Formations",
      description:
        "Programmes de formation sur-mesure conçus pour développer les compétences clés du leadership moderne et de la conduite du changement.",
      features: [
        "Leadership transformationnel",
        "Conduite du changement",
        "Management d'équipe",
        "Communication efficace",
        "Gestion des conflits",
      ],
      duration: "1-5 jours",
      format: "Intra & Inter-entreprises",
    },
    {
      icon: Building2,
      title: "Transformation Organisationnelle",
      description:
        "Accompagnement global pour optimiser vos structures, développer une culture d'entreprise performante et créer un environnement de travail épanouissant.",
      features: [
        "Diagnostic organisationnel",
        "Développement de la culture d'entreprise",
        "Optimisation des processus",
        "Conduite du changement",
        "Amélioration du climat social",
      ],
      duration: "6-18 mois",
      format: "Mission d'accompagnement",
    },
  ]

  const formations = [
    "Leadership Transformationnel",
    "Intelligence Émotionnelle",
    "Conduite du Changement",
    "Management d'Équipe",
    "Communication Efficace",
    "Gestion des Conflits",
    "Prise de Décision",
    "Négociation Stratégique",
  ]

  const testimonials = [
    {
      quote:
        "K-Venture a transformé notre équipe de direction. L'approche de Sylvère est à la fois professionnelle et humaine.",
      author: "Marie Dubois",
      position: "DRH, SEEG",
      rating: 5,
    },
    {
      quote:
        "Un accompagnement exceptionnel qui nous a permis de naviguer sereinement dans une période de transformation majeure.",
      author: "Jean-Paul Martin",
      position: "Directeur Général, Orabank",
      rating: 5,
    },
    {
      quote:
        "Les formations K-Venture ont considérablement amélioré nos performances managériales et notre cohésion d'équipe.",
      author: "Fatou Diallo",
      position: "Responsable RH, AFG Bank",
      rating: 5,
    },
  ]

  const galleryImages = [
    "/coaching1.jpg?height=300&width=400",
    "/coaching.jpg?height=300&width=400",
    "/coaching3.jpeg?height=300&width=400",
    "/coaching5.jpeg?height=300&width=400",
    "/coaching6.jpeg?height=300&width=400",
    "/coaching7.jpeg?height=300&width=400",
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-green-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Nos <span className="text-green-600">Services</span>
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
            <p className="text-xl text-gray-600 leading-relaxed">
              Des solutions personnalisées pour développer votre leadership et transformer votre organisation
            </p>
          </div>
        </div>
      </section>

      {/* Services Detail Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {services.map((service, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
              >
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                      <service.icon className="h-6 w-6 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">{service.title}</h2>
                  </div>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <div className="space-y-4 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-4 mb-6">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Durée: {service.duration}
                    </Badge>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {service.format}
                    </Badge>
                  </div>
                </div>
                <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                  <Image
                    src={`/INTERVIEW.jpeg?height=400&width=500`}
                    alt={`${service.title} - K-Venture`}
                    width={500}
                    height={400}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formations List */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nos Formations Phares</h2>
            <p className="text-xl text-gray-600">
              Développez vos compétences avec nos programmes de formation reconnus
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {formations.map((formation, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-gray-900 mb-2">{formation}</h3>
                  <div className="w-8 h-1 bg-green-600 mx-auto"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nos Sessions en Action</h2>
            <p className="text-xl text-gray-600">Découvrez l'ambiance de nos formations et sessions de coaching</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div key={index} className="group overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Session K-Venture ${index + 1}`}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Témoignages Clients</h2>
            <p className="text-xl text-gray-600">Ce que disent nos clients de leur expérience avec K-Venture</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white shadow-lg">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-600 mb-6 italic leading-relaxed">"{testimonial.quote}"</blockquote>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.position}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Prêt à transformer votre leadership ?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Contactez-nous pour discuter de vos besoins et découvrir comment nous pouvons vous accompagner
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
            <Link href="/contact">
              Demander un devis <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
