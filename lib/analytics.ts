// Configuration et utilitaires pour Google Analytics 4
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX"

// --- helper ----------
const safeGtag = (...args: any[]) => {
  if (typeof window === "undefined") return
  if (typeof window.gtag === "function") {
    window.gtag(...args)
  } else {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(args)
  }
}

// Initialiser Google Analytics
export const initGA = () => {
  if (typeof window === "undefined") return

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag("js", new Date())
  window.gtag("config", GA_TRACKING_ID, {
    page_title: document.title,
    page_location: window.location.href,
  })
}

// Événements de tracking personnalisés pour K-Venture
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window === "undefined") return
  safeGtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

// Événements spécifiques au coaching
export const trackingEvents = {
  // Formulaires et conversions
  newsletterSignup: (source: string) => {
    trackEvent("newsletter_signup", "engagement", source)
    safeGtag("event", "conversion", {
      send_to: GA_TRACKING_ID,
      event_category: "lead_generation",
      event_label: "newsletter_subscription",
      custom_parameter_source: source,
    })
  },

  contactFormSubmit: (subject: string) => {
    trackEvent("contact_form_submit", "conversion", subject)
    safeGtag("event", "conversion", {
      send_to: GA_TRACKING_ID,
      event_category: "lead_generation",
      event_label: "contact_request",
      custom_parameter_subject: subject,
    })
  },

  ebookDownload: (ebookTitle: string) => {
    trackEvent("ebook_download", "engagement", ebookTitle)
    safeGtag("event", "conversion", {
      send_to: GA_TRACKING_ID,
      event_category: "lead_generation",
      event_label: "ebook_download",
      custom_parameter_ebook: ebookTitle,
    })
  },

  // Navigation et engagement
  pageView: (pageName: string, pageCategory: string) => {
    if (typeof window === "undefined") return
    safeGtag("event", "page_view", {
      page_title: pageName,
      page_location: window.location.href,
      page_category: pageCategory,
    })
  },

  serviceInterest: (serviceName: string) => {
    trackEvent("service_interest", "engagement", serviceName)
  },

  videoPlay: (videoTitle: string) => {
    trackEvent("video_play", "engagement", videoTitle)
  },

  socialClick: (platform: string) => {
    trackEvent("social_click", "engagement", platform)
  },

  // Événements de performance
  scrollDepth: (percentage: number) => {
    trackEvent("scroll_depth", "engagement", `${percentage}%`, percentage)
  },

  timeOnPage: (seconds: number, pageName: string) => {
    trackEvent("time_on_page", "engagement", pageName, seconds)
  },

  // Événements d'erreur
  formError: (formName: string, errorType: string) => {
    trackEvent("form_error", "error", `${formName}_${errorType}`)
  },

  // Événements business spécifiques
  consultationRequest: (serviceType: string) => {
    trackEvent("consultation_request", "high_intent", serviceType)
    safeGtag("event", "conversion", {
      send_to: GA_TRACKING_ID,
      event_category: "high_value_lead",
      event_label: "consultation_request",
      custom_parameter_service: serviceType,
    })
  },

  phoneClick: () => {
    trackEvent("phone_click", "contact", "header_phone")
  },

  emailClick: () => {
    trackEvent("email_click", "contact", "header_email")
  },
}

// Tracking des performances de page
export const trackPagePerformance = () => {
  if (typeof window === "undefined") return

  // Core Web Vitals
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === "navigation") {
        const navEntry = entry as PerformanceNavigationTiming

        safeGtag("event", "page_load_time", {
          event_category: "performance",
          event_label: window.location.pathname,
          value: Math.round(navEntry.loadEventEnd - navEntry.loadEventStart),
        })
      }

      if (entry.entryType === "largest-contentful-paint") {
        safeGtag("event", "largest_contentful_paint", {
          event_category: "performance",
          event_label: window.location.pathname,
          value: Math.round(entry.startTime),
        })
      }
    }
  })

  observer.observe({ entryTypes: ["navigation", "largest-contentful-paint"] })
}

// Tracking du scroll depth
export const trackScrollDepth = () => {
  if (typeof window === "undefined") return

  let maxScroll = 0
  const thresholds = [25, 50, 75, 90, 100]
  const tracked = new Set<number>()

  const handleScroll = () => {
    const scrollTop = window.pageYOffset
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = Math.round((scrollTop / docHeight) * 100)

    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent

      thresholds.forEach((threshold) => {
        if (scrollPercent >= threshold && !tracked.has(threshold)) {
          tracked.add(threshold)
          trackingEvents.scrollDepth(threshold)
        }
      })
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true })

  return () => window.removeEventListener("scroll", handleScroll)
}

// Tracking du temps passé sur la page
export const trackTimeOnPage = () => {
  if (typeof window === "undefined") return

  const startTime = Date.now()
  const pageName = document.title

  const handleBeforeUnload = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000)
    if (timeSpent > 10) {
      // Seulement si plus de 10 secondes
      trackingEvents.timeOnPage(timeSpent, pageName)
    }
  }

  window.addEventListener("beforeunload", handleBeforeUnload)

  return () => window.removeEventListener("beforeunload", handleBeforeUnload)
}
