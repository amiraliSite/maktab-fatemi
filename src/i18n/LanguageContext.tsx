import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type AppLocale = 'fa' | 'ar' | 'en';

interface LanguageContextValue {
  locale: AppLocale;
  setLocale: (loc: AppLocale) => void;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: 'fa',
  setLocale: () => {},
  isRtl: true
});

const LANG_STORAGE_KEY = 'maktab_lang';

const META_BY_LOCALE: Record<AppLocale, { title: string; description: string }> = {
  fa: {
    title: 'مکتب فاطمی | شهادت حضرت زهرا (س)، شیعه و آل علی و فروشگاه کتاب‌های تاریخی',
    description:
      'مرجع جامع و مستند درباره شهادت حضرت فاطمه زهرا (سلام‌الله‌علیها)، تاریخ تشیع و مکتب آل علی (علیهم‌السلام)، همراه با نقد و بررسی و خرید کتب مرجع تاریخی.'
  },
  ar: {
    title: 'المكتب الفاطمي | سيرة واستشهاد السيدة فاطمة الزهراء (ع)، التشيع وآل علي ومكتبة التاريخ',
    description:
      'مرجع تاريخي ومعرفي موثق حول سيرة واستشهاد السيدة فاطمة الزهراء (عليها السلام)، تاريخ التشيع ومدرسة آل علي (عليهم السلام)، مع معرض ثلاثي الأبعاد ومكتبة متخصصة.'
  },
  en: {
    title: 'Maktab Fatemi | Life & Martyrdom of Fatimah al-Zahra (SA), Shia Islam & Historical Books',
    description:
      'Authoritative historical archive on the life, teachings, and martyrdom of Lady Fatimah al-Zahra (SA), Shia Islam and the School of Ahl al-Bayt (AS), interactive timeline, and curated bookstore.'
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<AppLocale>(() => {
    if (typeof window === 'undefined') return 'fa';
    try {
      const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === 'fa' || saved === 'ar' || saved === 'en') return saved;
    } catch {
      // Ignore storage error
    }
    return 'fa';
  });

  useEffect(() => {
    const html = document.documentElement;
    const isRtl = locale !== 'en';
    html.lang = locale;
    html.dir = isRtl ? 'rtl' : 'ltr';
    document.title = META_BY_LOCALE[locale].title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', META_BY_LOCALE[locale].description);
    }
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, locale);
    } catch {
      // Ignore storage error
    }
  }, [locale]);

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale: setLocaleState,
        isRtl: locale !== 'en'
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
