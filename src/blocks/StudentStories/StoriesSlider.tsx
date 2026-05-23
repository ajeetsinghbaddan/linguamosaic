'use client'

import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'

type Testimonial = {
  quote?: string | null
  name?: string | null
  meta?: string | null
  rating?: number | null
  avatar?: { url?: string | null; alt?: string | null } | null
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={`text-sm ${i < rating ? 'text-theme-yellow' : 'text-theme-border'}`}>
        ★
      </span>
    ))}
  </div>
)

const PlaceholderAvatar: React.FC = () => (
  <div className="w-9 h-9 rounded-full bg-theme-yellow/30 flex items-center justify-center flex-shrink-0">
    <span className="text-base">🎓</span>
  </div>
)

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <div className="flex flex-col justify-between bg-white border border-theme-border rounded-2xl p-6 h-full">
    {/* Quote mark */}
    <div className="flex flex-col gap-4">
      <svg
        width="32"
        height="24"
        viewBox="0 0 32 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-theme-sage flex-shrink-0"
      >
        <path
          d="M0 24V14.4C0 10.08 1.04 6.64 3.12 4.08C5.28 1.44 8.56 0 13 0L14.4 2.88C11.52 3.44 9.36 4.64 7.92 6.48C6.56 8.32 5.92 10.56 6 13.2H12V24H0ZM18 24V14.4C18 10.08 19.04 6.64 21.12 4.08C23.28 1.44 26.56 0 31 0L32 2.88C29.12 3.44 26.96 4.64 25.52 6.48C24.16 8.32 23.52 10.56 23.6 13.2H30V24H18Z"
          fill="currentColor"
        />
      </svg>

      {/* Quote text */}
      <p className="text-theme-text text-sm leading-relaxed">{testimonial.quote}</p>
    </div>

    {/* Author */}
    <div className="flex items-center gap-3 mt-6 pt-4 border-t border-theme-border/50">
      {testimonial.avatar?.url ? (
        <Image
          src={testimonial.avatar.url}
          alt={testimonial.avatar.alt || testimonial.name || ''}
          width={36}
          height={36}
          className="w-9 h-9 rounded-full object-cover flex-shrink-0"
        />
      ) : (
        <PlaceholderAvatar />
      )}

      <div className="flex flex-col gap-0.5 min-w-0">
        <p className="font-sans font-semibold text-theme-black text-sm leading-tight truncate">
          {testimonial.name}
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          {testimonial.meta && (
            <span className="text-theme-text/60 text-xs truncate">{testimonial.meta}</span>
          )}
          <StarRating rating={testimonial.rating ?? 5} />
        </div>
      </div>
    </div>
  </div>
)

export const StoriesSlider: React.FC<{ testimonials: Testimonial[] }> = ({ testimonials }) => (
  <Swiper
    modules={[FreeMode, Pagination]}
    freeMode={true}
    pagination={{ clickable: true }}
    spaceBetween={16}
    slidesPerView={1.1}
    breakpoints={{
      480: { slidesPerView: 1.5 },
      768: { slidesPerView: 2.2 },
      1024: { slidesPerView: 3 },
      1280: { slidesPerView: 3 },
    }}
    className="!pb-10"
  >
    {testimonials.map((t, i) => (
      <SwiperSlide key={i} className="h-auto self-stretch">
        <TestimonialCard testimonial={t} />
      </SwiperSlide>
    ))}
  </Swiper>
)
