'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, X, Star } from 'lucide-react'

type Tag = { tag?: string | null }
type Cert = { cert?: string | null }
type Testimonial = {
  quote?: string | null
  studentName?: string | null
  studentMeta?: string | null
  rating?: number | null
}
type Instructor = {
  photo?: { url?: string | null; alt?: string | null } | null
  name?: string | null
  role?: string | null
  languages?: string | null
  experience?: string | null
  nationality?: string | null
  bio?: string | null
  profileUrl?: string | null
  specialisms?: Tag[] | null
  certifications?: Cert[] | null
  testimonial?: Testimonial | null
  featured?: boolean | null
}

const StarRating: React.FC<{ rating: number; size?: number }> = ({ rating, size = 14 }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={size}
        className={
          i < rating ? 'text-theme-yellow fill-theme-yellow' : 'text-theme-border fill-theme-border'
        }
      />
    ))}
  </div>
)

const PlaceholderAvatar: React.FC<{ large?: boolean }> = ({ large }) => (
  <div
    className={`bg-theme-sage/15 flex items-center justify-center ${large ? 'w-full h-64' : 'w-full aspect-square'}`}
  >
    <svg
      viewBox="0 0 120 120"
      className={`opacity-25 ${large ? 'w-28 h-28' : 'w-16 h-16'}`}
      fill="none"
    >
      <circle cx="60" cy="42" r="24" fill="#5C7A5C" />
      <ellipse cx="60" cy="100" rx="36" ry="24" fill="#5C7A5C" />
    </svg>
  </div>
)

// ── Modal ──
const InstructorModal: React.FC<{ instructor: Instructor; onClose: () => void }> = ({
  instructor,
  onClose,
}) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    onClick={onClose}
  >
    <div
      className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close */}
      <div className="flex justify-end p-4 pb-0">
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-theme-sand flex items-center justify-center text-theme-text/50 hover:text-theme-black transition-colors cursor-pointer"
        >
          <X size={16} />
        </button>
      </div>

      <div className="px-6 sm:px-8 pb-8 flex flex-col gap-6">
        {/* Top — photo + basic info */}
        <div className="flex flex-col sm:flex-row gap-5 items-start">
          <div className="w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0">
            {instructor.photo?.url ? (
              <Image
                src={instructor.photo.url}
                alt={instructor.photo.alt || instructor.name || ''}
                width={112}
                height={112}
                className="w-full h-full object-cover"
              />
            ) : (
              <PlaceholderAvatar />
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{instructor.nationality}</span>
              <h2 className="font-serif font-bold text-theme-black text-2xl">{instructor.name}</h2>
            </div>
            <p className="text-theme-brown text-sm font-semibold">{instructor.role}</p>
            {instructor.languages && (
              <p className="text-theme-sage text-xs font-medium">{instructor.languages}</p>
            )}
            {instructor.experience && (
              <p className="text-theme-text/50 text-xs">{instructor.experience} experience</p>
            )}
          </div>
        </div>

        {/* Bio */}
        {instructor.bio && (
          <p className="text-theme-text/65 text-sm leading-relaxed">{instructor.bio}</p>
        )}

        {/* Specialisms + Certs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {instructor.specialisms && instructor.specialisms.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-theme-text/35">
                Specialisms
              </p>
              <div className="flex flex-wrap gap-1.5">
                {instructor.specialisms.map((s, i) => (
                  <span
                    key={i}
                    className="text-xs bg-theme-sage/10 text-theme-sage border border-theme-sage/20 rounded-full px-2.5 py-1"
                  >
                    {s.tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          {instructor.certifications && instructor.certifications.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-theme-text/35">
                Certifications
              </p>
              <div className="flex flex-wrap gap-1.5">
                {instructor.certifications.map((c, i) => (
                  <span
                    key={i}
                    className="text-xs bg-theme-yellow/20 text-theme-black border border-theme-yellow/30 rounded-full px-2.5 py-1"
                  >
                    🏅 {c.cert}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Testimonial */}
        {instructor.testimonial?.quote && (
          <div className="bg-theme-sand rounded-2xl p-5 flex flex-col gap-3">
            <svg
              width="24"
              height="18"
              viewBox="0 0 32 24"
              fill="none"
              className="text-theme-sage/40"
            >
              <path
                d="M0 24V14.4C0 10.08 1.04 6.64 3.12 4.08C5.28 1.44 8.56 0 13 0L14.4 2.88C11.52 3.44 9.36 4.64 7.92 6.48C6.56 8.32 5.92 10.56 6 13.2H12V24H0ZM18 24V14.4C18 10.08 19.04 6.64 21.12 4.08C23.28 1.44 26.56 0 31 0L32 2.88C29.12 3.44 26.96 4.64 25.52 6.48C24.16 8.32 23.52 10.56 23.6 13.2H30V24H18Z"
                fill="currentColor"
              />
            </svg>
            <p className="text-theme-text/70 text-sm italic leading-relaxed">
              "{instructor.testimonial.quote}"
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-theme-black text-xs font-semibold">
                  {instructor.testimonial.studentName}
                </p>
                <p className="text-theme-text/45 text-xs">{instructor.testimonial.studentMeta}</p>
              </div>
              <StarRating rating={instructor.testimonial.rating ?? 5} />
            </div>
          </div>
        )}

        {/* CTA */}
        {instructor.profileUrl && (
          <Link
            href={instructor.profileUrl}
            className="w-full text-center py-3.5 rounded-full bg-theme-black text-white text-sm font-semibold hover:bg-theme-brown transition-colors"
          >
            View Full Profile →
          </Link>
        )}
      </div>
    </div>
  </div>
)

// ── Card ──
const InstructorCard: React.FC<{
  instructor: Instructor
  onOpen: () => void
}> = ({ instructor, onOpen }) => (
  <div
    onClick={onOpen}
    className={`group flex flex-col bg-white rounded-2xl border overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${
      instructor.featured ? 'border-theme-sage/40 shadow-md' : 'border-theme-border'
    }`}
  >
    {/* Photo */}
    <div className="relative overflow-hidden">
      {instructor.photo?.url ? (
        <Image
          src={instructor.photo.url}
          alt={instructor.photo.alt || instructor.name || ''}
          width={400}
          height={280}
          className="w-full h-52 object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className="h-52">
          <PlaceholderAvatar large />
        </div>
      )}

      {/* Nationality badge */}
      {instructor.nationality && (
        <div className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-lg">
          {instructor.nationality}
        </div>
      )}

      {/* Featured badge */}
      {instructor.featured && (
        <div className="absolute top-3 right-3 bg-theme-brown text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full">
          Featured
        </div>
      )}
    </div>

    {/* Info */}
    <div className="flex flex-col gap-2.5 p-5 flex-1">
      <div>
        <p className="font-sans font-bold text-theme-black text-base leading-tight group-hover:text-theme-sage transition-colors">
          {instructor.name}
        </p>
        <p className="text-theme-brown text-xs font-semibold mt-0.5">{instructor.role}</p>
      </div>

      {instructor.languages && (
        <p className="text-theme-sage text-xs font-medium">{instructor.languages}</p>
      )}

      {instructor.experience && (
        <p className="text-theme-text/45 text-xs">{instructor.experience} experience</p>
      )}

      {/* Specialisms */}
      {instructor.specialisms && instructor.specialisms.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {instructor.specialisms.slice(0, 2).map((s, i) => (
            <span
              key={i}
              className="text-[11px] bg-theme-sage/8 text-theme-sage/80 border border-theme-sage/15 rounded-full px-2 py-0.5"
            >
              {s.tag}
            </span>
          ))}
          {(instructor.specialisms.length ?? 0) > 2 && (
            <span className="text-[11px] text-theme-text/35 px-1">
              +{(instructor.specialisms.length ?? 0) - 2}
            </span>
          )}
        </div>
      )}

      {/* Bottom */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-theme-border/50">
        <StarRating rating={instructor.testimonial?.rating ?? 5} size={12} />
        <span className="text-xs text-theme-text/40 group-hover:text-theme-sage transition-colors">
          View profile →
        </span>
      </div>
    </div>
  </div>
)

// ── Main ──
export const FacultyGrid: React.FC<{
  eyebrow?: string | null
  heading?: string | null
  instructors: Instructor[]
}> = ({ eyebrow, heading, instructors }) => {
  const [search, setSearch] = useState('')
  const [activeLanguage, setActiveLanguage] = useState('All')
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null)

  const languages = useMemo(() => {
    const langs = new Set<string>()
    instructors.forEach((inst) => {
      inst.languages?.split('·').forEach((l) => {
        const trimmed = l.trim()
        if (trimmed) langs.add(trimmed)
      })
    })
    return ['All', ...Array.from(langs)]
  }, [instructors])

  const filtered = useMemo(() => {
    return instructors.filter((inst) => {
      const matchSearch =
        !search ||
        inst.name?.toLowerCase().includes(search.toLowerCase()) ||
        inst.languages?.toLowerCase().includes(search.toLowerCase()) ||
        inst.specialisms?.some((s) => s.tag?.toLowerCase().includes(search.toLowerCase()))
      const matchLang = activeLanguage === 'All' || inst.languages?.includes(activeLanguage)
      return matchSearch && matchLang
    })
  }, [instructors, search, activeLanguage])

  const featured = filtered.filter((i) => i.featured)
  const rest = filtered.filter((i) => !i.featured)

  return (
    <section className="bg-white w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Header */}
        <div className="mb-10">
          {eyebrow && (
            <p className="text-xs font-semibold tracking-widest uppercase text-theme-sage mb-2">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 className="font-serif font-bold text-theme-black text-3xl sm:text-4xl mb-8">
              {heading}
            </h2>
          )}

          {/* Controls */}
          <div className="flex flex-col gap-4">
            <div className="relative w-full sm:w-72">
              <Search
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-text/30"
              />
              <input
                type="text"
                placeholder="Search instructors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-theme-sand border border-theme-border rounded-full focus:outline-none focus:border-theme-sage/50 transition-colors placeholder:text-theme-text/30"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {languages.map((l) => (
                <button
                  key={l}
                  onClick={() => setActiveLanguage(l)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    activeLanguage === l
                      ? 'bg-theme-black text-white'
                      : 'bg-theme-sand border border-theme-border text-theme-text/60 hover:border-theme-sage/40'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-20 gap-3 text-center">
            <span className="text-4xl">🔍</span>
            <p className="text-theme-text/50 text-sm">No instructors match your search.</p>
            <button
              onClick={() => {
                setSearch('')
                setActiveLanguage('All')
              }}
              className="text-theme-sage text-sm font-medium hover:underline cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            {featured.length > 0 && (
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-theme-text/35 mb-4">
                  Featured Instructors
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {featured.map((inst, i) => (
                    <InstructorCard
                      key={i}
                      instructor={inst}
                      onOpen={() => setSelectedInstructor(inst)}
                    />
                  ))}
                </div>
              </div>
            )}
            {rest.length > 0 && (
              <div>
                {featured.length > 0 && (
                  <p className="text-xs font-semibold tracking-widest uppercase text-theme-text/35 mb-4">
                    All Instructors
                  </p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {rest.map((inst, i) => (
                    <InstructorCard
                      key={i}
                      instructor={inst}
                      onOpen={() => setSelectedInstructor(inst)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedInstructor && (
        <InstructorModal
          instructor={selectedInstructor}
          onClose={() => setSelectedInstructor(null)}
        />
      )}
    </section>
  )
}
