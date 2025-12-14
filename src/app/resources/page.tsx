import { Metadata } from 'next'
import Link from 'next/link'
import { Calculator, BarChart3, BookOpen, Wrench, ExternalLink, Gauge, Target, Clock, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Resources - Rocky Racing',
  description: 'Racing tools and resources for sim racers. Strategy calculator, telemetry coach, and more.',
}

const tools = [
  {
    name: 'Race Strategy Calculator',
    description: 'Plan your endurance race strategy with precision. Calculate optimal stint lengths, pit windows, fuel loads, and driver rotations.',
    href: 'https://strategy.rockyracing13.com',
    icon: Calculator,
    features: [
      'Multi-driver stint planning',
      'Fuel window calculations',
      'Caution strategy recommendations',
      'What-if scenario analysis',
    ],
    color: 'gold',
  },
  {
    name: 'Telemetry Coach',
    description: 'AI-powered telemetry analysis to improve your driving. Compare laps, identify braking points, and get personalized tips.',
    href: 'https://telemetry.rockyracing13.com',
    icon: BarChart3,
    features: [
      'Lap comparison tools',
      'Sector-by-sector analysis',
      'Driving improvement tips',
      'iRacing data integration',
    ],
    color: 'blue',
  },
]

const discordCommands = [
  {
    command: '/strategy plan',
    description: 'Generate a complete race strategy with stint breakdowns',
    icon: Target,
  },
  {
    command: '/strategy pit',
    description: 'Get real-time pit window recommendations',
    icon: Gauge,
  },
  {
    command: '/strategy caution',
    description: 'Caution period decision support - pit or stay out?',
    icon: Clock,
  },
  {
    command: '/telemetry tips',
    description: 'Get driving improvement tips for any track or situation',
    icon: TrendingUp,
  },
]

function ToolCard({ tool }: { tool: typeof tools[0] }) {
  const Icon = tool.icon
  const colorClasses = {
    gold: 'bg-rr-gold/10 text-rr-gold border-rr-gold/30 hover:border-rr-gold/60',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/30 hover:border-blue-500/60',
  }

  return (
    <a
      href={tool.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`block bg-rr-gray-900 rounded-xl border ${colorClasses[tool.color as keyof typeof colorClasses]} p-6 transition-all hover:shadow-lg group`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg ${tool.color === 'gold' ? 'bg-rr-gold/20' : 'bg-blue-500/20'} flex items-center justify-center`}>
          <Icon size={24} className={tool.color === 'gold' ? 'text-rr-gold' : 'text-blue-400'} />
        </div>
        <ExternalLink size={20} className="text-rr-gray-500 group-hover:text-rr-white transition-colors" />
      </div>

      <h3 className="font-heading text-xl text-rr-white mb-2 group-hover:text-rr-gold transition-colors">
        {tool.name}
      </h3>
      <p className="text-rr-gray-400 text-sm mb-4">
        {tool.description}
      </p>

      <div className="border-t border-rr-gray-800 pt-4">
        <h4 className="text-xs uppercase tracking-wide text-rr-gray-500 mb-2">Features</h4>
        <ul className="space-y-1">
          {tool.features.map((feature, index) => (
            <li key={index} className="text-sm text-rr-gray-300 flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${tool.color === 'gold' ? 'bg-rr-gold' : 'bg-blue-400'}`} />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 pt-4 border-t border-rr-gray-800">
        <span className={`inline-flex items-center gap-2 text-sm font-medium ${tool.color === 'gold' ? 'text-rr-gold' : 'text-blue-400'}`}>
          Open Tool
          <ExternalLink size={14} />
        </span>
      </div>
    </a>
  )
}

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-rr-black">
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-rr-gray-900">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center gap-3 justify-center mb-4">
            <Wrench size={32} className="text-rr-gold" />
            <h1 className="font-heading text-4xl md:text-5xl text-rr-gold">
              RESOURCES
            </h1>
          </div>
          <p className="text-rr-gray-400 max-w-2xl mx-auto">
            Tools and resources to help you become a better sim racer. From race strategy planning to telemetry analysis.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-12 bg-rr-black">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-heading text-2xl text-rr-white mb-8">
            RACING TOOLS
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {tools.map((tool) => (
              <ToolCard key={tool.name} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Discord Commands Section */}
      <section className="py-12 bg-rr-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen size={24} className="text-rr-gold" />
            <h2 className="font-heading text-2xl text-rr-white">
              DISCORD BOT COMMANDS
            </h2>
          </div>
          <p className="text-rr-gray-400 mb-8">
            These tools are also available directly in Discord through our bot. Team members can use these commands in the server.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {discordCommands.map((cmd) => {
              const Icon = cmd.icon
              return (
                <div
                  key={cmd.command}
                  className="bg-rr-black rounded-lg border border-rr-gray-700 p-4 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-rr-gold/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-rr-gold" />
                  </div>
                  <div>
                    <code className="text-rr-gold font-mono text-sm bg-rr-gray-900 px-2 py-1 rounded">
                      {cmd.command}
                    </code>
                    <p className="text-rr-gray-400 text-sm mt-2">
                      {cmd.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-12 bg-rr-black">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-heading text-2xl text-rr-white mb-8">
            COMING SOON
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Setup Library', description: 'Shared car setups for popular series' },
              { name: 'Track Guides', description: 'Video guides and notes for iRacing tracks' },
              { name: 'Livery Templates', description: 'Rocky Racing livery templates for team cars' },
            ].map((item) => (
              <div
                key={item.name}
                className="bg-rr-gray-900 rounded-xl border border-rr-gray-700 border-dashed p-6 text-center opacity-60"
              >
                <h3 className="font-heading text-lg text-rr-white mb-2">{item.name}</h3>
                <p className="text-rr-gray-500 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-rr-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl text-rr-white mb-4">
            WANT ACCESS TO ALL TOOLS?
          </h2>
          <p className="text-rr-gray-400 mb-6">
            Join the Rocky Racing team to get full access to all our racing resources and tools.
          </p>
          <Link
            href="/join"
            className="inline-flex items-center justify-center gap-2 bg-rr-gold text-rr-black px-6 py-3 rounded-lg font-semibold hover:bg-rr-gold/90 transition-colors"
          >
            Join the Team
          </Link>
        </div>
      </section>
    </div>
  )
}
