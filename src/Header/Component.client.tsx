'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import NextImage from 'next/image'

import type { Header, Media } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { CMSLink } from '@/components/Link'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
  }, [headerTheme])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const ctaButton = (data as any)?.ctaButton?.link
  const logo = data?.logo as Media | null | undefined

  return (
    <header
      className="sticky top-0 z-50 w-full bg-theme-sand border-b border-theme-border"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* ── Desktop: 3-column grid ── */}
        <div className="hidden md:grid md:grid-cols-[180px_1fr_180px] lg:grid-cols-[220px_1fr_220px] md:items-center md:h-20">
          {/* Col 1 — Logo left */}
          <div className="flex items-center justify-start min-w-0">
            <Link href="/" className="flex items-center flex-shrink-0">
              {logo?.url ? (
                <NextImage
                  src={logo.url}
                  alt={logo.alt || 'Site logo'}
                  width={logo.width ?? 160}
                  height={logo.height ?? 48}
                  className="h-6 w-auto object-contain"
                  priority
                />
              ) : (
                <Logo loading="eager" priority="high" />
              )}
            </Link>
          </div>

          {/* Col 2 — Nav center */}
          <nav className="flex items-center justify-center min-w-0 overflow-hidden">
            <HeaderNav data={data} />
          </nav>

          {/* Col 3 — CTA right */}
          <div className="flex items-center justify-end min-w-0">
            {ctaButton && (
              <CMSLink
                {...ctaButton}
                className="inline-flex items-center px-4 py-2.5 rounded-full bg-theme-brown text-white font-medium text-sm hover:bg-theme-brown/90 transition-colors duration-200 whitespace-nowrap"
              />
            )}
          </div>
        </div>

        {/* ── Mobile: flex row ── */}
        <div className="flex md:hidden items-center justify-between h-16">
          <Link href="/" className="flex items-center flex-shrink-0">
            {logo?.url ? (
              <NextImage
                src={logo.url}
                alt={logo.alt || 'Site logo'}
                width={logo.width ?? 160}
                height={logo.height ?? 48}
                className="h-9 w-auto object-contain"
                priority
              />
            ) : (
              <Logo loading="eager" priority="high" />
            )}
          </Link>

          <button
            className="p-2 rounded-md text-theme-text hover:bg-theme-border/40 transition-colors cursor-pointer"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } bg-theme-sand border-t border-theme-border`}
      >
        <div className="w-full px-4 pb-6 pt-4 flex flex-col gap-4">
          <HeaderNav data={data} mobile />
          {ctaButton && (
            <CMSLink
              {...ctaButton}
              className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-theme-brown text-white font-medium text-sm hover:bg-theme-brown/90 transition-colors duration-200 w-full"
            />
          )}
        </div>
      </div>
    </header>
  )
}
