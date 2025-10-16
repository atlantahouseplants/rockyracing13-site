import { Metadata } from 'next'
import { Calendar, Download, TrendingUp, Trophy, Clock, MapPin, Car, AlertCircle, CheckCircle, Target } from 'lucide-react'
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

const formatTimeAgo = (value: string | null | undefined) => {
  if (!value) return 'Unknown'
  const timestamp = Date.parse(value)
  if (Number.isNaN(timestamp)) return 'Unknown'
  const now = Date.now()
  const diff = now - timestamp
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days === 0) return 'Today'
  if (days === 1) return '1 day ago'
  return `${days} days ago`
}

export default async function Schedule() {
  const driverData = await getDriverData()
  const { recentRaces, career, overview, error } = driverData

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
      {/* EPIC RESULTS HERO SECTION */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-rr-black/85 via-rr-black/75 to-rr-black/85"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-rr-gold/10 to-transparent"></div>
        </div>

        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="speed-line"></div>
          <div className="speed-line"></div>
          <div className="speed-line"></div>
        </div>

        <div className="absolute top-0 left-0 w-full h-3 checkered-bg opacity-90 z-30"></div>
        <div className="absolute bottom-0 left-0 w-full h-3 checkered-bg opacity-90 z-30"></div>

        <div className="relative z-40 text-center max-w-7xl mx-auto px-4">
          <h1 className="font-heading text-6xl sm:text-7xl text-rr-gold mb-4 tracking-wider font-black" style={{textShadow: '0 0 40px rgba(212, 175, 55, 1), 0 0 80px rgba(212, 175, 55, 0.8), 0 6px 15px rgba(0, 0, 0, 1)'}}>
            SCHEDULE & RESULTS
          </h1>
          <p className="text-2xl text-rr-white mb-8 font-bold" style={{textShadow: '0 2px 8px rgba(0, 0, 0, 0.9)'}}>
            🏁 LIVE RACE DATA • PERFORMANCE ANALYTICS • CSV EXPORTS 🏁
          </p>

          {error && (
            <div className="bg-rr-racing-red/20 border border-rr-racing-red/50 rounded-xl p-4 mb-6">
              <p className="text-rr-racing-red font-bold">⚠️ Live data temporarily unavailable: {error}</p>
            </div>
          )}
        </div>
      </section>

      {/* PERFORMANCE DASHBOARD */}
      <section className="py-16 bg-gradient-to-br from-gray-950 to-rr-black relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl text-rr-white mb-4">📊 PERFORMANCE DASHBOARD</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-gradient-to-br from-rr-gold/20 to-rr-black border-2 border-rr-gold/60 rounded-xl p-6 text-center shadow-xl">
              <Trophy size={48} className="text-rr-gold mx-auto mb-4" />
              <div className="text-3xl font-bold text-rr-white mb-2">{stats.totalRaces}</div>
              <div className="text-rr-gold font-bold">TOTAL RACES</div>
            </div>

            <div className="bg-gradient-to-br from-rr-neon-green/20 to-rr-black border-2 border-rr-neon-green/60 rounded-xl p-6 text-center shadow-xl">
              <Target size={48} className="text-rr-neon-green mx-auto mb-4" />
              <div className="text-3xl font-bold text-rr-white mb-2">{stats.podiums}</div>
              <div className="text-rr-neon-green font-bold">PODIUMS</div>
            </div>

            <div className="bg-gradient-to-br from-rr-electric-blue/20 to-rr-black border-2 border-rr-electric-blue/60 rounded-xl p-6 text-center shadow-xl">
              <CheckCircle size={48} className="text-rr-electric-blue mx-auto mb-4" />
              <div className="text-3xl font-bold text-rr-white mb-2">{stats.wins}</div>
              <div className="text-rr-electric-blue font-bold">WINS</div>
            </div>

            <div className="bg-gradient-to-br from-rr-racing-red/20 to-rr-black border-2 border-rr-racing-red/60 rounded-xl p-6 text-center shadow-xl">
              <AlertCircle size={48} className="text-rr-racing-red mx-auto mb-4" />
              <div className="text-3xl font-bold text-rr-white mb-2">{stats.avgIncidents}</div>
              <div className="text-rr-racing-red font-bold">AVG INCIDENTS</div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE RESULTS TABLE */}
      <section className="py-16 bg-rr-black relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl text-rr-white mb-4">🏁 RACE RESULTS TABLE</h2>
            <div className="bg-gradient-to-br from-rr-gold/15 to-rr-black border-2 border-rr-gold/60 rounded-xl p-6 mb-8 text-center">
              <h3 className="font-heading text-2xl text-rr-gold mb-4">📥 EXPORT RACE DATA</h3>
              <p className="text-rr-white mb-6 font-semibold" style={{textShadow: '0 2px 6px rgba(0, 0, 0, 0.8)'}}>Download complete race results in CSV format for analysis</p>
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-rr-gold/50 to-rr-speed-yellow/50 text-rr-white px-8 py-4 rounded-xl text-lg font-bold opacity-75 cursor-not-allowed">
                <Download size={24} />
                CSV DOWNLOAD ({stats.totalRaces} races)
              </div>
              <p className="text-sm text-rr-white mt-2 font-medium opacity-80" style={{textShadow: '0 1px 4px rgba(0, 0, 0, 0.7)'}}>CSV export functionality coming in next update</p>
            </div>
          </div>

          {recentRaces && recentRaces.length > 0 ? (
            <div className="bg-gradient-to-br from-gray-900/50 to-rr-black border-2 border-gray-700/50 rounded-xl overflow-hidden shadow-2xl">
              {/* Table Header */}
              <div className="bg-gradient-to-r from-rr-gold/20 to-rr-black border-b border-gray-700 p-4">
                <div className="grid grid-cols-2 md:grid-cols-7 gap-4 font-bold text-rr-gold text-sm">
                  <div className="flex items-center gap-2"><Calendar size={16} />DATE</div>
                  <div className="flex items-center gap-2"><Trophy size={16} />SERIES</div>
                  <div className="hidden md:flex items-center gap-2"><MapPin size={16} />TRACK</div>
                  <div className="hidden md:flex items-center gap-2"><Car size={16} />CAR</div>
                  <div className="flex items-center gap-2"><Target size={16} />POS</div>
                  <div className="hidden md:flex items-center gap-2"><AlertCircle size={16} />INC</div>
                  <div className="hidden md:flex items-center gap-2"><TrendingUp size={16} />SOF</div>
                </div>
              </div>

              {/* Table Body */}
              <div className="max-h-96 overflow-y-auto">
                {recentRaces.map((race, index) => {
                  const isPodium = race.finishPosition && race.finishPosition <= 3
                  const isWin = race.finishPosition === 1
                  return (
                    <div key={race.subsessionId || index} className={`border-b border-gray-700/50 p-4 hover:bg-gray-800/30 transition-colors duration-200 ${
                      isWin ? 'bg-rr-gold/10 border-l-4 border-l-rr-gold' :
                      isPodium ? 'bg-rr-neon-green/5 border-l-4 border-l-rr-neon-green' : ''
                    }`}>
                      <div className="grid grid-cols-2 md:grid-cols-7 gap-4 items-center text-sm">
                        <div className="text-rr-white font-medium" style={{textShadow: '0 1px 4px rgba(0, 0, 0, 0.7)'}}>
                          {formatRaceDate(race.startTime)}
                          <div className="text-xs text-rr-white md:hidden opacity-80 font-semibold">{formatTimeAgo(race.startTime)}</div>
                        </div>
                        <div className="text-rr-white font-semibold truncate" title={race.seriesName || 'Unknown Series'}>
                          {race.seriesName || 'Unknown Series'}
                        </div>
                        <div className="hidden md:block text-rr-white truncate font-medium" title={race.trackName || 'Unknown Track'} style={{textShadow: '0 1px 4px rgba(0, 0, 0, 0.7)'}}>
                          {race.trackName || 'Unknown Track'}
                        </div>
                        <div className="hidden md:block text-rr-white truncate font-medium" title={race.carName || 'Unknown Car'} style={{textShadow: '0 1px 4px rgba(0, 0, 0, 0.7)'}}>
                          {race.carName || 'Unknown Car'}
                        </div>
                        <div className={`font-bold text-lg ${
                          isWin ? 'text-rr-gold' :
                          isPodium ? 'text-rr-neon-green' :
                          'text-rr-white'
                        }`}>
                          {race.finishPosition ? `P${race.finishPosition}` : 'N/A'}
                          {isWin && <span className="ml-2">🏆</span>}
                          {isPodium && !isWin && <span className="ml-2">🥉</span>}
                        </div>
                        <div className={`hidden md:block font-semibold ${
                          (race.incidents || 0) === 0 ? 'text-rr-neon-green' :
                          (race.incidents || 0) <= 2 ? 'text-rr-speed-yellow' :
                          'text-rr-racing-red'
                        }`}>
                          {race.incidents !== null && race.incidents !== undefined ? `${race.incidents}x` : 'N/A'}
                        </div>
                        <div className="hidden md:block text-rr-white font-medium" style={{textShadow: '0 1px 4px rgba(0, 0, 0, 0.7)'}}>
                          {race.strengthOfField || 'N/A'}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-rr-black/80 to-gray-900/50 rounded-xl p-12 border-2 border-rr-gold/30 text-center">
              <Calendar size={64} className="text-rr-gold mx-auto mb-4 opacity-80" />
              <h3 className="text-2xl text-rr-white mb-4 font-bold" style={{textShadow: '0 2px 6px rgba(0, 0, 0, 0.8)'}}>No Race Data Available</h3>
              <p className="text-rr-white font-medium opacity-90" style={{textShadow: '0 1px 4px rgba(0, 0, 0, 0.7)'}}>
                {error ? 'Unable to load live race data at this time.' : 'Race results will appear here once data is available.'}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}