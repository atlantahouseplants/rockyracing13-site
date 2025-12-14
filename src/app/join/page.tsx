import { Metadata } from 'next'
import { Users, Trophy, Target, Calendar, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { RecruitmentForm } from '@/components/live-data'

export const metadata: Metadata = {
  title: 'Join Rocky Racing - Apply to Race With Us',
  description: 'Apply to join Rocky Racing team. We are looking for dedicated sim racers for endurance racing events on iRacing.',
}

export default function JoinPage() {
  const benefits = [
    {
      icon: Trophy,
      title: 'Competitive Racing',
      description: 'Race in organized endurance events with strategy and teamwork.',
    },
    {
      icon: Users,
      title: 'Team Environment',
      description: 'Join a supportive community focused on improvement and fun.',
    },
    {
      icon: Target,
      title: 'Skill Development',
      description: 'Access to coaching, telemetry analysis, and race strategy tools.',
    },
    {
      icon: Calendar,
      title: 'Regular Events',
      description: 'Scheduled practice sessions and races throughout the week.',
    },
  ]

  const requirements = [
    'Active iRacing subscription',
    'Discord account for team communication',
    'Commitment to clean, respectful racing',
    'Availability for team events',
    'Positive attitude and willingness to learn',
  ]

  return (
    <div className="min-h-screen bg-rr-black">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-rr-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-heading text-5xl md:text-6xl text-rr-gold mb-4">
            JOIN THE TEAM
          </h1>
          <p className="text-xl text-rr-gray-400 mb-8 max-w-2xl mx-auto">
            Ready to take your sim racing to the next level? Join Rocky Racing and compete
            in endurance events with a dedicated team.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-rr-black">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-heading text-2xl text-rr-white text-center mb-8">
            WHY JOIN ROCKY RACING?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-rr-gray-900 rounded-xl p-6 border border-rr-gray-700 hover:border-rr-gold/30 transition-colors"
              >
                <benefit.icon size={32} className="text-rr-gold mb-4" />
                <h3 className="font-heading text-lg text-rr-white mb-2">{benefit.title}</h3>
                <p className="text-rr-gray-400 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements + Form Section */}
      <section className="py-12 bg-rr-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Requirements */}
            <div>
              <h2 className="font-heading text-2xl text-rr-white mb-6">
                WHAT WE&apos;RE LOOKING FOR
              </h2>
              <div className="bg-rr-black rounded-xl p-6 border border-rr-gray-700">
                <ul className="space-y-4">
                  {requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-rr-success flex-shrink-0 mt-0.5" />
                      <span className="text-rr-gray-300">{req}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-6 border-t border-rr-gray-800">
                  <h3 className="font-heading text-lg text-rr-gold mb-3">NOTE</h3>
                  <p className="text-rr-gray-400 text-sm">
                    We welcome drivers of all skill levels! Whether you&apos;re just starting out
                    or have years of experience, we value dedication and teamwork over raw pace.
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-rr-black rounded-xl p-6 border border-rr-gray-700">
                <h3 className="font-heading text-lg text-rr-gold mb-3">QUESTIONS?</h3>
                <p className="text-rr-gray-400 text-sm mb-4">
                  Have questions before applying? Reach out to us!
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-rr-gold hover:text-rr-gold/80 font-medium transition-colors"
                >
                  Contact Us →
                </Link>
              </div>
            </div>

            {/* Application Form */}
            <div>
              <h2 className="font-heading text-2xl text-rr-white mb-6">
                APPLY NOW
              </h2>
              <RecruitmentForm />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-rr-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-rr-gray-900 rounded-xl p-8 border border-rr-gray-700">
            <h2 className="font-heading text-2xl text-rr-white mb-4">
              ALREADY A MEMBER?
            </h2>
            <p className="text-rr-gray-400 mb-6">
              Check out our schedule and upcoming races.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/schedule"
                className="inline-flex items-center justify-center gap-2 bg-rr-gold text-rr-black px-6 py-3 rounded-lg font-semibold hover:bg-rr-gold/90 transition-colors"
              >
                <Calendar size={20} />
                View Schedule
              </Link>
              <Link
                href="/team"
                className="inline-flex items-center justify-center gap-2 border-2 border-rr-gold text-rr-gold px-6 py-3 rounded-lg font-semibold hover:bg-rr-gold hover:text-rr-black transition-colors"
              >
                <Users size={20} />
                Meet the Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
