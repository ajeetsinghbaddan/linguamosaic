import React from 'react'
import Image from 'next/image'

type Stat = { value?: string | null; label?: string | null }
type AboutHeroProps = {
  eyebrow?: string | null
  headingMain?: string | null
  headingAccent?: string | null
  subtext?: string | null
  stats?: Stat[] | null
  image?: { url?: string | null; alt?: string | null } | null
}

export const AboutHero: React.FC<AboutHeroProps> = ({
  eyebrow,
  headingMain,
  headingAccent,
  subtext,
  stats,
  image,
}) => (
  <section className="bg-theme-sand w-full overflow-hidden">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-end">
        {/* Left */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6 pb-0 lg:pb-24">
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
          {subtext && (
            <p className="text-theme-text/65 text-lg leading-relaxed max-w-md">{subtext}</p>
          )}

          {/* Stats grid */}
          {stats && stats.length > 0 && (
            <div className="grid grid-cols-2 gap-x-8 gap-y-5 mt-4 pt-6 border-t border-theme-border">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span className="font-serif font-bold text-theme-sage text-3xl sm:text-4xl leading-none">
                    {stat.value}
                  </span>
                  <span className="text-xs text-theme-text/50 leading-snug">{stat.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right — image: full bleed on mobile, rounded-t on desktop */}
        <div className="w-full lg:w-1/2">
          {image?.url ? (
            <div className="w-full rounded-t-3xl overflow-hidden lg:min-h-[480px]">
              <Image
                src={image.url}
                alt={image.alt || ''}
                width={700}
                height={600}
                className="w-full h-[300px] sm:h-[400px] lg:h-full object-cover object-top"
                priority
              />
            </div>
          ) : (
            <div className="w-full rounded-t-3xl overflow-hidden bg-theme-sage/15 h-[300px] sm:h-[400px] lg:min-h-[480px] flex flex-col items-center justify-center gap-4 text-theme-sage/40">
              <span className="text-8xl">🌍</span>
              <span className="text-sm font-medium">Upload a hero image</span>
            </div>
          )}
        </div>
      </div>
    </div>
  </section>
)
