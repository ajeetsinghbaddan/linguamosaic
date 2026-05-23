import type { Block } from 'payload'

export const ContactBlock: Block = {
  slug: 'contact',
  labels: {
    singular: 'Contact Block',
    plural: 'Contact Blocks',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow Label',
      defaultValue: 'Get In Touch',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      defaultValue: "Let's start your language journey",
      required: true,
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      label: 'Contact Form',
      required: true,
      admin: {
        description: 'Select a form created in the Forms collection.',
      },
    },
    // Right side info
    {
      name: 'locationName',
      type: 'text',
      label: 'Location Name',
      defaultValue: 'LinguaMosaic Institute',
    },
    {
      name: 'locationAddress',
      type: 'text',
      label: 'Location Address',
      defaultValue: 'Sector 62, Noida, Uttar Pradesh 201301',
    },
    {
      name: 'mapUrl',
      type: 'text',
      label: 'Google Maps URL',
      defaultValue: 'https://maps.google.com',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
      defaultValue: '+91 98765 43210',
    },
    {
      name: 'email',
      type: 'text',
      label: 'Email Address',
      defaultValue: 'hello@linguamosaic.in',
    },
    {
      name: 'hours',
      type: 'text',
      label: 'Business Hours',
      defaultValue: 'Mon–Sat: 8:00 AM – 8:00 PM · Sun: 10:00 AM – 5:00 PM',
    },
    {
      name: 'socials',
      type: 'array',
      label: 'Social Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          label: 'Platform',
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'X (Twitter)', value: 'x' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'YouTube', value: 'youtube' },
          ],
          required: true,
        },
        { name: 'url', type: 'text', label: 'URL', required: true },
      ],
    },
  ],
}
