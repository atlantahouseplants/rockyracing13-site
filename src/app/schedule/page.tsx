import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rocky Racing Schedule & Results',
  description: 'View Rocky Racing race schedule, results, and performance statistics from iRacing competitions.',
}

export default function Schedule() {
  return (
    <div className="min-h-screen bg-rr-black text-rr-white py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-heading text-5xl text-rr-white mb-6">Schedule & Results</h1>
        <div className="bg-gray-900/50 rounded-lg p-12 border border-gray-800">
          <h2 className="font-heading text-2xl text-rr-gold mb-4">Coming Soon</h2>
          <p className="text-gray-300">
            Interactive race calendar, results table with CSV import, and performance analytics.
          </p>
        </div>
      </div>
    </div>
  )
}