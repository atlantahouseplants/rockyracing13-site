import { Calendar, MapPin, Clock, Users } from 'lucide-react'
import { getUpcomingTeamRaces, formatTeamRaceDateTime, type TeamRace } from '@/lib/bot-api'

interface UpcomingRacesProps {
  limit?: number
  showDrivers?: boolean
  className?: string
}

export default async function UpcomingRaces({
  limit = 5,
  showDrivers = true,
  className = '',
}: UpcomingRacesProps) {
  const races = await getUpcomingTeamRaces(limit)

  if (races.length === 0) {
    return (
      <div className={`bg-rr-gray-900 rounded-xl p-8 border border-rr-gray-700 text-center ${className}`}>
        <Calendar size={48} className="text-rr-gold mx-auto mb-4 opacity-50" />
        <h3 className="text-xl text-rr-white mb-2">No Upcoming Team Races</h3>
        <p className="text-rr-gray-400">Check back soon for scheduled events!</p>
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {races.map((race) => (
        <RaceCard key={race.id} race={race} showDrivers={showDrivers} />
      ))}
    </div>
  )
}

function RaceCard({ race, showDrivers }: { race: TeamRace; showDrivers: boolean }) {
  const confirmedCount = race.confirmedDrivers.length
  const tentativeCount = race.tentativeDrivers.length

  return (
    <div className="bg-rr-gray-900 rounded-xl p-5 border border-rr-gray-700 hover:border-rr-gold/30 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-heading text-lg text-rr-white mb-1">{race.name}</h3>
          <p className="text-sm text-rr-gold">{race.series}</p>
        </div>
        <StatusBadge status={race.status} />
      </div>

      <div className="space-y-2 text-sm text-rr-gray-400 mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-rr-gray-500" />
          {race.track}
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-rr-gray-500" />
          {formatTeamRaceDateTime(race.date)}
        </div>
        {race.duration && (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-rr-gray-500" />
            {race.duration}
          </div>
        )}
      </div>

      {showDrivers && (confirmedCount > 0 || tentativeCount > 0) && (
        <div className="pt-4 border-t border-rr-gray-800">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-rr-gray-500" />
            <span className="text-sm font-medium text-rr-gray-300">
              {confirmedCount} Confirmed
              {tentativeCount > 0 && ` • ${tentativeCount} Tentative`}
            </span>
          </div>
          {confirmedCount > 0 && (
            <div className="flex flex-wrap gap-1">
              {race.confirmedDrivers.slice(0, 5).map((driver) => (
                <span
                  key={driver.id}
                  className="text-xs bg-rr-gray-800 px-2 py-1 rounded text-rr-gray-300"
                >
                  {driver.name}
                </span>
              ))}
              {confirmedCount > 5 && (
                <span className="text-xs text-rr-gray-500">+{confirmedCount - 5} more</span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function StatusBadge({ status }: { status: TeamRace['status'] }) {
  const styles = {
    scheduled: 'bg-rr-gold/20 text-rr-gold',
    live: 'bg-red-500/20 text-red-400',
    completed: 'bg-rr-success/20 text-rr-success',
    cancelled: 'bg-rr-gray-700 text-rr-gray-400',
  }

  const labels = {
    scheduled: 'Scheduled',
    live: '● LIVE',
    completed: 'Completed',
    cancelled: 'Cancelled',
  }

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}
