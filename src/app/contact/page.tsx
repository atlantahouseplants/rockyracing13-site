import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Rocky Racing - Get in Touch',
  description: 'Contact Rocky Racing for partnerships, media inquiries, or general questions. Parent-supervised communications.',
}

export default function Contact() {
  return (
    <div className="min-h-screen bg-rr-black text-rr-white py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-heading text-5xl text-rr-white mb-6">Contact</h1>
        <div className="bg-gray-900/50 rounded-lg p-12 border border-gray-800">
          <h2 className="font-heading text-2xl text-rr-gold mb-4">Coming Soon</h2>
          <p className="text-gray-300 mb-6">
            Secure contact form with honeypot protection and rate limiting.
          </p>
          <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
            <p className="text-blue-400 text-sm">
              <strong>For immediate inquiries:</strong> max@rockyracing13.com<br />
              All communications are parent-supervised.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}