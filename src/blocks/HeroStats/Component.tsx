import React from 'react'
import Link from 'next/link'

const barColorMap: Record<string, string> = {
  sage: 'bg-theme-sage',
  brown: 'bg-theme-brown',
  yellow: 'bg-theme-yellow',
  lightGreen: 'bg-theme-light-green',
}

type LanguageTag = {
  flag?: string | null
  name?: string | null
}

type ChartBar = {
  code?: string | null
  language?: string | null
  percentage?: number | null
  color?: string | null
}

type StatRow = {
  value?: string | null
  label?: string | null
}

type HeroStatsBlockProps = {
  headingMain?: string | null
  headingAccent?: string | null
  subtext?: string | null
  primaryButton?: { label?: string | null; url?: string | null } | null
  secondaryButton?: { label?: string | null; url?: string | null } | null
  languageTags?: LanguageTag[] | null
  moreLanguagesCount?: number | null
  satisfactionCard?: {
    label?: string | null
    value?: string | null
    subtext?: string | null
  } | null
  experienceCard?: { label?: string | null; value?: string | null; badge?: string | null } | null
  chartTitle?: string | null
  chartBars?: ChartBar[] | null
  statsRow?: StatRow[] | null
}

export const HeroStatsBlock: React.FC<HeroStatsBlockProps> = (props) => {
  const {
    headingMain,
    headingAccent,
    subtext,
    primaryButton,
    secondaryButton,
    languageTags,
    moreLanguagesCount,
    satisfactionCard,
    experienceCard,
    chartTitle,
    chartBars,
    statsRow,
  } = props

  return (
    <section className="bg-theme-sand w-full overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-8">
          {/* ── Left Column ── */}
          <div className="flex flex-col gap-6 lg:w-[45%] lg:pt-10">
            <div>
              <h1 className="font-serif font-bold text-theme-black text-4xl sm:text-5xl xl:text-6xl leading-[1.1]">
                {headingMain}
              </h1>
              <h1 className="font-serif italic text-theme-brown text-4xl sm:text-5xl xl:text-6xl leading-[1.1] mt-1">
                {headingAccent}
              </h1>
            </div>

            {subtext && (
              <p className="text-theme-text/70 text-base sm:text-lg leading-relaxed max-w-md">
                {subtext}
              </p>
            )}

            <div className="flex flex-wrap gap-3">
              {primaryButton?.label && (
                <Link
                  href={primaryButton.url || '/'}
                  className="inline-flex items-center px-6 py-3 rounded-full bg-theme-black text-white font-medium text-sm hover:bg-theme-yellow hover:text-black transition-colors"
                >
                  {primaryButton.label}
                </Link>
              )}
              {secondaryButton?.label && (
                <Link
                  href={secondaryButton.url || '/'}
                  className="inline-flex items-center px-6 py-3 rounded-full border border-theme-black text-theme-black font-medium text-sm hover:bg-black hover:text-white transition-colors"
                >
                  {secondaryButton.label}
                </Link>
              )}
            </div>

            {languageTags && languageTags.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center">
                {languageTags.map((tag: LanguageTag, i: number) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 border border-theme-border rounded-full px-3 py-1 text-xs text-theme-text/70 bg-white"
                  >
                    <span className="text-[10px] font-bold text-theme-text/40 uppercase tracking-wide">
                      {tag.flag}
                    </span>
                    {tag.name}
                  </span>
                ))}
                {moreLanguagesCount && moreLanguagesCount > 0 && (
                  <span className="inline-flex items-center border border-theme-border rounded-full px-3 py-1 text-xs text-theme-text/50 bg-white">
                    + {moreLanguagesCount} more
                  </span>
                )}
              </div>
            )}
          </div>

          {/* ── Right Column ── */}
          <div className="w-full lg:w-[55%]">
            {/* Mobile: stack cards naturally. Desktop: floating layout */}
            <div className="flex flex-col gap-4 lg:hidden">
              {/* Satisfaction card */}
              {satisfactionCard && (
                <div className="bg-white rounded-2xl shadow-md p-4 w-full">
                  <p className="text-[10px] font-semibold tracking-widest text-theme-text/40 uppercase mb-1">
                    {satisfactionCard.label}
                  </p>
                  <p className="font-sans font-bold text-3xl text-theme-black leading-none mb-1">
                    {satisfactionCard.value}
                  </p>
                  <p className="text-xs text-theme-text/50">{satisfactionCard.subtext}</p>
                </div>
              )}

              {/* Chart card */}
              <div className="bg-white rounded-2xl shadow-md p-5">
                {chartTitle && (
                  <p className="font-sans font-semibold text-theme-black text-base mb-4">
                    {chartTitle}
                  </p>
                )}
                <div className="flex flex-col gap-3 mb-5">
                  {chartBars?.map((bar: ChartBar, i: number) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xs font-bold text-theme-text/40 uppercase w-6 flex-shrink-0">
                        {bar.code}
                      </span>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-theme-text/60">{bar.language}</span>
                          <span className="text-xs text-theme-text/50">{bar.percentage}%</span>
                        </div>
                        <div className="w-full bg-theme-border/50 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${barColorMap[bar.color || 'sage']}`}
                            style={{ width: `${bar.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {statsRow && statsRow.length > 0 && (
                  <div className="grid grid-cols-3 border border-theme-border rounded-xl overflow-hidden">
                    {statsRow.map((stat: StatRow, i: number) => (
                      <div
                        key={i}
                        className={`flex flex-col items-center py-4 px-2 ${
                          i < statsRow.length - 1 ? 'border-r border-theme-border' : ''
                        }`}
                      >
                        <span className="font-sans font-semibold text-theme-sage text-lg leading-none">
                          {stat.value}
                        </span>
                        <span className="text-xs text-theme-text/50 mt-1">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Experience card */}
              {experienceCard && (
                <div className="bg-white rounded-2xl shadow-md p-4 w-full">
                  <p className="text-[10px] font-semibold tracking-widest text-theme-text/40 uppercase mb-1">
                    {experienceCard.label}
                  </p>
                  <p className="font-sans font-bold text-3xl text-theme-black leading-none mb-1">
                    {experienceCard.value}
                  </p>
                  <p className="text-xs text-theme-yellow font-medium">{experienceCard.badge}</p>
                </div>
              )}
            </div>

            {/* Desktop: absolute floating layout */}
            <div className="relative min-h-[520px] hidden lg:flex items-start justify-center">
              {satisfactionCard && (
                <div className="absolute -top-6 -left-6 z-10 bg-white rounded-2xl shadow-lg p-4 w-52">
                  <p className="text-[10px] font-semibold tracking-widest text-theme-text/40 uppercase mb-1">
                    {satisfactionCard.label}
                  </p>
                  <p className="font-sans font-bold text-3xl text-theme-black leading-none mb-1">
                    {satisfactionCard.value}
                  </p>
                  <p className="text-xs text-theme-text/50">{satisfactionCard.subtext}</p>
                </div>
              )}

              <div className="absolute top-16 right-0 left-8 bg-white rounded-2xl shadow-md p-6">
                {chartTitle && (
                  <p className="font-sans font-semibold text-theme-black text-lg mb-4">
                    {chartTitle}
                  </p>
                )}
                <div className="flex flex-col gap-3 mb-5">
                  {chartBars?.map((bar: ChartBar, i: number) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xs font-bold text-theme-text/40 uppercase w-6 flex-shrink-0">
                        {bar.code}
                      </span>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-theme-text/60">{bar.language}</span>
                          <span className="text-xs text-theme-text/50">{bar.percentage}%</span>
                        </div>
                        <div className="w-full bg-theme-border/50 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${barColorMap[bar.color || 'sage']}`}
                            style={{ width: `${bar.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {statsRow && statsRow.length > 0 && (
                  <div className="grid grid-cols-3 border border-theme-border rounded-xl overflow-hidden">
                    {statsRow.map((stat: StatRow, i: number) => (
                      <div
                        key={i}
                        className={`flex flex-col items-center py-4 px-2 ${
                          i < statsRow.length - 1 ? 'border-r border-theme-border' : ''
                        }`}
                      >
                        <span className="font-sans font-semibold text-theme-sage text-xl leading-none">
                          {stat.value}
                        </span>
                        <span className="text-xs text-theme-text/50 mt-1">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {experienceCard && (
                <div className="absolute bottom-10 -right-6 z-10 bg-white rounded-2xl shadow-lg p-4 w-52">
                  <p className="text-[10px] font-semibold tracking-widest text-theme-text/40 uppercase mb-1">
                    {experienceCard.label}
                  </p>
                  <p className="font-sans font-bold text-3xl text-theme-black leading-none mb-1">
                    {experienceCard.value}
                  </p>
                  <p className="text-xs text-theme-yellow font-medium">{experienceCard.badge}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
