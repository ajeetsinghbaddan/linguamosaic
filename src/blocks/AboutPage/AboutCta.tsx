import React from 'react'
import Link from 'next/link'

type Badge = { text?: string | null }
type AboutCtaProps = {
  heading?: string | null
  subtext?: string | null
  primaryLabel?: string | null
  primaryUrl?: string | null
  secondaryLabel?: string | null
  secondaryUrl?: string | null
  badges?: Badge[] | null
}

export const AboutCta: React.FC<AboutCtaProps> = ({
  heading,
  subtext,
  primaryLabel,
  primaryUrl,
  secondaryLabel,
  secondaryUrl,
  badges,
}) => (
  <section className="bg-theme-black w-full">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-6">
        {heading && (
          <h2 className="font-serif font-bold text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.15]">
            {heading}
          </h2>
        )}
        {subtext && <p className="text-white/55 text-base leading-relaxed max-w-md">{subtext}</p>}

        <div className="flex flex-wrap gap-3 justify-center mt-2">
          {primaryLabel && (
            <Link
              href={primaryUrl || '/'}
              className="inline-flex items-center px-7 py-3.5 rounded-full bg-theme-brown text-white font-semibold text-sm hover:bg-white hover:text-theme-black transition-colors"
            >
              {primaryLabel}
            </Link>
          )}
          {secondaryLabel && (
            <Link
              href={secondaryUrl || '/'}
              className="inline-flex items-center px-7 py-3.5 rounded-full border border-white/25 text-white font-semibold text-sm hover:bg-theme-brown transition-colors"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>

        {badges && badges.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            {badges.map((b, i) => (
              <span
                key={i}
                className="text-xs text-white/40 border border-white/10 rounded-full px-3 py-1"
              >
                {b.text}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  </section>
)
