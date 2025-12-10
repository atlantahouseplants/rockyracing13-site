import { Metadata } from 'next'
import Link from 'next/link'
import { Heart, Coffee, Gift, ExternalLink, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Support Rocky Racing - Help Our Journey',
  description: 'Support Rocky Racing with donations, tips, or affiliate purchases. All contributions go directly toward sim rig upgrades and racing development.',
}

export default function Support() {
  const progress = {
    goalAmount: 2500,
    raisedAmount: 750,
    percentage: 30,
  }

  const supportOptions = [
    {
      icon: Coffee,
      title: 'Buy Me a Coffee',
      description: 'Support with a small tip - every coffee helps fuel late-night practice sessions!',
      amount: '$3-15',
      link: '#',
    },
    {
      icon: Heart,
      title: 'Patreon Monthly',
      description: 'Join our monthly supporters for exclusive content and early access to videos.',
      amount: '$5-50/mo',
      link: '#',
    },
    {
      icon: Gift,
      title: 'PayPal Donation',
      description: 'One-time donation directly to our equipment fund - 100% transparent usage.',
      amount: 'Any amount',
      link: '#',
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
      <section className="py-16 md:py-24 bg-rr-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-heading text-5xl md:text-6xl text-rr-gold mb-6">
            Support the Journey
          </h1>
          <p className="text-xl text-rr-gray-400 max-w-2xl mx-auto mb-8">
            If you enjoy the journey and want to help, here are low-friction ways to support.
            No pressure - your views and shares already mean the world.
          </p>
          <div className="bg-rr-gold/10 border border-rr-gold/30 rounded-lg p-4 max-w-xl mx-auto">
            <p className="text-rr-gold font-medium text-sm">
              100% Transparency: Every contribution is tracked and reported monthly
            </p>
          </div>
        </div>
      </section>

      {/* Current Goal Progress */}
      <section className="py-12 bg-rr-black">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl text-rr-white mb-4">Current Goal</h2>
            <p className="text-rr-gray-400">
              Help us upgrade to a direct drive wheel base for better force feedback
            </p>
          </div>

          <div className="bg-rr-gray-900 rounded-xl p-8 border border-rr-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-heading text-xl text-rr-gold">Direct Drive Wheel</h3>
              <span className="text-rr-white font-semibold">
                ${progress.raisedAmount.toLocaleString()} / ${progress.goalAmount.toLocaleString()}
              </span>
            </div>

            <div className="w-full bg-rr-gray-800 rounded-full h-4 mb-4">
              <div
                className="bg-rr-gold h-4 rounded-full transition-all duration-500"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>

            <div className="flex justify-between text-sm text-rr-gray-400">
              <span>{progress.percentage}% funded</span>
              <span>${(progress.goalAmount - progress.raisedAmount).toLocaleString()} to go</span>
            </div>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-12 bg-rr-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl text-rr-white mb-4">Ways to Support</h2>
            <p className="text-rr-gray-400 max-w-2xl mx-auto">
              Choose what works best for you. Every contribution helps us improve our content and racing performance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {supportOptions.map((option, index) => (
              <div key={index} className="bg-rr-black rounded-xl border border-rr-gray-700 overflow-hidden hover:border-rr-gold/50 transition-colors">
                <div className="p-6 border-b border-rr-gray-800">
                  <option.icon size={40} className="text-rr-gold mb-4" />
                  <h3 className="font-heading text-xl text-rr-white mb-2">{option.title}</h3>
                  <p className="text-rr-gray-400 text-sm">{option.description}</p>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-rr-gold font-semibold">{option.amount}</span>
                  </div>
                  <Link
                    href={option.link}
                    className="block w-full bg-rr-gold text-rr-black text-center px-4 py-3 rounded-lg font-semibold hover:bg-rr-gold/90 transition-colors"
                  >
                    Support Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparent Ledger */}
      <section className="py-12 bg-rr-black">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl text-rr-gold mb-4">Contribution Ledger</h2>
            <p className="text-rr-gray-400">
              Complete transparency on how your support helps our racing journey
            </p>
          </div>

          <div className="bg-rr-gray-900 rounded-xl border border-rr-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading text-lg text-rr-white">Recent Contributions Used</h3>
              <TrendingUp className="text-rr-gold" size={24} />
            </div>

            <div className="space-y-4">
              {recentContributions.map((contribution, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-rr-gray-800 last:border-0">
                  <div>
                    <p className="text-rr-white font-medium">{contribution.item}</p>
                    <p className="text-rr-gray-500 text-sm">{new Date(contribution.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-rr-gold font-semibold">
                    ${contribution.amount}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-rr-gray-800 text-center">
              <p className="text-rr-gray-400 text-sm">
                Total community contributions this month: <span className="text-rr-gold font-semibold">$245</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Free Support Options */}
      <section className="py-12 bg-rr-gray-900 border-t border-rr-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="font-heading text-2xl text-rr-white mb-6">Free Ways to Support</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-rr-black rounded-xl p-6 border border-rr-gray-700">
              <h4 className="text-rr-gold font-semibold mb-2">Share Our Content</h4>
              <p className="text-rr-gray-400 text-sm">
                Like, share, and comment on our videos to help grow our community
              </p>
            </div>
            <div className="bg-rr-black rounded-xl p-6 border border-rr-gray-700">
              <h4 className="text-rr-gold font-semibold mb-2">Join Our Discord</h4>
              <p className="text-rr-gray-400 text-sm">
                Be part of our racing community and help others learn
              </p>
            </div>
            <div className="bg-rr-black rounded-xl p-6 border border-rr-gray-700">
              <h4 className="text-rr-gold font-semibold mb-2">Spread the Word</h4>
              <p className="text-rr-gray-400 text-sm">
                Tell other racing enthusiasts about our journey
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
