'use client'

import React, { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

type Faq = { question?: string | null; answer?: string | null }
type ContactFaqProps = {
  eyebrow?: string | null
  heading?: string | null
  faqs?: Faq[] | null
}

const FaqItem: React.FC<{ faq: Faq }> = ({ faq }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-theme-border/60 last:border-0">
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
          open ? 'max-h-64 pb-5' : 'max-h-0'
        }`}
      >
        <p className="text-theme-text/60 text-sm leading-relaxed pr-10">{faq.answer}</p>
      </div>
    </div>
  )
}

export const ContactFaq: React.FC<ContactFaqProps> = ({ eyebrow, heading, faqs }) => (
  <section className="bg-white w-full">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* Left */}
        <div className="lg:w-1/3 lg:sticky lg:top-28 flex flex-col gap-4">
          {eyebrow && (
            <p className="text-xs font-semibold tracking-widest uppercase text-theme-sage">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 className="font-serif font-bold text-theme-black text-3xl sm:text-4xl leading-[1.15]">
              {heading}
            </h2>
          )}
          <p className="text-theme-text text-sm leading-relaxed">
            Can not find what you are looking for? Send us a message above and we will get back to
            you within 2 hours.
          </p>
        </div>

        {/* Right */}
        <div className="lg:w-2/3">
          {faqs?.map((faq: Faq, i: number) => (
            <FaqItem key={i} faq={faq} />
          ))}
        </div>
      </div>
    </div>
  </section>
)
