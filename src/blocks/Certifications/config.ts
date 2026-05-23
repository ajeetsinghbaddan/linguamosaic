import type { Block } from 'payload'

export const CertificationsBlock: Block = {
  slug: 'certifications',
  labels: {
    singular: 'Certifications Block',
    plural: 'Certifications Blocks',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow Label',
      defaultValue: 'Certifications',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      defaultValue: 'Recognised examinations we prepare you for',
      required: true,
    },
    {
      name: 'certifications',
      type: 'array',
      label: 'Certifications',
      minRows: 1,
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Icon Image',
        },
        {
          name: 'emoji',
          type: 'text',
          label: 'Emoji fallback (if no icon uploaded)',
          defaultValue: '🎓',
        },
        {
          name: 'name',
          type: 'text',
          label: 'Certification Name',
          required: true,
        },
        {
          name: 'meta',
          type: 'text',
          label: 'Meta (e.g. English · British Council)',
        },
        {
          name: 'url',
          type: 'text',
          label: 'Link URL (optional)',
        },
      ],
      defaultValue: [
        { emoji: '🎓', name: 'IELTS', meta: 'English · British Council' },
        { emoji: '📋', name: 'TOEFL', meta: 'English · ETS' },
        { emoji: '🌸', name: 'DELF / DALF', meta: 'French · Institut Français' },
        { emoji: '🌻', name: 'DELE', meta: 'Spanish · Instituto Cervantes' },
        { emoji: '🦅', name: 'Goethe-Zertifikat', meta: 'German · Goethe-Institut' },
        { emoji: '🐉', name: 'HSK', meta: 'Mandarin · Hanban' },
      ],
    },
  ],
}
