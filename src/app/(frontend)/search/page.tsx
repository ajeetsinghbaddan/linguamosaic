import type { Metadata } from 'next'
import React from 'react'
import { SearchResults } from './SearchResults'

export const metadata: Metadata = {
  title: 'Search — LinguaMosaic',
  description: 'Search our courses, languages, posts and pages.',
}

type PageProps = {
  searchParams: Promise<{ q?: string; page?: string }>
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q = '', page = '1' } = await searchParams
  return <SearchResults query={q} page={parseInt(page)} />
}
