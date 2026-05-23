'use client'

import React from 'react'
import Link from 'next/link'
import {
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from 'lucide-react'
import { FormBlock } from '@/blocks/Form/Component'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.261 5.636 5.903-5.636zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const detailIcons: Record<string, React.ReactNode> = {
  phone: <Phone size={16} />,
  email: <Mail size={16} />,
  hours: <Clock size={16} />,
  whatsapp: <MessageCircle size={16} />,
}

const socialIcons: Record<string, React.ReactNode> = {
  facebook: <Facebook size={16} />,
  instagram: <Instagram size={16} />,
  x: <XIcon />,
  linkedin: <Linkedin size={16} />,
  youtube: <Youtube size={16} />,
}

type Social = { platform?: string | null; url?: string | null }
type ContactDetail = {
  type?: string | null
  label?: string | null
  value?: string | null
  url?: string | null
}

type Props = {
  eyebrow?: string | null
  heading?: string | null
  subtext?: string | null
  form?: FormType | null
  locationName?: string | null
  locationAddress?: string | null
  mapUrl?: string | null
  contactDetails?: ContactDetail[] | null
  socials?: Social[] | null
}

export const ContactFormSectionClient: React.FC<Props> = ({
  eyebrow,
  heading,
  subtext,
  form,
  locationName,
  locationAddress,
  mapUrl,
  contactDetails,
  socials,
}) => (
  <section className="bg-white w-full">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Header */}
      <div className="mb-12 max-w-lg">
        {eyebrow && (
          <p className="text-xs font-semibold tracking-widest uppercase text-theme-sage mb-3">
            {eyebrow}
          </p>
        )}
        {heading && (
          <h2 className="font-serif font-bold text-theme-black text-3xl sm:text-4xl leading-[1.15] mb-2">
            {heading}
          </h2>
        )}
        {subtext && <p className="text-theme-text text-sm leading-relaxed">{subtext}</p>}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
        {/* Left — Form */}
        <div className="w-full lg:w-[55%]">
          {form && (
            <div className="[&_label]:text-sm [&_label]:font-medium [&_label]:text-theme-black [&_input]:rounded-xl [&_input]:border-theme-border [&_input]:bg-theme-sand [&_input]:px-4 [&_input]:py-3.5 [&_input]:text-sm [&_input]:w-full [&_input]:focus:outline-none [&_input]:focus:border-theme-sage/60 [&_input]:transition-colors [&_textarea]:rounded-xl [&_textarea]:border-theme-border [&_textarea]:bg-theme-sand [&_textarea]:px-4 [&_textarea]:py-3.5 [&_textarea]:text-sm [&_textarea]:w-full [&_textarea]:resize-none [&_textarea]:focus:outline-none [&_textarea]:focus:border-theme-sage/60 [&_select]:rounded-xl [&_select]:border-theme-border [&_select]:bg-theme-sand [&_select]:px-4 [&_select]:py-3.5 [&_select]:text-sm [&_select]:w-full [&_select]:focus:outline-none [&_button[type=submit]]:w-full [&_button[type=submit]]:py-4 [&_button[type=submit]]:rounded-full [&_button[type=submit]]:bg-theme-black [&_button[type=submit]]:text-white [&_button[type=submit]]:text-sm [&_button[type=submit]]:font-bold [&_button[type=submit]]:transition-all [&_button[type=submit]]:hover:bg-theme-brown [&_button[type=submit]]:cursor-pointer">
              <FormBlock form={form} enableIntro={false} />
            </div>
          )}
        </div>

        {/* Right — Info */}
        <div className="w-full lg:w-[45%] flex flex-col gap-5">
          {/* Map */}
          <Link
            href={mapUrl || 'https://maps.google.com'}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-2xl overflow-hidden border border-theme-border hover:shadow-md transition-shadow"
          >
            <div className="bg-theme-sage/15 h-48 flex flex-col items-center justify-center gap-2 relative">
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage:
                    'linear-gradient(var(--color-theme-sage) 1px, transparent 1px), linear-gradient(90deg, var(--color-theme-sage) 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
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

          {/* Contact details */}
          <div className="flex flex-col gap-2.5">
            {contactDetails?.map((detail: ContactDetail, i: number) => {
              const icon = detailIcons[detail.type || 'phone']
              const content = (
                <div className="flex items-center gap-4 p-3.5 rounded-xl border border-theme-border bg-white hover:border-theme-sage/40 hover:shadow-sm transition-all group">
                  <span className="w-10 h-10 rounded-xl bg-theme-sand border border-theme-border flex items-center justify-center text-theme-sage flex-shrink-0 group-hover:bg-theme-sage/10 transition-colors">
                    {icon}
                  </span>
                  <div className="flex flex-col min-w-0">
                    {detail.label && (
                      <span className="text-[11px] text-theme-text/40 font-medium uppercase tracking-wider">
                        {detail.label}
                      </span>
                    )}
                    <span className="text-sm font-semibold text-theme-black truncate">
                      {detail.value}
                    </span>
                  </div>
                </div>
              )

              return detail.url ? (
                <a
                  key={i}
                  href={detail.url}
                  target={detail.type === 'whatsapp' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                >
                  {content}
                </a>
              ) : (
                <div key={i}>{content}</div>
              )
            })}
          </div>

          {/* Socials */}
          {socials && socials.length > 0 && (
            <div className="flex gap-2 flex-wrap pt-1">
              {socials.map((s: Social, i: number) => (
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
