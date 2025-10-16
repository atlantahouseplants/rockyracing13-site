import { Metadata } from 'next'
import { Users, Heart, Trophy, Target, Flag, Play } from 'lucide-react'
import Link from 'next/link'
import { getDriverData } from '@/lib/iracing'

export const metadata: Metadata = {
  title: 'About Rocky Racing - Our Story & Mission',
  description: 'Learn about the father-son team behind Rocky Racing, our gecko mascot Rocky, and the values that drive our journey from sim to reality.',
}

export default async function About() {
  const driverData = await getDriverData()
  const { overview, career, error } = driverData

  const iratingDisplay = overview?.irating !== null && overview?.irating !== undefined
    ? Math.round(overview.irating).toLocaleString()
    : '~2100'

  const podiumDisplay = career?.podiums !== null && career?.podiums !== undefined
    ? career.podiums.toString()
    : '3+'

  const safetyRatingDisplay = overview?.safetyRating !== null && overview?.safetyRating !== undefined
    ? overview.safetyRating >= 4.0 ? 'A+' : overview.safetyRating >= 3.0 ? 'B+' : 'C+'
    : 'A+'
  const values = [
    {
      icon: Trophy,
      title: 'Sportsmanship',
      description: 'Racing clean and fair, respecting competitors and the spirit of motorsports.',
      color: 'gold'
    },
    {
      icon: Heart,
      title: 'Transparency', 
      description: 'Open about our journey, finances, and challenges. Building trust with our community.',
      color: 'racing-red'
    },
    {
      icon: Users,
      title: 'Inclusion',
      description: 'Welcoming everyone to our community regardless of experience or background.',
      color: 'electric-blue'
    },
    {
      icon: Target,
      title: 'Growth',
      description: 'Constantly learning, improving, and sharing knowledge with others.',
      color: 'neon-green'
    }
  ]

  return (
    <div className="min-h-screen bg-rr-black overflow-hidden">
      {/* EPIC ABOUT HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Hero Background Video */}
        <div className="absolute inset-0 z-0">
          <video 
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay 
            muted 
            loop 
            playsInline
            poster="/max-profile.jpg"
          >
            <source src="/aboutpageheroimage.mp4" type="video/mp4" />
            {/* Fallback to image if video fails */}
            <img 
              src="/max-profile.jpg" 
              alt="Max Racing" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </video>
          
          {/* Enhanced dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-rr-black/85 via-rr-black/75 to-rr-black/85"></div>
          
          {/* Racing effects overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-rr-gold/10 to-transparent"></div>
        </div>

        {/* Animated Speed Lines */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="speed-line"></div>
          <div className="speed-line"></div>
          <div className="speed-line"></div>
        </div>
        
        {/* Checkered Flag Borders */}
        <div className="absolute top-0 left-0 w-full h-3 checkered-bg opacity-90 z-30"></div>
        <div className="absolute bottom-0 left-0 w-full h-3 checkered-bg opacity-90 z-30"></div>
        
        <div className="relative z-40 text-center max-w-7xl mx-auto px-4">
          {/* EPIC Title */}
          <h1 className="font-heading text-6xl sm:text-7xl lg:text-8xl text-rr-gold mb-4 tracking-wider font-black" style={{textShadow: '0 0 40px rgba(212, 175, 55, 1), 0 0 80px rgba(212, 175, 55, 0.8), 0 6px 15px rgba(0, 0, 0, 1)'}}>
            OUR STORY
          </h1>
          
          {/* Dynamic Subtitle */}
          <div className="flex items-center justify-center gap-4 mb-8 flex-wrap">
            <Flag className="text-rr-gold animate-bounce" size={28} />
            <div className="text-center">
              <p className="font-heading text-2xl sm:text-3xl text-rr-gold font-black tracking-wide" style={{textShadow: '0 0 35px rgba(212, 175, 55, 1), 0 0 70px rgba(212, 175, 55, 0.8), 0 5px 12px rgba(0, 0, 0, 1)'}}>
                FATHER-SON <span className="text-rr-neon-green font-black" style={{textShadow: '0 0 30px rgba(0, 255, 65, 1), 0 0 60px rgba(0, 255, 65, 0.8), 0 5px 12px rgba(0, 0, 0, 1)'}}>RACING DYNASTY</span>
              </p>
              <p className="font-heading text-lg sm:text-xl text-rr-white font-bold mt-2" style={{textShadow: '0 0 20px rgba(0, 0, 0, 1), 0 0 40px rgba(0, 0, 0, 0.9), 0 4px 12px rgba(0, 0, 0, 1), 1px 1px 0px rgba(0, 0, 0, 1)'}}>
                🏁 FROM SIM TO REALITY • BUILDING LEGENDS 🏁
              </p>
            </div>
            <Flag className="text-rr-gold animate-bounce" size={28} />
          </div>
          
          {/* Epic Call to Action */}
          <div className="bg-rr-black/85 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-rr-gold/60 shadow-2xl">
            <p className="text-xl text-rr-white mb-2 font-bold" style={{textShadow: '0 2px 6px rgba(0, 0, 0, 0.9)'}}>
              ⚡ THE JOURNEY BEGINS ⚡
            </p>
            <p className="text-lg text-rr-white" style={{textShadow: '0 2px 6px rgba(0, 0, 0, 0.9)'}}>
              13-year-old prodigy • Gecko mascot • 
              <span className="text-rr-neon-green font-bold animate-pulse" style={{textShadow: '0 0 20px rgba(0, 255, 65, 0.9)'}}> RACING DREAMS! </span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/team"
              className="inline-flex items-center gap-4 bg-gradient-to-r from-rr-gold to-rr-speed-yellow text-rr-black px-10 py-5 rounded-2xl text-xl font-bold hover:shadow-2xl transform hover:scale-110 transition-all duration-300 neon-glow"
            >
              <Users size={28} />
              <div>
                <div>MEET THE TEAM</div>
                <div className="text-sm opacity-80">👨‍👦 FAMILY FIRST</div>
              </div>
            </Link>
            
            <Link
              href="/watch"
              className="inline-flex items-center gap-4 border-3 border-rr-neon-green text-rr-neon-green px-10 py-5 rounded-2xl text-xl font-bold hover:bg-rr-neon-green hover:text-rr-black transition-all duration-300 backdrop-blur-sm bg-rr-black/30"
            >
              <Play size={28} />
              <div>
                <div>WATCH RACES</div>
                <div className="text-sm opacity-80">🎥 EPIC CONTENT</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* RACING ORIGIN STORY */}
      <section className="py-16 bg-gradient-to-br from-gray-950 to-rr-black relative">
        <div className="absolute inset-0 opacity-20">
          <div className="racing-gradient h-full"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Story Content */}
            <div>
              <h2 className="font-heading text-4xl text-rr-gold mb-6" style={{textShadow: '0 0 20px rgba(212, 175, 55, 0.8)'}}>
                🏎️ RACING DYNASTY BEGINS
              </h2>
              <div className="space-y-6 text-gray-100 text-lg">
                <p className="leading-relaxed">
                  <span className="text-rr-gold font-bold">Rocky Racing</span> exploded onto the scene in early 2024 as a 
                  father-son passion project that quickly became something extraordinary. What started as weekend 
                  racing sessions evolved into a <span className="text-rr-neon-green font-bold">community phenomenon</span>.
                </p>
                <p className="leading-relaxed">
                  At just <span className="text-rr-speed-yellow font-bold">13 years old</span>, Max approaches sim racing with the intensity 
                  of a professional driver. From analyzing telemetry data to perfecting racing lines, 
                  he&apos;s already showing the dedication that builds <span className="text-rr-racing-red font-bold">champions</span>.
                </p>
                <p className="leading-relaxed">
                  As team manager and dad, I handle the business operations while providing guidance and support. 
                  Together, we&apos;re building something special - a <span className="text-rr-electric-blue font-bold">transparent, community-focused racing team</span> that 
                  values clean competition above everything else.
                </p>
              </div>
              
              {/* Racing Stats */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-rr-black/90 backdrop-blur-md rounded-xl p-4 border-2 border-rr-gold/60 shadow-xl">
                  <div className="text-rr-gold font-bold text-lg" style={{textShadow: '0 0 15px rgba(212, 175, 55, 0.8), 0 2px 6px rgba(0, 0, 0, 1)'}}>🏆 PODIUM FINISHES</div>
                  <div className="text-rr-white text-2xl font-black" style={{textShadow: '0 2px 8px rgba(0, 0, 0, 1), 1px 1px 0px rgba(0, 0, 0, 1)'}}>{podiumDisplay}</div>
                </div>
                <div className="bg-rr-black/90 backdrop-blur-md rounded-xl p-4 border-2 border-rr-neon-green/60 shadow-xl">
                  <div className="text-rr-neon-green font-bold text-lg" style={{textShadow: '0 0 15px rgba(0, 255, 65, 0.8), 0 2px 6px rgba(0, 0, 0, 1)'}}>✅ SAFETY RATING</div>
                  <div className="text-rr-white text-2xl font-black" style={{textShadow: '0 2px 8px rgba(0, 0, 0, 1), 1px 1px 0px rgba(0, 0, 0, 1)'}}>{safetyRatingDisplay}</div>
                </div>
              </div>
            </div>
            
            {/* Max Profile Card - Enhanced */}
            <div className="bg-gradient-to-br from-rr-gold/20 to-rr-black border-2 border-rr-gold rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-6">
                  <img 
                    src="/max-profile.jpg" 
                    alt="Max - Rocky Racing Driver" 
                    className="w-32 h-32 rounded-full object-cover border-4 border-rr-gold shadow-xl"
                  />
                </div>
                <h3 className="font-heading text-2xl text-rr-white mb-2" style={{textShadow: '0 2px 6px rgba(0, 0, 0, 0.8)'}}>
                  MAX - AGE 13
                </h3>
                <p className="text-rr-gold font-bold text-lg mb-6">Driver & Content Creator 🎮</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-rr-black/80 border border-gray-600/20 rounded-lg p-3">
                    <span className="text-rr-white font-semibold" style={{textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)'}}>iRating:</span>
                    <span className="text-rr-gold font-bold" style={{textShadow: '0 0 10px rgba(212, 175, 55, 0.6), 0 2px 4px rgba(0, 0, 0, 0.8)'}}>{iratingDisplay} 📈</span>
                  </div>
                  <div className="flex justify-between items-center bg-rr-black/80 border border-gray-600/20 rounded-lg p-3">
                    <span className="text-rr-white font-semibold" style={{textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)'}}>Favorite Car:</span>
                    <span className="text-rr-white font-bold" style={{textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)'}}>Porsche GT3 🏎️</span>
                  </div>
                  <div className="flex justify-between items-center bg-rr-black/80 border border-gray-600/20 rounded-lg p-3">
                    <span className="text-rr-white font-semibold" style={{textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)'}}>Favorite Track:</span>
                    <span className="text-rr-white font-bold" style={{textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)'}}>Spa-Francorchamps 🇧🇪</span>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-center gap-2 flex-wrap">
                  <span className="bg-rr-neon-green/20 text-rr-neon-green px-3 py-1 rounded-full text-sm font-bold">CLEAN RACER</span>
                  <span className="bg-rr-electric-blue/20 text-rr-electric-blue px-3 py-1 rounded-full text-sm font-bold">CONTENT CREATOR</span>
                  <span className="bg-rr-racing-red/20 text-rr-racing-red px-3 py-1 rounded-full text-sm font-bold">SPEED DEMON</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROCKY THE MASCOT - Enhanced */}
      <section className="py-16 bg-rr-black relative">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="font-heading text-5xl text-rr-white mb-4">
            🦎 MEET ROCKY 🦎
          </h2>
          <p className="text-xl text-rr-gold mb-8 font-bold">
            OUR GECKO MASCOT & GOOD LUCK CHARM!
          </p>
          
          <div className="bg-gradient-to-br from-rr-neon-green/15 to-rr-black border-2 border-rr-neon-green rounded-2xl p-8 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="w-48 h-48 mx-auto">
                <img 
                  src="/rocky-gecko.jpg" 
                  alt="Rocky the Gecko - Team Mascot" 
                  className="w-48 h-48 rounded-full object-cover border-4 border-rr-neon-green shadow-2xl mx-auto animate-spin slow-spin"
                  style={{animation: 'spin 10s linear infinite'}}
                />
              </div>
              <div className="text-left">
                <p className="text-rr-white text-lg leading-relaxed mb-4" style={{textShadow: '0 0 15px rgba(0, 0, 0, 1), 0 4px 8px rgba(0, 0, 0, 0.95), 1px 1px 0px rgba(0, 0, 0, 1)'}}>
                  Every legendary racing team needs an epic mascot, and ours is <span className="text-rr-neon-green font-bold" style={{textShadow: '0 0 20px rgba(0, 255, 65, 0.8), 0 4px 8px rgba(0, 0, 0, 1), 1px 1px 0px rgba(0, 0, 0, 1)'}}>Rocky the Gecko</span>!
                  This little speed demon has been our good luck charm since day one.
                </p>
                <p className="text-rr-white text-lg leading-relaxed mb-6" style={{textShadow: '0 0 15px rgba(0, 0, 0, 1), 0 4px 8px rgba(0, 0, 0, 0.95), 1px 1px 0px rgba(0, 0, 0, 1)'}}>
                  Whether he&apos;s perched on Max&apos;s monitor during intense races or starring in our content,
                  Rocky represents the <span className="text-rr-gold font-bold" style={{textShadow: '0 0 20px rgba(212, 175, 55, 0.8), 0 4px 8px rgba(0, 0, 0, 1), 1px 1px 0px rgba(0, 0, 0, 1)'}}>fun, approachable side</span> of our serious racing efforts.
                  Those distinctive gold scales even inspired our team colors!
                </p>
                
                <div className="bg-rr-black/80 rounded-xl p-4 border-2 border-rr-neon-green/70 shadow-xl">
                  <div className="text-rr-neon-green font-bold text-lg" style={{textShadow: '0 0 15px rgba(0, 255, 65, 0.8)'}}>🎯 ROCKY&apos;S RACING RECORD:</div>
                  <div className="text-rr-white mt-2 font-semibold" style={{textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)'}}>✅ Present for every podium finish</div>
                  <div className="text-rr-white font-semibold" style={{textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)'}}>✅ 0 incidents caused (clean racer!)</div>
                  <div className="text-rr-white font-semibold" style={{textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)'}}>✅ 100% good vibes brought</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RACING VALUES - Enhanced */}
      <section className="py-16 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-5xl text-rr-white mb-4">
              🏁 OUR RACING CODE 🏁
            </h2>
            <p className="text-xl text-rr-gold font-bold">
              The principles that drive every lap, every race, every victory!
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const getColorClasses = (color: string) => {
                switch(color) {
                  case 'gold': return {
                    bg: 'from-rr-gold/20 to-rr-black',
                    border: 'border-rr-gold/70',
                    icon: 'text-rr-gold',
                    shadow: '0 0 15px rgba(212, 175, 55, 0.8)'
                  }
                  case 'racing-red': return {
                    bg: 'from-rr-racing-red/20 to-rr-black', 
                    border: 'border-rr-racing-red/70',
                    icon: 'text-rr-racing-red',
                    shadow: '0 0 15px rgba(255, 0, 64, 0.8)'
                  }
                  case 'electric-blue': return {
                    bg: 'from-rr-electric-blue/20 to-rr-black',
                    border: 'border-rr-electric-blue/70', 
                    icon: 'text-rr-electric-blue',
                    shadow: '0 0 15px rgba(0, 191, 255, 0.8)'
                  }
                  case 'neon-green': return {
                    bg: 'from-rr-neon-green/20 to-rr-black',
                    border: 'border-rr-neon-green/70',
                    icon: 'text-rr-neon-green', 
                    shadow: '0 0 15px rgba(0, 255, 65, 0.8)'
                  }
                  default: return {
                    bg: 'from-rr-gold/20 to-rr-black',
                    border: 'border-rr-gold/70',
                    icon: 'text-rr-gold',
                    shadow: '0 0 15px rgba(212, 175, 55, 0.8)'
                  }
                }
              }
              const colors = getColorClasses(value.color)
              return (
                <div key={index} className={`bg-gradient-to-br ${colors.bg} border-2 ${colors.border} rounded-xl p-6 text-center shadow-xl transform hover:scale-105 hover:rotate-1 transition-all duration-300`}>
                  <value.icon size={48} className={`${colors.icon} mx-auto mb-4`} style={{filter: `drop-shadow(${colors.shadow})`}} />
                  <h3 className="font-heading text-xl text-rr-white mb-3 font-bold" style={{textShadow: '0 2px 6px rgba(0, 0, 0, 0.9)'}}>{value.title}</h3>
                  <p className="text-rr-white text-sm leading-relaxed" style={{textShadow: '0 1px 4px rgba(0, 0, 0, 0.8)'}}>{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* PARENT SUPERVISION - Enhanced */}
      <section className="py-12 bg-gradient-to-r from-blue-950/50 to-rr-black border-t-2 border-blue-500/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-br from-blue-900/30 to-rr-black border-2 border-blue-500/50 rounded-xl p-6 shadow-xl">
            <h3 className="font-heading text-xl text-blue-400 mb-3 font-bold" style={{textShadow: '0 0 10px rgba(59, 130, 246, 0.6)'}}>
              🛡️ PARENT-SUPERVISED OPERATIONS 🛡️
            </h3>
            <p className="text-rr-white leading-relaxed" style={{textShadow: '0 2px 6px rgba(0, 0, 0, 0.9)'}}>
              All communications, content creation, and business activities are supervised and managed by Max&apos;s
              parents. We maintain a <span className="text-blue-400 font-bold" style={{textShadow: '0 0 10px rgba(59, 130, 246, 0.6), 0 2px 4px rgba(0, 0, 0, 0.8)'}}>safe, educational environment</span> while pursuing our racing goals.
              For business inquiries or partnerships, contact <span className="text-rr-gold font-bold" style={{textShadow: '0 0 10px rgba(212, 175, 55, 0.6), 0 2px 4px rgba(0, 0, 0, 0.8)'}}>max@rockyracing13.com</span>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}