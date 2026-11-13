import { useMemo, useState } from 'react';
import { Calendar, ArrowLeft, ArrowRight } from 'lucide-react';
import { TimelineEvent } from '../data/timelineEvents';
import { getLocalizedTimeline } from '../data/localizedContent';
import { toPersianDigits } from '../utils/formatPersian';
import { ShamsehDivider } from './ShamsehDivider';
import { useLanguage } from '../i18n/LanguageContext';
import { UI_STRINGS } from '../i18n/uiStrings';

interface TimelineSectionProps {
  onNavigateTarget: (target: TimelineEvent['relatedTarget']) => void;
}

export function TimelineSection({ onNavigateTarget }: TimelineSectionProps) {
  const { locale, isRtl } = useLanguage();
  const t = UI_STRINGS[locale];
  const timeline = useMemo(() => getLocalizedTimeline(locale), [locale]);
  const [activeId, setActiveId] = useState(timeline[3].id);

  const activeIndex = Math.max(
    0,
    timeline.findIndex((item) => item.id === activeId)
  );
  const currentEvent = timeline[activeIndex] || timeline[0];
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section
      id="timeline"
      className="py-16 lg:py-24 border-b border-[#E4DDD0] dark:border-[#302A24] bg-[#FBF9F5] dark:bg-[#12100E] transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-[#8C5A2B] dark:text-[#E6C260] mb-2">
              {t.timeline.kicker}
            </p>
            <h2
              className="font-editorial text-3xl sm:text-4xl font-bold text-[#1C1917] dark:text-[#F5EFE6] leading-snug"
              style={{ textWrap: 'balance' }}
            >
              {t.timeline.title}
            </h2>
          </div>
          <p className="text-sm text-[#57534E] dark:text-[#B8AFA2] max-w-md">{t.timeline.lead}</p>
        </div>

        <ShamsehDivider className="mb-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Chronology Rail */}
          <div className="lg:col-span-5 space-y-2.5">
            {timeline.map((event, idx) => {
              const isSelected = event.id === currentEvent.id;
              return (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => setActiveId(event.id)}
                  className={`w-full text-start p-4 rounded-2xl border transition-all duration-150 cursor-pointer flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-[#1C1917] dark:bg-[#2A231D] text-[#FBF9F5] border-[#C99E32] dark:border-[#D4AF37]/65 shadow-md ring-1 ring-[#D4AF37]/25'
                      : 'bg-[#FFFFFF] dark:bg-[#1A1714] text-[#1C1917] dark:text-[#DED6C8] border-[#E4DDD0] dark:border-[#302A24] hover:border-[#C99E32]/60 dark:hover:border-[#D4AF37]/45 hover:bg-[#F2EDE4]/70 dark:hover:bg-[#24201B]'
                  }`}
                >
                  <span
                    className={`tabular-nums text-xs font-bold px-2.5 py-1 rounded-md shrink-0 mt-0.5 ${
                      isSelected
                        ? 'bg-[#D4AF37] text-[#12100E]'
                        : 'bg-[#F2EDE4] dark:bg-[#24201B] text-[#57534E] dark:text-[#B8AFA2]'
                    }`}
                  >
                    {toPersianDigits(String(idx + 1).padStart(2, '0'), locale)}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs opacity-80 mb-1">
                      <span className="tabular-nums">{event.dateHijri}</span>
                      <span aria-hidden="true">·</span>
                      <span>{event.eraLabel}</span>
                    </div>
                    <p className="text-sm font-semibold leading-snug">{event.title}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Event Detail Card */}
          <div className="lg:col-span-7 lg:sticky lg:top-24 bg-[#F2EDE4] dark:bg-[#1E1A16] border border-[#D6CEBE] dark:border-[#3B342D] ring-1 ring-[#D4AF37]/15 rounded-2xl p-6 sm:p-10 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-[#D6CEBE] dark:border-[#3B342D]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#7F1D1D] dark:text-[#E6C260]">
                <Calendar className="w-4 h-4" />
                <span className="tabular-nums">{currentEvent.dateHijri}</span>
              </div>
              <span className="text-xs text-[#57534E] dark:text-[#B8AFA2]">{currentEvent.eraLabel}</span>
            </div>

            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1C1917] dark:text-[#F5EFE6] leading-snug mb-2">
              {currentEvent.title}
            </h3>
            <p className="text-sm font-medium text-[#8C5A2B] dark:text-[#E6C260] mb-6">
              {currentEvent.shortSubtitle}
            </p>

            <div className="space-y-5 mb-8">
              <div>
                <p className="text-xs font-semibold text-[#57534E] dark:text-[#B8AFA2] mb-1.5">
                  {t.timeline.descHeading}
                </p>
                <p className="text-base text-[#292524] dark:text-[#E7DFD3] leading-[1.85]">
                  {currentEvent.description}
                </p>
              </div>

              <div className="bg-[#FBF9F5] dark:bg-[#141210] border border-[#E4DDD0] dark:border-[#302A24] ring-1 ring-[#D4AF37]/10 rounded-xl p-5">
                <p className="text-xs font-semibold text-[#1B365D] dark:text-[#93C5FD] mb-1.5">
                  {t.timeline.sigHeading}
                </p>
                <p className="text-sm sm:text-base text-[#292524] dark:text-[#E7DFD3] leading-[1.8]">
                  {currentEvent.significance}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-[#D6CEBE] dark:border-[#3B342D]">
              <button
                type="button"
                onClick={() => onNavigateTarget(currentEvent.relatedTarget)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-[#1B365D] dark:bg-[#254A7C] text-[#FBF9F5] rounded-lg hover:bg-[#142947] dark:hover:bg-[#2E5B99] transition-colors cursor-pointer min-h-[42px]"
              >
                <span>{currentEvent.relatedTarget.label}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={activeIndex === 0}
                  onClick={() => setActiveId(timeline[activeIndex - 1].id)}
                  className="px-3.5 py-2 text-xs font-medium rounded-lg border border-[#D6CEBE] dark:border-[#3B342D] bg-[#FBF9F5] dark:bg-[#24201B] text-[#292524] dark:text-[#DED6C8] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed hover:border-[#C99E32]/60 dark:hover:border-[#D4AF37]/50 transition-colors"
                >
                  {t.timeline.prevEvent}
                </button>
                <button
                  type="button"
                  disabled={activeIndex === timeline.length - 1}
                  onClick={() => setActiveId(timeline[activeIndex + 1].id)}
                  className="px-3.5 py-2 text-xs font-medium rounded-lg border border-[#D6CEBE] dark:border-[#3B342D] bg-[#FBF9F5] dark:bg-[#24201B] text-[#292524] dark:text-[#DED6C8] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed hover:border-[#C99E32]/60 dark:hover:border-[#D4AF37]/50 transition-colors"
                >
                  {t.timeline.nextEvent}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
