'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'

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

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex gap-0.5 justify-center">
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < rating ? 'text-theme-yellow' : 'text-white/20'}>
        ★
      </span>
    ))}
  </div>
)

const PlaceholderAvatar: React.FC<{ dark?: boolean }> = ({ dark }) => (
  <div
    className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${
      dark ? 'bg-theme-brown/40' : 'bg-theme-sage/15'
    }`}
  >
    <svg viewBox="0 0 80 80" className="w-20 h-20" fill="none">
      <circle
        cx="40"
        cy="30"
        r="16"
        fill={dark ? 'rgba(255,255,255,0.25)' : '#5C7A5C'}
        opacity="0.7"
      />
      <ellipse
        cx="40"
        cy="68"
        rx="24"
        ry="16"
        fill={dark ? 'rgba(255,255,255,0.25)' : '#5C7A5C'}
        opacity="0.5"
      />
    </svg>
  </div>
)

const InstructorCard: React.FC<{ instructor: Instructor }> = ({ instructor }) => {
  const [hovered, setHovered] = useState(false)
  const hasTestimonial = !!instructor.testimonial?.quote

  return (
    <div
      className="relative rounded-2xl overflow-hidden border border-theme-border cursor-pointer select-none h-[280px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered((v) => !v)}
    >
      {/* ── Default face ── */}
      <div
        className={`absolute inset-0 flex flex-col p-6 bg-white transition-all duration-400 ease-in-out ${
          hovered && hasTestimonial
            ? 'opacity-0 scale-95 pointer-events-none'
            : 'opacity-100 scale-100'
        }`}
      >
        {/* Photo / avatar */}
        <div className="flex-1 flex items-center justify-center">
          {instructor.photo?.url ? (
            <Image
              src={instructor.photo.url}
              alt={instructor.photo.alt || instructor.name || ''}
              width={80}
              height={80}
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <PlaceholderAvatar />
          )}
        </div>

        {/* Info */}
        <div className="mt-4">
          <p className="font-sans font-semibold text-theme-black text-base leading-tight">
            {instructor.name}
          </p>
          {instructor.languages && (
            <p className="text-theme-brown text-xs mt-1 font-medium">{instructor.languages}</p>
          )}
          {instructor.bio && (
            <p className="text-theme-text text-xs mt-1 leading-relaxed">{instructor.bio}</p>
          )}
        </div>
      </div>

      {/* ── Hover testimonial face ── */}
      {hasTestimonial && (
        <div
          className={`absolute inset-0 flex flex-col items-center justify-between p-6 bg-theme-brown transition-all duration-400 ease-in-out ${
            hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          }`}
        >
          {/* Name + stars */}
          <div className="flex flex-col items-center gap-2 mt-2">
            <p className="font-sans font-semibold text-white text-base">{instructor.name}</p>
            <StarRating rating={instructor.testimonial?.rating ?? 5} />
          </div>

          {/* Quote */}
          <p className="text-white/85 text-sm text-center leading-relaxed px-2 italic">
            "{instructor.testimonial?.quote}"
          </p>

          {/* View profile button */}
          {instructor.profileUrl && (
            <Link
              href={instructor.profileUrl}
              className="inline-flex items-center justify-center bg-theme-black text-white text-xs font-semibold px-6 py-2.5 rounded-full hover:bg-theme-black/80 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              View Profile
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

export const FacultySlider: React.FC<{ instructors: Instructor[] }> = ({ instructors }) => {
  return (
    <Swiper
      modules={[FreeMode]}
      freeMode={true}
      spaceBetween={16}
      slidesPerView={1.2}
      breakpoints={{
        480: { slidesPerView: 2.1 },
        768: { slidesPerView: 3.1 },
        1024: { slidesPerView: 4.1 },
        1280: { slidesPerView: 4 },
      }}
    >
      {instructors.map((instructor, i) => (
        <SwiperSlide key={i}>
          <InstructorCard instructor={instructor} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
