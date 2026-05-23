import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Certification = {
  icon?: { url?: string | null; alt?: string | null } | null
  emoji?: string | null
  name?: string | null
  meta?: string | null
  url?: string | null
}

type CertificationsBlockProps = {
  eyebrow?: string | null
  heading?: string | null
  certifications?: Certification[] | null
}

const CertCard: React.FC<{ cert: Certification }> = ({ cert }) => {
  const inner = (
    <div className="flex items-center gap-3 bg-white border border-theme-border rounded-lg px-4 py-3 hover:shadow-md hover:border-theme-sage/40 transition-all duration-200 group cursor-pointer w-full">
      {/* Icon */}
      <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
        {cert.icon?.url ? (
          <Image
            src={cert.icon.url}
            alt={cert.icon.alt || cert.name || ''}
            width={36}
            height={36}
            className="w-9 h-9 object-contain"
          />
        ) : (
          <span className="text-2xl leading-none">{cert.emoji}</span>
        )}
      </div>

      {/* Text */}
      <div className="flex flex-col min-w-0">
        <span className="font-sans font-semibold text-theme-black text-sm leading-tight group-hover:text-theme-sage transition-colors truncate">
          {cert.name}
        </span>
        {cert.meta && (
          <span className="text-theme-text/45 text-xs mt-0.5 truncate">{cert.meta}</span>
        )}
      </div>
    </div>
  )

  if (cert.url) {
    return (
      <Link href={cert.url} className="block">
        {inner}
      </Link>
    )
  }

  return inner
}

export const CertificationsBlock: React.FC<CertificationsBlockProps> = ({
  eyebrow,
  heading,
  certifications,
}) => {
  return (
    <section className="bg-theme-sand w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* ── Header — centered ── */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          {eyebrow && (
            <p className="text-xs font-semibold tracking-widest uppercase text-theme-sage mb-3">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 className="font-serif font-bold text-theme-black text-3xl sm:text-4xl lg:text-5xl leading-[1.15]">
              {heading}
            </h2>
          )}
        </div>

        {/* ── Cards grid ── */}
        {certifications && certifications.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {certifications.map((cert, i) => (
              <CertCard key={i} cert={cert} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
