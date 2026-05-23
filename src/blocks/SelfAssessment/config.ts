import type { Block } from 'payload'

export const SelfAssessmentBlock: Block = {
  slug: 'selfAssessment',
  labels: {
    singular: 'Self Assessment Block',
    plural: 'Self Assessment Blocks',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow Label',
      defaultValue: 'Self Assessment',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      defaultValue: "What's your current level?",
      required: true,
    },
    {
      name: 'subtext',
      type: 'text',
      label: 'Subtext',
      defaultValue: "Answer 3 quick questions and we'll recommend the perfect course for you.",
    },
    {
      name: 'questions',
      type: 'array',
      label: 'Questions',
      minRows: 1,
      fields: [
        {
          name: 'question',
          type: 'text',
          label: 'Question',
          required: true,
        },
        {
          name: 'options',
          type: 'array',
          label: 'Answer Options',
          minRows: 2,
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Option Text',
              required: true,
            },
            {
              name: 'score',
              type: 'number',
              label: 'Score Value',
              defaultValue: 1,
            },
          ],
        },
      ],
      defaultValue: [
        {
          question: 'Can you introduce yourself in your target language?',
          options: [
            { text: 'Not at all – complete beginner', score: 0 },
            { text: 'A few basic phrases', score: 1 },
            { text: 'Yes, with some mistakes', score: 2 },
            { text: 'Yes, fluently and confidently', score: 3 },
          ],
        },
        {
          question: 'How do you handle reading in your target language?',
          options: [
            { text: 'I understand almost nothing', score: 0 },
            { text: 'I catch a few words here and there', score: 1 },
            { text: 'I understand the general idea', score: 2 },
            { text: 'I understand most of it easily', score: 3 },
          ],
        },
        {
          question: 'What is your primary goal for learning this language?',
          options: [
            { text: 'Travel & basic communication', score: 0 },
            { text: 'School or university studies', score: 1 },
            { text: 'Career and professional use', score: 2 },
            { text: 'Complete fluency & cultural immersion', score: 3 },
          ],
        },
      ],
    },
    {
      name: 'results',
      type: 'array',
      label: 'Results (score ranges)',
      fields: [
        { name: 'minScore', type: 'number', label: 'Min Score', required: true },
        { name: 'maxScore', type: 'number', label: 'Max Score', required: true },
        { name: 'emoji', type: 'text', label: 'Emoji', defaultValue: '🌱' },
        {
          name: 'level',
          type: 'text',
          label: 'Level Label (e.g. A1 – Absolute Beginner)',
          required: true,
        },
        {
          name: 'recommendation',
          type: 'text',
          label: 'Recommended Course',
          defaultValue: 'Starter Group Class',
        },
        {
          name: 'recommendationUrl',
          type: 'text',
          label: 'Recommendation URL',
          defaultValue: '/courses',
        },
        { name: 'description', type: 'textarea', label: 'Description' },
        { name: 'ctaLabel', type: 'text', label: 'CTA Button Label', defaultValue: 'View Courses' },
        { name: 'ctaUrl', type: 'text', label: 'CTA Button URL', defaultValue: '/courses' },
      ],
      defaultValue: [
        {
          minScore: 0,
          maxScore: 2,
          emoji: '🌱',
          level: 'A1 – Absolute Beginner',
          recommendation: 'Starter Group Class',
          recommendationUrl: '/courses/starter',
          description:
            "Perfect! We'll build your foundation from scratch with structured, playful lessons.",
          ctaLabel: 'View Courses',
          ctaUrl: '/courses',
        },
        {
          minScore: 3,
          maxScore: 5,
          emoji: '📖',
          level: 'A2 – Elementary',
          recommendation: 'Elementary Group Class',
          recommendationUrl: '/courses/elementary',
          description:
            "You have a base to build on. Let's accelerate your progress with structured practice.",
          ctaLabel: 'View Courses',
          ctaUrl: '/courses',
        },
        {
          minScore: 6,
          maxScore: 7,
          emoji: '🚀',
          level: 'B1 – Intermediate',
          recommendation: 'Intermediate Group Class',
          recommendationUrl: '/courses/intermediate',
          description:
            "You're conversational! Let's sharpen your fluency and tackle complex topics.",
          ctaLabel: 'View Courses',
          ctaUrl: '/courses',
        },
        {
          minScore: 8,
          maxScore: 9,
          emoji: '🏆',
          level: 'B2–C1 – Advanced',
          recommendation: 'Advanced Private Tutoring',
          recommendationUrl: '/courses/advanced',
          description:
            'Impressive! You need a personalised path to reach full professional fluency.',
          ctaLabel: 'View Courses',
          ctaUrl: '/courses',
        },
      ],
    },
  ],
}
