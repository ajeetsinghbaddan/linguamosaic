import React from 'react'
import { CoursesClient } from './CoursesClient'

type Detail = { label?: string | null; value?: string | null }
type CourseCard = {
  title?: string | null
  price?: string | null
  priceSuffix?: string | null
  featured?: boolean | null
  details?: Detail[] | null
  buttonLabel?: string | null
  buttonUrl?: string | null
}
type Tab = {
  tabLabel?: string | null
  cards?: CourseCard[] | null
}

type CoursesProgramsBlockProps = {
  eyebrow?: string | null
  heading?: string | null
  subtext?: string | null
  tabs?: Tab[] | null
}

export const CoursesProgramsBlock: React.FC<CoursesProgramsBlockProps> = ({
  eyebrow,
  heading,
  subtext,
  tabs,
}) => {
  return (
    <section className="bg-white w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* ── Header ── */}
        <div className="mb-8 max-w-xl">
          {eyebrow && (
            <p className="text-xs font-semibold tracking-widest uppercase text-theme-sage mb-3">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 className="font-serif font-bold text-theme-black text-3xl sm:text-4xl lg:text-5xl leading-[1.15] mb-4">
              {heading}
            </h2>
          )}
          {subtext && <p className="text-theme-text text-base leading-relaxed">{subtext}</p>}
        </div>

        {/* ── Tabs + Cards ── */}
        {tabs && tabs.length > 0 && <CoursesClient tabs={tabs} />}
      </div>
    </section>
  )
}
