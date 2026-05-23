import React from 'react'
import Link from 'next/link'

type Guarantee = { icon?: string | null; title?: string | null; description?: string | null }
type PricingGuaranteeProps = {
  heading?: string | null
  subtext?: string | null
  guarantees?: Guarantee[] | null
  ctaLabel?: string | null
  ctaUrl?: string | null
}

export const PricingGuarantee: React.FC<PricingGuaranteeProps> = ({
  heading,
  subtext,
  guarantees,
  ctaLabel,
  ctaUrl,
}) => (
  <section className="bg-theme-black w-full">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-10 text-center">
        <div className="flex flex-col gap-4 max-w-xl">
          {heading && (
            <h2 className="font-serif font-bold text-white text-3xl sm:text-4xl leading-[1.15]">
              {heading}
            </h2>
          )}
          {subtext && <p className="text-white/50 text-sm leading-relaxed">{subtext}</p>}
        </div>

        {guarantees && guarantees.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {guarantees.map((g, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 transition-colors"
              >
                <span className="text-3xl">{g.icon}</span>
                <p className="font-sans font-bold text-white text-sm text-center">{g.title}</p>
                {g.description && (
                  <p className="text-white/40 text-xs text-center leading-relaxed">
                    {g.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {ctaLabel && (
          <Link
            href={ctaUrl || '/'}
            className="inline-flex items-center px-8 py-4 rounded-full bg-theme-brown text-white font-bold text-sm hover:bg-theme-brown/90 transition-colors"
          >
            {ctaLabel} →
          </Link>
        )}
      </div>
    </div>
  </section>
)
