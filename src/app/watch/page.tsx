import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Watch Rocky Racing - Videos & Streams',
  description: 'Watch Rocky Racing videos, live streams, and race highlights. Follow our journey from sim to reality.',
}

export default function Watch() {
  return (
    <div className="min-h-screen bg-rr-black text-rr-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-heading text-5xl text-rr-white mb-6">Watch Rocky Racing</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Follow our racing journey with race highlights, setup tutorials, and behind-the-scenes content
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* YouTube Channel */}
          <div className="bg-gray-900/50 rounded-lg p-8 border border-gray-800">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-red-600 rounded-full p-3">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <div>
                <h2 className="font-heading text-2xl text-rr-white">YouTube Channel</h2>
                <p className="text-rr-gold">@rockyracing13</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6">
              Subscribe for race highlights, tutorials, and weekly updates from our racing journey. 
              New videos every week featuring race analysis, setup guides, and community content.
            </p>
            <a 
              href="https://youtube.com/@rockyracing13"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Subscribe Now
            </a>
          </div>

          {/* Live Streaming */}
          <div className="bg-gray-900/50 rounded-lg p-8 border border-gray-800">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-purple-600 rounded-full p-3">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.64 5.93L8.39 9.18c-.47.47-.47 1.24 0 1.71l3.25 3.25c.47.47 1.24.47 1.71 0l3.25-3.25c.47-.47.47-1.24 0-1.71L13.35 5.93c-.47-.47-1.24-.47-1.71 0z"/>
                </svg>
              </div>
              <div>
                <h2 className="font-heading text-2xl text-rr-white">Live Streams</h2>
                <p className="text-purple-400">Racing & Practice</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6">
              Join us live for practice sessions, qualifying runs, and race events. 
              Interact with the community and get real-time insights into our racing strategy.
            </p>
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <p className="text-sm text-gray-400 mb-2">🔴 Stream Status</p>
              <p className="text-gray-300">Currently Offline</p>
              <p className="text-xs text-gray-500 mt-2">
                Next stream: Check our YouTube community tab for announcements
              </p>
            </div>
          </div>
        </div>

        {/* Content Categories */}
        <div className="mb-12">
          <h2 className="font-heading text-3xl text-rr-white text-center mb-8">Content Categories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-900/30 rounded-lg p-6 border border-gray-800">
              <div className="bg-rr-gold/20 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-rr-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-heading text-lg text-rr-white mb-2">Race Highlights</h3>
              <p className="text-gray-400 text-sm">Best moments from our races with commentary and analysis</p>
            </div>
            <div className="bg-gray-900/30 rounded-lg p-6 border border-gray-800">
              <div className="bg-blue-500/20 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-heading text-lg text-rr-white mb-2">Tutorials</h3>
              <p className="text-gray-400 text-sm">Setup guides, driving techniques, and iRacing tips</p>
            </div>
            <div className="bg-gray-900/30 rounded-lg p-6 border border-gray-800">
              <div className="bg-green-500/20 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="font-heading text-lg text-rr-white mb-2">Behind the Scenes</h3>
              <p className="text-gray-400 text-sm">Team updates, setup process, and racing life vlogs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}