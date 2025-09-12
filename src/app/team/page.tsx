import { Metadata } from 'next'
import { Users, Flag, Youtube, Mail, Download } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Rocky Racing Team - Meet Our Drivers',
  description: 'Meet the Rocky Racing team members, download our media kit, and learn about our Friends of Rocky Racing community.',
}

export default function Team() {
  const achievements = [
    { icon: '🏆', text: 'P3 at Road America - IMSA Challenge', color: 'gold' },
    { icon: '✅', text: 'Multiple clean races with 0x incidents', color: 'neon-green' },
    { icon: '📈', text: 'Consistent iRating growth to 2100+', color: 'electric-blue' },
    { icon: '🎥', text: 'Growing YouTube community @rockyracing13', color: 'racing-red' },
  ]

  return (
    <div className="min-h-screen bg-rr-black overflow-hidden">
      {/* EPIC TEAM HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-image-2.png" 
            alt="Racing Team" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          
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
            TEAM ROCKY
          </h1>
          
          {/* Dynamic Subtitle */}
          <div className="flex items-center justify-center gap-4 mb-8 flex-wrap">
            <Flag className="text-rr-gold animate-bounce" size={28} />
            <div className="text-center">
              <p className="font-heading text-2xl sm:text-3xl text-rr-gold font-black tracking-wide" style={{textShadow: '0 0 35px rgba(212, 175, 55, 1), 0 0 70px rgba(212, 175, 55, 0.8), 0 5px 12px rgba(0, 0, 0, 1)'}}>
                MEET THE <span className="text-rr-neon-green font-black" style={{textShadow: '0 0 30px rgba(0, 255, 65, 1), 0 0 60px rgba(0, 255, 65, 0.8), 0 5px 12px rgba(0, 0, 0, 1)'}}>RACING LEGENDS</span>
              </p>
              <p className="font-heading text-lg sm:text-xl text-rr-white font-bold mt-2" style={{textShadow: '0 2px 8px rgba(0, 0, 0, 0.95)'}}>
                🏁 FATHER • SON • GECKO MASCOT 🏁
              </p>
            </div>
            <Flag className="text-rr-gold animate-bounce" size={28} />
          </div>
          
          {/* Epic Call to Action */}
          <div className="bg-rr-black/85 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-rr-gold/60 shadow-2xl">
            <p className="text-xl text-rr-white mb-2 font-bold" style={{textShadow: '0 2px 6px rgba(0, 0, 0, 0.9)'}}>
              ⚡ RACING DYNASTY ⚡
            </p>
            <p className="text-lg text-rr-white" style={{textShadow: '0 2px 6px rgba(0, 0, 0, 0.9)'}}>
              Building champions • Creating content • 
              <span className="text-rr-neon-green font-bold animate-pulse" style={{textShadow: '0 0 20px rgba(0, 255, 65, 0.9)'}}> LIVING THE DREAM! </span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="https://youtube.com/@rockyracing13"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 bg-gradient-to-r from-red-600 to-red-700 text-white px-10 py-5 rounded-2xl text-xl font-bold hover:shadow-2xl transform hover:scale-110 transition-all duration-300 neon-glow"
            >
              <Youtube size={28} />
              <div>
                <div>FOLLOW US</div>
                <div className="text-sm opacity-80">📺 EPIC CONTENT</div>
              </div>
            </a>
            
            <Link
              href="/about"
              className="inline-flex items-center gap-4 border-3 border-rr-neon-green text-rr-neon-green px-10 py-5 rounded-2xl text-xl font-bold hover:bg-rr-neon-green hover:text-rr-black transition-all duration-300 backdrop-blur-sm bg-rr-black/30"
            >
              <Users size={28} />
              <div>
                <div>OUR STORY</div>
                <div className="text-sm opacity-80">🏎️ THE JOURNEY</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* MAX - THE RACING PRODIGY */}
      <section className="py-16 bg-gradient-to-br from-gray-950 to-rr-black relative">
        <div className="absolute inset-0 opacity-20">
          <div className="racing-gradient h-full"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-5xl text-rr-white mb-4">
              🏎️ MAX - THE RACING PRODIGY 🏎️
            </h2>
            <p className="text-xl text-rr-gold font-bold">
              13-YEAR-OLD SPEED DEMON TAKING iRACING BY STORM!
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Max Profile Section */}
            <div className="bg-gradient-to-br from-rr-gold/20 to-rr-black border-2 border-rr-gold rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="w-40 h-40 mx-auto mb-6">
                  <img 
                    src="/max-profile.jpg" 
                    alt="Max - Rocky Racing Driver" 
                    className="w-40 h-40 rounded-full object-cover border-4 border-rr-gold shadow-2xl"
                  />
                </div>
                <h3 className="font-heading text-3xl text-rr-white mb-2" style={{textShadow: '0 2px 6px rgba(0, 0, 0, 0.8)'}}>
                  MAX HENDERSON
                </h3>
                <p className="text-rr-gold font-bold text-xl mb-6">Lead Driver & Content Creator 🎮</p>
                
                <div className="bg-rr-black/60 rounded-xl p-6 mb-6">
                  <p className="text-gray-100 text-lg leading-relaxed">
                    At just <span className="text-rr-speed-yellow font-bold">13 years old</span>, Max brings natural talent and 
                    unwavering dedication to every race. From analyzing telemetry data to perfecting racing lines, 
                    he approaches sim racing with the <span className="text-rr-racing-red font-bold">intensity of a pro driver</span>.
                  </p>
                </div>
                
                <div className="flex justify-center gap-2 flex-wrap">
                  <span className="bg-rr-neon-green/20 text-rr-neon-green px-4 py-2 rounded-full text-sm font-bold">CLEAN RACER</span>
                  <span className="bg-rr-electric-blue/20 text-rr-electric-blue px-4 py-2 rounded-full text-sm font-bold">CONTENT CREATOR</span>
                  <span className="bg-rr-racing-red/20 text-rr-racing-red px-4 py-2 rounded-full text-sm font-bold">SPEED DEMON</span>
                </div>
              </div>
            </div>
            
            {/* Racing Stats & Achievements */}
            <div className="space-y-6">
              {/* Stats Card */}
              <div className="bg-gradient-to-br from-rr-electric-blue/15 to-rr-black border-2 border-rr-electric-blue/60 rounded-xl p-6 shadow-xl">
                <h3 className="font-heading text-2xl text-rr-electric-blue mb-4" style={{textShadow: '0 0 15px rgba(0, 191, 255, 0.8)'}}>
                  📊 RACING STATS
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-rr-black/50 rounded-lg p-3 text-center">
                    <div className="text-rr-gold font-bold text-lg">iRating</div>
                    <div className="text-rr-white text-2xl font-black">~2100</div>
                  </div>
                  <div className="bg-rr-black/50 rounded-lg p-3 text-center">
                    <div className="text-rr-neon-green font-bold text-lg">Safety</div>
                    <div className="text-rr-white text-2xl font-black">A+</div>
                  </div>
                  <div className="bg-rr-black/50 rounded-lg p-3 text-center">
                    <div className="text-rr-racing-red font-bold text-lg">Podiums</div>
                    <div className="text-rr-white text-2xl font-black">3+</div>
                  </div>
                  <div className="bg-rr-black/50 rounded-lg p-3 text-center">
                    <div className="text-rr-speed-yellow font-bold text-lg">Wins</div>
                    <div className="text-rr-white text-2xl font-black">1</div>
                  </div>
                </div>
              </div>
              
              {/* Achievements */}
              <div className="bg-gradient-to-br from-rr-neon-green/15 to-rr-black border-2 border-rr-neon-green/60 rounded-xl p-6 shadow-xl">
                <h3 className="font-heading text-2xl text-rr-neon-green mb-4" style={{textShadow: '0 0 15px rgba(0, 255, 65, 0.8)'}}>
                  🏆 RECENT ACHIEVEMENTS
                </h3>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="bg-rr-black/50 rounded-lg p-3 flex items-center gap-4">
                      <span className="text-2xl">{achievement.icon}</span>
                      <span className="text-gray-100 text-sm leading-relaxed flex-1">{achievement.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Favorite Setup */}
              <div className="bg-gradient-to-br from-rr-gold/15 to-rr-black border-2 border-rr-gold/60 rounded-xl p-6 shadow-xl">
                <h3 className="font-heading text-2xl text-rr-gold mb-4" style={{textShadow: '0 0 15px rgba(212, 175, 55, 0.8)'}}>
                  🏎️ FAVORITE SETUP
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-rr-black/50 rounded-lg p-3">
                    <span className="text-gray-300">Car:</span>
                    <span className="text-rr-white font-bold">Porsche 992 GT3 Cup 🏎️</span>
                  </div>
                  <div className="flex justify-between items-center bg-rr-black/50 rounded-lg p-3">
                    <span className="text-gray-300">Track:</span>
                    <span className="text-rr-white font-bold">Spa-Francorchamps 🇧🇪</span>
                  </div>
                  <div className="flex justify-between items-center bg-rr-black/50 rounded-lg p-3">
                    <span className="text-gray-300">Series:</span>
                    <span className="text-rr-white font-bold">IMSA Michelin Pilot Challenge</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM SUPPORT - DAD & ROCKY */}
      <section className="py-16 bg-rr-black relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-5xl text-rr-white mb-4">
              👨‍👦 THE SUPPORT CREW 👨‍👦
            </h2>
            <p className="text-xl text-rr-gold font-bold">
              EVERY CHAMPION NEEDS AN EPIC TEAM!
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Dad - Team Manager */}
            <div className="bg-gradient-to-br from-rr-electric-blue/15 to-rr-black border-2 border-rr-electric-blue/60 rounded-xl p-8 shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="w-24 h-24 bg-rr-electric-blue/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users size={48} className="text-rr-electric-blue" />
                </div>
                <h3 className="font-heading text-2xl text-rr-white mb-3" style={{textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)'}}>
                  DAD & TEAM MANAGER
                </h3>
                <p className="text-rr-electric-blue font-bold text-lg mb-4">The Strategic Mastermind 🧠</p>
                <div className="bg-rr-black/60 rounded-xl p-4 mb-6">
                  <p className="text-gray-100 leading-relaxed">
                    Handles all business operations, content strategy, and provides guidance. 
                    Every great driver needs a <span className="text-rr-electric-blue font-bold">strategic mind</span> behind the scenes. 
                    All communications are parent-supervised for safety and professionalism.
                  </p>
                </div>
                <div className="flex justify-center gap-2 flex-wrap">
                  <span className="bg-rr-electric-blue/20 text-rr-electric-blue px-3 py-1 rounded-full text-sm font-bold">TEAM MANAGER</span>
                  <span className="bg-rr-gold/20 text-rr-gold px-3 py-1 rounded-full text-sm font-bold">STRATEGIST</span>
                  <span className="bg-rr-neon-green/20 text-rr-neon-green px-3 py-1 rounded-full text-sm font-bold">MENTOR</span>
                </div>
              </div>
            </div>
            
            {/* Rocky - Team Mascot */}
            <div className="bg-gradient-to-br from-rr-neon-green/15 to-rr-black border-2 border-rr-neon-green/60 rounded-xl p-8 shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6">
                  <img 
                    src="/rocky-gecko.jpg" 
                    alt="Rocky the Gecko - Team Mascot" 
                    className="w-24 h-24 rounded-full object-cover border-4 border-rr-neon-green shadow-xl animate-pulse"
                  />
                </div>
                <h3 className="font-heading text-2xl text-rr-white mb-3" style={{textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)'}}>
                  ROCKY THE GECKO
                </h3>
                <p className="text-rr-neon-green font-bold text-lg mb-4">Team Mascot & Good Luck Charm 🦎</p>
                <div className="bg-rr-black/60 rounded-xl p-4 mb-6">
                  <p className="text-gray-100 leading-relaxed">
                    Our legendary mascot and the <span className="text-rr-neon-green font-bold">heart of the team</span>! 
                    Rocky has been present for every podium finish and brings the good vibes that 
                    make racing fun. His golden scales inspired our team colors!
                  </p>
                </div>
                <div className="bg-rr-black/50 rounded-lg p-3">
                  <div className="text-rr-neon-green font-bold text-sm">🏆 ROCKY&apos;S RECORD:</div>
                  <div className="text-rr-white text-sm mt-1">✅ 100% podium attendance</div>
                  <div className="text-rr-white text-sm">✅ 0 bad luck incidents</div>
                  <div className="text-rr-white text-sm">✅ Maximum good vibes delivered</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MEDIA KIT & CONTACT */}
      <section className="py-16 bg-gradient-to-br from-gray-950 via-rr-black to-gray-950 relative">
        <div className="absolute inset-0 opacity-30">
          <div className="checkered-bg h-full"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-5xl text-rr-white mb-4">
            📰 MEDIA & PRESS 📰
          </h2>
          <p className="text-xl text-rr-gold mb-8 font-bold">
            Want to feature Rocky Racing? We&apos;ve got you covered!
          </p>
          
          <div className="bg-gradient-to-br from-rr-gold/20 to-rr-black border-2 border-rr-gold rounded-2xl p-8 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-left">
                <h3 className="font-heading text-2xl text-rr-gold mb-4">📦 MEDIA KIT INCLUDES:</h3>
                <ul className="space-y-2 text-gray-100">
                  <li className="flex items-center gap-3">
                    <span className="text-rr-neon-green">✅</span>
                    High-resolution team photos
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-rr-neon-green">✅</span>
                    Rocky Racing logos & branding
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-rr-neon-green">✅</span>
                    Racing statistics & achievements
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-rr-neon-green">✅</span>
                    Team biography & story
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-rr-neon-green">✅</span>
                    Rocky the Gecko photos
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <button className="w-full bg-gradient-to-r from-rr-gold to-rr-speed-yellow text-rr-black px-6 py-4 rounded-xl text-lg font-bold hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                  <Download size={24} className="inline mr-2" />
                  MEDIA KIT (Coming Soon)
                </button>
                
                <a 
                  href="mailto:max@rockyracing13.com"
                  className="w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-rr-neon-green to-green-400 text-rr-black px-6 py-4 rounded-xl text-lg font-bold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <Mail size={24} />
                  CONTACT TEAM ROCKY
                </a>
                
                <p className="text-gray-300 text-sm">
                  For partnerships, sponsorships, or press inquiries
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARENT SUPERVISION NOTICE */}
      <section className="py-12 bg-gradient-to-r from-blue-950/50 to-rr-black border-t-2 border-blue-500/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-br from-blue-900/30 to-rr-black border-2 border-blue-500/50 rounded-xl p-6 shadow-xl">
            <h3 className="font-heading text-xl text-blue-400 mb-3 font-bold" style={{textShadow: '0 0 10px rgba(59, 130, 246, 0.6)'}}>
              🛡️ PARENT-SUPERVISED OPERATIONS 🛡️
            </h3>
            <p className="text-gray-200 leading-relaxed">
              All team communications, content creation, and business activities are supervised and managed by Max&apos;s 
              parents. We maintain a <span className="text-blue-400 font-bold">safe, educational environment</span> while pursuing our racing goals. 
              For all business inquiries, please contact <span className="text-rr-gold font-bold">max@rockyracing13.com</span>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}