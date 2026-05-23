import React from 'react'

type Stat = { value?: string | null; label?: string | null }
type FacultyHeroProps = {
  eyebrow?: string | null
  headingMain?: string | null
  headingAccent?: string | null
  subtext?: string | null
  stats?: Stat[] | null
}

export const FacultyHero: React.FC<FacultyHeroProps> = ({
  eyebrow,
  headingMain,
  headingAccent,
  subtext,
  stats,
}) => (
  <section className="bg-theme-sand w-full">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
        {eyebrow && (
          <p className="text-xs font-semibold tracking-widest uppercase text-theme-sage">
            {eyebrow}
          </p>
        )}
        <div>
          <h1 className="font-serif font-bold text-theme-black text-4xl sm:text-5xl xl:text-6xl leading-[1.1]">
            {headingMain}
          </h1>
          {headingAccent && (
            <h1 className="font-serif italic text-theme-brown text-4xl sm:text-5xl xl:text-6xl leading-[1.1]">
              {headingAccent}
            </h1>
          )}
        </div>
        {subtext && <p className="text-theme-text text-lg leading-relaxed max-w-xl">{subtext}</p>}
        {stats && stats.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {stats.map((s, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white border border-theme-border rounded-full px-5 py-2.5"
              >
                <span className="font-serif font-bold text-theme-sage text-xl leading-none">
                  {s.value}
                </span>
                <span className="text-theme-text/50 text-xs">{s.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </section>
)
