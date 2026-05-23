import React from 'react'
import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'

type Badge = { text?: string | null }
type Paragraph = { text?: string | null }

type AboutIntroBlockProps = {
  eyebrow?: string | null
  heading?: string | null
  statCard?: {
    number?: string | null
    description?: string | null
    badges?: Badge[] | null
  } | null
  paragraphs?: Paragraph[] | null
  primaryButton?: { label?: string | null; url?: string | null } | null
  phone?: { label?: string | null; number?: string | null } | null
}

export const AboutIntroBlock: React.FC<AboutIntroBlockProps> = ({
  eyebrow,
  heading,
  statCard,
  paragraphs,
  primaryButton,
  phone,
}) => {
  return (
    <section className="bg-white w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* ── Top: eyebrow + heading ── */}
        <div className="mb-10">
          {eyebrow && (
            <p className="text-xs font-semibold tracking-widest uppercase text-theme-sage mb-3">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 className="font-serif font-bold text-theme-black text-3xl sm:text-4xl lg:text-5xl leading-[1.15] max-w-lg">
              {heading}
            </h2>
          )}
        </div>

        {/* ── Bottom: two columns ── */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Left — stat card */}
          <div className="w-full lg:w-[50%]">
            <div className="bg-theme-sage/10 rounded-3xl p-8 sm:p-12 flex flex-col items-center justify-center text-center min-h-[340px] gap-4">
              {statCard?.number && (
                <span className="font-serif text-theme-sage font-bold text-7xl sm:text-8xl leading-none">
                  {statCard.number}
                </span>
              )}
              {statCard?.description && (
                <p className="text-theme-sage text-sm">{statCard.description}</p>
              )}
              {statCard?.badges && statCard.badges.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {statCard.badges.map((badge: Badge, i: number) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 bg-theme-sage/30 rounded-lg px-3 py-1.5 text-xs text-theme-text font-medium"
                    >
                      {badge.text}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right — text + CTAs */}
          <div className="w-full lg:w-[50%] flex flex-col gap-5 lg:pt-2">
            {/* Paragraphs */}
            <div className="py-6">
              <div className="flex flex-col gap-4">
                {paragraphs?.map((p: Paragraph, i: number) => (
                  <p key={i} className="text-theme-text text-base leading-relaxed">
                    {p.text}
                  </p>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 mt-4">
                {/* Primary button */}
                {primaryButton?.label && (
                  <Link
                    href={primaryButton.url || '/'}
                    className="inline-flex items-center gap-2 bg-theme-black text-white font-medium text-sm p-2 pl-6 rounded-full hover:bg-theme-brown transition-colors group"
                  >
                    {primaryButton.label}
                    <span className="w-10 h-10 rounded-full bg-theme-brown flex items-center justify-center group-hover:bg-theme-yellow transition-colors">
                      <ArrowRight size={14} />
                    </span>
                  </Link>
                )}

                {/* Phone CTA */}
                {phone?.number && (
                  <a
                    href={`tel:${phone.number.replace(/\s/g, '')}`}
                    className="inline-flex items-center gap-3"
                  >
                    <span className="w-11 h-11 rounded-full bg-theme-brown flex items-center justify-center text-white flex-shrink-0">
                      <Phone size={16} />
                    </span>
                    <span className="flex flex-col">
                      {phone.label && (
                        <span className="text-xs text-theme-text/50">{phone.label}</span>
                      )}
                      <span className="font-semibold text-theme-black text-lg">{phone.number}</span>
                    </span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
