import type { Block } from 'payload'

export const AboutHeroBlock: Block = {
  slug: 'aboutHero',
  labels: { singular: 'About Hero', plural: 'About Heroes' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Our Story' },
    { name: 'headingMain', type: 'text', defaultValue: 'We believe language', required: true },
    { name: 'headingAccent', type: 'text', defaultValue: 'unlocks humanity.' },
    {
      name: 'subtext',
      type: 'textarea',
      defaultValue:
        'Founded in 2006, LinguaMosaic has helped over 5,000 students discover the world through language — one lesson, one conversation, one breakthrough at a time.',
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Stats',
      maxRows: 4,
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
      defaultValue: [
        { value: '18+', label: 'Years of Excellence' },
        { value: '5,000+', label: 'Students Taught' },
        { value: '20+', label: 'Languages Offered' },
        { value: '98%', label: 'Satisfaction Rate' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Image',
    },
  ],
}

export const AboutMissionBlock: Block = {
  slug: 'aboutMission',
  labels: { singular: 'Mission & Vision', plural: 'Mission & Vision' },
  fields: [
    { name: 'missionEyebrow', type: 'text', defaultValue: 'Our Mission' },
    {
      name: 'missionHeading',
      type: 'text',
      defaultValue: 'Language learning should be joyful, personal, and transformative.',
    },
    {
      name: 'missionText',
      type: 'textarea',
      defaultValue:
        'We craft every lesson to spark real-world fluency. Our certified educators blend CEFR-aligned curricula with cultural immersion, ensuring every student walks away not just knowing a language — but feeling it.',
    },
    { name: 'visionEyebrow', type: 'text', defaultValue: 'Our Vision' },
    { name: 'visionHeading', type: 'text', defaultValue: 'A world without language barriers.' },
    {
      name: 'visionText',
      type: 'textarea',
      defaultValue:
        'We envision a future where every person can connect with any culture, anywhere. LinguaMosaic is building that bridge — one student at a time.',
    },
    {
      name: 'values',
      type: 'array',
      label: 'Core Values',
      maxRows: 6,
      fields: [
        { name: 'icon', type: 'text', label: 'Emoji Icon', defaultValue: '🌱' },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
      defaultValue: [
        {
          icon: '🌱',
          title: 'Immersion First',
          description: 'Real conversations from day one. No rote memorisation.',
        },
        {
          icon: '❤️',
          title: 'Deeply Personal',
          description: 'Every learner is unique. We tailor every path accordingly.',
        },
        {
          icon: '🌍',
          title: 'Culturally Rich',
          description: 'Language is culture. We teach both, together.',
        },
        {
          icon: '🏆',
          title: 'Excellence Always',
          description: 'Certified educators, proven methods, measurable results.',
        },
        {
          icon: '🤝',
          title: 'Community Driven',
          description: 'Learn with peers from across India and the world.',
        },
        {
          icon: '✨',
          title: 'Joyful Learning',
          description: 'If it is not fun, it does not stick. We make it fun.',
        },
      ],
    },
  ],
}

export const AboutTimelineBlock: Block = {
  slug: 'aboutTimeline',
  labels: { singular: 'Our Journey Timeline', plural: 'Journey Timelines' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Our Journey' },
    { name: 'heading', type: 'text', defaultValue: 'Eighteen years of breaking barriers.' },
    {
      name: 'milestones',
      type: 'array',
      label: 'Milestones',
      fields: [
        { name: 'year', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'emoji', type: 'text', defaultValue: '📍' },
      ],
      defaultValue: [
        {
          year: '2006',
          title: 'Founded in Delhi',
          description: 'Started with 3 teachers, 1 classroom, and a big dream.',
          emoji: '🌱',
        },
        {
          year: '2009',
          title: 'Expanded to 5 Languages',
          description: 'Added Spanish, French, German, and Japanese to the curriculum.',
          emoji: '🌍',
        },
        {
          year: '2013',
          title: 'UNESCO Partnership',
          description: 'Recognised as a UNESCO-affiliated language education centre.',
          emoji: '🏛️',
        },
        {
          year: '2016',
          title: '1,000 Students Milestone',
          description: 'Celebrated our 1,000th student with a cultural festival.',
          emoji: '🎉',
        },
        {
          year: '2019',
          title: 'Online Classes Launched',
          description: 'Brought LinguaMosaic to learners across India digitally.',
          emoji: '💻',
        },
        {
          year: '2023',
          title: 'Best Language School Award',
          description: "Recognised as India's Best Language School for the third year running.",
          emoji: '🏆',
        },
        {
          year: '2025',
          title: '5,000+ Students Strong',
          description: 'Growing every day, one conversation at a time.',
          emoji: '🚀',
        },
      ],
    },
  ],
}

export const AboutTeamBlock: Block = {
  slug: 'aboutTeam',
  labels: { singular: 'Leadership Team', plural: 'Leadership Teams' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Leadership' },
    { name: 'heading', type: 'text', defaultValue: 'The people behind the mission.' },
    {
      name: 'subtext',
      type: 'text',
      defaultValue: 'Educators, linguists, and dreamers — united by one goal.',
    },
    {
      name: 'members',
      type: 'array',
      label: 'Team Members',
      fields: [
        { name: 'photo', type: 'upload', relationTo: 'media' },
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text', required: true },
        { name: 'bio', type: 'textarea' },
        { name: 'languages', type: 'text', label: 'Languages spoken' },
      ],
      defaultValue: [
        {
          name: 'Priya Nair',
          role: 'Founder & CEO',
          bio: 'Linguist, educator, and polyglot who speaks 7 languages.',
          languages: 'English · Hindi · French · Spanish · German · Japanese · Mandarin',
        },
        {
          name: 'Rohan Mehta',
          role: 'Academic Director',
          bio: 'Former Cambridge CELTA trainer with 20 years in language education.',
          languages: 'English · Hindi · Urdu',
        },
        {
          name: 'Sofia Almeida',
          role: 'Head of European Languages',
          bio: 'Native Portuguese speaker, specialist in Romance languages.',
          languages: 'Portuguese · Spanish · French · Italian',
        },
        {
          name: 'Dr. Kenji Yamada',
          role: 'Head of Asian Languages',
          bio: 'PhD in Japanese linguistics, former NHK broadcaster.',
          languages: 'Japanese · Mandarin · Korean',
        },
      ],
    },
  ],
}

export const AboutCtaBlock: Block = {
  slug: 'aboutCta',
  labels: { singular: 'About CTA', plural: 'About CTAs' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Ready to find your language?' },
    {
      name: 'subtext',
      type: 'text',
      defaultValue:
        'Join 5,000+ students who have already started their journey with LinguaMosaic.',
    },
    { name: 'primaryLabel', type: 'text', defaultValue: 'Explore Courses' },
    { name: 'primaryUrl', type: 'text', defaultValue: '/courses' },
    { name: 'secondaryLabel', type: 'text', defaultValue: 'Book Free Trial' },
    { name: 'secondaryUrl', type: 'text', defaultValue: '/trial' },
    {
      name: 'badges',
      type: 'array',
      fields: [{ name: 'text', type: 'text' }],
      defaultValue: [
        { text: '🏆 Best Language School 2025' },
        { text: '🌐 UNESCO Partner' },
        { text: '✅ CEFR Certified' },
      ],
    },
  ],
}
