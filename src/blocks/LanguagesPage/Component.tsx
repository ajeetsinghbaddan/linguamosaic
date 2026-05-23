import React from 'react'
import { LanguagesHero } from './LanguagesHero'
import { LanguagesGrid } from './LanguagesGrid'
import { LanguageWhy } from './LanguageWhy'
import { LanguageCta } from './LanguageCta'

// Server-side wrapper for LanguagesGrid (needs 'use client' internally)
type GridProps = {
  eyebrow?: string | null
  heading?: string | null
  languages?: any[] | null
}

export const LanguagesGridBlock: React.FC<GridProps> = ({ eyebrow, heading, languages }) => (
  <LanguagesGrid eyebrow={eyebrow} heading={heading} languages={languages || []} />
)

export { LanguagesHero, LanguageWhy, LanguageCta }
