'use client'

import { useState } from 'react'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { submitRecruitment, type RecruitmentForm as RecruitmentFormType } from '@/lib/bot-api'

interface RecruitmentFormProps {
  className?: string
  onSuccess?: () => void
}

export default function RecruitmentForm({ className = '', onSuccess }: RecruitmentFormProps) {
  const [formData, setFormData] = useState<RecruitmentFormType>({
    name: '',
    email: '',
    discordUsername: '',
    iracingId: '',
    experience: '',
    availability: '',
    message: '',
  })

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.discordUsername) {
      setStatus('error')
      setMessage('Please fill in all required fields')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const result = await submitRecruitment(formData)

      if (result.success) {
        setStatus('success')
        setMessage(result.message || 'Application submitted successfully!')
        setFormData({
          name: '',
          email: '',
          discordUsername: '',
          iracingId: '',
          experience: '',
          availability: '',
          message: '',
        })
        onSuccess?.()
      } else {
        setStatus('error')
        setMessage(result.message || 'Failed to submit application')
      }
    } catch {
      setStatus('error')
      setMessage('Failed to connect to server. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className={`bg-rr-gray-900 rounded-xl p-8 border border-rr-success/30 text-center ${className}`}>
        <CheckCircle size={48} className="text-rr-success mx-auto mb-4" />
        <h3 className="text-xl font-heading text-rr-white mb-2">Application Submitted!</h3>
        <p className="text-rr-gray-400 mb-6">{message}</p>
        <button
          onClick={() => setStatus('idle')}
          className="text-rr-gold hover:text-rr-gold/80 font-medium"
        >
          Submit Another Application
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`bg-rr-gray-900 rounded-xl p-6 border border-rr-gray-700 ${className}`}>
      <h3 className="font-heading text-xl text-rr-gold mb-6">Join Rocky Racing</h3>

      {status === 'error' && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <span className="text-red-400 text-sm">{message}</span>
        </div>
      )}

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-rr-gray-300 mb-1">
            Name <span className="text-rr-gold">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-rr-black border border-rr-gray-700 rounded-lg text-rr-white placeholder-rr-gray-500 focus:outline-none focus:border-rr-gold transition-colors"
            placeholder="Your name"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-rr-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-rr-black border border-rr-gray-700 rounded-lg text-rr-white placeholder-rr-gray-500 focus:outline-none focus:border-rr-gold transition-colors"
            placeholder="your@email.com"
          />
        </div>

        {/* Discord Username */}
        <div>
          <label htmlFor="discordUsername" className="block text-sm font-medium text-rr-gray-300 mb-1">
            Discord Username <span className="text-rr-gold">*</span>
          </label>
          <input
            type="text"
            id="discordUsername"
            name="discordUsername"
            value={formData.discordUsername}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-rr-black border border-rr-gray-700 rounded-lg text-rr-white placeholder-rr-gray-500 focus:outline-none focus:border-rr-gold transition-colors"
            placeholder="username#1234"
          />
        </div>

        {/* iRacing ID */}
        <div>
          <label htmlFor="iracingId" className="block text-sm font-medium text-rr-gray-300 mb-1">
            iRacing Customer ID
          </label>
          <input
            type="text"
            id="iracingId"
            name="iracingId"
            value={formData.iracingId}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-rr-black border border-rr-gray-700 rounded-lg text-rr-white placeholder-rr-gray-500 focus:outline-none focus:border-rr-gold transition-colors"
            placeholder="123456"
          />
        </div>

        {/* Experience */}
        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-rr-gray-300 mb-1">
            Racing Experience
          </label>
          <select
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-rr-black border border-rr-gray-700 rounded-lg text-rr-white focus:outline-none focus:border-rr-gold transition-colors"
          >
            <option value="">Select your experience level</option>
            <option value="beginner">Beginner (less than 1 year)</option>
            <option value="intermediate">Intermediate (1-3 years)</option>
            <option value="experienced">Experienced (3+ years)</option>
            <option value="veteran">Veteran (5+ years)</option>
          </select>
        </div>

        {/* Availability */}
        <div>
          <label htmlFor="availability" className="block text-sm font-medium text-rr-gray-300 mb-1">
            Availability
          </label>
          <select
            id="availability"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-rr-black border border-rr-gray-700 rounded-lg text-rr-white focus:outline-none focus:border-rr-gold transition-colors"
          >
            <option value="">Select your availability</option>
            <option value="weekends">Weekends only</option>
            <option value="evenings">Weekday evenings</option>
            <option value="flexible">Flexible schedule</option>
            <option value="limited">Limited availability</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-rr-gray-300 mb-1">
            Tell us about yourself
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 bg-rr-black border border-rr-gray-700 rounded-lg text-rr-white placeholder-rr-gray-500 focus:outline-none focus:border-rr-gold transition-colors resize-none"
            placeholder="What are your racing goals? Why do you want to join Rocky Racing?"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-rr-gold text-rr-black px-6 py-3 rounded-lg font-semibold hover:bg-rr-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Submit Application
            </>
          )}
        </button>
      </div>
    </form>
  )
}
