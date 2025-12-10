'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'The Team', href: '/team' },
    { name: 'Watch', href: '/watch' },
    { name: 'Schedule', href: '/schedule' },
    { name: 'Sponsors', href: '/sponsors' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-rr-black border-b border-rr-gold/20">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-rr-white hover:text-rr-gold transition-colors duration-200 text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/support"
              className="bg-rr-gold text-rr-black px-4 py-2 rounded-md text-sm font-medium hover:bg-rr-gold/90 transition-colors duration-200"
            >
              Support
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-rr-white hover:text-rr-gold p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-rr-black border-t border-rr-gold/20">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-rr-white hover:text-rr-gold transition-colors duration-200 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/support"
                className="block px-3 py-2 text-rr-gold font-semibold transition-colors duration-200 text-base"
                onClick={() => setIsMenuOpen(false)}
              >
                Support Us
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}