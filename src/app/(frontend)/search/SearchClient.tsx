'use client'

import React, { useCallback, useEffect, useRef, useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Search, X, ArrowRight, Loader2 } from 'lucide-react'

type SearchResult = {
  id: string | number
  title?: string | null
  slug?: string | null
  doc?: { relationTo?: string; value?: any } | null
  meta?: {
    title?: string | null
    description?: string | null
  } | null
}

type Props = {
  query: string
  results: SearchResult[]
  totalDocs: number
  totalPages: number
  currentPage: number
}

const getResultUrl = (result: SearchResult): string => {
  const collection = result.doc?.relationTo
  const slug = result.slug || result.doc?.value?.slug || ''
  switch (collection) {
    case 'posts':
      return `/blog/${slug}`
    case 'pages':
      return `/${slug}`
    default:
      return `/${slug}`
  }
}

const getCollectionLabel = (collection?: string): string => {
  switch (collection) {
    case 'posts':
      return 'Blog'
    case 'pages':
      return 'Page'
    default:
      return 'Content'
  }
}

const collectionColors: Record<string, string> = {
  posts: 'bg-theme-yellow/20 text-theme-black',
  pages: 'bg-theme-sage/10 text-theme-sage',
}

export const SearchClient: React.FC<Props> = ({
  query,
  results,
  totalDocs,
  totalPages,
  currentPage,
}) => {
  const router = useRouter()
  const searchParamsHook = useSearchParams()
  const [inputValue, setInputValue] = useState(query)
  const [isPending, startTransition] = useTransition()
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const updateSearch = useCallback(
    (value: string) => {
      startTransition(() => {
        const params = new URLSearchParams(searchParamsHook.toString())
        if (value) {
          params.set('q', value)
        } else {
          params.delete('q')
        }
        params.delete('page')
        router.push(`/search?${params.toString()}`, { scroll: false })
      })
    },
    [router, searchParamsHook],
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => updateSearch(value), 400)
  }

  const handleClear = () => {
    setInputValue('')
    updateSearch('')
    inputRef.current?.focus()
  }

  const handlePageChange = (p: number) => {
    const params = new URLSearchParams(searchParamsHook.toString())
    params.set('page', String(p))
    router.push(`/search?${params.toString()}`)
  }

  return (
    <div className="bg-theme-sand min-h-screen w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* ── Header ── */}
        <div className="max-w-2xl mx-auto mb-10 flex flex-col gap-4">
          <p className="text-xs font-semibold tracking-widest uppercase text-theme-sage">Search</p>
          <h1 className="font-serif font-bold text-theme-black text-4xl sm:text-5xl leading-[1.1]">
            What are you looking for?
          </h1>

          {/* Search input */}
          <div className="relative mt-2">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-text/35"
            />
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder="Search courses, languages, blog posts..."
              className="w-full pl-12 pr-12 py-4 text-base bg-white border border-theme-border rounded-2xl focus:outline-none focus:border-theme-sage/60 transition-colors placeholder:text-theme-text/30 shadow-sm"
            />
            {inputValue && (
              <button
                onClick={handleClear}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-theme-text/30 hover:text-theme-black transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            )}
            {isPending && (
              <Loader2
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-theme-sage animate-spin"
              />
            )}
          </div>
        </div>

        {/* ── Results ── */}
        <div className="max-w-2xl mx-auto">
          {/* No query */}
          {!query && (
            <div className="flex flex-col items-center py-20 gap-3 text-center">
              <span className="text-5xl">🔍</span>
              <p className="text-theme-text/50 text-base">
                Start typing to search across all content.
              </p>
            </div>
          )}

          {/* Query with no results */}
          {query && !isPending && results.length === 0 && (
            <div className="flex flex-col items-center py-20 gap-3 text-center">
              <span className="text-5xl">📭</span>
              <p className="font-serif font-semibold text-theme-black text-xl">
                No results for "{query}"
              </p>
              <p className="text-theme-text/50 text-sm max-w-xs">
                Try different keywords or check your spelling.
              </p>
              <div className="flex gap-3 mt-4 flex-wrap justify-center">
                <Link
                  href="/courses"
                  className="text-theme-sage text-sm font-medium hover:underline"
                >
                  Browse courses →
                </Link>
                <Link
                  href="/languages"
                  className="text-theme-sage text-sm font-medium hover:underline"
                >
                  Browse languages →
                </Link>
              </div>
            </div>
          )}

          {/* Results */}
          {query && results.length > 0 && (
            <div className="flex flex-col gap-3">
              {/* Result count */}
              <p className="text-xs text-theme-text/40 mb-2">
                {totalDocs} result{totalDocs !== 1 ? 's' : ''} for "{query}"
              </p>

              {results.map((result) => {
                const url = getResultUrl(result)
                const collection = result.doc?.relationTo
                const label = getCollectionLabel(collection)
                const tagStyle =
                  collectionColors[collection || ''] || 'bg-theme-sand text-theme-text/50'

                return (
                  <Link
                    key={result.id}
                    href={url}
                    className="group flex items-start justify-between gap-4 bg-white border border-theme-border rounded-2xl p-5 hover:border-theme-sage/40 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex flex-col gap-2 flex-1 min-w-0">
                      {/* Collection badge */}
                      <span
                        className={`text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full w-fit ${tagStyle}`}
                      >
                        {label}
                      </span>

                      {/* Title */}
                      <p className="font-serif font-semibold text-theme-black text-base leading-snug group-hover:text-theme-sage transition-colors truncate">
                        {result.title || result.meta?.title || 'Untitled'}
                      </p>

                      {/* Description */}
                      {result.meta?.description && (
                        <p className="text-theme-text/55 text-sm leading-relaxed line-clamp-2">
                          {result.meta.description}
                        </p>
                      )}

                      {/* URL preview */}
                      <p className="text-theme-text/30 text-xs font-mono">{url}</p>
                    </div>

                    <ArrowRight
                      size={16}
                      className="flex-shrink-0 text-theme-text/25 group-hover:text-theme-sage group-hover:translate-x-0.5 transition-all mt-1"
                    />
                  </Link>
                )
              })}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className="px-4 py-2 rounded-full text-sm font-medium border border-theme-border bg-white text-theme-text/60 hover:border-theme-sage/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                  >
                    ← Prev
                  </button>

                  {Array.from({ length: totalPages }).map((_, i) => {
                    const p = i + 1
                    return (
                      <button
                        key={p}
                        onClick={() => handlePageChange(p)}
                        className={`w-9 h-9 rounded-full text-sm font-medium transition-all cursor-pointer ${
                          p === currentPage
                            ? 'bg-theme-black text-white'
                            : 'border border-theme-border bg-white text-theme-text/60 hover:border-theme-sage/40'
                        }`}
                      >
                        {p}
                      </button>
                    )
                  })}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className="px-4 py-2 rounded-full text-sm font-medium border border-theme-border bg-white text-theme-text/60 hover:border-theme-sage/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                  >
                    Next →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
