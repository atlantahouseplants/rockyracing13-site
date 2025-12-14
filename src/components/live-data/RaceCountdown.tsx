'use client'

import { useState, useEffect } from 'react'
import { Flag, MapPin, Clock } from 'lucide-react'
import { getTimeUntil } from '@/lib/bot-api'

interface RaceCountdownProps {
  targetDate: string
  raceName: string
  track: string
  series?: string
  className?: string
}

export default function RaceCountdown({
  targetDate,
  raceName,
  track,
  series,
  className = '',
}: RaceCountdownProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeUntil(targetDate))
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => {
      setTimeLeft(getTimeUntil(targetDate))
    }, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  if (!mounted) {
    return (
      <div className={`bg-rr-gray-900 rounded-xl p-6 border border-rr-gray-700 ${className}`}>
        <div className="animate-pulse h-32 bg-rr-gray-800 rounded" />
      </div>
    )
  }

  const isLive = timeLeft.isPast

  return (
    <div className={`bg-rr-gray-900 rounded-xl p-6 border border-rr-gray-700 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <Flag className="w-5 h-5 text-rr-gold" />
        <span className="text-sm font-semibold text-rr-gold uppercase tracking-wide">
          {isLive ? 'RACE IN PROGRESS' : 'NEXT TEAM RACE'}
        </span>
      </div>

      <h3 className="font-heading text-2xl text-rr-white mb-2">{raceName}</h3>

      <div className="flex items-center gap-2 text-rr-gray-400 mb-4">
        <MapPin className="w-4 h-4" />
        <span>{track}</span>
        {series && (
          <>
            <span className="mx-2">•</span>
            <span>{series}</span>
          </>
        )}
      </div>

      {isLive ? (
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
          </span>
          <span className="text-xl font-bold text-red-500">LIVE NOW</span>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Mins', value: timeLeft.minutes },
            { label: 'Secs', value: timeLeft.seconds },
          ].map(({ label, value }) => (
            <div key={label} className="bg-rr-black rounded-lg p-3 text-center border border-rr-gray-800">
              <div className="text-2xl font-bold text-rr-white">
                {value.toString().padStart(2, '0')}
              </div>
              <div className="text-xs text-rr-gray-500 uppercase">{label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
