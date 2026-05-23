import type { Block } from 'payload'

export const ContactHeroBlock: Block = {
  slug: 'contactHero',
  labels: { singular: 'Contact Hero', plural: 'Contact Heroes' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Get In Touch' },
    { name: 'headingMain', type: 'text', defaultValue: "Let's start your", required: true },
    { name: 'headingAccent', type: 'text', defaultValue: 'language journey.' },
    {
      name: 'subtext',
      type: 'textarea',
      defaultValue:
        'Whether you have a question, want to book a trial, or just want to say hello — we would love to hear from you.',
    },
    {
      name: 'stats',
      type: 'array',
      maxRows: 3,
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
      defaultValue: [
        { value: '< 2hrs', label: 'Response time' },
        { value: '7 days', label: 'Free trial' },
        { value: '9AM–8PM', label: 'Support hours' },
      ],
    },
  ],
}

export const ContactFormSectionBlock: Block = {
  slug: 'contactFormSection',
  labels: { singular: 'Contact Form Section', plural: 'Contact Form Sections' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Send a Message' },
    { name: 'heading', type: 'text', defaultValue: 'We read every message.' },
    {
      name: 'subtext',
      type: 'text',
      defaultValue:
        'Fill in the form and we will get back to you within 2 hours during working hours.',
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      label: 'Contact Form',
      required: true,
    },
    // Right side info
    {
      name: 'locationName',
      type: 'text',
      defaultValue: 'LinguaMosaic Institute',
    },
    {
      name: 'locationAddress',
      type: 'text',
      defaultValue: 'Sector 62, Noida, Uttar Pradesh 201301',
    },
    {
      name: 'mapUrl',
      type: 'text',
      defaultValue: 'https://maps.google.com',
    },
    {
      name: 'contactDetails',
      type: 'array',
      label: 'Contact Details',
      fields: [
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Phone', value: 'phone' },
            { label: 'Email', value: 'email' },
            { label: 'Hours', value: 'hours' },
            { label: 'WhatsApp', value: 'whatsapp' },
          ],
          required: true,
        },
        { name: 'label', type: 'text' },
        { name: 'value', type: 'text', required: true },
        { name: 'url', type: 'text' },
      ],
      defaultValue: [
        { type: 'phone', label: 'Call us', value: '+91 98765 43210', url: 'tel:+919876543210' },
        {
          type: 'email',
          label: 'Email us',
          value: 'hello@linguamosaic.in',
          url: 'mailto:hello@linguamosaic.in',
        },
        {
          type: 'whatsapp',
          label: 'WhatsApp',
          value: '+91 98765 43210',
          url: 'https://wa.me/919876543210',
        },
        {
          type: 'hours',
          label: 'Working hours',
          value: 'Mon–Sat: 8AM–8PM · Sun: 10AM–5PM',
          url: '',
        },
      ],
    },
    {
      name: 'socials',
      type: 'array',
      label: 'Social Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'X (Twitter)', value: 'x' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'YouTube', value: 'youtube' },
          ],
          required: true,
        },
        { name: 'url', type: 'text', required: true },
      ],
      defaultValue: [
        { platform: 'facebook', url: 'https://facebook.com' },
        { platform: 'instagram', url: 'https://instagram.com' },
        { platform: 'x', url: 'https://x.com' },
        { platform: 'linkedin', url: 'https://linkedin.com' },
        { platform: 'youtube', url: 'https://youtube.com' },
      ],
    },
  ],
}

export const ContactOfficesBlock: Block = {
  slug: 'contactOffices',
  labels: { singular: 'Offices / Locations', plural: 'Offices / Locations' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Find Us' },
    { name: 'heading', type: 'text', defaultValue: 'Visit us in person.' },
    {
      name: 'offices',
      type: 'array',
      label: 'Office Locations',
      fields: [
        { name: 'emoji', type: 'text', defaultValue: '🏛️' },
        { name: 'name', type: 'text', required: true },
        { name: 'address', type: 'textarea', required: true },
        { name: 'phone', type: 'text' },
        { name: 'email', type: 'text' },
        { name: 'hours', type: 'text' },
        { name: 'mapUrl', type: 'text' },
        { name: 'featured', type: 'checkbox', defaultValue: false },
      ],
      defaultValue: [
        {
          emoji: '🏛️',
          name: 'Noida — Main Centre',
          address: 'B-12, Sector 62\nNoida, Uttar Pradesh 201301',
          phone: '+91 98765 43210',
          email: 'noida@linguamosaic.in',
          hours: 'Mon–Sat: 8AM–8PM',
          mapUrl: 'https://maps.google.com',
          featured: true,
        },
        {
          emoji: '🌿',
          name: 'Delhi — South Extension',
          address: 'A-42, South Extension Part II\nNew Delhi 110049',
          phone: '+91 98765 43211',
          email: 'delhi@linguamosaic.in',
          hours: 'Mon–Sat: 9AM–7PM',
          mapUrl: 'https://maps.google.com',
          featured: false,
        },
        {
          emoji: '💻',
          name: 'Online — India-wide',
          address: 'Live classes via Zoom\nAvailable across all time zones',
          phone: '+91 98765 43210',
          email: 'online@linguamosaic.in',
          hours: 'Flexible scheduling',
          mapUrl: '',
          featured: false,
        },
      ],
    },
  ],
}

export const ContactFaqBlock: Block = {
  slug: 'contactFaq',
  labels: { singular: 'Contact FAQ', plural: 'Contact FAQs' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Quick Answers' },
    { name: 'heading', type: 'text', defaultValue: 'Common questions.' },
    {
      name: 'faqs',
      type: 'array',
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
      defaultValue: [
        {
          question: 'How quickly will you respond?',
          answer:
            'We respond to all enquiries within 2 hours during working hours (Mon–Sat, 8AM–8PM IST). Weekend messages are answered first thing Monday.',
        },
        {
          question: 'Can I visit without an appointment?',
          answer:
            'Yes — walk-ins are welcome at both our Noida and Delhi centres during working hours. For a dedicated consultation, booking ahead is recommended.',
        },
        {
          question: 'How do I book a free trial class?',
          answer:
            'Simply fill in the contact form above or call us directly. We will match you with the right instructor and schedule your free trial within 48 hours.',
        },
        {
          question: 'Do you offer online consultations?',
          answer:
            'Absolutely. We offer free 15-minute video consultations via Google Meet or Zoom. Select "Online Consultation" in the form above.',
        },
      ],
    },
  ],
}
