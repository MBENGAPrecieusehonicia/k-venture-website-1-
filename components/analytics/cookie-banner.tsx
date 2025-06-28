"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Cookie, Shield, BarChart3 } from "lucide-react"
import { useCookieConsent } from "@/hooks/use-cookie-consent"
import { useState } from "react"

export default function CookieBanner() {
  const { showBanner, acceptCookies, declineCookies } = useCookieConsent()
  const [showDetails, setShowDetails] = useState(false)

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="mx-auto max-w-4xl bg-white shadow-2xl border-t-4 border-green-600">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Cookie className="h-6 w-6 text-green-600" />
            </div>

            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Respect de votre vie privée</h3>

              {!showDetails ? (
                <p className="text-gray-600 mb-4">
                  Nous utilisons des cookies pour améliorer votre expérience sur notre site et analyser notre audience.
                  Ces données nous aident à mieux comprendre vos besoins en coaching et formations.
                </p>
              ) : (
                <div className="space-y-4 mb-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900">Cookies essentiels</h4>
                        <p className="text-sm text-gray-600">
                          Nécessaires au fonctionnement du site (formulaires, navigation)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <BarChart3 className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900">Cookies analytiques</h4>
                        <p className="text-sm text-gray-600">Google Analytics pour comprendre l'utilisation du site</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Pourquoi ces données ?</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Améliorer nos services de coaching</li>
                      <li>• Personnaliser le contenu selon vos intérêts</li>
                      <li>• Mesurer l'efficacité de nos formations</li>
                      <li>• Optimiser l'expérience utilisateur</li>
                    </ul>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={acceptCookies} className="bg-green-600 hover:bg-green-700 text-white">
                  Accepter tous les cookies
                </Button>

                <Button onClick={declineCookies} variant="outline" className="border-gray-300 bg-transparent">
                  Cookies essentiels uniquement
                </Button>

                <Button
                  onClick={() => setShowDetails(!showDetails)}
                  variant="ghost"
                  className="text-green-600 hover:text-green-700"
                >
                  {showDetails ? "Masquer" : "En savoir plus"}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
