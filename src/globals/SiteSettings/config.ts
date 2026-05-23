import type { GlobalConfig } from 'payload'
import { revalidateTag } from 'next/cache'
import { revalidateSiteSettings } from './hooks/revalidateSiteSettings'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'scripts',
      type: 'group',
      label: 'Scripts & Tracking',
      admin: {
        description:
          'Add third-party tracking scripts. These are injected directly into your site.',
      },
      fields: [
        {
          name: 'headScripts',
          type: 'array',
          label: 'Head Scripts',
          admin: {
            description:
              'Scripts injected inside <head>. Use for Google Tag Manager, Meta Pixel, analytics init scripts, etc.',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Label (for your reference)',
              admin: {
                placeholder: 'e.g. Google Tag Manager',
              },
            },
            {
              name: 'position',
              type: 'select',
              label: 'Position in head',
              defaultValue: 'end',
              options: [
                { label: 'Start of <head>', value: 'start' },
                { label: 'End of <head>', value: 'end' },
              ],
            },
            {
              name: 'script',
              type: 'code',
              label: 'Script Code',
              admin: {
                language: 'html',
                description:
                  'Paste the full <script> tag or inline JS. Supports <script>, <noscript>, and <link> tags.',
              },
            },
            {
              name: 'enabled',
              type: 'checkbox',
              label: 'Enabled',
              defaultValue: true,
            },
          ],
        },
        {
          name: 'bodyStartScripts',
          type: 'array',
          label: 'Body Start Scripts',
          admin: {
            description:
              'Scripts injected immediately after <body> opens. Use for Google Tag Manager noscript fallback, etc.',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Label (for your reference)',
              admin: {
                placeholder: 'e.g. GTM noscript fallback',
              },
            },
            {
              name: 'script',
              type: 'code',
              label: 'Script Code',
              admin: {
                language: 'html',
                description: 'Paste the full <script> or <noscript> tag.',
              },
            },
            {
              name: 'enabled',
              type: 'checkbox',
              label: 'Enabled',
              defaultValue: true,
            },
          ],
        },
        {
          name: 'footerScripts',
          type: 'array',
          label: 'Footer Scripts',
          admin: {
            description:
              'Scripts injected just before </body> closes. Use for chat widgets, lazy-loaded analytics, Intercom, Crisp, etc.',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Label (for your reference)',
              admin: {
                placeholder: 'e.g. Crisp Chat Widget',
              },
            },
            {
              name: 'script',
              type: 'code',
              label: 'Script Code',
              admin: {
                language: 'html',
                description:
                  'Paste the full <script> tag. Loads after page content — ideal for non-critical third-party scripts.',
              },
            },
            {
              name: 'enabled',
              type: 'checkbox',
              label: 'Enabled',
              defaultValue: true,
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSiteSettings],
  },
}
