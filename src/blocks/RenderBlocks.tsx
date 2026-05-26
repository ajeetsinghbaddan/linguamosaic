import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { HeroStatsBlock } from './HeroStats/Component'
import { AboutIntroBlock } from './AboutIntro/Component'
import { LanguagesOfferedBlock } from './LanguagesOffered/Component'
import { CoursesProgramsBlock } from './CoursesPrograms/Component'
import { ProcessStepsBlock } from './ProcessSteps/Component'
import { FacultyBlock } from './FacultyBlock/Component'
import { StudentStoriesBlock } from './StudentStories/Component'
import { PricingBlock } from './PricingBlock/Component'
import { CertificationsBlock } from './Certifications/Component'
import { SelfAssessmentBlock } from './SelfAssessment/Component'
import { ContactBlock } from './ContactBlock/Component.server'

import { AboutHero } from './AboutPage/AboutHero'
import { AboutMission } from './AboutPage/AboutMission'
import { AboutTimeline } from './AboutPage/AboutTimeline'
import { AboutTeam } from './AboutPage/AboutTeam'
import { AboutCta } from './AboutPage/AboutCta'

import { LanguagesHero } from './LanguagesPage/LanguagesHero'
import { LanguagesGridBlock } from './LanguagesPage/Component'
import { LanguageWhy } from './LanguagesPage/LanguageWhy'
import { LanguageCta } from './LanguagesPage/LanguageCta'

import { CoursesHero } from './CoursesPage/CoursesHero'
import { CoursesList } from './CoursesPage/CoursesList'
import { CoursesCompare } from './CoursesPage/CoursesCompare'
import { CoursesCta } from './CoursesPage/CoursesCta'

import { FacultyHero } from './FacultyPage/FacultyHero'
import { FacultyGrid } from './FacultyPage/FacultyGrid'
import { FacultyPhilosophy } from './FacultyPage/FacultyPhilosophy'
import { FacultyJoin } from './FacultyPage/FacultyJoin'

import { PricingHero } from './PricingPage/PricingHero'
import { PricingPlans } from './PricingPage/PricingPlans'
import { PricingAddOns } from './PricingPage/PricingAddOns'
import { PricingFaq } from './PricingPage/PricingFaq'
import { PricingGuarantee } from './PricingPage/PricingGuarantee'
import { PricingCta } from './PricingPage/PricingCta'

import { ContactHero } from './ContactPage/ContactHero'
import { ContactFormSection } from './ContactPage/ContactFormSection.server'
import { ContactOffices } from './ContactPage/ContactOffices'
import { ContactFaq } from './ContactPage/ContactFaq'

import { PageTitleBlock } from './PageTitle/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  heroStats: HeroStatsBlock,
  aboutIntro: AboutIntroBlock,
  languagesOffered: LanguagesOfferedBlock,
  coursesPrograms: CoursesProgramsBlock,
  processSteps: ProcessStepsBlock,
  faculty: FacultyBlock,
  studentStories: StudentStoriesBlock,
  pricing: PricingBlock,
  certifications: CertificationsBlock,
  selfAssessment: SelfAssessmentBlock,
  contact: ContactBlock,
  aboutHero: AboutHero,
  aboutMission: AboutMission,
  aboutTimeline: AboutTimeline,
  aboutTeam: AboutTeam,
  aboutCta: AboutCta,
  languagesHero: LanguagesHero,
  languagesGrid: LanguagesGridBlock,
  languageWhy: LanguageWhy,
  languageCta: LanguageCta,
  coursesHero: CoursesHero,
  coursesList: CoursesList,
  coursesCompare: CoursesCompare,
  coursesCta: CoursesCta,
  facultyHero: FacultyHero,
  facultyGrid: FacultyGrid,
  facultyPhilosophy: FacultyPhilosophy,
  facultyJoin: FacultyJoin,
  pricingHero: PricingHero,
  pricingPlans: PricingPlans,
  pricingAddOns: PricingAddOns,
  pricingFaq: PricingFaq,
  pricingGuarantee: PricingGuarantee,
  pricingCta: PricingCta,
  contactHero: ContactHero,
  contactFormSection: ContactFormSection,
  contactOffices: ContactOffices,
  contactFaq: ContactFaq,
  pageTitle: PageTitleBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
