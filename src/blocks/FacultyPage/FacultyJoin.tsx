import React from 'react'
import Link from 'next/link'

type Perk = { icon?: string | null; text?: string | null }
type FacultyJoinProps = {
  eyebrow?: string | null
  heading?: string | null
  subtext?: string | null
  perks?: Perk[] | null
  ctaLabel?: string | null
  ctaUrl?: string | null
  secondaryLabel?: string | null
  secondaryUrl?: string | null
}

export const FacultyJoin: React.FC<FacultyJoinProps> = ({
  eyebrow,
  heading,
  subtext,
  perks,
  ctaLabel,
  ctaUrl,
  secondaryLabel,
  secondaryUrl,
}) => (
  <section className="bg-theme-black w-full">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
      <div className="mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
        {/* Left */}
        <div className="flex flex-col gap-5 lg:w-1/2">
          {eyebrow && (
            <p className="text-xs font-semibold tracking-widest uppercase text-theme-yellow">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 className="font-serif font-bold text-white text-3xl sm:text-4xl leading-[1.15]">
              {heading}
            </h2>
          )}
          {subtext && <p className="text-white/50 text-sm leading-relaxed">{subtext}</p>}
          <div className="flex flex-wrap gap-3 mt-2">
            {ctaLabel && (
              <Link
                href={ctaUrl || '/'}
                className="inline-flex items-center px-6 py-3.5 rounded-full bg-theme-brown text-white font-semibold text-sm hover:bg-theme-brown/90 transition-colors"
              >
                {ctaLabel}
              </Link>
            )}
            {secondaryLabel && (
              <Link
                href={secondaryUrl || '/'}
                className="inline-flex items-center px-6 py-3.5 rounded-full border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>

        {/* Right — perks */}
        {perks && perks.length > 0 && (
          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {perks.map((p, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/8 transition-colors"
              >
                <span className="text-2xl flex-shrink-0">{p.icon}</span>
                <span className="text-white/70 text-sm leading-relaxed">{p.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </section>
)
