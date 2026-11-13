import { useState, useEffect, useMemo } from 'react';
import { Check } from 'lucide-react';
import { Header } from './components/Header';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ReadingProgressBar } from './components/ReadingProgressBar';
import { TopSacred3DShowcase } from './components/TopSacred3DShowcase';
import { HeroSection } from './components/HeroSection';
import { MartyrdomSection } from './components/MartyrdomSection';
import { ShiaSection } from './components/ShiaSection';
import { TimelineSection } from './components/TimelineSection';
import { RecommendedBooksSection } from './components/RecommendedBooksSection';
import { BookstoreSection } from './components/BookstoreSection';
import { BookDetailModal } from './components/BookDetailModal';
import { CartDrawer, CartEntry } from './components/CartDrawer';
import { AuthPage } from './components/AuthPage';
import { Footer } from './components/Footer';
import { FATIMAH_CHAPTERS } from './data/fatimahLifeAndTeachings';
import { BookItem } from './data/shiaAndBooksData';
import { getLocalizedBooks } from './data/localizedContent';
import { TimelineEvent } from './data/timelineEvents';
import { AuthUser } from './types/auth';
import { getStoredToken, logoutAccount, restoreSession, storeToken } from './services/authService';
import { scrollToSection } from './utils/formatPersian';
import { useLanguage } from './i18n/LanguageContext';
import { UI_STRINGS } from './i18n/uiStrings';

export default function App() {
  const { locale, isRtl } = useLanguage();
  const t = UI_STRINGS[locale];
  const localizedBooks = useMemo(() => getLocalizedBooks(locale), [locale]);

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    try {
      return window.localStorage.getItem('maktab_theme') === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  const [user, setUser] = useState<AuthUser | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(() => getStoredToken());
  const [authViewOpen, setAuthViewOpen] = useState(false);
  const [pendingBookId, setPendingBookId] = useState<string | null>(null);

  const [activeChapterId, setActiveChapterId] = useState(FATIMAH_CHAPTERS[0].id);
  const [inspectedBookId, setInspectedBookId] = useState<string | null>(null);
  const [cartQuantities, setCartQuantities] = useState<Array<{ bookId: string; quantity: number }>>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const inspectedBook = useMemo(
    () => (inspectedBookId ? localizedBooks.find((b) => b.id === inspectedBookId) || null : null),
    [inspectedBookId, localizedBooks]
  );

  const pendingBook = useMemo(
    () => (pendingBookId ? localizedBooks.find((b) => b.id === pendingBookId) || null : null),
    [pendingBookId, localizedBooks]
  );

  const cartItems: CartEntry[] = useMemo(
    () =>
      cartQuantities
        .map((entry) => {
          const book = localizedBooks.find((b) => b.id === entry.bookId);
          return book ? { book, quantity: entry.quantity } : null;
        })
        .filter((x): x is CartEntry => x !== null),
    [cartQuantities, localizedBooks]
  );

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      window.localStorage.setItem('maktab_theme', theme);
    } catch {
      // Ignore storage restriction
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    let cancelled = false;
    restoreSession().then((res) => {
      if (!cancelled && res) {
        setUser(res.user);
        setAuthToken(res.token);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const totalCartCount = cartItems.reduce((sum, entry) => sum + entry.quantity, 0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const addBookToCartInternal = (book: BookItem) => {
    setCartQuantities((prev) => {
      const existing = prev.find((item) => item.bookId === book.id);
      if (existing) {
        return prev.map((item) =>
          item.bookId === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { bookId: book.id, quantity: 1 }];
    });
    showToast(t.toast.addedToCart(book.title));
  };

  const handleRequireAuth = (book?: BookItem) => {
    if (book) {
      setPendingBookId(book.id);
    }
    setAuthViewOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (book: BookItem) => {
    if (!user) {
      handleRequireAuth(book);
      return;
    }
    addBookToCartInternal(book);
  };

  const handleAuthSuccess = (loggedInUser: AuthUser, token: string) => {
    setUser(loggedInUser);
    setAuthToken(token);
    storeToken(token);
    setAuthViewOpen(false);

    if (pendingBook) {
      const targetBook = pendingBook;
      setPendingBookId(null);
      addBookToCartInternal(targetBook);
      setCartOpen(true);
    } else {
      showToast(t.toast.welcomeUser(loggedInUser.fullName));
    }
  };

  const handleLogout = async () => {
    await logoutAccount();
    setUser(null);
    setAuthToken(null);
    setCartQuantities([]);
    setCartOpen(false);
    showToast(t.toast.loggedOut);
  };

  const handleUpdateQty = (bookId: string, delta: number) => {
    setCartQuantities((prev) =>
      prev
        .map((entry) =>
          entry.bookId === bookId ? { ...entry, quantity: entry.quantity + delta } : entry
        )
        .filter((entry) => entry.quantity > 0)
    );
  };

  const handleRemoveItem = (bookId: string) => {
    setCartQuantities((prev) => prev.filter((entry) => entry.bookId !== bookId));
  };

  const handleTimelineNavigate = (target: TimelineEvent['relatedTarget']) => {
    if (target.chapterId) {
      setActiveChapterId(target.chapterId);
    }
    if (target.bookId) {
      setInspectedBookId(target.bookId);
      return;
    }
    scrollToSection(target.sectionId);
  };

  if (authViewOpen) {
    return (
      <AuthPage
        pendingBookTitle={pendingBook?.title || null}
        onAuthSuccess={handleAuthSuccess}
        onBackToSite={() => {
          setPendingBookId(null);
          setAuthViewOpen(false);
        }}
      />
    );
  }

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-screen flex flex-col bg-[#FBF9F5] dark:bg-[#12100E] text-[#1C1917] dark:text-[#F5EFE6] pb-14 lg:pb-0 transition-colors duration-200"
    >
      <ReadingProgressBar />
      <Header
        user={user}
        cartCount={totalCartCount}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenCart={() => {
          if (!user) {
            handleRequireAuth();
            return;
          }
          setCartOpen(true);
        }}
        onOpenAuth={() => handleRequireAuth()}
      />

      <main className="flex-1">
        <TopSacred3DShowcase />
        <HeroSection />
        <MartyrdomSection
          activeChapterId={activeChapterId}
          onSelectChapter={setActiveChapterId}
        />
        <ShiaSection />
        <TimelineSection onNavigateTarget={handleTimelineNavigate} />
        <RecommendedBooksSection onInspectBook={(book) => setInspectedBookId(book.id)} />
        <BookstoreSection
          user={user}
          onAddToCart={handleAddToCart}
          onInspectBook={(book) => setInspectedBookId(book.id)}
          onRequireAuth={handleRequireAuth}
        />
      </main>

      <Footer />
      <MobileBottomNav />

      <BookDetailModal
        book={inspectedBook}
        user={user}
        onClose={() => setInspectedBookId(null)}
        onAddToCart={handleAddToCart}
        onRequireAuth={handleRequireAuth}
      />

      <CartDrawer
        isOpen={cartOpen}
        user={user}
        authToken={authToken}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCartQuantities([])}
        onLogout={handleLogout}
        onRequireAuth={() => handleRequireAuth()}
      />

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-16 lg:bottom-5 ${isRtl ? 'left-4 lg:left-5' : 'right-4 lg:right-5'} z-40 flex items-center gap-2.5 bg-[#1C1917] dark:bg-[#24201C] text-[#FBF9F5] px-4 py-3 rounded-xl shadow-lg border border-[#292524] dark:border-[#3B342D] text-sm`}
        >
          <Check className="w-4 h-4 text-[#D97706] shrink-0" />
          <span>{toastMessage}</span>
          {user && cartItems.length > 0 && (
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="text-xs font-semibold text-[#FCD34D] hover:underline mx-1 cursor-pointer"
            >
              {t.toast.viewCart}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
