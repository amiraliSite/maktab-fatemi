import { ShoppingBag, LogIn, Moon, Sun, Globe } from 'lucide-react';
import { toPersianDigits, scrollToSection } from '../utils/formatPersian';
import { AuthUser } from '../types/auth';
import { AppLocale, useLanguage } from '../i18n/LanguageContext';
import { UI_STRINGS } from '../i18n/uiStrings';

interface HeaderProps {
  user: AuthUser | null;
  cartCount: number;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenCart: () => void;
  onOpenAuth: () => void;
}

const LOCALE_OPTIONS: Array<{ code: AppLocale; label: string; title: string }> = [
  { code: 'fa', label: 'فا', title: 'فارسی' },
  { code: 'ar', label: 'عر', title: 'العربية' },
  { code: 'en', label: 'EN', title: 'English' }
];

export function Header({
  user,
  cartCount,
  theme,
  onToggleTheme,
  onOpenCart,
  onOpenAuth
}: HeaderProps) {
  const { locale, setLocale } = useLanguage();
  const t = UI_STRINGS[locale];
  const isDark = theme === 'dark';

  const navLinks = [
    { label: t.nav.martyrdom, target: 'martyrdom' },
    { label: t.nav.shiaSchool, target: 'shia-school' },
    { label: t.nav.timeline, target: 'timeline' },
    { label: t.nav.recommended, target: 'recommended-books' },
    { label: t.nav.bookshop, target: 'bookshop' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 dark:bg-[#12100E]/95 backdrop-blur-sm border-b border-[#E4DDD0] dark:border-[#302A24] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 lg:h-16 flex items-center justify-between gap-3 sm:gap-6">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-editorial text-lg sm:text-2xl font-bold tracking-tight text-[#1C1917] dark:text-[#F5EFE6] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B365D] dark:focus-visible:ring-[#D4AF37] rounded-sm"
        >
          {t.brandName}
        </a>

        {/* Zone 2: Desktop Single-Line Navigation Links */}
        <nav
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#57534E] dark:text-[#B8AFA2]"
          aria-label="Primary navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.target}
              href={`#${link.target}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.target);
              }}
              className="py-1.5 hover:text-[#1C1917] dark:hover:text-[#F5EFE6] border-b border-transparent hover:border-[#1B365D] dark:hover:border-[#D4AF37] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B365D] dark:focus-visible:ring-[#D4AF37] rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Language Switcher + Theme Toggle + Primary Action */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* 3-Language Switcher (Persian / Arabic / English) */}
          <div
            role="group"
            aria-label="Language selection"
            className="inline-flex items-center gap-0.5 p-0.5 rounded-lg border border-[#D6CEBE] dark:border-[#3B342D] bg-[#F2EDE4] dark:bg-[#1E1A16]"
          >
            <Globe className="w-3.5 h-3.5 text-[#8C5A2B] dark:text-[#E6C260] mx-1 hidden sm:block shrink-0" />
            {LOCALE_OPTIONS.map((opt) => {
              const active = locale === opt.code;
              return (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => setLocale(opt.code)}
                  title={opt.title}
                  aria-pressed={active}
                  className={`px-2 py-1.5 text-[11px] font-bold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#1C1917] dark:bg-[#D4AF37] text-[#FBF9F5] dark:text-[#12100E]'
                      : 'text-[#57534E] dark:text-[#B8AFA2] hover:text-[#1C1917] dark:hover:text-[#F5EFE6]'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? t.header.lightAria : t.header.darkAria}
            aria-pressed={isDark}
            title={isDark ? t.header.lightMode : t.header.darkMode}
            className="inline-flex items-center justify-center gap-1.5 px-2.5 py-2 text-xs font-medium rounded-lg border border-[#D6CEBE] dark:border-[#3B342D] bg-[#F2EDE4] dark:bg-[#1E1A16] text-[#292524] dark:text-[#E6C260] hover:bg-[#EAE3D5] dark:hover:bg-[#2A241E] transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[38px] min-w-[38px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B365D] dark:focus-visible:ring-[#D4AF37] cursor-pointer"
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 shrink-0" strokeWidth={1.8} />
                <span className="hidden xl:inline">{t.header.lightMode}</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 shrink-0" strokeWidth={1.8} />
                <span className="hidden xl:inline">{t.header.darkMode}</span>
              </>
            )}
          </button>

          {user ? (
            <button
              type="button"
              onClick={onOpenCart}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium bg-[#1B365D] dark:bg-[#254A7C] text-[#FBF9F5] rounded-lg hover:bg-[#142947] dark:hover:bg-[#2E5B99] transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[38px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1B365D] cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 shrink-0" strokeWidth={1.75} />
              <span className="max-w-[90px] sm:max-w-[110px] truncate">{user.fullName}</span>
              {cartCount > 0 && (
                <span className="tabular-nums text-xs font-semibold bg-[#FBF9F5]/20 px-1.5 py-0.5 rounded">
                  {toPersianDigits(cartCount, locale)}
                </span>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenAuth}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium bg-[#7F1D1D] dark:bg-[#991B1B] text-[#FBF9F5] rounded-lg hover:bg-[#661717] dark:hover:bg-[#B91C1C] transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[38px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#7F1D1D] cursor-pointer"
            >
              <LogIn className="w-4 h-4 shrink-0" strokeWidth={1.75} />
              <span className="hidden sm:inline">{t.header.loginBuy}</span>
              <span className="sm:hidden">{locale === 'en' ? 'Sign In' : 'ورود'}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
