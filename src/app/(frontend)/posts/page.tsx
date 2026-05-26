import type { Metadata } from 'next/types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Pagination } from '@/components/Pagination'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      heroImage: true,
      publishedAt: true,
      populatedAuthors: true,
    },
  })

  const featuredPost = posts.docs[0]
  const restPosts = posts.docs.slice(1)

  return (
    <div className="bg-theme-sand min-h-screen">
      <PageClient />

      {/* ── Header ── */}
      <div className="bg-white border-b border-theme-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-widest uppercase text-theme-text/40 mb-3">
              Journal
            </p>
            <h1 className="font-serif font-bold text-theme-black text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-4">
              Stories, tips & <span className="italic text-theme-brown">language insights.</span>
            </h1>
            <p className="text-theme-text/55 text-lg leading-relaxed">
              Explore our collection of language learning guides, cultural deep-dives, and
              instructor stories.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* ── Featured post — 16:9 widescreen ── */}
        {featuredPost && (
          <div className="mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-theme-text/35 mb-5">
              Featured
            </p>
            <Link href={`/posts/${featuredPost.slug}`} className="group block">
              <div className="bg-white rounded-3xl border border-theme-border overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* 16:9 image — matches 1920x1080 thumbnail */}
                <div className="relative w-full aspect-video overflow-hidden bg-theme-sage/10">
                  {(featuredPost as any).heroImage?.url ? (
                    <Image
                      src={(featuredPost as any).heroImage.url}
                      alt={(featuredPost as any).heroImage.alt || featuredPost.title || ''}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-8xl opacity-10">📝</span>
                    </div>
                  )}

                  {/* Dark gradient overlay for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Content overlaid on image */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
                    {/* Categories */}
                    {featuredPost.categories && featuredPost.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {featuredPost.categories.map((cat, i) =>
                          typeof cat === 'object' ? (
                            <span
                              key={i}
                              className="text-[11px] font-bold uppercase tracking-widest text-white bg-theme-sage/80 rounded-full px-3 py-1"
                            >
                              {(cat as any).title}
                            </span>
                          ) : null,
                        )}
                      </div>
                    )}

                    <h2 className="font-serif font-bold text-white text-2xl sm:text-3xl lg:text-4xl leading-snug mb-3 max-w-3xl">
                      {featuredPost.title}
                    </h2>

                    {featuredPost.meta?.description && (
                      <p className="text-white/70 text-sm sm:text-base leading-relaxed line-clamp-2 max-w-2xl mb-4">
                        {featuredPost.meta.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        {(featuredPost as any).populatedAuthors?.[0] && (
                          <>
                            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-xs font-bold text-white border border-white/30">
                              {((featuredPost as any).populatedAuthors[0].name || 'A')[0]}
                            </div>
                            <span className="text-white/80 text-sm">
                              {(featuredPost as any).populatedAuthors[0].name}
                            </span>
                          </>
                        )}
                        {(featuredPost as any).publishedAt && (
                          <span className="text-white/50 text-xs">
                            ·{' '}
                            {new Date((featuredPost as any).publishedAt).toLocaleDateString(
                              'en-IN',
                              {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              },
                            )}
                          </span>
                        )}
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-white text-sm font-semibold bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 group-hover:bg-theme-brown group-hover:border-theme-brown transition-all duration-200">
                        Read article →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* ── Grid posts — 16:9 thumbnails ── */}
        {restPosts.length > 0 && (
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-theme-text/35 mb-5">
              All Posts
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {restPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  className="group flex flex-col bg-white rounded-2xl border border-theme-border overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  {/* 16:9 aspect ratio thumbnail */}
                  <div className="relative w-full aspect-video overflow-hidden bg-theme-sage/10">
                    {(post as any).heroImage?.url ? (
                      <Image
                        src={(post as any).heroImage.url}
                        alt={(post as any).heroImage.alt || post.title || ''}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-5xl opacity-10">📝</span>
                      </div>
                    )}

                    {/* Category pill */}
                    {post.categories &&
                      post.categories.length > 0 &&
                      typeof post.categories[0] === 'object' && (
                        <div className="absolute top-3 left-3">
                          <span className="text-[11px] font-bold uppercase tracking-widest bg-white/90 backdrop-blur-sm text-theme-sage rounded-full px-2.5 py-1">
                            {(post.categories[0] as any).title}
                          </span>
                        </div>
                      )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-2.5 p-5 flex-1">
                    <h3 className="font-serif font-bold text-theme-black text-lg leading-snug group-hover:text-theme-sage transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {post.meta?.description && (
                      <p className="text-theme-text/55 text-sm leading-relaxed line-clamp-2 flex-1">
                        {post.meta.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-theme-border/40">
                      <div className="flex items-center gap-2">
                        {(post as any).populatedAuthors?.[0] && (
                          <>
                            <div className="w-6 h-6 rounded-full bg-theme-sage/15 flex items-center justify-center text-[10px] font-bold text-theme-sage flex-shrink-0">
                              {((post as any).populatedAuthors[0].name || 'A')[0]}
                            </div>
                            <span className="text-xs text-theme-text/45 truncate max-w-[100px]">
                              {(post as any).populatedAuthors[0].name}
                            </span>
                          </>
                        )}
                        {(post as any).publishedAt && (
                          <span className="text-xs text-theme-text/35">
                            ·{' '}
                            {new Date((post as any).publishedAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                            })}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-semibold text-theme-sage flex-shrink-0">
                        Read →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* No posts */}
        {posts.docs.length === 0 && (
          <div className="flex flex-col items-center py-24 gap-4 text-center">
            <span className="text-6xl">📭</span>
            <p className="font-serif font-bold text-theme-black text-2xl">No posts yet</p>
            <p className="text-theme-text/50 text-sm">
              Check back soon for language tips and cultural stories.
            </p>
          </div>
        )}

        {/* Pagination */}
        {posts.totalPages > 1 && posts.page && (
          <div className="mt-14 flex justify-center">
            <Pagination page={posts.page} totalPages={posts.totalPages} />
          </div>
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Blog — LinguaMosaic',
    description:
      'Language learning guides, cultural insights, and instructor stories from LinguaMosaic.',
  }
}
