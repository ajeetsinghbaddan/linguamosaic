import React from 'react'
import Image from 'next/image'

type Member = {
  photo?: { url?: string | null; alt?: string | null } | null
  name?: string | null
  role?: string | null
  bio?: string | null
  languages?: string | null
}

type AboutTeamProps = {
  eyebrow?: string | null
  heading?: string | null
  subtext?: string | null
  members?: Member[] | null
}

const PlaceholderAvatar: React.FC = () => (
  <div className="w-full aspect-square bg-theme-sage/15 flex items-center justify-center rounded-2xl">
    <svg viewBox="0 0 120 120" className="w-24 h-24 opacity-30" fill="none">
      <circle cx="60" cy="42" r="24" fill="#5C7A5C" />
      <ellipse cx="60" cy="100" rx="36" ry="24" fill="#5C7A5C" />
    </svg>
  </div>
)

export const AboutTeam: React.FC<AboutTeamProps> = ({ eyebrow, heading, subtext, members }) => (
  <section className="bg-white w-full">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="mb-12">
        {eyebrow && (
          <p className="text-xs font-semibold tracking-widest uppercase text-theme-sage mb-3">
            {eyebrow}
          </p>
        )}
        {heading && (
          <h2 className="font-serif font-bold text-theme-black text-3xl sm:text-4xl lg:text-5xl leading-[1.15] mb-3">
            {heading}
          </h2>
        )}
        {subtext && <p className="text-theme-text text-base">{subtext}</p>}
      </div>

      {members && members.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((m, i) => (
            <div
              key={i}
              className="group flex flex-col gap-4 p-5 rounded-2xl border border-theme-border hover:border-theme-sage/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Photo */}
              <div className="rounded-2xl overflow-hidden">
                {m.photo?.url ? (
                  <Image
                    src={m.photo.url}
                    alt={m.photo.alt || m.name || ''}
                    width={300}
                    height={300}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <PlaceholderAvatar />
                )}
              </div>

              {/* Info */}
              <div className="flex flex-col gap-1.5">
                <p className="font-sans font-bold text-theme-black text-base">{m.name}</p>
                <p className="text-theme-brown text-xs font-semibold">{m.role}</p>
                {m.bio && (
                  <p className="text-theme-text/55 text-sm leading-relaxed mt-1">{m.bio}</p>
                )}
                {m.languages && (
                  <p className="text-theme-sage text-xs mt-1 font-medium">{m.languages}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </section>
)
