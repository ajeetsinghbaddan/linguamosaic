'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'

type Tag = { tag?: string | null }
type Language = {
  flag?: string | null
  code?: string | null
  name?: string | null
  nativeName?: string | null
  region?: string | null
  level?: string | null
  students?: string | null
  instructors?: number | null
  tags?: Tag[] | null
  featured?: boolean | null
  url?: string | null
  color?: string | null
}

const colorMap: Record<string, string> = {
  sage: 'bg-theme-sage/10 text-theme-sage border-theme-sage/20',
  brown: 'bg-theme-brown/10 text-theme-brown border-theme-brown/20',
  yellow: 'bg-theme-yellow/20 text-theme-black border-theme-yellow/30',
  black: 'bg-theme-black/5 text-theme-black border-theme-black/10',
}

const codeBgMap: Record<string, string> = {
  sage: 'bg-theme-sage text-white',
  brown: 'bg-theme-brown text-white',
  yellow: 'bg-theme-yellow text-theme-black',
  black: 'bg-theme-black text-white',
}

const LanguageCard: React.FC<{ lang: Language }> = ({ lang }) => {
  const color = lang.color || 'sage'
  const tagStyle = colorMap[color]
  const codeBg = codeBgMap[color]

  return (
    <Link
      href={lang.url || '/'}
      className="group flex flex-col gap-4 bg-white border border-theme-border rounded-2xl p-5 hover:shadow-lg hover:border-theme-sage/30 hover:-translate-y-1 transition-all duration-300"
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{lang.flag}</span>
          <div>
            <p className="font-sans font-bold text-theme-black text-base leading-tight group-hover:text-theme-sage transition-colors">
              {lang.name}
            </p>
            {lang.nativeName && <p className="text-theme-text/40 text-xs">{lang.nativeName}</p>}
          </div>
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-lg ${codeBg}`}>{lang.code}</span>
      </div>

      {/* Level + students */}
      <div className="flex items-center gap-3 text-xs text-theme-text/50">
        {lang.level && (
          <span className="border border-theme-border rounded-full px-2.5 py-1">{lang.level}</span>
        )}
        {lang.students && <span>{lang.students} students</span>}
        {lang.instructors && <span>{lang.instructors} teachers</span>}
      </div>

      {/* Tags */}
      {lang.tags && lang.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {lang.tags.slice(0, 3).map((t, i) => (
            <span key={i} className={`text-xs px-2.5 py-1 rounded-full border ${tagStyle}`}>
              {t.tag}
            </span>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-theme-border/50">
        <span className="text-xs font-semibold text-theme-text/40 group-hover:text-theme-sage transition-colors">
          Explore programme →
        </span>
        {lang.featured && (
          <span className="text-[10px] font-bold tracking-widest uppercase text-theme-brown bg-theme-brown/10 border border-theme-brown/20 rounded-full px-2 py-0.5">
            Popular
          </span>
        )}
      </div>
    </Link>
  )
}

export const LanguagesGrid: React.FC<{
  eyebrow?: string | null
  heading?: string | null
  languages: Language[]
}> = ({ eyebrow, heading, languages }) => {
  const [search, setSearch] = useState('')
  const [activeRegion, setActiveRegion] = useState('All')

  const regions = useMemo(() => {
    const r = Array.from(new Set(languages.map((l) => l.region).filter(Boolean))) as string[]
    return ['All', ...r]
  }, [languages])

  const filtered = useMemo(() => {
    return languages.filter((l) => {
      const matchSearch =
        !search ||
        l.name?.toLowerCase().includes(search.toLowerCase()) ||
        l.nativeName?.toLowerCase().includes(search.toLowerCase()) ||
        l.tags?.some((t) => t.tag?.toLowerCase().includes(search.toLowerCase()))
      const matchRegion = activeRegion === 'All' || l.region === activeRegion
      return matchSearch && matchRegion
    })
  }, [languages, search, activeRegion])

  const featured = filtered.filter((l) => l.featured)
  const rest = filtered.filter((l) => !l.featured)

  return (
    <section className="bg-white w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Header */}
        <div className="mb-10">
          {eyebrow && (
            <p className="text-xs font-semibold tracking-widest uppercase text-theme-sage mb-3">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 className="font-serif font-bold text-theme-black text-3xl sm:text-4xl mb-8">
              {heading}
            </h2>
          )}

          {/* Search + filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-text/30"
              />
              <input
                type="text"
                placeholder="Search a language..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-theme-sand border border-theme-border rounded-full focus:outline-none focus:border-theme-sage/50 transition-colors placeholder:text-theme-text/30"
              />
            </div>

            {/* Region filters */}
            <div className="flex flex-wrap gap-2">
              {regions.map((r) => (
                <button
                  key={r}
                  onClick={() => setActiveRegion(r)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                    activeRegion === r
                      ? 'bg-theme-black text-white'
                      : 'bg-theme-sand border border-theme-border text-theme-text/60 hover:border-theme-sage/40 hover:text-theme-black'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
            <span className="text-4xl">🔍</span>
            <p className="text-theme-text/50 text-sm">No languages match your search.</p>
            <button
              onClick={() => {
                setSearch('')
                setActiveRegion('All')
              }}
              className="text-theme-sage text-sm font-medium hover:underline cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            {/* Featured */}
            {featured.length > 0 && (
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-theme-text/35 mb-4">
                  Popular
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {featured.map((l, i) => (
                    <LanguageCard key={i} lang={l} />
                  ))}
                </div>
              </div>
            )}

            {/* Rest */}
            {rest.length > 0 && (
              <div>
                {featured.length > 0 && (
                  <p className="text-xs font-semibold tracking-widest uppercase text-theme-text/35 mb-4">
                    All Languages
                  </p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {rest.map((l, i) => (
                    <LanguageCard key={i} lang={l} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
