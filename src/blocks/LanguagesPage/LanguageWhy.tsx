import React from 'react'

type Feature = { icon?: string | null; title?: string | null; description?: string | null }
type LanguageWhyProps = {
  eyebrow?: string | null
  heading?: string | null
  features?: Feature[] | null
}

export const LanguageWhy: React.FC<LanguageWhyProps> = ({ eyebrow, heading, features }) => (
  <section className="bg-theme-sand w-full">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
        {/* Left — sticky heading */}
        <div className="lg:w-1/3 lg:sticky lg:top-28">
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

        {/* Right — features */}
        <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {features?.map((f, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 p-6 bg-white rounded-2xl border border-theme-border hover:border-theme-sage/40 hover:shadow-md transition-all duration-200 group"
            >
              <span className="text-3xl">{f.icon}</span>
              <p className="font-sans font-semibold text-theme-black text-base group-hover:text-theme-sage transition-colors">
                {f.title}
              </p>
              <p className="text-theme-text/55 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
)
