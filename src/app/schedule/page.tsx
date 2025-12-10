import { Metadata } from 'next'
import { Calendar, Trophy, Target, AlertCircle } from 'lucide-react'
import { getDriverData } from '@/lib/iracing'

export const metadata: Metadata = {
  title: 'Rocky Racing Schedule & Results',
  description: 'View Rocky Racing race schedule, results, and performance statistics from iRacing competitions.',
}

const formatRaceDate = (value: string | null | undefined) => {
  if (!value) return 'TBD'
  const timestamp = Date.parse(value)
  if (Number.isNaN(timestamp)) return 'TBD'
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(timestamp))
}

export default async function Schedule() {
  const driverData = await getDriverData()
  const { recentRaces, error } = driverData

  const stats = {
    totalRaces: recentRaces?.length || 0,
    podiums: recentRaces?.filter(race => race.finishPosition && race.finishPosition <= 3).length || 0,
    wins: recentRaces?.filter(race => race.finishPosition === 1).length || 0,
    avgIncidents: recentRaces && recentRaces.length > 0
      ? (recentRaces.reduce((sum, race) => sum + (race.incidents || 0), 0) / recentRaces.length).toFixed(1)
      : '0.0'
  }

  return (
    <div className="min-h-screen bg-rr-black text-rr-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-rr-gray-900">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="font-heading text-5xl md:text-6xl text-rr-gold mb-4">
            SCHEDULE & RESULTS
          </h1>
          <p className="text-xl text-rr-gray-400 mb-8">
            Live race data and performance analytics from iRacing
          </p>

          {error && (
            <div className="bg-rr-warning/10 border border-rr-warning/30 rounded-lg p-4 max-w-xl mx-auto">
              <p className="text-rr-warning text-sm">
                Live data temporarily unavailable: {error}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Performance Dashboard */}
      <section className="py-12 bg-rr-black">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-heading text-2xl text-rr-white text-center mb-8">
            PERFORMANCE DASHBOARD
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-rr-gray-900 rounded-xl p-6 text-center border border-rr-gray-700">
              <Calendar size={32} className="text-rr-gold mx-auto mb-3" />
              <div className="text-3xl font-bold text-rr-white mb-1">{stats.totalRaces}</div>
              <div className="text-rr-gray-400 text-sm">Total Races</div>
            </div>

            <div className="bg-rr-gray-900 rounded-xl p-6 text-center border border-rr-gray-700">
              <Trophy size={32} className="text-rr-success mx-auto mb-3" />
              <div className="text-3xl font-bold text-rr-white mb-1">{stats.podiums}</div>
              <div className="text-rr-gray-400 text-sm">Podiums</div>
            </div>

            <div className="bg-rr-gray-900 rounded-xl p-6 text-center border border-rr-gray-700">
              <Target size={32} className="text-rr-gold mx-auto mb-3" />
              <div className="text-3xl font-bold text-rr-white mb-1">{stats.wins}</div>
              <div className="text-rr-gray-400 text-sm">Wins</div>
            </div>

            <div className="bg-rr-gray-900 rounded-xl p-6 text-center border border-rr-gray-700">
              <AlertCircle size={32} className="text-rr-warning mx-auto mb-3" />
              <div className="text-3xl font-bold text-rr-white mb-1">{stats.avgIncidents}</div>
              <div className="text-rr-gray-400 text-sm">Avg Incidents</div>
            </div>
          </div>
        </div>
      </section>

      {/* Race Results Table */}
      <section className="py-12 bg-rr-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-heading text-2xl text-rr-white text-center mb-8">
            RACE RESULTS
          </h2>

          {recentRaces && recentRaces.length > 0 ? (
            <div className="bg-rr-black rounded-xl border border-rr-gray-700 overflow-hidden">
              {/* Table Header */}
              <div className="bg-rr-gray-900 border-b border-rr-gray-700 p-4">
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-sm font-semibold text-rr-gold">
                  <div>Date</div>
                  <div>Series</div>
                  <div className="hidden md:block">Track</div>
                  <div className="hidden md:block">Car</div>
                  <div>Position</div>
                  <div className="hidden md:block">Incidents</div>
                </div>
              </div>

              {/* Table Body */}
              <div className="max-h-[500px] overflow-y-auto">
                {recentRaces.map((race, index) => {
                  const isPodium = race.finishPosition && race.finishPosition <= 3
                  const isWin = race.finishPosition === 1

                  return (
                    <div
                      key={race.subsessionId || index}
                      className={`border-b border-rr-gray-800 p-4 hover:bg-rr-gray-900/50 transition-colors ${
                        isWin ? 'bg-rr-gold/5 border-l-4 border-l-rr-gold' :
                        isPodium ? 'bg-rr-success/5 border-l-4 border-l-rr-success' : ''
                      }`}
                    >
                      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 items-center text-sm">
                        <div className="text-rr-gray-300">
                          {formatRaceDate(race.startTime)}
                        </div>
                        <div className="text-rr-white truncate" title={race.seriesName || 'Unknown'}>
                          {race.seriesName || 'Unknown Series'}
                        </div>
                        <div className="hidden md:block text-rr-gray-400 truncate" title={race.trackName || 'Unknown'}>
                          {race.trackName || 'Unknown Track'}
                        </div>
                        <div className="hidden md:block text-rr-gray-400 truncate" title={race.carName || 'Unknown'}>
                          {race.carName || 'Unknown Car'}
                        </div>
                        <div className={`font-bold ${
                          isWin ? 'text-rr-gold' :
                          isPodium ? 'text-rr-success' :
                          'text-rr-white'
                        }`}>
                          P{race.finishPosition || 'N/A'}
                          {isWin && ' 🏆'}
                        </div>
                        <div className={`hidden md:block ${
                          (race.incidents || 0) === 0 ? 'text-rr-success' :
                          (race.incidents || 0) <= 2 ? 'text-rr-warning' :
                          'text-red-400'
                        }`}>
                          {race.incidents !== null && race.incidents !== undefined
                            ? `${race.incidents}x`
                            : 'N/A'}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ) : (
            <div className="bg-rr-black rounded-xl p-12 border border-rr-gray-700 text-center">
              <Calendar size={48} className="text-rr-gold mx-auto mb-4 opacity-50" />
              <h3 className="text-xl text-rr-white mb-2">No Race Data Available</h3>
              <p className="text-rr-gray-400">
                {error ? 'Unable to load live race data at this time.' : 'Race results will appear here once data is available.'}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
