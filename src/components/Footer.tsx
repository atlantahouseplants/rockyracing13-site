import Link from 'next/link'
import { Youtube, Twitch, Instagram, Twitter, MessageSquare } from 'lucide-react'
import Logo from './Logo'

export default function Footer() {
  const socialLinks = [
    { name: 'YouTube', href: 'https://youtube.com/@rockyracing13', icon: Youtube },
    { name: 'Twitch', href: '#', icon: Twitch },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'Twitter/X', href: '#', icon: Twitter },
    { name: 'Discord', href: '#', icon: MessageSquare },
  ]

  const quickLinks = [
    { name: 'The Team', href: '/team' },
    { name: 'Watch', href: '/watch' },
    { name: 'Schedule', href: '/schedule' },
    { name: 'Support', href: '/support' },
    { name: 'Contact', href: '/contact' },
  ]

  const resourceLinks = [
    { name: 'Strategy Calculator', href: 'https://strategy.rockyracing13.com', external: true },
    { name: 'Telemetry Coach', href: 'https://telemetry.rockyracing13.com', external: true },
    { name: 'All Resources', href: '/resources', external: false },
  ]

  const legalLinks = [
    { name: 'Privacy Policy', href: '/legal/privacy' },
    { name: 'Terms of Service', href: '/legal/terms' },
    { name: 'Community Guidelines', href: '/legal/community' },
  ]

  return (
    <footer className="bg-rr-black text-rr-white border-t border-rr-gold/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <Logo />
            </Link>
            <p className="text-rr-gray-400 text-sm max-w-md">
              From Sim to Reality. Following a 13-year-old&apos;s racing journey with transparency,
              sportsmanship, and community support. Parent-supervised communications.
            </p>
            <div className="mt-4">
              <Link 
                href="mailto:max@rockyracing13.com"
                className="text-rr-gold hover:text-rr-gold/80 transition-colors duration-200"
              >
                max@rockyracing13.com
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-rr-gold font-heading text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-rr-gray-400 hover:text-rr-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources & Legal */}
          <div>
            <h3 className="text-rr-gold font-heading text-lg mb-4">Resources</h3>
            <ul className="space-y-2 mb-6">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-rr-gray-400 hover:text-rr-white transition-colors duration-200 text-sm inline-flex items-center gap-1"
                    >
                      {link.name}
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-rr-gray-400 hover:text-rr-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <h3 className="text-rr-gold font-heading text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-rr-gray-400 hover:text-rr-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-rr-gold font-heading text-lg mb-4 mt-6">Follow</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-rr-gray-400 hover:text-rr-gold transition-colors duration-200"
                  aria-label={social.name}
                  target={social.href !== '#' ? '_blank' : undefined}
                  rel={social.href !== '#' ? 'noopener noreferrer' : undefined}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Mini Sponsors Row */}
        <div className="mt-8 pt-8 border-t border-rr-gold/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-rr-gray-500 text-sm">
              © {new Date().getFullYear()} Rocky Racing. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-rr-gray-500 text-xs">
                Sponsor placeholders - real partnerships coming soon
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}