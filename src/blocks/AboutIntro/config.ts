import type { Block } from 'payload'

export const AboutIntroBlock: Block = {
  slug: 'aboutIntro',
  labels: {
    singular: 'About Intro Block',
    plural: 'About Intro Blocks',
  },
  fields: [
    // Top section
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow Label',
      defaultValue: 'About Us',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      defaultValue: 'Language is the bridge between worlds',
      required: true,
    },

    // Left card
    {
      name: 'statCard',
      type: 'group',
      label: 'Stat Card (left)',
      fields: [
        {
          name: 'number',
          type: 'text',
          label: 'Big Number',
          defaultValue: '18',
        },
        {
          name: 'description',
          type: 'text',
          label: 'Description below number',
          defaultValue: 'Years of excellence in language education',
        },
        {
          name: 'badges',
          type: 'array',
          label: 'Badges',
          fields: [{ name: 'text', type: 'text', label: 'Badge text' }],
          defaultValue: [{ text: '🏆 Best Language School 2025' }, { text: '🌐 UNESCO Partner' }],
        },
      ],
    },

    // Right content
    {
      name: 'paragraphs',
      type: 'array',
      label: 'Body Paragraphs',
      fields: [{ name: 'text', type: 'textarea', label: 'Paragraph' }],
      defaultValue: [
        {
          text: 'LinguaMosaic was founded on a simple belief: language learning should be immersive, joyful, and deeply personal. Our certified educators craft every lesson to spark real-world fluency — not just textbook knowledge.',
        },
        {
          text: 'From absolute beginners to advanced learners preparing for international certifications, we meet you exactly where you are. Our methods blend CEFR-aligned curricula with cultural immersion, one-on-one mentorship, and a community of fellow learners from across India and beyond.',
        },
      ],
    },
    {
      name: 'primaryButton',
      type: 'group',
      label: 'Primary Button',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Learn More' },
        { name: 'url', type: 'text', defaultValue: '/about' },
      ],
    },
    {
      name: 'phone',
      type: 'group',
      label: 'Phone CTA',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Call us' },
        { name: 'number', type: 'text', defaultValue: '(+91) 999 99 99999' },
      ],
    },
  ],
}
