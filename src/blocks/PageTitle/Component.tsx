import React from 'react'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

type Breadcrumb = {
  label?: string | null
  url?: string | null
}

type PageTitleBlockProps = {
  eyebrow?: string | null
  title?: string | null
  titleAccent?: string | null
  description?: string | null
  breadcrumbs?: Breadcrumb[] | null
  theme?: 'sand' | 'white' | 'dark' | 'sage' | null
  showDecoration?: boolean | null
}

const themeConfig = {
  sand: {
    section: 'bg-theme-sand',
    border: 'border-theme-border',
    eyebrow: 'text-theme-text/40',
    title: 'text-theme-black',
    accent: 'text-theme-brown',
    description: 'text-theme-text/60',
    breadcrumbBase: 'text-theme-text/40 hover:text-theme-sage',
    breadcrumbSep: 'text-theme-border',
    breadcrumbCurrent: 'text-theme-black',
    decoration: 'bg-theme-sage/8',
    decorationAlt: 'bg-theme-brown/6',
    lineColor: 'bg-theme-border',
    dotColor: 'bg-theme-sage',
  },
  white: {
    section: 'bg-white',
    border: 'border-theme-border',
    eyebrow: 'text-theme-text/40',
    title: 'text-theme-black',
    accent: 'text-theme-brown',
    description: 'text-theme-text/60',
    breadcrumbBase: 'text-theme-text/40 hover:text-theme-sage',
    breadcrumbSep: 'text-theme-border',
    breadcrumbCurrent: 'text-theme-black',
    decoration: 'bg-theme-sage/6',
    decorationAlt: 'bg-theme-brown/5',
    lineColor: 'bg-theme-border',
    dotColor: 'bg-theme-sage',
  },
  dark: {
    section: 'bg-theme-black',
    border: 'border-white/10',
    eyebrow: 'text-white/30',
    title: 'text-white',
    accent: 'text-theme-yellow',
    description: 'text-white/50',
    breadcrumbBase: 'text-white/35 hover:text-white',
    breadcrumbSep: 'text-white/15',
    breadcrumbCurrent: 'text-white/80',
    decoration: 'bg-white/4',
    decorationAlt: 'bg-theme-brown/20',
    lineColor: 'bg-white/10',
    dotColor: 'bg-theme-yellow',
  },
  sage: {
    section: 'bg-theme-sage/10',
    border: 'border-theme-sage/20',
    eyebrow: 'text-theme-sage/60',
    title: 'text-theme-black',
    accent: 'text-theme-brown',
    description: 'text-theme-text/60',
    breadcrumbBase: 'text-theme-text/40 hover:text-theme-sage',
    breadcrumbSep: 'text-theme-sage/30',
    breadcrumbCurrent: 'text-theme-sage',
    decoration: 'bg-theme-sage/10',
    decorationAlt: 'bg-theme-brown/8',
    lineColor: 'bg-theme-sage/20',
    dotColor: 'bg-theme-sage',
  },
}

export const PageTitleBlock: React.FC<PageTitleBlockProps> = ({
  eyebrow,
  title,
  titleAccent,
  description,
  breadcrumbs,
  theme = 'sand',
  showDecoration = true,
}) => {
  const t = themeConfig[theme || 'sand']

  return (
    <section className={`relative w-full overflow-hidden border-b ${t.section} ${t.border}`}>
      {/* ── Decorative background elements ── */}
      {showDecoration && (
        <>
          {/* Large circle top-right */}
          <div
            className={`absolute -top-24 -right-24 w-96 h-96 rounded-full ${t.decoration} blur-3xl pointer-events-none`}
          />
          {/* Small circle bottom-left */}
          <div
            className={`absolute -bottom-12 -left-12 w-48 h-48 rounded-full ${t.decorationAlt} blur-2xl pointer-events-none`}
          />
          {/* Subtle grid lines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
        </>
      )}

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 py-12 md:py-16 lg:py-20">
          {/* ── Left — Title ── */}
          <div className="flex flex-col gap-3 max-w-2xl">
            {/* Eyebrow + decorative line */}
            {eyebrow && (
              <div className="flex items-center gap-3">
                <div className={`w-8 h-px ${t.lineColor}`} />
                <p className={`text-xs font-semibold tracking-widest uppercase ${t.eyebrow}`}>
                  {eyebrow}
                </p>
              </div>
            )}

            {/* Title */}
            <div>
              <h1
                className={`font-serif font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] ${t.title}`}
              >
                {title}
              </h1>
              {titleAccent && (
                <h1
                  className={`font-serif italic text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] ${t.accent}`}
                >
                  {titleAccent}
                </h1>
              )}
            </div>

            {/* Description */}
            {description && (
              <p className={`text-base sm:text-lg leading-relaxed max-w-xl mt-1 ${t.description}`}>
                {description}
              </p>
            )}
          </div>

          {/* ── Right — Breadcrumbs ── */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <div className="flex flex-col items-start lg:items-end gap-3 lg:pb-2 flex-shrink-0">
              {/* Decorative dot trail — desktop only */}
              <div className="hidden lg:flex items-center gap-1.5 mb-1">
                {breadcrumbs.map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-full transition-all ${
                      i === breadcrumbs.length - 1
                        ? `w-4 h-2 ${t.dotColor}`
                        : `w-1.5 h-1.5 ${t.lineColor}`
                    }`}
                  />
                ))}
              </div>

              {/* Breadcrumb trail */}
              <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-1">
                  {breadcrumbs.map((crumb, i) => {
                    const isLast = i === breadcrumbs.length - 1
                    const hasUrl = crumb.url && crumb.url !== ''

                    return (
                      <li key={i} className="flex items-center gap-1">
                        {/* Home icon on first item */}
                        {i === 0 && (
                          <Home
                            size={11}
                            className={`flex-shrink-0 ${t.breadcrumbBase.split(' ')[0]}`}
                          />
                        )}

                        {isLast || !hasUrl ? (
                          <span
                            className={`text-sm font-semibold ${t.breadcrumbCurrent} ${
                              isLast ? '' : t.breadcrumbBase
                            }`}
                          >
                            {crumb.label}
                          </span>
                        ) : (
                          <Link
                            href={crumb.url || '/'}
                            className={`text-sm font-medium transition-colors ${t.breadcrumbBase}`}
                          >
                            {crumb.label}
                          </Link>
                        )}

                        {/* Separator */}
                        {!isLast && (
                          <ChevronRight size={13} className={`flex-shrink-0 ${t.breadcrumbSep}`} />
                        )}
                      </li>
                    )
                  })}
                </ol>
              </nav>

              {/* Decorative tag — shows current page label */}
              <div
                className={`hidden lg:flex items-center gap-1.5 border rounded-full px-3 py-1 ${t.border} ${t.decoration}`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${t.dotColor}`} />
                <span className={`text-xs font-medium ${t.breadcrumbCurrent}`}>
                  {breadcrumbs[breadcrumbs.length - 1]?.label}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Bottom accent line ── */}
      {showDecoration && (
        <div className="absolute bottom-0 left-0 right-0 h-px">
          <div
            className={`h-full ${t.lineColor}`}
            style={{
              background: `linear-gradient(90deg, transparent 0%, currentColor 30%, currentColor 70%, transparent 100%)`,
              opacity: 0.3,
            }}
          />
        </div>
      )}
    </section>
  )
}
