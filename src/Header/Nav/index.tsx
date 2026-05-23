'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType; mobile?: boolean }> = ({
  data,
  mobile = false,
}) => {
  const navItems = data?.navItems || []

  return (
    <nav className={mobile ? 'flex flex-col gap-1' : 'flex items-center gap-0.5 md:gap-1 lg:gap-2'}>
      {navItems.map(({ link }, i) => (
        <CMSLink
          key={i}
          {...link}
          appearance="link"
          className={
            mobile
              ? 'text-base py-3 border-b border-theme-border/50 text-theme-text hover:text-theme-brown w-full'
              : 'px-2 md:px-2.5 lg:px-3 py-2 text-sm font-medium text-theme-text hover:text-theme-brown transition-colors whitespace-nowrap'
          }
        />
      ))}

      {!mobile && (
        <Link
          href="/search"
          className="p-2 text-theme-text hover:text-theme-brown transition-colors ml-1"
        >
          <span className="sr-only">Search</span>
          <SearchIcon className="w-4 h-4" />
        </Link>
      )}
    </nav>
  )
}
