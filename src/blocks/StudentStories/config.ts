import type { Block } from 'payload'

export const StudentStoriesBlock: Block = {
  slug: 'studentStories',
  labels: {
    singular: 'Student Stories Block',
    plural: 'Student Stories Blocks',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow Label',
      defaultValue: 'Student Stories',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      defaultValue: 'What our students are saying',
      required: true,
    },
    {
      name: 'testimonials',
      type: 'array',
      label: 'Testimonials',
      minRows: 1,
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          label: 'Quote',
          required: true,
        },
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
          label: 'Avatar Photo',
        },
        {
          name: 'name',
          type: 'text',
          label: 'Student Name',
          required: true,
        },
        {
          name: 'meta',
          type: 'text',
          label: 'Meta (e.g. Hindi speaker · French A2→B2)',
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
      defaultValue: [
        {
          quote:
            "I came with zero French and left with enough to navigate Paris entirely in French. The immersive approach and Sofia's energy are simply unmatched — I felt like I was learning in Paris itself.",
          name: 'Priya Sharma',
          meta: 'Hindi speaker · French A2→B2',
          rating: 5,
        },
        {
          quote:
            'The business English course completely changed how I present in international meetings. My confidence went through the roof within two months. Worth every rupee and more.',
          name: 'Rajesh Kumar',
          meta: 'Telugu speaker · Business English',
          rating: 5,
        },
        {
          quote:
            "Kenji's Japanese lessons feel like cultural adventures. I passed JLPT N2 on my first attempt — something I never thought possible before LinguaMosaic. The method is simply extraordinary.",
          name: 'Aisha Mohammed',
          meta: 'Arabic speaker · Japanese N3→N2',
          rating: 5,
        },
        {
          quote:
            'From struggling with basic grammar to holding full conversations in Spanish — LinguaMosaic transformed my approach to language learning entirely.',
          name: 'Arjun Mehta',
          meta: 'English speaker · Spanish B1',
          rating: 5,
        },
        {
          quote:
            'The structured Mandarin programme gave me the confidence to negotiate business deals in Chinese. Incredible instructors who genuinely care about your progress.',
          name: 'Neha Patel',
          meta: 'Gujarati speaker · Mandarin HSK 3',
          rating: 5,
        },
      ],
    },
  ],
}
