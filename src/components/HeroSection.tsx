import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ThreeSanctuaryCanvas } from './ThreeSanctuaryCanvas';
import { ShamsehDivider } from './ShamsehDivider';
import { scrollToSection, toPersianDigits } from '../utils/formatPersian';
import { useLanguage } from '../i18n/LanguageContext';
import { UI_STRINGS } from '../i18n/uiStrings';

export function HeroSection() {
  const { locale, isRtl } = useLanguage();
  const t = UI_STRINGS[locale];
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section
      id="top"
      className="border-b border-[#E4DDD0] dark:border-[#302A24] bg-[#FBF9F5] dark:bg-[#12100E] transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 lg:pt-14 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Editorial Lead Column */}
          <div className="lg:col-span-5 flex flex-col justify-center py-2">
            <p className="text-xs font-semibold text-[#7F1D1D] dark:text-[#E6C260] mb-4">
              {t.hero.kicker}
            </p>

            <h1
              className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] dark:text-[#F5EFE6] leading-[1.35] mb-6"
              style={{ textWrap: 'balance' }}
            >
              {t.hero.title}
            </h1>

            <p className="text-base sm:text-lg text-[#44403C] dark:text-[#D5CCC0] leading-[1.85] max-w-[65ch] mb-8">
              {t.hero.description}
            </p>

            <div className="flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={() => scrollToSection('martyrdom')}
                className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold bg-[#7F1D1D] dark:bg-[#991B1B] text-[#FBF9F5] rounded-lg shadow-sm hover:shadow-md hover:bg-[#661717] dark:hover:bg-[#B91C1C] transition-all duration-150 min-h-[44px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#7F1D1D]"
              >
                <span>{t.hero.primaryCta}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('bookshop')}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold text-[#1B365D] dark:text-[#93C5FD] hover:text-[#142947] dark:hover:text-[#BFDBFE] border-b border-[#1B365D]/40 dark:border-[#93C5FD]/40 hover:border-[#1B365D] dark:hover:border-[#93C5FD] transition-colors duration-150 min-h-[44px] cursor-pointer"
              >
                <span>{t.hero.secondaryCta}</span>
              </button>
            </div>
          </div>

          {/* Interactive 3D WebGL Sanctuary & Illuminated Codex Stage */}
          <div className="lg:col-span-7 flex flex-col">
            <ThreeSanctuaryCanvas />
          </div>
        </div>

        <div className="mt-12 mb-6">
          <ShamsehDivider />
        </div>

        {/* Interactive 4-Column Architectural Summary Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.hero.strips.map((item) => (
            <button
              key={item.index}
              type="button"
              onClick={() => scrollToSection(item.target)}
              className="text-start group rounded-xl p-4 sm:p-5 bg-[#F2EDE4]/65 dark:bg-[#1A1714] border border-[#E4DDD0] dark:border-[#302A24] hover:border-[#C99E32]/70 dark:hover:border-[#D4AF37]/60 hover:bg-[#FFFFFF] dark:hover:bg-[#211D18] transition-all duration-150 cursor-pointer flex flex-col justify-between gap-2"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-bold text-[#1B365D] dark:text-[#93C5FD] group-hover:text-[#7F1D1D] dark:group-hover:text-[#E6C260] transition-colors">
                  {item.kicker}
                </p>
                <span className="tabular-nums text-xs font-bold text-[#B8862D] dark:text-[#E6C260]/80">
                  {toPersianDigits(item.index, locale)}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#57534E] dark:text-[#B8AFA2] leading-relaxed">
                {item.detail}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
