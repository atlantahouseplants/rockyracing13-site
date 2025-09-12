import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rocky Racing Team - Meet Our Drivers',
  description: 'Meet the Rocky Racing team members, download our media kit, and learn about our Friends of Rocky Racing community.',
}

export default function Team() {
  return (
    <div className="min-h-screen bg-rr-black text-rr-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {/* Rocky Racing Logo */}
          <div className="mb-6">
            <img 
              src="/rocky-racing-logo-bw.png" 
              alt="Rocky Racing Logo" 
              className="mx-auto h-16 sm:h-20 w-auto filter brightness-0 invert opacity-80"
            />
          </div>
          <h1 className="font-heading text-5xl text-rr-white mb-6">Meet Team Rocky Racing</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A father-son team building something special in the world of sim racing and motorsports
          </p>
        </div>

        {/* Max Profile Card */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-rr-gold/10 to-gray-900/50 rounded-lg p-8 border border-rr-gold/30">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-left">
                <div className="w-32 h-32 mx-auto md:mx-0 mb-6">
                  <img 
                    src="/max-profile.jpg" 
                    alt="Max - Rocky Racing Driver" 
                    className="w-32 h-32 rounded-full object-cover border-4 border-rr-gold shadow-lg"
                  />
                </div>
                <h2 className="font-heading text-3xl text-rr-white mb-2">Max</h2>
                <p className="text-rr-gold text-lg mb-4">Driver & Content Creator</p>
                <p className="text-gray-300 mb-6">
                  At 13 years old, Max brings dedication and natural talent to every race. 
                  From studying telemetry to perfecting racing lines, he approaches sim racing 
                  with the same commitment as professional drivers.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-rr-gold/20 text-rr-gold px-3 py-1 rounded-full text-sm">Age 13</span>
                  <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm">iRacing Driver</span>
                  <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm">Content Creator</span>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h3 className="font-heading text-lg text-rr-gold mb-3">Racing Stats</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">iRating:</span>
                      <span className="text-rr-white">~2100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Favorite Car:</span>
                      <span className="text-rr-white">Porsche 992 GT3 Cup</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Favorite Track:</span>
                      <span className="text-rr-white">Spa-Francorchamps</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Racing Since:</span>
                      <span className="text-rr-white">2024</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h3 className="font-heading text-lg text-rr-gold mb-3">Recent Achievements</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="text-rr-gold">🏆</span>
                      First podium finish at Road America
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-400">✅</span>
                      Multiple clean races with 0x incidents
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-400">📈</span>
                      Consistent iRating growth
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Support */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl text-rr-white mb-6">Team Support</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
              <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl text-rr-white mb-3">Dad & Team Manager</h3>
              <p className="text-gray-400 text-sm">
                Handles business operations, content strategy, and provides guidance. 
                All communications are parent-supervised for safety and professionalism.
              </p>
            </div>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
              <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-400 text-2xl">🦎</span>
              </div>
              <h3 className="font-heading text-xl text-rr-white mb-3">Rocky (Mascot)</h3>
              <p className="text-gray-400 text-sm">
                Our gecko mascot and good luck charm. Rocky has been with us since the beginning 
                and represents the fun, approachable side of our racing efforts.
              </p>
            </div>
          </div>
        </div>

        {/* Media Kit & Contact */}
        <div className="bg-gray-900/30 rounded-lg p-8 border border-gray-800 text-center">
          <h2 className="font-heading text-2xl text-rr-white mb-4">Media Kit & Press</h2>
          <p className="text-gray-300 mb-6">
            Need team information, photos, or want to feature Rocky Racing? 
            Download our media kit or get in touch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-rr-gold text-rr-black px-6 py-3 rounded-lg font-semibold hover:bg-rr-gold/90 transition-colors duration-200">
              Download Media Kit (Coming Soon)
            </button>
            <a 
              href="mailto:max@rockyracing13.com"
              className="bg-transparent border-2 border-rr-gold text-rr-gold px-6 py-3 rounded-lg font-semibold hover:bg-rr-gold hover:text-rr-black transition-all duration-200"
            >
              Contact Team
            </a>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            All media inquiries are handled by parent-supervised communications
          </p>
        </div>
      </div>
    </div>
  )
}