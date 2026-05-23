'use client'

import React, { useState } from 'react'
import Link from 'next/link'

type Feature = {
  text?: string | null
  included?: boolean | null
  highlight?: boolean | null
}

type Plan = {
  label?: string | null
  description?: string | null
  featured?: boolean | null
  monthlyPrice?: string | null
  yearlyPrice?: string | null
  priceSuffix?: string | null
  yearlySuffix?: string | null
  features?: Feature[] | null
  buttonLabel?: string | null
  buttonUrl?: string | null
  badge?: string | null
}

const FeatureRow: React.FC<{ feature: Feature; featured: boolean }> = ({ feature, featured }) => (
  <li
    className={`flex items-start gap-3 py-2.5 border-b last:border-0 ${
      featured ? 'border-white/10' : 'border-theme-border/50'
    }`}
  >
    <span
      className={`mt-0.5 flex-shrink-0 text-sm font-bold ${
        feature.included
          ? featured
            ? 'text-white'
            : 'text-theme-sage'
          : featured
            ? 'text-white/20'
            : 'text-theme-border'
      }`}
    >
      {feature.included ? '✓' : '✗'}
    </span>
    <span
      className={`text-sm leading-snug ${
        feature.included
          ? featured
            ? feature.highlight
              ? 'text-theme-yellow font-semibold'
              : 'text-white'
            : feature.highlight
              ? 'text-theme-brown font-semibold'
              : 'text-theme-text'
          : featured
            ? 'text-white/25'
            : 'text-theme-text/30'
      }`}
    >
      {feature.text}
    </span>
  </li>
)

const PlanCard: React.FC<{ plan: Plan; yearly: boolean; index: number }> = ({
  plan,
  yearly,
  index,
}) => {
  const isFeatured = plan.featured === true
  const price = yearly ? plan.yearlyPrice : plan.monthlyPrice
  const suffix = yearly ? plan.yearlySuffix : plan.priceSuffix

  return (
    <div
      className={`relative flex flex-col rounded-2xl border overflow-hidden transition-all duration-300 ${
        isFeatured
          ? 'bg-theme-sage border-theme-sage shadow-2xl lg:scale-[1.03] lg:-translate-y-2'
          : 'bg-white border-theme-border hover:shadow-lg hover:-translate-y-1'
      }`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      {/* Badge */}
      {plan.badge && (
        <div className="bg-theme-brown px-4 py-1.5 text-center">
          <p className="text-white text-xs font-bold tracking-widest uppercase">{plan.badge}</p>
        </div>
      )}

      <div className="flex flex-col gap-5 p-6 sm:p-7 flex-1">
        {/* Plan label + desc */}
        <div className="flex flex-col gap-1">
          <p
            className={`text-xs font-bold tracking-widest uppercase ${
              isFeatured ? 'text-theme-yellow' : 'text-theme-sage'
            }`}
          >
            {plan.label}
          </p>
          {plan.description && (
            <p
              className={`text-sm leading-relaxed ${
                isFeatured ? 'text-white/60' : 'text-theme-text/55'
              }`}
            >
              {plan.description}
            </p>
          )}
        </div>

        {/* Price */}
        <div className="flex flex-col gap-1 pb-5 border-b ${isFeatured ? 'border-white/15' : 'border-theme-border'}">
          <div className="flex items-baseline gap-1">
            <span
              className={`font-serif font-bold text-5xl leading-none transition-all duration-300 ${
                isFeatured ? 'text-white' : 'text-theme-black'
              }`}
            >
              {price}
            </span>
          </div>
          <p className={`text-xs mt-1 ${isFeatured ? 'text-white/45' : 'text-theme-text/40'}`}>
            {suffix}
          </p>
          {yearly && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-theme-brown bg-theme-brown/10 border border-theme-brown/20 rounded-full px-2.5 py-1 w-fit mt-1">
              🎉 20% saved on yearly
            </span>
          )}
        </div>

        {/* Features */}
        <ul className="flex flex-col flex-1">
          {plan.features?.map((f: Feature, i: number) => (
            <FeatureRow key={i} feature={f} featured={isFeatured} />
          ))}
        </ul>

        {/* CTA */}
        {plan.buttonLabel && (
          <Link
            href={plan.buttonUrl || '/'}
            className={`w-full text-center py-3.5 rounded-full text-sm font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] mt-auto ${
              isFeatured
                ? 'bg-theme-brown text-white hover:bg-theme-brown/90'
                : 'bg-theme-black text-white hover:bg-theme-black/80'
            }`}
          >
            {plan.buttonLabel}
          </Link>
        )}
      </div>
    </div>
  )
}

export const PricingPlans: React.FC<{
  eyebrow?: string | null
  heading?: string | null
  yearlyDiscountLabel?: string | null
  plans?: Plan[] | null
}> = ({ eyebrow, heading, yearlyDiscountLabel, plans }) => {
  const [yearly, setYearly] = useState(false)

  return (
    <section className="bg-white w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Header */}
        <div className="text-center mb-10">
          {eyebrow && (
            <p className="text-xs font-semibold tracking-widest uppercase text-theme-sage mb-3">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 className="font-serif font-bold text-theme-black text-3xl sm:text-4xl mb-8">
              {heading}
            </h2>
          )}

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-theme-sand border border-theme-border rounded-full px-5 py-2.5">
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
                yearly ? 'bg-theme-sage' : 'bg-theme-border'
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
              <span className="bg-theme-brown/15 text-theme-brown text-xs font-bold px-3 py-1 rounded-full">
                {yearlyDiscountLabel}
              </span>
            )}
          </div>
        </div>

        {/* Plans */}
        {plans && plans.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-start lg:pt-4 lg:pb-8">
            {plans.map((plan, i) => (
              <PlanCard key={i} plan={plan} yearly={yearly} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
