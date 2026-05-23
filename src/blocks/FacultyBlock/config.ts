import type { Block } from 'payload'

export const FacultyBlock: Block = {
  slug: 'faculty',
  labels: {
    singular: 'Faculty Block',
    plural: 'Faculty Blocks',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow Label',
      defaultValue: 'Our Faculty',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      defaultValue: 'Meet Your Instructors',
      required: true,
    },
    {
      name: 'subtext',
      type: 'text',
      label: 'Subtext',
      defaultValue: 'Hover each card to reveal a student testimonial.',
    },
    {
      name: 'instructors',
      type: 'array',
      label: 'Instructors',
      minRows: 1,
      fields: [
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
          label: 'Photo',
        },
        {
          name: 'name',
          type: 'text',
          label: 'Full Name',
          required: true,
        },
        {
          name: 'languages',
          type: 'text',
          label: 'Languages (e.g. Spanish · Portuguese)',
        },
        {
          name: 'bio',
          type: 'text',
          label: 'Short Bio',
        },
        {
          name: 'profileUrl',
          type: 'text',
          label: 'Profile URL',
          defaultValue: '/faculty',
        },
        {
          name: 'testimonial',
          type: 'group',
          label: 'Hover Testimonial',
          fields: [
            {
              name: 'quote',
              type: 'textarea',
              label: 'Quote',
            },
            {
              name: 'rating',
              type: 'number',
              label: 'Rating (1–5)',
              min: 1,
              max: 5,
              defaultValue: 5,
            },
          ],
        },
      ],
      defaultValue: [
        {
          name: 'Sofia Moreno',
          languages: 'Spanish · Portuguese',
          bio: 'Flamenco dancer, published poet',
          profileUrl: '/faculty/sofia-moreno',
          testimonial: {
            quote: 'Sofia made every lesson feel like a conversation, not a class.',
            rating: 5,
          },
        },
        {
          name: 'Kenji Nakamura',
          languages: 'Japanese · Mandarin',
          bio: 'Former NHK broadcaster, 15 years teaching',
          profileUrl: '/faculty/kenji-nakamura',
          testimonial: {
            quote:
              'Kenji made kanji feel like art, not memorisation. Passed N3 in six months with his guidance.',
            rating: 5,
          },
        },
        {
          name: 'Amélie Dubois',
          languages: 'French · Italian',
          bio: 'Gourmet chef, 12 years teaching in Paris',
          profileUrl: '/faculty/amelie-dubois',
          testimonial: {
            quote:
              'Amélie brings French culture into every lesson. My accent improved dramatically.',
            rating: 5,
          },
        },
        {
          name: 'Dr. Ahmed Al-Rashid',
          languages: 'Arabic · German',
          bio: 'PhD Linguistics, calligraphy artist',
          profileUrl: '/faculty/dr-ahmed',
          testimonial: {
            quote:
              'Dr. Ahmeds structured approach helped me go from zero to conversational Arabic.',
            rating: 5,
          },
        },
      ],
    },
  ],
}
