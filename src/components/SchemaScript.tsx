import React from 'react'

type Props = {
  schema: object | object[]
}

export const SchemaScript: React.FC<Props> = ({ schema }) => {
  const schemas = Array.isArray(schema) ? schema : [schema]

  return (
    <>
      {schemas.filter(Boolean).map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  )
}
