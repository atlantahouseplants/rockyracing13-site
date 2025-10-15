import Link from 'next/link'
import { Play, Zap, Trophy, Youtube, Gamepad2, Flag } from 'lucide-react'
import { getDriverData, type RaceResult } from '@/lib/iracing'

const formatRaceDate = (value: string | null | undefined) => {
  if (!value) {
    return null
  }
  const timestamp = Date.parse(value)
  if (Number.isNaN(timestamp)) {
    return null
  }
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(timestamp))
}

const formatRaceLocation = (race: RaceResult | null) => {
  if (!race) {
    return null
  }
  const parts = [race?.trackName, race?.trackConfig].filter(
    (part): part is string => Boolean(part && part.trim()),
  )
  return parts.join(' - ')
}

export default async function Home() {
  const driverData = await getDriverData()
  const { overview, career, latestRace, latestPodium, samplePodiumCount, sampleWinCount, error } = driverData
  const displayRace = latestPodium ?? latestRace
  const hasRace = Boolean(displayRace)

  const finishPositionText =
    hasRace && typeof displayRace?.finishPosition === 'number'
      ? `P${displayRace.finishPosition}`
      : 'N/A'

  const raceLocation = formatRaceLocation(displayRace)
  const raceDate = displayRace?.startTime ? formatRaceDate(displayRace.startTime) : null
  const raceSubtitle = hasRace
    ? [displayRace?.seriesName ?? 'Official Series', raceDate].filter(Boolean).join(' - ')
    : 'No official results available yet.'

  const carDisplay = displayRace?.carName ?? 'TBD'
  const incidentsDisplay =
    displayRace?.incidents !== null && displayRace?.incidents !== undefined
      ? `${displayRace.incidents}x`
      : 'N/A'

  const latestBadgeTitle = latestPodium ? 'Latest Podium' : 'Recent Result'
  const raceSummaryText = hasRace
    ? [finishPositionText, raceLocation ?? displayRace?.seriesName ?? null]
        .filter(Boolean)
        .join(' - ')
    : 'Awaiting next official race'

  const incidentsSummary = hasRace
    ? incidentsDisplay === 'N/A'
      ? 'Incidents pending'
      : `${incidentsDisplay} in last race`
    : 'No incident data yet'

  const iratingDisplay =
    overview?.irating !== null && overview?.irating !== undefined
      ? Math.round(overview.irating).toLocaleString()
      : 'N/A'
  const licenseDisplay =
    overview?.licenseDisplay ??
    (overview?.safetyRating !== null && overview?.safetyRating !== undefined
      ? overview.safetyRating.toFixed(2)
      : 'N/A')

  const winsDisplay =
    career?.wins !== null && career?.wins !== undefined
      ? Math.round(career.wins).toLocaleString()
      : sampleWinCount
      ? sampleWinCount.toLocaleString()
      : 'N/A'

  const podiumSource = career?.podiums ?? career?.top5 ?? null
  const podiumDisplay =
    podiumSource !== null && podiumSource !== undefined
      ? Math.round(podiumSource).toLocaleString()
      : samplePodiumCount
      ? samplePodiumCount.toLocaleString()
      : 'N/A'

  const podiumLabel = career?.podiums !== null && career?.podiums !== undefined ? 'Podiums' : 'Recent Podiums'
  const usesSamplePodiums = career?.podiums === null || career?.podiums === undefined
  const usesSampleWins = career?.wins === null || career?.wins === undefined
  const showSampleHint = usesSamplePodiums || usesSampleWins

  const quickStats = [
    {
      title: latestBadgeTitle.toUpperCase(),
      value: raceSummaryText,
      border: 'border-rr-gold/70',
      text: 'text-rr-gold',
      glow: '0 0 15px rgba(212, 175, 55, 0.8)',
    },
    {
      title: 'INCIDENTS',
      value: incidentsSummary,
      border: 'border-rr-neon-green/70',
      text: 'text-rr-neon-green',
      glow: '0 0 15px rgba(0, 255, 65, 0.8)',
    },
    {
      title: 'DRIVER SNAPSHOT',
      value: `iRating ${iratingDisplay} / License ${licenseDisplay}`,
      border: 'border-rr-electric-blue/70',
      text: 'text-rr-electric-blue',
      glow: '0 0 15px rgba(0, 191, 255, 0.8)',
    },
  ]

  return (
    <div className="min-h-screen bg-rr-black overflow-hidden">
      {/* EPIC RACING HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Hero Background Video/Image */}
        <div className="absolute inset-0 z-0">
          <video 
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay 
            muted 
            loop 
            playsInline
            poster="/hero-image-1.png"
          >
            <source src="/hero-racing-video.mp4" type="video/mp4" />
            {/* Fallback to image if video fails */}
            <img 
              src="/hero-image-1.png" 
              alt="Racing Action" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </video>
          
          {/* Enhanced dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-rr-black/85 via-rr-black/75 to-rr-black/85"></div>
          
          {/* Racing effects overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-rr-gold/5 to-transparent"></div>
        </div>

        {/* Animated Speed Lines */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="speed-line"></div>
          <div className="speed-line"></div>
          <div className="speed-line"></div>
          <div className="speed-line"></div>
          <div className="speed-line"></div>
        </div>
        
        {/* Checkered Flag Borders */}
        <div className="absolute top-0 left-0 w-full h-3 checkered-bg opacity-90 z-30"></div>
        <div className="absolute bottom-0 left-0 w-full h-3 checkered-bg opacity-90 z-30"></div>
        
        <div className="relative z-40 text-center max-w-7xl mx-auto px-4">
          
          {/* MASSIVE Title - Crystal Clear Gold */}
          <h1 className="font-heading text-7xl sm:text-8xl lg:text-9xl text-rr-gold mb-4 tracking-wider font-black" style={{textShadow: '0 0 40px rgba(212, 175, 55, 1), 0 0 80px rgba(212, 175, 55, 0.8), 0 6px 15px rgba(0, 0, 0, 1)'}}>
            ROCKY RACING
          </h1>
          
          {/* Dynamic Subtitle */}
          <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
            <Flag className="text-rr-gold animate-bounce" size={28} />
            <div className="text-center">
              <p className="font-heading text-3xl sm:text-4xl text-rr-gold font-black tracking-wide" style={{textShadow: '0 0 40px rgba(212, 175, 55, 1), 0 0 80px rgba(212, 175, 55, 0.8), 0 6px 15px rgba(0, 0, 0, 1)'}}>
                13-YEAR-OLD <span className="text-rr-neon-green font-black animate-pulse" style={{textShadow: '0 0 35px rgba(0, 255, 65, 1), 0 0 70px rgba(0, 255, 65, 0.8), 0 6px 15px rgba(0, 0, 0, 1)'}}>SPEED DEMON</span>
              </p>
              <p className="font-heading text-lg sm:text-xl text-rr-gold font-black mt-2" style={{textShadow: '0 0 35px rgba(212, 175, 55, 1), 0 0 70px rgba(212, 175, 55, 0.8), 0 5px 12px rgba(0, 0, 0, 1)'}}>
                🎮 iRACING CHAMPION IN THE MAKING 🎮
              </p>
            </div>
            <Flag className="text-rr-gold animate-bounce" size={28} />
          </div>
          
          {/* Epic Call to Action - Enhanced Readability */}
          <div className="bg-rr-black/85 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-rr-gold/60 shadow-2xl">
            <p className="text-2xl text-rr-white mb-2 font-bold" style={{textShadow: '0 2px 8px rgba(0, 0, 0, 0.9)'}}>
              🔥 CRUSHING THE COMPETITION 🔥
            </p>
            <p className="text-lg text-rr-white mb-4" style={{textShadow: '0 2px 6px rgba(0, 0, 0, 0.9)'}}>
              Epic iRacing content • Race highlights • Setup guides • 
              <span className="text-rr-neon-green font-bold animate-pulse" style={{textShadow: '0 0 20px rgba(0, 255, 65, 0.9)'}}> JOIN THE CREW! </span>
            </p>
          </div>
          
          {/* CTA Buttons - Bigger and Better */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="https://youtube.com/@rockyracing13"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-4 bg-gradient-to-r from-red-600 to-red-700 text-white px-12 py-5 rounded-2xl text-2xl font-bold hover:from-red-500 hover:to-red-600 transform hover:scale-110 transition-all duration-300 shadow-2xl"
            >
              <Youtube size={32} className="animate-pulse" />
              <div className="text-center">
                <div>SUBSCRIBE NOW!</div>
                <div className="text-sm opacity-90">🚀 FOR EPIC CONTENT</div>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
            </a>
            
            <Link
              href="/watch"
              className="inline-flex items-center gap-4 bg-gradient-to-r from-rr-gold to-rr-speed-yellow text-rr-black px-10 py-5 rounded-2xl text-xl font-bold hover:shadow-2xl transform hover:scale-110 transition-all duration-300 neon-glow"
            >
              <Play size={28} />
              <div>
                <div>WATCH RACES</div>
                <div className="text-sm opacity-80">🏁 LATEST WINS</div>
              </div>
            </Link>
            
            <Link
              href="/support"
              className="inline-flex items-center gap-4 border-3 border-rr-neon-green text-rr-neon-green px-10 py-5 rounded-2xl text-xl font-bold hover:bg-rr-neon-green hover:text-rr-black transition-all duration-300 backdrop-blur-sm bg-rr-black/30"
            >
              <Zap size={28} />
              <div>
                <div>SUPPORT MAX</div>
                <div className="text-sm opacity-80">⚡ NEXT LEVEL SETUP</div>
              </div>
            </Link>
          </div>

          {/* Quick Stats Bar - Enhanced Visibility */}
          <div className="mt-12 flex justify-center gap-8 flex-wrap">
            {quickStats.map(({ title, value, border, text, glow }) => (
              <div
                key={title}
                className={`bg-rr-black/90 backdrop-blur-sm rounded-xl px-6 py-3 border shadow-xl ${border}`}
              >
                <div className={`${text} font-bold text-lg`} style={{textShadow: glow}}>
                  {title}
                </div>
                <div className="text-rr-white text-sm" style={{textShadow: '0 2px 6px rgba(0, 0, 0, 0.9)'}}>
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED VIDEO SECTION - YouTube First! */}
      <section className="py-16 bg-gradient-to-br from-gray-950 to-rr-black relative">
        <div className="absolute inset-0 opacity-20">
          <div className="racing-gradient h-full"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-5xl text-rr-white mb-4">
              🔥 LATEST RACING ACTION 🔥
            </h2>
            <p className="text-xl text-gray-300">
              Check out Max tearing up the track in iRacing!
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Main Video */}
            <div className="relative group">
              <div className="bg-gradient-to-br from-rr-gold/20 to-rr-black border-2 border-rr-gold rounded-2xl overflow-hidden transform group-hover:scale-105 transition-all duration-300">
                <div className="aspect-video relative">
                  <video 
                    className="w-full h-full object-cover"
                    controls
                    poster="/rocky-racing-logo-bw.png"
                    preload="metadata"
                  >
                    <source src="/intro-video.mp4" type="video/mp4" />
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                      <div className="text-center">
                        <Play size={64} className="text-rr-gold mx-auto mb-4 animate-pulse" />
                        <p className="text-rr-white text-xl font-bold">ROCKY RACING INTRO</p>
                      </div>
                    </div>
                  </video>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-heading text-rr-gold mb-2">MEET THE TEAM!</h3>
                  <p className="text-gray-300 mb-4">Get to know Max and the Rocky Racing crew in this epic intro video!</p>
                  <div className="flex items-center gap-4">
                    <a 
                      href="https://youtube.com/@rockyracing13" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors duration-200"
                    >
                      <Youtube size={20} />
                      FULL CHANNEL
                    </a>
                    <div className="text-rr-neon-green font-bold">
                      ▶️ SUBSCRIBE FOR MORE!
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Racing Stats & Call to Action */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-rr-gold/15 to-rr-black border border-rr-gold/50 rounded-xl p-6 transform hover:scale-105 transition-all duration-300 shadow-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-rr-gold text-rr-black w-16 h-16 rounded-full flex items-center justify-center font-heading text-2xl shadow-lg">
                    {finishPositionText}
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading text-rr-white" style={{textShadow: '0 2px 6px rgba(0, 0, 0, 0.8)'}}>
                      {latestPodium ? 'Latest Podium Finish' : hasRace ? 'Most Recent Official Result' : 'Ready for the next grid'}
                    </h3>
                    <p className="text-rr-gold font-semibold" style={{textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)'}}>
                      {raceLocation || displayRace?.seriesName || 'Series TBA'}
                    </p>
                    {raceSubtitle && (
                      <p className="text-gray-300 text-xs mt-1" style={{textShadow: '0 1px 3px rgba(0, 0, 0, 0.7)'}}>
                        {raceSubtitle}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-300">Car:</span>
                    <p className="text-rr-white font-bold" style={{textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)'}}>{carDisplay}</p>
                  </div>
                  <div>
                    <span className="text-gray-300">Incidents:</span>
                    <p className="text-rr-neon-green font-bold" style={{textShadow: '0 0 10px rgba(0, 255, 65, 0.6)'}}>{incidentsDisplay}</p>
                  </div>
                </div>
                {error && (
                  <p className="mt-4 text-xs text-rr-racing-red/80" style={{textShadow: '0 1px 3px rgba(0, 0, 0, 0.6)'}}>
                    Live stats temporarily unavailable: {error}
                  </p>
                )}
                {showSampleHint && (
                  <p className="text-xs text-gray-400 mt-3">
                    Recent totals reflect the latest iRacing data; lifetime numbers update automatically when new stats publish.
                  </p>
                )}
              </div>

              <div className="text-center">
                <img 
                  src="/max-profile.jpg" 
                  alt="Max Racing" 
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-rr-gold shadow-xl"
                />
                <h3 className="text-2xl font-heading text-rr-white mb-2">MAX - AGE 13</h3>
                <p className="text-rr-gold font-bold mb-4">iRacing Champion in the Making! 🎮</p>
                <div className="flex justify-center gap-2">
                  <span className="bg-rr-neon-green/20 text-rr-neon-green px-3 py-1 rounded-full text-sm font-bold">CLEAN RACER</span>
                  <span className="bg-rr-electric-blue/20 text-rr-electric-blue px-3 py-1 rounded-full text-sm font-bold">CONTENT CREATOR</span>
                  <span className="bg-rr-racing-red/20 text-rr-racing-red px-3 py-1 rounded-full text-sm font-bold">SPEED DEMON</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RACING GOALS SECTION */}
      <section className="py-16 bg-rr-black relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-5xl text-rr-white mb-4">
              🎯 RACING MISSION 🎯
            </h2>
            <p className="text-xl text-gray-300">
              Building the Ultimate Racing Setup & Community!
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Compete */}
            <div className="group relative bg-gradient-to-br from-rr-gold/10 to-rr-black border border-rr-gold/30 rounded-xl p-6 transform hover:scale-105 hover:rotate-1 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-rr-gold/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <Trophy size={48} className="text-rr-gold mx-auto mb-4 animate-bounce" />
                <h3 className="font-heading text-2xl text-rr-white mb-3 text-center">DOMINATE</h3>
                <p className="text-gray-300 text-center">Crushing the competition in iRacing series with clean, fast racing! 🏁</p>
              </div>
            </div>
            
            {/* Learn & Share */}
            <div className="group relative bg-gradient-to-br from-rr-electric-blue/10 to-rr-black border border-rr-electric-blue/30 rounded-xl p-6 transform hover:scale-105 hover:-rotate-1 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-rr-electric-blue/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <Gamepad2 size={48} className="text-rr-electric-blue mx-auto mb-4 animate-pulse" />
                <h3 className="font-heading text-2xl text-rr-white mb-3 text-center">CREATE</h3>
                <p className="text-gray-300 text-center">Epic YouTube content with racing tips, setups, and behind-the-scenes! 📹</p>
              </div>
            </div>
            
            {/* Community */}
            <div className="group relative bg-gradient-to-br from-rr-neon-green/10 to-rr-black border border-rr-neon-green/30 rounded-xl p-6 transform hover:scale-105 hover:rotate-1 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-rr-neon-green/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 text-center">
                <div className="w-12 h-12 mx-auto mb-4">
                  <img 
                    src="/rocky-gecko.jpg" 
                    alt="Rocky the Gecko" 
                    className="w-12 h-12 rounded-full object-cover border-2 border-rr-neon-green shadow-lg mx-auto animate-spin"
                  />
                </div>
                <h3 className="font-heading text-2xl text-rr-white mb-3">COMMUNITY</h3>
                <p className="text-gray-300">Building the coolest racing community with Rocky the Gecko! 🦎</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUPPORT SECTION - Funding Goal */}
      <section className="py-16 bg-gradient-to-br from-gray-950 via-rr-black to-gray-950 relative">
        <div className="absolute inset-0 opacity-30">
          <div className="checkered-bg h-full"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-5xl text-rr-white mb-4">
            ⚡ NEXT LEVEL SETUP ⚡
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Help Max get the ultimate racing rig for even BETTER content!
          </p>
          
          <div className="bg-gradient-to-br from-rr-gold/20 to-rr-black border-2 border-rr-gold rounded-2xl p-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-heading text-2xl text-rr-gold">🎯 DIRECT DRIVE WHEEL</h3>
              <span className="text-rr-white text-xl font-bold">$750 / $2500</span>
            </div>
            
            <div className="w-full bg-gray-800 rounded-full h-6 mb-4">
              <div 
                className="bg-gradient-to-r from-rr-gold via-rr-speed-yellow to-rr-gold h-6 rounded-full neon-glow"
                style={{ width: '30%' }}
              />
            </div>
            
            <div className="flex justify-between text-lg text-rr-white font-bold">
              <span>30% FUNDED! 🔥</span>
              <span>70% TO GO! 🚀</span>
            </div>
            
            <Link 
              href="/support" 
              className="inline-block mt-6 bg-gradient-to-r from-rr-neon-green to-green-400 text-rr-black px-8 py-4 rounded-xl text-xl font-bold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              💝 SUPPORT THE DREAM!
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
