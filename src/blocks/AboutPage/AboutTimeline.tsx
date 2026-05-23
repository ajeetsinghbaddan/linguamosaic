'use client'

import React, { useEffect, useRef, useState } from 'react'

type Milestone = {
  year?: string | null
  title?: string | null
  description?: string | null
  emoji?: string | null
}

type AboutTimelineProps = {
  eyebrow?: string | null
  heading?: string | null
  milestones?: Milestone[] | null
}

const TimelineItem: React.FC<{ milestone: Milestone; index: number; isLeft: boolean }> = ({
  milestone,
  index,
  isLeft,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.2 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`flex items-start gap-4 lg:gap-0 transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Content */}
      <div className={`flex-1 ${isLeft ? 'lg:pr-12 lg:text-right' : 'lg:pl-12 lg:text-left'}`}>
        <div
          className={`inline-flex flex-col gap-2 bg-white border border-theme-border rounded-2xl p-5 hover:shadow-md hover:border-theme-sage/30 transition-all duration-200 text-left`}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">{milestone.emoji}</span>
            <span className="font-sans font-bold text-theme-sage text-sm">{milestone.year}</span>
          </div>
          <p className="font-serif font-semibold text-theme-black text-base">{milestone.title}</p>
          {milestone.description && (
            <p className="text-theme-text/55 text-sm leading-relaxed">{milestone.description}</p>
          )}
        </div>
      </div>

      {/* Center dot — desktop only */}
      <div className="hidden lg:flex flex-col items-center flex-shrink-0 w-10">
        <div className="w-4 h-4 rounded-full bg-theme-sage border-4 border-white shadow-md ring-2 ring-theme-sage/30" />
      </div>

      {/* Spacer for opposite side */}
      <div className="hidden lg:block flex-1" />
    </div>
  )
}

export const AboutTimeline: React.FC<AboutTimelineProps> = ({ eyebrow, heading, milestones }) => (
  <section className="bg-theme-sand w-full">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="text-center mb-14">
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

      {milestones && milestones.length > 0 && (
        <div className="relative max-w-4xl mx-auto">
          {/* Center line — desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-theme-border -translate-x-1/2" />

          <div className="flex flex-col gap-8">
            {milestones.map((m, i) => (
              <TimelineItem key={i} milestone={m} index={i} isLeft={i % 2 === 0} />
            ))}
          </div>
        </div>
      )}
    </div>
  </section>
)
