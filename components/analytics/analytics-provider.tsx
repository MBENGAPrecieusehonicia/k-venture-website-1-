"use client"

import type React from "react"

import { useAnalytics } from "@/hooks/use-analytics"
import GoogleAnalytics from "./google-analytics"
import CookieBanner from "./cookie-banner"

interface AnalyticsProviderProps {
  children: React.ReactNode
}

export default function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  useAnalytics()

  return (
    <>
      {children}
      <GoogleAnalytics />
      <CookieBanner />
    </>
  )
}
