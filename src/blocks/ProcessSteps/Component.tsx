import React from 'react'
import { ArrowRight } from 'lucide-react'

type Step = {
  icon?: string | null
  title?: string | null
  description?: string | null
}

type ProcessStepsBlockProps = {
  eyebrow?: string | null
  heading?: string | null
  steps?: Step[] | null
}

export const ProcessStepsBlock: React.FC<ProcessStepsBlockProps> = ({
  eyebrow,
  heading,
  steps,
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

        {/* ── Steps card ── */}
        {steps && steps.length > 0 && (
          <div className="bg-white rounded-3xl border border-theme-border p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-theme-border/50">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="relative flex flex-col gap-5 px-6 py-6 sm:py-2 md:first:pl-0 md:last:pr-0"
                >
                  {/* Step number + arrow */}
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-5xl text-theme-border leading-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {/* Arrow — hidden on last step and on mobile */}
                    {i < steps.length - 1 && (
                      <ArrowRight
                        size={16}
                        className="text-theme-border hidden lg:block absolute -right-2 top-2 z-10"
                      />
                    )}
                  </div>

                  {/* Icon */}
                  <span className="text-2xl leading-none">{step.icon}</span>

                  {/* Title + description */}
                  <div className="flex flex-col gap-2">
                    <p className="font-sans font-semibold text-theme-black text-sm">{step.title}</p>
                    {step.description && (
                      <p className="text-theme-text text-sm leading-relaxed">{step.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
