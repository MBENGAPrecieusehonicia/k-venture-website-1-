"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigation = [
    { name: "Accueil", href: "/" },
    { name: "À Propos", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo with Animation */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <Image
                  src="/images/k-venture-logo.jpeg"
                  alt="K-Venture Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="absolute inset-0 bg-green-400 rounded-xl opacity-0 group-hover:opacity-20 scale-150 transition-all duration-300"></div>
            </div>
            <span
              className={`text-2xl font-bold transition-colors duration-300 ${
                isScrolled ? "text-gray-900" : "text-white"
              } group-hover:text-green-600`}
            >
              K-Venture
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative text-sm font-medium transition-all duration-300 hover:text-green-600 group ${
                  isActive(item.href) ? "text-green-600" : isScrolled ? "text-gray-700" : "text-white"
                }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full ${
                    isActive(item.href) ? "w-full" : ""
                  }`}
                ></span>
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex">
            <Button
              asChild
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-full px-6 py-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Link href="/contact">Nous contacter</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className={`transition-colors duration-300 ${
                  isScrolled ? "text-gray-900 hover:text-green-600" : "text-white hover:text-green-400"
                }`}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                <span className="sr-only">Ouvrir le menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-white/95 backdrop-blur-lg">
              <div className="flex items-center justify-between mb-8">
                <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                  <div className="w-10 h-10 rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="/images/k-venture-logo.jpeg"
                      alt="K-Venture Logo"
                      width={40}
                      height={40}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-xl font-bold text-gray-900">K-Venture</span>
                </Link>
              </div>

              <nav className="space-y-2">
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block py-4 px-6 rounded-xl text-lg font-medium transition-all duration-300 transform hover:translate-x-2 ${
                      isActive(item.href)
                        ? "bg-green-50 text-green-600 border-l-4 border-green-600"
                        : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="mt-8">
                <Button
                  asChild
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-full py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <Link href="/contact">Nous contacter</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
