import { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { UI_STRINGS } from '../i18n/uiStrings';

export function ReadingProgressBar() {
  const { locale, isRtl } = useLanguage();
  const t = UI_STRINGS[locale];
  const [progress, setProgress] = useState(0);
  const [activeSectionKey, setActiveSectionKey] = useState<'martyrdom' | 'shia' | ''>('');

  useEffect(() => {
    let rafId = 0;

    const computeProgress = () => {
      rafId = 0;
      const martyrdomEl = document.getElementById('martyrdom');
      const shiaEl = document.getElementById('shia-school');
      if (!martyrdomEl || !shiaEl) return;

      const scrollY = window.scrollY;
      const viewportH = window.innerHeight;

      const martyrdomTop = martyrdomEl.getBoundingClientRect().top + scrollY;
      const shiaRect = shiaEl.getBoundingClientRect();
      const shiaTop = shiaRect.top + scrollY;
      const shiaBottom = shiaRect.bottom + scrollY;

      const startY = Math.max(0, martyrdomTop - 96);
      const endY = Math.max(startY + 1, shiaBottom - viewportH * 0.72);

      const raw = (scrollY - startY) / (endY - startY);
      const clamped = Math.min(1, Math.max(0, raw));
      setProgress(clamped);

      if (scrollY >= startY && scrollY < shiaTop - 96) {
        setActiveSectionKey('martyrdom');
      } else if (scrollY >= shiaTop - 96 && scrollY <= endY + 120) {
        setActiveSectionKey('shia');
      } else {
        setActiveSectionKey('');
      }
    };

    const scheduleUpdate = () => {
      if (rafId !== 0) return;
      rafId = window.requestAnimationFrame(computeProgress);
    };

    computeProgress();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => scheduleUpdate())
        : null;

    const martyrdomEl = document.getElementById('martyrdom');
    const shiaEl = document.getElementById('shia-school');
    if (resizeObserver) {
      if (martyrdomEl) resizeObserver.observe(martyrdomEl);
      if (shiaEl) resizeObserver.observe(shiaEl);
    }

    return () => {
      if (rafId !== 0) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      resizeObserver?.disconnect();
    };
  }, []);

  const percentage = Math.round(progress * 100);
  const label =
    activeSectionKey === 'martyrdom'
      ? t.nav.martyrdom
      : activeSectionKey === 'shia'
        ? t.nav.shiaSchool
        : t.brandName;

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percentage}
      className="fixed top-0 inset-x-0 z-50 h-1 pointer-events-none bg-[#E4DDD0]/60 dark:bg-[#302A24]/70"
    >
      <div
        className={`h-full w-full ${
          isRtl
            ? 'origin-right bg-gradient-to-l'
            : 'origin-left bg-gradient-to-r'
        } from-[#7F1D1D] via-[#991B1B] to-[#D4AF37] dark:from-[#D4AF37] dark:via-[#E6C260] dark:to-[#991B1B] transition-transform duration-100 ease-out`}
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
