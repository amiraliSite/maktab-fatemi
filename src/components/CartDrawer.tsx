import { useState, useEffect, FormEvent } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  ShoppingBag,
  LogOut,
  Package,
  User as UserIcon
} from 'lucide-react';
import { BookItem } from '../data/shiaAndBooksData';
import { formatPriceToman, toPersianDigits } from '../utils/formatPersian';
import { SafeImage } from './SafeImage';
import { AuthUser, ServerOrder } from '../types/auth';
import { fetchUserOrders, submitOrder } from '../services/authService';
import { useLanguage } from '../i18n/LanguageContext';
import { UI_STRINGS } from '../i18n/uiStrings';

export interface CartEntry {
  book: BookItem;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  user: AuthUser | null;
  authToken: string | null;
  items: CartEntry[];
  onClose: () => void;
  onUpdateQty: (bookId: string, delta: number) => void;
  onRemoveItem: (bookId: string) => void;
  onClearCart: () => void;
  onLogout: () => void;
  onRequireAuth: () => void;
}

const FREE_SHIPPING_THRESHOLD = 800000;
const SHIPPING_FEE = 45000;

export function CartDrawer({
  isOpen,
  user,
  authToken,
  items,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onLogout,
  onRequireAuth
}: CartDrawerProps) {
  const { locale, isRtl } = useLanguage();
  const t = UI_STRINGS[locale];

  const [activeTab, setActiveTab] = useState<'cart' | 'orders'>('cart');
  const [step, setStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'cod'>('online');
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<ServerOrder | null>(null);
  const [pastOrders, setPastOrders] = useState<ServerOrder[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    if (user) {
      setFullName((prev) => prev || user.fullName);
      setPhone((prev) => prev || user.phone || '');
    }
  }, [user]);

  useEffect(() => {
    if (!isOpen || !user || activeTab !== 'orders') return;
    let cancelled = false;
    setLoadingOrders(true);
    fetchUserOrders(authToken)
      .then((orders) => {
        if (!cancelled) setPastOrders(orders);
      })
      .finally(() => {
        if (!cancelled) setLoadingOrders(false);
      });
    return () => {
      cancelled = true;
    };
  }, [isOpen, user, activeTab, authToken]);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, entry) => sum + entry.book.priceToman * entry.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const grandTotal = subtotal + shipping;

  const handleCheckoutSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) {
      onClose();
      onRequireAuth();
      return;
    }

    if (!fullName.trim() || !phone.trim() || !city.trim() || !address.trim()) {
      setFormError(t.cart.fillRequiredError);
      return;
    }

    setFormError('');
    setSubmitting(true);

    try {
      const order = await submitOrder(authToken, {
        customerName: fullName.trim(),
        phone: phone.trim(),
        city: city.trim(),
        address: address.trim(),
        postalCode: postalCode.trim(),
        paymentMethod,
        items: items.map((entry) => ({
          bookId: entry.book.id,
          title: entry.book.title,
          quantity: entry.quantity,
          unitPriceToman: entry.book.priceToman
        }))
      });

      setConfirmedOrder(order);
      onClearCart();
      setStep('confirmed');
    } catch (err) {
      if (err instanceof Error && err.message === 'UNAUTHORIZED') {
        onClose();
        onRequireAuth();
        return;
      }
      setFormError(err instanceof Error ? err.message : t.cart.submitError);
    } finally {
      setSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setStep('cart');
    setConfirmedOrder(null);
    setFormError('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/50 dark:bg-black/70 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label={t.cart.titleCart}
      onClick={resetAndClose}
    >
      <div
        className={`w-full max-w-md bg-[#FBF9F5] dark:bg-[#12100E] h-full flex flex-col ${
          isRtl ? 'border-r' : 'border-l'
        } border-[#D6CEBE] dark:border-[#302A24] shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-[#E4DDD0] dark:border-[#302A24] bg-[#FFFFFF] dark:bg-[#1A1714] space-y-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#1B365D] dark:text-[#93C5FD]" />
              <h2 className="font-editorial text-xl font-bold text-[#1C1917] dark:text-[#F5EFE6]">
                {activeTab === 'orders'
                  ? t.cart.titleOrders
                  : step === 'checkout'
                    ? t.cart.titleCheckout
                    : step === 'confirmed'
                      ? t.cart.titleConfirmed
                      : t.cart.titleCart}
              </h2>
            </div>

            <button
              type="button"
              onClick={resetAndClose}
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[#E4DDD0] dark:border-[#3B342D] text-[#292524] dark:text-[#DED6C8] hover:bg-[#F2EDE4] dark:hover:bg-[#24201B] cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {user && (
            <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#E4DDD0] dark:border-[#302A24] text-xs">
              <div className="flex items-center gap-1.5 text-[#44403C] dark:text-[#D5CCC0] min-w-0">
                <UserIcon className="w-3.5 h-3.5 text-[#1B365D] dark:text-[#93C5FD] shrink-0" />
                <span className="font-semibold truncate">{user.fullName}</span>
                <span className="text-[#78716C] dark:text-[#A89F92] truncate">({user.email})</span>
              </div>

              <button
                type="button"
                onClick={onLogout}
                className="inline-flex items-center gap-1 text-[#7F1D1D] dark:text-[#FCA5A5] hover:underline shrink-0 font-medium cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{t.cart.logout}</span>
              </button>
            </div>
          )}

          {user && (
            <div className="grid grid-cols-2 gap-1 p-1 bg-[#F2EDE4] dark:bg-[#24201B] rounded-lg">
              <button
                type="button"
                onClick={() => setActiveTab('cart')}
                className={`py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeTab === 'cart'
                    ? 'bg-[#FFFFFF] dark:bg-[#12100E] text-[#1C1917] dark:text-[#E6C260] shadow-sm'
                    : 'text-[#57534E] dark:text-[#B8AFA2] hover:text-[#1C1917] dark:hover:text-[#F5EFE6]'
                }`}
              >
                {t.cart.tabCart(
                  toPersianDigits(
                    items.reduce((s, i) => s + i.quantity, 0),
                    locale
                  )
                )}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('orders')}
                className={`py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeTab === 'orders'
                    ? 'bg-[#FFFFFF] dark:bg-[#12100E] text-[#1C1917] dark:text-[#E6C260] shadow-sm'
                    : 'text-[#57534E] dark:text-[#B8AFA2] hover:text-[#1C1917] dark:hover:text-[#F5EFE6]'
                }`}
              >
                {t.cart.tabOrders}
              </button>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'orders' ? (
            loadingOrders ? (
              <p className="text-sm text-[#57534E] dark:text-[#B8AFA2] text-center py-12">
                {t.cart.loadingOrders}
              </p>
            ) : pastOrders.length === 0 ? (
              <div className="py-16 text-center space-y-2">
                <Package className="w-10 h-10 text-[#A8A29E] mx-auto" strokeWidth={1.5} />
                <p className="font-editorial text-xl font-bold text-[#1C1917] dark:text-[#F5EFE6]">
                  {t.cart.noOrdersTitle}
                </p>
                <p className="text-sm text-[#57534E] dark:text-[#B8AFA2]">{t.cart.noOrdersDesc}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pastOrders.map((ord) => (
                  <div
                    key={ord.orderCode}
                    className="bg-[#FFFFFF] dark:bg-[#1A1714] border border-[#E4DDD0] dark:border-[#302A24] rounded-xl p-4 space-y-2.5 text-xs"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-[#E4DDD0] dark:border-[#302A24]">
                      <span className="font-bold text-[#1B365D] dark:text-[#93C5FD] tabular-nums">
                        {ord.orderCode}
                      </span>
                      <span className="text-[#78716C] dark:text-[#A89F92]">{ord.city}</span>
                    </div>
                    <ul className="space-y-1 text-[#292524] dark:text-[#E7DFD3]">
                      {ord.items.map((it) => (
                        <li key={it.bookId} className="flex justify-between">
                          <span>
                            {it.title} × {toPersianDigits(it.quantity, locale)}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-2 border-t border-[#E4DDD0] dark:border-[#302A24] flex justify-between font-bold text-[#1C1917] dark:text-[#F5EFE6]">
                      <span>{t.cart.totalAmount}</span>
                      <span className="tabular-nums">{formatPriceToman(ord.totalToman, locale)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : step === 'confirmed' && confirmedOrder ? (
            <div className="py-6 text-center space-y-5">
              <div className="w-12 h-12 rounded-full bg-[#14532D]/10 dark:bg-[#6EE7B7]/15 text-[#14532D] dark:text-[#6EE7B7] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <h3 className="font-editorial text-2xl font-bold text-[#1C1917] dark:text-[#F5EFE6] mb-2">
                  {t.cart.confirmedTitle}
                </h3>
                <p className="text-sm text-[#57534E] dark:text-[#B8AFA2]">
                  {t.cart.confirmedDesc(confirmedOrder.city)}
                </p>
              </div>

              <dl className="bg-[#FFFFFF] dark:bg-[#1A1714] border border-[#E4DDD0] dark:border-[#302A24] rounded-xl p-5 text-start space-y-3 text-sm">
                <div className="flex justify-between pb-2 border-b border-[#E4DDD0] dark:border-[#302A24]">
                  <dt className="text-[#78716C] dark:text-[#A89F92]">{t.cart.orderCode}</dt>
                  <dd className="font-bold text-[#1B365D] dark:text-[#93C5FD] tabular-nums">
                    {confirmedOrder.orderCode}
                  </dd>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#E4DDD0] dark:border-[#302A24]">
                  <dt className="text-[#78716C] dark:text-[#A89F92]">{t.cart.recipient}</dt>
                  <dd className="font-medium text-[#1C1917] dark:text-[#F5EFE6]">
                    {confirmedOrder.customerName}
                  </dd>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#E4DDD0] dark:border-[#302A24]">
                  <dt className="text-[#78716C] dark:text-[#A89F92]">{t.cart.paymentMethod}</dt>
                  <dd className="font-medium text-[#1C1917] dark:text-[#F5EFE6]">
                    {confirmedOrder.paymentMethod === 'online' ? t.cart.onlinePay : t.cart.codPay}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#78716C] dark:text-[#A89F92]">{t.cart.finalAmount}</dt>
                  <dd className="font-bold text-[#1C1917] dark:text-[#F5EFE6] tabular-nums">
                    {formatPriceToman(confirmedOrder.totalToman, locale)}
                  </dd>
                </div>
              </dl>

              <button
                type="button"
                onClick={resetAndClose}
                className="w-full py-3 text-sm font-semibold bg-[#1B365D] dark:bg-[#254A7C] text-[#FBF9F5] rounded-lg hover:bg-[#142947] dark:hover:bg-[#2E5B99] cursor-pointer"
              >
                {t.cart.backToLibrary}
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <ShoppingBag className="w-10 h-10 text-[#A8A29E] mx-auto" strokeWidth={1.5} />
              <p className="font-editorial text-xl font-bold text-[#1C1917] dark:text-[#F5EFE6]">
                {t.cart.emptyCartTitle}
              </p>
              <p className="text-sm text-[#57534E] dark:text-[#B8AFA2]">{t.cart.emptyCartDesc}</p>
            </div>
          ) : step === 'cart' ? (
            <div className="space-y-4">
              <div className="bg-[#F2EDE4] dark:bg-[#1A1714] border border-[#E4DDD0] dark:border-[#302A24] rounded-lg p-3.5 text-xs text-[#44403C] dark:text-[#D5CCC0]">
                {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                  <span className="font-semibold text-[#14532D] dark:text-[#6EE7B7]">
                    {t.cart.freeShipQualified}
                  </span>
                ) : (
                  <span>
                    {t.cart.freeShipRemaining(
                      formatPriceToman(FREE_SHIPPING_THRESHOLD - subtotal, locale)
                    )}
                  </span>
                )}
              </div>

              {items.map(({ book, quantity }) => (
                <div
                  key={book.id}
                  className="bg-[#FFFFFF] dark:bg-[#1A1714] border border-[#E4DDD0] dark:border-[#302A24] rounded-xl p-3.5 flex gap-3.5 items-start"
                >
                  <div className="w-16 aspect-[3/4] rounded-md overflow-hidden border border-[#E4DDD0] dark:border-[#302A24] shrink-0 bg-[#F2EDE4] dark:bg-[#24201B]">
                    <SafeImage
                      src={book.coverImage}
                      alt={book.title}
                      fallbackTitle={book.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-[#1C1917] dark:text-[#F5EFE6] leading-snug mb-1">
                      {book.title}
                    </h3>
                    <p className="text-xs text-[#78716C] dark:text-[#A89F92] mb-2">{book.author}</p>
                    <p className="text-sm font-bold text-[#1B365D] dark:text-[#E6C260] tabular-nums mb-3">
                      {formatPriceToman(book.priceToman * quantity, locale)}
                    </p>

                    <div className="flex items-center justify-between gap-2">
                      <div className="inline-flex items-center border border-[#D6CEBE] dark:border-[#3B342D] rounded-lg bg-[#FBF9F5] dark:bg-[#12100E]">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(book.id, 1)}
                          className="w-8 h-8 inline-flex items-center justify-center text-[#1C1917] dark:text-[#F5EFE6] hover:bg-[#F2EDE4] dark:hover:bg-[#24201B] cursor-pointer"
                          aria-label="+"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-semibold tabular-nums">
                          {toPersianDigits(quantity, locale)}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(book.id, -1)}
                          className="w-8 h-8 inline-flex items-center justify-center text-[#1C1917] dark:text-[#F5EFE6] hover:bg-[#F2EDE4] dark:hover:bg-[#24201B] cursor-pointer"
                          aria-label="-"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(book.id)}
                        className="p-2 text-[#78716C] dark:text-[#A89F92] hover:text-[#7F1D1D] dark:hover:text-[#FCA5A5] cursor-pointer"
                        aria-label={book.title}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
              {formError && (
                <div className="p-3 rounded-lg bg-[#7F1D1D]/10 dark:bg-[#7F1D1D]/25 border border-[#7F1D1D]/30 text-xs font-medium text-[#7F1D1D] dark:text-[#FCA5A5]">
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#292524] dark:text-[#DED6C8] mb-1.5">
                  {t.cart.nameLabel}
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FFFFFF] dark:bg-[#1A1714] border border-[#D6CEBE] dark:border-[#3B342D] rounded-lg text-[#1C1917] dark:text-[#F5EFE6] focus:outline-none focus:ring-2 focus:ring-[#1B365D] dark:focus:ring-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#292524] dark:text-[#DED6C8] mb-1.5">
                    {t.cart.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    dir="ltr"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="09120000000"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FFFFFF] dark:bg-[#1A1714] border border-[#D6CEBE] dark:border-[#3B342D] rounded-lg text-[#1C1917] dark:text-[#F5EFE6] text-left tabular-nums focus:outline-none focus:ring-2 focus:ring-[#1B365D] dark:focus:ring-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#292524] dark:text-[#DED6C8] mb-1.5">
                    {t.cart.cityLabel}
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FFFFFF] dark:bg-[#1A1714] border border-[#D6CEBE] dark:border-[#3B342D] rounded-lg text-[#1C1917] dark:text-[#F5EFE6] focus:outline-none focus:ring-2 focus:ring-[#1B365D] dark:focus:ring-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#292524] dark:text-[#DED6C8] mb-1.5">
                  {t.cart.addressLabel}
                </label>
                <textarea
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FFFFFF] dark:bg-[#1A1714] border border-[#D6CEBE] dark:border-[#3B342D] rounded-lg text-[#1C1917] dark:text-[#F5EFE6] focus:outline-none focus:ring-2 focus:ring-[#1B365D] dark:focus:ring-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#292524] dark:text-[#DED6C8] mb-1.5">
                  {t.cart.postalLabel}
                </label>
                <input
                  type="text"
                  dir="ltr"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="1415512345"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FFFFFF] dark:bg-[#1A1714] border border-[#D6CEBE] dark:border-[#3B342D] rounded-lg text-[#1C1917] dark:text-[#F5EFE6] text-left tabular-nums focus:outline-none focus:ring-2 focus:ring-[#1B365D] dark:focus:ring-[#D4AF37]"
                />
              </div>

              <div>
                <p className="text-xs font-semibold text-[#292524] dark:text-[#DED6C8] mb-2">
                  {t.cart.payMethodLabel}
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('online')}
                    className={`p-3 text-xs font-semibold rounded-lg border text-center cursor-pointer ${
                      paymentMethod === 'online'
                        ? 'bg-[#1B365D] dark:bg-[#254A7C] text-[#FBF9F5] border-[#1B365D]'
                        : 'bg-[#FFFFFF] dark:bg-[#1A1714] text-[#292524] dark:text-[#DED6C8] border-[#D6CEBE] dark:border-[#3B342D]'
                    }`}
                  >
                    {t.cart.onlinePay}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 text-xs font-semibold rounded-lg border text-center cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'bg-[#1B365D] dark:bg-[#254A7C] text-[#FBF9F5] border-[#1B365D]'
                        : 'bg-[#FFFFFF] dark:bg-[#1A1714] text-[#292524] dark:text-[#DED6C8] border-[#D6CEBE] dark:border-[#3B342D]'
                    }`}
                  >
                    {t.cart.codPay}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {activeTab === 'cart' && items.length > 0 && step !== 'confirmed' && (
          <div className="p-6 border-t border-[#E4DDD0] dark:border-[#302A24] bg-[#FFFFFF] dark:bg-[#1A1714] space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-[#57534E] dark:text-[#B8AFA2]">
                <span>{t.cart.subtotal}</span>
                <span className="tabular-nums">{formatPriceToman(subtotal, locale)}</span>
              </div>
              <div className="flex justify-between text-[#57534E] dark:text-[#B8AFA2]">
                <span>{t.cart.shipping}</span>
                <span className="tabular-nums">
                  {shipping === 0 ? t.cart.freeWord : formatPriceToman(shipping, locale)}
                </span>
              </div>
              <div className="flex justify-between font-bold text-[#1C1917] dark:text-[#F5EFE6] pt-2 border-t border-[#E4DDD0] dark:border-[#302A24] text-base">
                <span>{t.cart.payable}</span>
                <span className="tabular-nums">{formatPriceToman(grandTotal, locale)}</span>
              </div>
            </div>

            {step === 'cart' ? (
              <button
                type="button"
                onClick={() => setStep('checkout')}
                className="w-full py-3 text-sm font-semibold bg-[#1B365D] dark:bg-[#254A7C] text-[#FBF9F5] rounded-lg hover:bg-[#142947] dark:hover:bg-[#2E5B99] transition-colors cursor-pointer"
              >
                {t.cart.proceedCheckout}
              </button>
            ) : (
              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="px-4 py-3 text-xs font-semibold border border-[#D6CEBE] dark:border-[#3B342D] rounded-lg text-[#292524] dark:text-[#DED6C8] hover:bg-[#F2EDE4] dark:hover:bg-[#24201B] cursor-pointer"
                >
                  {t.cart.back}
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  disabled={submitting}
                  className="flex-1 py-3 text-sm font-semibold bg-[#7F1D1D] dark:bg-[#991B1B] text-[#FBF9F5] rounded-lg hover:bg-[#661717] dark:hover:bg-[#B91C1C] transition-colors disabled:opacity-60 cursor-pointer"
                >
                  {submitting ? t.cart.submitting : t.cart.submitOrder}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
