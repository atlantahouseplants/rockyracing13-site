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
        className={className}
        src="/logos/rocky-logo-1.svg" 
        alt="Rocky Racing"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
          const nextElement = e.currentTarget.nextElementSibling as HTMLElement
          if (nextElement) nextElement.style.display = 'inline'
        }}
      />
      <span className={textClass}>
        Rocky Racing
      </span>
    </>
  )
}