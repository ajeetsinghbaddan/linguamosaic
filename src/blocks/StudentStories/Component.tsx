import React from 'react'
import { StoriesSlider } from './StoriesSlider'

type Testimonial = {
  quote?: string | null
  name?: string | null
  meta?: string | null
  rating?: number | null
  avatar?: { url?: string | null; alt?: string | null } | null
}

type StudentStoriesBlockProps = {
  eyebrow?: string | null
  heading?: string | null
  testimonials?: Testimonial[] | null
}

export const StudentStoriesBlock: React.FC<StudentStoriesBlockProps> = ({
  eyebrow,
  heading,
  testimonials,
}) => {
  return (
    <section className="bg-theme-sand w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* ── Header ── */}
        <div className="mb-10 max-w-lg">
          {eyebrow && (
            <p className="text-xs font-semibold tracking-widest uppercase text-theme-sage mb-3">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 className="font-serif font-bold text-theme-black text-3xl sm:text-4xl lg:text-5xl leading-[1.15]">
              {heading}
            </h2>
          )}
        </div>

        {/* ── Slider ── */}
        {testimonials && testimonials.length > 0 && <StoriesSlider testimonials={testimonials} />}
      </div>
    </section>
  )
}
