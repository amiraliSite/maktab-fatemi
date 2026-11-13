import type { AppLocale } from '../i18n/LanguageContext';

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
const ARABIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

export function toPersianDigits(input: number | string, locale: AppLocale = 'fa'): string {
  const str = String(input);
  if (locale === 'en') return str;
  const table = locale === 'ar' ? ARABIC_DIGITS : PERSIAN_DIGITS;
  return str.replace(/\d/g, (d) => table[Number(d)]);
}

export function formatPriceToman(amount: number, locale: AppLocale = 'fa'): string {
  const formatted = amount.toLocaleString('en-US');
  if (locale === 'en') {
    return `${formatted} Toman`;
  }
  const sepFormatted = formatted.replace(/,/g, '٬');
  if (locale === 'ar') {
    return `${toPersianDigits(sepFormatted, 'ar')} تومان`;
  }
  return `${toPersianDigits(sepFormatted, 'fa')} تومان`;
}

export function scrollToSection(sectionId: string): void {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
