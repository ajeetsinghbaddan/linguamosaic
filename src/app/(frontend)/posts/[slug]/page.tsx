import type { Metadata } from 'next'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'
import Image from 'next/image'
import Link from 'next/link'
import type { Post, Media } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })
  return posts.docs.map(({ slug }) => ({ slug }))
}

type Args = {
  params: Promise<{ slug?: string }>
}

export default async function PostPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/posts/' + decodedSlug
  const post = await queryPostBySlug({ slug: decodedSlug })

  if (!post) return <PayloadRedirects url={url} />

  // ── Manually fetch related posts so heroImage is always populated ──
  let populatedRelatedPosts: Post[] = []
  if (post.relatedPosts && post.relatedPosts.length > 0) {
    const payload = await getPayload({ config: configPromise })
    const relatedIds = post.relatedPosts
      .map((p) => (typeof p === 'object' ? p.id : p))
      .filter(Boolean)

    const relatedResults = await payload.find({
      collection: 'posts',
      depth: 2,
      limit: 10,
      overrideAccess: draft,
      where: {
        id: { in: relatedIds },
      },
    })
    populatedRelatedPosts = relatedResults.docs as Post[]
  }

  const heroImage = (post as any).heroImage
  const heroImageUrl = heroImage?.url ?? null
  const heroImageAlt = heroImage?.alt || post.title || ''
  const authors = (post as any).populatedAuthors || []
  const categories = post.categories || []

  return (
    <article className="bg-white min-h-screen">
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}

      {/* ── Hero ── */}
      <div className="relative w-full aspect-video max-h-[70vh] overflow-hidden bg-theme-black">
        {heroImageUrl ? (
          <Image
            src={heroImageUrl}
            alt={heroImageAlt}
            fill
            sizes="100vw"
            className="object-cover opacity-85"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-theme-black flex items-center justify-center">
            <span className="text-9xl opacity-10">📝</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        {/* Breadcrumb */}
        <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
          <div className="flex items-center gap-2 text-xs text-white/60">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/posts" className="hover:text-white transition-colors">
              Blog
            </Link>
          </div>
        </div>

        {/* Overlay content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-14">
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((cat, i) =>
                typeof cat === 'object' ? (
                  <span
                    key={i}
                    className="text-[11px] font-bold uppercase tracking-widest text-white bg-theme-sage/70 rounded-full px-3 py-1"
                  >
                    {(cat as any).title}
                  </span>
                ) : null,
              )}
            </div>
          )}
          <h1 className="font-serif font-bold text-white text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] max-w-4xl mb-4">
            {post.title}
          </h1>
          {post.meta?.description && (
            <p className="text-white/65 text-base sm:text-lg leading-relaxed max-w-2xl mb-6">
              {post.meta.description}
            </p>
          )}
          {authors.length > 0 && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold text-white text-sm border border-white/25 flex-shrink-0">
                {(authors[0].name || 'A')[0]}
              </div>
              <div>
                <p className="text-white text-sm font-semibold">{authors[0].name}</p>
                {(post as any).publishedAt && (
                  <p className="text-white/50 text-xs">
                    {new Date((post as any).publishedAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg prose-headings:font-serif prose-headings:text-theme-black prose-p:text-theme-text/70 prose-p:leading-relaxed prose-a:text-theme-sage prose-a:no-underline hover:prose-a:underline prose-strong:text-theme-black prose-img:rounded-2xl max-w-none">
            <RichText data={post.content} enableGutter={false} />
          </div>

          {/* Tags */}
          {categories.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {categories.map((cat, i) =>
                typeof cat === 'object' ? (
                  <span
                    key={i}
                    className="text-xs bg-theme-sand border border-theme-border text-theme-text/60 rounded-full px-3 py-1.5"
                  >
                    # {(cat as any).title}
                  </span>
                ) : null,
              )}
            </div>
          )}

          {/* Author card */}
          {authors.length > 0 && (
            <div className="mt-12 pt-10 border-t border-theme-border">
              <p className="text-xs font-semibold tracking-widest uppercase text-theme-text/35 mb-4">
                Written by
              </p>
              <div className="flex items-center gap-4 bg-theme-sand rounded-2xl p-5 border border-theme-border">
                <div className="w-14 h-14 rounded-full bg-theme-sage/20 flex items-center justify-center font-bold text-theme-sage text-xl flex-shrink-0">
                  {(authors[0].name || 'A')[0]}
                </div>
                <div>
                  <p className="font-sans font-bold text-theme-black">{authors[0].name}</p>
                  {authors[0].email && (
                    <p className="text-theme-text/50 text-sm">{authors[0].email}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Related posts — using manually populated data ── */}
      {populatedRelatedPosts.length > 0 && (
        <div className="bg-theme-sand border-t border-theme-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-theme-text/35 mb-6">
              Continue reading
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {populatedRelatedPosts.map((relatedPost) => {
                const rHeroImg = (relatedPost as any).heroImage
                const rMetaImg = (relatedPost as any).meta?.image
                const rImg =
                  rHeroImg && typeof rHeroImg === 'object' && rHeroImg.url
                    ? rHeroImg
                    : rMetaImg && typeof rMetaImg === 'object' && rMetaImg.url
                      ? rMetaImg
                      : null
                const rUrl = rImg?.url ?? null
                const rAlt = rImg?.alt || relatedPost.title || ''
                const rAuthors = (relatedPost as any).populatedAuthors || []
                const rCategories = relatedPost.categories || []

                return (
                  <Link
                    key={relatedPost.id}
                    href={`/posts/${relatedPost.slug}`}
                    className="group flex flex-col bg-white rounded-2xl border border-theme-border overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* 16:9 thumbnail */}
                    <div className="relative w-full aspect-video overflow-hidden bg-theme-sage/10">
                      {rUrl ? (
                        <Image
                          src={rUrl}
                          alt={rAlt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-theme-sage/5">
                          <span className="text-5xl opacity-10">📝</span>
                        </div>
                      )}

                      {/* Category pill */}
                      {rCategories.length > 0 && typeof rCategories[0] === 'object' && (
                        <div className="absolute top-3 left-3">
                          <span className="text-[11px] font-bold uppercase tracking-widest bg-white/90 backdrop-blur-sm text-theme-sage rounded-full px-2.5 py-1">
                            {(rCategories[0] as any).title}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-2.5 p-5 flex-1">
                      <h3 className="font-serif font-bold text-theme-black text-base leading-snug group-hover:text-theme-sage transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      {(relatedPost as any).meta?.description && (
                        <p className="text-theme-text/55 text-sm leading-relaxed line-clamp-2 flex-1">
                          {(relatedPost as any).meta.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-theme-border/40">
                        <div className="flex items-center gap-2">
                          {rAuthors[0] && (
                            <>
                              <div className="w-6 h-6 rounded-full bg-theme-sage/15 flex items-center justify-center text-[10px] font-bold text-theme-sage flex-shrink-0">
                                {(rAuthors[0].name || 'A')[0]}
                              </div>
                              <span className="text-xs text-theme-text/45 truncate max-w-[100px]">
                                {rAuthors[0].name}
                              </span>
                            </>
                          )}
                        </div>
                        <span className="text-xs font-semibold text-theme-sage flex-shrink-0">
                          Read →
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Bottom bar ── */}
      <div className="bg-white border-t border-theme-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 text-sm font-semibold text-theme-text/50 hover:text-theme-sage transition-colors"
          >
            ← Back to Blog
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center px-5 py-2.5 rounded-full bg-theme-black text-white text-sm font-semibold hover:bg-theme-brown transition-colors"
          >
            Book a Free Trial →
          </Link>
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const post = await queryPostBySlug({ slug: decodedSlug })
  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    depth: 5, // bump to 3 so relatedPosts.heroImage.url is fully resolved
    where: { slug: { equals: slug } },
  })
  return result.docs?.[0] || null
})
