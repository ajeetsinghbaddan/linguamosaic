import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import type { Footer as FooterType, Media } from '@/payload-types'
import { NewsletterForm } from './NewsletterForm'
import { NewsletterFormPayload } from './NewsletterFormPayload'

export async function Footer() {
  const footerData: FooterType = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []
  const newsletter = footerData?.newsletter
  const copyrightText =
    footerData?.copyrightText ||
    '© 2026 LinguaMosaic Language Institute. All rights reserved. Crafted with care for language lovers.'

  const icon = newsletter?.icon as Media | null | undefined
  const logo = footerData?.logo as Media | null | undefined

  // Get form ID if a Payload form is selected
  const formRef = (newsletter as any)?.form
  const formId =
    typeof formRef === 'object' && formRef !== null
      ? String((formRef as any).id)
      : formRef
        ? String(formRef)
        : null

  // Language options for the custom form
  const languageOptions =
    newsletter?.languageOptions?.map((l) => l.language).filter((l): l is string => Boolean(l)) || []

  return (
    <footer className="mt-auto">
      {/* ── Newsletter Section ── */}
      <div className="bg-theme-black w-full py-20 px-4">
        <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-6">
          {/* Icon */}
          {icon?.url ? (
            <Image
              src={icon.url}
              alt={icon.alt || 'icon'}
              width={64}
              height={64}
              className="w-16 h-16 object-contain"
            />
          ) : (
            <span className="text-5xl">🌿</span>
          )}

          {/* Heading */}
          <div className="flex flex-col items-center gap-0">
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-white leading-tight">
              {newsletter?.headingMain || 'Stay Fluent,'}
            </h2>
            <h2 className="font-serif text-4xl md:text-5xl italic text-theme-yellow leading-tight">
              {newsletter?.headingAccent || 'Stay Connected'}
            </h2>
          </div>

          {/* Subtext */}
          <p className="text-white/60 text-sm md:text-base max-w-xl">
            {newsletter?.subtext ||
              'Weekly tips, new course alerts, and cultural insights — right to your inbox.'}
          </p>

          {/* Badge */}
          {newsletter?.badgeText && (
            <div className="border border-theme-yellow/60 rounded-full px-5 py-2 text-white/90 text-sm">
              {newsletter.badgeText}
            </div>
          )}

          {/* Form — uses Payload form API if form selected, otherwise inline */}
          {formId ? (
            <NewsletterFormPayload
              formId={formId}
              languageOptions={languageOptions}
              buttonText={newsletter?.buttonText || 'Subscribe'}
            />
          ) : (
            <NewsletterForm
              languageOptions={languageOptions}
              buttonText={newsletter?.buttonText || 'Subscribe'}
            />
          )}
        </div>
      </div>

      {/* ── Footer Bar ── */}
      <div className="bg-theme-black border-t border-white/10 px-4 py-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/">
            {logo?.url ? (
              <Image
                src={logo.url}
                alt={logo.alt || 'Site logo'}
                width={logo.width ?? 160}
                height={logo.height ?? 48}
                className="h-6 w-auto object-contain"
              />
            ) : (
              <Logo />
            )}
          </Link>
          <nav className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
            {navItems.map(({ link }, i) => (
              <CMSLink
                key={i}
                {...link}
                className="text-white/70 hover:text-white text-sm transition-colors"
              />
            ))}
          </nav>
        </div>
      </div>

      {/* ── Copyright Strip ── */}
      <div className="bg-theme-black border-t border-white/10 px-4 py-6">
        <p className="text-center text-white/40 text-xs">{copyrightText}</p>
      </div>
    </footer>
  )
}
