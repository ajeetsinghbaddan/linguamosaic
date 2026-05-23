import React from 'react'
import Link from 'next/link'

type LanguageCtaProps = {
  heading?: string | null
  subtext?: string | null
  primaryLabel?: string | null
  primaryUrl?: string | null
  secondaryLabel?: string | null
  secondaryUrl?: string | null
}

export const LanguageCta: React.FC<LanguageCtaProps> = ({
  heading,
  subtext,
  primaryLabel,
  primaryUrl,
  secondaryLabel,
  secondaryUrl,
}) => (
  <section className="bg-white w-full">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
      <div className="bg-theme-black rounded-3xl px-8 sm:px-16 py-14 flex flex-col sm:flex-row items-center justify-between gap-8">
        <div className="flex flex-col gap-3 max-w-lg">
          {heading && (
            <h2 className="font-serif font-bold text-white text-2xl sm:text-3xl leading-snug">
              {heading}
            </h2>
          )}
          {subtext && <p className="text-white/50 text-sm leading-relaxed">{subtext}</p>}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
          {primaryLabel && (
            <Link
              href={primaryUrl || '/'}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-theme-brown text-white font-semibold text-sm hover:bg-theme-brown/90 transition-colors whitespace-nowrap"
            >
              {primaryLabel}
            </Link>
          )}
          {secondaryLabel && (
            <Link
              href={secondaryUrl || '/'}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </div>
  </section>
)
