import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { hero } from '@/heros/config'
import { slugField } from 'payload'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { HeroStatsBlock } from '@/blocks/HeroStats/config'
import { AboutIntroBlock } from '@/blocks/AboutIntro/config'
import { LanguagesOfferedBlock } from '@/blocks/LanguagesOffered/config'
import { CoursesProgramsBlock } from '@/blocks/CoursesPrograms/config'
import { ProcessStepsBlock } from '@/blocks/ProcessSteps/config'
import { FacultyBlock } from '@/blocks/FacultyBlock/config'
import { StudentStoriesBlock } from '@/blocks/StudentStories/config'
import { PricingBlock } from '@/blocks/PricingBlock/config'
import { CertificationsBlock } from '@/blocks/Certifications/config'
import { SelfAssessmentBlock } from '@/blocks/SelfAssessment/config'
import { ContactBlock } from '@/blocks/ContactBlock/config'
import {
  AboutCtaBlock,
  AboutHeroBlock,
  AboutMissionBlock,
  AboutTeamBlock,
  AboutTimelineBlock,
} from '@/blocks/AboutPage/config'

import {
  LanguagesHeroBlock,
  LanguagesGridBlock,
  LanguageWhyBlock,
  LanguageCtaBlock,
} from '@/blocks/LanguagesPage/config'
import {
  CoursesCompareBlock,
  CoursesCtaBlock,
  CoursesHeroBlock,
  CoursesListBlock,
} from '@/blocks/CoursesPage/config'

import {
  FacultyGridBlock,
  FacultyHeroBlock,
  FacultyJoinBlock,
  FacultyPhilosophyBlock,
} from '@/blocks/FacultyPage/config'
import {
  PricingAddOnsBlock,
  PricingCtaBlock,
  PricingFaqBlock,
  PricingGuaranteeBlock,
  PricingHeroBlock,
  PricingPlansBlock,
} from '@/blocks/PricingPage/config'
import {
  ContactFaqBlock,
  ContactFormSectionBlock,
  ContactHeroBlock,
  ContactOfficesBlock,
} from '@/blocks/ContactPage/config'
import { PageTitleBlock } from '@/blocks/PageTitle/config'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                CallToAction,
                Content,
                MediaBlock,
                Archive,
                FormBlock,
                HeroStatsBlock,
                AboutIntroBlock,
                LanguagesOfferedBlock,
                CoursesProgramsBlock,
                ProcessStepsBlock,
                FacultyBlock,
                StudentStoriesBlock,
                PricingBlock,
                CertificationsBlock,
                SelfAssessmentBlock,
                ContactBlock,
                AboutHeroBlock,
                AboutMissionBlock,
                AboutTimelineBlock,
                AboutTeamBlock,
                AboutCtaBlock,
                LanguagesHeroBlock,
                LanguagesGridBlock,
                LanguageWhyBlock,
                LanguageCtaBlock,
                CoursesHeroBlock,
                CoursesListBlock,
                CoursesCompareBlock,
                CoursesCtaBlock,
                FacultyHeroBlock,
                FacultyGridBlock,
                FacultyPhilosophyBlock,
                FacultyJoinBlock,
                PricingHeroBlock,
                PricingPlansBlock,
                PricingAddOnsBlock,
                PricingFaqBlock,
                PricingGuaranteeBlock,
                PricingCtaBlock,
                ContactHeroBlock,
                ContactFormSectionBlock,
                ContactOfficesBlock,
                ContactFaqBlock,
                PageTitleBlock,
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
