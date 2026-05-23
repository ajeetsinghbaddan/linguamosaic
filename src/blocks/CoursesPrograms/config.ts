import type { Block } from 'payload'

export const CoursesProgramsBlock: Block = {
  slug: 'coursesPrograms',
  labels: {
    singular: 'Courses Programs Block',
    plural: 'Courses Programs Blocks',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow Label',
      defaultValue: 'Programs',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      defaultValue: 'Courses designed around your life',
      required: true,
    },
    {
      name: 'subtext',
      type: 'textarea',
      label: 'Subtext',
      defaultValue:
        "Flexible formats for every learner — whether you're chasing a certification, a career move, or pure passion.",
    },
    {
      name: 'tabs',
      type: 'array',
      label: 'Program Tabs',
      minRows: 1,
      fields: [
        {
          name: 'tabLabel',
          type: 'text',
          label: 'Tab Label',
          required: true,
        },
        {
          name: 'cards',
          type: 'array',
          label: 'Course Cards',
          minRows: 1,
          maxRows: 3,
          fields: [
            { name: 'title', type: 'text', label: 'Card Title', required: true },
            { name: 'price', type: 'text', label: 'Price (e.g. ₹4,999)', required: true },
            { name: 'priceSuffix', type: 'text', label: 'Price Suffix', defaultValue: '/month' },
            {
              name: 'featured',
              type: 'checkbox',
              label: 'Featured (dark card)',
              defaultValue: false,
            },
            {
              name: 'details',
              type: 'array',
              label: 'Detail Rows',
              fields: [
                { name: 'label', type: 'text', label: 'Label (e.g. Duration)' },
                { name: 'value', type: 'text', label: 'Value (e.g. 3 months)' },
              ],
            },
            {
              name: 'buttonLabel',
              type: 'text',
              label: 'Button Label',
              defaultValue: 'Enroll Now',
            },
            { name: 'buttonUrl', type: 'text', label: 'Button URL', defaultValue: '/enroll' },
          ],
        },
      ],
      defaultValue: [
        {
          tabLabel: 'Group Classes',
          cards: [
            {
              title: 'Beginner Group',
              price: '₹4,999',
              priceSuffix: '/month',
              featured: false,
              details: [
                { label: 'Duration', value: '3 months' },
                { label: 'Sessions/week', value: '3 × 90 min' },
                { label: 'Class size', value: 'Max 8 students' },
              ],
              buttonLabel: 'Enroll Now',
              buttonUrl: '/enroll',
            },
            {
              title: 'Intermediate Group',
              price: '₹6,499',
              priceSuffix: '/month',
              featured: true,
              details: [
                { label: 'Duration', value: '4 months' },
                { label: 'Sessions/week', value: '4 × 90 min' },
                { label: 'Class size', value: 'Max 6 students' },
              ],
              buttonLabel: 'Enroll Now',
              buttonUrl: '/enroll',
            },
            {
              title: 'Advanced Group',
              price: '₹7,999',
              priceSuffix: '/month',
              featured: false,
              details: [
                { label: 'Duration', value: '5 months' },
                { label: 'Sessions/week', value: '4 × 2 hours' },
                { label: 'Class size', value: 'Max 5 students' },
              ],
              buttonLabel: 'Enroll Now',
              buttonUrl: '/enroll',
            },
          ],
        },
        {
          tabLabel: 'Private Tutoring',
          cards: [],
        },
        {
          tabLabel: 'Intensive',
          cards: [],
        },
        {
          tabLabel: 'Business',
          cards: [],
        },
      ],
    },
  ],
}
