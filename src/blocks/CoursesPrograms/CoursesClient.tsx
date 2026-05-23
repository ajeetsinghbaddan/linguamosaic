'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

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

export const CoursesClient: React.FC<{ tabs: Tab[] }> = ({ tabs }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [displayIndex, setDisplayIndex] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const contentRef = useRef<HTMLDivElement>(null)

  const handleTabClick = (i: number) => {
    if (i === activeIndex || animating) return
    setDirection(i > activeIndex ? 'right' : 'left')
    setAnimating(true)
  }

  useEffect(() => {
    if (!animating) return

    // Phase 1: slide out current content
    const slideOut = setTimeout(() => {
      setDisplayIndex(activeIndex)
    }, 0)

    // Phase 2: swap content + slide in
    const swap = setTimeout(() => {
      setDisplayIndex(
        tabs.findIndex((_, i) => (direction === 'right' ? i > activeIndex : i < activeIndex)) !== -1
          ? activeIndex
          : activeIndex,
      )
    }, 200)

    return () => {
      clearTimeout(slideOut)
      clearTimeout(swap)
    }
  }, [animating])

  const changeTab = (i: number) => {
    if (i === activeIndex || animating) return
    const dir = i > activeIndex ? 'right' : 'left'
    setDirection(dir)
    setAnimating(true)

    setTimeout(() => {
      setDisplayIndex(i)
      setActiveIndex(i)
    }, 180)

    setTimeout(() => {
      setAnimating(false)
    }, 380)
  }

  const activeTab = tabs[displayIndex]

  const slideOutClass =
    direction === 'right' ? '-translate-x-6 opacity-0' : 'translate-x-6 opacity-0'

  const slideInClass =
    direction === 'right' ? 'translate-x-6 opacity-0' : '-translate-x-6 opacity-0'

  return (
    <div>
      {/* ── Tab bar ── */}
      <div className="inline-flex items-center gap-1 bg-theme-sand border border-theme-border rounded-full px-2 py-1.5 mb-10 flex-wrap relative">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => changeTab(i)}
            className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer z-10 ${
              activeIndex === i ? 'text-black' : 'text-theme-text'
            }`}
          >
            {/* Sliding pill background */}
            {activeIndex === i && (
              <span className="absolute inset-0 bg-white text-black rounded-full -z-10 animate-tab-pill" />
            )}
            {tab.tabLabel}
          </button>
        ))}
      </div>

      {/* ── Animated content ── */}
      <div className="overflow-hidden">
        <div
          ref={contentRef}
          className={`transition-all duration-200 ease-in-out ${
            animating ? slideOutClass : 'translate-x-0 opacity-100'
          }`}
        >
          {activeTab?.cards && activeTab.cards.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {activeTab.cards.map((card, i) => (
                <div
                  key={`${displayIndex}-${i}`}
                  className="animate-card-in"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <CourseCardComponent card={card} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-20 text-theme-text/40 text-sm animate-card-in">
              No courses available in this category yet.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const CourseCardComponent: React.FC<{ card: CourseCard }> = ({ card }) => {
  const isFeatured = card.featured === true

  return (
    <div
      className={`flex flex-col rounded-2xl p-6 border h-full transition-all duration-300 hover:-translate-y-1 ${
        isFeatured
          ? 'bg-theme-black border-theme-black text-white shadow-xl'
          : 'bg-white border-theme-border text-theme-text hover:shadow-lg'
      }`}
    >
      {/* Title */}
      <p
        className={`text-sm font-medium mb-3 ${isFeatured ? 'text-white/60' : 'text-theme-text/60'}`}
      >
        {card.title}
      </p>

      {/* Price */}
      <div className="flex items-baseline gap-1 mb-6">
        <span
          className={`font-serif font-bold text-4xl leading-none ${
            isFeatured ? 'text-theme-yellow' : 'text-theme-brown'
          }`}
        >
          {card.price}
        </span>
        {card.priceSuffix && (
          <span className={`text-sm ${isFeatured ? 'text-white/50' : 'text-theme-text/50'}`}>
            {card.priceSuffix}
          </span>
        )}
      </div>

      {/* Detail rows */}
      {card.details && card.details.length > 0 && (
        <div className="flex flex-col mb-6 flex-1">
          {card.details.map((detail, i) => (
            <div
              key={i}
              className={`flex justify-between items-center py-3 text-sm border-b ${
                isFeatured ? 'border-white/10' : 'border-theme-border/60'
              }`}
            >
              <span className={isFeatured ? 'text-white/50' : 'text-theme-text/50'}>
                {detail.label}
              </span>
              <span className={`font-medium ${isFeatured ? 'text-white' : 'text-theme-black'}`}>
                {detail.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Button */}
      {card.buttonLabel && (
        <Link
          href={card.buttonUrl || '/'}
          className={`w-full text-center py-3 rounded-full text-sm font-medium transition-all duration-200 mt-auto hover:scale-[1.02] active:scale-[0.98] ${
            isFeatured
              ? 'bg-theme-sage/30 text-white hover:bg-theme-sage/50'
              : 'bg-theme-black text-white hover:bg-theme-black/80'
          }`}
        >
          {card.buttonLabel}
        </Link>
      )}
    </div>
  )
}
