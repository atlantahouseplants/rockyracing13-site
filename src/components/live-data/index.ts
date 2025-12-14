/**
 * Live Data Components
 *
 * These components fetch data from the Discord bot API and display
 * live team racing information.
 *
 * Usage:
 *   import { RaceCountdown, UpcomingRaces, TeamStats } from '@/components/live-data'
 *
 * Environment Variable Required:
 *   NEXT_PUBLIC_API_URL=https://api.rockyracing13.com
 */

// Client Components (use 'use client' internally)
export { default as RaceCountdown } from './RaceCountdown'
export { default as RecruitmentForm } from './RecruitmentForm'

// Server Components (async - fetch on server)
export { default as UpcomingRaces } from './UpcomingRaces'
export { default as TeamResults } from './TeamResults'
export { default as TeamStats, TeamStatsCompact } from './TeamStats'
export { default as TeamRoster, TeamRosterList } from './TeamRoster'
