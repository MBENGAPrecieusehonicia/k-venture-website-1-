"use client"

import { useState, useEffect } from "react"

const COOKIE_CONSENT_KEY = "k-venture-cookie-consent"

export function useCookieConsent() {
  const [hasConsent, setHasConsent] = useState<boolean | null>(null)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (consent !== null) {
      setHasConsent(consent === "true")
    } else {
      setShowBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "true")
    setHasConsent(true)
    setShowBanner(false)
  }

  const declineCookies = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "false")
    setHasConsent(false)
    setShowBanner(false)
  }

  const resetConsent = () => {
    localStorage.removeItem(COOKIE_CONSENT_KEY)
    setHasConsent(null)
    setShowBanner(true)
  }

  return {
    hasConsent,
    showBanner,
    acceptCookies,
    declineCookies,
    resetConsent,
  }
}
