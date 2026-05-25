'use client'

import React, { useState } from 'react'

interface Props {
  formId: string
  emailFieldName?: string
  languageFieldName?: string
  languageOptions?: string[]
  buttonText?: string
}

export const NewsletterFormPayload: React.FC<Props> = ({
  formId,
  emailFieldName = 'email',
  languageFieldName = 'languageInterest',
  languageOptions = [],
  buttonText = 'Subscribe',
}) => {
  const [email, setEmail] = useState('')
  const [language, setLanguage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async () => {
    if (!email) return
    setStatus('loading')

    try {
      const res = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: formId,
          submissionData: [
            { field: emailFieldName, value: email },
            ...(language ? [{ field: languageFieldName, value: language }] : []),
          ],
        }),
      })

      if (!res.ok) throw new Error('Submission failed')

      setStatus('success')
      setEmail('')
      setLanguage('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p className="text-theme-yellow text-sm font-medium py-4 text-center">
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
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        className="flex-1 bg-transparent border border-white/25 rounded-full px-5 py-3 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-theme-yellow/60 transition-colors"
      />

      {/* Language select */}
      {languageOptions.length > 0 && (
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-transparent border border-white/25 rounded-full px-5 py-3 text-white/70 text-sm focus:outline-none focus:border-theme-yellow/60 transition-colors appearance-none cursor-pointer"
        >
          <option value="" className="bg-theme-black text-white/50">
            Language Interest
          </option>
          {languageOptions.map((lang) => (
            <option key={lang} value={lang} className="bg-theme-black text-white">
              {lang}
            </option>
          ))}
        </select>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={status === 'loading' || !email}
        className="bg-theme-brown hover:bg-black disabled:opacity-50 text-white font-medium text-sm rounded-full px-7 py-3 transition-colors whitespace-nowrap cursor-pointer flex-shrink-0"
      >
        {status === 'loading' ? 'Sending…' : buttonText}
      </button>

      {status === 'error' && (
        <p className="text-red-400 text-xs text-center w-full mt-1">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  )
}
