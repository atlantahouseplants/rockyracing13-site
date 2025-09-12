import Link from 'next/link'
import { Play, Zap, Trophy, Target, Youtube, Gamepad2, Flag, Users, TrendingUp } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-rr-black overflow-hidden">
      {/* RACING HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-rr-black via-gray-900 to-rr-black">
        {/* Animated Speed Lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="speed-line"></div>
          <div className="speed-line"></div>
          <div className="speed-line"></div>
          <div className="speed-line"></div>
          <div className="speed-line"></div>
        </div>
        
        {/* Checkered Flag Pattern */}
        <div className="absolute top-0 left-0 w-full h-2 checkered-bg opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-full h-2 checkered-bg opacity-60"></div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          {/* Logo with Glow */}
          <div className="mb-8 animate-pulse">
            <img 
              src="/rocky-racing-logo-bw.png" 
              alt="Rocky Racing" 
              className="mx-auto h-32 lg:h-48 w-auto filter brightness-0 invert neon-glow"
            />
          </div>
          
          {/* Main Title */}
          <h1 className="font-heading text-6xl sm:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-rr-gold via-rr-speed-yellow to-rr-gold mb-4 tracking-wider">
            ROCKY RACING
          </h1>
          
          {/* Subtitle with Racing Flair */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <Flag className="text-rr-gold animate-bounce" size={24} />
            <p className="font-heading text-2xl sm:text-3xl text-rr-white tracking-wide">
              13-YEAR-OLD <span className="text-rr-neon-green">SPEED DEMON</span>
            </p>
            <Flag className="text-rr-gold animate-bounce" size={24} />
          </div>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            🏁 Crushing it on iRacing • Building a Racing Empire • 
            <span className="text-rr-electric-blue font-bold"> SUBSCRIBE FOR EPIC CONTENT! </span>
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://youtube.com/@rockyracing13"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl text-lg font-bold hover:from-red-500 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              <Youtube size={24} className="animate-pulse" />
              <span>SUBSCRIBE NOW!</span>
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-700 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
            </a>
            
            <Link
              href="/watch"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-rr-gold to-rr-speed-yellow text-rr-black px-8 py-4 rounded-xl text-lg font-bold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Play size={24} />
              WATCH RACES
            </Link>
            
            <Link
              href="/support"
              className="inline-flex items-center gap-3 border-2 border-rr-neon-green text-rr-neon-green px-8 py-4 rounded-xl text-lg font-bold hover:bg-rr-neon-green hover:text-rr-black transition-all duration-300"
            >
              <Zap size={24} />
              SUPPORT
            </Link>
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
              <div className="bg-gradient-to-br from-rr-gold/10 to-rr-black border border-rr-gold/30 rounded-xl p-6 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-rr-gold text-rr-black w-16 h-16 rounded-full flex items-center justify-center font-heading text-2xl">
                    P3
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading text-rr-white">LATEST PODIUM! 🏆</h3>
                    <p className="text-rr-gold">Road America - IMSA Challenge</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Car:</span>
                    <p className="text-rr-white font-bold">Porsche GT4 🏎️</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Incidents:</span>
                    <p className="text-rr-neon-green font-bold">0x CLEAN! ✅</p>
                  </div>
                </div>
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