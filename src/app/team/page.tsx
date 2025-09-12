import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rocky Racing Team - Meet Our Drivers',
  description: 'Meet the Rocky Racing team members, download our media kit, and learn about our Friends of Rocky Racing community.',
}

export default function Team() {
  return (
    <div className="min-h-screen bg-rr-black text-rr-white py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-heading text-5xl text-rr-white mb-6">Our Team</h1>
        <div className="bg-gray-900/50 rounded-lg p-12 border border-gray-800">
          <h2 className="font-heading text-2xl text-rr-gold mb-4">Coming Soon</h2>
          <p className="text-gray-300">
            Team profiles, media kit downloads, and Friends of Rocky Racing community showcase.
          </p>
        </div>
      </div>
    </div>
  )
}