'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Calendar, Flag, MapPin, Clock, Users, Car, ChevronRight } from 'lucide-react'
import { getNextTeamRace, getUpcomingTeamRaces, TeamRace, getTimeUntil, formatTeamRaceDateTime } from '@/lib/bot-api'
import { RaceCountdown } from '@/components/live-data'

// Loading skeleton
function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-rr-black">
      <section className="py-16 md:py-20 bg-rr-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="animate-pulse h-48 bg-rr-gray-800 rounded-xl" />
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse h-64 bg-rr-gray-900 rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Status badge component
function StatusBadge({ status }: { status: string }) {
  const statusStyles: Record<string, string> = {
    scheduled: 'bg-rr-gold/20 text-rr-gold',
    live: 'bg-red-500/20 text-red-400',
    completed: 'bg-rr-success/20 text-rr-success',
    cancelled: 'bg-rr-gray-600/20 text-rr-gray-400',
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${statusStyles[status] || statusStyles.scheduled}`}>
      {status === 'live' && <span className="mr-1 animate-pulse">●</span>}
      {status}
    </span>
  )
}

// Race card component
function RaceCard({ race, showDetails = false }: { race: TeamRace; showDetails?: boolean }) {
  return (
    <div className="bg-rr-gray-900 rounded-xl border border-rr-gray-700 hover:border-rr-gold/50 transition-all overflow-hidden group">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-heading text-lg text-rr-white group-hover:text-rr-gold transition-colors">
              {race.name}
            </h3>
            <p className="text-sm text-rr-gray-400">{race.series}</p>
          </div>
          <StatusBadge status={race.status} />
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2 text-rr-gray-300">
            <MapPin size={16} className="text-rr-gray-500" />
            {race.track}
          </div>
          <div className="flex items-center gap-2 text-rr-gray-300">
            <Calendar size={16} className="text-rr-gray-500" />
            {formatTeamRaceDateTime(race.date)}
          </div>
          {race.duration && (
            <div className="flex items-center gap-2 text-rr-gray-300">
              <Clock size={16} className="text-rr-gray-500" />
              {race.duration}
            </div>
          )}
          {race.carClass && (
            <div className="flex items-center gap-2 text-rr-gray-300">
              <Car size={16} className="text-rr-gray-500" />
              {race.carClass}
            </div>
          )}
        </div>

        {showDetails && race.confirmedDrivers && race.confirmedDrivers.length > 0 && (
          <div className="mt-4 pt-4 border-t border-rr-gray-800">
            <div className="flex items-center gap-2 mb-3">
              <Users size={16} className="text-rr-gold" />
              <span className="text-sm font-medium text-rr-white">
                {race.confirmedDrivers.length} Confirmed
              </span>
              {race.tentativeDrivers && race.tentativeDrivers.length > 0 && (
                <span className="text-sm text-rr-gray-500">
                  + {race.tentativeDrivers.length} tentative
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {race.confirmedDrivers.slice(0, 4).map(driver => (
                <span
                  key={driver.id}
                  className="text-xs bg-rr-gray-800 px-2 py-1 rounded text-rr-gray-300"
                >
                  {driver.name}
                </span>
              ))}
              {race.confirmedDrivers.length > 4 && (
                <span className="text-xs text-rr-gray-500">
                  +{race.confirmedDrivers.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="px-6 py-3 bg-rr-gray-800/50 border-t border-rr-gray-800">
        <span className="flex items-center text-rr-gold text-sm font-medium group-hover:gap-2 transition-all">
          View Details <ChevronRight size={16} className="ml-1" />
        </span>
      </div>
    </div>
  )
}

// Empty state
function EmptyState() {
  return (
    <div className="bg-rr-gray-900 rounded-xl p-12 border border-rr-gray-700 text-center">
      <Flag size={48} className="text-rr-gold mx-auto mb-4 opacity-50" />
      <h3 className="text-xl text-rr-white mb-2 font-heading">No Upcoming Races</h3>
      <p className="text-rr-gray-400 mb-6">
        Check back soon for new endurance events!
      </p>
      <Link
        href="/schedule"
        className="inline-flex items-center gap-2 bg-rr-gold text-rr-black px-6 py-3 rounded-lg font-semibold hover:bg-rr-gold/90 transition-colors"
      >
        <Calendar size={20} />
        View Full Schedule
      </Link>
    </div>
  )
}

export default function RacesPage() {
  const [races, setRaces] = useState<TeamRace[]>([])
  const [nextRace, setNextRace] = useState<TeamRace | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [racesData, nextRaceData] = await Promise.all([
          getUpcomingTeamRaces(20),
          getNextTeamRace(),
        ])
        setRaces(racesData)
        setNextRace(nextRaceData)
      } catch (error) {
        console.error('Failed to load races:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) {
    return <LoadingSkeleton />
  }

  return (
    <div className="min-h-screen bg-rr-black">
      {/* Hero Section with Countdown */}
      <section className="py-16 md:py-20 bg-rr-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3 justify-center mb-4">
            <Flag size={32} className="text-rr-gold" />
            <h1 className="font-heading text-4xl md:text-5xl text-rr-gold">
              RACE SCHEDULE
            </h1>
          </div>
          <p className="text-center text-rr-gray-400 mb-8 max-w-2xl mx-auto">
            Upcoming endurance races and team events. Join us on the virtual track!
          </p>

          {nextRace && (
            <div className="max-w-lg mx-auto">
              <RaceCountdown
                targetDate={nextRace.date}
                raceName={nextRace.name}
                track={nextRace.track}
                series={nextRace.series}
              />
            </div>
          )}
        </div>
      </section>

      {/* Races Grid */}
      <section className="py-12 bg-rr-black">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-2xl text-rr-white">
              UPCOMING RACES
            </h2>
            <span className="text-rr-gray-400">
              {races.length} event{races.length !== 1 ? 's' : ''} scheduled
            </span>
          </div>

          {races.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {races.map(race => (
                <RaceCard key={race.id} race={race} showDetails />
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
            WANT TO JOIN A RACE?
          </h2>
          <p className="text-rr-gray-400 mb-6">
            Join Rocky Racing and compete with us in endurance events.
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
              href="/results"
              className="inline-flex items-center justify-center gap-2 border-2 border-rr-gold text-rr-gold px-6 py-3 rounded-lg font-semibold hover:bg-rr-gold hover:text-rr-black transition-colors"
            >
              View Past Results
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
