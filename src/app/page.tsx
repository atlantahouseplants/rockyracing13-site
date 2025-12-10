import Link from 'next/link'
import { Play, Trophy, Youtube, Target, Users, Zap } from 'lucide-react'
import { getDriverData, type RaceResult } from '@/lib/iracing'

const formatRaceDate = (value: string | null | undefined) => {
  if (!value) return null
  const timestamp = Date.parse(value)
  if (Number.isNaN(timestamp)) return null
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(timestamp))
}

const formatRaceLocation = (race: RaceResult | null) => {
  if (!race) return null
  const parts = [race?.trackName, race?.trackConfig].filter(
    (part): part is string => Boolean(part && part.trim()),
  )
  return parts.join(' - ')
}

export default async function Home() {
  const driverData = await getDriverData()
  const { overview, career, latestRace, latestPodium, recentRaces, error } = driverData
  const displayRace = latestPodium ?? latestRace
  const hasRace = Boolean(displayRace)

  const finishPosition = hasRace && typeof displayRace?.finishPosition === 'number'
    ? displayRace.finishPosition
    : null

  const raceLocation = formatRaceLocation(displayRace)
  const raceDate = displayRace?.startTime ? formatRaceDate(displayRace.startTime) : null

  const iratingDisplay = overview?.irating !== null && overview?.irating !== undefined
    ? Math.round(overview.irating).toLocaleString()
    : 'N/A'

  const licenseDisplay = overview?.licenseDisplay ?? 'N/A'

  // Recent performance stats
  const recentWins = recentRaces?.filter(race => race.finishPosition === 1).length || 0
  const recentPodiums = recentRaces?.filter(race => race.finishPosition && race.finishPosition <= 3).length || 0

  return (
    <div className="min-h-screen bg-rr-black">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="/max-with-race-car.jpg"
            alt="Max Wall with Race Car"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-rr-black/80 via-rr-black/70 to-rr-black"></div>
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
          {/* Main Title */}
          <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl text-rr-gold mb-4 tracking-wide">
            ROCKY RACING
          </h1>

          <p className="text-xl md:text-2xl text-rr-white/90 mb-8 max-w-2xl mx-auto">
            Follow Max Wall&apos;s journey from sim racing to professional motorsports.
            A 13-year-old iRacing driver with big dreams.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="https://youtube.com/@rockyracing13"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors"
            >
              <Youtube size={24} />
              Subscribe on YouTube
            </a>

            <Link
              href="/support"
              className="inline-flex items-center gap-3 bg-rr-gold text-rr-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-rr-gold/90 transition-colors"
            >
              <Zap size={24} />
              Support the Journey
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <div className="bg-rr-gray-900/80 backdrop-blur-sm rounded-lg px-6 py-4 border border-rr-gray-700">
              <div className="text-rr-gold font-semibold text-sm uppercase tracking-wide">iRating</div>
              <div className="text-rr-white text-2xl font-bold">{iratingDisplay}</div>
            </div>
            <div className="bg-rr-gray-900/80 backdrop-blur-sm rounded-lg px-6 py-4 border border-rr-gray-700">
              <div className="text-rr-gold font-semibold text-sm uppercase tracking-wide">License</div>
              <div className="text-rr-white text-2xl font-bold">{licenseDisplay}</div>
            </div>
            {hasRace && finishPosition && (
              <div className="bg-rr-gray-900/80 backdrop-blur-sm rounded-lg px-6 py-4 border border-rr-gray-700">
                <div className="text-rr-gold font-semibold text-sm uppercase tracking-wide">Latest Result</div>
                <div className="text-rr-white text-2xl font-bold">P{finishPosition}</div>
              </div>
            )}
          </div>

          {error && (
            <p className="mt-6 text-sm text-rr-warning">
              Live stats temporarily unavailable
            </p>
          )}
        </div>
      </section>

      {/* Featured Content Section */}
      <section className="py-16 md:py-24 bg-rr-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-heading text-4xl md:text-5xl text-rr-white text-center mb-12">
            LATEST RACING ACTION
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Video Card */}
            <div className="bg-rr-black rounded-xl overflow-hidden border border-rr-gray-700">
              <div className="aspect-video relative">
                <video
                  className="w-full h-full object-cover"
                  controls
                  poster="/rocky-racing-logo-bw.png"
                  preload="metadata"
                >
                  <source src="/intro-video.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading text-rr-gold mb-2">Meet the Team</h3>
                <p className="text-rr-gray-400 mb-4">Get to know Max and the Rocky Racing crew in this intro video.</p>
                <a
                  href="https://youtube.com/@rockyracing13"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 font-medium transition-colors"
                >
                  <Youtube size={18} />
                  More videos on YouTube
                </a>
              </div>
            </div>

            {/* Race Results Card */}
            <div className="space-y-6">
              {/* Latest Race */}
              <div className="bg-rr-black rounded-xl p-6 border border-rr-gray-700">
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 rounded-lg flex items-center justify-center font-heading text-2xl ${
                    finishPosition && finishPosition <= 3
                      ? 'bg-rr-gold text-rr-black'
                      : 'bg-rr-gray-800 text-rr-white'
                  }`}>
                    {finishPosition ? `P${finishPosition}` : '--'}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-rr-white mb-1">
                      {latestPodium ? 'Latest Podium' : hasRace ? 'Recent Result' : 'No Recent Races'}
                    </h3>
                    {hasRace ? (
                      <>
                        <p className="text-rr-gold font-medium">{raceLocation || displayRace?.seriesName || 'Unknown Track'}</p>
                        <p className="text-rr-gray-400 text-sm">{displayRace?.seriesName} {raceDate ? `• ${raceDate}` : ''}</p>
                        {displayRace?.incidents !== null && displayRace?.incidents !== undefined && (
                          <p className={`text-sm mt-2 ${displayRace.incidents === 0 ? 'text-rr-success' : 'text-rr-gray-400'}`}>
                            {displayRace.incidents === 0 ? 'Clean race!' : `${displayRace.incidents}x incidents`}
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="text-rr-gray-400">Check back soon for race results</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Performance Summary */}
              {recentRaces && recentRaces.length > 0 && (
                <div className="bg-rr-black rounded-xl p-6 border border-rr-gray-700">
                  <h3 className="text-lg font-semibold text-rr-white mb-4">Recent Performance</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-rr-gold">{recentRaces.length}</div>
                      <div className="text-sm text-rr-gray-400">Races</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-rr-success">{recentPodiums}</div>
                      <div className="text-sm text-rr-gray-400">Podiums</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-rr-gold">{recentWins}</div>
                      <div className="text-sm text-rr-gray-400">Wins</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Season Stats */}
              <div className="bg-rr-black rounded-xl p-6 border border-rr-gray-700">
                <h3 className="text-lg font-semibold text-rr-white mb-4">Career Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-rr-gray-400">Total Podiums</span>
                    <span className="text-rr-white font-semibold">{career?.podiums ?? 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-rr-gray-400">Career Wins</span>
                    <span className="text-rr-white font-semibold">{career?.wins ?? 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-rr-gray-400">Total Starts</span>
                    <span className="text-rr-white font-semibold">{career?.starts ?? 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="py-16 md:py-24 bg-rr-black">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-heading text-4xl md:text-5xl text-rr-white text-center mb-4">
            THE MISSION
          </h2>
          <p className="text-rr-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Building the ultimate racing career through dedication, content creation, and community support.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Race */}
            <div className="bg-rr-gray-900 rounded-xl p-8 border border-rr-gray-700 hover:border-rr-gold/50 transition-colors">
              <Trophy size={40} className="text-rr-gold mb-4" />
              <h3 className="font-heading text-2xl text-rr-white mb-3">COMPETE</h3>
              <p className="text-rr-gray-400">
                Racing in iRacing&apos;s most competitive series, building skills and experience for the path to real motorsports.
              </p>
            </div>

            {/* Create */}
            <div className="bg-rr-gray-900 rounded-xl p-8 border border-rr-gray-700 hover:border-rr-gold/50 transition-colors">
              <Play size={40} className="text-rr-gold mb-4" />
              <h3 className="font-heading text-2xl text-rr-white mb-3">CREATE</h3>
              <p className="text-rr-gray-400">
                Sharing the journey through YouTube content, race highlights, tutorials, and behind-the-scenes looks.
              </p>
            </div>

            {/* Community */}
            <div className="bg-rr-gray-900 rounded-xl p-8 border border-rr-gray-700 hover:border-rr-gold/50 transition-colors">
              <Users size={40} className="text-rr-gold mb-4" />
              <h3 className="font-heading text-2xl text-rr-white mb-3">CONNECT</h3>
              <p className="text-rr-gray-400">
                Building a community of racing enthusiasts who share the passion for motorsports and support the dream.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Support CTA Section */}
      <section className="py-16 md:py-24 bg-rr-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl md:text-5xl text-rr-white mb-4">
            SUPPORT THE JOURNEY
          </h2>
          <p className="text-rr-gray-400 mb-8 max-w-2xl mx-auto">
            Help Max upgrade his racing equipment and take the next step toward professional motorsports.
          </p>

          <div className="bg-rr-black rounded-xl p-8 border border-rr-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-heading text-xl text-rr-gold">Current Goal: Direct Drive Wheel</h3>
              <span className="text-rr-white font-semibold">$750 / $2,500</span>
            </div>

            <div className="w-full bg-rr-gray-800 rounded-full h-4 mb-6">
              <div
                className="bg-rr-gold h-4 rounded-full transition-all duration-500"
                style={{ width: '30%' }}
              />
            </div>

            <div className="flex justify-between text-sm text-rr-gray-400 mb-8">
              <span>30% funded</span>
              <span>$1,750 to go</span>
            </div>

            <Link
              href="/support"
              className="inline-flex items-center gap-3 bg-rr-gold text-rr-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-rr-gold/90 transition-colors"
            >
              <Target size={24} />
              Support Rocky Racing
            </Link>
          </div>
        </div>
      </section>

      {/* Driver Profile Section */}
      <section className="py-16 md:py-24 bg-rr-black">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-rr-gray-900 rounded-xl p-8 border border-rr-gray-700">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <img
                src="/Max by bmw gpt.jpg"
                alt="Max Wall - Rocky Racing Driver"
                className="w-32 h-32 rounded-full border-4 border-rr-gold object-cover"
              />
              <div className="text-center md:text-left">
                <h3 className="font-heading text-3xl text-rr-white mb-2">MAX WALL</h3>
                <p className="text-rr-gold font-semibold mb-4">13-Year-Old iRacing Driver</p>
                <p className="text-rr-gray-400 mb-4">
                  A rising star in the sim racing world, Max combines natural talent with dedication
                  to pursue his dream of becoming a professional race driver.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <span className="bg-rr-success/20 text-rr-success px-3 py-1 rounded-full text-sm font-medium">Clean Racer</span>
                  <span className="bg-rr-accent/20 text-rr-accent px-3 py-1 rounded-full text-sm font-medium">Content Creator</span>
                  <span className="bg-rr-gold/20 text-rr-gold px-3 py-1 rounded-full text-sm font-medium">Rising Star</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
