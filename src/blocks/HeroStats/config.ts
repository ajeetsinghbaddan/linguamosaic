import type { Block } from 'payload'

export const HeroStatsBlock: Block = {
  slug: 'heroStats',
  labels: {
    singular: 'Hero Stats Block',
    plural: 'Hero Stats Blocks',
  },
  fields: [
    // Left side
    {
      name: 'headingMain',
      type: 'text',
      label: 'Heading — Main (dark)',
      defaultValue: 'Master a New Language,',
      required: true,
    },
    {
      name: 'headingAccent',
      type: 'text',
      label: 'Heading — Accent (brown italic)',
      defaultValue: 'Unlock a New World',
      required: true,
    },
    {
      name: 'subtext',
      type: 'textarea',
      label: 'Subtext',
      defaultValue:
        "Join 5,000+ students who've transformed their lives through language. Native instructors, 20+ languages, and flexible schedules that fit your life.",
    },
    {
      name: 'primaryButton',
      type: 'group',
      label: 'Primary Button',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Explore Courses' },
        { name: 'url', type: 'text', defaultValue: '/courses' },
      ],
    },
    {
      name: 'secondaryButton',
      type: 'group',
      label: 'Secondary Button',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Book Free Trial' },
        { name: 'url', type: 'text', defaultValue: '/trial' },
      ],
    },
    {
      name: 'languageTags',
      type: 'array',
      label: 'Language Tags',
      fields: [
        { name: 'flag', type: 'text', label: 'Flag emoji or code (e.g. GB)', defaultValue: 'GB' },
        { name: 'name', type: 'text', label: 'Language name', defaultValue: 'English' },
      ],
      defaultValue: [
        { flag: 'GB', name: 'English' },
        { flag: 'ES', name: 'Spanish' },
        { flag: 'FR', name: 'French' },
        { flag: 'JP', name: 'Japanese' },
      ],
    },
    {
      name: 'moreLanguagesCount',
      type: 'number',
      label: 'Additional languages count (e.g. 16)',
      defaultValue: 16,
    },

    // Right side — floating cards
    {
      name: 'satisfactionCard',
      type: 'group',
      label: 'Satisfaction Rate Card',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Satisfaction Rate' },
        { name: 'value', type: 'text', defaultValue: '98%' },
        { name: 'subtext', type: 'text', defaultValue: 'Based on 5,000+ reviews' },
      ],
    },
    {
      name: 'experienceCard',
      type: 'group',
      label: 'Experience Card',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Experience' },
        { name: 'value', type: 'text', defaultValue: '18 Years' },
        { name: 'badge', type: 'text', defaultValue: '🏆 Best School 2023' },
      ],
    },
    {
      name: 'chartTitle',
      type: 'text',
      label: 'Chart Title',
      defaultValue: 'Active learners this month',
    },
    {
      name: 'chartBars',
      type: 'array',
      label: 'Chart Bars',
      fields: [
        { name: 'code', type: 'text', label: 'Country code (e.g. GB)' },
        { name: 'language', type: 'text', label: 'Language name' },
        { name: 'percentage', type: 'number', label: 'Percentage (0–100)' },
        {
          name: 'color',
          type: 'select',
          label: 'Bar color',
          options: [
            { label: 'Sage Green', value: 'sage' },
            { label: 'Brown', value: 'brown' },
            { label: 'Yellow', value: 'yellow' },
            { label: 'Light Green', value: 'lightGreen' },
          ],
          defaultValue: 'sage',
        },
      ],
      defaultValue: [
        { code: 'GB', language: 'English', percentage: 89, color: 'sage' },
        { code: 'ES', language: 'Spanish', percentage: 74, color: 'brown' },
        { code: 'FR', language: 'French', percentage: 61, color: 'yellow' },
        { code: 'JP', language: 'Japanese', percentage: 48, color: 'lightGreen' },
      ],
    },
    {
      name: 'statsRow',
      type: 'array',
      label: 'Stats Row (bottom of chart)',
      maxRows: 3,
      fields: [
        { name: 'value', type: 'text', label: 'Value (e.g. 5,000+)' },
        { name: 'label', type: 'text', label: 'Label (e.g. Students)' },
      ],
      defaultValue: [
        { value: '5,000+', label: 'Students' },
        { value: '20+', label: 'Languages' },
        { value: '45', label: 'Teachers' },
      ],
    },
  ],
}
