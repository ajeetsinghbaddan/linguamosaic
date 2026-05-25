import type { GlobalConfig } from 'payload'
import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
      admin: {
        description: 'Upload your footer logo. Recommended size: 200x60px.',
      },
    },
    {
      name: 'newsletter',
      type: 'group',
      label: 'Newsletter Section',
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Icon (e.g. leaf emoji/image)',
        },
        {
          name: 'headingMain',
          type: 'text',
          label: 'Heading — Main (white)',
          defaultValue: 'Stay Fluent,',
        },
        {
          name: 'headingAccent',
          type: 'text',
          label: 'Heading — Accent (yellow italic)',
          defaultValue: 'Stay Connected',
        },
        {
          name: 'subtext',
          type: 'text',
          label: 'Subtext',
          defaultValue:
            'Weekly tips, new course alerts, and cultural insights — right to your inbox.',
        },
        {
          name: 'badgeText',
          type: 'text',
          label: 'Badge Text',
          defaultValue: '🎁 Sign up today and get 10% off your first course',
        },
        // ── Replaced languageOptions + buttonText with Payload form ──
        {
          name: 'form',
          type: 'relationship',
          relationTo: 'forms',
          label: 'Newsletter Form',
          required: false,
          admin: {
            description:
              'Select a form created in the Forms collection. If none selected, the default inline form is used.',
          },
        },
        // Keep these as fallback when no form is selected
        {
          name: 'languageOptions',
          type: 'array',
          label: 'Language Interest Options (fallback)',
          admin: {
            description: 'Used only when no Payload form is selected above.',
          },
          fields: [
            {
              name: 'language',
              type: 'text',
              label: 'Language',
            },
          ],
          defaultValue: [
            { language: 'Spanish' },
            { language: 'French' },
            { language: 'Japanese' },
            { language: 'Mandarin' },
            { language: 'Arabic' },
          ],
        },
        {
          name: 'buttonText',
          type: 'text',
          label: 'Subscribe Button Text (fallback)',
          defaultValue: 'Subscribe',
        },
      ],
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 10,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'copyrightText',
      type: 'text',
      label: 'Copyright Text',
      defaultValue:
        '© 2026 LinguaMosaic Language Institute. All rights reserved. Crafted with care for language lovers.',
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
