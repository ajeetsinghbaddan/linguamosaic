import React from 'react'
import { LanguageSlider } from './LanguageSlider'

type LanguageCard = {
  code?: string | null
  name?: string | null
  level?: string | null
  tags?: string | null
  url?: string | null
}

type LanguagesOfferedBlockProps = {
  eyebrow?: string | null
  heading?: string | null
  subtext?: string | null
  languages?: LanguageCard[] | null
}

export const LanguagesOfferedBlock: React.FC<LanguagesOfferedBlockProps> = ({
  eyebrow,
  heading,
  subtext,
  languages,
}) => {
  return (
    <section className="bg-theme-sand w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* ── Header ── */}
        <div className="mb-10 max-w-lg">
          {eyebrow && (
            <p className="text-xs font-semibold tracking-widest uppercase text-theme-sage mb-3">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 className="font-serif font-bold text-theme-black text-3xl sm:text-4xl lg:text-5xl leading-[1.15] mb-4">
              {heading}
            </h2>
          )}
          {subtext && <p className="text-theme-text text-base leading-relaxed">{subtext}</p>}
        </div>

        {/* ── Slider ── */}
        {languages && languages.length > 0 && <LanguageSlider languages={languages} />}
      </div>
    </section>
  )
}
