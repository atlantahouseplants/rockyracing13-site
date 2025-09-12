import Link from 'next/link'
import { Play, Heart, MessageSquare, TrendingUp, Trophy, Users } from 'lucide-react'
import ProgressBar from '@/components/ProgressBar'

export default function Home() {
  const progress = {
    goalAmount: 2500,
    raisedAmount: 750,
    lastUpdated: "2025-09-11",
    label: "Next Sim Rig Upgrade"
  }

  const missionTiles = [
    {
      icon: Trophy,
      title: "Compete",
      description: "Racing in top iRacing series with clean, consistent performance",
      color: "text-rr-gold"
    },
    {
      icon: TrendingUp,
      title: "Learn",
      description: "Sharing insights, setups, and racing knowledge with the community",
      color: "text-blue-400"
    },
    {
      icon: Users,
      title: "Community",
      description: "Building a supportive community around sim racing and motorsports",
      color: "text-green-400"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rr-black via-gray-900 to-rr-black py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Rocky Racing Logo */}
            <div className="mb-8">
              <img 
                src="/rocky-racing-logo-bw.png" 
                alt="Rocky Racing Logo" 
                className="mx-auto h-24 sm:h-32 lg:h-40 w-auto filter brightness-0 invert opacity-90 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl text-rr-white mb-6">
              Rocky Racing
            </h1>
            <p className="font-heading text-2xl sm:text-3xl text-rr-gold mb-4">
              Black & Gold. From Sim to Reality.
            </p>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Dream big. Drive clean. Get faster — one lap at a time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://youtube.com/@rockyracing13"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-rr-gold text-rr-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-rr-gold/90 transition-colors duration-200"
              >
                <Play size={20} />
                Watch Highlights
              </a>
              <Link
                href="/support"
                className="inline-flex items-center gap-2 bg-transparent border-2 border-rr-gold text-rr-gold px-8 py-4 rounded-lg text-lg font-semibold hover:bg-rr-gold hover:text-rr-black transition-all duration-200"
              >
                <Heart size={20} />
                Support the Journey
              </Link>
              <Link
                href="#"
                className="inline-flex items-center gap-2 bg-transparent border-2 border-rr-white text-rr-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-rr-white hover:text-rr-black transition-all duration-200"
              >
                <MessageSquare size={20} />
                Join Discord
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Content Section */}
      <section className="py-16 bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Intro Video */}
            <div>
              <h2 className="font-heading text-3xl text-rr-white mb-6">Welcome to Rocky Racing</h2>
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <div className="aspect-video relative">
                  <video 
                    className="w-full h-full object-cover"
                    controls
                    poster="/logos/rocky-logo-1.svg"
                    preload="metadata"
                  >
                    <source src="/intro-video.mp4" type="video/mp4" />
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                      <div className="text-center">
                        <Play size={48} className="text-rr-gold mx-auto mb-4" />
                        <p className="text-gray-300">Your browser does not support the video tag</p>
                      </div>
                    </div>
                  </video>
                </div>
                <div className="p-4">
                  <h3 className="text-rr-white font-semibold text-lg">Rocky Racing - From Sim to Reality</h3>
                  <p className="text-gray-400 mt-2">Get to know our team and mission in this introduction video</p>
                  <div className="mt-3 flex items-center gap-4">
                    <a 
                      href="https://youtube.com/@rockyracing13" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-rr-gold hover:text-rr-gold/80 transition-colors duration-200"
                    >
                      <Play size={16} />
                      Watch on YouTube
                    </a>
                    <span className="text-gray-500 text-sm">•</span>
                    <span className="text-gray-500 text-sm">Subscribe for race highlights & updates</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Latest Result */}
            <div>
              <h2 className="font-heading text-3xl text-rr-white mb-6">Latest Result</h2>
              <div className="bg-gradient-to-br from-rr-gold/10 to-rr-black border border-rr-gold/30 rounded-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-rr-gold text-rr-black w-12 h-12 rounded-full flex items-center justify-center font-heading text-xl">
                    P5
                  </div>
                  <div>
                    <h3 className="text-rr-white font-semibold text-lg">Watkins Glen</h3>
                    <p className="text-gray-300">IMSA Pilot Challenge</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Car:</span>
                    <span className="text-rr-white">Porsche 718 Cayman GT4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Incidents:</span>
                    <span className="text-green-400">0x</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className="text-rr-gold">Podium</span>
                  </div>
                </div>
                <p className="text-gray-300 mt-4 text-sm">Clean race - personal best at the Glen</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-rr-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-4xl text-rr-white text-center mb-12">Our Mission</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {missionTiles.map((tile, index) => (
              <div key={index} className="bg-gray-900/50 rounded-lg p-6 text-center border border-gray-800 hover:border-rr-gold/30 transition-colors duration-200">
                <tile.icon size={48} className={`${tile.color} mx-auto mb-4`} />
                <h3 className="font-heading text-xl text-rr-white mb-3">{tile.title}</h3>
                <p className="text-gray-400">{tile.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Progress Section */}
      <section className="py-16 bg-gradient-to-br from-gray-950 to-rr-black">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl text-rr-white mb-4">Current Goal</h2>
            <p className="text-gray-300">
              Help us upgrade our sim rig for better performance and content creation
            </p>
          </div>
          <ProgressBar progress={progress} />
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-12 bg-gray-900/30 border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-500 text-sm mb-6">Proudly Supported By</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {/* Sponsor placeholders */}
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-700 rounded-lg px-6 py-3">
                  <span className="text-gray-400 text-sm">Sponsor {i}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-600 text-xs mt-4">
              Sponsor placeholders - partnerships coming soon
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}