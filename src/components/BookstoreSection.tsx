import { useState, useMemo, useRef, useEffect } from 'react';
import { Search, ShoppingBag, Eye, Lock, LogIn, X, Mic, MicOff } from 'lucide-react';
import { BookItem } from '../data/shiaAndBooksData';
import { getLocalizedBooks } from '../data/localizedContent';
import { formatPriceToman, toPersianDigits } from '../utils/formatPersian';
import { SafeImage } from './SafeImage';
import { TiltCard3D } from './TiltCard3D';
import { ShamsehDivider } from './ShamsehDivider';
import { AuthUser } from '../types/auth';
import { useLanguage } from '../i18n/LanguageContext';
import { UI_STRINGS } from '../i18n/uiStrings';

interface BookstoreSectionProps {
  user: AuthUser | null;
  onAddToCart: (book: BookItem) => void;
  onInspectBook: (book: BookItem) => void;
  onRequireAuth: (book?: BookItem) => void;
}

interface SpeechRecognitionEventLike {
  results: {
    length: number;
    [index: number]: {
      isFinal: boolean;
      [altIndex: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionLike {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  continuous: boolean;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670]/g, '')
    .replace(/[يئ]/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/ة/g, 'ه')
    .replace(/[أإآ]/g, 'ا')
    .replace(/\u200c/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

interface SearchMatchResult {
  book: BookItem;
  score: number;
  matchReason: string | null;
}

function evaluateBookMatch(book: BookItem, normalizedQuery: string, locale: 'fa' | 'ar' | 'en'): SearchMatchResult {
  if (!normalizedQuery) {
    return { book, score: 1, matchReason: null };
  }

  const tokens = normalizedQuery.split(' ').filter(Boolean);
  const titleNorm = normalizeText(book.title);
  const authorNorm = normalizeText(book.author);
  const translatorNorm = normalizeText(book.translator || '');
  const summaryNorm = normalizeText(book.shortSummary);
  const relevanceNorm = normalizeText(book.shiaRelevance);
  const sourcesNorm = normalizeText(book.historicalSources);
  const tocNorm = normalizeText(book.tableOfContents.join(' '));
  const keywordsNorm = book.keywords.map(normalizeText);

  const reasonLabels =
    locale === 'en'
      ? {
          title: 'Matched in title',
          author: 'Matched in author / translator',
          keyword: 'Historical keyword: ',
          toc: 'Matched in contents or sources',
          summary: 'Matched in summary'
        }
      : locale === 'ar'
        ? {
            title: 'مطابق في عنوان الكتاب',
            author: 'مطابق في اسم المؤلف / المحقق',
            keyword: 'كلمة مفتاحية: ',
            toc: 'مطابق في الفهرس أو المصادر',
            summary: 'مطابق في التعريف والموضوع'
          }
        : {
            title: 'تطابق در عنوان کتاب',
            author: 'تطابق در نام مؤلف / مترجم',
            keyword: 'کلیدواژه تاریخی: ',
            toc: 'تطابق در سرفصل‌ها یا مآخذ کتاب',
            summary: 'تطابق در معرفی و موضوع کتاب'
          };

  let score = 0;
  let matchReason: string | null = null;

  for (const token of tokens) {
    let tokenMatched = false;

    if (titleNorm.includes(token)) {
      score += 12;
      tokenMatched = true;
      matchReason = matchReason || reasonLabels.title;
    }
    if (authorNorm.includes(token) || translatorNorm.includes(token)) {
      score += 10;
      tokenMatched = true;
      matchReason = matchReason || reasonLabels.author;
    }
    const matchedKeywordIdx = keywordsNorm.findIndex((kw) => kw.includes(token));
    if (matchedKeywordIdx !== -1) {
      score += 9;
      tokenMatched = true;
      matchReason = matchReason || `${reasonLabels.keyword}${book.keywords[matchedKeywordIdx]}`;
    }
    if (sourcesNorm.includes(token) || tocNorm.includes(token)) {
      score += 5;
      tokenMatched = true;
      matchReason = matchReason || reasonLabels.toc;
    }
    if (summaryNorm.includes(token) || relevanceNorm.includes(token)) {
      score += 3;
      tokenMatched = true;
      matchReason = matchReason || reasonLabels.summary;
    }

    if (!tokenMatched) {
      return { book, score: 0, matchReason: null };
    }
  }

  return { book, score, matchReason };
}

export function BookstoreSection({
  user,
  onAddToCart,
  onInspectBook,
  onRequireAuth
}: BookstoreSectionProps) {
  const { locale, isRtl } = useLanguage();
  const t = UI_STRINGS[locale];
  const books = useMemo(() => getLocalizedBooks(locale), [locale]);

  const [selectedCategory, setSelectedCategory] = useState<'همه' | BookItem['category']>('همه');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [searchFocused, setSearchFocused] = useState(false);

  const [isListening, setIsListening] = useState(false);
  const [voiceMessage, setVoiceMessage] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const searchWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      recognitionRef.current?.stop();
    };
  }, []);

  const toggleVoiceSearch = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const win = window as unknown as {
      SpeechRecognition?: SpeechRecognitionCtor;
      webkitSpeechRecognition?: SpeechRecognitionCtor;
    };
    const RecognitionCtor = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!RecognitionCtor) {
      setVoiceMessage(t.bookstore.voiceUnsupported);
      return;
    }

    try {
      const recognition = new RecognitionCtor();
      recognition.lang = locale === 'en' ? 'en-US' : locale === 'ar' ? 'ar-SA' : 'fa-IR';
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      recognition.continuous = false;

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0]?.transcript || '';
        }
        const cleaned = transcript.trim();
        if (cleaned) {
          setSearchQuery(cleaned);
          setSelectedCategory('همه');
          setSearchFocused(true);
          setVoiceMessage(t.bookstore.voiceHeard(cleaned));
        }
      };

      recognition.onerror = (event) => {
        setIsListening(false);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setVoiceMessage(t.bookstore.voiceDenied);
        } else if (event.error === 'no-speech') {
          setVoiceMessage(t.bookstore.voiceNoSpeech);
        } else {
          setVoiceMessage(t.bookstore.voiceError);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      setVoiceMessage(t.bookstore.voiceListening);
      setIsListening(true);
      recognition.start();
    } catch {
      setIsListening(false);
      setVoiceMessage(t.bookstore.voiceError);
    }
  };

  const normalizedQuery = normalizeText(searchQuery);

  const matchedResults = useMemo(() => {
    const results = books
      .filter((book) => selectedCategory === 'همه' || book.category === selectedCategory)
      .map((book) => evaluateBookMatch(book, normalizedQuery, locale))
      .filter((entry) => entry.score > 0);

    if (sortBy === 'price-asc') {
      return [...results].sort((a, b) => a.book.priceToman - b.book.priceToman);
    }
    if (sortBy === 'price-desc') {
      return [...results].sort((a, b) => b.book.priceToman - a.book.priceToman);
    }
    if (normalizedQuery) {
      return [...results].sort((a, b) => b.score - a.score);
    }
    return results;
  }, [books, selectedCategory, normalizedQuery, sortBy, locale]);

  const instantSuggestions = useMemo(() => {
    if (!normalizedQuery) return [];
    return books
      .map((book) => evaluateBookMatch(book, normalizedQuery, locale))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }, [books, normalizedQuery, locale]);

  return (
    <section
      id="bookshop"
      className="py-16 lg:py-24 bg-[#FBF9F5] dark:bg-[#12100E] transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-7">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-[#1B365D] dark:text-[#93C5FD] mb-2">
              {t.bookstore.kicker}
            </p>
            <h2
              className="font-editorial text-3xl sm:text-4xl font-bold text-[#1C1917] dark:text-[#F5EFE6] leading-snug mb-2"
              style={{ textWrap: 'balance' }}
            >
              {t.bookstore.title}
            </h2>
            <p className="text-sm sm:text-base text-[#57534E] dark:text-[#B8AFA2]">
              {t.bookstore.lead}
            </p>
          </div>
          <p className="text-xs text-[#78716C] dark:text-[#A89F92] tabular-nums">
            {t.bookstore.freeShippingNote}
          </p>
        </div>

        <ShamsehDivider className="mb-8" />

        {/* Smart Text + Voice Search Bar at Top of Bookshop */}
        <div
          ref={searchWrapperRef}
          className="relative mb-6 bg-[#FFFFFF] dark:bg-[#1A1714] border border-[#D6CEBE] dark:border-[#3B342D] ring-1 ring-[#D4AF37]/20 rounded-2xl p-4 sm:p-5 shadow-md"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <label
              htmlFor="smart-book-search"
              className="text-xs font-semibold text-[#1B365D] dark:text-[#93C5FD]"
            >
              {t.bookstore.searchLabel}
            </label>
            <span className="text-xs text-[#78716C] dark:text-[#A89F92] tabular-nums">
              {t.bookstore.resultsCount(
                toPersianDigits(matchedResults.length, locale),
                toPersianDigits(books.length, locale)
              )}
            </span>
          </div>

          <div className="relative flex items-center gap-2">
            <div className="relative flex-1">
              <Search
                className={`w-5 h-5 text-[#78716C] dark:text-[#A89F92] absolute ${
                  isRtl ? 'right-4' : 'left-4'
                } top-1/2 -translate-y-1/2 pointer-events-none`}
              />
              <input
                id="smart-book-search"
                type="search"
                value={searchQuery}
                onFocus={() => setSearchFocused(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchFocused(true);
                }}
                placeholder={t.bookstore.searchPlaceholder}
                className={`w-full ${
                  isRtl ? 'pr-12 pl-11' : 'pl-12 pr-11'
                } py-3.5 text-sm sm:text-base bg-[#FBF9F5] dark:bg-[#12100E] border border-[#D6CEBE] dark:border-[#3B342D] rounded-xl text-[#1C1917] dark:text-[#F5EFE6] placeholder:text-[#78716C] dark:placeholder:text-[#8A8073] focus:outline-none focus:ring-2 focus:ring-[#1B365D] dark:focus:ring-[#D4AF37] focus:bg-[#FFFFFF] dark:focus:bg-[#161310] transition-colors`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setVoiceMessage(null);
                  }}
                  className={`absolute ${
                    isRtl ? 'left-3' : 'right-3'
                  } top-1/2 -translate-y-1/2 w-8 h-8 inline-flex items-center justify-center rounded-lg text-[#78716C] dark:text-[#A89F92] hover:text-[#1C1917] dark:hover:text-[#F5EFE6] hover:bg-[#EAE3D5] dark:hover:bg-[#2A241E] cursor-pointer`}
                  aria-label={t.bookstore.clearSearch}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Voice Search Microphone Button */}
            <button
              type="button"
              onClick={toggleVoiceSearch}
              aria-label={isListening ? t.bookstore.voiceStop : t.bookstore.voiceStart}
              aria-pressed={isListening}
              className={`inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 min-h-[48px] cursor-pointer ${
                isListening
                  ? 'bg-[#7F1D1D] text-[#FBF9F5] border-[#7F1D1D]'
                  : 'bg-[#F2EDE4] dark:bg-[#24201B] text-[#1C1917] dark:text-[#F5EFE6] border-[#D6CEBE] dark:border-[#3B342D] hover:bg-[#EAE3D5] dark:hover:bg-[#2E2923]'
              }`}
            >
              {isListening ? (
                <>
                  <MicOff className="w-4 h-4 shrink-0" />
                  <span className="hidden sm:inline">{t.bookstore.voiceStop}</span>
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4 text-[#1B365D] dark:text-[#E6C260] shrink-0" />
                  <span className="hidden sm:inline">{t.bookstore.voiceStart}</span>
                </>
              )}
            </button>

            {/* Instant Search Suggestions Dropdown */}
            {searchFocused && normalizedQuery && (
              <div className="absolute right-0 left-0 top-full mt-2 z-30 bg-[#FFFFFF] dark:bg-[#1E1A16] border border-[#D6CEBE] dark:border-[#3B342D] rounded-xl shadow-xl overflow-hidden">
                {instantSuggestions.length === 0 ? (
                  <div className="p-4 text-xs text-[#57534E] dark:text-[#B8AFA2]">
                    {t.bookstore.noInstantResults}
                  </div>
                ) : (
                  <ul className="divide-y divide-[#E4DDD0] dark:divide-[#302A24]">
                    {instantSuggestions.map(({ book, matchReason }) => (
                      <li key={book.id}>
                        <button
                          type="button"
                          onClick={() => {
                            setSearchFocused(false);
                            onInspectBook(book);
                          }}
                          className="w-full text-start px-4 py-3 hover:bg-[#F2EDE4]/80 dark:hover:bg-[#2A241E] transition-colors flex items-center justify-between gap-4 cursor-pointer"
                        >
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-[#1C1917] dark:text-[#F5EFE6] truncate">
                              {book.title}
                            </p>
                            <p className="text-xs text-[#57534E] dark:text-[#B8AFA2] truncate">
                              {book.author}
                              {matchReason ? ` · ${matchReason}` : ''}
                            </p>
                          </div>
                          <span className="text-xs font-semibold text-[#1B365D] dark:text-[#E6C260] tabular-nums shrink-0">
                            {formatPriceToman(book.priceToman, locale)}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {voiceMessage && (
            <p
              role="status"
              aria-live="polite"
              className={`mt-2.5 text-xs font-medium ${
                isListening ? 'text-[#7F1D1D] dark:text-[#FCA5A5]' : 'text-[#1B365D] dark:text-[#93C5FD]'
              }`}
            >
              {voiceMessage}
            </p>
          )}

          {/* Quick Historical Keyword Buttons */}
          <div className="mt-3.5 pt-3 border-t border-[#E4DDD0] dark:border-[#302A24] flex flex-wrap items-center gap-2">
            <span className="text-xs text-[#78716C] dark:text-[#A89F92] mx-1">
              {t.bookstore.quickKeywordsLabel}
            </span>
            {t.bookstore.quickKeywords.map((kw) => {
              const active = normalizeText(searchQuery) === normalizeText(kw);
              return (
                <button
                  key={kw}
                  type="button"
                  onClick={() => {
                    setSearchQuery(active ? '' : kw);
                    setVoiceMessage(null);
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#1B365D] dark:bg-[#254A7C] text-[#FBF9F5] border-[#1B365D] dark:border-[#93C5FD]/40'
                      : 'bg-[#FBF9F5] dark:bg-[#24201B] text-[#44403C] dark:text-[#DED6C8] border-[#E4DDD0] dark:border-[#3B342D] hover:bg-[#F2EDE4] dark:hover:bg-[#2E2923]'
                  }`}
                >
                  {kw}
                </button>
              );
            })}
          </div>
        </div>

        {/* Auth Gate Notice when User is Logged Out */}
        {!user && (
          <div className="mb-6 bg-[#1C1917] dark:bg-[#1E1A16] text-[#FBF9F5] rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[#292524] dark:border-[#D4AF37]/40">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-[#E6C260] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm sm:text-base font-bold text-[#FBF9F5]">
                  {t.bookstore.authGateTitle}
                </p>
                <p className="text-xs sm:text-sm text-[#D6CEBE] mt-0.5">
                  {t.bookstore.authGateDesc}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onRequireAuth()}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold bg-[#D4AF37] text-[#1C1917] rounded-lg hover:bg-[#E6C260] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>{t.bookstore.authGateCta}</span>
            </button>
          </div>
        )}

        {/* Filter Bar: Categories + Sort */}
        <div className="bg-[#F2EDE4] dark:bg-[#1A1714] border border-[#E4DDD0] dark:border-[#302A24] ring-1 ring-[#D4AF37]/10 rounded-2xl p-4 mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {t.bookstore.categories.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#1C1917] dark:bg-[#D4AF37] text-[#FBF9F5] dark:text-[#12100E]'
                      : 'bg-[#FBF9F5] dark:bg-[#24201B] text-[#44403C] dark:text-[#DED6C8] border border-[#E4DDD0] dark:border-[#3B342D] hover:bg-[#FFFFFF] dark:hover:bg-[#2E2923]'
                  }`}
                >
                  {t.bookstore.categoryLabels[category]}
                </button>
              );
            })}
          </div>

          <div className="w-full lg:w-64 shrink-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              aria-label={t.bookstore.sortFeatured}
              className="w-full px-3.5 py-2 text-sm bg-[#FFFFFF] dark:bg-[#12100E] border border-[#D6CEBE] dark:border-[#3B342D] rounded-lg text-[#1C1917] dark:text-[#F5EFE6] focus:outline-none focus:ring-2 focus:ring-[#1B365D] dark:focus:ring-[#D4AF37] cursor-pointer"
            >
              <option value="featured">{t.bookstore.sortFeatured}</option>
              <option value="price-asc">{t.bookstore.sortAsc}</option>
              <option value="price-desc">{t.bookstore.sortDesc}</option>
            </select>
          </div>
        </div>

        {/* Empty State */}
        {matchedResults.length === 0 ? (
          <div className="bg-[#FFFFFF] dark:bg-[#1A1714] border border-[#E4DDD0] dark:border-[#302A24] rounded-xl p-12 text-center">
            <p className="font-editorial text-xl font-bold text-[#1C1917] dark:text-[#F5EFE6] mb-2">
              {t.bookstore.emptyTitle}
            </p>
            <p className="text-sm text-[#57534E] dark:text-[#B8AFA2] mb-5">
              {t.bookstore.emptyDesc}
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('همه');
                setSearchQuery('');
                setVoiceMessage(null);
              }}
              className="px-5 py-2.5 text-sm font-semibold bg-[#1B365D] dark:bg-[#254A7C] text-[#FBF9F5] rounded-lg cursor-pointer"
            >
              {t.bookstore.showAllBooks}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {matchedResults.map(({ book, matchReason }) => (
              <TiltCard3D key={book.id} maxTilt={5} className="h-full">
                <article className="h-full bg-[#FFFFFF] dark:bg-[#1A1714] border border-[#E4DDD0] dark:border-[#302A24] hover:border-[#C99E32]/65 dark:hover:border-[#D4AF37]/55 ring-1 ring-[#D4AF37]/10 rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-200">
                  <div>
                    <button
                      type="button"
                      onClick={() => onInspectBook(book)}
                      className="block w-full aspect-[3/4] bg-[#F2EDE4] dark:bg-[#24201B] overflow-hidden border-b border-[#E4DDD0] dark:border-[#302A24] cursor-pointer text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B365D] dark:focus-visible:ring-[#D4AF37]"
                      aria-label={book.title}
                    >
                      <SafeImage
                        src={book.coverImage}
                        alt={book.title}
                        fallbackTitle={book.title}
                        className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-[1.03]"
                      />
                    </button>

                    <div className="p-5 sm:p-6">
                      <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#78716C] dark:text-[#A89F92] mb-2">
                        <span>{t.bookstore.categoryLabels[book.category]}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">
                          {toPersianDigits(book.pages, locale)} {t.bookstore.pagesUnit}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{book.binding}</span>
                      </div>

                      <h3 className="font-editorial text-xl font-bold text-[#1C1917] dark:text-[#F5EFE6] leading-snug mb-1.5">
                        {book.title}
                      </h3>

                      <p className="text-xs font-medium text-[#57534E] dark:text-[#B8AFA2] mb-3">
                        {book.author}
                      </p>

                      {matchReason && (
                        <p className="text-xs font-semibold text-[#8C5A2B] dark:text-[#E6C260] mb-2">
                          {matchReason}
                        </p>
                      )}

                      <p className="text-sm text-[#44403C] dark:text-[#D5CCC0] leading-relaxed line-clamp-2">
                        {book.shortSummary}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-4 border-t border-[#E4DDD0] dark:border-[#302A24] flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs text-[#78716C] dark:text-[#A89F92]">
                        {t.bookstore.printPrice}
                      </p>
                      <p className="text-base font-bold text-[#1C1917] dark:text-[#F5EFE6] tabular-nums">
                        {formatPriceToman(book.priceToman, locale)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => onInspectBook(book)}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#D6CEBE] dark:border-[#3B342D] text-[#292524] dark:text-[#DED6C8] hover:bg-[#F2EDE4] dark:hover:bg-[#24201B] transition-colors cursor-pointer"
                        aria-label={t.bookstore.previewTitle}
                        title={t.bookstore.previewTitle}
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {user ? (
                        <button
                          type="button"
                          onClick={() => onAddToCart(book)}
                          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold bg-[#1B365D] dark:bg-[#254A7C] text-[#FBF9F5] rounded-lg hover:bg-[#142947] dark:hover:bg-[#2E5B99] transition-colors whitespace-nowrap shrink-0 min-h-[40px] cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>{t.bookstore.addToCart}</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onRequireAuth(book)}
                          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold bg-[#7F1D1D] dark:bg-[#991B1B] text-[#FBF9F5] rounded-lg hover:bg-[#661717] dark:hover:bg-[#B91C1C] transition-colors whitespace-nowrap shrink-0 min-h-[40px] cursor-pointer"
                        >
                          <Lock className="w-3.5 h-3.5" />
                          <span>{t.bookstore.loginToBuy}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              </TiltCard3D>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
