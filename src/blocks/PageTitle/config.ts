import type { Block } from 'payload'

export const PageTitleBlock: Block = {
  slug: 'pageTitle',
  labels: { singular: 'Page Title', plural: 'Page Titles' },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow Label',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Page Title',
      required: true,
    },
    {
      name: 'titleAccent',
      type: 'text',
      label: 'Title Accent (italic brown — optional second line)',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description (optional)',
    },
    {
      name: 'breadcrumbs',
      type: 'array',
      label: 'Breadcrumbs',
      fields: [
        { name: 'label', type: 'text', label: 'Label', required: true },
        { name: 'url', type: 'text', label: 'URL (leave empty for current page)' },
      ],
      defaultValue: [
        { label: 'Home', url: '/' },
        { label: 'Page', url: '' },
      ],
    },
    {
      name: 'theme',
      type: 'select',
      label: 'Background Theme',
      defaultValue: 'sand',
      options: [
        { label: 'Sand (default)', value: 'sand' },
        { label: 'White', value: 'white' },
        { label: 'Dark', value: 'dark' },
        { label: 'Sage', value: 'sage' },
      ],
    },
    {
      name: 'showDecoration',
      type: 'checkbox',
      label: 'Show decorative elements',
      defaultValue: true,
    },
  ],
}
