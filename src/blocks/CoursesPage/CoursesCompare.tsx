import React from 'react'
import Link from 'next/link'

type Format = {
  icon?: string | null
  title?: string | null
  description?: string | null
  bestFor?: string | null
  price?: string | null
  featured?: boolean | null
  url?: string | null
}

type CoursesCompareProps = {
  eyebrow?: string | null
  heading?: string | null
  formats?: Format[] | null
}

export const CoursesCompare: React.FC<CoursesCompareProps> = ({ eyebrow, heading, formats }) => (
  <section className="bg-theme-sand w-full">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="mb-12 max-w-xl">
        {eyebrow && (
          <p className="text-xs font-semibold tracking-widest uppercase text-theme-sage mb-3">
            {eyebrow}
          </p>
        )}
        {heading && (
          <h2 className="font-serif font-bold text-theme-black text-3xl sm:text-4xl leading-[1.15]">
            {heading}
          </h2>
        )}
      </div>

      {formats && formats.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {formats.map((f, i) => (
            <div
              key={i}
              className={`relative flex flex-col gap-4 rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                f.featured
                  ? 'bg-theme-black border-theme-black text-white'
                  : 'bg-white border-theme-border'
              }`}
            >
              {f.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-theme-brown text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full whitespace-nowrap">
                  Most Popular
                </span>
              )}

              <span className="text-3xl">{f.icon}</span>

              <div className="flex flex-col gap-1.5">
                <p
                  className={`font-sans font-bold text-base ${f.featured ? 'text-white' : 'text-theme-black'}`}
                >
                  {f.title}
                </p>
                <p
                  className={`text-sm leading-relaxed ${f.featured ? 'text-white/60' : 'text-theme-text/55'}`}
                >
                  {f.description}
                </p>
              </div>

              <div
                className={`flex flex-col gap-1 pt-4 border-t ${f.featured ? 'border-white/10' : 'border-theme-border'}`}
              >
                {f.bestFor && (
                  <div className="flex flex-col gap-0.5">
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider ${f.featured ? 'text-white/30' : 'text-theme-text/35'}`}
                    >
                      Best for
                    </span>
                    <span
                      className={`text-xs font-medium ${f.featured ? 'text-white/70' : 'text-theme-text/70'}`}
                    >
                      {f.bestFor}
                    </span>
                  </div>
                )}
                {f.price && (
                  <span
                    className={`text-sm font-bold mt-1 ${f.featured ? 'text-theme-yellow' : 'text-theme-brown'}`}
                  >
                    {f.price}
                  </span>
                )}
              </div>

              {f.url && (
                <Link
                  href={f.url}
                  className={`mt-auto w-full text-center py-2.5 rounded-full text-xs font-semibold transition-colors ${
                    f.featured
                      ? 'bg-theme-sage/30 text-white hover:bg-theme-sage/50'
                      : 'bg-theme-sand border border-theme-border text-theme-black hover:bg-theme-black hover:text-white hover:border-theme-black'
                  }`}
                >
                  View Courses →
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  </section>
)
