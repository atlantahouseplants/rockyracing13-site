import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Rocky Racing',
  description: 'Rocky Racing privacy policy outlining how we collect, use, and protect your information.',
}

export default function Privacy() {
  return (
    <div className="min-h-screen bg-rr-black text-rr-white py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl text-rr-white mb-8">Privacy Policy</h1>
        <div className="bg-gray-900/50 rounded-lg p-8 border border-gray-800 prose prose-invert max-w-none">
          <p className="text-gray-300 mb-6">
            <strong>Last updated:</strong> September 11, 2025
          </p>
          <p className="text-gray-300">
            Complete privacy policy content will be added here, including information about data collection, 
            cookies, analytics, and user rights under GDPR and CCPA.
          </p>
        </div>
      </div>
    </div>
  )
}