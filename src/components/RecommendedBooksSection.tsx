import { useMemo, useState } from 'react';
import { BookOpen, ArrowLeft, ArrowRight } from 'lucide-react';
import { BookItem } from '../data/shiaAndBooksData';
import { getLocalizedBooks } from '../data/localizedContent';
import { TiltCard3D } from './TiltCard3D';
import { ShamsehDivider } from './ShamsehDivider';
import { useLanguage } from '../i18n/LanguageContext';
import { UI_STRINGS } from '../i18n/uiStrings';

interface RecommendedBooksSectionProps {
  onInspectBook: (book: BookItem) => void;
}

export function RecommendedBooksSection({ onInspectBook }: RecommendedBooksSectionProps) {
  const { locale, isRtl } = useLanguage();
  const t = UI_STRINGS[locale];
  const books = useMemo(() => getLocalizedBooks(locale), [locale]);
  const [eraFilter, setEraFilter] = useState<'all' | 'classical' | 'contemporary'>('all');

  const filteredBooks = books.filter((book) =>
    eraFilter === 'all' ? true : book.eraType === eraFilter
  );
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section
      id="recommended-books"
      className="py-16 lg:py-24 border-b border-[#E4DDD0] dark:border-[#302A24] bg-[#F2EDE4]/50 dark:bg-[#171411] transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-[#7F1D1D] dark:text-[#E6C260] mb-2">
              {t.recommended.kicker}
            </p>
            <h2
              className="font-editorial text-3xl sm:text-4xl font-bold text-[#1C1917] dark:text-[#F5EFE6] leading-snug mb-3"
              style={{ textWrap: 'balance' }}
            >
              {t.recommended.title}
            </h2>
            <p className="text-base text-[#57534E] dark:text-[#B8AFA2] leading-[1.8]">
              {t.recommended.lead}
            </p>
          </div>

          {/* Interactive Era Filter Tabs */}
          <div className="inline-flex items-center gap-1 p-1 bg-[#E4DDD0]/75 dark:bg-[#24201B] border border-[#D6CEBE]/70 dark:border-[#3B342D] rounded-xl self-start lg:self-auto shrink-0">
            <button
              type="button"
              onClick={() => setEraFilter('all')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                eraFilter === 'all'
                  ? 'bg-[#FFFFFF] dark:bg-[#12100E] text-[#1C1917] dark:text-[#E6C260] shadow-sm'
                  : 'text-[#57534E] dark:text-[#B8AFA2] hover:text-[#1C1917] dark:hover:text-[#F5EFE6]'
              }`}
            >
              {t.recommended.filterAll}
            </button>
            <button
              type="button"
              onClick={() => setEraFilter('classical')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                eraFilter === 'classical'
                  ? 'bg-[#FFFFFF] dark:bg-[#12100E] text-[#1C1917] dark:text-[#E6C260] shadow-sm'
                  : 'text-[#57534E] dark:text-[#B8AFA2] hover:text-[#1C1917] dark:hover:text-[#F5EFE6]'
              }`}
            >
              {t.recommended.filterClassical}
            </button>
            <button
              type="button"
              onClick={() => setEraFilter('contemporary')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                eraFilter === 'contemporary'
                  ? 'bg-[#FFFFFF] dark:bg-[#12100E] text-[#1C1917] dark:text-[#E6C260] shadow-sm'
                  : 'text-[#57534E] dark:text-[#B8AFA2] hover:text-[#1C1917] dark:hover:text-[#F5EFE6]'
              }`}
            >
              {t.recommended.filterContemporary}
            </button>
          </div>
        </div>

        <ShamsehDivider className="mb-10" />

        {/* Scholarly Guide Cards with 3D Perspective Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBooks.map((book) => (
            <TiltCard3D key={book.id} maxTilt={4} className="h-full">
              <article className="h-full bg-[#FFFFFF] dark:bg-[#1E1A16] border border-[#E4DDD0] dark:border-[#302A24] hover:border-[#C99E32]/65 dark:hover:border-[#D4AF37]/55 ring-1 ring-[#D4AF37]/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-200">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#78716C] dark:text-[#A89F92] mb-3">
                    <span className="font-semibold text-[#8C5A2B] dark:text-[#E6C260]">
                      {book.eraLabel}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{t.bookstore.categoryLabels[book.category]}</span>
                  </div>

                  <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#1C1917] dark:text-[#F5EFE6] leading-snug mb-1.5">
                    {book.title}
                  </h3>

                  <p className="text-sm font-medium text-[#57534E] dark:text-[#B8AFA2] mb-4">
                    {t.recommended.authorPrefix}
                    {book.author}
                    {book.translator ? ` · ${book.translator}` : ''}
                  </p>

                  <div className="space-y-3 mb-5">
                    <p className="text-sm text-[#292524] dark:text-[#E7DFD3] leading-[1.8]">
                      <span className="font-semibold text-[#1C1917] dark:text-[#F5EFE6]">
                        {t.recommended.introLabel}
                      </span>
                      {book.shortSummary}
                    </p>
                    <p className="text-sm text-[#44403C] dark:text-[#D5CCC0] leading-[1.8] pt-3 border-t border-[#E4DDD0]/70 dark:border-[#302A24]">
                      <span className="font-semibold text-[#1B365D] dark:text-[#93C5FD]">
                        {t.recommended.relevanceLabel}
                      </span>
                      {book.shiaRelevance}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E4DDD0] dark:border-[#302A24] flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-[#78716C] dark:text-[#A89F92] flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#8C5A2B] dark:text-[#D4AF37]" />
                    <span>{book.historicalSources}</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => onInspectBook(book)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1B365D] dark:text-[#E6C260] hover:text-[#142947] dark:hover:text-[#F3D882] cursor-pointer whitespace-nowrap shrink-0 min-h-[40px]"
                  >
                    <span>{t.recommended.inspectCta}</span>
                    <ArrowIcon className="w-4 h-4" />
                  </button>
                </div>
              </article>
            </TiltCard3D>
          ))}
        </div>
      </div>
    </section>
  );
}
