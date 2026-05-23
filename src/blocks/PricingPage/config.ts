import type { Block } from 'payload'

export const PricingHeroBlock: Block = {
  slug: 'pricingHero',
  labels: { singular: 'Pricing Hero', plural: 'Pricing Heroes' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Pricing' },
    { name: 'headingMain', type: 'text', defaultValue: 'Simple, transparent', required: true },
    { name: 'headingAccent', type: 'text', defaultValue: 'pricing.' },
    {
      name: 'subtext',
      type: 'textarea',
      defaultValue:
        'No hidden fees, no surprises. Choose the plan that fits your goals and budget — and start learning today.',
    },
    {
      name: 'stats',
      type: 'array',
      maxRows: 4,
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
      defaultValue: [
        { value: '₹4,999', label: 'Starting from' },
        { value: '0', label: 'Hidden fees' },
        { value: '100%', label: 'Live classes' },
        { value: '7-day', label: 'Free trial' },
      ],
    },
  ],
}

export const PricingPlansBlock: Block = {
  slug: 'pricingPlans',
  labels: { singular: 'Pricing Plans', plural: 'Pricing Plans' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Plans' },
    { name: 'heading', type: 'text', defaultValue: 'Choose your plan' },
    { name: 'yearlyDiscountLabel', type: 'text', defaultValue: 'Save 20%' },
    {
      name: 'plans',
      type: 'array',
      label: 'Pricing Plans',
      minRows: 1,
      maxRows: 4,
      fields: [
        { name: 'label', type: 'text', label: 'Plan Name', required: true },
        { name: 'description', type: 'text', label: 'One-line description' },
        { name: 'featured', type: 'checkbox', label: 'Featured', defaultValue: false },
        { name: 'monthlyPrice', type: 'text', required: true },
        { name: 'yearlyPrice', type: 'text', required: true },
        { name: 'priceSuffix', type: 'text', defaultValue: '/month · billed monthly' },
        { name: 'yearlySuffix', type: 'text', defaultValue: '/month · billed yearly' },
        {
          name: 'features',
          type: 'array',
          fields: [
            { name: 'text', type: 'text', required: true },
            { name: 'included', type: 'checkbox', defaultValue: true },
            {
              name: 'highlight',
              type: 'checkbox',
              label: 'Highlight this feature',
              defaultValue: false,
            },
          ],
        },
        { name: 'buttonLabel', type: 'text', defaultValue: 'Get Started' },
        { name: 'buttonUrl', type: 'text', defaultValue: '/enroll' },
        { name: 'badge', type: 'text', label: 'Optional badge (e.g. Most Popular)' },
      ],
      defaultValue: [
        {
          label: 'Starter',
          description: 'Perfect for absolute beginners exploring a new language.',
          featured: false,
          monthlyPrice: '₹3,999',
          yearlyPrice: '₹3,199',
          priceSuffix: '/month · billed monthly',
          yearlySuffix: '/month · billed yearly',
          features: [
            { text: '2 group classes/week', included: true, highlight: false },
            { text: 'Digital learning materials', included: true, highlight: false },
            { text: 'Progress tracking dashboard', included: true, highlight: false },
            { text: 'Community forum access', included: true, highlight: false },
            { text: 'Private sessions', included: false, highlight: false },
            { text: 'Exam prep', included: false, highlight: false },
            { text: 'Certificate on completion', included: false, highlight: false },
          ],
          buttonLabel: 'Get Started',
          buttonUrl: '/enroll',
        },
        {
          label: 'Pro',
          description: 'Most popular for learners with serious language goals.',
          featured: true,
          monthlyPrice: '₹6,999',
          yearlyPrice: '₹5,599',
          priceSuffix: '/month · billed monthly',
          yearlySuffix: '/month · billed yearly',
          badge: 'Most Popular',
          features: [
            { text: '4 group classes/week', included: true, highlight: false },
            { text: '2 private sessions/month', included: true, highlight: true },
            { text: 'Premium learning materials', included: true, highlight: false },
            { text: 'Exam prep included', included: true, highlight: true },
            { text: 'Progress tracking dashboard', included: true, highlight: false },
            { text: '1-on-1 advisor support', included: false, highlight: false },
            { text: 'Certificate guarantee', included: false, highlight: false },
          ],
          buttonLabel: 'Get Started',
          buttonUrl: '/enroll',
        },
        {
          label: 'Premium',
          description: 'Full concierge experience for ambitious learners.',
          featured: false,
          monthlyPrice: '₹12,999',
          yearlyPrice: '₹10,399',
          priceSuffix: '/month · billed monthly',
          yearlySuffix: '/month · billed yearly',
          features: [
            { text: 'Unlimited group classes', included: true, highlight: false },
            { text: '8 private sessions/month', included: true, highlight: true },
            { text: 'All materials included', included: true, highlight: false },
            { text: 'Priority scheduling', included: true, highlight: false },
            { text: '1-on-1 advisor support', included: true, highlight: true },
            { text: 'Dedicated coach', included: true, highlight: false },
            { text: 'Certificate guarantee', included: true, highlight: true },
          ],
          buttonLabel: 'Get Started',
          buttonUrl: '/enroll',
        },
      ],
    },
  ],
}

export const PricingAddOnsBlock: Block = {
  slug: 'pricingAddOns',
  labels: { singular: 'Add-Ons', plural: 'Add-Ons' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Add-Ons' },
    { name: 'heading', type: 'text', defaultValue: 'Enhance your plan' },
    { name: 'subtext', type: 'text', defaultValue: 'Add these to any plan at any time.' },
    {
      name: 'addons',
      type: 'array',
      fields: [
        { name: 'icon', type: 'text', defaultValue: '⭐' },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'price', type: 'text', required: true },
        { name: 'pricePeriod', type: 'text', defaultValue: '/month' },
        { name: 'url', type: 'text', defaultValue: '/contact' },
      ],
      defaultValue: [
        {
          icon: '🎯',
          title: 'Extra Private Session',
          description: 'Add a one-on-one session with your instructor for personalised coaching.',
          price: '₹1,499',
          pricePeriod: '/session',
          url: '/contact',
        },
        {
          icon: '📝',
          title: 'Exam Preparation Pack',
          description:
            'Dedicated exam strategy sessions, mock tests, and feedback for IELTS, DELF, JLPT, and more.',
          price: '₹3,999',
          pricePeriod: '/pack',
          url: '/contact',
        },
        {
          icon: '🗣️',
          title: 'Conversation Partner',
          description:
            'Weekly 45-minute conversation sessions with a native speaker beyond your regular classes.',
          price: '₹999',
          pricePeriod: '/month',
          url: '/contact',
        },
        {
          icon: '📚',
          title: 'Physical Study Materials',
          description:
            'Curated physical workbooks, vocabulary cards, and cultural guides shipped to your door.',
          price: '₹1,299',
          pricePeriod: '/term',
          url: '/contact',
        },
      ],
    },
  ],
}

export const PricingFaqBlock: Block = {
  slug: 'pricingFaq',
  labels: { singular: 'Pricing FAQ', plural: 'Pricing FAQs' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'FAQs' },
    { name: 'heading', type: 'text', defaultValue: 'Frequently asked questions' },
    {
      name: 'faqs',
      type: 'array',
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
      defaultValue: [
        {
          question: 'Can I switch plans at any time?',
          answer:
            'Yes. You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.',
        },
        {
          question: 'Is there a free trial?',
          answer:
            'Yes — we offer a 7-day free trial for all new students. No credit card required to start.',
        },
        {
          question: 'What is your refund policy?',
          answer:
            'We offer a full refund within the first 7 days if you are not satisfied. After that, we offer a pro-rated refund for unused sessions.',
        },
        {
          question: 'Do prices include all study materials?',
          answer:
            'Digital materials are included in all plans. Physical books and workbooks are available as an add-on.',
        },
        {
          question: 'Can I learn multiple languages simultaneously?',
          answer:
            'Absolutely. You can enroll in classes for multiple languages at the same time, each billed separately.',
        },
        {
          question: 'Are the classes live or recorded?',
          answer:
            'All classes are 100% live with a certified instructor. Recordings are available for 7 days after each session.',
        },
        {
          question: 'Do you offer corporate or group discounts?',
          answer:
            'Yes. We offer custom pricing for teams of 5 or more. Contact us to discuss a corporate package.',
        },
        {
          question: 'What happens if I miss a class?',
          answer:
            'You can reschedule up to 24 hours before a session at no cost. Missed sessions are available as recordings for 7 days.',
        },
      ],
    },
  ],
}

export const PricingGuaranteeBlock: Block = {
  slug: 'pricingGuarantee',
  labels: { singular: 'Guarantee Block', plural: 'Guarantee Blocks' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Our promise to you' },
    {
      name: 'subtext',
      type: 'textarea',
      defaultValue:
        'We are so confident in our teaching that we back every plan with our LinguaGuarantee — if you do not feel measurable progress in 30 days, we will refund you in full.',
    },
    {
      name: 'guarantees',
      type: 'array',
      fields: [
        { name: 'icon', type: 'text' },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'text' },
      ],
      defaultValue: [
        { icon: '🔒', title: '7-Day Free Trial', description: 'Try risk-free before you commit.' },
        {
          icon: '💯',
          title: '30-Day Progress Guarantee',
          description: 'Measurable progress or full refund.',
        },
        {
          icon: '🔄',
          title: 'Flexible Rescheduling',
          description: 'Life happens. Reschedule any class.',
        },
        {
          icon: '🏆',
          title: 'Certified Instructors',
          description: 'Every teacher is formally qualified.',
        },
      ],
    },
    { name: 'ctaLabel', type: 'text', defaultValue: 'Start Free Trial' },
    { name: 'ctaUrl', type: 'text', defaultValue: '/enroll' },
  ],
}

export const PricingCtaBlock: Block = {
  slug: 'pricingCta',
  labels: { singular: 'Pricing CTA', plural: 'Pricing CTAs' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Still not sure which plan?' },
    {
      name: 'subtext',
      type: 'text',
      defaultValue:
        'Book a free 15-minute consultation and we will match you with the perfect plan for your goals and budget.',
    },
    { name: 'primaryLabel', type: 'text', defaultValue: 'Book Free Consultation' },
    { name: 'primaryUrl', type: 'text', defaultValue: '/contact' },
    { name: 'secondaryLabel', type: 'text', defaultValue: 'See All Courses' },
    { name: 'secondaryUrl', type: 'text', defaultValue: '/courses' },
  ],
}
