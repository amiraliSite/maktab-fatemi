import { AppLocale } from './LanguageContext';

export interface UiStrings {
  brandName: string;
  nav: {
    martyrdom: string;
    shiaSchool: string;
    timeline: string;
    recommended: string;
    bookshop: string;
    mobileLabels: {
      martyrdom: string;
      shiaSchool: string;
      timeline: string;
      recommended: string;
      bookshop: string;
    };
  };
  header: {
    lightMode: string;
    darkMode: string;
    lightAria: string;
    darkAria: string;
    loginBuy: string;
  };
  top3d: {
    kicker: string;
    headline: string;
    subtitle: string;
    moods: {
      radiant: string;
      garnet: string;
      lapis: string;
    };
    enterButton: string;
  };
  hero: {
    kicker: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    canvasTitle: string;
    canvasHint: string;
    strips: Array<{ index: string; target: string; kicker: string; detail: string }>;
  };
  martyrdom: {
    kicker: string;
    title: string;
    lead: string;
    chapterWord: string;
    ofWord: string;
    listenChapter: string;
    stopNarration: string;
    copyQuote: string;
    copied: string;
    nextChapterPrefix: string;
    backToFirst: string;
    sourcesTitle: string;
    methodNoteTitle: string;
    methodNoteBody: string;
    teachingsKicker: string;
    teachingsTitle: string;
    teachingsLead: string;
    teachingExplainLabel: string;
    teachingShiaLabel: string;
  };
  shia: {
    kicker: string;
    title: string;
    lead: string;
    pillarWord: string;
    manuscriptCaption: string;
    sourcePanelLabel: string;
  };
  timeline: {
    kicker: string;
    title: string;
    lead: string;
    descHeading: string;
    sigHeading: string;
    prevEvent: string;
    nextEvent: string;
  };
  recommended: {
    kicker: string;
    title: string;
    lead: string;
    filterAll: string;
    filterClassical: string;
    filterContemporary: string;
    introLabel: string;
    relevanceLabel: string;
    authorPrefix: string;
    inspectCta: string;
  };
  bookstore: {
    kicker: string;
    title: string;
    lead: string;
    freeShippingNote: string;
    searchLabel: string;
    resultsCount: (matched: string, total: string) => string;
    searchPlaceholder: string;
    clearSearch: string;
    voiceStart: string;
    voiceStop: string;
    voiceUnsupported: string;
    voiceListening: string;
    voiceDenied: string;
    voiceNoSpeech: string;
    voiceError: string;
    voiceHeard: (text: string) => string;
    noInstantResults: string;
    quickKeywordsLabel: string;
    authGateTitle: string;
    authGateDesc: string;
    authGateCta: string;
    sortFeatured: string;
    sortAsc: string;
    sortDesc: string;
    emptyTitle: string;
    emptyDesc: string;
    showAllBooks: string;
    pagesUnit: string;
    printPrice: string;
    addToCart: string;
    loginToBuy: string;
    previewTitle: string;
    categories: Array<'همه' | 'تاریخ فاطمی' | 'تشیع و امامت' | 'متون کهن و نهج‌البلاغه' | 'پژوهش‌های معاصر'>;
    categoryLabels: Record<'همه' | 'تاریخ فاطمی' | 'تشیع و امامت' | 'متون کهن و نهج‌البلاغه' | 'پژوهش‌های معاصر', string>;
    quickKeywords: string[];
  };
  modal: {
    closeLabel: string;
    publisher: string;
    pages: string;
    binding: string;
    stock: string;
    inStockText: string;
    outOfStockText: string;
    authorPrefix: string;
    summaryHeading: string;
    relevanceHeading: string;
    tocHeading: string;
    excerptHeading: string;
    printPrice: string;
    addToCart: string;
    loginToBuy: string;
  };
  cart: {
    titleOrders: string;
    titleCheckout: string;
    titleConfirmed: string;
    titleCart: string;
    logout: string;
    tabCart: (count: string) => string;
    tabOrders: string;
    loadingOrders: string;
    noOrdersTitle: string;
    noOrdersDesc: string;
    totalAmount: string;
    confirmedTitle: string;
    confirmedDesc: (city: string) => string;
    orderCode: string;
    recipient: string;
    paymentMethod: string;
    onlinePay: string;
    codPay: string;
    finalAmount: string;
    backToLibrary: string;
    emptyCartTitle: string;
    emptyCartDesc: string;
    freeShipQualified: string;
    freeShipRemaining: (rem: string) => string;
    subtotal: string;
    shipping: string;
    freeWord: string;
    payable: string;
    proceedCheckout: string;
    back: string;
    submitOrder: string;
    submitting: string;
    nameLabel: string;
    phoneLabel: string;
    cityLabel: string;
    addressLabel: string;
    postalLabel: string;
    payMethodLabel: string;
    fillRequiredError: string;
    submitError: string;
  };
  auth: {
    backToSite: string;
    kicker: string;
    headline: string;
    lead: string;
    pendingTitle: (title: string) => string;
    pendingDesc: string;
    loginTab: string;
    registerTab: string;
    welcomeTitle: string;
    registerTitle: string;
    welcomeSub: string;
    registerSub: string;
    fullName: string;
    phoneOpt: string;
    email: string;
    password: string;
    passwordHint: string;
    checking: string;
    loginSubmit: string;
    registerSubmit: string;
    demoFill: string;
    footerLeft: string;
    footerRight: string;
    genericError: string;
  };
  footer: {
    description: string;
    researchHeading: string;
    shopHeading: string;
    link1: string;
    link2: string;
    link3: string;
    link4: string;
    link5: string;
    copyright: string;
    sourcesNote: string;
  };
  toast: {
    addedToCart: (title: string) => string;
    welcomeUser: (name: string) => string;
    loggedOut: string;
    viewCart: string;
  };
}

export const UI_STRINGS: Record<AppLocale, UiStrings> = {
  fa: {
    brandName: 'مکتب فاطمی',
    nav: {
      martyrdom: 'سیره و شهادت',
      shiaSchool: 'شیعه و آل علی',
      timeline: 'گاه‌شمار تاریخ',
      recommended: 'آثار پیشنهادی',
      bookshop: 'فروشگاه کتاب',
      mobileLabels: {
        martyrdom: 'سیره فاطمی',
        shiaSchool: 'آل علی',
        timeline: 'گاه‌شمار',
        recommended: 'آثار مرجع',
        bookshop: 'فروشگاه'
      }
    },
    header: {
      lightMode: 'حالت روز',
      darkMode: 'حالت شب',
      lightAria: 'تغییر به حالت روز (روشن)',
      darkAria: 'تغییر به حالت شب (مطالعه تاریک)',
      loginBuy: 'ورود و خرید کتاب'
    },
    top3d: {
      kicker: 'یا فاطمة الزهراء اشفعی لنا عند الله · مکتب ولایت آل علی (علیهم‌السلام)',
      headline: 'درود و سلام بر حضرت فاطمه زهرا (س) و آل علی (ع) · برائت از غاصبین حق خلافت شیر خدا',
      subtitle:
        'یادآور پایداری جاودانه حقیقت و عدالت در تاریخ اسلام؛ ستایش مقام شامخ صدیقه طاهره (س) و برائت از ستمگران و غاصبان حق ولایت و خلافت امیرالمؤمنین شیر خدا (ع) در طول تاریخ.',
      moods: {
        radiant: 'تجلی زرین کوثر',
        garnet: 'سوگ عقیق فاطمی',
        lapis: 'نگین لاجورد علوی'
      },
      enterButton: 'ورود به سیره و تاریخ مستند'
    },
    hero: {
      kicker: 'آرشیو مستند تاریخ تشیع · سیره صدیقه کبری · نمایشگاه سه‌بعدی کتب',
      title: 'روایت حقیقت؛ از خانه وحی و شهادت فاطمه زهرا (س) تا مکتب آل علی',
      description:
        'پژوهش‌نامه جامع تاریخی و معرفتی درباره زندگانی، تعالیم و شهادت حضرت فاطمه زهرا (س)، ریشه‌های قرآنی و تاریخی تشیع در مکتب آل علی (ع)، همراه با نمایشگاه سه‌بعدی نسخ خطی، گاه‌شمار تاریخ اهل‌بیت و فروشگاه کتب مرجع.',
      primaryCta: 'مطالعه پرونده سیره و شهادت',
      secondaryCta: 'مشاهده و خرید کتاب‌های تاریخی',
      canvasTitle: 'تالار نور و کتاب سه‌بعدی · صحنه تعاملی مکتب فاطمی',
      canvasHint: 'کلیک برای باز/بسته شدن کتاب · کشیدن ماوس برای گردش',
      strips: [
        {
          index: '01',
          target: 'martyrdom',
          kicker: 'سیره و شهادت صدیقه کبری',
          detail: 'از ولادت کوثر تا خطبه فدکیه و واقعه مدینه در سال ۱۱ هجری'
        },
        {
          index: '02',
          target: 'shia-school',
          kicker: 'تعالیم و اندیشه فاطمی',
          detail: 'بازخوانی مبانی توحید، فلسفه شرایع و امامت در متون اصیل'
        },
        {
          index: '03',
          target: 'timeline',
          kicker: 'مکتب تشیع و آل علی (ع)',
          detail: 'از غدیر خم و حدیث ثقلین تا نهج‌البلاغه و میراث علمی ائمه'
        },
        {
          index: '04',
          target: 'bookshop',
          kicker: 'کتابخانه و فروشگاه آثار مرجع',
          detail: 'معرفی و عرضه مستقیم ۹ اثر کلاسیک و پژوهش معاصر تاریخی'
        }
      ]
    },
    martyrdom: {
      kicker: 'فصل نخست · زندگانی، خطبه فدکیه و شهادت صدیقه کبری (سلام‌الله‌علیها)',
      title: 'سیره، تعالیم و شهادت حضرت فاطمه زهرا (س) در آیینه متون کهن',
      lead: 'مروری مستند بر چهار مقطع سرنوشت‌ساز حیات حضرت فاطمه زهرا (س)؛ از ولادت در خانه وحی و سال‌های دشواری مکه تا دفاع تاریخی در مسجدالنبی و واقعه مدینه در سال یازدهم هجری.',
      chapterWord: 'فصل',
      ofWord: 'از',
      listenChapter: 'خوانش صوتی فصل',
      stopNarration: 'توقف خوانش صوتی',
      copyQuote: 'کپی نقل‌قول',
      copied: 'کپی شد',
      nextChapterPrefix: 'فصل بعدی: ',
      backToFirst: 'بازگشت به فصل نخست',
      sourcesTitle: 'اسناد و مآخذ تاریخی این فصل',
      methodNoteTitle: 'نکته روش‌شناختی',
      methodNoteBody:
        'رویدادهای ایام فاطمیه بر دو روایت ۷۵ روز پس از رحلت پیامبر (۱۳ جمادی‌الاول) و ۹۵ روز پس از رحلت (۳ جمادی‌الثانی) استوار است و هر دو مقطع در سنت تاریخی شیعه گرامی داشته می‌شود.',
      teachingsKicker: 'تعالیم بنیادین و جایگاه در مکتب تشیع',
      teachingsTitle: 'اندیشه‌های محوری حضرت فاطمه زهرا (س)',
      teachingsLead:
        'هر یک از محورهای زیر را انتخاب کنید تا متن اصل تعالیم و نقش آن در الهیات و تاریخ شیعه را مطالعه نمایید.',
      teachingExplainLabel: 'تبیین تعالیم فاطمی',
      teachingShiaLabel: 'اهمیت و جایگاه در مکتب تشیع'
    },
    shia: {
      kicker: 'فصل دوم · تاریخ، کلام و هویت مکتب تشیع',
      title: 'شیعه و مکتب آل علی (علیهم‌السلام)؛ امتداد قرآن و عترت',
      lead: 'مکتب تشیع بر این باور اصیل استوار است که رسالت پیامبر اکرم (ص) پس از غدیر خم در ولایت امیرالمؤمنین علی بن ابی‌طالب (ع) و یازده فرزند معصوم از نسل حضرت فاطمه زهرا (س) تداوم یافت؛ مکتبی که عدالت اجتماعی، عقلانیت توحیدی و امانت‌داری از نص وحی را سرلوحه خویش قرار داد.',
      pillarWord: 'محور',
      manuscriptCaption: 'گنجینه نسخ خطی · سنت تدوین قرآن، حدیث و نهج‌البلاغه در مکتب اهل‌بیت',
      sourcePanelLabel: 'متن و سند مرجع'
    },
    timeline: {
      kicker: 'گاه‌شمار تعاملی تاریخ تشیع و اهل‌بیت (علیهم‌السلام)',
      title: 'رویدادهای سرنوشت‌ساز از بعثت و غدیر تا عصر تدوین آثار',
      lead: 'برای مطالعه شرح دقیق و دسترسی مستقیم به فصل یا کتاب مرتبط، روی هر مقطع تاریخی کلیک کنید.',
      descHeading: 'شرح تاریخی رویداد',
      sigHeading: 'جایگاه و پیامد در تاریخ تشیع',
      prevEvent: 'رویداد پیشین',
      nextEvent: 'رویداد پسین'
    },
    recommended: {
      kicker: 'کتاب‌شناسی تحلیلی · آثار کلاسیک و پژوهش‌های معاصر',
      title: 'کتاب‌های پیشنهادی برای شناخت تاریخ تشیع و سیره فاطمی',
      lead: 'آشنایی با ساختار، نویسندگان و اعتبار تاریخی متون کهن سده‌های نخستین و پژوهش‌های مستند معاصر درباره شهادت حضرت زهرا (س) و مکتب آل علی (ع).',
      filterAll: 'همه آثار مرجع',
      filterClassical: 'متون کلاسیک و کهن',
      filterContemporary: 'پژوهش‌های معاصر',
      introLabel: 'معرفی اثر: ',
      relevanceLabel: 'اهمیت در تاریخ تشیع و اسلام: ',
      authorPrefix: 'تألیف: ',
      inspectCta: 'مشاهده فهرست و خرید کتاب'
    },
    bookstore: {
      kicker: 'فروشگاه تخصصی کتاب‌های تاریخی · نسخه‌های چاپی معتبر',
      title: 'خرید کتب مرجع تاریخ اسلام، سیره فاطمی و تشیع',
      lead: 'امکان جستجوی نوشتاری و صوتی، مطالعه فهرست مطالب، بررسی اسناد هر کتاب و سفارش آنلاین یا پرداخت در محل با ارسال پستی به سراسر کشور.',
      freeShippingNote: 'ارسال رایگان برای سفارش‌های بالای ۸۰۰٬۰۰۰ تومان',
      searchLabel: 'جستجوی هوشمند متنی و صوتی کتابخانه (عنوان، نویسنده یا کلیدواژه تاریخی)',
      resultsCount: (m, t) => `${m} اثر مرتبط از ${t} کتاب`,
      searchPlaceholder: 'نام کتاب، نام مؤلف یا کلیدواژه تاریخی (فدک، سقیفه، غدیر) را بنویسید یا بگویید...',
      clearSearch: 'پاک کردن جستجو',
      voiceStart: 'جستجوی صوتی',
      voiceStop: 'توقف ضبط',
      voiceUnsupported: 'مرورگر شما از تشخیص گفتار پشتیبانی نمی‌کند؛ از کروم یا اج استفاده کنید.',
      voiceListening: 'در حال شنیدن... نام کتاب، مؤلف یا موضوع تاریخی را بگویید.',
      voiceDenied: 'دسترسی به میکروفون مسدود است. لطفاً اجازه استفاده از میکروفون را بدهید.',
      voiceNoSpeech: 'صدایی دریافت نشد. دوباره دکمه میکروفون را بزنید و صحبت کنید.',
      voiceError: 'در تشخیص صدا خطایی رخ داد. لطفاً دوباره تلاش کنید.',
      voiceHeard: (t) => `عبارت شنیده‌شده: «${t}»`,
      noInstantResults: 'نتیجه‌ای با این عبارت یافت نشد. از کلیدواژه‌های پیشنهادی زیر استفاده کنید.',
      quickKeywordsLabel: 'کلیدواژه‌های سریع:',
      authGateTitle: 'برای خرید کتاب‌های تاریخی، ورود به حساب کاربری الزامی است',
      authGateDesc:
        'شما می‌توانید فهرست و گزیده تمام آثار را آزادانه مطالعه کنید؛ اما افزودن به سبد خرید و ثبت سفارش تنها پس از ورود فعال می‌شود.',
      authGateCta: 'ورود یا ثبت‌نام',
      sortFeatured: 'مرتب‌سازی: بیشترین ارتباط / برگزیده',
      sortAsc: 'مرتب‌سازی: کمترین قیمت',
      sortDesc: 'مرتب‌سازی: بیشترین قیمت',
      emptyTitle: 'کتابی با این مشخصات یافت نشد',
      emptyDesc: 'عبارت جستجو را تغییر دهید یا دسته‌بندی «همه» را انتخاب کنید.',
      showAllBooks: 'نمایش همه کتاب‌ها',
      pagesUnit: 'صفحه',
      printPrice: 'قیمت نسخه چاپی',
      addToCart: 'افزودن به سبد',
      loginToBuy: 'ورود برای خرید',
      previewTitle: 'معرفی و پیش‌نمایش کتاب',
      categories: ['همه', 'تاریخ فاطمی', 'تشیع و امامت', 'متون کهن و نهج‌البلاغه', 'پژوهش‌های معاصر'],
      categoryLabels: {
        همه: 'همه',
        'تاریخ فاطمی': 'تاریخ فاطمی',
        'تشیع و امامت': 'تشیع و امامت',
        'متون کهن و نهج‌البلاغه': 'متون کهن و نهج‌البلاغه',
        'پژوهش‌های معاصر': 'پژوهش‌های معاصر'
      },
      quickKeywords: ['شهادت حضرت زهرا', 'خطبه فدکیه', 'سقیفه', 'آل علی', 'نهج‌البلاغه', 'تاریخ تشیع', 'غدیر خم', 'مزار پنهان']
    },
    modal: {
      closeLabel: 'بستن پنجره کتاب',
      publisher: 'ناشر',
      pages: 'تعداد صفحات',
      binding: 'نوع جلد',
      stock: 'وضعیت موجودی',
      inStockText: 'موجود · آماده ارسال',
      outOfStockText: 'ناموجود',
      authorPrefix: 'مؤلف: ',
      summaryHeading: 'خلاصه و ساختار کتاب',
      relevanceHeading: 'جایگاه و اهمیت در تاریخ تشیع و اسلام',
      tocHeading: 'سرفصل‌های برگزیده کتاب',
      excerptHeading: 'گزیده متن کتاب',
      printPrice: 'قیمت نسخه چاپی',
      addToCart: 'افزودن به سبد خرید',
      loginToBuy: 'ورود به حساب و خرید کتاب'
    },
    cart: {
      titleOrders: 'سوابق سفارش‌های من',
      titleCheckout: 'تکمیل مشخصات ارسال',
      titleConfirmed: 'تأیید ثبت سفارش',
      titleCart: 'سبد خرید کتابخانه',
      logout: 'خروج',
      tabCart: (c) => `سبد خرید (${c})`,
      tabOrders: 'سفارش‌های ثبت‌شده',
      loadingOrders: 'در حال بارگذاری سفارش‌ها...',
      noOrdersTitle: 'هنوز سفارشی ثبت نکرده‌اید',
      noOrdersDesc: 'پس از خرید کتاب‌های تاریخی، کد پیگیری و جزئیات هر سفارش در اینجا نگهداری می‌شود.',
      totalAmount: 'مبلغ کل',
      confirmedTitle: 'سفارش شما با موفقیت ثبت شد',
      confirmedDesc: (city) => `بسته کتاب‌های تاریخی پس از آماده‌سازی به نشانی شما در ${city} ارسال خواهد شد.`,
      orderCode: 'کد پیگیری سفارش',
      recipient: 'تحویل‌گیرنده',
      paymentMethod: 'نحوه پرداخت',
      onlinePay: 'پرداخت آنلاین بانکی',
      codPay: 'پرداخت در محل هنگام تحویل',
      finalAmount: 'مبلغ نهایی',
      backToLibrary: 'بازگشت به کتابخانه و مطالعه',
      emptyCartTitle: 'سبد خرید شما خالی است',
      emptyCartDesc: 'از بخش فروشگاه کتاب‌های تاریخی، آثار مورد نظر خود را انتخاب کنید.',
      freeShipQualified: 'سفارش شما مشمول ارسال پستی رایگان به سراسر کشور شده است.',
      freeShipRemaining: (rem) => `تا ارسال رایگان، ${rem} دیگر به سبد اضافه کنید.`,
      subtotal: 'جمع کل کتاب‌ها',
      shipping: 'هزینه ارسال پستی',
      freeWord: 'رایگان',
      payable: 'مبلغ قابل پرداخت',
      proceedCheckout: 'ادامه و ثبت مشخصات ارسال',
      back: 'بازگشت',
      submitOrder: 'ثبت نهایی سفارش',
      submitting: 'در حال ثبت...',
      nameLabel: 'نام و نام خانوادگی تحویل‌گیرنده',
      phoneLabel: 'شماره موبایل',
      cityLabel: 'استان و شهر',
      addressLabel: 'نشانی دقیق پستی',
      postalLabel: 'کد پستی ده‌رقمی (اختیاری)',
      payMethodLabel: 'روش پرداخت',
      fillRequiredError: 'لطفاً نام کامل، شماره تماس، شهر و نشانی پستی را تکمیل کنید.',
      submitError: 'خطا در ثبت سفارش.'
    },
    auth: {
      backToSite: 'بازگشت به پژوهش‌نامه و کتابخانه',
      kicker: 'دروازه ورود اعضا · سامانه امن خرید کتاب‌های تاریخی',
      headline: 'ورود به کتابخانه تخصصی سیره فاطمی و مکتب آل علی (ع)',
      lead: 'برای خرید کتب مرجع تاریخی، پیگیری وضعیت مرسوله‌های پستی و نگهداری سوابق سفارش، لطفاً وارد حساب کاربری خود شوید یا در کمتر از یک دقیقه عضو شوید.',
      pendingTitle: (title) => `تکمیل خرید کتاب «${title}»`,
      pendingDesc: 'بلافاصله پس از ورود یا ثبت‌نام، این کتاب به سبد خرید شما افزوده می‌شود.',
      loginTab: 'ورود به حساب',
      registerTab: 'ثبت‌نام جدید',
      welcomeTitle: 'خوش آمدید',
      registerTitle: 'ایجاد حساب کاربری جدید',
      welcomeSub: 'اطلاعات حساب خود را برای خرید کتب تاریخی وارد نمایید.',
      registerSub: 'مشخصات خود را وارد کنید تا امکان خرید و پیگیری سفارش فعال شود.',
      fullName: 'نام و نام خانوادگی',
      phoneOpt: 'شماره موبایل (اختیاری)',
      email: 'نشانی ایمیل',
      password: 'رمز عبور',
      passwordHint: 'حداقل ۶ کاراکتر',
      checking: 'در حال بررسی...',
      loginSubmit: 'ورود و فعال‌سازی خرید',
      registerSubmit: 'ثبت‌نام و ورود به فروشگاه',
      demoFill: 'پر کردن سریع با حساب آزمایشی (reader@maktab.ir)',
      footerLeft: 'سامانه احراز هویت اختصاصی مکتب فاطمی',
      footerRight: 'رمزنگاری امن نشست کاربری',
      genericError: 'خطا در برقراری ارتباط با سامانه احراز هویت.'
    },
    footer: {
      description:
        'پایگاه پژوهشی و کتابفروشی تخصصی تاریخ اسلام، سیره و شهادت حضرت فاطمه زهرا (سلام‌الله‌علیها) و مبانی تاریخی و معرفتی مکتب تشیع و آل علی (علیهم‌السلام).',
      researchHeading: 'بخش‌های پژوهشی',
      shopHeading: 'کتابخانه و فروشگاه',
      link1: 'سیره، تعالیم و شهادت فاطمی',
      link2: 'تشیع و مکتب آل علی (ع)',
      link3: 'گاه‌شمار تاریخ اهل‌بیت',
      link4: 'آثار پیشنهادی کلاسیک و معاصر',
      link5: 'خرید کتب مرجع تاریخی',
      copyright: '© ۱۴۰۵ آرشیو تاریخ تشیع و سیره فاطمی — تمامی حقوق محفوظ است.',
      sourcesNote: 'مبتنی بر منابع معتبر تاریخی و کلامی فریقین'
    },
    toast: {
      addedToCart: (t) => `«${t}» به سبد خرید اضافه شد.`,
      welcomeUser: (n) => `خوش آمدید، ${n}. اکنون می‌توانید کتاب‌ها را خریداری کنید.`,
      loggedOut: 'از حساب کاربری خود خارج شدید.',
      viewCart: 'مشاهده سبد'
    }
  },
  ar: {
    brandName: 'المكتب الفاطمي',
    nav: {
      martyrdom: 'السيرة والاستشهاد',
      shiaSchool: 'التشيع وآل علي',
      timeline: 'الجدول التاريخي',
      recommended: 'المصادر المقترحة',
      bookshop: 'مكتبة الكتب',
      mobileLabels: {
        martyrdom: 'الفاطمية',
        shiaSchool: 'آل علي',
        timeline: 'التاريخ',
        recommended: 'المصادر',
        bookshop: 'المتجر'
      }
    },
    header: {
      lightMode: 'الوضع النهاري',
      darkMode: 'الوضع الليلي',
      lightAria: 'التبديل إلى الوضع النهاري المضيء',
      darkAria: 'التبديل إلى الوضع الليلي للقراءة',
      loginBuy: 'الدخول وشراء الكتب'
    },
    top3d: {
      kicker: 'يا فاطمة الزهراء اشفعي لنا عند الله · مدرسة ولاية آل علي (عليهم السلام)',
      headline: 'الصلاة والسلام على السيدة فاطمة الزهراء (ع) وآل علي (ع) · والبراءة من غاصبي حق خلافة أسد الله',
      subtitle:
        'تذكيرٌ بثبات الحق والعدالة في التاريخ الإسلامي؛ تمجيد لمقام الصديقة الطاهرة (ع) والبراءة من الظالمين وغاصبي حق ولاية وخلافة أمير المؤمنين أسد الله الغالب علي بن أبي طالب (ع) عبر التاريخ.',
      moods: {
        radiant: 'تجلي الكوثر الذهبي',
        garnet: 'عقيق الأحزان الفاطمية',
        lapis: 'لازورد الولاية العلوية'
      },
      enterButton: 'الدخول إلى السيرة والتاريخ الموثق'
    },
    hero: {
      kicker: 'الأرشيف الموثق لتاريخ التشيع · سيرة الصديقة الكبرى · المعرض ثلاثي الأبعاد',
      title: 'رواية الحقيقة؛ من بيت الوحي واستشهاد فاطمة الزهراء (ع) إلى مدرسة آل علي',
      description:
        'موسوعة تاريخية ومعرفية شاملة عن حياة وتعاليم واستشهاد السيدة فاطمة الزهراء (ع)، والجذور القرآنية والتاريخية للتشيع في مدرسة آل علي (ع)، مع معرض ثلاثي الأبعاد للمخطوطات وجدول زمني تفاعلي ومتجر للكتب المرجعية.',
      primaryCta: 'قراءة ملف السيرة والاستشهاد',
      secondaryCta: 'تصفح وشراء الكتب التاريخية',
      canvasTitle: 'قاعة النور والكتاب ثلاثية الأبعاد · المشهد التفاعلي للمكتب الفاطمي',
      canvasHint: 'انقر لفتح وإغلاق المخطوطة · اسحب لتدوير المنظر',
      strips: [
        {
          index: '01',
          target: 'martyrdom',
          kicker: 'سيرة واستشهاد الصديقة الكبرى',
          detail: 'من مولد الكوثر إلى الخطبة الفدكية وواقعة المدينة عام ١١ هـ'
        },
        {
          index: '02',
          target: 'shia-school',
          kicker: 'التعاليم والفكر الفاطمي',
          detail: 'قراءة أصول التوحيد وفلسفة الشرائع والإمامة في النصوص الأصيلة'
        },
        {
          index: '03',
          target: 'timeline',
          kicker: 'التشيع ومدرسة آل علي (ع)',
          detail: 'من غدير خم وحديث الثقلين إلى نهج البلاغة والتراث العلمي للأئمة'
        },
        {
          index: '04',
          target: 'bookshop',
          kicker: 'مكتبة ومتجر المصادر التاريخية',
          detail: 'عرض وتوفير ٩ أمهات كتب كلاسيكية وبحوث معاصرة موثقة'
        }
      ]
    },
    martyrdom: {
      kicker: 'الفصل الأول · الحياة والخطبة الفدكية واستشهاد الصديقة الكبرى (ع)',
      title: 'سيرة وتعاليم واستشهاد السيدة فاطمة الزهراء (ع) في مرايا المصادر القديمة',
      lead: 'قراءة موثقة لأربع محطات مفصلية في حياة السيدة الزهراء (ع)؛ من المولد في بيت الوحي وسنوات الشدة بمكة إلى الخطبة الخالدة في المسجد النبوي وواقعة المدينة عام ١١ هـ.',
      chapterWord: 'الفصل',
      ofWord: 'من',
      listenChapter: 'القراءة الصوتية للفصل',
      stopNarration: 'إيقاف القراءة الصوتية',
      copyQuote: 'نسخ الاقتباس',
      copied: 'تم النسخ',
      nextChapterPrefix: 'الفصل التالي: ',
      backToFirst: 'العودة إلى الفصل الأول',
      sourcesTitle: 'المصادر والأسانيد التاريخية لهذا الفصل',
      methodNoteTitle: 'ملاحظة منهجية',
      methodNoteBody:
        'تستند روايات الأيام الفاطمية إلى روايتين مشهورتين: ٧٥ يوماً بعد رحيل النبي (١٣ جمادى الأولى) و٩٥ يوماً بعد الرحيل (٣ جمادى الآخرة)، وكلتاهما محط إحياء في التراث الشيعي.',
      teachingsKicker: 'التعاليم الأساسية ومكانتها في الفكر الشيعي',
      teachingsTitle: 'الأفكار المحورية للسيدة فاطمة الزهراء (ع)',
      teachingsLead:
        'اختر أي محور أدناه للاطلاع على النص الأصلي لتعاليمها ودوره في الكلام والتاريخ الشيعي.',
      teachingExplainLabel: 'شرح التعليم الفاطمي',
      teachingShiaLabel: 'الأهمية والمكانة في المدرسة الشيعية'
    },
    shia: {
      kicker: 'الفصل الثاني · التاريخ والكلام وهوية المدرسة الشيعية',
      title: 'التشيع ومدرسة آل علي (عليهم السلام)؛ امتداد القرآن والعترة',
      lead: 'تقوم مدرسة التشيع على الاعتقاد الأصيل بأن رسالة النبي الأكرم (ص) استمرت بعد غدير خم في ولاية أمير المؤمنين علي بن أبي طالب (ع) وأبنائه الأئمة المعصومين من نسل الزهراء (ع)؛ مدرسة تضع العدالة الاجتماعية والعقلانية التوحيدية وأمانة النص في طليعة رسالتها.',
      pillarWord: 'المحور',
      manuscriptCaption: 'كنوز المخطوطات · تقاليد تدوين القرآن والحديث ونهج البلاغة في مدرسة أهل البيت',
      sourcePanelLabel: 'النص والمصدر المرجعي'
    },
    timeline: {
      kicker: 'الجدول الزمني التفاعلي لتاريخ التشيع وأهل البيت (عليهم السلام)',
      title: 'الأحداث الفاصلة من البعثة والغدير إلى عصر التدوين العلمي',
      lead: 'اضغط على أي محطة تاريخية لقراءة الشرح المفصل والانتقال مباشرة إلى الفصل أو الكتاب المرتبط بها.',
      descHeading: 'الشرح التاريخي للحدث',
      sigHeading: 'المكانة والأثر في تاريخ التشيع',
      prevEvent: 'الحدث السابق',
      nextEvent: 'الحدث التالي'
    },
    recommended: {
      kicker: 'ببليوغرافيا تحليلية · أمهات الكتب الكلاسيكية والدراسات المعاصرة',
      title: 'كتب مقترحة لفهم تاريخ التشيع والسيرة الفاطمية',
      lead: 'التعرف على بنية الكتب ومؤلفيها وقيمتها التاريخية في المصادر الأولى والبحوث المعاصرة الموثقة حول استشهاد الزهراء (ع) ومدرسة آل علي (ع).',
      filterAll: 'جميع المصادر',
      filterClassical: 'المصادر الكلاسيكية القديمة',
      filterContemporary: 'البحوث المعاصرة',
      introLabel: 'التعريف بالكتاب: ',
      relevanceLabel: 'الأهمية في التاريخ الإسلامي والشيعي: ',
      authorPrefix: 'تأليف: ',
      inspectCta: 'عرض الفهرس وشراء الكتاب'
    },
    bookstore: {
      kicker: 'المتجر المتخصص للكتب التاريخية · طبعات محققة وموثقة',
      title: 'شراء أمهات كتب التاريخ الإسلامي والسيرة الفاطمية والتشيع',
      lead: 'إمكانية البحث النصي والصوتي، الاطلاع على الفهرس والمقتطفات، وطلب النسخ الورقية عبر الإنترنت أو الدفع عند الاستلام.',
      freeShippingNote: 'شحن مجاني للطلبات فوق ٨٠٠٬٠٠٠ تومان',
      searchLabel: 'البحث الذكي النصي والصوتي في المكتبة (العنوان، المؤلف أو الكلمات المفتاحية)',
      resultsCount: (m, t) => `${m} كتاب مطابق من أصل ${t}`,
      searchPlaceholder: 'اكتب أو انطق اسم الكتاب، المؤلف أو الكلمة المفتاحية (فدك، السقيفة، الغدير)...',
      clearSearch: 'مسح البحث',
      voiceStart: 'بحث صوتي',
      voiceStop: 'إيقاف التسجيل',
      voiceUnsupported: 'متصفحك لا يدعم التعرف على الصوت؛ يرجى استخدام كروم أو إيدج.',
      voiceListening: 'جاري الاستماع... انطق اسم الكتاب أو المؤلف أو الموضوع التاريخي.',
      voiceDenied: 'تم حظر الوصول إلى الميكروفون. يرجى السماح باستخدام الميكروفون.',
      voiceNoSpeech: 'لم يتم التقاط صوت. اضغط على زر الميكروفون وتحدث مجدداً.',
      voiceError: 'حدث خطأ أثناء التعرف على الصوت. يرجى المحاولة مرة أخرى.',
      voiceHeard: (t) => `العبارة المسموعة: «${t}»`,
      noInstantResults: 'لم يتم العثور على نتائج مطابقة. جرّب أحد المصطلحات المقترحة أدناه.',
      quickKeywordsLabel: 'كلمات سريعة:',
      authGateTitle: 'يتطلب شراء الكتب التاريخية تسجيل الدخول إلى حسابك',
      authGateDesc:
        'يمكنك قراءة الفهارس والمقتطفات لجميع الكتب بحرية تامة؛ بينما تتفعل سلة الشراء وإتمام الطلب بعد تسجيل الدخول.',
      authGateCta: 'تسجيل الدخول أو الاشتراك',
      sortFeatured: 'الترتيب: الأكثر صلة / المختارة',
      sortAsc: 'الترتيب: الأقل سعراً',
      sortDesc: 'الترتيب: الأعلى سعراً',
      emptyTitle: 'لم يتم العثور على كتب مطابقة',
      emptyDesc: 'عدّل عبارة البحث أو اختر تصنيف «الكل».',
      showAllBooks: 'عرض جميع الكتب',
      pagesUnit: 'صفحة',
      printPrice: 'سعر النسخة المطبوعة',
      addToCart: 'أضف إلى السلة',
      loginToBuy: 'سجّل للشراء',
      previewTitle: 'تفاصيل ومعاينة الكتاب',
      categories: ['همه', 'تاریخ فاطمی', 'تشیع و امامت', 'متون کهن و نهج‌البلاغه', 'پژوهش‌های معاصر'],
      categoryLabels: {
        همه: 'الكل',
        'تاریخ فاطمی': 'التاريخ الفاطمي',
        'تشیع و امامت': 'التشيع والإمامة',
        'متون کهن و نهج‌البلاغه': 'المصادر القديمة ونهج البلاغة',
        'پژوهش‌های معاصر': 'الدراسات المعاصرة'
      },
      quickKeywords: ['شهادت حضرت زهرا', 'خطبه فدکیه', 'سقیفه', 'آل علی', 'نهج‌البلاغه', 'تاریخ تشیع', 'غدیر خم', 'مزار پنهان']
    },
    modal: {
      closeLabel: 'إغلاق نافذة الكتاب',
      publisher: 'دار النشر',
      pages: 'عدد الصفحات',
      binding: 'نوع التجليد',
      stock: 'حالة التوفر',
      inStockText: 'متوفر · جاهز للشحن',
      outOfStockText: 'غير متوفر',
      authorPrefix: 'المؤلف: ',
      summaryHeading: 'ملخص وبنية الكتاب',
      relevanceHeading: 'المكانة والأهمية في تاريخ التشيع والإسلام',
      tocHeading: 'أبرز فصول الكتاب',
      excerptHeading: 'مقتطف من نص الكتاب',
      printPrice: 'سعر النسخة الورقية',
      addToCart: 'إضافة إلى سلة التسوق',
      loginToBuy: 'الدخول للشراء وإتمام الطلب'
    },
    cart: {
      titleOrders: 'سجل طلباتي السابقة',
      titleCheckout: 'إكمال بيانات الشحن',
      titleConfirmed: 'تأكيد تسجيل الطلب',
      titleCart: 'سلة مشتريات المكتبة',
      logout: 'خروج',
      tabCart: (c) => `السلة (${c})`,
      tabOrders: 'الطلبات المسجلة',
      loadingOrders: 'جاري تحميل الطلبات...',
      noOrdersTitle: 'لم تسجل أي طلبات بعد',
      noOrdersDesc: 'بعد شراء الكتب التاريخية، سيُحفظ رمز التتبع وتفاصيل كل طلب هنا.',
      totalAmount: 'المبلغ الإجمالي',
      confirmedTitle: 'تم تسجيل طلبك بنجاح',
      confirmedDesc: (city) => `سيتم تجهيز طرد الكتب التاريخية وإرساله إلى عنوانك في ${city}.`,
      orderCode: 'رمز تتبع الطلب',
      recipient: 'المستلم',
      paymentMethod: 'طريقة الدفع',
      onlinePay: 'دفع إلكتروني بنكي',
      codPay: 'الدفع عند الاستلام',
      finalAmount: 'المبلغ النهائي',
      backToLibrary: 'العودة إلى المكتبة والمطالعة',
      emptyCartTitle: 'سلة المشتريات فارغة',
      emptyCartDesc: 'اختر الكتب التاريخية المرغوبة من قسم المتجر.',
      freeShipQualified: 'طلبك مؤهل للشحن البريدي المجاني.',
      freeShipRemaining: (rem) => `أضف ${rem} إضافية للحصول على شحن مجاني.`,
      subtotal: 'مجموع الكتب',
      shipping: 'تكلفة الشحن',
      freeWord: 'مجاني',
      payable: 'المبلغ المستحق للدفع',
      proceedCheckout: 'متابعة وإدخال بيانات الشحن',
      back: 'رجوع',
      submitOrder: 'تأكيد الطلب نهائياً',
      submitting: 'جاري التسجيل...',
      nameLabel: 'الاسم الكامل للمستلم',
      phoneLabel: 'رقم الهاتف',
      cityLabel: 'المحافظة والمدينة',
      addressLabel: 'العنوان البريدي التفصيلي',
      postalLabel: 'الرمز البريدي (اختياري)',
      payMethodLabel: 'طريقة الدفع',
      fillRequiredError: 'يرجى استكمال الاسم الكامل، رقم الهاتف، المدينة والعنوان.',
      submitError: 'حدث خطأ أثناء تسجيل الطلب.'
    },
    auth: {
      backToSite: 'العودة إلى الموسوعة والمكتبة',
      kicker: 'بوابة الأعضاء · نظام آمن لاقتناء الكتب التاريخية',
      headline: 'الدخول إلى المكتبة التخصصية للسيرة الفاطمية ومدرسة آل علي (ع)',
      lead: 'لشراء المصادر التاريخية الموثقة، متابعة حالة الشحن، وحفظ سجل طلباتك، يرجى تسجيل الدخول أو إنشاء حساب جديد في أقل من دقيقة.',
      pendingTitle: (title) => `إكمال شراء كتاب «${title}»`,
      pendingDesc: 'سيُضاف هذا الكتاب مباشرة إلى سلة مشترياتك فور الدخول أو التسجيل.',
      loginTab: 'تسجيل الدخول',
      registerTab: 'حساب جديد',
      welcomeTitle: 'أهلاً بك',
      registerTitle: 'إنشاء حساب عضو جديد',
      welcomeSub: 'أدخل بيانات حسابك للوصول إلى سلة الشراء.',
      registerSub: 'أدخل بياناتك لتفعيل الشراء ومتابعة الطلبات.',
      fullName: 'الاسم الكامل',
      phoneOpt: 'رقم الهاتف (اختياري)',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      passwordHint: '٦ أحرف على الأقل',
      checking: 'جاري التحقق...',
      loginSubmit: 'دخول وتفعيل الشراء',
      registerSubmit: 'تسجيل ودخول إلى المتجر',
      demoFill: 'تعبئة سريعة بحساب تجريبي (reader@maktab.ir)',
      footerLeft: 'نظام المصادقة الخاص بالمكتب الفاطمي',
      footerRight: 'تشفير آمن لجلسة المستخدم',
      genericError: 'تعذر الاتصال بخدمة تسجيل الدخول.'
    },
    footer: {
      description:
        'منصة بحثية ومكتبة تخصصية في التاريخ الإسلامي، وسيرة واستشهاد السيدة فاطمة الزهراء (عليها السلام)، وأصول التاريخ والفكر الشيعي لمدرسة آل علي (عليهم السلام).',
      researchHeading: 'الأقسام البحثية',
      shopHeading: 'المكتبة والمتجر',
      link1: 'السيرة والتعاليم والاستشهاد الفاطمي',
      link2: 'التشيع ومدرسة آل علي (ع)',
      link3: 'الجدول الزمني لتاريخ أهل البيت',
      link4: 'الكتب المقترحة الكلاسيكية والمعاصرة',
      link5: 'اقتناء الكتب التاريخية المرجعية',
      copyright: '© ٢٠٢٦ أرشيف تاريخ التشيع والسيرة الفاطمية — جميع الحقوق محفوظة.',
      sourcesNote: 'مستند إلى أمهات المصادر التاريخية والكلامية المعتبرة'
    },
    toast: {
      addedToCart: (t) => `تمت إضافة «${t}» إلى سلة المشتريات.`,
      welcomeUser: (n) => `مرحباً بك يا ${n}. يمكنك الآن إتمام شراء الكتب.`,
      loggedOut: 'تم تسجيل الخروج من حسابك.',
      viewCart: 'عرض السلة'
    }
  },
  en: {
    brandName: 'Maktab Fatemi',
    nav: {
      martyrdom: 'Life & Martyrdom',
      shiaSchool: 'Shia & Aal-e Ali',
      timeline: 'Timeline',
      recommended: 'Recommended Books',
      bookshop: 'Bookshop',
      mobileLabels: {
        martyrdom: 'Fatimah',
        shiaSchool: 'Aal-e Ali',
        timeline: 'Timeline',
        recommended: 'Books',
        bookshop: 'Shop'
      }
    },
    header: {
      lightMode: 'Light',
      darkMode: 'Dark',
      lightAria: 'Switch to light reading mode',
      darkAria: 'Switch to dark night-reading mode',
      loginBuy: 'Sign In & Shop'
    },
    top3d: {
      kicker: 'Ya Fatimah al-Zahra Intercede For Us · School of the Wilayah of Aal-e Ali (AS)',
      headline:
        "Peace & Blessings Upon Lady Fatimah al-Zahra (SA) & Aal-e Ali (AS) · Disavowal of the Usurpers of the Lion of God's Rightful Succession",
      subtitle:
        'A timeless reminder of steadfast truth and justice in Islamic history: honoring the exalted station of al-Siddiqah al-Tahirah (SA) and disavowing the oppressors and usurpers of the divinely entrusted leadership of Imam Ali, the Lion of God (AS).',
      moods: {
        radiant: 'Golden Kawthar',
        garnet: 'Fatemi Garnet',
        lapis: 'Alawi Lapis'
      },
      enterButton: 'Explore Documented History'
    },
    hero: {
      kicker: 'Documented Shia Historical Archive · Life of al-Siddiqah · 3D Illuminated Gallery',
      title: 'Chronicle of Truth: From the House of Revelation & Martyrdom of Fatimah (SA) to the School of Ali (AS)',
      description:
        'A comprehensive historical and scholarly archive covering the life, teachings, and martyrdom of Lady Fatimah al-Zahra (SA), the Quranic and historical foundations of Shia Islam in the School of Aal-e Ali (AS), an interactive 3D codex stage, historical timeline, and specialized bookshop.',
      primaryCta: 'Read Life & Martyrdom Dossier',
      secondaryCta: 'Browse & Order Historical Books',
      canvasTitle: '3D Sanctuary & Illuminated Codex · Interactive Maktab Fatemi Stage',
      canvasHint: 'Click codex to open/close · Drag pointer to orbit',
      strips: [
        {
          index: '01',
          target: 'martyrdom',
          kicker: 'Life & Martyrdom of Fatimah (SA)',
          detail: 'From the birth of Kawthar to the Fadak Sermon and the events of 11 AH in Medina'
        },
        {
          index: '02',
          target: 'shia-school',
          kicker: 'Core Fatemi Teachings',
          detail: 'Monotheistic theology, philosophy of worship, and Imamah in primary sources'
        },
        {
          index: '03',
          target: 'timeline',
          kicker: 'Shia Islam & Aal-e Ali (AS)',
          detail: 'From Ghadir Khumm and Hadith al-Thaqalayn to Nahj al-Balagha and scholarly heritage'
        },
        {
          index: '04',
          target: 'bookshop',
          kicker: 'Curated Library & Bookshop',
          detail: '9 classical chronicles and contemporary scholarly works available to order'
        }
      ]
    },
    martyrdom: {
      kicker: 'Chapter I · Biography, Fadak Sermon & Martyrdom of Lady Fatimah al-Zahra (SA)',
      title: 'Life, Core Teachings & Martyrdom of Lady Fatimah (SA) in Classical Chronicles',
      lead: 'A documented historical narrative across four pivotal chapters of Lady Fatimah al-Zahra’s (SA) life: from her birth in Mecca and the Years of Siege to her historic defense in the Prophet’s Mosque and the tragedy of 11 AH in Medina.',
      chapterWord: 'Chapter',
      ofWord: 'of',
      listenChapter: 'Listen to Chapter',
      stopNarration: 'Stop Narration',
      copyQuote: 'Copy Quote',
      copied: 'Copied',
      nextChapterPrefix: 'Next Chapter: ',
      backToFirst: 'Back to Chapter I',
      sourcesTitle: 'Primary Historical Sources for This Chapter',
      methodNoteTitle: 'Historiographical Note',
      methodNoteBody:
        'Fatimiyyah commemorations preserve two well-attested historical reports: 75 days (13 Jumada al-Ula) and 95 days (3 Jumada al-Thani) after the passing of the Prophet (PBUH). Both intervals are honored in Shia historical tradition.',
      teachingsKicker: 'Foundational Teachings & Significance in Shia Islam',
      teachingsTitle: 'Core Intellectual & Spiritual Principles of Lady Fatimah (SA)',
      teachingsLead:
        'Select any principle below to read the primary Arabic text alongside its philosophical explanation and significance in Shia thought.',
      teachingExplainLabel: 'Exposition of Fatemi Teaching',
      teachingShiaLabel: 'Role & Significance in Shia Islam'
    },
    shia: {
      kicker: 'Chapter II · History, Theology & Identity of Shia Islam',
      title: 'Shia Islam & the School of Aal-e Ali (AS): Continuity of Quran & Ahl al-Bayt',
      lead: 'The Shia school rests on the foundational principle that prophetic guidance continued after Ghadir Khumm through the wilayah of Imam Ali ibn Abi Talib (AS) and eleven infallible Imams descended from Lady Fatimah al-Zahra (SA)—anchoring social justice, rational monotheism, and fidelity to revelation.',
      pillarWord: 'Pillar',
      manuscriptCaption: 'Illuminated Manuscripts · Tradition of preserving the Quran, Hadith & Nahj al-Balagha',
      sourcePanelLabel: 'Primary Text & Reference'
    },
    timeline: {
      kicker: 'Interactive Historical Timeline of Shia Islam & Ahl al-Bayt (AS)',
      title: 'Defining Milestones from Mecca & Ghadir Khumm to Classical Compilation',
      lead: 'Select any historical milestone to examine its narrative context, doctrinal significance, and linked chapters or reference volumes.',
      descHeading: 'Historical Narrative',
      sigHeading: 'Significance in Shia History',
      prevEvent: 'Previous Event',
      nextEvent: 'Next Event'
    },
    recommended: {
      kicker: 'Analytical Bibliography · Classical Chronicles & Contemporary Scholarship',
      title: 'Recommended Books for Studying Shia History & the Fatemi Tradition',
      lead: 'Explore the structure, authorship, and historiographical weight of both early Islamic chronicles and modern critical monographs on Lady Fatimah (SA) and the School of Ali (AS).',
      filterAll: 'All Reference Works',
      filterClassical: 'Classical Chronicles',
      filterContemporary: 'Contemporary Studies',
      introLabel: 'Overview: ',
      relevanceLabel: 'Relevance to Shia & Islamic History: ',
      authorPrefix: 'Author: ',
      inspectCta: 'View Contents & Purchase'
    },
    bookstore: {
      kicker: 'Specialized Historical Bookshop · Authentic Print Editions',
      title: 'Purchase Reference Books on Islamic History, Fatemi Tradition & Shia Studies',
      lead: 'Smart text and voice search, table-of-contents previews, primary source citations, and online or cash-on-delivery ordering.',
      freeShippingNote: 'Free shipping on orders above 800,000 Toman',
      searchLabel: 'Smart Text & Voice Library Search (Title, Author, or Historical Keyword)',
      resultsCount: (m, t) => `${m} matching works of ${t} books`,
      searchPlaceholder: 'Type or speak a title, author, or historical keyword (Fadak, Saqifah, Ghadir)...',
      clearSearch: 'Clear search',
      voiceStart: 'Voice Search',
      voiceStop: 'Stop Listening',
      voiceUnsupported: 'Your browser does not support voice recognition; please try Chrome or Edge.',
      voiceListening: 'Listening... Speak the book title, author, or historical topic.',
      voiceDenied: 'Microphone permission was denied. Please allow microphone access.',
      voiceNoSpeech: 'No speech was detected. Click the microphone button and try again.',
      voiceError: 'Voice recognition encountered an error. Please try again.',
      voiceHeard: (t) => `Recognized phrase: "${t}"`,
      noInstantResults: 'No matching titles found. Try one of the historical keywords below.',
      quickKeywordsLabel: 'Quick keywords:',
      authGateTitle: 'Sign in to purchase historical books',
      authGateDesc:
        'You can freely browse book previews, summaries, and primary citations; adding items to the cart and placing orders requires signing in.',
      authGateCta: 'Sign In or Register',
      sortFeatured: 'Sort: Relevance / Featured',
      sortAsc: 'Sort: Lowest Price',
      sortDesc: 'Sort: Highest Price',
      emptyTitle: 'No matching books found',
      emptyDesc: 'Adjust your search query or select the "All" category.',
      showAllBooks: 'Show All Books',
      pagesUnit: 'pages',
      printPrice: 'Print Edition Price',
      addToCart: 'Add to Cart',
      loginToBuy: 'Sign In to Buy',
      previewTitle: 'Preview & Table of Contents',
      categories: ['همه', 'تاریخ فاطمی', 'تشیع و امامت', 'متون کهن و نهج‌البلاغه', 'پژوهش‌های معاصر'],
      categoryLabels: {
        همه: 'All',
        'تاریخ فاطمی': 'Fatemi History',
        'تشیع و امامت': 'Shia & Imamah',
        'متون کهن و نهج‌البلاغه': 'Classical & Nahj al-Balagha',
        'پژوهش‌های معاصر': 'Contemporary Studies'
      },
      quickKeywords: ['Fatimah', 'Fadak', 'Saqifah', 'Nahj al-Balagha', 'Shia', 'Ghadir', 'Yaqubi', 'Sulaym']
    },
    modal: {
      closeLabel: 'Close book dialog',
      publisher: 'Publisher',
      pages: 'Pages',
      binding: 'Binding',
      stock: 'Availability',
      inStockText: 'In Stock · Ready to Ship',
      outOfStockText: 'Out of Stock',
      authorPrefix: 'Author: ',
      summaryHeading: 'Synopsis & Structure',
      relevanceHeading: 'Significance in Shia & Islamic History',
      tocHeading: 'Selected Table of Contents',
      excerptHeading: 'Selected Excerpt',
      printPrice: 'Print Edition Price',
      addToCart: 'Add to Cart',
      loginToBuy: 'Sign In to Order'
    },
    cart: {
      titleOrders: 'Order History',
      titleCheckout: 'Shipping Details',
      titleConfirmed: 'Order Confirmed',
      titleCart: 'Library Shopping Cart',
      logout: 'Sign Out',
      tabCart: (c) => `Cart (${c})`,
      tabOrders: 'Order History',
      loadingOrders: 'Loading your orders...',
      noOrdersTitle: 'No orders placed yet',
      noOrdersDesc: 'Once you order books, your tracking codes and receipts appear here.',
      totalAmount: 'Total Amount',
      confirmedTitle: 'Your order has been placed successfully',
      confirmedDesc: (city) => `Your historical books package is being prepared for delivery to ${city}.`,
      orderCode: 'Order Tracking Code',
      recipient: 'Recipient',
      paymentMethod: 'Payment Method',
      onlinePay: 'Online Bank Payment',
      codPay: 'Cash on Delivery',
      finalAmount: 'Final Total',
      backToLibrary: 'Return to Library',
      emptyCartTitle: 'Your shopping cart is empty',
      emptyCartDesc: 'Select historical titles from the bookshop to begin.',
      freeShipQualified: 'Your order qualifies for complimentary postal delivery.',
      freeShipRemaining: (rem) => `Add ${rem} more to qualify for free shipping.`,
      subtotal: 'Books Subtotal',
      shipping: 'Postal Shipping',
      freeWord: 'Free',
      payable: 'Total Payable',
      proceedCheckout: 'Continue to Shipping Details',
      back: 'Back',
      submitOrder: 'Confirm & Place Order',
      submitting: 'Submitting...',
      nameLabel: 'Recipient Full Name',
      phoneLabel: 'Phone Number',
      cityLabel: 'Province & City',
      addressLabel: 'Full Street Address',
      postalLabel: 'Postal Code (Optional)',
      payMethodLabel: 'Payment Method',
      fillRequiredError: 'Please enter recipient name, phone number, city, and address.',
      submitError: 'Failed to submit order.'
    },
    auth: {
      backToSite: 'Back to Research Archive & Library',
      kicker: 'Member Gate · Secure Historical Bookshop Access',
      headline: 'Sign In to Maktab Fatemi Library & School of Aal-e Ali (AS)',
      lead: 'Sign in or create an account in seconds to purchase reference titles, track shipments, and save your order history.',
      pendingTitle: (title) => `Complete purchase for "${title}"`,
      pendingDesc: 'Once signed in, this volume will be added directly to your cart.',
      loginTab: 'Sign In',
      registerTab: 'Create Account',
      welcomeTitle: 'Welcome Back',
      registerTitle: 'Create Reader Account',
      welcomeSub: 'Enter your credentials to access the historical bookshop checkout.',
      registerSub: 'Fill in your details to enable ordering and tracking.',
      fullName: 'Full Name',
      phoneOpt: 'Phone Number (Optional)',
      email: 'Email Address',
      password: 'Password',
      passwordHint: 'Minimum 6 characters',
      checking: 'Verifying...',
      loginSubmit: 'Sign In & Enable Shopping',
      registerSubmit: 'Register & Continue',
      demoFill: 'Quick fill demo reader account (reader@maktab.ir)',
      footerLeft: 'Maktab Fatemi Member Authentication',
      footerRight: 'Encrypted Session Access',
      genericError: 'Unable to reach authentication service.'
    },
    footer: {
      description:
        'A research archive and specialized bookshop dedicated to Islamic history, the life and martyrdom of Lady Fatimah al-Zahra (SA), and the intellectual heritage of Shia Islam and Aal-e Ali (AS).',
      researchHeading: 'Research Sections',
      shopHeading: 'Library & Bookshop',
      link1: 'Fatimah (SA) Biography & Teachings',
      link2: 'Shia Islam & School of Ali (AS)',
      link3: 'Historical Ahl al-Bayt Timeline',
      link4: 'Classical & Contemporary Books',
      link5: 'Order Historical Reference Books',
      copyright: '© 2026 Maktab Fatemi Historical Archive — All Rights Reserved.',
      sourcesNote: 'Grounded in primary classical Islamic chronicles and Shia sources'
    },
    toast: {
      addedToCart: (t) => `"${t}" was added to your cart.`,
      welcomeUser: (n) => `Welcome, ${n}. You may now order books.`,
      loggedOut: 'You have signed out of your account.',
      viewCart: 'View Cart'
    }
  }
};
