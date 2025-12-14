'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Trophy, Flag, Target, TrendingUp, Calendar, Car, Users } from 'lucide-react'
import { getTeamRaceResults, getTeamStats, TeamRaceResult, TeamStats, formatTeamRaceDate, getPositionEmoji, getPositionColor } from '@/lib/bot-api'

// Loading skeleton
function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-rr-black">
      <section className="py-16 md:py-20 bg-rr-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="animate-pulse h-12 bg-rr-gray-800 rounded w-1/3 mx-auto mb-4" />
          <div className="animate-pulse h-6 bg-rr-gray-800 rounded w-1/2 mx-auto" />
        </div>
      </section>
      <section className="py-8 bg-rr-black">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="animate-pulse h-28 bg-rr-gray-900 rounded-xl" />
            ))}
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse h-32 bg-rr-gray-900 rounded-xl" />
          ))}
        </div>
      </section>
    </div>
  )
}

// Stat card component
function StatCard({ label, value, icon: Icon, color = 'gold' }: {
  label: string
  value: string | number
  icon: React.ElementType
  color?: 'gold' | 'success' | 'blue' | 'purple'
}) {
  const colorClasses: Record<string, { bg: string; text: string }> = {
    gold: { bg: 'bg-rr-gold/10', text: 'text-rr-gold' },
    success: { bg: 'bg-rr-success/10', text: 'text-rr-success' },
    blue: { bg: 'bg-blue-500/10', text: 'text-blue-400' },
    purple: { bg: 'bg-purple-500/10', text: 'text-purple-400' },
  }

  const colors = colorClasses[color]

  return (
    <div className="bg-rr-gray-900 rounded-xl p-5 border border-rr-gray-700">
      <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center mb-3`}>
        <Icon size={20} className={colors.text} />
      </div>
      <div className="text-3xl font-bold text-rr-white mb-1">{value}</div>
      <div className="text-sm text-rr-gray-400">{label}</div>
    </div>
  )
}

// Result card component
function ResultCard({ result }: { result: TeamRaceResult }) {
  const emoji = getPositionEmoji(result.position)
  const isPodium = result.position <= 3
  const isWin = result.position === 1

  return (
    <div className={`bg-rr-gray-900 rounded-xl border overflow-hidden transition-all hover:shadow-lg ${
      isWin ? 'border-rr-gold/50 shadow-rr-gold/10' :
      isPodium ? 'border-rr-success/30' :
      'border-rr-gray-700'
    }`}>
      <div className="p-5">
        <div className="flex items-center gap-4">
          {/* Position Badge */}
          <div className={`text-4xl w-16 h-16 flex items-center justify-center rounded-xl ${
            isWin ? 'bg-rr-gold/20' :
            isPodium ? 'bg-rr-success/20' :
            'bg-rr-gray-800'
          }`}>
            {emoji}
          </div>

          {/* Main Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-2xl font-bold ${
                isWin ? 'text-rr-gold' :
                isPodium ? 'text-rr-success' :
                'text-rr-white'
              }`}>
                P{result.position}
              </span>
              {result.classPosition && result.classPosition !== result.position && (
                <span className="text-sm text-rr-gray-500">
                  (P{result.classPosition} in class)
                </span>
              )}
            </div>
            <h3 className="font-medium text-rr-white">{result.track}</h3>
            <p className="text-sm text-rr-gray-400">{result.series}</p>
          </div>

          {/* Date & iRating */}
          <div className="text-right text-sm">
            <div className="text-rr-gray-400">{formatTeamRaceDate(result.raceDate)}</div>
            {result.iRatingChange !== null && (
              <div className={`font-medium ${
                result.iRatingChange >= 0 ? 'text-rr-success' : 'text-red-400'
              }`}>
                {result.iRatingChange >= 0 ? '+' : ''}{result.iRatingChange} iR
              </div>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-4 grid grid-cols-4 gap-2 text-center text-sm">
          <div className="bg-rr-gray-800/50 rounded p-2">
            <div className="font-medium text-rr-white truncate" title={result.car}>{result.car}</div>
            <div className="text-xs text-rr-gray-500">Car</div>
          </div>
          <div className="bg-rr-gray-800/50 rounded p-2">
            <div className="font-medium text-rr-white">{result.laps || '-'}</div>
            <div className="text-xs text-rr-gray-500">Laps</div>
          </div>
          <div className="bg-rr-gray-800/50 rounded p-2">
            <div className={`font-medium ${
              (result.incidents || 0) === 0 ? 'text-rr-success' :
              (result.incidents || 0) <= 4 ? 'text-rr-warning' :
              'text-red-400'
            }`}>
              {result.incidents || 0}x
            </div>
            <div className="text-xs text-rr-gray-500">Incidents</div>
          </div>
          <div className="bg-rr-gray-800/50 rounded p-2">
            <div className="font-medium text-rr-white">
              {result.strengthOfField?.toLocaleString() || '-'}
            </div>
            <div className="text-xs text-rr-gray-500">SoF</div>
          </div>
        </div>

        {/* Drivers */}
        {result.drivers && result.drivers.length > 0 && (
          <div className="mt-3 pt-3 border-t border-rr-gray-800">
            <div className="flex items-center gap-2">
              <Users size={14} className="text-rr-gray-500" />
              <span className="text-xs text-rr-gray-400">
                {result.drivers.join(', ')}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Empty state
function EmptyState() {
  return (
    <div className="bg-rr-gray-900 rounded-xl p-12 border border-rr-gray-700 text-center">
      <Trophy size={48} className="text-rr-gold mx-auto mb-4 opacity-50" />
      <h3 className="text-xl text-rr-white mb-2 font-heading">No Race Results Yet</h3>
      <p className="text-rr-gray-400 mb-6">
        Results will appear here after our team races.
      </p>
      <Link
        href="/races"
        className="inline-flex items-center gap-2 bg-rr-gold text-rr-black px-6 py-3 rounded-lg font-semibold hover:bg-rr-gold/90 transition-colors"
      >
        <Flag size={20} />
        View Upcoming Races
      </Link>
    </div>
  )
}

export default function ResultsPage() {
  const [results, setResults] = useState<TeamRaceResult[]>([])
  const [stats, setStats] = useState<TeamStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [resultsData, statsData] = await Promise.all([
          getTeamRaceResults(50),
          getTeamStats(),
        ])
        setResults(resultsData)
        setStats(statsData)
      } catch (error) {
        console.error('Failed to load results:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Calculate derived stats from results
  const wins = results.filter(r => r.position === 1).length
  const podiums = results.filter(r => r.position <= 3).length
  const avgPosition = results.length > 0
    ? (results.reduce((sum, r) => sum + r.position, 0) / results.length).toFixed(1)
    : '-'

  if (loading) {
    return <LoadingSkeleton />
  }

  return (
    <div className="min-h-screen bg-rr-black">
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-rr-gray-900">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center gap-3 justify-center mb-4">
            <Trophy size={32} className="text-rr-gold" />
            <h1 className="font-heading text-4xl md:text-5xl text-rr-gold">
              RACE RESULTS
            </h1>
          </div>
          <p className="text-rr-gray-400 max-w-2xl mx-auto">
            Our racing history and performance statistics.
          </p>
        </div>
      </section>

      {/* Stats Row */}
      <section className="py-8 bg-rr-black border-b border-rr-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Total Races" value={results.length} icon={Flag} color="success" />
            <StatCard label="Wins" value={wins} icon={Trophy} color="gold" />
            <StatCard label="Podiums" value={podiums} icon={TrendingUp} color="blue" />
            <StatCard label="Avg. Finish" value={`P${avgPosition}`} icon={Target} color="purple" />
          </div>
        </div>
      </section>

      {/* Results List */}
      <section className="py-12 bg-rr-black">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-2xl text-rr-white">
              RACE HISTORY
            </h2>
            <span className="text-rr-gray-400">
              {results.length} race{results.length !== 1 ? 's' : ''} completed
            </span>
          </div>

          {results.length > 0 ? (
            <div className="space-y-4">
              {results.map(result => (
                <ResultCard key={result.id} result={result} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-rr-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl text-rr-white mb-4">
            WANT TO BE PART OF OUR RESULTS?
          </h2>
          <p className="text-rr-gray-400 mb-6">
            Join Rocky Racing and help us chase more checkered flags.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/join"
              className="inline-flex items-center justify-center gap-2 bg-rr-gold text-rr-black px-6 py-3 rounded-lg font-semibold hover:bg-rr-gold/90 transition-colors"
            >
              <Users size={20} />
              Apply to Join
            </Link>
            <Link
              href="/races"
              className="inline-flex items-center justify-center gap-2 border-2 border-rr-gold text-rr-gold px-6 py-3 rounded-lg font-semibold hover:bg-rr-gold hover:text-rr-black transition-colors"
            >
              <Calendar size={20} />
              View Upcoming Races
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
