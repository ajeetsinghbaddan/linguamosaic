import React from 'react'
import Link from 'next/link'
import { Phone, Mail, Clock, MapPin } from 'lucide-react'

type Office = {
  emoji?: string | null
  name?: string | null
  address?: string | null
  phone?: string | null
  email?: string | null
  hours?: string | null
  mapUrl?: string | null
  featured?: boolean | null
}

type ContactOfficesProps = {
  eyebrow?: string | null
  heading?: string | null
  offices?: Office[] | null
}

export const ContactOffices: React.FC<ContactOfficesProps> = ({ eyebrow, heading, offices }) => (
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

      {offices && offices.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {offices.map((office: Office, i: number) => (
            <div
              key={i}
              className={`flex flex-col gap-4 rounded-2xl p-6 border transition-all duration-200 hover:shadow-md hover:-translate-y-1 ${
                office.featured
                  ? 'bg-theme-black border-theme-black'
                  : 'bg-white border-theme-border'
              }`}
            >
              {/* Emoji + name */}
              <div className="flex flex-col gap-2">
                <span className="text-3xl">{office.emoji}</span>
                <div>
                  <p
                    className={`font-sans font-bold text-base ${
                      office.featured ? 'text-white' : 'text-theme-black'
                    }`}
                  >
                    {office.name}
                  </p>
                  {office.featured && (
                    <span className="text-[10px] font-bold tracking-widest uppercase text-theme-brown bg-theme-brown/20 rounded-full px-2.5 py-0.5 mt-1 inline-block">
                      Main Centre
                    </span>
                  )}
                </div>
              </div>

              {/* Address */}
              {office.address && (
                <div className="flex items-start gap-2.5">
                  <MapPin
                    size={14}
                    className={`flex-shrink-0 mt-0.5 ${office.featured ? 'text-white/40' : 'text-theme-sage'}`}
                  />
                  <p
                    className={`text-sm leading-relaxed whitespace-pre-line ${
                      office.featured ? 'text-white/60' : 'text-theme-text/60'
                    }`}
                  >
                    {office.address}
                  </p>
                </div>
              )}

              {/* Details */}
              <div
                className={`flex flex-col gap-2 pt-4 border-t ${
                  office.featured ? 'border-white/10' : 'border-theme-border/50'
                }`}
              >
                {office.phone && (
                  <a
                    href={`tel:${office.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-2 group"
                  >
                    <Phone
                      size={13}
                      className={office.featured ? 'text-white/30' : 'text-theme-sage'}
                    />
                    <span
                      className={`text-xs font-medium transition-colors ${
                        office.featured
                          ? 'text-white/60 group-hover:text-white'
                          : 'text-theme-text/60 group-hover:text-theme-sage'
                      }`}
                    >
                      {office.phone}
                    </span>
                  </a>
                )}
                {office.email && (
                  <a href={`mailto:${office.email}`} className="flex items-center gap-2 group">
                    <Mail
                      size={13}
                      className={office.featured ? 'text-white/30' : 'text-theme-sage'}
                    />
                    <span
                      className={`text-xs font-medium transition-colors ${
                        office.featured
                          ? 'text-white/60 group-hover:text-white'
                          : 'text-theme-text/60 group-hover:text-theme-sage'
                      }`}
                    >
                      {office.email}
                    </span>
                  </a>
                )}
                {office.hours && (
                  <div className="flex items-center gap-2">
                    <Clock
                      size={13}
                      className={office.featured ? 'text-white/30' : 'text-theme-sage'}
                    />
                    <span
                      className={`text-xs ${
                        office.featured ? 'text-white/50' : 'text-theme-text/50'
                      }`}
                    >
                      {office.hours}
                    </span>
                  </div>
                )}
              </div>

              {/* Map link */}
              {office.mapUrl && (
                <Link
                  href={office.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full text-center py-2.5 rounded-full text-xs font-semibold transition-all duration-200 mt-auto ${
                    office.featured
                      ? 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
                      : 'bg-theme-sand border border-theme-border text-theme-black hover:bg-theme-black hover:text-white hover:border-theme-black'
                  }`}
                >
                  View on Map →
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  </section>
)
