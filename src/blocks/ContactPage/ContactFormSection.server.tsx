import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { ContactFormSectionClient } from './ContactFormSection.client'

type Social = { platform?: string | null; url?: string | null }
type ContactDetail = {
  type?: string | null
  label?: string | null
  value?: string | null
  url?: string | null
}

type Props = {
  eyebrow?: string | null
  heading?: string | null
  subtext?: string | null
  form?: { id: string | number } | string | number | null
  locationName?: string | null
  locationAddress?: string | null
  mapUrl?: string | null
  contactDetails?: ContactDetail[] | null
  socials?: Social[] | null
}

export const ContactFormSection: React.FC<Props> = async (props) => {
  const formId =
    typeof props.form === 'object' && props.form !== null
      ? (props.form as { id: string | number }).id
      : props.form

  let populatedForm = null
  if (formId) {
    const payload = await getPayload({ config })
    populatedForm = await payload.findByID({
      collection: 'forms',
      id: String(formId),
    })
  }

  return <ContactFormSectionClient {...props} form={populatedForm as any} />
}
