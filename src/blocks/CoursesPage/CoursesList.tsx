'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, Users, Clock, BookOpen } from 'lucide-react'

type Tag = { tag?: string | null }
type Highlight = { text?: string | null }

type Course = {
  flag?: string | null
  language?: string | null
  title?: string | null
  format?: string | null
  level?: string | null
  duration?: string | null
  sessions?: string | null
  classSize?: string | null
  price?: string | null
  pricePeriod?: string | null
  featured?: boolean | null
  url?: string | null
  tags?: Tag[] | null
  highlights?: Highlight[] | null
}

const formatColors: Record<string, string> = {
  group: 'bg-theme-sage/10 text-theme-sage',
  private: 'bg-theme-brown/10 text-theme-brown',
  intensive: 'bg-theme-yellow/20 text-theme-black',
  online: 'bg-blue-50 text-blue-600',
  business: 'bg-theme-black/5 text-theme-black',
}

const formatLabels: Record<string, string> = {
  group: 'Group',
  private: 'Private',
  intensive: 'Intensive',
  online: 'Online',
  business: 'Business',
}

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const [expanded, setExpanded] = useState(false)
  const fmt = course.format || 'group'

  return (
    <div
      className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
        course.featured
          ? 'border-theme-sage/40 shadow-md'
          : 'border-theme-border hover:border-theme-sage/30 hover:shadow-md'
      }`}
    >
      {/* Featured banner */}
      {course.featured && (
        <div className="bg-theme-sage px-5 py-1.5">
          <p className="text-white text-xs font-semibold tracking-wider uppercase">
            ⭐ Most Popular
          </p>
        </div>
      )}

      <div className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          {/* Left */}
          <div className="flex-1 flex flex-col gap-3">
            {/* Language + format */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xl">{course.flag}</span>
              <span className="text-xs font-medium text-theme-text/50">{course.language}</span>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${formatColors[fmt]}`}
              >
                {formatLabels[fmt]}
              </span>
              {course.level && (
                <span className="text-xs border border-theme-border rounded-full px-2.5 py-1 text-theme-text/50">
                  {course.level}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="font-serif font-bold text-theme-black text-lg leading-snug">
              {course.title}
            </h3>

            {/* Meta row */}
            <div className="flex flex-wrap gap-4 text-xs text-theme-text/50">
              {course.duration && (
                <span className="flex items-center gap-1.5">
                  <Clock size={12} /> {course.duration}
                </span>
              )}
              {course.sessions && (
                <span className="flex items-center gap-1.5">
                  <BookOpen size={12} /> {course.sessions}
                </span>
              )}
              {course.classSize && (
                <span className="flex items-center gap-1.5">
                  <Users size={12} /> {course.classSize}
                </span>
              )}
            </div>

            {/* Tags */}
            {course.tags && course.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {course.tags.map((t, i) => (
                  <span
                    key={i}
                    className="text-xs bg-theme-sand border border-theme-border rounded-full px-2.5 py-1 text-theme-text/60"
                  >
                    {t.tag}
                  </span>
                ))}
              </div>
            )}

            {/* Expandable highlights */}
            {course.highlights && course.highlights.length > 0 && (
              <div>
                <button
                  onClick={() => setExpanded((v) => !v)}
                  className="text-xs text-theme-sage font-medium hover:underline cursor-pointer"
                >
                  {expanded ? '▲ Hide details' : '▼ What is included'}
                </button>
                {expanded && (
                  <ul className="mt-3 flex flex-col gap-1.5">
                    {course.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-theme-text/65">
                        <span className="text-theme-sage mt-0.5 flex-shrink-0">✓</span>
                        {h.text}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Right — price + CTA */}
          <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 sm:min-w-[120px]">
            <div className="text-right">
              <span className="font-serif font-bold text-theme-brown text-2xl leading-none">
                {course.price}
              </span>
              {course.pricePeriod && (
                <p className="text-theme-text/40 text-xs mt-0.5">{course.pricePeriod}</p>
              )}
            </div>
            <Link
              href={course.url || '/'}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-theme-black text-white text-xs font-semibold hover:bg-theme-brown transition-colors whitespace-nowrap"
            >
              Enroll Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export const CoursesList: React.FC<{
  eyebrow?: string | null
  heading?: string | null
  courses: Course[]
}> = ({ eyebrow, heading, courses }) => {
  const [search, setSearch] = useState('')
  const [activeFormat, setActiveFormat] = useState('all')
  const [activeLanguage, setActiveLanguage] = useState('All')
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default')

  const formats = ['all', 'group', 'private', 'intensive', 'online', 'business']

  const languages = useMemo(() => {
    const langs = Array.from(new Set(courses.map((c) => c.language).filter(Boolean))) as string[]
    return ['All', ...langs]
  }, [courses])

  const filtered = useMemo(() => {
    let result = courses.filter((c) => {
      const matchSearch =
        !search ||
        c.title?.toLowerCase().includes(search.toLowerCase()) ||
        c.language?.toLowerCase().includes(search.toLowerCase()) ||
        c.tags?.some((t) => t.tag?.toLowerCase().includes(search.toLowerCase()))
      const matchFormat = activeFormat === 'all' || c.format === activeFormat
      const matchLang = activeLanguage === 'All' || c.language === activeLanguage
      return matchSearch && matchFormat && matchLang
    })

    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => {
        const pa = parseInt((a.price || '0').replace(/[^\d]/g, ''))
        const pb = parseInt((b.price || '0').replace(/[^\d]/g, ''))
        return pa - pb
      })
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => {
        const pa = parseInt((a.price || '0').replace(/[^\d]/g, ''))
        const pb = parseInt((b.price || '0').replace(/[^\d]/g, ''))
        return pb - pa
      })
    }

    return result
  }, [courses, search, activeFormat, activeLanguage, sortBy])

  return (
    <section className="bg-white w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Header */}
        <div className="mb-10">
          {eyebrow && (
            <p className="text-xs font-semibold tracking-widest uppercase text-theme-sage mb-2">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 className="font-serif font-bold text-theme-black text-3xl sm:text-4xl mb-8">
              {heading}
            </h2>
          )}

          {/* Controls */}
          <div className="flex flex-col gap-4">
            {/* Search + Sort */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-text/30"
                />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-sm bg-theme-sand border border-theme-border rounded-full focus:outline-none focus:border-theme-sage/50 transition-colors placeholder:text-theme-text/30"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="text-sm bg-theme-sand border border-theme-border rounded-full px-4 py-2.5 focus:outline-none focus:border-theme-sage/50 text-theme-text/70 cursor-pointer"
              >
                <option value="default">Sort: Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            {/* Format tabs */}
            <div className="flex flex-wrap gap-2">
              {formats.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFormat(f)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer capitalize ${
                    activeFormat === f
                      ? 'bg-theme-black text-white'
                      : 'bg-theme-sand border border-theme-border text-theme-text/60 hover:border-theme-sage/40'
                  }`}
                >
                  {f === 'all' ? 'All Formats' : formatLabels[f]}
                </button>
              ))}
            </div>

            {/* Language filter */}
            <div className="flex flex-wrap gap-2">
              {languages.map((l) => (
                <button
                  key={l}
                  onClick={() => setActiveLanguage(l)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                    activeLanguage === l
                      ? 'bg-theme-sage text-white'
                      : 'bg-theme-sand border border-theme-border text-theme-text/60 hover:border-theme-sage/40'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-xs text-theme-text/40 mb-5">
          {filtered.length} course{filtered.length !== 1 ? 's' : ''} found
        </p>

        {/* Course cards */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
            <span className="text-4xl">📭</span>
            <p className="text-theme-text/50 text-sm">No courses match your filters.</p>
            <button
              onClick={() => {
                setSearch('')
                setActiveFormat('all')
                setActiveLanguage('All')
              }}
              className="text-theme-sage text-sm font-medium hover:underline cursor-pointer"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((course, i) => (
              <CourseCard key={i} course={course} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
