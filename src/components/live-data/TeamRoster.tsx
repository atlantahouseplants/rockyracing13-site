import { Users, Trophy, Flag } from 'lucide-react'
import { getTeamRoster, type TeamDriver } from '@/lib/bot-api'

interface TeamRosterProps {
  className?: string
  showStats?: boolean
  limit?: number
}

export default async function TeamRoster({
  className = '',
  showStats = true,
  limit,
}: TeamRosterProps) {
  const drivers = await getTeamRoster()
  const displayDrivers = limit ? drivers.slice(0, limit) : drivers

  if (drivers.length === 0) {
    return (
      <div className={`bg-rr-gray-900 rounded-xl p-8 border border-rr-gray-700 text-center ${className}`}>
        <Users size={48} className="text-rr-gold mx-auto mb-4 opacity-50" />
        <h3 className="text-xl text-rr-white mb-2">No Team Members</h3>
        <p className="text-rr-gray-400">Team roster will appear here.</p>
      </div>
    )
  }

  return (
    <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {displayDrivers.map((driver) => (
        <DriverCard key={driver.id} driver={driver} showStats={showStats} />
      ))}
    </div>
  )
}

function DriverCard({ driver, showStats }: { driver: TeamDriver; showStats: boolean }) {
  const initials = driver.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="bg-rr-gray-900 rounded-xl p-6 border border-rr-gray-700 hover:border-rr-gold/30 transition-colors">
      <div className="flex items-center gap-4 mb-4">
        {driver.avatarUrl ? (
          <img
            src={driver.avatarUrl}
            alt={driver.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-rr-gold"
          />
        ) : (
          <div className="w-14 h-14 bg-rr-gold/20 rounded-full flex items-center justify-center text-rr-gold font-heading text-xl">
            {initials}
          </div>
        )}
        <div>
          <h3 className="font-heading text-lg text-rr-white">{driver.name}</h3>
          <p className="text-rr-gold text-sm font-medium capitalize">{driver.role}</p>
        </div>
      </div>

      {driver.bio && (
        <p className="text-rr-gray-400 text-sm mb-4 line-clamp-2">{driver.bio}</p>
      )}

      {showStats && (
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-rr-black/50 rounded p-2">
            <div className="font-bold text-rr-white">
              {driver.irating?.toLocaleString() || '-'}
            </div>
            <div className="text-xs text-rr-gray-500">iRating</div>
          </div>
          <div className="bg-rr-black/50 rounded p-2">
            <div className="font-bold text-rr-white">{driver.stats.racesCompleted}</div>
            <div className="text-xs text-rr-gray-500">Races</div>
          </div>
          <div className="bg-rr-black/50 rounded p-2">
            <div className="font-bold text-rr-gold">{driver.stats.podiums}</div>
            <div className="text-xs text-rr-gray-500">Podiums</div>
          </div>
        </div>
      )}

      {driver.safetyRating && (
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-rr-gray-500">Safety Rating</span>
          <span className="text-rr-success font-medium">{driver.safetyRating}</span>
        </div>
      )}
    </div>
  )
}

/**
 * Compact list version for sidebars
 */
export async function TeamRosterList({ className = '' }: { className?: string }) {
  const drivers = await getTeamRoster()

  if (drivers.length === 0) return null

  return (
    <div className={`bg-rr-gray-900 rounded-xl p-6 border border-rr-gray-700 ${className}`}>
      <h3 className="font-heading text-lg text-rr-gold mb-4">Team Roster</h3>
      <div className="space-y-3">
        {drivers.slice(0, 5).map((driver) => (
          <div key={driver.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-rr-gold/20 rounded-full flex items-center justify-center text-rr-gold text-xs font-bold">
                {driver.name.charAt(0)}
              </div>
              <div>
                <p className="text-rr-white text-sm font-medium">{driver.name}</p>
                <p className="text-rr-gray-500 text-xs capitalize">{driver.role}</p>
              </div>
            </div>
            {driver.irating && (
              <span className="text-rr-gray-400 text-sm">{driver.irating.toLocaleString()}</span>
            )}
          </div>
        ))}
        {drivers.length > 5 && (
          <p className="text-rr-gray-500 text-sm text-center pt-2">
            +{drivers.length - 5} more drivers
          </p>
        )}
      </div>
    </div>
  )
}
