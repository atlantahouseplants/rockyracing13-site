/**
 * Discord Bot API Client
 *
 * Fetches live team data from the Discord bot's API server.
 * Used for endurance racing team features (schedule, results, roster).
 */

import { cache } from 'react'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.rockyracing13.com'

// ===================
// TYPES
// ===================

export interface TeamRace {
  id: string
  name: string
  series: string
  track: string
  date: string
  duration: string | null
  carClass: string | null
  status: 'scheduled' | 'live' | 'completed' | 'cancelled'
  confirmedDrivers: { id: string; name: string; avatar?: string }[]
  tentativeDrivers: { id: string; name: string }[]
}

export interface TeamRaceResult {
  id: string
  series: string
  track: string
  car: string
  position: number
  classPosition: number | null
  laps: number | null
  incidents: number | null
  iRatingChange: number | null
  raceDate: string
  isTeamEvent: boolean
  drivers: string[]
  strengthOfField: number | null
}

export interface TeamDriver {
  id: string
  name: string
  iracingId: string | null
  irating: number | null
  safetyRating: string | null
  timezone: string | null
  role: string
  joinedAt: string | null
  bio: string | null
  avatarUrl: string | null
  stats: {
    racesCompleted: number
    wins: number
    podiums: number
  }
}

export interface TeamStats {
  totalRaces: number
  totalLaps: number
  podiums: number
  wins: number
  top5s: number
  top10s: number
  avgFinish: string | number
  totalIncidents: number
  avgIncidents: string | number
  bestFinish: number | null
}

export interface RecruitmentForm {
  name: string
  email: string
  discordUsername: string
  iracingId?: string
  experience?: string
  availability?: string
  message?: string
}

// ===================
// API CLIENT
// ===================

async function fetchBotAPI<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  const url = `${API_BASE_URL}${endpoint}`

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
    })

    if (!response.ok) {
      console.warn(`[Bot API] Error ${response.status} for ${endpoint}`)
      return null
    }

    return response.json()
  } catch (error) {
    console.warn(`[Bot API] Fetch failed for ${endpoint}:`, error)
    return null
  }
}

// ===================
// API FUNCTIONS
// ===================

/**
 * Get the next upcoming race (for countdown)
 */
export const getNextTeamRace = cache(async (): Promise<TeamRace | null> => {
  const data = await fetchBotAPI<{ race: TeamRace | null }>('/api/races/next')
  return data?.race || null
})

/**
 * Get upcoming races
 */
export const getUpcomingTeamRaces = cache(async (limit: number = 10): Promise<TeamRace[]> => {
  const data = await fetchBotAPI<{ races: TeamRace[] }>(`/api/races/upcoming?limit=${limit}`)
  return data?.races || []
})

/**
 * Get race results
 */
export const getTeamRaceResults = cache(async (limit: number = 20): Promise<TeamRaceResult[]> => {
  const data = await fetchBotAPI<{ results: TeamRaceResult[] }>(`/api/results?limit=${limit}`)
  return data?.results || []
})

/**
 * Get team roster
 */
export const getTeamRoster = cache(async (): Promise<TeamDriver[]> => {
  const data = await fetchBotAPI<{ drivers: TeamDriver[] }>('/api/drivers')
  return data?.drivers || []
})

/**
 * Get team statistics
 */
export const getTeamStats = cache(async (): Promise<TeamStats | null> => {
  const data = await fetchBotAPI<{ stats: TeamStats }>('/api/stats')
  return data?.stats || null
})

/**
 * Submit recruitment application
 */
export async function submitRecruitment(form: RecruitmentForm): Promise<{ success: boolean; message: string }> {
  const data = await fetchBotAPI<{ success: boolean; message: string }>('/api/recruitment', {
    method: 'POST',
    body: JSON.stringify(form),
    cache: 'no-store',
  })
  return data || { success: false, message: 'Failed to connect to server' }
}

// ===================
// UTILITIES
// ===================

export function formatTeamRaceDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatTeamRaceDateTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  })
}

export function getTimeUntil(dateString: string): {
  days: number
  hours: number
  minutes: number
  seconds: number
  isPast: boolean
} {
  const now = new Date().getTime()
  const target = new Date(dateString).getTime()
  const diff = target - now

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true }
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    isPast: false,
  }
}

export function getPositionEmoji(position: number): string {
  if (position === 1) return '🥇'
  if (position === 2) return '🥈'
  if (position === 3) return '🥉'
  if (position <= 5) return '🏆'
  if (position <= 10) return '✅'
  return '🏁'
}

export function getPositionColor(position: number): string {
  if (position === 1) return 'text-rr-gold'
  if (position <= 3) return 'text-rr-success'
  if (position <= 5) return 'text-rr-white'
  return 'text-rr-gray-400'
}
