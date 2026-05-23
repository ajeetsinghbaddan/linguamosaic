import React from 'react'
import { FacultySlider } from './FacultySlider'

type Instructor = {
  name?: string | null
  languages?: string | null
  bio?: string | null
  profileUrl?: string | null
  photo?: { url?: string | null; alt?: string | null } | null
  testimonial?: {
    quote?: string | null
    rating?: number | null
  } | null
}

type FacultyBlockProps = {
  eyebrow?: string | null
  heading?: string | null
  subtext?: string | null
  instructors?: Instructor[] | null
}

export const FacultyBlock: React.FC<FacultyBlockProps> = ({
  eyebrow,
  heading,
  subtext,
  instructors,
}) => {
  return (
    <section className="bg-white w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* ── Header ── */}
        <div className="mb-10 max-w-xl">
          {eyebrow && (
            <p className="text-xs font-semibold tracking-widest uppercase text-theme-sage mb-3">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 className="font-serif font-bold text-theme-black text-3xl sm:text-4xl lg:text-5xl leading-[1.15] mb-3">
              {heading}
            </h2>
          )}
          {subtext && <p className="text-theme-text/55 text-sm">{subtext}</p>}
        </div>

        {/* ── Slider ── */}
        {instructors && instructors.length > 0 && <FacultySlider instructors={instructors} />}
      </div>
    </section>
  )
}
