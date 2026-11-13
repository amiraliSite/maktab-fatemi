import { useState, useEffect, useMemo } from 'react';
import { BookMarked, ChevronLeft, ChevronRight, Volume2, Square, Copy, Check } from 'lucide-react';
import { getLocalizedChapters, getLocalizedTeachings } from '../data/localizedContent';
import { ShamsehDivider } from './ShamsehDivider';
import { toPersianDigits } from '../utils/formatPersian';
import { useLanguage } from '../i18n/LanguageContext';
import { UI_STRINGS } from '../i18n/uiStrings';

interface MartyrdomSectionProps {
  activeChapterId: string;
  onSelectChapter: (id: string) => void;
}

export function MartyrdomSection({ activeChapterId, onSelectChapter }: MartyrdomSectionProps) {
  const { locale, isRtl } = useLanguage();
  const t = UI_STRINGS[locale];
  const chapters = useMemo(() => getLocalizedChapters(locale), [locale]);
  const teachings = useMemo(() => getLocalizedTeachings(locale), [locale]);

  const [selectedTeachingId, setSelectedTeachingId] = useState(teachings[0].id);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copiedQuote, setCopiedQuote] = useState(false);

  const activeIndex = Math.max(
    0,
    chapters.findIndex((ch) => ch.id === activeChapterId)
  );
  const currentChapter = chapters[activeIndex] || chapters[0];
  const currentTeaching =
    teachings.find((item) => item.id === selectedTeachingId) || teachings[0];

  const progressPercent = ((activeIndex + 1) / chapters.length) * 100;
  const NextChevron = isRtl ? ChevronLeft : ChevronRight;

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [activeChapterId, locale]);

  const toggleNarration = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const text = `${currentChapter.title}. ${currentChapter.paragraphs.join(' ')}`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = locale === 'en' ? 'en-US' : locale === 'ar' ? 'ar-SA' : 'fa-IR';
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleCopyQuote = async () => {
    const formatted = `"${currentChapter.pullQuote.arabic}"\n${currentChapter.pullQuote.persian}\n(${currentChapter.pullQuote.source})`;
    try {
      await navigator.clipboard.writeText(formatted);
      setCopiedQuote(true);
      window.setTimeout(() => setCopiedQuote(false), 2200);
    } catch {
      // Ignore clipboard restriction
    }
  };

  return (
    <section
      id="martyrdom"
      className="py-16 lg:py-24 border-b border-[#E4DDD0] dark:border-[#302A24] bg-[#FBF9F5] dark:bg-[#12100E] transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <p className="text-xs font-semibold text-[#7F1D1D] dark:text-[#E6C260] mb-2">
            {t.martyrdom.kicker}
          </p>
          <h2
            className="font-editorial text-3xl sm:text-4xl font-bold text-[#1C1917] dark:text-[#F5EFE6] leading-snug mb-4"
            style={{ textWrap: 'balance' }}
          >
            {t.martyrdom.title}
          </h2>
          <p className="text-base text-[#57534E] dark:text-[#B8AFA2] leading-[1.8]">
            {t.martyrdom.lead}
          </p>
        </div>

        {/* Interactive Chapter Selector Tabs */}
        <div className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {chapters.map((chapter) => {
              const isActive = chapter.id === currentChapter.id;
              return (
                <button
                  key={chapter.id}
                  type="button"
                  onClick={() => onSelectChapter(chapter.id)}
                  className={`text-start p-4 rounded-xl border transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B365D] dark:focus-visible:ring-[#D4AF37] ${
                    isActive
                      ? 'bg-[#1C1917] dark:bg-[#2A231D] text-[#FBF9F5] border-[#1C1917] dark:border-[#D4AF37]/60'
                      : 'bg-[#F2EDE4]/70 dark:bg-[#1A1714] text-[#292524] dark:text-[#DED6C8] border-[#E4DDD0] dark:border-[#302A24] hover:bg-[#F2EDE4] dark:hover:bg-[#24201B]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5 text-xs opacity-75 tabular-nums">
                    <span>
                      {t.martyrdom.chapterWord} {chapter.index}
                    </span>
                    <span className="truncate max-w-[140px]">
                      {chapter.period.split(' ').slice(0, 3).join(' ')}
                    </span>
                  </div>
                  <p className="text-sm font-semibold leading-snug line-clamp-2">{chapter.title}</p>
                </button>
              );
            })}
          </div>

          <div className="mt-4 h-1 w-full bg-[#E4DDD0] dark:bg-[#2A241E] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#7F1D1D] dark:bg-[#D4AF37] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Asymmetric 70/30 Reading Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <article className="lg:col-span-8 bg-[#FFFFFF] dark:bg-[#1A1714] border border-[#E4DDD0] dark:border-[#302A24] ring-1 ring-[#D4AF37]/15 dark:ring-[#D4AF37]/10 shadow-sm rounded-2xl p-6 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-[#E4DDD0] dark:border-[#302A24]">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#78716C] dark:text-[#A89F92]">
                <span>
                  {t.martyrdom.chapterWord} {currentChapter.index}
                </span>
                <span aria-hidden="true">·</span>
                <span>{currentChapter.period}</span>
              </div>

              <button
                type="button"
                onClick={toggleNarration}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                  isSpeaking
                    ? 'bg-[#7F1D1D] text-[#FBF9F5] border-[#7F1D1D]'
                    : 'bg-[#FBF9F5] dark:bg-[#24201B] text-[#1B365D] dark:text-[#93C5FD] border-[#D6CEBE] dark:border-[#3B342D] hover:bg-[#F2EDE4] dark:hover:bg-[#2D2822]'
                }`}
              >
                {isSpeaking ? (
                  <>
                    <Square className="w-3.5 h-3.5" />
                    <span>{t.martyrdom.stopNarration}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{t.martyrdom.listenChapter}</span>
                  </>
                )}
              </button>
            </div>

            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1C1917] dark:text-[#F5EFE6] leading-snug mb-2">
              {currentChapter.title}
            </h3>
            <p className="text-sm font-medium text-[#7F1D1D] dark:text-[#E6C260] mb-7">
              {currentChapter.subtitle}
            </p>

            <div className="space-y-5 max-w-[68ch]">
              {currentChapter.paragraphs.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-[15.5px] sm:text-base text-[#292524] dark:text-[#E7DFD3] leading-[1.95] text-justify"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Museum Editorial Pull Quote with 1-Click Copy */}
            <blockquote className="my-9 py-6 border-y border-[#D6CEBE] dark:border-[#3B342D] text-center px-2 sm:px-6">
              <p
                dir="rtl"
                className="font-editorial text-xl sm:text-2xl text-[#1C1917] dark:text-[#F5EFE6] leading-relaxed mb-3"
              >
                «{currentChapter.pullQuote.arabic}»
              </p>
              <p className="text-sm sm:text-base text-[#44403C] dark:text-[#D5CCC0] leading-relaxed mb-3">
                {currentChapter.pullQuote.persian}
              </p>
              <footer className="flex flex-wrap items-center justify-center gap-3 text-xs text-[#78716C] dark:text-[#A89F92]">
                <span>{currentChapter.pullQuote.source}</span>
                <button
                  type="button"
                  onClick={handleCopyQuote}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-[#E4DDD0] dark:border-[#3B342D] bg-[#FBF9F5] dark:bg-[#24201B] text-[#44403C] dark:text-[#DED6C8] hover:text-[#1C1917] dark:hover:text-[#F5EFE6] hover:bg-[#F2EDE4] dark:hover:bg-[#2E2923] transition-colors cursor-pointer"
                >
                  {copiedQuote ? (
                    <>
                      <Check className="w-3 h-3 text-[#14532D] dark:text-[#6EE7B7]" />
                      <span>{t.martyrdom.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>{t.martyrdom.copyQuote}</span>
                    </>
                  )}
                </button>
              </footer>
            </blockquote>

            <div className="flex items-center justify-between pt-4 border-t border-[#E4DDD0] dark:border-[#302A24]">
              <span className="text-xs text-[#78716C] dark:text-[#A89F92] tabular-nums">
                {t.martyrdom.chapterWord} {toPersianDigits(activeIndex + 1, locale)}{' '}
                {t.martyrdom.ofWord} {toPersianDigits(chapters.length, locale)}
              </span>

              {activeIndex < chapters.length - 1 ? (
                <button
                  type="button"
                  onClick={() => onSelectChapter(chapters[activeIndex + 1].id)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1B365D] dark:text-[#93C5FD] hover:text-[#142947] dark:hover:text-[#BFDBFE] cursor-pointer min-h-[40px] px-2"
                >
                  <span>
                    {t.martyrdom.nextChapterPrefix}
                    {chapters[activeIndex + 1].title.split(/[؛:]/)[0]}
                  </span>
                  <NextChevron className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onSelectChapter(chapters[0].id)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1B365D] dark:text-[#93C5FD] hover:text-[#142947] dark:hover:text-[#BFDBFE] cursor-pointer min-h-[40px] px-2"
                >
                  <span>{t.martyrdom.backToFirst}</span>
                  <NextChevron className="w-4 h-4" />
                </button>
              )}
            </div>
          </article>

          <aside className="lg:col-span-4 space-y-5">
            <div className="bg-[#F2EDE4] dark:bg-[#1E1A16] border border-[#E4DDD0] dark:border-[#302A24] rounded-xl p-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#1C1917] dark:text-[#F5EFE6] mb-4 pb-3 border-b border-[#D6CEBE] dark:border-[#3B342D]">
                <BookMarked className="w-4 h-4 text-[#8C5A2B] dark:text-[#E6C260]" />
                <span>{t.martyrdom.sourcesTitle}</span>
              </div>

              <div className="space-y-5">
                {currentChapter.sources.map((src) => (
                  <div
                    key={src.id}
                    className="pb-4 border-b border-[#E4DDD0] dark:border-[#302A24] last:border-b-0 last:pb-0"
                  >
                    <p className="text-sm font-bold text-[#1C1917] dark:text-[#F5EFE6] mb-1">
                      {src.book}
                    </p>
                    <p className="text-xs text-[#78716C] dark:text-[#A89F92] mb-2">
                      {src.author} · {src.era}
                    </p>
                    <p className="text-xs sm:text-sm text-[#44403C] dark:text-[#D5CCC0] leading-relaxed">
                      {src.quote}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#FFFFFF] dark:bg-[#1A1714] border border-[#E4DDD0] dark:border-[#302A24] rounded-xl p-6">
              <p className="text-xs font-semibold text-[#7F1D1D] dark:text-[#E6C260] mb-2">
                {t.martyrdom.methodNoteTitle}
              </p>
              <p className="text-sm text-[#44403C] dark:text-[#D5CCC0] leading-relaxed">
                {t.martyrdom.methodNoteBody}
              </p>
            </div>
          </aside>
        </div>

        {/* Core Teachings & Significance in Shia Islam */}
        <div className="mt-16 pt-6">
          <div className="mb-10">
            <ShamsehDivider />
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold text-[#1B365D] dark:text-[#93C5FD] mb-2">
                {t.martyrdom.teachingsKicker}
              </p>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1C1917] dark:text-[#F5EFE6]">
                {t.martyrdom.teachingsTitle}
              </h3>
            </div>
            <p className="text-sm text-[#57534E] dark:text-[#B8AFA2] max-w-md">
              {t.martyrdom.teachingsLead}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-5 flex flex-col gap-3">
              {teachings.map((teaching) => {
                const isSelected = teaching.id === currentTeaching.id;
                return (
                  <button
                    key={teaching.id}
                    type="button"
                    onClick={() => setSelectedTeachingId(teaching.id)}
                    className={`text-start p-4 rounded-xl border transition-colors duration-150 cursor-pointer ${
                      isSelected
                        ? 'bg-[#1B365D] dark:bg-[#254A7C] text-[#FBF9F5] border-[#1B365D] dark:border-[#93C5FD]/40'
                        : 'bg-[#FFFFFF] dark:bg-[#1A1714] text-[#1C1917] dark:text-[#DED6C8] border-[#E4DDD0] dark:border-[#302A24] hover:bg-[#F2EDE4] dark:hover:bg-[#24201B]'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs opacity-75 mb-1">
                      <span className="tabular-nums">{teaching.index}</span>
                      <span aria-hidden="true">·</span>
                      <span>{teaching.category}</span>
                    </div>
                    <p className="text-sm sm:text-base font-semibold leading-snug">{teaching.title}</p>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-7 bg-[#F2EDE4] dark:bg-[#1E1A16] border border-[#E4DDD0] dark:border-[#302A24] rounded-xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#78716C] dark:text-[#A89F92] mb-3">
                  <span>{currentTeaching.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{currentTeaching.reference}</span>
                </div>

                <h4 className="font-editorial text-2xl font-bold text-[#1C1917] dark:text-[#F5EFE6] mb-4">
                  {currentTeaching.title}
                </h4>

                <div className="bg-[#FBF9F5] dark:bg-[#141210] border border-[#D6CEBE] dark:border-[#3B342D] rounded-lg p-4 mb-6">
                  <p
                    dir="rtl"
                    className="font-editorial text-lg sm:text-xl text-[#1C1917] dark:text-[#F5EFE6] leading-relaxed text-center"
                  >
                    «{currentTeaching.arabicPrinciple}»
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-[#8C5A2B] dark:text-[#E6C260] mb-1">
                      {t.martyrdom.teachingExplainLabel}
                    </p>
                    <p className="text-sm sm:text-base text-[#292524] dark:text-[#E7DFD3] leading-[1.85]">
                      {currentTeaching.explanation}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#D6CEBE] dark:border-[#3B342D]">
                    <p className="text-xs font-semibold text-[#1B365D] dark:text-[#93C5FD] mb-1">
                      {t.martyrdom.teachingShiaLabel}
                    </p>
                    <p className="text-sm sm:text-base text-[#292524] dark:text-[#E7DFD3] leading-[1.85]">
                      {currentTeaching.shiaSignificance}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
