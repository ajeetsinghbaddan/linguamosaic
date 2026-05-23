'use client'

import React, { useState } from 'react'
import Link from 'next/link'

type Feature = {
  text?: string | null
  included?: boolean | null
}

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

const CheckIcon = ({ included, featured }: { included: boolean; featured: boolean }) => (
  <span
    className={`text-sm font-bold flex-shrink-0 w-4 ${
      included
        ? featured
          ? 'text-white'
          : 'text-theme-sage'
        : featured
          ? 'text-white/30'
          : 'text-theme-text/30'
    }`}
  >
    {included ? '✓' : '✗'}
  </span>
)

const PlanCard: React.FC<{ plan: Plan; yearly: boolean }> = ({ plan, yearly }) => {
  const isFeatured = plan.featured === true
  const price = yearly ? plan.yearlyPrice : plan.monthlyPrice
  const suffix = yearly ? plan.yearlySuffix : plan.priceSuffix

  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-7 transition-all duration-300 ${
        isFeatured
          ? 'bg-theme-sage border-theme-sage text-white shadow-2xl scale-[1.02]'
          : 'bg-theme-sand border-theme-border text-theme-text hover:shadow-md'
      }`}
    >
      {/* Plan label */}
      <p
        className={`text-xs font-semibold tracking-widest uppercase mb-5 ${
          isFeatured ? 'text-theme-yellow' : 'text-theme-sage'
        }`}
      >
        {plan.label}
      </p>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-baseline gap-1 transition-all duration-300">
          <span
            className={`font-serif font-bold leading-none transition-all duration-300 ${
              isFeatured ? 'text-white text-5xl' : 'text-theme-black text-5xl'
            }`}
          >
            {price}
          </span>
        </div>
        <p className={`text-xs mt-1.5 ${isFeatured ? 'text-white/50' : 'text-theme-text/45'}`}>
          {suffix}
        </p>
      </div>

      {/* Features */}
      <ul className="flex flex-col gap-3 mb-8 flex-1">
        {plan.features?.map((feature: Feature, i: number) => (
          <li key={i} className="flex items-center gap-2.5">
            <CheckIcon included={!!feature.included} featured={isFeatured} />
            <span
              className={`text-sm ${
                feature.included
                  ? isFeatured
                    ? 'text-white'
                    : 'text-theme-sage'
                  : isFeatured
                    ? 'text-white/35'
                    : 'text-theme-sage/60'
              }`}
            >
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      {/* Button */}
      {plan.buttonLabel && (
        <Link
          href={plan.buttonUrl || '/'}
          className={`w-full text-center py-3.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] border ${
            isFeatured
              ? 'bg-theme-brown text-white border-theme-brown hover:bg-theme-brown/90'
              : 'bg-transparent text-theme-black border-theme-black hover:bg-theme-black hover:text-white'
          }`}
        >
          {plan.buttonLabel}
        </Link>
      )}
    </div>
  )
}

export const PricingClient: React.FC<{
  plans: Plan[]
  yearlyDiscountLabel?: string | null
}> = ({ plans, yearlyDiscountLabel }) => {
  const [yearly, setYearly] = useState(false)

  return (
    <div>
      {/* ── Toggle ── */}
      <div className="flex items-center justify-center gap-3 mb-12">
        <span
          className={`text-sm font-medium transition-colors ${
            !yearly ? 'text-theme-black' : 'text-theme-text/40'
          }`}
        >
          Monthly
        </span>

        <button
          onClick={() => setYearly((v) => !v)}
          className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none cursor-pointer ${
            yearly ? 'bg-theme-sage' : 'bg-theme-sage'
          }`}
          aria-label="Toggle billing period"
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
              yearly ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </button>

        <span
          className={`text-sm font-medium transition-colors ${
            yearly ? 'text-theme-black' : 'text-theme-text/40'
          }`}
        >
          Yearly
        </span>

        {yearlyDiscountLabel && (
          <span className="bg-theme-brown/15 text-theme-brown text-xs font-semibold px-3 py-1 rounded-full">
            {yearlyDiscountLabel}
          </span>
        )}
      </div>

      {/* ── Plans grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`transition-all duration-500 ${yearly ? 'opacity-100' : 'opacity-100'}`}
            style={{ transitionDelay: `${i * 40}ms` }}
          >
            <PlanCard plan={plan} yearly={yearly} />
          </div>
        ))}
      </div>
    </div>
  )
}
