import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

export const getSiteSettings = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    return payload.findGlobal({ slug: 'site-settings' })
  },
  ['site-settings'],
  {
    tags: ['site-settings'],
    revalidate: 3600,
  },
)
