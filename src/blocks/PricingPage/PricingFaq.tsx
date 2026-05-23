'use client'

import React, { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

type Faq = { question?: string | null; answer?: string | null }
type PricingFaqProps = {
  eyebrow?: string | null
  heading?: string | null
  faqs?: Faq[] | null
}

const FaqItem: React.FC<{ faq: Faq; index: number }> = ({ faq, index }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className={`border-b border-theme-border/60 last:border-0`}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer group"
      >
        <span
          className={`font-sans font-semibold text-sm sm:text-base transition-colors ${
            open ? 'text-theme-sage' : 'text-theme-black group-hover:text-theme-sage'
          }`}
        >
          {faq.question}
        </span>
        <span
          className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
            open
              ? 'bg-theme-sage text-white'
              : 'bg-theme-sand border border-theme-border text-theme-text/50 group-hover:border-theme-sage/40'
          }`}
        >
          {open ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-96 pb-5' : 'max-h-0'
        }`}
      >
        <p className="text-theme-text/60 text-sm leading-relaxed pr-10">{faq.answer}</p>
      </div>
    </div>
  )
}

export const PricingFaq: React.FC<PricingFaqProps> = ({ eyebrow, heading, faqs }) => {
  const half = Math.ceil((faqs?.length ?? 0) / 2)
  const leftFaqs = faqs?.slice(0, half) ?? []
  const rightFaqs = faqs?.slice(half) ?? []

  return (
    <section className="bg-white w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="mb-12 max-w-xl">
          {eyebrow && (
            <p className="text-xs font-semibold tracking-widest uppercase text-theme-sage mb-3">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 className="font-serif font-bold text-theme-black text-3xl sm:text-4xl">
              {heading}
            </h2>
          )}
        </div>

        {faqs && faqs.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-16">
            <div>
              {leftFaqs.map((faq, i) => (
                <FaqItem key={i} faq={faq} index={i} />
              ))}
            </div>
            <div>
              {rightFaqs.map((faq, i) => (
                <FaqItem key={i} faq={faq} index={i + half} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
