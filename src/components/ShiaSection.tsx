import { useMemo, useState } from 'react';
import manuscriptImg from '../assets/images/shia_manuscript_illuminated_1794535526946.jpg';
import { getLocalizedShiaPillars } from '../data/localizedContent';
import { SafeImage } from './SafeImage';
import { useLanguage } from '../i18n/LanguageContext';
import { UI_STRINGS } from '../i18n/uiStrings';

export function ShiaSection() {
  const { locale } = useLanguage();
  const t = UI_STRINGS[locale];
  const pillars = useMemo(() => getLocalizedShiaPillars(locale), [locale]);
  const [selectedId, setSelectedId] = useState(pillars[0].id);
  const currentPillar = pillars.find((p) => p.id === selectedId) || pillars[0];

  return (
    <section
      id="shia-school"
      className="py-16 lg:py-24 border-b border-[#E4DDD0] dark:border-[#302A24] bg-[#F2EDE4]/60 dark:bg-[#171411] transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header + Manuscript Showcase Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-12">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-xs font-semibold text-[#1B365D] dark:text-[#93C5FD] mb-2">
              {t.shia.kicker}
            </p>
            <h2
              className="font-editorial text-3xl sm:text-4xl font-bold text-[#1C1917] dark:text-[#F5EFE6] leading-snug mb-4"
              style={{ textWrap: 'balance' }}
            >
              {t.shia.title}
            </h2>
            <p className="text-base text-[#44403C] dark:text-[#D5CCC0] leading-[1.85] max-w-[65ch] mb-6">
              {t.shia.lead}
            </p>

            {/* Pillar Selector Segmented Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pillars.map((pillar) => {
                const active = pillar.id === currentPillar.id;
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() => setSelectedId(pillar.id)}
                    className={`text-start p-4 rounded-xl border transition-all duration-150 cursor-pointer ${
                      active
                        ? 'bg-[#1B365D] dark:bg-[#254A7C] text-[#FBF9F5] border-[#1B365D] dark:border-[#D4AF37]/60 shadow-md'
                        : 'bg-[#FBF9F5] dark:bg-[#1E1A16] text-[#1C1917] dark:text-[#DED6C8] border-[#E4DDD0] dark:border-[#302A24] hover:border-[#C99E32]/60 hover:bg-[#FFFFFF] dark:hover:bg-[#26211C]'
                    }`}
                  >
                    <span className="block text-xs opacity-75 tabular-nums mb-1">
                      {t.shia.pillarWord} {pillar.index}
                    </span>
                    <span className="block text-sm font-semibold leading-snug">{pillar.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col">
            <figure className="relative flex-1 min-h-[280px] rounded-2xl overflow-hidden border border-[#D6CEBE] dark:border-[#D4AF37]/30 ring-1 ring-[#D4AF37]/20 shadow-lg bg-[#1C1917]">
              <SafeImage
                src={manuscriptImg}
                alt={t.shia.manuscriptCaption}
                fallbackTitle={t.brandName}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none"
                aria-hidden="true"
              />
              <figcaption className="absolute bottom-0 inset-x-0 p-5 text-[#FBF9F5]">
                <p className="text-xs text-[#E7E5E4]/90">{t.shia.manuscriptCaption}</p>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Active Pillar Detailed Panel */}
        <div className="bg-[#FFFFFF] dark:bg-[#1E1A16] border border-[#E4DDD0] dark:border-[#302A24] ring-1 ring-[#D4AF37]/15 shadow-sm rounded-2xl p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5">
              <div className="text-xs text-[#78716C] dark:text-[#A89F92] flex items-center gap-2">
                <span className="tabular-nums">
                  {t.shia.pillarWord} {currentPillar.index}
                </span>
                <span aria-hidden="true">·</span>
                <span>{currentPillar.subtitle}</span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1C1917] dark:text-[#F5EFE6]">
                {currentPillar.title}
              </h3>

              <p className="text-base text-[#292524] dark:text-[#F0E8DC] leading-[1.85] font-medium">
                {currentPillar.summary}
              </p>

              <div className="space-y-3 pt-2">
                {currentPillar.details.map((detail, idx) => (
                  <p key={idx} className="text-[15px] text-[#44403C] dark:text-[#D5CCC0] leading-[1.85]">
                    {detail}
                  </p>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#FBF9F5] dark:bg-[#141210] border border-[#D6CEBE] dark:border-[#D4AF37]/30 ring-1 ring-[#D4AF37]/15 rounded-xl p-6 shadow-sm">
              <p className="text-xs font-semibold text-[#8C5A2B] dark:text-[#E6C260] mb-3">
                {t.shia.sourcePanelLabel}
              </p>
              <p
                dir="rtl"
                className="font-editorial text-xl sm:text-2xl text-[#1C1917] dark:text-[#F5EFE6] leading-relaxed mb-4"
              >
                «{currentPillar.hadithArabic}»
              </p>
              <p className="text-sm text-[#44403C] dark:text-[#D5CCC0] leading-[1.8] mb-4">
                {currentPillar.hadithTranslation}
              </p>
              <p className="text-xs text-[#78716C] dark:text-[#A89F92] pt-3 border-t border-[#E4DDD0] dark:border-[#302A24]">
                {currentPillar.hadithSource}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
