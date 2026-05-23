'use client'

import React, { useState } from 'react'
import Link from 'next/link'

type Option = {
  text?: string | null
  score?: number | null
}

type Question = {
  question?: string | null
  options?: Option[] | null
}

type Result = {
  minScore?: number | null
  maxScore?: number | null
  emoji?: string | null
  level?: string | null
  recommendation?: string | null
  recommendationUrl?: string | null
  description?: string | null
  ctaLabel?: string | null
  ctaUrl?: string | null
}

type Props = {
  questions: Question[]
  results: Result[]
}

export const AssessmentClient: React.FC<Props> = ({ questions, results }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null))
  const [selected, setSelected] = useState<number | null>(null)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState<'in' | 'out'>('in')
  const [submitted, setSubmitted] = useState(false)

  const totalScore = answers.reduce<number>((sum, a, i) => {
    if (a === null) return sum
    return sum + (questions[i]?.options?.[a]?.score ?? 0)
  }, 0)

  const result = submitted
    ? (results.find((r) => totalScore >= (r.minScore ?? 0) && totalScore <= (r.maxScore ?? 999)) ??
      results[0])
    : null

  const isLast = currentIndex === questions.length - 1
  const progress = (currentIndex / questions.length) * 100

  const goNext = () => {
    if (selected === null) return

    // save answer
    const next = [...answers]
    next[currentIndex] = selected
    setAnswers(next)

    if (isLast) {
      // animate out then show result
      setDirection('out')
      setAnimating(true)
      setTimeout(() => {
        setSubmitted(true)
        setAnimating(false)
      }, 250)
      return
    }

    // animate out
    setDirection('out')
    setAnimating(true)
    setTimeout(() => {
      setCurrentIndex((i) => i + 1)
      setSelected(null)
      setDirection('in')
      setAnimating(false)
    }, 250)
  }

  const goBack = () => {
    if (currentIndex === 0) return
    setDirection('out')
    setAnimating(true)
    setTimeout(() => {
      setCurrentIndex((i) => i - 1)
      setSelected(answers[currentIndex - 1])
      setDirection('in')
      setAnimating(false)
    }, 250)
  }

  const handleRetake = () => {
    setAnswers(Array(questions.length).fill(null))
    setSelected(null)
    setCurrentIndex(0)
    setSubmitted(false)
    setDirection('in')
  }

  const slideClass = animating
    ? direction === 'out'
      ? 'opacity-0 translate-y-3'
      : 'opacity-0 -translate-y-3'
    : 'opacity-100 translate-y-0'

  const q = questions[currentIndex]

  return (
    <div className="max-w-2xl mx-auto">
      {/* ── Result card ── */}
      {submitted && result && (
        <div
          className={`bg-theme-sand rounded-2xl border border-theme-border overflow-hidden transition-all duration-300 ${slideClass}`}
        >
          <div className="h-1 bg-theme-brown w-full" />
          <div className="p-8 sm:p-10 flex flex-col items-center text-center gap-3">
            <span className="text-5xl">{result.emoji}</span>
            <h3 className="font-serif font-bold text-theme-black text-2xl sm:text-3xl mt-1">
              Your Level: {result.level}
            </h3>
            {result.recommendation && (
              <p className="text-sm text-theme-text/70">
                Recommended:{' '}
                <Link
                  href={result.recommendationUrl || '/'}
                  className="text-theme-brown font-semibold hover:underline"
                >
                  {result.recommendation}
                </Link>
              </p>
            )}
            {result.description && (
              <p className="text-sm text-theme-text/60 max-w-sm leading-relaxed">
                {result.description}
              </p>
            )}
            <Link
              href={result.ctaUrl || '/'}
              className="mt-3 inline-flex items-center gap-2 bg-theme-black text-white text-sm font-semibold px-7 py-3 rounded-full hover:bg-theme-brown transition-colors"
            >
              {result.ctaLabel || 'View Courses'} →
            </Link>
            <button
              onClick={handleRetake}
              className="text-theme-sage text-sm font-medium hover:underline cursor-pointer mt-1"
            >
              Retake quiz
            </button>
          </div>
        </div>
      )}

      {/* ── Question card ── */}
      {!submitted && (
        <div
          className={`bg-theme-sand rounded-2xl border border-theme-border overflow-hidden transition-all duration-250 ease-in-out ${slideClass}`}
        >
          {/* Progress bar */}
          <div className="h-1 bg-theme-border/40 w-full">
            <div
              className="h-1 bg-theme-brown transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="p-6 sm:p-10">
            {/* Step indicator */}
            <p className="text-xs font-semibold tracking-widest uppercase text-theme-sage mb-4">
              Question {currentIndex + 1} of {questions.length}
            </p>

            {/* Question */}
            <p className="font-serif font-semibold text-theme-black text-lg sm:text-xl mb-6 leading-snug">
              Q{currentIndex + 1}. {q.question}
            </p>

            {/* Options */}
            <div className="flex flex-col gap-2.5 mb-8">
              {q.options?.map((opt: Option, oi: number) => {
                const isSelected = selected === oi
                return (
                  <button
                    key={oi}
                    onClick={() => setSelected(oi)}
                    className={`w-full text-left px-5 py-3.5 rounded-xl border text-sm font-medium transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-theme-sage border-theme-sage text-white'
                        : 'bg-white border-theme-border text-theme-text hover:border-theme-sage/50 hover:bg-theme-sage/5'
                    }`}
                  >
                    {opt.text}
                  </button>
                )
              })}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={goBack}
                disabled={currentIndex === 0}
                className="text-sm text-theme-text/40 hover:text-theme-black disabled:opacity-0 disabled:pointer-events-none transition-all cursor-pointer"
              >
                ← Back
              </button>

              <button
                onClick={goNext}
                disabled={selected === null}
                className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  selected !== null
                    ? 'bg-theme-black text-white hover:bg-theme-brown hover:scale-[1.02] active:scale-[0.98]'
                    : 'bg-theme-border text-theme-text/30 cursor-not-allowed'
                }`}
              >
                {isLast ? 'See Results →' : 'Next →'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
