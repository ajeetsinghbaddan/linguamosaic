import type {
  Organization,
  WebSite,
  WebPage,
  AboutPage,
  ContactPage,
  FAQPage,
  ItemList,
  Course,
  Person,
  BreadcrumbList,
  WithContext,
} from 'schema-dts'

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://linguamosaic.in'

// ── Types ──
type SchemaObject = Record<string, unknown>

const getOrganization = (): SchemaObject => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  name: 'LinguaMosaic',
  url: BASE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/favicon.svg`,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-98765-43210',
    contactType: 'customer service',
    availableLanguage: ['English', 'Hindi'],
  },
  sameAs: [
    'https://www.facebook.com/linguamosaic',
    'https://www.instagram.com/linguamosaic',
    'https://www.linkedin.com/company/linguamosaic',
    'https://twitter.com/linguamosaic',
  ],
})

// ── Breadcrumb ──
export const generateBreadcrumbSchema = (items: { name: string; url: string }[]): SchemaObject => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: `${BASE_URL}${item.url}`,
  })),
})

// ── Website ──
export const generateWebsiteSchema = (): SchemaObject => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  url: BASE_URL,
  name: 'LinguaMosaic',
  description:
    'Learn languages with native-speaker instructors. 20+ languages, flexible formats, CEFR-aligned.',
  publisher: { '@id': `${BASE_URL}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
})

// ── Home ──
export const generateHomeSchema = (): SchemaObject[] => [
  getOrganization(),
  generateWebsiteSchema(),
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${BASE_URL}/#webpage`,
    url: BASE_URL,
    name: 'LinguaMosaic — Learn Languages with Native Speakers',
    description:
      'Join 5,000+ students learning 20+ languages with certified native-speaker instructors.',
    isPartOf: { '@id': `${BASE_URL}/#website` },
    about: { '@id': `${BASE_URL}/#organization` },
    publisher: { '@id': `${BASE_URL}/#organization` },
  },
]

// ── About ──
export const generateAboutSchema = (): SchemaObject[] => [
  getOrganization(),
  {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${BASE_URL}/about#webpage`,
    url: `${BASE_URL}/about`,
    name: 'About LinguaMosaic — Our Story, Mission & Team',
    description:
      'Founded in 2006, LinguaMosaic has helped over 5,000 students discover the world through language.',
    isPartOf: { '@id': `${BASE_URL}/#website` },
    publisher: { '@id': `${BASE_URL}/#organization` },
    breadcrumb: generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'About', url: '/about' },
    ]),
  },
]

// ── Languages ──
export const generateLanguagesSchema = (
  languages: { name: string; url: string; description?: string }[] = [],
): SchemaObject[] => [
  getOrganization(),
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${BASE_URL}/languages#webpage`,
    url: `${BASE_URL}/languages`,
    name: 'Languages We Offer — LinguaMosaic',
    description: 'Explore 20+ languages taught by certified native speakers.',
    isPartOf: { '@id': `${BASE_URL}/#website` },
    publisher: { '@id': `${BASE_URL}/#organization` },
    breadcrumb: generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Languages', url: '/languages' },
    ]),
  },
  ...(languages.length > 0
    ? [
        {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Languages Offered',
          numberOfItems: languages.length,
          itemListElement: languages.map((lang, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: lang.name,
            url: `${BASE_URL}${lang.url}`,
            description: lang.description,
          })),
        },
      ]
    : []),
]

// ── Single language page ──
export const generateLanguagePageSchema = (lang: {
  name: string
  nativeName?: string
  slug: string
  description?: string
  level?: string
}): SchemaObject[] => [
  getOrganization(),
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${BASE_URL}/languages/${lang.slug}#webpage`,
    url: `${BASE_URL}/languages/${lang.slug}`,
    name: `Learn ${lang.name} — LinguaMosaic`,
    description:
      lang.description ||
      `Learn ${lang.name} with certified native-speaker instructors. ${lang.level || 'All levels'} available.`,
    isPartOf: { '@id': `${BASE_URL}/#website` },
    publisher: { '@id': `${BASE_URL}/#organization` },
    breadcrumb: generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Languages', url: '/languages' },
      { name: lang.name, url: `/languages/${lang.slug}` },
    ]),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `${lang.name} Language Course`,
    description:
      lang.description || `Comprehensive ${lang.name} language programme for all levels.`,
    provider: { '@id': `${BASE_URL}/#organization` },
    teaches: lang.name,
    inLanguage: lang.nativeName || lang.name,
    educationalLevel: lang.level || 'All levels',
    url: `${BASE_URL}/languages/${lang.slug}`,
  },
]

// ── Courses ──
export const generateCoursesSchema = (
  courses: {
    title: string
    description?: string
    price?: string
    language?: string
    level?: string
    duration?: string
    url?: string
  }[] = [],
): SchemaObject[] => [
  getOrganization(),
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${BASE_URL}/courses#webpage`,
    url: `${BASE_URL}/courses`,
    name: 'Language Courses — LinguaMosaic',
    description:
      'Browse all language courses. Group classes, private tutoring, intensive programmes, and business language training.',
    isPartOf: { '@id': `${BASE_URL}/#website` },
    publisher: { '@id': `${BASE_URL}/#organization` },
    breadcrumb: generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Courses', url: '/courses' },
    ]),
  },
  ...courses.map((course) => ({
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.description || `${course.title} — ${course.language} language course`,
    provider: { '@id': `${BASE_URL}/#organization` },
    teaches: course.language,
    educationalLevel: course.level,
    timeRequired: course.duration,
    url: course.url ? `${BASE_URL}${course.url}` : `${BASE_URL}/courses`,
    ...(course.price && {
      offers: {
        '@type': 'Offer',
        price: course.price.replace(/[^\d.]/g, ''),
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
      },
    }),
  })),
]

// ── Faculty ──
export const generateFacultySchema = (
  instructors: {
    name: string
    role?: string
    bio?: string
    languages?: string
    url?: string
    image?: string
  }[] = [],
): SchemaObject[] => [
  getOrganization(),
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${BASE_URL}/faculty#webpage`,
    url: `${BASE_URL}/faculty`,
    name: 'Our Faculty — LinguaMosaic Language Instructors',
    description:
      'Meet our certified native-speaker language instructors. 45+ educators with 12+ years average experience.',
    isPartOf: { '@id': `${BASE_URL}/#website` },
    publisher: { '@id': `${BASE_URL}/#organization` },
    breadcrumb: generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Faculty', url: '/faculty' },
    ]),
  },
  ...instructors.map((instructor) => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: instructor.name,
    jobTitle: instructor.role || 'Language Instructor',
    description: instructor.bio,
    worksFor: { '@id': `${BASE_URL}/#organization` },
    knowsLanguage: instructor.languages?.split('·').map((l: string) => l.trim()),
    ...(instructor.url && { url: `${BASE_URL}${instructor.url}` }),
    ...(instructor.image && { image: instructor.image }),
  })),
]

// ── Pricing ──
export const generatePricingSchema = (
  plans: {
    name: string
    description?: string
    monthlyPrice?: string
    url?: string
  }[] = [],
): SchemaObject[] => [
  getOrganization(),
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${BASE_URL}/pricing#webpage`,
    url: `${BASE_URL}/pricing`,
    name: 'Pricing — LinguaMosaic Language Courses',
    description:
      'Simple, transparent pricing for all language courses. Monthly and yearly plans. 7-day free trial.',
    isPartOf: { '@id': `${BASE_URL}/#website` },
    publisher: { '@id': `${BASE_URL}/#organization` },
    breadcrumb: generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Pricing', url: '/pricing' },
    ]),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'LinguaMosaic Pricing Plans',
    itemListElement: plans.map((plan, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: plan.name,
      description: plan.description,
      url: plan.url ? `${BASE_URL}${plan.url}` : `${BASE_URL}/pricing`,
    })),
  },
]

// ── Contact ──
export const generateContactSchema = (): SchemaObject[] => [
  getOrganization(),
  {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${BASE_URL}/contact#webpage`,
    url: `${BASE_URL}/contact`,
    name: 'Contact LinguaMosaic — Get In Touch',
    description:
      'Contact LinguaMosaic for course enquiries, free trial bookings, or general questions.',
    isPartOf: { '@id': `${BASE_URL}/#website` },
    publisher: { '@id': `${BASE_URL}/#organization` },
    breadcrumb: generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Contact', url: '/contact' },
    ]),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/#localbusiness`,
    name: 'LinguaMosaic Institute',
    url: BASE_URL,
    telephone: '+91-98765-43210',
    email: 'hello@linguamosaic.in',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'B-12, Sector 62',
      addressLocality: 'Noida',
      addressRegion: 'Uttar Pradesh',
      postalCode: '201301',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.6139,
      longitude: 77.209,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday'],
        opens: '10:00',
        closes: '17:00',
      },
    ],
    priceRange: '₹₹',
  },
]

// ── FAQ ──
export const generateFaqSchema = (faqs: { question: string; answer: string }[]): SchemaObject => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
})

// ── Blog post ──
export const generateBlogPostSchema = (post: {
  title: string
  slug: string
  description?: string
  publishedAt?: string
  updatedAt?: string
  author?: string
  image?: string
  categories?: string[]
}): SchemaObject[] => [
  getOrganization(),
  {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${BASE_URL}/blog/${post.slug}#webpage`,
    url: `${BASE_URL}/blog/${post.slug}`,
    headline: post.title,
    description: post.description,
    ...(post.image && { image: post.image }),
    ...(post.publishedAt && { datePublished: post.publishedAt }),
    ...(post.updatedAt && { dateModified: post.updatedAt }),
    author: {
      '@type': 'Person',
      name: post.author || 'LinguaMosaic Team',
    },
    publisher: { '@id': `${BASE_URL}/#organization` },
    isPartOf: { '@id': `${BASE_URL}/#website` },
    ...(post.categories && {
      about: post.categories.map((cat) => ({ '@type': 'Thing', name: cat })),
    }),
    breadcrumb: generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blog' },
      { name: post.title, url: `/blog/${post.slug}` },
    ]),
  },
]

// ── Search ──
export const generateSearchSchema = (query?: string): SchemaObject[] => [
  getOrganization(),
  {
    '@context': 'https://schema.org',
    '@type': 'SearchResultsPage',
    '@id': `${BASE_URL}/search#webpage`,
    url: query ? `${BASE_URL}/search?q=${encodeURIComponent(query)}` : `${BASE_URL}/search`,
    name: query ? `Search results for "${query}" — LinguaMosaic` : 'Search — LinguaMosaic',
    isPartOf: { '@id': `${BASE_URL}/#website` },
    publisher: { '@id': `${BASE_URL}/#organization` },
  },
]
