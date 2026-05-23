import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { SearchClient } from './SearchClient'

type Props = {
  query: string
  page: number
}

export const SearchResults: React.FC<Props> = async ({ query, page }) => {
  const payload = await getPayload({ config })

  const results = query
    ? await payload.find({
        collection: 'search',
        depth: 1,
        limit: 12,
        page,
        where: {
          or: [{ title: { like: query } }, { 'meta.description': { like: query } }],
        },
      })
    : { docs: [], totalDocs: 0, totalPages: 0, page: 1 }

  return (
    <SearchClient
      query={query}
      results={results.docs}
      totalDocs={results.totalDocs}
      totalPages={results.totalPages ?? 1}
      currentPage={results.page ?? 1}
    />
  )
}
