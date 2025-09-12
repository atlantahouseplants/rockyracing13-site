import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rocky Racing Sponsors & Partners',
  description: 'Learn about sponsorship opportunities with Rocky Racing and our current partners supporting our journey.',
}

export default function Sponsors() {
  return (
    <div className="min-h-screen bg-rr-black text-rr-white py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-heading text-5xl text-rr-white mb-6">Sponsors & Partners</h1>
        <div className="bg-gray-900/50 rounded-lg p-12 border border-gray-800">
          <h2 className="font-heading text-2xl text-rr-gold mb-4">Coming Soon</h2>
          <p className="text-gray-300">
            Sponsorship tiers, partner showcase, inquiry forms, and downloadable partnership information.
          </p>
        </div>
      </div>
    </div>
  )
}