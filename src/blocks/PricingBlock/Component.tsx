import React from 'react'
import { PricingClient } from './PricingClient'

type Feature = { text?: string | null; included?: boolean | null }
type Plan = {
  label?: string | null
  featured?: boolean | null
  monthlyPrice?: string | null
  yearlyPrice?: string | null
  priceSuffix?: string | null
  yearlySuffix?: string | null
  features?: Feature[] | null
  buttonLabel?: string | null
  buttonUrl?: string | null
}

type PricingBlockProps = {
  eyebrow?: string | null
  heading?: string | null
  yearlyDiscountLabel?: string | null
  plans?: Plan[] | null
}

export const PricingBlock: React.FC<PricingBlockProps> = ({
  eyebrow,
  heading,
  yearlyDiscountLabel,
  plans,
}) => {
  return (
    <section className="bg-white w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* ── Header ── */}
        <div className="text-center mb-8 max-w-xl mx-auto">
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

        {/* ── Toggle + Cards ── */}
        {plans && plans.length > 0 && (
          <PricingClient plans={plans} yearlyDiscountLabel={yearlyDiscountLabel} />
        )}
      </div>
    </section>
  )
}
