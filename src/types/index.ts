export interface ScheduleEvent {
  id: string
  date: string
  time: string
  series: string
  track: string
  car: string
  status: 'upcoming' | 'live' | 'completed'
}

export interface Result {
  date: string
  series: string
  track: string
  car: string
  position: string
  incidents: number
  status: 'Podium' | 'Clean Race' | 'DNF'
  notes: string
}

export interface Sponsor {
  id: string
  name: string
  logo: string
  website: string
  tier: 'gold' | 'silver' | 'bronze'
  description: string
}

export interface Progress {
  goalAmount: number
  raisedAmount: number
  lastUpdated: string
  label: string
}

export interface BlogPost {
  title: string
  date: string
  tags: string[]
  excerpt: string
  content: string
  slug: string
}