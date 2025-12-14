import { Trophy, Calendar, Users } from 'lucide-react'
import {
  getTeamRaceResults,
  formatTeamRaceDate,
  getPositionEmoji,
  getPositionColor,
  type TeamRaceResult,
} from '@/lib/bot-api'

interface TeamResultsProps {
  limit?: number
  showTable?: boolean
  className?: string
}

export default async function TeamResults({
  limit = 10,
  showTable = true,
  className = '',
}: TeamResultsProps) {
  const results = await getTeamRaceResults(limit)

  if (results.length === 0) {
    return (
      <div className={`bg-rr-gray-900 rounded-xl p-8 border border-rr-gray-700 text-center ${className}`}>
        <Trophy size={48} className="text-rr-gold mx-auto mb-4 opacity-50" />
        <h3 className="text-xl text-rr-white mb-2">No Team Race Results</h3>
        <p className="text-rr-gray-400">Results will appear here after team races.</p>
      </div>
    )
  }

  if (showTable) {
    return <ResultsTable results={results} className={className} />
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {results.map((result) => (
        <ResultCard key={result.id} result={result} />
      ))}
    </div>
  )
}

function ResultsTable({ results, className }: { results: TeamRaceResult[]; className: string }) {
  return (
    <div className={`bg-rr-black rounded-xl border border-rr-gray-700 overflow-hidden ${className}`}>
      {/* Table Header */}
      <div className="bg-rr-gray-900 border-b border-rr-gray-700 p-4">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-sm font-semibold text-rr-gold">
          <div>Date</div>
          <div>Series</div>
          <div className="hidden md:block">Track</div>
          <div className="hidden md:block">Car</div>
          <div>Position</div>
          <div className="hidden md:block">Incidents</div>
        </div>
      </div>

      {/* Table Body */}
      <div className="max-h-[500px] overflow-y-auto">
        {results.map((result, index) => {
          const isPodium = result.position <= 3
          const isWin = result.position === 1

          return (
            <div
              key={result.id || index}
              className={`border-b border-rr-gray-800 p-4 hover:bg-rr-gray-900/50 transition-colors ${
                isWin
                  ? 'bg-rr-gold/5 border-l-4 border-l-rr-gold'
                  : isPodium
                  ? 'bg-rr-success/5 border-l-4 border-l-rr-success'
                  : ''
              }`}
            >
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4 items-center text-sm">
                <div className="text-rr-gray-300">{formatTeamRaceDate(result.raceDate)}</div>
                <div className="text-rr-white truncate" title={result.series}>
                  {result.series}
                </div>
                <div className="hidden md:block text-rr-gray-400 truncate" title={result.track}>
                  {result.track}
                </div>
                <div className="hidden md:block text-rr-gray-400 truncate" title={result.car}>
                  {result.car}
                </div>
                <div className={`font-bold ${getPositionColor(result.position)}`}>
                  P{result.position}
                  {isWin && ' 🏆'}
                </div>
                <div
                  className={`hidden md:block ${
                    (result.incidents || 0) === 0
                      ? 'text-rr-success'
                      : (result.incidents || 0) <= 4
                      ? 'text-rr-warning'
                      : 'text-red-400'
                  }`}
                >
                  {result.incidents !== null ? `${result.incidents}x` : 'N/A'}
                </div>
              </div>

              {/* Team event drivers */}
              {result.isTeamEvent && result.drivers.length > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  <Users className="w-3 h-3 text-rr-gray-500" />
                  <span className="text-xs text-rr-gray-500">
                    {result.drivers.join(', ')}
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ResultCard({ result }: { result: TeamRaceResult }) {
  const emoji = getPositionEmoji(result.position)
  const isPodium = result.position <= 3

  return (
    <div
      className={`bg-rr-gray-900 rounded-xl p-5 border transition-colors ${
        isPodium ? 'border-rr-gold/30 hover:border-rr-gold/50' : 'border-rr-gray-700 hover:border-rr-gray-600'
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`text-3xl w-14 h-14 flex items-center justify-center rounded-lg ${
            isPodium ? 'bg-rr-gold/10' : 'bg-rr-gray-800'
          }`}
        >
          {emoji}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xl font-bold ${getPositionColor(result.position)}`}>
              P{result.position}
            </span>
            {result.classPosition && result.classPosition !== result.position && (
              <span className="text-sm text-rr-gray-500">(P{result.classPosition} in class)</span>
            )}
          </div>
          <h3 className="font-medium text-rr-white">{result.track}</h3>
          <p className="text-sm text-rr-gray-400">{result.series}</p>
        </div>

        <div className="text-right text-sm">
          <div className="text-rr-gray-400">{formatTeamRaceDate(result.raceDate)}</div>
          {result.iRatingChange !== null && (
            <div
              className={`font-medium ${
                result.iRatingChange >= 0 ? 'text-rr-success' : 'text-red-400'
              }`}
            >
              {result.iRatingChange >= 0 ? '+' : ''}
              {result.iRatingChange} iR
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 text-center text-sm">
        <div className="bg-rr-black/50 rounded p-2">
          <div className="font-medium text-rr-white">{result.car}</div>
          <div className="text-xs text-rr-gray-500">Car</div>
        </div>
        <div className="bg-rr-black/50 rounded p-2">
          <div className="font-medium text-rr-white">{result.laps || '-'}</div>
          <div className="text-xs text-rr-gray-500">Laps</div>
        </div>
        <div className="bg-rr-black/50 rounded p-2">
          <div className={`font-medium ${(result.incidents || 0) === 0 ? 'text-rr-success' : 'text-rr-white'}`}>
            {result.incidents || 0}x
          </div>
          <div className="text-xs text-rr-gray-500">Incidents</div>
        </div>
        <div className="bg-rr-black/50 rounded p-2">
          <div className="font-medium text-rr-white">{result.strengthOfField?.toLocaleString() || '-'}</div>
          <div className="text-xs text-rr-gray-500">SoF</div>
        </div>
      </div>

      {result.isTeamEvent && result.drivers.length > 0 && (
        <div className="mt-3 pt-3 border-t border-rr-gray-800">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-rr-gray-500" />
            <span className="text-sm text-rr-gray-400">Team: {result.drivers.join(', ')}</span>
          </div>
        </div>
      )}
    </div>
  )
}
