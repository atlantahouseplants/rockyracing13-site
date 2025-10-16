import { Metadata } from 'next'
import Link from 'next/link'
import { Heart, Coffee, Gift, ExternalLink, TrendingUp } from 'lucide-react'
import ProgressBar from '@/components/ProgressBar'

export const metadata: Metadata = {
  title: 'Support Rocky Racing - Help Our Journey',
  description: 'Support Rocky Racing with donations, tips, or affiliate purchases. All contributions go directly toward sim rig upgrades and racing development.',
}

export default function Support() {
  const progress = {
    goalAmount: 2500,
    raisedAmount: 750,
    lastUpdated: "2025-09-11",
    label: "Next Sim Rig Upgrade"
  }

  const supportOptions = [
    {
      icon: Coffee,
      title: 'Buy Me a Coffee',
      description: 'Support with a small tip - every coffee helps fuel late-night practice sessions!',
      amount: '$3-15',
      link: '#',
      color: 'from-amber-600 to-amber-800'
    },
    {
      icon: Heart,
      title: 'Patreon Monthly',
      description: 'Join our monthly supporters for exclusive content and early access to videos.',
      amount: '$5-50/mo',
      link: '#',
      color: 'from-pink-600 to-pink-800'
    },
    {
      icon: Gift,
      title: 'PayPal Donation',
      description: 'One-time donation directly to our equipment fund - 100% transparent usage.',
      amount: 'Any amount',
      link: '#',
      color: 'from-blue-600 to-blue-800'
    }
  ]

  const affiliateItems = [
    {
      name: 'Fanatec CSL Elite Wheel Base',
      category: 'Sim Racing Hardware',
      price: '$599.99',
      description: 'Professional-grade wheel base for serious sim racing',
      link: '#'
    },
    {
      name: 'Thrustmaster T300 RS',
      category: 'Entry-Level Hardware',  
      price: '$299.99',
      description: 'Great starter wheel for new sim racers',
      link: '#'
    },
    {
      name: 'Racing Setup Guide eBook',
      category: 'Educational Content',
      price: '$19.99',
      description: 'Max\'s complete setup guide for iRacing success',
      link: '#'
    }
  ]

  const recentContributions = [
    { amount: 50, item: 'New racing wheel upgrade', date: '2025-09-08' },
    { amount: 120, item: 'Streaming equipment improvements', date: '2025-09-01' },
    { amount: 75, item: 'iRacing subscription renewal', date: '2025-08-25' }
  ]

  return (
    <div className="min-h-screen bg-rr-black text-rr-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rr-black via-gray-900 to-rr-black py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-heading text-5xl lg:text-6xl text-rr-white mb-6">
              Support the Journey
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              If you enjoy the journey and want to help, here are low-friction ways to support. 
              No pressure — your views and shares already mean the world.
            </p>
            <div className="bg-rr-gold/10 border border-rr-gold/30 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-rr-gold font-medium">
                🎯 100% Transparency: Every contribution is tracked and reported monthly
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Goal Progress */}
      <section className="py-16 bg-gray-950">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl text-rr-white mb-4">Current Goal</h2>
            <p className="text-gray-300">
              Help us upgrade to a direct drive wheel base for better force feedback and more realistic racing
            </p>
          </div>
          <ProgressBar progress={progress} className="bg-gray-900/50 border border-gray-700" />
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Next goal: Triple monitor setup for better situational awareness ($1,800)
            </p>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16 bg-rr-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl text-rr-white mb-4">Ways to Support</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Choose what works best for you. Every contribution helps us improve our content and racing performance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {supportOptions.map((option, index) => (
              <div key={index} className="bg-gray-900/50 rounded-lg border border-gray-800 overflow-hidden hover:border-rr-gold/30 transition-colors duration-200">
                <div className={`bg-gradient-to-r ${option.color} p-6`}>
                  <option.icon size={48} className="text-white mx-auto mb-4" />
                  <h3 className="font-heading text-xl text-white text-center">{option.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-300 text-sm mb-4">{option.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-rr-gold font-semibold">{option.amount}</span>
                    <ExternalLink size={16} className="text-gray-400" />
                  </div>
                  <Link 
                    href={option.link}
                    className="block w-full bg-rr-gold text-rr-black text-center px-4 py-2 rounded-md font-semibold hover:bg-rr-gold/90 transition-colors duration-200"
                  >
                    Support Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliate Gear */}
      <section className="py-16 bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl text-rr-white mb-4">Recommended Gear</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-4">
              Gear we use and recommend. Purchasing through these affiliate links supports us at no extra cost to you.
            </p>
            <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-blue-400 text-sm">
                <strong>Affiliate Disclosure:</strong> We earn a small commission from qualifying purchases. 
                This helps fund our racing development at no additional cost to you.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {affiliateItems.map((item, index) => (
              <div key={index} className="bg-gray-900/50 rounded-lg border border-gray-800 p-6 hover:border-rr-gold/30 transition-colors duration-200">
                <div className="mb-4">
                  <span className="text-rr-gold text-xs font-medium">{item.category}</span>
                  <h3 className="text-rr-white font-semibold text-lg mb-2">{item.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-rr-gold font-bold text-lg">{item.price}</span>
                    <Link 
                      href={item.link}
                      className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                    >
                      View <ExternalLink size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparent Ledger */}
      <section className="py-16 bg-rr-black">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl text-rr-gold mb-4">Contribution Ledger</h2>
            <p className="text-gray-300">
              Complete transparency on how your support helps our racing journey
            </p>
          </div>

          <div className="bg-gray-900/50 rounded-lg border border-gray-800 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading text-xl text-rr-white">Recent Contributions Used</h3>
              <TrendingUp className="text-rr-gold" size={24} />
            </div>
            
            <div className="space-y-4">
              {recentContributions.map((contribution, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-gray-800">
                  <div>
                    <p className="text-rr-white font-medium">{contribution.item}</p>
                    <p className="text-gray-400 text-sm">{new Date(contribution.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-rr-gold font-semibold">
                    ${contribution.amount}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-800 text-center">
              <p className="text-gray-400 text-sm">
                Total community contributions this month: <span className="text-rr-gold font-semibold">$245</span>
              </p>
              <Link 
                href="/transparency"
                className="text-blue-400 hover:text-blue-300 text-sm mt-2 inline-block"
              >
                View complete financial transparency report →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Alternative Support */}
      <section className="py-12 bg-gray-900/50 border-t border-gray-800">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-heading text-2xl text-rr-white mb-4">Free Ways to Support</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h4 className="text-rr-gold font-semibold mb-2">Share Our Content</h4>
              <p className="text-gray-400 text-sm">
                Like, share, and comment on our videos to help grow our community
              </p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h4 className="text-rr-gold font-semibold mb-2">Join Our Discord</h4>
              <p className="text-gray-400 text-sm">
                Be part of our racing community and help others learn
              </p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h4 className="text-rr-gold font-semibold mb-2">Spread the Word</h4>
              <p className="text-gray-400 text-sm">
                Tell other racing enthusiasts about our journey
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}