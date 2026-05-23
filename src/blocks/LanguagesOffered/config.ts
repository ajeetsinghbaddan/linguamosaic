import type { Block } from 'payload'

export const LanguagesOfferedBlock: Block = {
  slug: 'languagesOffered',
  labels: {
    singular: 'Languages Offered Block',
    plural: 'Languages Offered Blocks',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow Label',
      defaultValue: 'Languages Offered',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      defaultValue: 'Choose your language journey',
      required: true,
    },
    {
      name: 'subtext',
      type: 'textarea',
      label: 'Subtext',
      defaultValue:
        'Every language opens a new world. Our full catalogue covers 20+ languages with structured CEFR-aligned curricula and native-speaker instruction.',
    },
    {
      name: 'languages',
      type: 'array',
      label: 'Language Cards',
      minRows: 1,
      fields: [
        { name: 'code', type: 'text', label: 'Country Code (e.g. GB)', required: true },
        { name: 'name', type: 'text', label: 'Language Name', required: true },
        { name: 'level', type: 'text', label: 'Level Badge (e.g. A1–C2)', defaultValue: 'A1–C2' },
        { name: 'tags', type: 'text', label: 'Tags (dot-separated, e.g. Business · Academic)' },
        { name: 'url', type: 'text', label: 'Link URL', defaultValue: '/languages' },
      ],
      defaultValue: [
        {
          code: 'GB',
          name: 'English',
          level: 'A1–C2',
          tags: 'Business · Academic · IELTS',
          url: '/languages/english',
        },
        {
          code: 'ES',
          name: 'Spanish',
          level: 'A1–C2',
          tags: 'Latin · Iberian · DELE',
          url: '/languages/spanish',
        },
        {
          code: 'FR',
          name: 'French',
          level: 'A1–C2',
          tags: 'Parisian · DELF · DALF',
          url: '/languages/french',
        },
        {
          code: 'DE',
          name: 'German',
          level: 'A1–C2',
          tags: 'Standard · Goethe-Zertifikat',
          url: '/languages/german',
        },
        {
          code: 'CN',
          name: 'Mandarin',
          level: 'HSK 1–6',
          tags: 'Simplified · HSK Prep',
          url: '/languages/mandarin',
        },
        {
          code: 'JP',
          name: 'Japanese',
          level: 'N5–N1',
          tags: 'JLPT · Business · Manga',
          url: '/languages/japanese',
        },
      ],
    },
  ],
}
