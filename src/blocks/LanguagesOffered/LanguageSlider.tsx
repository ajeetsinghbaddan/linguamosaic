'use client'

import React from 'react'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'

type LanguageCard = {
  code?: string | null
  name?: string | null
  level?: string | null
  tags?: string | null
  url?: string | null
}

export const LanguageSlider: React.FC<{ languages: LanguageCard[] }> = ({ languages }) => {
  return (
    <div className="w-full">
      <Swiper
        modules={[FreeMode, Pagination]}
        freeMode={true}
        pagination={{ clickable: true }}
        spaceBetween={16}
        slidesPerView={1.2}
        breakpoints={{
          480: { slidesPerView: 2.1 },
          768: { slidesPerView: 3.1 },
          1024: { slidesPerView: 4.1 },
          1280: { slidesPerView: 6 },
        }}
        className="!pb-10"
      >
        {languages.map((lang, i) => (
          <SwiperSlide key={i}>
            <Link
              href={lang.url || '/'}
              className="flex flex-col items-center text-center py-8 px-4 bg-white border border-theme-border rounded-lg h-full min-h-[180px] hover:shadow-md hover:border-theme-sage/40 transition-all duration-200 group"
            >
              {/* Country code */}
              <span className="font-sans font-bold text-theme-black text-3xl tracking-wide mb-2 group-hover:text-theme-sage transition-colors">
                {lang.code}
              </span>

              {/* Language name */}
              <span className="font-sans text-sm text-theme-text/70 mb-3">{lang.name}</span>

              {/* Level badge */}
              {lang.level && (
                <span className="inline-flex items-center bg-theme-sage/10 text-theme-sage text-xs font-medium px-2.5 py-1 rounded-full mb-4">
                  {lang.level}
                </span>
              )}

              {/* Tags */}
              {lang.tags && (
                <span className="text-[11px] text-theme-text/40 leading-relaxed mt-auto">
                  {lang.tags}
                </span>
              )}
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
