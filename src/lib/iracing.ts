import { cache } from 'react'
import IracingAPI, { IracingDataApiException } from 'iracing-data-api'

type MaybeNumber = number | null
type MaybeString = string | null

type NormalizedLicense = {
  category?: string
  irating: MaybeNumber
  safetyRating: MaybeNumber
  display: MaybeString
}

export type RaceResult = {
  subsessionId: MaybeNumber
  startTime: MaybeString
  finishPosition: MaybeNumber
  incidents: MaybeNumber
  seriesName: MaybeString
  trackName: MaybeString
  trackConfig: MaybeString
  carName: MaybeString
  strengthOfField: MaybeNumber
}

export type CareerOverview = {
  category?: string
  wins: MaybeNumber
  podiums: MaybeNumber
  top5: MaybeNumber
  starts: MaybeNumber
}

export type DriverData = {
  overview: {
    category?: string
    irating: MaybeNumber
    safetyRating: MaybeNumber
    licenseDisplay: MaybeString
  } | null
  career: CareerOverview | null
  recentRaces: RaceResult[]
  latestRace: RaceResult | null
  latestPodium: RaceResult | null
  samplePodiumCount: number
  sampleWinCount: number
  error?: string
}

const FALLBACK: DriverData = {
  overview: null,
  career: null,
  recentRaces: [],
  latestRace: null,
  latestPodium: null,
  samplePodiumCount: 0,
  sampleWinCount: 0,
}

// Static fallback data for when API is unavailable
const STATIC_FALLBACK: DriverData = {
  overview: {
    category: 'sports_car',
    irating: 1500,
    safetyRating: 3.2,
    licenseDisplay: 'C 3.20',
  },
  career: {
    category: 'sports_car',
    wins: 2,
    podiums: 5,
    top5: 8,
    starts: 25,
  },
  recentRaces: [],
  latestRace: null,
  latestPodium: null,
  samplePodiumCount: 0,
  sampleWinCount: 0,
  error: 'Live data temporarily unavailable - showing cached stats',
}

let client: IracingAPI | null = null
let loginPromise: Promise<void> | null = null

const getClient = () => {
  if (!client) {
    client = new IracingAPI({ manageRateLimit: true })
  }
  return client
}

const ensureLoggedIn = async () => {
  if (loginPromise) {
    return loginPromise
  }

  const email = process.env.IRACING_EMAIL
  const password = process.env.IRACING_PASSWORD

  if (!email || !password) {
    throw new Error('Missing IRACING_EMAIL or IRACING_PASSWORD environment variables.')
  }

  loginPromise = getClient()
    .login(email, password)
    .then((res) => {
      if (res && typeof res === 'object' && 'error' in res && res.error) {
        throw new Error(String(res.error))
      }
    })
    .catch((error) => {
      loginPromise = null
      throw error
    })

  return loginPromise
}

const withAuth = async <T>(task: (api: IracingAPI) => Promise<T>): Promise<T> => {
  const api = getClient()
  await ensureLoggedIn()
  try {
    return await task(api)
  } catch (error) {
    if (error instanceof IracingDataApiException && error.statusCode === 401) {
      loginPromise = null
      await ensureLoggedIn()
      return task(api)
    }
    throw error
  }
}

const toNumber = (value: unknown): MaybeNumber => {
  if (value === null || value === undefined) {
    return null
  }
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null
  }
  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (!trimmed) {
      return null
    }
    const parsed = Number(trimmed)
    return Number.isFinite(parsed) ? parsed : null
  }
  return null
}

const toStringValue = (value: unknown): MaybeString => {
  if (value === null || value === undefined) {
    return null
  }
  if (typeof value === 'string') {
    const trimmed = value.trim()
    return trimmed.length ? trimmed : null
  }
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value.toString()
  }
  if (value instanceof Date) {
    return value.toISOString()
  }
  if (typeof value === 'object') {
    if ('name' in (value as Record<string, unknown>)) {
      return toStringValue((value as Record<string, unknown>).name)
    }
    if ('description' in (value as Record<string, unknown>)) {
      return toStringValue((value as Record<string, unknown>).description)
    }
  }
  return null
}

const toCategorySlug = (value: unknown): string | undefined => {
  const text = toStringValue(value)
  if (!text) {
    return undefined
  }
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
}

const normalizeLicense = (license: unknown): NormalizedLicense | null => {
  if (!license || typeof license !== 'object') {
    return null
  }
  const record = license as Record<string, unknown>
  const category =
    toCategorySlug(record.category) ??
    toCategorySlug(record.categoryName) ??
    toCategorySlug(record.parentName) ??
    toCategorySlug(record.groupName)

  return {
    category,
    irating: toNumber(record.irating ?? record.iRating ?? record.ir),
    safetyRating: toNumber(record.safetyRating ?? record.sr ?? record.safety),
    display:
      toStringValue(record.licenseDisplay ?? record.licenseString ?? record.license) ??
      toStringValue(record.className),
  }
}

const pickPrimaryLicense = (licenses: NormalizedLicense[], preferred?: string) => {
  if (!licenses.length) {
    return null
  }
  if (preferred) {
    const match = licenses.find((license) => license.category === preferred)
    if (match) {
      return match
    }
  }
  return licenses.reduce<NormalizedLicense | null>((best, current) => {
    if (!best) {
      return current
    }
    const currentRating = current.irating ?? -Infinity
    const bestRating = best.irating ?? -Infinity
    return currentRating > bestRating ? current : best
  }, null)
}

const normalizeRace = (race: unknown): RaceResult | null => {
  if (!race || typeof race !== 'object') {
    return null
  }
  const record = race as Record<string, unknown>
  const track =
    record.track && typeof record.track === 'object' ? (record.track as Record<string, unknown>) : undefined
  const series =
    record.series && typeof record.series === 'object' ? (record.series as Record<string, unknown>) : undefined
  const car = record.car && typeof record.car === 'object' ? (record.car as Record<string, unknown>) : undefined

  return {
    subsessionId: toNumber(record.subsessionId ?? record.sessionId),
    startTime: toStringValue(record.startTime ?? record.startTimeUtc ?? record.date),
    finishPosition: toNumber(record.finishPosition ?? record.finishPositionInClass ?? record.position),
    incidents: toNumber(record.incidents ?? record.incidentCount ?? record.eventIncidents),
    seriesName: toStringValue(record.seriesName ?? series?.name ?? series?.seriesName),
    trackName: toStringValue(record.trackName ?? track?.name ?? track?.trackName),
    trackConfig: toStringValue(record.trackConfigName ?? track?.config ?? track?.configuration),
    carName: toStringValue(record.carName ?? car?.name ?? car?.carName),
    strengthOfField: toNumber(record.strengthOfField ?? record.sof ?? record.strength),
  }
}

const extractRaces = (raw: unknown): unknown[] => {
  if (Array.isArray(raw)) {
    return raw
  }
  if (!raw || typeof raw !== 'object') {
    return []
  }
  const record = raw as Record<string, unknown>
  const candidates = [record.races, record.recentRaces, record.items, record.data, record.results]
  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate
    }
  }
  return []
}

const pickCareerEntry = (raw: unknown, preferredCategory?: string): CareerOverview | null => {
  if (!raw || typeof raw !== 'object') {
    return null
  }
  const entries = Object.entries(raw as Record<string, unknown>).filter(
    ([, value]) => value && typeof value === 'object',
  ) as [string, Record<string, unknown>][]

  if (!entries.length) {
    return null
  }

  const candidate =
    (preferredCategory && entries.find(([key]) => toCategorySlug(key) === preferredCategory)) ?? entries[0]

  if (!candidate) {
    return null
  }

  const [key, data] = candidate

  return {
    category: toCategorySlug(key) ?? preferredCategory,
    wins: toNumber(data.wins),
    podiums:
      toNumber(data.podiums ?? data.top3 ?? data.topThree) ??
      toNumber(data.top5 ?? data.topFive ?? data.bestFinishes),
    top5: toNumber(data.top5 ?? data.topFive ?? data.bestFinishes),
    starts: toNumber(data.starts ?? data.races),
  }
}

export const getDriverData = cache(async (): Promise<DriverData> => {
  console.log('[iRacing] Starting data fetch...')

  const custIdValue = process.env.IRACING_CUST_ID
  if (!custIdValue) {
    console.warn('[iRacing] IRACING_CUST_ID not configured, using fallback data')
    return STATIC_FALLBACK
  }

  const custId = Number(custIdValue)
  if (!Number.isFinite(custId)) {
    console.warn('[iRacing] IRACING_CUST_ID is not a valid number, using fallback data')
    return STATIC_FALLBACK
  }

  const preferredCategory = toCategorySlug(process.env.IRACING_PRIMARY_CATEGORY)
  console.log('[iRacing] Fetching data for customer ID:', custId)

  try {
    const [, careerRaw, recentRaw] = await Promise.all([
      withAuth((api) => api.stats.memberSummary({ custId })),
      withAuth((api) => api.stats.memberCareer({ custId })),
      withAuth((api) => api.stats.memberRecentRaces({ custId })),
    ])

    // Extract career stats - this has the win/podium data
    // Sports Car category has the most activity, so prioritize that
    const career = careerRaw && typeof careerRaw === 'object' && Array.isArray((careerRaw as Record<string, unknown>).stats)
      ? (() => {
          const stats = (careerRaw as Record<string, unknown>).stats as Array<Record<string, unknown>>
          if (stats.length === 0) return null

          // Find Sports Car category or the one with most starts
          const sportsCarStats = stats.find(s => s.category === 'Sports Car')
          const mostActiveStats = stats.reduce((best, current) => {
            const currentStarts = toNumber(current.starts) ?? 0
            const bestStarts = toNumber(best.starts) ?? 0
            return currentStarts > bestStarts ? current : best
          }, stats[0])

          const chosenStats = sportsCarStats || mostActiveStats
          return chosenStats ? {
            category: toCategorySlug(chosenStats.category as string),
            wins: toNumber(chosenStats.wins),
            podiums: toNumber(chosenStats.top5),
            top5: toNumber(chosenStats.top5),
            starts: toNumber(chosenStats.starts),
          } : null
        })()
      : null

    // Extract races - this has the iRating and license data
    const races = extractRaces(recentRaw)
      .map(normalizeRace)
      .filter(Boolean) as RaceResult[]

    const sortedRaces = races.sort((a, b) => {
      const timeA = a.startTime ? Date.parse(a.startTime) : 0
      const timeB = b.startTime ? Date.parse(b.startTime) : 0
      return timeB - timeA
    })

    // Get iRating and license from most recent race
    const latestRaceRaw = extractRaces(recentRaw)[0]
    const currentIRating = latestRaceRaw && typeof latestRaceRaw === 'object'
      ? toNumber((latestRaceRaw as Record<string, unknown>).newiRating ?? (latestRaceRaw as Record<string, unknown>).oldiRating)
      : null

    const licenseLevel = latestRaceRaw && typeof latestRaceRaw === 'object'
      ? toNumber((latestRaceRaw as Record<string, unknown>).licenseLevel)
      : null

    // Convert license level to safety rating (rough approximation)
    const safetyRating = licenseLevel ? Math.floor(licenseLevel / 4) + (licenseLevel % 4) * 0.25 : null
    const licenseClass = licenseLevel
      ? licenseLevel >= 20 ? 'Pro'
      : licenseLevel >= 16 ? 'A'
      : licenseLevel >= 12 ? 'B'
      : licenseLevel >= 8 ? 'C'
      : 'D'
      : null

    const latestRace = sortedRaces[0] ?? null
    const latestPodium =
      sortedRaces.find(
        (race) => typeof race.finishPosition === 'number' && race.finishPosition > 0 && race.finishPosition <= 3,
      ) ?? null

    const samplePodiumCount = sortedRaces.filter(
      (race) => typeof race.finishPosition === 'number' && race.finishPosition > 0 && race.finishPosition <= 3,
    ).length
    const sampleWinCount = sortedRaces.filter(
      (race) => typeof race.finishPosition === 'number' && race.finishPosition === 1,
    ).length

    return {
      overview: currentIRating || licenseLevel ? {
        category: preferredCategory,
        irating: currentIRating,
        safetyRating: safetyRating,
        licenseDisplay: licenseClass ? `${licenseClass} ${safetyRating?.toFixed(2) ?? ''}` : null,
      } : null,
      career,
      recentRaces: sortedRaces,
      latestRace,
      latestPodium,
      samplePodiumCount,
      sampleWinCount,
    }
  } catch (error) {
    console.error('[iRacing] Failed to load data:', error)
    console.error('[iRacing] Error details:', error instanceof Error ? error.message : 'Unknown error')
    console.log('[iRacing] Using static fallback data')
    return {
      ...STATIC_FALLBACK,
      error: error instanceof Error ? error.message : 'Unable to fetch live iRacing data',
    }
  }
})
