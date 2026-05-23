import React from 'react'
import Script from 'next/script'
import { getSiteSettings } from './fetch'

type ScriptEntry = {
  label?: string | null
  script?: string | null
  enabled?: boolean | null
  position?: string | null
}

type Props = {
  location: 'head-start' | 'head-end' | 'body-start' | 'body-end'
}

const extractScriptContent = (
  html: string,
): { type: 'script'; content: string } | { type: 'html'; content: string } => {
  const scriptMatch = html.match(/^<script[^>]*>([\s\S]*?)<\/script>$/i)
  if (scriptMatch) {
    return { type: 'script', content: scriptMatch[1].trim() }
  }
  return { type: 'html', content: html }
}

export const ScriptInjector: React.FC<Props> = async ({ location }) => {
  const settings = await getSiteSettings()
  const scripts = settings?.scripts

  if (!scripts) return null

  let entries: ScriptEntry[] = []

  if (location === 'head-start') {
    entries = (scripts.headScripts ?? []).filter(
      (s: ScriptEntry) => s.enabled && s.position === 'start',
    )
  } else if (location === 'head-end') {
    entries = (scripts.headScripts ?? []).filter(
      (s: ScriptEntry) => s.enabled && s.position !== 'start',
    )
  } else if (location === 'body-start') {
    entries = (scripts.bodyStartScripts ?? []).filter(
      (s: ScriptEntry) => s.enabled,
    )
  } else if (location === 'body-end') {
    entries = (scripts.footerScripts ?? []).filter(
      (s: ScriptEntry) => s.enabled,
    )
  }

  if (!entries.length) return null

  // ── Head scripts: beforeInteractive — Next.js hoists to <head> ──
  if (location === 'head-start' || location === 'head-end') {
    return (
      <>
        {entries.map((entry: ScriptEntry, i: number) => {
          const raw = (entry.script ?? '').trim()
          const parsed = extractScriptContent(raw)
          return (
            <Script
              key={`${location}-${i}`}
              id={`inject-${location}-${i}`}
              strategy="beforeInteractive"
              dangerouslySetInnerHTML={{
                __html: parsed.type === 'script' ? parsed.content : raw,
              }}
            />
          )
        })}
      </>
    )
  }

  // ── Body start: raw <script> tags — renders exactly where placed in DOM ──
  if (location === 'body-start') {
    return (
      <>
        {entries.map((entry: ScriptEntry, i: number) => {
          const raw = (entry.script ?? '').trim()
          const parsed = extractScriptContent(raw)
          return (
            <script
              key={`body-start-${i}`}
              id={`inject-body-start-${i}`}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: parsed.type === 'script' ? parsed.content : raw,
              }}
            />
          )
        })}
      </>
    )
  }

  // ── Footer / body-end: lazyOnload — lowest priority ──
  return (
    <>
      {entries.map((entry: ScriptEntry, i: number) => {
        const raw = (entry.script ?? '').trim()
        const parsed = extractScriptContent(raw)
        return (
          <Script
            key={`body-end-${i}`}
            id={`inject-body-end-${i}`}
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: parsed.type === 'script' ? parsed.content : raw,
            }}
          />
        )
      })}
    </>
  )
}