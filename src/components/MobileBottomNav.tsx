import { useEffect, useState } from 'react';
import { BookOpen, Compass, Clock, Library, ShoppingBag } from 'lucide-react';
import { scrollToSection } from '../utils/formatPersian';
import { useLanguage } from '../i18n/LanguageContext';
import { UI_STRINGS } from '../i18n/uiStrings';

export function MobileBottomNav() {
  const { locale } = useLanguage();
  const t = UI_STRINGS[locale];
  const [activeId, setActiveId] = useState('martyrdom');

  const bottomTabs = [
    { id: 'martyrdom', label: t.nav.mobileLabels.martyrdom, Icon: BookOpen },
    { id: 'shia-school', label: t.nav.mobileLabels.shiaSchool, Icon: Compass },
    { id: 'timeline', label: t.nav.mobileLabels.timeline, Icon: Clock },
    { id: 'recommended-books', label: t.nav.mobileLabels.recommended, Icon: Library },
    { id: 'bookshop', label: t.nav.mobileLabels.bookshop, Icon: ShoppingBag }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target.id) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: 0.05 }
    );

    const ids = ['martyrdom', 'shia-school', 'timeline', 'recommended-books', 'bookshop'];
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Mobile bottom navigation"
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 h-14 bg-[#FBF9F5]/95 dark:bg-[#12100E]/95 backdrop-blur-sm border-t border-[#E4DDD0] dark:border-[#302A24] grid grid-cols-5 transition-colors duration-200"
    >
      {bottomTabs.map(({ id, label, Icon }) => {
        const isActive = activeId === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => {
              setActiveId(id);
              scrollToSection(id);
            }}
            className={`flex flex-col items-center justify-center gap-0.5 text-[10px] font-semibold transition-colors cursor-pointer whitespace-nowrap px-1 ${
              isActive
                ? 'text-[#7F1D1D] dark:text-[#E6C260] bg-[#F2EDE4]/70 dark:bg-[#1E1A16]'
                : 'text-[#57534E] dark:text-[#B8AFA2] hover:text-[#1C1917] dark:hover:text-[#F5EFE6]'
            }`}
          >
            <Icon className="w-4 h-4 shrink-0" strokeWidth={isActive ? 2.1 : 1.7} />
            <span className="truncate max-w-full">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
