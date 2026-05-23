import React from 'react'
import { AssessmentClient } from './AssessmentClient'

type Option = { text?: string | null; score?: number | null }
type Question = { question?: string | null; options?: Option[] | null }
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

type SelfAssessmentBlockProps = {
  eyebrow?: string | null
  heading?: string | null
  subtext?: string | null
  questions?: Question[] | null
  results?: Result[] | null
}

export const SelfAssessmentBlock: React.FC<SelfAssessmentBlockProps> = ({
  eyebrow,
  heading,
  subtext,
  questions,
  results,
}) => {
  return (
    <section className="bg-white w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* ── Header ── */}
        <div className="text-center mb-12 max-w-xl mx-auto">
          {eyebrow && (
            <p className="text-xs font-semibold tracking-widest uppercase text-theme-sage mb-3">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 className="font-serif font-bold text-theme-black text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-4">
              {heading}
            </h2>
          )}
          {subtext && <p className="text-theme-text text-base leading-relaxed">{subtext}</p>}
        </div>

        {/* ── Assessment ── */}
        {questions && questions.length > 0 && results && results.length > 0 && (
          <AssessmentClient questions={questions} results={results} />
        )}
      </div>
    </section>
  )
}
