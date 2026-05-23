import type { Block } from 'payload'

export const FacultyHeroBlock: Block = {
  slug: 'facultyHero',
  labels: { singular: 'Faculty Hero', plural: 'Faculty Heroes' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Our Faculty' },
    { name: 'headingMain', type: 'text', defaultValue: 'Learn from the', required: true },
    { name: 'headingAccent', type: 'text', defaultValue: "world's best." },
    {
      name: 'subtext',
      type: 'textarea',
      defaultValue:
        'Every instructor at LinguaMosaic is a certified native speaker with deep cultural knowledge and a passion for teaching. We hire educators, not just speakers.',
    },
    {
      name: 'stats',
      type: 'array',
      maxRows: 4,
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
      defaultValue: [
        { value: '45+', label: 'Instructors' },
        { value: '20+', label: 'Languages' },
        { value: '98%', label: 'Student Rating' },
        { value: '12+', label: 'Avg. Years Exp.' },
      ],
    },
  ],
}

export const FacultyGridBlock: Block = {
  slug: 'facultyGrid',
  labels: { singular: 'Faculty Grid', plural: 'Faculty Grids' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Meet the Team' },
    { name: 'heading', type: 'text', defaultValue: 'Our instructors' },
    {
      name: 'instructors',
      type: 'array',
      label: 'Instructors',
      minRows: 1,
      fields: [
        { name: 'photo', type: 'upload', relationTo: 'media', label: 'Photo' },
        { name: 'name', type: 'text', label: 'Full Name', required: true },
        { name: 'role', type: 'text', label: 'Role/Title', defaultValue: 'Language Instructor' },
        { name: 'languages', type: 'text', label: 'Languages taught (e.g. French · Italian)' },
        { name: 'experience', type: 'text', label: 'Years of experience (e.g. 12 years)' },
        { name: 'nationality', type: 'text', label: 'Flag emoji (e.g. 🇫🇷)' },
        { name: 'bio', type: 'textarea', label: 'Short bio' },
        { name: 'profileUrl', type: 'text', label: 'Profile URL', defaultValue: '/faculty' },
        {
          name: 'specialisms',
          type: 'array',
          label: 'Specialisms',
          fields: [{ name: 'tag', type: 'text' }],
        },
        {
          name: 'certifications',
          type: 'array',
          label: 'Certifications',
          fields: [{ name: 'cert', type: 'text' }],
        },
        {
          name: 'testimonial',
          type: 'group',
          label: 'Student Testimonial',
          fields: [
            { name: 'quote', type: 'textarea' },
            { name: 'studentName', type: 'text' },
            { name: 'studentMeta', type: 'text' },
            { name: 'rating', type: 'number', min: 1, max: 5, defaultValue: 5 },
          ],
        },
        {
          name: 'featured',
          type: 'checkbox',
          label: 'Featured instructor',
          defaultValue: false,
        },
      ],
      defaultValue: [
        {
          name: 'Sofia Moreno',
          role: 'Senior Spanish Instructor',
          languages: 'Spanish · Portuguese',
          experience: '14 years',
          nationality: '🇪🇸',
          bio: 'A published poet and flamenco dancer, Sofia brings the full vibrancy of Spanish culture into every class. She specialises in conversational fluency and DELE exam preparation.',
          profileUrl: '/faculty/sofia-moreno',
          specialisms: [{ tag: 'Conversation' }, { tag: 'DELE Prep' }, { tag: 'Culture' }],
          certifications: [{ cert: 'CELTA' }, { cert: 'DELE Examiner' }],
          featured: true,
          testimonial: {
            quote:
              'Sofia made Spanish feel alive. I went from zero to conversational in four months.',
            studentName: 'Priya Sharma',
            studentMeta: 'Hindi speaker · Spanish A2',
            rating: 5,
          },
        },
        {
          name: 'Kenji Nakamura',
          role: 'Head of Japanese',
          languages: 'Japanese · Mandarin',
          experience: '18 years',
          nationality: '🇯🇵',
          bio: 'Former NHK broadcaster and linguistics PhD candidate. Kenji makes kanji feel like art, not memorisation. Passed 200+ students through JLPT N2 and N1.',
          profileUrl: '/faculty/kenji-nakamura',
          specialisms: [{ tag: 'JLPT' }, { tag: 'Business Japanese' }, { tag: 'Kanji' }],
          certifications: [{ cert: 'JLPT N1' }, { cert: 'Japanese Language Teacher Cert.' }],
          featured: true,
          testimonial: {
            quote:
              'Kenji is the reason I passed JLPT N2 on my first attempt. His methods are extraordinary.',
            studentName: 'Aisha Mohammed',
            studentMeta: 'Arabic speaker · Japanese N2',
            rating: 5,
          },
        },
        {
          name: 'Amélie Dubois',
          role: 'French Language Lead',
          languages: 'French · Italian',
          experience: '11 years',
          nationality: '🇫🇷',
          bio: 'Gourmet chef turned language educator. Amélie weaves Parisian culture, cuisine, and cinema into every lesson. Her students consistently outperform in DELF and DALF.',
          profileUrl: '/faculty/amelie-dubois',
          specialisms: [{ tag: 'DELF' }, { tag: 'DALF' }, { tag: 'Parisian French' }],
          certifications: [{ cert: 'DELF Examiner' }, { cert: 'Alliance Française Certified' }],
          featured: false,
          testimonial: {
            quote:
              'My French accent transformed completely. Amélie teaches the soul of the language.',
            studentName: 'Rajesh Kumar',
            studentMeta: 'Telugu speaker · French B1',
            rating: 5,
          },
        },
        {
          name: 'Dr. Ahmed Al-Rashid',
          role: 'Arabic & German Specialist',
          languages: 'Arabic · German',
          experience: '16 years',
          nationality: '🇦🇪',
          bio: 'PhD in Applied Linguistics from Cairo University. Dr. Ahmed is a calligraphy artist who makes Arabic script both beautiful and approachable for total beginners.',
          profileUrl: '/faculty/dr-ahmed',
          specialisms: [{ tag: 'MSA Arabic' }, { tag: 'Goethe Prep' }, { tag: 'Script Mastery' }],
          certifications: [{ cert: 'PhD Linguistics' }, { cert: 'Goethe-Zertifikat C2' }],
          featured: false,
          testimonial: {
            quote: 'Dr. Ahmed made Arabic script click for me in just two weeks. Truly gifted.',
            studentName: 'Neha Patel',
            studentMeta: 'Gujarati speaker · Arabic A2',
            rating: 5,
          },
        },
        {
          name: 'Mei Lin Chen',
          role: 'Mandarin Instructor',
          languages: 'Mandarin · Cantonese',
          experience: '9 years',
          nationality: '🇨🇳',
          bio: 'Former translator for the Beijing Olympics, Mei Lin specialises in business Mandarin and HSK exam preparation. She has trained professionals from 12 Fortune 500 companies.',
          profileUrl: '/faculty/mei-lin-chen',
          specialisms: [{ tag: 'Business Mandarin' }, { tag: 'HSK' }, { tag: 'Tones' }],
          certifications: [{ cert: 'HSK 6' }, { cert: 'TCSL Certificate' }],
          featured: false,
          testimonial: {
            quote:
              'Mei Lin helped me negotiate in Mandarin within 6 months. Unbelievable progress.',
            studentName: 'Arjun Mehta',
            studentMeta: 'English speaker · Mandarin HSK 3',
            rating: 5,
          },
        },
        {
          name: 'Hans Weber',
          role: 'German Language Expert',
          languages: 'German · Dutch',
          experience: '13 years',
          nationality: '🇩🇪',
          bio: 'Munich-born engineer turned educator. Hans brings a structured, logical approach to German grammar that finally makes it click. Goethe examiner for 8 years.',
          profileUrl: '/faculty/hans-weber',
          specialisms: [
            { tag: 'Grammar' },
            { tag: 'Goethe-Zertifikat' },
            { tag: 'Technical German' },
          ],
          certifications: [{ cert: 'Goethe Examiner' }, { cert: 'TestDaF Certified' }],
          featured: false,
          testimonial: {
            quote:
              'Hans broke down German grammar in a way no textbook ever could. Finally it makes sense!',
            studentName: 'Sunita Rao',
            studentMeta: 'Kannada speaker · German B1',
            rating: 5,
          },
        },
      ],
    },
  ],
}

export const FacultyPhilosophyBlock: Block = {
  slug: 'facultyPhilosophy',
  labels: { singular: 'Teaching Philosophy', plural: 'Teaching Philosophies' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Our Standard' },
    { name: 'heading', type: 'text', defaultValue: 'What makes a LinguaMosaic instructor?' },
    {
      name: 'subtext',
      type: 'textarea',
      defaultValue:
        "We do not just hire native speakers. We hire educators who live the language, breathe the culture, and genuinely care about every student's progress.",
    },
    {
      name: 'standards',
      type: 'array',
      label: 'Standards',
      fields: [
        { name: 'icon', type: 'text', defaultValue: '✅' },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
      defaultValue: [
        {
          icon: '🌍',
          title: 'Native Speaker',
          description:
            'Every instructor is a native speaker of the language they teach — authentic accents, natural idioms, real culture.',
        },
        {
          icon: '🎓',
          title: 'Formally Certified',
          description:
            'All instructors hold internationally recognised teaching certifications — CELTA, DELF, JLPT, HSK, Goethe, and more.',
        },
        {
          icon: '📊',
          title: 'Results Proven',
          description:
            'We track student outcomes. Our instructors are selected and retained based on measurable student progress.',
        },
        {
          icon: '🔄',
          title: 'Continuously Trained',
          description:
            'Monthly pedagogy workshops keep our team at the leading edge of language teaching methodology.',
        },
        {
          icon: '❤️',
          title: 'Genuinely Passionate',
          description:
            'We interview for passion, not just credentials. The best teachers love what they do — and it shows.',
        },
        {
          icon: '🤝',
          title: 'Culturally Immersive',
          description:
            'Our instructors bring their culture to class — festivals, cuisine, history, humour. Language lives in culture.',
        },
      ],
    },
  ],
}

export const FacultyJoinBlock: Block = {
  slug: 'facultyJoin',
  labels: { singular: 'Join Our Faculty', plural: 'Join Our Faculty' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Join Us' },
    { name: 'heading', type: 'text', defaultValue: 'Are you a language educator?' },
    {
      name: 'subtext',
      type: 'textarea',
      defaultValue:
        'We are always looking for passionate, certified native-speaker educators to join our growing faculty. If you love languages and love people, we want to hear from you.',
    },
    {
      name: 'perks',
      type: 'array',
      label: 'Perks',
      fields: [
        { name: 'icon', type: 'text' },
        { name: 'text', type: 'text' },
      ],
      defaultValue: [
        { icon: '💰', text: 'Competitive pay + performance bonuses' },
        { icon: '🕐', text: 'Flexible online & in-person schedules' },
        { icon: '📈', text: 'Professional development opportunities' },
        { icon: '🌐', text: 'Access to 5,000+ student community' },
      ],
    },
    { name: 'ctaLabel', type: 'text', defaultValue: 'Apply to Teach' },
    { name: 'ctaUrl', type: 'text', defaultValue: '/careers' },
    { name: 'secondaryLabel', type: 'text', defaultValue: 'Learn More' },
    { name: 'secondaryUrl', type: 'text', defaultValue: '/about' },
  ],
}
