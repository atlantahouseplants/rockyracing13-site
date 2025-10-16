'use client'

interface LogoProps {
  className?: string
  showText?: boolean
  textClass?: string
}

export default function Logo({ className = "h-8 w-auto", showText = false, textClass = "hidden ml-2 text-rr-white font-heading text-xl" }: LogoProps) {
  return (
    <>
      <img
        className={`${className} filter brightness-0 invert`}
        src="/rocky-racing-logo-bw.png"
        alt="Rocky Racing"
        onError={(e) => {
          e.currentTarget.src = "/logos/rocky-logo-1.svg"
          e.currentTarget.className = className
        }}
      />
      {showText && (
        <span className={textClass}>
          Rocky Racing
        </span>
      )}
    </>
  )
}