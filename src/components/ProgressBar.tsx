import { Progress } from '@/types'

interface ProgressBarProps {
  progress: Progress
  className?: string
}

export default function ProgressBar({ progress, className = '' }: ProgressBarProps) {
  const percentage = Math.min((progress.raisedAmount / progress.goalAmount) * 100, 100)

  return (
    <div className={`bg-rr-black/50 rounded-lg p-6 ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-rr-gold font-heading text-lg">{progress.label}</h3>
        <span className="text-rr-white text-sm">
          ${progress.raisedAmount.toLocaleString()} / ${progress.goalAmount.toLocaleString()}
        </span>
      </div>
      
      <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
        <div 
          className="bg-gradient-to-r from-rr-gold to-yellow-400 h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <div className="flex justify-between text-sm text-gray-400">
        <span>{percentage.toFixed(1)}% funded</span>
        <span>Updated: {new Date(progress.lastUpdated).toLocaleDateString()}</span>
      </div>
    </div>
  )
}