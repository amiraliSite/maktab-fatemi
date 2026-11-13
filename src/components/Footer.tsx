import { scrollToSection } from '../utils/formatPersian';
import { ShamsehDivider } from './ShamsehDivider';
import { useLanguage } from '../i18n/LanguageContext';
import { UI_STRINGS } from '../i18n/uiStrings';

export function Footer() {
  const { locale } = useLanguage();
  const t = UI_STRINGS[locale];

  return (
    <footer className="bg-[#1C1917] dark:bg-[#0B0A09] text-[#E7E5E4] border-t border-[#D4AF37]/30 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#292524]">
          <div className="md:col-span-6 space-y-3">
            <p className="font-editorial text-2xl font-bold text-[#E6C260]">{t.brandName}</p>
            <p className="text-sm text-[#B8AFA2] leading-relaxed max-w-md">{t.footer.description}</p>
          </div>

          <div className="md:col-span-3 space-y-2.5">
            <p className="text-xs font-semibold text-[#E6C260]">{t.footer.researchHeading}</p>
            <ul className="space-y-2 text-sm text-[#B8AFA2]">
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('martyrdom')}
                  className="hover:text-[#FBF9F5] transition-colors cursor-pointer"
                >
                  {t.footer.link1}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('shia-school')}
                  className="hover:text-[#FBF9F5] transition-colors cursor-pointer"
                >
                  {t.footer.link2}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('timeline')}
                  className="hover:text-[#FBF9F5] transition-colors cursor-pointer"
                >
                  {t.footer.link3}
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-2.5">
            <p className="text-xs font-semibold text-[#E6C260]">{t.footer.shopHeading}</p>
            <ul className="space-y-2 text-sm text-[#B8AFA2]">
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('recommended-books')}
                  className="hover:text-[#FBF9F5] transition-colors cursor-pointer"
                >
                  {t.footer.link4}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('bookshop')}
                  className="hover:text-[#FBF9F5] transition-colors cursor-pointer"
                >
                  {t.footer.link5}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <ShamsehDivider className="my-6 opacity-60" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A89F92]">
          <p>{t.footer.copyright}</p>
          <p>{t.footer.sourcesNote}</p>
        </div>
      </div>
    </footer>
  );
}
