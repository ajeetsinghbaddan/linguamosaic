'use client'

import React, { useState } from 'react'

interface NewsletterFormProps {
  languageOptions: string[]
  buttonText: string
}

export const NewsletterForm: React.FC<NewsletterFormProps> = ({ languageOptions, buttonText }) => {
  const [email, setEmail] = useState('')
  const [language, setLanguage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async () => {
    if (!email) return
    setStatus('loading')
    try {
      // Wire up to your form handler / API here
      await new Promise((resolve) => setTimeout(resolve, 800))
      setStatus('success')
      setEmail('')
      setLanguage('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p className="text-theme-yellow text-sm font-medium py-4">
        🎉 You're in! Check your inbox for a welcome gift.
      </p>
    )
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xl">
      {/* Email */}
      <input
        type="email"
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 bg-transparent border border-white/25 rounded-full px-5 py-3 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-theme-yellow/60 transition-colors"
      />

      {/* Language select */}
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="bg-transparent border border-white/25 rounded-full px-5 py-3 text-white/70 text-sm focus:outline-none focus:border-theme-yellow/60 transition-colors appearance-none cursor-pointer"
      >
        <option value="" disabled className="bg-theme-black">
          Language Interest
        </option>
        {languageOptions.map((lang) => (
          <option key={lang} value={lang} className="bg-theme-black text-white">
            {lang}
          </option>
        ))}
      </select>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={status === 'loading' || !email}
        className="bg-theme-brown hover:bg-black disabled:opacity-50 text-white font-medium text-sm rounded-full px-7 py-3 transition-colors whitespace-nowrap cursor-pointer"
      >
        {status === 'loading' ? 'Sending…' : buttonText}
      </button>
    </div>
  )
}
