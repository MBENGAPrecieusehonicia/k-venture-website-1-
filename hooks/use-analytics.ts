"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { trackingEvents, trackScrollDepth, trackTimeOnPage, trackPagePerformance } from "@/lib/analytics"

export function useAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    // Track page view
    const pageName = document.title
    const pageCategory = getPageCategory(pathname)
    trackingEvents.pageView(pageName, pageCategory)

    // Track performance metrics
    trackPagePerformance()

    // Track scroll depth
    const cleanupScroll = trackScrollDepth()

    // Track time on page
    const cleanupTime = trackTimeOnPage()

    return () => {
      cleanupScroll?.()
      cleanupTime?.()
    }
  }, [pathname])

  return {
    trackEvent: trackingEvents,
  }
}

function getPageCategory(pathname: string): string {
  if (pathname === "/") return "home"
  if (pathname.startsWith("/about")) return "about"
  if (pathname.startsWith("/services")) return "services"
  if (pathname.startsWith("/blog")) return "blog"
  if (pathname.startsWith("/contact")) return "contact"
  return "other"
}

// Hook pour tracking des formulaires
export function useFormTracking(formName: string) {
  const trackFormStart = () => {
    trackingEvents.trackEvent("form_start", "engagement", formName)
  }

  const trackFormError = (errorType: string) => {
    trackingEvents.formError(formName, errorType)
  }

  const trackFormSuccess = () => {
    trackingEvents.trackEvent("form_success", "conversion", formName)
  }

  return {
    trackFormStart,
    trackFormError,
    trackFormSuccess,
  }
}
