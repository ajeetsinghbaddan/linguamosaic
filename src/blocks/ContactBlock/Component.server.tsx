import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { ContactBlock as ContactBlockClient } from './Component'

type Props = {
  eyebrow?: string | null
  heading?: string | null
  form?: { id: string | number } | string | number | null
  locationName?: string | null
  locationAddress?: string | null
  mapUrl?: string | null
  phone?: string | null
  email?: string | null
  hours?: string | null
  socials?: { platform?: string | null; url?: string | null }[] | null
}

export const ContactBlock: React.FC<Props> = async (props) => {
  const formId = typeof props.form === 'object' && props.form !== null ? props.form.id : props.form

  let populatedForm = null

  if (formId) {
    const payload = await getPayload({ config })
    const formData = await payload.findByID({
      collection: 'forms',
      id: String(formId),
    })
    populatedForm = formData ?? null
  }

  return <ContactBlockClient {...props} form={populatedForm as any} />
}
