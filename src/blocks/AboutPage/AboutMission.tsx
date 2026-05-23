import React from 'react'

type Value = { icon?: string | null; title?: string | null; description?: string | null }
type AboutMissionProps = {
  missionEyebrow?: string | null
  missionHeading?: string | null
  missionText?: string | null
  visionEyebrow?: string | null
  visionHeading?: string | null
  visionText?: string | null
  values?: Value[] | null
}

export const AboutMission: React.FC<AboutMissionProps> = ({
  missionEyebrow,
  missionHeading,
  missionText,
  visionEyebrow,
  visionHeading,
  visionText,
  values,
}) => (
  <section className="bg-white w-full">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Mission + Vision */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
        {/* Mission */}
        <div className="bg-theme-black rounded-3xl p-8 sm:p-10 flex flex-col gap-4">
          {missionEyebrow && (
            <p className="text-xs font-semibold tracking-widest uppercase text-theme-yellow">
              {missionEyebrow}
            </p>
          )}
          {missionHeading && (
            <h2 className="font-serif font-bold text-white text-2xl sm:text-3xl leading-snug">
              {missionHeading}
            </h2>
          )}
          {missionText && <p className="text-white/60 text-sm leading-relaxed">{missionText}</p>}
          <div className="mt-auto pt-6 border-t border-white/10">
            <span className="text-4xl">🎯</span>
          </div>
        </div>

        {/* Vision */}
        <div className="bg-theme-sage/10 rounded-3xl p-8 sm:p-10 flex flex-col gap-4 border border-theme-sage/20">
          {visionEyebrow && (
            <p className="text-xs font-semibold tracking-widest uppercase text-theme-sage">
              {visionEyebrow}
            </p>
          )}
          {visionHeading && (
            <h2 className="font-serif font-bold text-theme-black text-2xl sm:text-3xl leading-snug">
              {visionHeading}
            </h2>
          )}
          {visionText && <p className="text-theme-text/60 text-sm leading-relaxed">{visionText}</p>}
          <div className="mt-auto pt-6 border-t border-theme-sage/20">
            <span className="text-4xl">🌍</span>
          </div>
        </div>
      </div>

      {/* Core Values */}
      {values && values.length > 0 && (
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-theme-sage mb-3">
            Core Values
          </p>
          <h2 className="font-serif font-bold text-theme-black text-3xl sm:text-4xl mb-10">
            What we stand for
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 p-6 rounded-2xl border border-theme-border hover:border-theme-sage/40 hover:shadow-md transition-all duration-200 group"
              >
                <span className="text-3xl">{v.icon}</span>
                <p className="font-sans font-semibold text-theme-black text-base group-hover:text-theme-sage transition-colors">
                  {v.title}
                </p>
                <p className="text-theme-text/55 text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </section>
)
