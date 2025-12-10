import { Metadata } from 'next'
import { Users, Youtube, Mail, Download, Trophy, Heart, Target, Play } from 'lucide-react'
import Link from 'next/link'
import { getDriverData } from '@/lib/iracing'

export const metadata: Metadata = {
  title: 'The Team - Rocky Racing',
  description: 'Meet the Rocky Racing team - Max Wall (13-year-old driver), his dad (team manager), and Rocky the Gecko mascot. A father-son racing journey from sim to reality.',
}

export default async function Team() {
  const driverData = await getDriverData()
  const { overview, career, latestRace, latestPodium } = driverData

  const iratingDisplay = overview?.irating !== null && overview?.irating !== undefined
    ? Math.round(overview.irating).toLocaleString()
    : '~2100'

  const safetyRatingDisplay = overview?.safetyRating !== null && overview?.safetyRating !== undefined
    ? overview.safetyRating >= 4.0 ? 'A+' : overview.safetyRating >= 3.0 ? 'B+' : 'C+'
    : 'A+'

  const podiumDisplay = career?.podiums !== null && career?.podiums !== undefined
    ? career.podiums.toString()
    : '3+'

  const winsDisplay = career?.wins !== null && career?.wins !== undefined
    ? career.wins.toString()
    : '1'

  const latestResult = latestPodium || latestRace

  const values = [
    {
      icon: Trophy,
      title: 'Sportsmanship',
      description: 'Racing clean and fair, respecting competitors and the spirit of motorsports.',
    },
    {
      icon: Heart,
      title: 'Transparency',
      description: 'Open about our journey, finances, and challenges. Building trust with our community.',
    },
    {
      icon: Users,
      title: 'Inclusion',
      description: 'Welcoming everyone to our community regardless of experience or background.',
    },
    {
      icon: Target,
      title: 'Growth',
      description: 'Constantly learning, improving, and sharing knowledge with others.',
    }
  ]

  return (
    <div className="min-h-screen bg-rr-black">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="/max-at-racetrack-portrait.jpg"
            alt="Max at Racing Track"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-rr-black/85 via-rr-black/75 to-rr-black"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-rr-gold mb-4">
            THE TEAM
          </h1>
          <p className="text-xl md:text-2xl text-rr-white mb-8">
            A father-son racing journey from sim to reality
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://youtube.com/@rockyracing13"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              <Youtube size={20} />
              Watch Us Race
            </a>
            <Link
              href="/support"
              className="inline-flex items-center gap-3 border-2 border-rr-gold text-rr-gold px-6 py-3 rounded-lg font-semibold hover:bg-rr-gold hover:text-rr-black transition-colors"
            >
              <Heart size={20} />
              Support Us
            </Link>
          </div>
        </div>
      </section>

      {/* Max - The Driver */}
      <section className="py-16 md:py-24 bg-rr-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-heading text-4xl text-rr-gold text-center mb-12">
            THE DRIVER
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Profile Card */}
            <div className="bg-rr-black rounded-xl p-8 border border-rr-gray-700">
              <div className="text-center mb-6">
                <img
                  src="/Max by bmw gpt.jpg"
                  alt="Max Wall - Rocky Racing Driver"
                  className="w-36 h-36 rounded-full object-cover border-4 border-rr-gold mx-auto mb-4"
                />
                <h3 className="font-heading text-3xl text-rr-white mb-2">MAX WALL</h3>
                <p className="text-rr-gold font-semibold mb-4">Age 13 - Lead Driver & Content Creator</p>
              </div>

              <p className="text-rr-gray-400 text-center mb-6">
                At just 13 years old, Max brings natural talent and unwavering dedication to every race.
                From analyzing telemetry data to perfecting racing lines, he approaches sim racing
                with the intensity of a professional driver.
              </p>

              <div className="flex justify-center gap-2 flex-wrap">
                <span className="bg-rr-success/20 text-rr-success px-3 py-1 rounded-full text-sm font-medium">Clean Racer</span>
                <span className="bg-rr-accent/20 text-rr-accent px-3 py-1 rounded-full text-sm font-medium">Content Creator</span>
                <span className="bg-rr-gold/20 text-rr-gold px-3 py-1 rounded-full text-sm font-medium">Rising Star</span>
              </div>
            </div>

            {/* Stats & Achievements */}
            <div className="space-y-6">
              {/* Racing Stats */}
              <div className="bg-rr-black rounded-xl p-6 border border-rr-gray-700">
                <h3 className="font-heading text-xl text-rr-gold mb-4">Racing Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-rr-gray-900 rounded-lg p-4 text-center">
                    <div className="text-rr-gray-400 text-sm">iRating</div>
                    <div className="text-rr-white text-2xl font-bold">{iratingDisplay}</div>
                  </div>
                  <div className="bg-rr-gray-900 rounded-lg p-4 text-center">
                    <div className="text-rr-gray-400 text-sm">Safety</div>
                    <div className="text-rr-white text-2xl font-bold">{safetyRatingDisplay}</div>
                  </div>
                  <div className="bg-rr-gray-900 rounded-lg p-4 text-center">
                    <div className="text-rr-gray-400 text-sm">Podiums</div>
                    <div className="text-rr-white text-2xl font-bold">{podiumDisplay}</div>
                  </div>
                  <div className="bg-rr-gray-900 rounded-lg p-4 text-center">
                    <div className="text-rr-gray-400 text-sm">Wins</div>
                    <div className="text-rr-white text-2xl font-bold">{winsDisplay}</div>
                  </div>
                </div>
              </div>

              {/* Recent Achievement */}
              <div className="bg-rr-black rounded-xl p-6 border border-rr-gray-700">
                <h3 className="font-heading text-xl text-rr-gold mb-4">Recent Achievement</h3>
                {latestResult ? (
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-lg flex items-center justify-center font-heading text-xl ${
                      latestPodium ? 'bg-rr-gold text-rr-black' : 'bg-rr-gray-800 text-rr-white'
                    }`}>
                      P{latestResult.finishPosition}
                    </div>
                    <div>
                      <p className="text-rr-white font-medium">{latestResult.trackName || 'Recent Race'}</p>
                      <p className="text-rr-gray-400 text-sm">{latestResult.seriesName}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-rr-gray-400">Check back for recent race results</p>
                )}
              </div>

              {/* Favorite Setup */}
              <div className="bg-rr-black rounded-xl p-6 border border-rr-gray-700">
                <h3 className="font-heading text-xl text-rr-gold mb-4">Favorite Setup</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-rr-gray-400">Car</span>
                    <span className="text-rr-white font-medium">Porsche 992 GT3 Cup</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-rr-gray-400">Track</span>
                    <span className="text-rr-white font-medium">Spa-Francorchamps</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-rr-gray-400">Series</span>
                    <span className="text-rr-white font-medium">IMSA Pilot Challenge</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Crew */}
      <section className="py-16 md:py-24 bg-rr-black">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-heading text-4xl text-rr-gold text-center mb-4">
            THE SUPPORT CREW
          </h2>
          <p className="text-rr-gray-400 text-center mb-12">
            Every champion needs a great team behind them
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Dad - Team Manager */}
            <div className="bg-rr-gray-900 rounded-xl p-8 border border-rr-gray-700">
              <div className="text-center">
                <div className="w-20 h-20 bg-rr-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users size={36} className="text-rr-accent" />
                </div>
                <h3 className="font-heading text-2xl text-rr-white mb-2">Dad & Team Manager</h3>
                <p className="text-rr-accent font-medium mb-4">The Strategic Mind</p>
                <p className="text-rr-gray-400">
                  Handles all business operations, content strategy, and provides guidance.
                  All communications are parent-supervised for safety and professionalism.
                </p>
              </div>
            </div>

            {/* Rocky - Mascot */}
            <div className="bg-rr-gray-900 rounded-xl p-8 border border-rr-gray-700">
              <div className="text-center">
                <img
                  src="/rocky-gecko.jpg"
                  alt="Rocky the Gecko"
                  className="w-20 h-20 rounded-full object-cover border-2 border-rr-success mx-auto mb-4"
                />
                <h3 className="font-heading text-2xl text-rr-white mb-2">Rocky the Gecko</h3>
                <p className="text-rr-success font-medium mb-4">Team Mascot & Good Luck Charm</p>
                <p className="text-rr-gray-400">
                  Our legendary mascot and the heart of the team! Rocky has been present
                  for every podium finish. Those distinctive gold scales even inspired our team colors!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Racing Code / Values */}
      <section className="py-16 md:py-24 bg-rr-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl text-rr-gold mb-4">
              OUR RACING CODE
            </h2>
            <p className="text-rr-gray-400 max-w-2xl mx-auto">
              The principles that drive every lap, every race, every victory.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-rr-black rounded-xl p-6 border border-rr-gray-700 hover:border-rr-gold/50 transition-colors">
                <value.icon size={36} className="text-rr-gold mb-4" />
                <h3 className="font-heading text-xl text-rr-white mb-2">{value.title}</h3>
                <p className="text-rr-gray-400 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 md:py-24 bg-rr-black">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl text-rr-gold mb-4">
              THE RACING JOURNEY
            </h2>
            <p className="text-rr-gray-400">
              From simulators to real tracks - building experience every day.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src="/max-with-chevrolet-motorsports-car.jpg"
                alt="Max at Chevrolet Motorsports Event"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src="/max-racing-helmet-portrait.jpg"
                alt="Max in Racing Helmet"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src="/max-in-simulator-racing-2.jpg"
                alt="Max Sim Racing"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src="/max-in-race-car-smiling.jpg"
                alt="Max in Race Car"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src="/max-in-open-wheel-car.jpg"
                alt="Max in Open Wheel Car"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src="/max-at-racetrack-portrait-2.jpg"
                alt="Max at Racetrack"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          <div className="text-center mt-12">
            <a
              href="https://youtube.com/@rockyracing13"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              <Play size={20} />
              Watch More on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* Media & Press */}
      <section className="py-16 md:py-24 bg-rr-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl text-rr-gold mb-4">
            MEDIA & PRESS
          </h2>
          <p className="text-rr-gray-400 mb-8">
            Want to feature Rocky Racing? We&apos;ve got you covered.
          </p>

          <div className="bg-rr-black rounded-xl p-8 border border-rr-gray-700">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-left">
                <h3 className="font-heading text-xl text-rr-gold mb-4">Media Kit Includes</h3>
                <ul className="space-y-2 text-rr-gray-400">
                  <li className="flex items-center gap-3">
                    <span className="text-rr-success">✓</span>
                    High-resolution team photos
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-rr-success">✓</span>
                    Rocky Racing logos & branding
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-rr-success">✓</span>
                    Racing statistics & achievements
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-rr-success">✓</span>
                    Team biography & story
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <button
                  className="w-full bg-rr-gold text-rr-black px-6 py-4 rounded-lg font-semibold opacity-50 cursor-not-allowed flex items-center justify-center gap-2"
                  disabled
                >
                  <Download size={20} />
                  Media Kit (Coming Soon)
                </button>

                <a
                  href="mailto:max@rockyracing13.com"
                  className="w-full bg-rr-success text-white px-6 py-4 rounded-lg font-semibold hover:bg-rr-success/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Mail size={20} />
                  Contact Team Rocky
                </a>

                <p className="text-rr-gray-500 text-sm">
                  For partnerships, sponsorships, or press inquiries
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parent Supervision Notice */}
      <section className="py-12 bg-rr-black border-t border-rr-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-rr-gray-900 rounded-xl p-6 border border-rr-gray-700">
            <h3 className="font-heading text-lg text-rr-accent mb-2">
              Parent-Supervised Operations
            </h3>
            <p className="text-rr-gray-400 text-sm">
              All team communications, content creation, and business activities are supervised
              and managed by Max&apos;s parents. We maintain a safe, educational environment while
              pursuing our racing goals. For all business inquiries, please contact{' '}
              <a href="mailto:max@rockyracing13.com" className="text-rr-gold hover:underline">
                max@rockyracing13.com
              </a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
