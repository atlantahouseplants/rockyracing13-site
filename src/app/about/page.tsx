import { Metadata } from 'next'
import { Users, Heart, Trophy, Target, Play } from 'lucide-react'
import Link from 'next/link'
import { getDriverData } from '@/lib/iracing'

export const metadata: Metadata = {
  title: 'About Rocky Racing - Our Story & Mission',
  description: 'Learn about the father-son team behind Rocky Racing, our gecko mascot Rocky, and the values that drive our journey from sim to reality.',
}

export default async function About() {
  const driverData = await getDriverData()
  const { overview, career } = driverData

  const iratingDisplay = overview?.irating !== null && overview?.irating !== undefined
    ? Math.round(overview.irating).toLocaleString()
    : '~2100'

  const safetyRatingDisplay = overview?.safetyRating !== null && overview?.safetyRating !== undefined
    ? overview.safetyRating >= 4.0 ? 'A+' : overview.safetyRating >= 3.0 ? 'B+' : 'C+'
    : 'B+'

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
          <div className="absolute inset-0 bg-gradient-to-b from-rr-black/80 via-rr-black/70 to-rr-black"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-rr-gold mb-4">
            OUR STORY
          </h1>
          <p className="text-xl md:text-2xl text-rr-white/90 mb-8">
            A father-son racing journey from sim to reality
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/team"
              className="inline-flex items-center gap-3 bg-rr-gold text-rr-black px-6 py-3 rounded-lg font-semibold hover:bg-rr-gold/90 transition-colors"
            >
              <Users size={20} />
              Meet the Team
            </Link>
            <Link
              href="/watch"
              className="inline-flex items-center gap-3 border-2 border-rr-gold text-rr-gold px-6 py-3 rounded-lg font-semibold hover:bg-rr-gold hover:text-rr-black transition-colors"
            >
              <Play size={20} />
              Watch Races
            </Link>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-16 md:py-24 bg-rr-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Story Content */}
            <div>
              <h2 className="font-heading text-3xl md:text-4xl text-rr-gold mb-6">
                THE RACING DYNASTY BEGINS
              </h2>
              <div className="space-y-4 text-rr-gray-300 text-lg">
                <p>
                  <span className="text-rr-gold font-semibold">Rocky Racing</span> started in early 2024 as a
                  father-son passion project that quickly became something extraordinary. What started as weekend
                  racing sessions evolved into a community-focused racing team.
                </p>
                <p>
                  At just <span className="text-rr-white font-semibold">13 years old</span>, Max approaches sim racing with the intensity
                  of a professional driver. From analyzing telemetry data to perfecting racing lines,
                  he&apos;s already showing the dedication that builds champions.
                </p>
                <p>
                  As team manager and dad, I handle the business operations while providing guidance and support.
                  Together, we&apos;re building something special - a transparent, community-focused racing team that
                  values clean competition above everything else.
                </p>
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-rr-black rounded-xl p-4 border border-rr-gray-700">
                  <div className="text-rr-gray-400 text-sm">iRating</div>
                  <div className="text-rr-white text-2xl font-bold">{iratingDisplay}</div>
                </div>
                <div className="bg-rr-black rounded-xl p-4 border border-rr-gray-700">
                  <div className="text-rr-gray-400 text-sm">Safety Rating</div>
                  <div className="text-rr-white text-2xl font-bold">{safetyRatingDisplay}</div>
                </div>
              </div>
            </div>

            {/* Profile Card */}
            <div className="bg-rr-black rounded-xl p-8 border border-rr-gray-700">
              <div className="text-center">
                <img
                  src="/Max by bmw gpt.jpg"
                  alt="Max Wall - Rocky Racing Driver"
                  className="w-32 h-32 rounded-full object-cover border-4 border-rr-gold mx-auto mb-4"
                />
                <h3 className="font-heading text-2xl text-rr-white mb-2">MAX WALL</h3>
                <p className="text-rr-gold font-semibold mb-4">Age 13 - Driver & Content Creator</p>

                <div className="space-y-3 text-left">
                  <div className="flex justify-between items-center bg-rr-gray-900 rounded-lg p-3">
                    <span className="text-rr-gray-400">iRating</span>
                    <span className="text-rr-white font-semibold">{iratingDisplay}</span>
                  </div>
                  <div className="flex justify-between items-center bg-rr-gray-900 rounded-lg p-3">
                    <span className="text-rr-gray-400">Favorite Car</span>
                    <span className="text-rr-white font-semibold">Porsche GT3</span>
                  </div>
                  <div className="flex justify-between items-center bg-rr-gray-900 rounded-lg p-3">
                    <span className="text-rr-gray-400">Favorite Track</span>
                    <span className="text-rr-white font-semibold">Spa-Francorchamps</span>
                  </div>
                </div>

                <div className="mt-6 flex justify-center gap-2 flex-wrap">
                  <span className="bg-rr-success/20 text-rr-success px-3 py-1 rounded-full text-sm font-medium">Clean Racer</span>
                  <span className="bg-rr-accent/20 text-rr-accent px-3 py-1 rounded-full text-sm font-medium">Content Creator</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rocky the Mascot */}
      <section className="py-16 md:py-24 bg-rr-black">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-rr-gray-900 rounded-xl p-8 border border-rr-gray-700">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-left">
                <img
                  src="/rocky-gecko.jpg"
                  alt="Rocky the Gecko"
                  className="w-32 h-32 rounded-full object-cover border-4 border-rr-success mx-auto md:mx-0 mb-4"
                />
              </div>
              <div>
                <h2 className="font-heading text-3xl text-rr-white mb-4">Meet Rocky</h2>
                <p className="text-rr-gold font-semibold mb-4">Team Mascot & Good Luck Charm</p>
                <p className="text-rr-gray-400 mb-4">
                  Every legendary racing team needs an epic mascot, and ours is Rocky the Gecko!
                  This little speed demon has been our good luck charm since day one.
                </p>
                <p className="text-rr-gray-400">
                  Whether he&apos;s perched on Max&apos;s monitor during intense races or starring in our content,
                  Rocky represents the fun, approachable side of our serious racing efforts.
                  Those distinctive gold scales even inspired our team colors!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Racing Values */}
      <section className="py-16 md:py-24 bg-rr-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl text-rr-white mb-4">
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

      {/* Photo Gallery - Simplified */}
      <section className="py-16 md:py-24 bg-rr-black">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl text-rr-white mb-4">
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

      {/* Parent Supervision Notice */}
      <section className="py-12 bg-rr-gray-900 border-t border-rr-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-rr-black rounded-xl p-6 border border-rr-gray-700">
            <h3 className="font-heading text-lg text-rr-accent mb-2">
              Parent-Supervised Operations
            </h3>
            <p className="text-rr-gray-400 text-sm">
              All communications, content creation, and business activities are supervised and managed by Max&apos;s
              parents. We maintain a safe, educational environment while pursuing our racing goals.
              For business inquiries or partnerships, contact{' '}
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
