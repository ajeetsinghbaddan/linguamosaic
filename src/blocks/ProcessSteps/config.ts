import type { Block } from 'payload'

export const ProcessStepsBlock: Block = {
  slug: 'processSteps',
  labels: {
    singular: 'Process Steps Block',
    plural: 'Process Steps Blocks',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow Label',
      defaultValue: 'Process',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      defaultValue: 'Four steps to confident fluency',
      required: true,
    },
    {
      name: 'steps',
      type: 'array',
      label: 'Steps',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'icon',
          type: 'text',
          label: 'Icon (emoji)',
          defaultValue: '📝',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Step Title',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Step Description',
        },
      ],
      defaultValue: [
        {
          icon: '📝',
          title: 'Placement Test',
          description:
            'A 15-minute adaptive assessment pinpoints your exact level across all four language skills.',
        },
        {
          icon: '🎯',
          title: 'Choose Course',
          description:
            'Our advisor matches you with the perfect program, format, instructor, and schedule.',
        },
        {
          icon: '🌱',
          title: 'Start Learning',
          description:
            'Immersive lessons, real conversations, and weekly progress reports keep momentum.',
        },
        {
          icon: '🏆',
          title: 'Get Certified',
          description:
            'Earn internationally recognised certificates — IELTS, DELF, DELE, HSK, and more.',
        },
      ],
    },
  ],
}
