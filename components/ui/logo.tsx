import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  showText?: boolean
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
  xl: "w-24 h-24",
}

const sizePx = {
  sm: 32,
  md: 48,
  lg: 64,
  xl: 96,
}

export default function Logo({ size = "md", className, showText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center space-x-3", className)}>
      <div
        className={cn(
          "rounded-xl overflow-hidden shadow-lg bg-white p-1 transition-all duration-300 hover:scale-110 hover:shadow-xl",
          sizeClasses[size],
        )}
      >
        <Image
          src="/images/k-venture-logo.jpeg"
          alt="K-Venture Logo"
          width={sizePx[size]}
          height={sizePx[size]}
          className="w-full h-full object-contain"
          priority
        />
      </div>
      {showText && (
        <span
          className={cn(
            "font-bold text-gray-900 transition-colors duration-300",
            size === "sm" && "text-lg",
            size === "md" && "text-2xl",
            size === "lg" && "text-3xl",
            size === "xl" && "text-4xl",
          )}
        >
          K-Venture
        </span>
      )}
    </div>
  )
}
