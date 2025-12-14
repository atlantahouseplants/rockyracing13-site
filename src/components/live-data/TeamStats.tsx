import { Trophy, Flag, Target, AlertCircle, TrendingUp } from 'lucide-react'
import { getTeamStats } from '@/lib/bot-api'

interface TeamStatsProps {
  className?: string
  variant?: 'grid' | 'inline'
}

export default async function TeamStats({ className = '', variant = 'grid' }: TeamStatsProps) {
  const stats = await getTeamStats()

  if (!stats) {
    return (
      <div className={`bg-rr-gray-900 rounded-xl p-6 border border-rr-gray-700 text-center ${className}`}>
        <Trophy size={32} className="text-rr-gold mx-auto mb-2 opacity-50" />
        <p className="text-rr-gray-400 text-sm">Team stats unavailable</p>
      </div>
    )
  }

  const statItems = [
    {
      icon: Flag,
      label: 'Total Races',
      value: stats.totalRaces,
      color: 'text-rr-gold',
      bgColor: 'text-rr-gold',
    },
    {
      icon: Trophy,
      label: 'Wins',
      value: stats.wins,
      color: 'text-rr-gold',
      bgColor: 'text-rr-gold',
    },
    {
      icon: TrendingUp,
      label: 'Podiums',
      value: stats.podiums,
      color: 'text-rr-success',
      bgColor: 'text-rr-success',
    },
    {
      icon: Target,
      label: 'Avg Finish',
      value: `P${stats.avgFinish}`,
      color: 'text-rr-accent',
      bgColor: 'text-rr-accent',
    },
  ]

  if (variant === 'inline') {
    return (
      <div className={`flex flex-wrap justify-center gap-4 md:gap-8 ${className}`}>
        {statItems.map((item) => (
          <div key={item.label} className="bg-rr-gray-900/80 backdrop-blur-sm rounded-lg px-6 py-4 border border-rr-gray-700">
            <div className="text-rr-gold font-semibold text-sm uppercase tracking-wide">{item.label}</div>
            <div className="text-rr-white text-2xl font-bold">{item.value}</div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      {statItems.map((item) => (
        <div
          key={item.label}
          className="bg-rr-gray-900 rounded-xl p-6 text-center border border-rr-gray-700"
        >
          <item.icon size={32} className={`${item.bgColor} mx-auto mb-3`} />
          <div className="text-3xl font-bold text-rr-white mb-1">{item.value}</div>
          <div className="text-rr-gray-400 text-sm">{item.label}</div>
        </div>
      ))}
    </div>
  )
}

/**
 * Compact version for sidebar or small spaces
 */
export async function TeamStatsCompact({ className = '' }: { className?: string }) {
  const stats = await getTeamStats()

  if (!stats) return null

  return (
    <div className={`bg-rr-gray-900 rounded-xl p-6 border border-rr-gray-700 ${className}`}>
      <h3 className="font-heading text-lg text-rr-gold mb-4">Team Stats</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-rr-gray-400">Races</span>
          <span className="text-rr-white font-semibold">{stats.totalRaces}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-rr-gray-400">Wins</span>
          <span className="text-rr-white font-semibold">{stats.wins}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-rr-gray-400">Podiums</span>
          <span className="text-rr-white font-semibold">{stats.podiums}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-rr-gray-400">Avg Finish</span>
          <span className="text-rr-white font-semibold">P{stats.avgFinish}</span>
        </div>
        {stats.bestFinish && (
          <div className="flex justify-between items-center">
            <span className="text-rr-gray-400">Best Finish</span>
            <span className="text-rr-gold font-semibold">P{stats.bestFinish}</span>
          </div>
        )}
      </div>
    </div>
  )
}
