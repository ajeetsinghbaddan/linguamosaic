import React from 'react'
import Link from 'next/link'

type AddOn = {
  icon?: string | null
  title?: string | null
  description?: string | null
  price?: string | null
  pricePeriod?: string | null
  url?: string | null
}

type PricingAddOnsProps = {
  eyebrow?: string | null
  heading?: string | null
  subtext?: string | null
  addons?: AddOn[] | null
}

export const PricingAddOns: React.FC<PricingAddOnsProps> = ({
  eyebrow,
  heading,
  subtext,
  addons,
}) => (
  <section className="bg-theme-sand w-full">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="mb-10 max-w-xl">
        {eyebrow && (
          <p className="text-xs font-semibold tracking-widest uppercase text-theme-sage mb-3">
            {eyebrow}
          </p>
        )}
        {heading && (
          <h2 className="font-serif font-bold text-theme-black text-3xl sm:text-4xl mb-2">
            {heading}
          </h2>
        )}
        {subtext && <p className="text-theme-text text-sm">{subtext}</p>}
      </div>

      {addons && addons.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {addons.map((addon, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 bg-white rounded-2xl border border-theme-border p-6 hover:shadow-md hover:border-theme-sage/30 hover:-translate-y-1 transition-all duration-200 group"
            >
              <span className="text-3xl">{addon.icon}</span>
              <div className="flex flex-col gap-1.5 flex-1">
                <p className="font-sans font-bold text-theme-black text-base group-hover:text-theme-sage transition-colors">
                  {addon.title}
                </p>
                {addon.description && (
                  <p className="text-theme-text/55 text-sm leading-relaxed">{addon.description}</p>
                )}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-theme-border/50">
                <div>
                  <span className="font-serif font-bold text-theme-brown text-xl">
                    {addon.price}
                  </span>
                  {addon.pricePeriod && (
                    <span className="text-theme-text/40 text-xs ml-1">{addon.pricePeriod}</span>
                  )}
                </div>
                {addon.url && (
                  <Link
                    href={addon.url}
                    className="text-xs font-semibold text-theme-sage hover:underline"
                  >
                    Add →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </section>
)
