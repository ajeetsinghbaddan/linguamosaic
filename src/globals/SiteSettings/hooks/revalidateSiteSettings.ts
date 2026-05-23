import type { GlobalAfterChangeHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateSiteSettings: GlobalAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info('Revalidating site settings')

  try {
    revalidatePath('/', 'layout')
  } catch {
    // revalidatePath may not be available in all contexts
  }

  return doc
}
