import { useState, FormEvent } from 'react';
import { ArrowLeft, ArrowRight, Lock, UserPlus, LogIn, Sparkles } from 'lucide-react';
import { ThreeAuthBackdrop } from './ThreeAuthBackdrop';
import { TiltCard3D } from './TiltCard3D';
import { AuthUser } from '../types/auth';
import { loginAccount, registerAccount } from '../services/authService';
import { AppLocale, useLanguage } from '../i18n/LanguageContext';
import { UI_STRINGS } from '../i18n/uiStrings';

interface AuthPageProps {
  pendingBookTitle?: string | null;
  onAuthSuccess: (user: AuthUser, token: string) => void;
  onBackToSite: () => void;
}

const LOCALE_OPTIONS: Array<{ code: AppLocale; label: string }> = [
  { code: 'fa', label: 'فا' },
  { code: 'ar', label: 'عر' },
  { code: 'en', label: 'EN' }
];

export function AuthPage({ pendingBookTitle, onAuthSuccess, onBackToSite }: AuthPageProps) {
  const { locale, setLocale, isRtl } = useLanguage();
  const t = UI_STRINGS[locale];
  const BackArrow = isRtl ? ArrowRight : ArrowLeft;

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    try {
      const result =
        mode === 'login'
          ? await loginAccount(email, password)
          : await registerAccount({ fullName, email, phone, password });

      onAuthSuccess(result.user, result.token);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : t.auth.genericError);
    } finally {
      setSubmitting(false);
    }
  };

  const fillDemoAccount = () => {
    setMode('login');
    setEmail('reader@maktab.ir');
    setPassword('fatemi1405');
    setErrorMsg('');
  };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="relative min-h-screen w-full overflow-hidden bg-[#0F131A] text-[#FBF9F5] flex flex-col justify-between"
    >
      <ThreeAuthBackdrop />

      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBackToSite}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-[#1C1917]/90 border border-[#3F362E] text-[#FBF9F5] hover:bg-[#292524] transition-colors cursor-pointer"
        >
          <BackArrow className="w-4 h-4" />
          <span>{t.auth.backToSite}</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-0.5 p-0.5 rounded-lg border border-[#3F362E] bg-[#1C1917]/90">
            {LOCALE_OPTIONS.map((opt) => (
              <button
                key={opt.code}
                type="button"
                onClick={() => setLocale(opt.code)}
                className={`px-2 py-1 text-[11px] font-bold rounded-md cursor-pointer ${
                  locale === opt.code
                    ? 'bg-[#D4AF37] text-[#12100E]'
                    : 'text-[#DED6C8] hover:text-[#FFFFFF]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <span className="font-editorial text-xl font-bold text-[#E6C260]">{t.brandName}</span>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 space-y-5 text-start">
          <p className="text-xs font-semibold text-[#E6C260]">{t.auth.kicker}</p>
          <h1
            className="font-editorial text-3xl sm:text-5xl font-bold text-[#FBF9F5] leading-[1.35]"
            style={{ textWrap: 'balance' }}
          >
            {t.auth.headline}
          </h1>
          <p className="text-sm sm:text-base text-[#D6CEBE] leading-[1.85] max-w-lg">
            {t.auth.lead}
          </p>

          {pendingBookTitle && (
            <div className="bg-[#1C1917]/92 border border-[#D4AF37]/60 rounded-xl p-4 max-w-lg flex items-start gap-3">
              <Lock className="w-5 h-5 text-[#E6C260] shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-[#FBF9F5] mb-0.5">
                  {t.auth.pendingTitle(pendingBookTitle)}
                </p>
                <p className="text-xs text-[#D6CEBE]">{t.auth.pendingDesc}</p>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <TiltCard3D maxTilt={4} className="w-full max-w-md">
            <div className="bg-[#FBF9F5] dark:bg-[#1A1714] text-[#1C1917] dark:text-[#F5EFE6] rounded-2xl border border-[#D6CEBE] dark:border-[#3B342D] p-6 sm:p-8 shadow-2xl">
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#EAE3D5] dark:bg-[#24201B] rounded-xl mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setErrorMsg('');
                  }}
                  className={`py-2.5 text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                    mode === 'login'
                      ? 'bg-[#1C1917] dark:bg-[#D4AF37] text-[#FBF9F5] dark:text-[#12100E] shadow-sm'
                      : 'text-[#57534E] dark:text-[#B8AFA2] hover:text-[#1C1917] dark:hover:text-[#F5EFE6]'
                  }`}
                >
                  <LogIn className="w-4 h-4" />
                  <span>{t.auth.loginTab}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setErrorMsg('');
                  }}
                  className={`py-2.5 text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                    mode === 'register'
                      ? 'bg-[#1C1917] dark:bg-[#D4AF37] text-[#FBF9F5] dark:text-[#12100E] shadow-sm'
                      : 'text-[#57534E] dark:text-[#B8AFA2] hover:text-[#1C1917] dark:hover:text-[#F5EFE6]'
                  }`}
                >
                  <UserPlus className="w-4 h-4" />
                  <span>{t.auth.registerTab}</span>
                </button>
              </div>

              <h2 className="font-editorial text-2xl font-bold text-[#1C1917] dark:text-[#F5EFE6] mb-1">
                {mode === 'login' ? t.auth.welcomeTitle : t.auth.registerTitle}
              </h2>
              <p className="text-xs text-[#57534E] dark:text-[#B8AFA2] mb-6">
                {mode === 'login' ? t.auth.welcomeSub : t.auth.registerSub}
              </p>

              {errorMsg && (
                <div className="mb-4 p-3 rounded-lg bg-[#7F1D1D]/10 dark:bg-[#7F1D1D]/25 border border-[#7F1D1D]/30 text-xs font-medium text-[#7F1D1D] dark:text-[#FCA5A5]">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'register' && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-[#292524] dark:text-[#DED6C8] mb-1.5">
                        {t.auth.fullName}
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-[#FFFFFF] dark:bg-[#12100E] border border-[#D6CEBE] dark:border-[#3B342D] rounded-lg text-[#1C1917] dark:text-[#F5EFE6] focus:outline-none focus:ring-2 focus:ring-[#1B365D] dark:focus:ring-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#292524] dark:text-[#DED6C8] mb-1.5">
                        {t.auth.phoneOpt}
                      </label>
                      <input
                        type="tel"
                        dir="ltr"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="09120000000"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#FFFFFF] dark:bg-[#12100E] border border-[#D6CEBE] dark:border-[#3B342D] rounded-lg text-[#1C1917] dark:text-[#F5EFE6] text-left tabular-nums focus:outline-none focus:ring-2 focus:ring-[#1B365D] dark:focus:ring-[#D4AF37]"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-xs font-semibold text-[#292524] dark:text-[#DED6C8] mb-1.5">
                    {t.auth.email}
                  </label>
                  <input
                    type="email"
                    dir="ltr"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FFFFFF] dark:bg-[#12100E] border border-[#D6CEBE] dark:border-[#3B342D] rounded-lg text-[#1C1917] dark:text-[#F5EFE6] text-left focus:outline-none focus:ring-2 focus:ring-[#1B365D] dark:focus:ring-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#292524] dark:text-[#DED6C8] mb-1.5">
                    {t.auth.password}
                  </label>
                  <input
                    type="password"
                    dir="ltr"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t.auth.passwordHint}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FFFFFF] dark:bg-[#12100E] border border-[#D6CEBE] dark:border-[#3B342D] rounded-lg text-[#1C1917] dark:text-[#F5EFE6] text-left focus:outline-none focus:ring-2 focus:ring-[#1B365D] dark:focus:ring-[#D4AF37]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 text-sm font-semibold bg-[#1B365D] dark:bg-[#254A7C] text-[#FBF9F5] rounded-lg hover:bg-[#142947] dark:hover:bg-[#2E5B99] transition-colors disabled:opacity-60 cursor-pointer"
                >
                  {submitting
                    ? t.auth.checking
                    : mode === 'login'
                      ? t.auth.loginSubmit
                      : t.auth.registerSubmit}
                </button>
              </form>

              <div className="mt-5 pt-4 border-t border-[#E4DDD0] dark:border-[#302A24] flex flex-col gap-2">
                <button
                  type="button"
                  onClick={fillDemoAccount}
                  className="w-full py-2.5 px-3 text-xs font-medium rounded-lg bg-[#F2EDE4] dark:bg-[#24201B] hover:bg-[#E4DDD0] dark:hover:bg-[#2E2923] text-[#1C1917] dark:text-[#F5EFE6] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#8C5A2B] dark:text-[#E6C260]" />
                  <span>{t.auth.demoFill}</span>
                </button>
              </div>
            </div>
          </TiltCard3D>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-5 text-xs text-[#A8A29E] flex justify-between items-center">
        <span>{t.auth.footerLeft}</span>
        <span>{t.auth.footerRight}</span>
      </div>
    </div>
  );
}
