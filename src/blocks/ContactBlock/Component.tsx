import React from 'react'
import Link from 'next/link'
import { Phone, Mail, Clock, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'
import { FormBlock } from '@/blocks/Form/Component'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.261 5.636 5.903-5.636zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const socialIcons: Record<string, React.ReactNode> = {
  facebook: <Facebook size={16} />,
  instagram: <Instagram size={16} />,
  x: <XIcon />,
  linkedin: <Linkedin size={16} />,
  youtube: <Youtube size={16} />,
}

type Social = { platform?: string | null; url?: string | null }

type ContactBlockProps = {
  eyebrow?: string | null
  heading?: string | null
  form?: FormType | string | number | null
  locationName?: string | null
  locationAddress?: string | null
  mapUrl?: string | null
  phone?: string | null
  email?: string | null
  hours?: string | null
  socials?: Social[] | null
}

export const ContactBlock: React.FC<ContactBlockProps> = ({
  eyebrow,
  heading,
  form,
  locationName,
  locationAddress,
  mapUrl,
  phone,
  email,
  hours,
  socials,
}) => {
  return (
    <section className="bg-theme-sand w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* ── Header ── */}
        <div className="mb-10 max-w-lg">
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

        {/* ── Two columns ── */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          {/* Left — Payload Form */}
          <div className="w-full lg:w-[55%]">
            {form && typeof form === 'object' && (
              <div className="contact-form-wrapper [&_input]:rounded-xl [&_input]:border-theme-border [&_input]:bg-white [&_input]:px-4 [&_input]:py-3.5 [&_input]:text-sm [&_input]:text-theme-black [&_input]:placeholder:text-theme-text/30 [&_input]:focus:outline-none [&_input]:focus:border-theme-sage/60 [&_input]:transition-colors [&_input]:w-full [&_textarea]:rounded-xl [&_textarea]:border-theme-border [&_textarea]:bg-white [&_textarea]:px-4 [&_textarea]:py-3.5 [&_textarea]:text-sm [&_textarea]:text-theme-black [&_textarea]:placeholder:text-theme-text/30 [&_textarea]:focus:outline-none [&_textarea]:focus:border-theme-sage/60 [&_textarea]:transition-colors [&_textarea]:w-full [&_textarea]:resize-none [&_select]:rounded-xl [&_select]:border-theme-border [&_select]:bg-white [&_select]:px-4 [&_select]:py-3.5 [&_select]:text-sm [&_select]:w-full [&_select]:focus:outline-none [&_select]:focus:border-theme-sage/60 [&_label]:text-sm [&_label]:font-medium [&_label]:text-theme-black [&_button[type=submit]]:w-full [&_button[type=submit]]:py-4 [&_button[type=submit]]:rounded-full [&_button[type=submit]]:bg-theme-black [&_button[type=submit]]:text-white [&_button[type=submit]]:text-sm [&_button[type=submit]]:font-semibold [&_button[type=submit]]:transition-all [&_button[type=submit]]:hover:bg-theme-black/80 [&_button[type=submit]]:cursor-pointer">
                <FormBlock form={form as FormType} enableIntro={false} />
              </div>
            )}
          </div>

          {/* Right — Info */}
          <div className="w-full lg:w-[45%] flex flex-col gap-4">
            {/* Map placeholder */}
            <Link
              href={mapUrl || 'https://maps.google.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-2xl overflow-hidden border border-theme-border hover:shadow-md transition-shadow"
            >
              <div className="bg-theme-sage/20 h-44 flex flex-col items-center justify-center gap-2 relative">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      'linear-gradient(var(--color-theme-sage) 1px, transparent 1px), linear-gradient(90deg, var(--color-theme-sage) 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                  }}
                />
                <span className="text-3xl relative z-10">📍</span>
                <div className="relative z-10 text-center px-4">
                  <p className="font-sans font-semibold text-theme-black text-sm">{locationName}</p>
                  {locationAddress && (
                    <p className="text-theme-brown text-xs mt-0.5">{locationAddress}</p>
                  )}
                </div>
              </div>
            </Link>

            {/* Contact info rows */}
            <div className="flex flex-col gap-3">
              {phone && (
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-4 p-3 rounded-xl border border-theme-border bg-white hover:border-theme-sage/40 hover:shadow-sm transition-all group"
                >
                  <span className="w-10 h-10 rounded-xl bg-theme-sand border border-theme-border flex items-center justify-center text-theme-sage flex-shrink-0 group-hover:bg-theme-sage/10 transition-colors">
                    <Phone size={16} />
                  </span>
                  <span className="text-sm font-medium text-theme-black">{phone}</span>
                </a>
              )}

              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-4 p-3 rounded-xl border border-theme-border bg-white hover:border-theme-sage/40 hover:shadow-sm transition-all group"
                >
                  <span className="w-10 h-10 rounded-xl bg-theme-sand border border-theme-border flex items-center justify-center text-theme-sage flex-shrink-0 group-hover:bg-theme-sage/10 transition-colors">
                    <Mail size={16} />
                  </span>
                  <span className="text-sm font-medium text-theme-black">{email}</span>
                </a>
              )}

              {hours && (
                <div className="flex items-center gap-4 p-3 rounded-xl border border-theme-border bg-white">
                  <span className="w-10 h-10 rounded-xl bg-theme-sand border border-theme-border flex items-center justify-center text-theme-sage flex-shrink-0">
                    <Clock size={16} />
                  </span>
                  <span className="text-sm text-theme-text/70 leading-relaxed">{hours}</span>
                </div>
              )}
            </div>

            {/* Social links */}
            {socials && socials.length > 0 && (
              <div className="flex gap-2 flex-wrap mt-1">
                {socials.map((s, i) => (
                  <Link
                    key={i}
                    href={s.url || '/'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl border border-theme-border bg-white flex items-center justify-center text-theme-text/50 hover:text-theme-sage hover:border-theme-sage/40 hover:shadow-sm transition-all"
                  >
                    {s.platform && socialIcons[s.platform]}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
