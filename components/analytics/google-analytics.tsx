"use client"

import { useEffect } from "react"
import Script from "next/script"
import { GA_TRACKING_ID, initGA } from "@/lib/analytics"
import { useCookieConsent } from "@/hooks/use-cookie-consent"

export default function GoogleAnalytics() {
  const { hasConsent } = useCookieConsent()

  useEffect(() => {
    if (hasConsent && GA_TRACKING_ID) {
      initGA()
    }
  }, [hasConsent])

  if (!hasConsent || !GA_TRACKING_ID) {
    return null
  }

  return (
    <>
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_title: document.title,
              page_location: window.location.href,
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false
            });
          `,
        }}
      />
    </>
  )
}
