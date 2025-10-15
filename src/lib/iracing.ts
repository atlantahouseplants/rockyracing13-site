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
  const custIdValue = process.env.IRACING_CUST_ID
  if (!custIdValue) {
    return {
      ...FALLBACK,
      error: 'IRACING_CUST_ID is not configured.',
    }
  }

  const custId = Number(custIdValue)
  if (!Number.isFinite(custId)) {
    return {
      ...FALLBACK,
      error: 'IRACING_CUST_ID must be a number.',
    }
  }

  const preferredCategory = toCategorySlug(process.env.IRACING_PRIMARY_CATEGORY)

  try {
    const [summary, careerRaw, recentRaw] = await Promise.all([
      withAuth((api) => api.stats.memberSummary({ custId })),
      withAuth((api) => api.stats.memberCareer({ custId })),
      withAuth((api) => api.stats.memberRecentRaces({ custId })),
    ])

    const licensesRaw =
      (summary && typeof summary === 'object'
        ? ((summary as Record<string, unknown>).licenses ??
          (summary as Record<string, unknown>).licenseLevels ??
          (summary as Record<string, unknown>).license)
        : []) ?? []

    const licenses = Array.isArray(licensesRaw)
      ? (licensesRaw.map(normalizeLicense).filter(Boolean) as NormalizedLicense[])
      : []

    const primaryLicense = pickPrimaryLicense(licenses, preferredCategory)
    const career = careerRaw && typeof careerRaw === 'object'
      ? pickCareerEntry(
          (careerRaw as Record<string, unknown>).careerStats ?? careerRaw,
          primaryLicense?.category ?? preferredCategory,
        )
      : null

    const races = extractRaces(recentRaw)
      .map(normalizeRace)
      .filter(Boolean) as RaceResult[]

    const sortedRaces = races.sort((a, b) => {
      const timeA = a.startTime ? Date.parse(a.startTime) : 0
      const timeB = b.startTime ? Date.parse(b.startTime) : 0
      return timeB - timeA
    })

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
      overview: primaryLicense
        ? {
            category: primaryLicense.category,
            irating: primaryLicense.irating,
            safetyRating: primaryLicense.safetyRating,
            licenseDisplay: primaryLicense.display,
          }
        : null,
      career,
      recentRaces: sortedRaces,
      latestRace,
      latestPodium,
      samplePodiumCount,
      sampleWinCount,
    }
  } catch (error) {
    console.error('Failed to load iRacing data', error)
    return {
      ...FALLBACK,
      error: error instanceof Error ? error.message : 'Unknown error fetching iRacing data.',
    }
  }
})
