import { Metadata } from 'next'
import { Users, Heart, Trophy, Target } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Rocky Racing - Our Story & Mission',
  description: 'Learn about the father-son team behind Rocky Racing, our gecko mascot Rocky, and the values that drive our journey from sim to reality.',
}

export default function About() {
  const values = [
    {
      icon: Trophy,
      title: 'Sportsmanship',
      description: 'Racing clean and fair, respecting competitors and the spirit of motorsports.'
    },
    {
      icon: Heart,
      title: 'Transparency',
      description: 'Open about our journey, finances, and challenges. Building trust with our community.'
    },
    {
      icon: Users,
      title: 'Inclusion',
      description: 'Welcoming everyone to our community regardless of experience or background.'
    },
    {
      icon: Target,
      title: 'Growth',
      description: 'Constantly learning, improving, and sharing knowledge with others.'
    }
  ]

  const photos = [
    { src: '/photos/max-racing-1.jpg', alt: 'Max at his racing setup', caption: 'Max focused during an IMSA race' },
    { src: '/photos/father-son-1.jpg', alt: 'Father and son working on setup', caption: 'Working together on car setups' },
    { src: '/photos/rocky-mascot.jpg', alt: 'Rocky the gecko mascot', caption: 'Rocky, our gecko mascot and good luck charm' },
    { src: '/photos/podium-celebration.jpg', alt: 'Celebrating first podium', caption: 'Celebrating our first podium finish' },
  ]

  return (
    <div className="min-h-screen bg-rr-black text-rr-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rr-black via-gray-900 to-rr-black py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-heading text-5xl lg:text-6xl text-rr-white mb-6">
              Our Story
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From a shared passion for racing to building a community around clean, competitive sim racing
            </p>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-16 bg-gray-950">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl text-rr-gold mb-6">Father-Son Racing Team</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Rocky Racing began as a father-son passion project in early 2024. What started as weekend 
                  racing sessions quickly evolved into something bigger when we realized we could share our 
                  journey with the racing community.
                </p>
                <p>
                  At just 13 years old, Max shows incredible dedication to improving his craft. From studying 
                  telemetry data to perfecting racing lines, he approaches sim racing with the same seriousness 
                  as professional drivers.
                </p>
                <p>
                  As his dad and team manager, I handle the business side while providing guidance and support. 
                  Together, we&apos;re building something special - a transparent, community-focused racing team 
                  that values clean competition above all else.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-rr-gold/10 to-rr-black border border-rr-gold/30 rounded-lg p-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-rr-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-rr-black font-heading text-2xl">MAX</span>
                </div>
                <h3 className="font-heading text-xl text-rr-white mb-2">Max, Age 13</h3>
                <p className="text-gray-400 text-sm mb-4">Driver & Content Creator</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">iRating:</span>
                    <span className="text-rr-gold">~2100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Favorite Car:</span>
                    <span className="text-rr-white">Porsche 992 GT3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Favorite Track:</span>
                    <span className="text-rr-white">Spa-Francorchamps</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rocky the Mascot */}
      <section className="py-16 bg-rr-black">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-green-900/20 to-rr-black/20 rounded-lg p-8 border border-green-700/30">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-2xl">🦎</span>
            </div>
            <h2 className="font-heading text-3xl text-rr-gold mb-4">Meet Rocky</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Every great racing team needs a mascot, and ours is Rocky the gecko! This little guy has been 
              our good luck charm since the beginning. Whether perched on Max&apos;s monitor during races or 
              featured in our content, Rocky represents the fun, approachable side of our serious racing efforts. 
              He&apos;s even inspired our team colors - that distinctive gold matches his beautiful scales!
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl text-rr-white mb-4">Our Values</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              These principles guide everything we do, from how we race to how we interact with our community.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-gray-900/50 rounded-lg p-6 text-center border border-gray-800 hover:border-rr-gold/30 transition-colors duration-200">
                <value.icon size={48} className="text-rr-gold mx-auto mb-4" />
                <h3 className="font-heading text-xl text-rr-white mb-3">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-16 bg-rr-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl text-rr-white mb-4">Behind the Scenes</h2>
            <p className="text-gray-300">
              A glimpse into our racing life and the moments that make this journey special.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {photos.map((photo, index) => (
              <div key={index} className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-rr-gold/30 transition-colors duration-200">
                <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="w-16 h-16 bg-rr-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-rr-gold text-2xl">📸</span>
                    </div>
                    <p className="text-gray-400 text-sm">Photo placeholder</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-rr-white text-sm font-medium">{photo.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parent Supervision Note */}
      <section className="py-12 bg-gray-900/50 border-t border-gray-800">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-6">
            <h3 className="font-heading text-lg text-blue-400 mb-2">Parent-Supervised Communications</h3>
            <p className="text-gray-300 text-sm">
              All communications, content creation, and business activities are supervised and managed by Max&apos;s 
              parents. We maintain a safe, educational environment while pursuing our racing goals. For business 
              inquiries or partnerships, please contact max@rockyracing13.com.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}