import { useEffect } from 'react';
import { X, ShoppingBag, BookOpen, Lock } from 'lucide-react';
import { BookItem } from '../data/shiaAndBooksData';
import { formatPriceToman, toPersianDigits } from '../utils/formatPersian';
import { SafeImage } from './SafeImage';
import { AuthUser } from '../types/auth';
import { useLanguage } from '../i18n/LanguageContext';
import { UI_STRINGS } from '../i18n/uiStrings';

interface BookDetailModalProps {
  book: BookItem | null;
  user: AuthUser | null;
  onClose: () => void;
  onAddToCart: (book: BookItem) => void;
  onRequireAuth: (book: BookItem) => void;
}

export function BookDetailModal({
  book,
  user,
  onClose,
  onAddToCart,
  onRequireAuth
}: BookDetailModalProps) {
  const { locale } = useLanguage();
  const t = UI_STRINGS[locale];

  useEffect(() => {
    if (!book) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [book, onClose]);

  if (!book) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 dark:bg-black/70 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="book-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-[#FBF9F5] dark:bg-[#1A1714] border border-[#D6CEBE] dark:border-[#3B342D] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 bg-[#FBF9F5]/95 dark:bg-[#1A1714]/95 backdrop-blur-sm border-b border-[#E4DDD0] dark:border-[#302A24] px-6 py-4 flex items-center justify-between gap-4">
          <div className="text-xs text-[#78716C] dark:text-[#A89F92] flex items-center gap-2">
            <span>{book.eraLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{t.bookstore.categoryLabels[book.category]}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[#E4DDD0] dark:border-[#3B342D] text-[#292524] dark:text-[#DED6C8] hover:bg-[#F2EDE4] dark:hover:bg-[#24201B] cursor-pointer"
            aria-label={t.modal.closeLabel}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 space-y-5">
            <div className="aspect-[3/4] rounded-xl overflow-hidden border border-[#E4DDD0] dark:border-[#302A24] bg-[#F2EDE4] dark:bg-[#24201B] shadow-md">
              <SafeImage
                src={book.coverImage}
                alt={book.title}
                fallbackTitle={book.title}
                className="w-full h-full object-cover"
              />
            </div>

            <dl className="bg-[#F2EDE4] dark:bg-[#12100E] border border-[#E4DDD0] dark:border-[#302A24] rounded-xl p-4 space-y-2.5 text-xs">
              <div className="flex justify-between gap-2 pb-2 border-b border-[#E4DDD0] dark:border-[#302A24]">
                <dt className="text-[#78716C] dark:text-[#A89F92]">{t.modal.publisher}</dt>
                <dd className="font-semibold text-[#1C1917] dark:text-[#F5EFE6]">{book.publisher}</dd>
              </div>
              <div className="flex justify-between gap-2 pb-2 border-b border-[#E4DDD0] dark:border-[#302A24]">
                <dt className="text-[#78716C] dark:text-[#A89F92]">{t.modal.pages}</dt>
                <dd className="font-semibold text-[#1C1917] dark:text-[#F5EFE6] tabular-nums">
                  {toPersianDigits(book.pages, locale)} {t.bookstore.pagesUnit}
                </dd>
              </div>
              <div className="flex justify-between gap-2 pb-2 border-b border-[#E4DDD0] dark:border-[#302A24]">
                <dt className="text-[#78716C] dark:text-[#A89F92]">{t.modal.binding}</dt>
                <dd className="font-semibold text-[#1C1917] dark:text-[#F5EFE6]">{book.binding}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-[#78716C] dark:text-[#A89F92]">{t.modal.stock}</dt>
                <dd className="font-semibold text-[#14532D] dark:text-[#6EE7B7]">
                  {book.inStock ? t.modal.inStockText : t.modal.outOfStockText}
                </dd>
              </div>
            </dl>
          </div>

          <div className="md:col-span-7 space-y-6">
            <div>
              <h2
                id="book-modal-title"
                className="font-editorial text-2xl sm:text-3xl font-bold text-[#1C1917] dark:text-[#F5EFE6] leading-snug mb-2"
              >
                {book.title}
              </h2>
              <p className="text-sm font-medium text-[#57534E] dark:text-[#B8AFA2]">
                {t.modal.authorPrefix}
                {book.author}
                {book.translator ? ` · ${book.translator}` : ''}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-semibold text-[#8C5A2B] dark:text-[#E6C260] mb-1.5">
                  {t.modal.summaryHeading}
                </h3>
                <p className="text-sm sm:text-base text-[#292524] dark:text-[#E7DFD3] leading-[1.85]">
                  {book.shortSummary}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-[#1B365D] dark:text-[#93C5FD] mb-1.5">
                  {t.modal.relevanceHeading}
                </h3>
                <p className="text-sm sm:text-base text-[#44403C] dark:text-[#D5CCC0] leading-[1.85]">
                  {book.shiaRelevance}
                </p>
              </div>
            </div>

            <div className="bg-[#FFFFFF] dark:bg-[#12100E] border border-[#E4DDD0] dark:border-[#302A24] rounded-xl p-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1C1917] dark:text-[#F5EFE6] mb-3">
                <BookOpen className="w-4 h-4 text-[#8C5A2B] dark:text-[#E6C260]" />
                <span>{t.modal.tocHeading}</span>
              </div>
              <ul className="space-y-2 text-sm text-[#44403C] dark:text-[#D5CCC0]">
                {book.tableOfContents.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="tabular-nums text-xs text-[#78716C] dark:text-[#A89F92] mt-1">
                      {toPersianDigits(i + 1, locale)}.
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#F2EDE4]/80 dark:bg-[#24201B] border border-[#D6CEBE] dark:border-[#3B342D] rounded-xl p-5">
              <p className="text-xs font-semibold text-[#7F1D1D] dark:text-[#E6C260] mb-2">
                {t.modal.excerptHeading}
              </p>
              <p className="font-editorial text-base text-[#1C1917] dark:text-[#F5EFE6] leading-relaxed">
                {book.sampleExcerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-[#E4DDD0] dark:border-[#302A24] flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs text-[#78716C] dark:text-[#A89F92]">{t.modal.printPrice}</p>
                <p className="text-xl font-bold text-[#1C1917] dark:text-[#F5EFE6] tabular-nums">
                  {formatPriceToman(book.priceToman, locale)}
                </p>
              </div>

              {user ? (
                <button
                  type="button"
                  onClick={() => {
                    onAddToCart(book);
                    onClose();
                  }}
                  className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold bg-[#1B365D] dark:bg-[#254A7C] text-[#FBF9F5] rounded-lg hover:bg-[#142947] dark:hover:bg-[#2E5B99] transition-colors cursor-pointer min-h-[44px]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{t.modal.addToCart}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onRequireAuth(book);
                  }}
                  className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold bg-[#7F1D1D] dark:bg-[#991B1B] text-[#FBF9F5] rounded-lg hover:bg-[#661717] dark:hover:bg-[#B91C1C] transition-colors cursor-pointer min-h-[44px]"
                >
                  <Lock className="w-4 h-4" />
                  <span>{t.modal.loginToBuy}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
