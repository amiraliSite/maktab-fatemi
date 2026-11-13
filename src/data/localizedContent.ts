import type { AppLocale } from '../i18n/LanguageContext';
import {
  FATIMAH_CHAPTERS,
  CORE_TEACHINGS,
  FatimahChapter,
  CoreTeaching
} from './fatimahLifeAndTeachings';
import {
  SHIA_PILLARS,
  BOOKS_CATALOG,
  ShiaPillar,
  BookItem
} from './shiaAndBooksData';
import { HISTORICAL_TIMELINE, TimelineEvent } from './timelineEvents';

type LocaleNonFa = 'ar' | 'en';

const CHAPTER_TRANSLATIONS: Record<
  LocaleNonFa,
  Record<
    string,
    Omit<FatimahChapter, 'id' | 'sources'> & {
      sources: Array<{ book: string; author: string; era: string; quote: string }>;
    }
  >
> = {
  ar: {
    'early-life': {
      index: '٠١',
      title: 'مولد الكوثر وسنوات مكة ولقب «أمّ أبيها»',
      subtitle: 'النشأة في مهبط الوحي والصمود في حصار شعب أبي طالب',
      period: 'من السنة الخامسة للبعثة حتى الهجرة إلى المدينة',
      paragraphs: [
        'وُلدت السيدة فاطمة الزهراء (عليها السلام)، ابنة النبي الأكرم (صلى الله عليه وآله) والسيدة خديجة الكبرى (عليها السلام)، في العشرين من جمادى الآخرة في السنة الخامسة بعد البعثة بمكة المكرمة. جاء مولدها في وقت كان المشركون يطعنون فيه على النبي بـ«الأبتر»، فنزلت سورة الكوثر بشارةً بالخير الكثير واستمرار النسل النبوي عبر ابنته الطاهرة.',
        'رافقت طفولة الزهراء (ع) أقسى سنوات الدعوة الإسلامية والحصار الاقتصادي والاجتماعي على بني هاشم في شعب أبي طالب. وبعد وفاة أمها خديجة (ع) في عام الحزن، حملت فاطمة الصغيرة مسؤولية مؤازرة والدها، فكانت تمسح الأذى والتراب عن وجه النبي في المسجد الحرام وتُدخل السكينة إلى قلبه، حتى لقّبها رسول الله (ص) بـ«أمّ أبيها».',
        'لم تكن فاطمة الزهراء (ع) مجرد شاهدة على نزول الوحي، بل كانت ركناً أساسياً في تأسيس البيت النبوي الأول، ومع الهجرة إلى المدينة برفقة موكب الإمام علي (ع) افتُتِح فصل جديد في تاريخ الإسلام.'
      ],
      pullQuote: {
        arabic: 'فَاطِمَةُ بَضْعَةٌ مِنِّي، فَمَنْ أَغْضَبَهَا أَغْضَبَنِي',
        persian: 'فاطمة قطعة من وجودي، من أغضبها فقد أغضبني.',
        source: 'صحيح البخاري، ج ٤، ص ٢١٠ · أمالي الشيخ الصدوق، المجلس ٥٦'
      },
      sources: [
        {
          book: 'الإصابة في تمييز الصحابة',
          author: 'ابن حجر العسقلاني',
          era: 'القرن ٩ هـ',
          quote: 'تأكيد كنية «أمّ أبيها» للسيدة فاطمة (ع) لما أبدته من عناية ومؤازرة فريدة لرسول الله بعد رحيل خديجة.'
        },
        {
          book: 'دلائل الإمامة',
          author: 'محمد بن جرير الطبري (الشيعي)',
          era: 'القرن ٥ هـ',
          quote: 'تقرير موثق عن ولادة السيدة الزهراء وتربيتها في بيت الوحي وهجرتها إلى المدينة.'
        }
      ]
    },
    'house-of-light': {
      index: '٠٢',
      title: 'الزواج من الإمام علي (ع) وبيت الوحي في المدينة',
      subtitle: 'نزول آية التطهير وسورة الإنسان وحديث الكساء في البيت العلوي',
      period: 'من السنة الثانية إلى العاشرة للهجرة',
      paragraphs: [
        'في السنة الثانية للهجرة، وبعد أن تقدّم لخطبتها وجهاء قريش فأجاب النبي بانتظار أمر السماء، تم عقد قران السيدة فاطمة الزهراء (ع) على الإمام علي بن أبي طالب (ع) بأبسط جهاز، ليجمع هذا الزواج المبارك بين ركني النبوة والإمامة في التاريخ الإسلامي.',
        'كان بيت فاطمة (ع) وعلي (ع) المجاور للمسجد النبوي مهبطاً لأعظم الآيات القرآنية في شأن أهل البيت (ع). وبحسب الروايات المتواترة لدى الفريقين، جرت واقعة الكساء في هذا البيت حين اجتمع النبي وعلي وفاطمة والحسن والحسين تحت كساء واحد ونزلت آية التطهير (الأحزاب: ٣٣).',
        'كما شكّلت قصة صيام أهل البيت ثلاثة أيام وإيثارهم المسكين واليتيم والأسير بطعام إفطارهم سبباً لنزول سورة الإنسان (الدهر)، في لوحة خالدة تجسّد الإيثار والتواضع والعدل الاجتماعي في السيرة الفاطمية.'
      ],
      pullQuote: {
        arabic: 'إِنَّمَا يُرِيدُ اللَّهُ لِيُذْهِبَ عَنكُمُ الرِّجْسَ أَهْلَ الْبَيْتِ وَيُطَهِّرَكُمْ تَطْهِيرًا',
        persian: 'إنما أراد الله أن يبعد عنكم كل رجس ونقص يا أهل البيت ويطهركم تطهيراً كاملاً.',
        source: 'القرآن الكريم، سورة الأحزاب، الآية ٣٣ · مسند أحمد بن حنبل، ج ١، ص ٣٣١'
      },
      sources: [
        {
          book: 'المناقب',
          author: 'ابن شهرآشوب المازندراني',
          era: 'القرن ٦ هـ',
          quote: 'عرض تفصيلي لمراسم العقد وتسبيح الزهراء وشأن نزول سورة الإنسان.'
        },
        {
          book: 'تفسير الكشاف',
          author: 'الزمخشري',
          era: 'القرن ٦ هـ',
          quote: 'رواية نزول آيات سورة الدهر في حق علي وفاطمة والحسن والحسين بعد إيثارهم بالإفطار.'
        }
      ]
    },
    'fadak-sermon': {
      index: '٠٣',
      title: 'الخطبة الفدكية؛ الدفاع الفقهي والسياسي عن الإمامة',
      subtitle: 'المرافعة التاريخية في المسجد النبوي بعد رحيل الرسول (ص)',
      period: 'الربع الأول بعد ٢٨ صفر سنة ١١ هـ',
      paragraphs: [
        'عقب رحيل النبي الأكرم (ص) في ٢٨ صفر سنة ١١ هـ وما جرى في سقيفة بني ساعدة، صودرت أرض «فدك» التي كان النبي قد وهبها لابنته فاطمة (ع) بأمر إلهي وتطبيقاً لقوله تعالى «وَآتِ ذَا الْقُرْبَى حَقَّهُ»، وذلك بهدف إضعاف السند الاقتصادي والاجتماعي لأهل البيت.',
        'اتخذت السيدة الزهراء (ع) واحداً من أعظم المواقف التاريخية في الإسلام؛ إذ قصدت المسجد النبوي مع نساء بني هاشم وألقت الخطبة الفدكية الخالدة أمام المهاجرين والأنصار، مستهلّةً إياها بأعمق بيان في التوحيد وحكمة التشريع، ثم دحضت بالقرآن الكريم دعوى عدم توريث الأنبياء مستشهدةً بإرث سليمان من داود ودعاء زكريا.',
        'تجاوزت الخطبة الفدكية قضية أرض فدك لتؤكد أن إمامة أهل البيت هي نظام الملة والأمان من الفرقة، محذّرةً الأمة من الانحراف عن خط الغدير ووصاية الإمام علي (ع)، لتبقى حتى اليوم وثيقةً كلامية وسياسية محورية في الفكر الشيعي.'
      ],
      pullQuote: {
        arabic: 'وَطَاعَتُنَا نِظَامًا لِلْمِلَّةِ، وَإِمَامَتُنَا أَمَانًا لِلْفُرْقَةِ',
        persian: 'طاعتنا نحن أهل البيت سبب انتظام أمر الأمة، وإمامتنا أمان من التفرق والشتات.',
        source: 'الاحتجاج للطبرسي، ج ١، ص ١٣٤ · شرح نهج البلاغة لابن أبي الحديد، ج ١٦، ص ٢١١'
      },
      sources: [
        {
          book: 'الاحتجاج',
          author: 'أحمد بن علي الطبرسي',
          era: 'القرن ٦ هـ',
          quote: 'النص الكامل للخطبة الفدكية ومحاجة السيدة الزهراء في المسجد النبوي.'
        },
        {
          book: 'بلاغات النساء',
          author: 'ابن طيفور',
          era: 'القرن ٣ هـ',
          quote: 'أقدم مصدر غير شيعي دوّن الخطبة الفدكية بسندها ونصها البليغ في القرن الثالث الهجري.'
        }
      ]
    },
    'martyrdom-burial': {
      index: '٠٤',
      title: 'الهجوم على بيت الوحي، الاستشهاد وسر القبر المخفي',
      subtitle: 'واقعة البيت الفاطمي واستشهاد المحسن (ع) والتشييع الليلي',
      period: 'جمادى الأولى وجمادى الآخرة سنة ١١ هـ (٧٥ أو ٩٥ يوماً)',
      paragraphs: [
        'لما امتنع الإمام علي (ع) عن البيعة للخلافة المنبثقة عن السقيفة واجتمع ثلة من كبار الصحابة المخلصين في بيت فاطمة (ع)، هاجمت عناصر السلطة الدار لأخذ البيعة قسراً وهددت بإحراق البيت. وعندما قيل لهم إن فيها فاطمة، اقتحموا الدار، فأصيبت سيدة نساء العالمين بعصرة الباب في ضلعها، مما أدى إلى إسقاط واستشهاد جنينها المحسن (ع).',
        'تركت تلك الإصابة البالغة السيدة الزهراء (ع) طريحة الفراش. وفي أيامها الأخيرة أوصت الإمام علي (ع) أن يغسلها ويكفنها ويدفنها سراً في الليل، وألا يحضر جنازتها من ظلمها، وأن يظل موضع قبرها خافياً ليبقى سؤالاً حياً في ضمير التاريخ الإسلامي.',
        'ووفقاً للروايتين المشهورتين بعد ٧٥ يوماً (١٣ جمادى الأولى) أو ٩٥ يوماً (٣ جمادى الآخرة) من رحيل النبي، ارتقت الصديقة الكبرى (ع) شهيدةً في ريعان شبابها (١٨ عاماً)، وواراها الإمام علي (ع) الثرى في ظلمة الليل بحضور صفوة من الصحابة كسلمان وأبي ذر والمقداد وبني هاشم.'
      ],
      pullQuote: {
        arabic: 'السَّلَامُ عَلَيْكَ يَا رَسُولَ اللَّهِ عَنِّي وَعَنِ ابْنَتِكَ النَّازِلَةِ فِي جِوَارِكَ',
        persian: 'السلام عليك يا رسول الله عني وعن ابنتك التي التحقت بجوارك سريعاً.',
        source: 'مناجاة الإمام علي (ع) عند الدفن الليلي · الكافي للكليني، ج ١، ص ٤٥٨'
      },
      sources: [
        {
          book: 'تاريخ اليعقوبي',
          author: 'أحمد بن أبي يعقوب اليعقوبي',
          era: 'القرن ٣ هـ',
          quote: 'تقرير الهجوم على بيت فاطمة (ع) وامتناع الإمام علي (ع) عن البيعة وموقف الزهراء.'
        },
        {
          book: 'الملل والنحل',
          author: 'أبو الفتح الشهرستاني',
          era: 'القرن ٦ هـ',
          quote: 'نقل قول النظّام المعتزلي الصريح حول ضرب فاطمة (ع) وإسقاط المحسن يوم اقتحام الدار.'
        },
        {
          book: 'كتاب سليم بن قيس الهلالي',
          author: 'سليم بن قيس الهلالي',
          era: 'القرن ١ هـ',
          quote: 'أقدم وثيقة روائية معاصرة للإمام علي (ع) حول تفاصيل واقعة البيت واستشهاد الزهراء.'
        }
      ]
    }
  },
  en: {
    'early-life': {
      index: '01',
      title: 'Birth of Kawthar, Meccan Years & the Title "Umm Abiha"',
      subtitle: 'Nurtured in the House of Revelation & Steadfastness during the Siege of Shi’b Abi Talib',
      period: '5 Years after Prophetic Mission to the Migration to Medina',
      paragraphs: [
        'Lady Fatimah al-Zahra (SA), daughter of the Noble Prophet Muhammad (PBUH) and Lady Khadijah al-Kubra (SA), was born on 20 Jumada al-Thani in the fifth year of the Prophetic Mission in Mecca. Her birth came when detractors mocked the Prophet as being without posterity; in response, Surah al-Kawthar was revealed as glad tidings of abundant blessing and the enduring prophetic lineage through his noble daughter.',
        'Fatimah’s childhood unfolded amidst the harshest trials of early Islam, including the three-year economic and social blockade of Banu Hashim in Shi’b Abi Talib. Following the passing of Lady Khadijah (SA) in the Year of Sorrow, young Fatimah became her father’s closest source of comfort—wiping dust and ashes cast upon him in the Sacred Mosque and tending to his wounds, earning the prophetic title "Umm Abiha" ("Mother of Her Father").',
        'Raised inside the very school of revelation, Fatimah (SA) was not only an eyewitness to the descent of the Quran, but also a cornerstone of the prophetic household whose migration to Medina beside Imam Ali (AS) opened a defining chapter in Islamic history.'
      ],
      pullQuote: {
        arabic: 'فَاطِمَةُ بَضْعَةٌ مِنِّي، فَمَنْ أَغْضَبَهَا أَغْضَبَنِي',
        persian: 'Fatimah is a part of me; whoever angers her angers me.',
        source: 'Sahih al-Bukhari, Vol. 4, p. 210 · Al-Amali of Shaykh al-Saduq, Session 56'
      },
      sources: [
        {
          book: 'Al-Isabah fi Tamyiz al-Sahabah',
          author: 'Ibn Hajar al-Asqalani',
          era: '9th Century AH',
          quote: 'Affirms the title "Umm Abiha" given to Fatimah (SA) for her devotion and care for the Prophet after Khadijah’s passing.'
        },
        {
          book: 'Dala’il al-Imamah',
          author: 'Muhammad ibn Jarir al-Tabari (al-Shi’i)',
          era: '5th Century AH',
          quote: 'Documented historical account of Fatimah’s birth, upbringing in the house of revelation, and migration to Medina.'
        }
      ]
    },
    'house-of-light': {
      index: '02',
      title: 'Marriage to Imam Ali (AS) & the House of Light in Medina',
      subtitle: 'Revelation of the Verse of Purification, Surah al-Insan & Hadith al-Kisa',
      period: '2 AH – 10 AH',
      paragraphs: [
        'In the second year after the Hijrah, after prominent figures sought her hand and the Prophet (PBUH) replied that her marriage awaited divine command, Lady Fatimah (SA) was wedded to Imam Ali ibn Abi Talib (AS) with the simplest of dowries—uniting the twin pillars of Prophethood and Imamah.',
        'Their modest home adjoining the Prophet’s Mosque became the sanctuary where pivotal Quranic verses concerning Ahl al-Bayt (AS) were revealed. According to widely transmitted Shia and Sunni reports, the Prophet gathered Ali, Fatimah, Hasan, and Husayn beneath a single cloak (Hadith al-Kisa) as the Verse of Purification (Quran 33:33) was revealed.',
        'Furthermore, when the household fasted for three consecutive days and gave away their evening meals each sunset to a destitute person, an orphan, and a captive, Surah al-Insan (al-Dahr) was revealed—immortalizing their fusion of devotion, humility, and social compassion.'
      ],
      pullQuote: {
        arabic: 'إِنَّمَا يُرِيدُ اللَّهُ لِيُذْهِبَ عَنكُمُ الرِّجْسَ أَهْلَ الْبَيْتِ وَيُطَهِّرَكُمْ تَطْهِيرًا',
        persian: 'Indeed Allah desires only to remove all impurity from you, People of the Household, and to purify you thoroughly.',
        source: 'Holy Quran, Surah al-Ahzab 33:33 · Musnad Ahmad ibn Hanbal, Vol. 1, p. 331'
      },
      sources: [
        {
          book: 'Al-Manaqib',
          author: 'Ibn Shahrashub al-Mazandarani',
          era: '6th Century AH',
          quote: 'Detailed narrative of the marriage, Tasbih al-Zahra, and the occasion of revelation of Surah al-Insan.'
        },
        {
          book: 'Tafsir al-Kashshaf',
          author: 'Al-Zamakhshari',
          era: '6th Century AH',
          quote: 'Records the revelation of Surah al-Dahr in honor of Ali, Fatimah, Hasan, and Husayn after feeding the needy.'
        }
      ]
    },
    'fadak-sermon': {
      index: '03',
      title: 'The Sermon of Fadak: Legal, Theological & Political Defense of Imamah',
      subtitle: 'Historic Address in the Prophet’s Mosque after the Passing of the Messenger (PBUH)',
      period: 'Early Months after 28 Safar 11 AH',
      paragraphs: [
        'Following the passing of Prophet Muhammad (PBUH) on 28 Safar 11 AH and the assembly at Saqifah Bani Sa’idah, the fertile estate of Fadak—gifted to Fatimah (SA) during the Prophet’s lifetime in fulfillment of the verse "Give the near kinsman his due"—was confiscated by the ruling authority, weakening the economic independence of the Prophet’s family.',
        'Accompanied by the women of Banu Hashim, Lady Fatimah (SA) entered the Prophet’s Mosque and delivered the monumental Sermon of Fadak before the Muhajirun and Ansar. Beginning with a profound exposition on divine unity and the inner purpose of Islamic commandments, she dismantled the claim that prophets leave no inheritance by citing explicit Quranic precedents of Solomon inheriting from David and Zachariah’s prayer.',
        'Beyond property rights, the core of the Fadak Sermon was an urgent defense of Imamah as the safeguard against communal fragmentation—warning Medina against abandoning the covenant of Ghadir and the leadership of Imam Ali (AS).'
      ],
      pullQuote: {
        arabic: 'وَطَاعَتُنَا نِظَامًا لِلْمِلَّةِ، وَإِمَامَتُنَا أَمَانًا لِلْفُرْقَةِ',
        persian: 'Obedience to us is the order of the community, and our Imamah is a safeguard against division.',
        source: 'Al-Ihtijaj of al-Tabarsi, Vol. 1, p. 134 · Sharh Nahj al-Balagha of Ibn Abi al-Hadid, Vol. 16, p. 211'
      },
      sources: [
        {
          book: 'Al-Ihtijaj',
          author: 'Ahmad ibn Ali al-Tabarsi',
          era: '6th Century AH',
          quote: 'Full Arabic text of the Sermon of Fadak and Lady Fatimah’s debate inside the Prophet’s Mosque.'
        },
        {
          book: 'Balaghat al-Nisa',
          author: 'Ibn Tayfur',
          era: '3rd Century AH',
          quote: 'Earliest non-Shia literary source preserving the Sermon of Fadak with its chain of transmission.'
        }
      ]
    },
    'martyrdom-burial': {
      index: '04',
      title: 'Assault on the House of Revelation, Martyrdom & the Hidden Grave',
      subtitle: 'The Tragedy of Bayt al-Zahra, Loss of Muhsin (AS) & Secret Night Burial',
      period: 'Jumada al-Ula – Jumada al-Thani 11 AH (75 or 95 Days)',
      paragraphs: [
        'When Imam Ali (AS) withheld allegiance from the Saqifah succession and loyal companions gathered at Lady Fatimah’s residence, enforcement agents stormed the House of Revelation to compel allegiance, threatening to set the house ablaze. When reminded that Fatimah (SA) was inside, the door was forced open against her protest; the severe impact injured her ribs and caused the miscarriage and martyrdom of her unborn son, Muhsin (AS).',
        'This grave injury confined Lady Fatimah (SA) to her sickbed. In her final testament, she instructed Imam Ali (AS) to wash, shroud, and bury her secretly by night, excluding those who had wronged her from attending her funeral, so that her concealed resting place would remain an enduring moral question in Islamic memory.',
        'According to the two established accounts—75 days (13 Jumada al-Ula) or 95 days (3 Jumada al-Thani) after the Prophet’s passing—al-Siddiqah al-Kubra (SA) attained martyrdom at age eighteen and was laid to rest silently at night by Imam Ali (AS) alongside close companions including Salman, Abu Dharr, Miqdad, and Banu Hashim.'
      ],
      pullQuote: {
        arabic: 'السَّلَامُ عَلَيْكَ يَا رَسُولَ اللَّهِ عَنِّي وَعَنِ ابْنَتِكَ النَّازِلَةِ فِي جِوَارِكَ',
        persian: 'Peace be upon you, O Messenger of God, from me and from your daughter who has hastened to join your company.',
        source: 'Elegy of Imam Ali (AS) at the Night Burial · Al-Kafi of al-Kulayni, Vol. 1, p. 458'
      },
      sources: [
        {
          book: 'Tarikh al-Yaqubi',
          author: 'Ahmad ibn Abi Yaqub al-Yaqubi',
          era: '3rd Century AH',
          quote: 'Chronicles the raid on Fatimah’s home, Ali’s refusal of allegiance, and Fatimah’s final words.'
        },
        {
          book: 'Al-Milal wa al-Nihal',
          author: 'Abu al-Fath al-Shahrastani',
          era: '6th Century AH',
          quote: 'Preserves al-Nazzam’s historical citation regarding the injury inflicted on Fatimah (SA) and the loss of Muhsin.'
        },
        {
          book: 'Kitab Sulaym ibn Qays al-Hilali',
          author: 'Sulaym ibn Qays al-Hilali',
          era: '1st Century AH',
          quote: 'Earliest surviving narrative from Imam Ali’s era documenting the assault on the House of Revelation.'
        }
      ]
    }
  }
};

const TEACHING_TRANSLATIONS: Record<
  LocaleNonFa,
  Record<string, Omit<CoreTeaching, 'id' | 'arabicPrinciple'>>
> = {
  ar: {
    'teaching-tawhid': {
      index: '٠١',
      title: 'المعرفة التوحيدية وفلسفة الشرائع في الخطبة الفدكية',
      category: 'الكلام والإلهيات',
      explanation:
        'تجاوزت السيدة الزهراء (ع) في مطلع الخطبة الفدكية الظاهرَ الشكلي للعبادات نحو غاياتها الأخلاقية والاجتماعية: فالإيمان تطهير من الشرك، والصلاة تنزيه عن الكبر، والزكاة تزكية للنفس ونماء في الرزق، والصيام تثبيت للإخلاص، والعدل تسكين للقلوب.',
      shiaSignificance:
        'يمثل هذا البيان حجر الأساس للمنهج العقلي والحكمي في الفقه والكلام الشيعي؛ حيث تُفهم الشريعة بوصفها منظومة هادفة لسمو الروح وإقامة القسط الاجتماعي.',
      reference: 'الاحتجاج للطبرسي، ج ١، ص ١٣٢'
    },
    'teaching-imamah': {
      index: '٠٢',
      title: 'الإمامة بوصفها نظام الملّة والأمان من الفرقة',
      category: 'الفكر السياسي الشيعي',
      explanation:
        'في فكر السيدة فاطمة (ع)، ليست الإمامة امتيازاً قبلياً أو منصباً دنيوياً، بل هي المبدأ التنظيمي الذي يصون الأمة بعد النبي من التمزق في صراعات السلطة والانقسامات المذهبية.',
      shiaSignificance:
        'تُعد هذه العبارة الموجزة أدق تعريف لفلسفة السياسة في التراث الشيعي، وترفع دفاع الزهراء (ع) عن خلافة الإمام علي (ع) إلى مستوى الدفاع عن أصل الإمامة وكيان الأمة.',
      reference: 'بحار الأنوار، ج ٢٩، ص ٢٢٣'
    },
    'teaching-tasbih': {
      index: '٠٣',
      title: 'التسبيح الفاطمي والزهد والارتباط الروحي بالعمل',
      category: 'الأخلاق والسلوك الروحي',
      explanation:
        'عندما طلبت السيدة الزهراء (ع) من النبي (ص) خادماً يعينها في مشقة أعمال المنزل، علّمها رسول الله تسبيحاً عُرف بتسبيح الزهراء (٣٤ الله أكبر، ٣٣ الحمد لله، ٣٣ سبحان الله)، فكان زادها الروحي الدائم مع تفانيها في خدمة الفقراء.',
      shiaSignificance:
        'يرمز تسبيح الزهراء عقب كل صلاة في المدرسة الشيعية إلى أن القوة الروحية تنبع من الذكر وتهذيب النفس، وأن الروحانية الأصيلة تقترن بالعمل والإيثار.',
      reference: 'الكافي، ج ٣، ص ٣٤٢ · أمالي الصدوق'
    },
    'teaching-wilayah-defense': {
      index: '٠٤',
      title: 'المسؤولية التاريخية وصون الحقيقة رغم صمت الأغلبية',
      category: 'السيرة الاجتماعية والمعرفية',
      explanation:
        'في مناخ سادته المساومة والصمت في المدينة، أثبتت السيدة فاطمة (ع) بحضورها الواعي واحتجاجها أمام المهاجرين والأنصار أن الحق لا يُقاس بالعدد، وأن إقامة الحجة واجب رسالي على كل جيل.',
      shiaSignificance:
        'ألهمت هذه السيرة خطب السيدة زينب (ع) في الكوفة والشام، ورسّخت في الثقافة الشيعية نموذج الوعي المقاوم لتزييف التاريخ.',
      reference: 'أمالي الشيخ الطوسي · شرح نهج البلاغة، ج ١٦'
    }
  },
  en: {
    'teaching-tawhid': {
      index: '01',
      title: 'Monotheistic Theology & Philosophy of Worship in the Fadak Sermon',
      category: 'Theology & Ethics',
      explanation:
        'In the opening of her Fadak Sermon, Lady Fatimah (SA) reveals the inner ethical and social wisdom behind Islamic obligations: faith purifies from polytheism, prayer humbles pride, zakat nurtures the soul and sustains the needy, fasting anchors sincerity, and justice brings serenity to hearts.',
      shiaSignificance:
        'This exposition forms the bedrock of rational jurisprudence and theology in Shia Islam, viewing Sharia as a purposeful ethical system rather than mere outward ritual.',
      reference: 'Al-Ihtijaj of al-Tabarsi, Vol. 1, p. 132'
    },
    'teaching-imamah': {
      index: '02',
      title: 'Imamah as Social Order & Safeguard Against Fragmentation',
      category: 'Shia Political Philosophy',
      explanation:
        'In Fatimah’s (SA) worldview, Imamah is neither tribal privilege nor worldly kingship; rather, it is the unifying moral architecture that preserves the Muslim community after the Prophet from splintering under power struggles.',
      shiaSignificance:
        'Considered the most concise formulation of Shia political theory, this principle elevates Lady Fatimah’s defense of Imam Ali’s (AS) caliphate into a universal defense of rightful guidance.',
      reference: 'Bihar al-Anwar, Vol. 29, p. 223'
    },
    'teaching-tasbih': {
      index: '03',
      title: 'Tasbih al-Zahra, Simplicity & Spiritual Resilience in Labor',
      category: 'Spirituality & Ethics',
      explanation:
        'When Fatimah (SA) asked the Prophet for assistance with exhausting household labor, he gifted her the remembrance known as Tasbih al-Zahra (34 Allahu Akbar, 33 Alhamdulillah, 33 SubhanAllah)—uniting tireless daily service and charity with serene inner devotion.',
      shiaSignificance:
        'Recited after every daily prayer in Shia practice, Tasbih al-Zahra embodies the unity of contemplation, humility, and compassionate solidarity with the poor.',
      reference: 'Al-Kafi, Vol. 3, p. 342 · Amali al-Saduq'
    },
    'teaching-wilayah-defense': {
      index: '04',
      title: 'Moral Courage & Bearing Witness Amid Communal Silence',
      category: 'Social & Civic Witness',
      explanation:
        'In an atmosphere dominated by political expediency, Lady Fatimah (SA) stepped into the public mosque to establish an enduring testimony before the community, proving that truth is never determined by numerical majority.',
      shiaSignificance:
        'Within Shia consciousness, her stand directly inspired Lady Zaynab’s (SA) historic addresses in Kufa and Damascus and serves as the archetype of speaking truth against historical erasure.',
      reference: 'Al-Amali of Shaykh al-Tusi · Sharh Nahj al-Balagha, Vol. 16'
    }
  }
};

const SHIA_TRANSLATIONS: Record<
  LocaleNonFa,
  Record<string, Omit<ShiaPillar, 'id' | 'hadithArabic'>>
> = {
  ar: {
    'origin-of-shia': {
      index: '٠١',
      title: 'معنى «الشيعة» وجذورها القرآنية والنبوية',
      subtitle: 'من خُلاص الصحابة مع النبي (ص) إلى تشكل مدرسة الإمامة',
      summary:
        'تُطلق كلمة «الشيعة» في اللغة على الأتباع والأنصار، وقد استعملها النبي الأكرم (ص) في حياته لوصف ثلة من الصحابة المخلصين لعلي بن أبي طالب (ع) مثل سلمان الفارسي وأبي ذر الغفاري والمقداد بن الأسود وعمار بن ياسر.',
      details: [
        'تشير روايات الفريقين في تفسير آية «أولئك هم خير البرية» (البينة: ٧) إلى قول النبي (ص) لعلي (ع): «أنت وشيعتك هم الفائزون يوم القيامة».',
        'لم يكن التشيع انشقاقاً سياسياً متأخراً، بل قراءة أصيلة للإسلام ترى أن استمرار الهداية بعد النبوة يكمن في التمسك المتلازم بكتاب الله والعترة الطاهرة.'
      ],
      hadithTranslation:
        'إني تارك فيكم الثقلين: كتاب الله وعترتي أهل بيتي، ما إن تمسكتم بهما لن تضلوا بعدي أبداً.',
      hadithSource: 'حديث الثقلين المتواتر · صحيح مسلم، ج ٤، ص ١٨٧٣ · الكافي، ج ١'
    },
    'aal-ali-imamah': {
      index: '٠٢',
      title: 'مدرسة آل علي (عليهم السلام) وفلسفة الإمامة',
      subtitle: 'الفارق الجوهري بين الولاية المعنوية والملك الوراثي',
      summary:
        'في رؤية آل علي (ع)، لا تُعد قيادة الأمة مجرد عقد حزبي أو ملك عضوض؛ بل هي امتداد للرسالة الروحية ومرجعية علمية لتبيين القرآن وإقامة العدالة الاجتماعية.',
      details: [
        'يمثل الإمام علي (ع)، باب مدينة علم النبي وزوج السيدة الزهراء (ع)، محور هذه المدرسة التي تواصلت في أحد عشر إماماً معصوماً من ذرية علي وفاطمة (ع).',
        'ترتكز سيرة آل علي على أربع دعائم: العدالة الصارمة في بيت المال، العقلانية التوحيدية، حفظ الكرامة الإنسانية حتى مع الخصوم، والثبات أمام تحريف الدين.'
      ],
      hadithTranslation: 'أنا مدينة العلم وعلي بابها، فمن أراد المدينة فليأتها من بابها.',
      hadithSource: 'مستدرك الحاكم النيسابوري، ج ٣، ص ١٢٦ · أمالي الشيخ الصدوق'
    },
    'intellectual-legacy': {
      index: '٠٣',
      title: 'التراث المكتوب؛ من نهج البلاغة إلى الصحيفة السجادية',
      subtitle: 'كنوز الأدب والحكمة والدعاء والحقوق في مدرسة أهل البيت',
      summary:
        'أنتجت المدرسة الشيعية إلى جانب التأريخ واحداً من أغنى التقاليد المكتوبة في الحضارة الإسلامية، جامعاً بين الأخلاق والسياسة والمناجاة والفقه.',
      details: [
        'يضم نهج البلاغة (جمع الشريف الرضي) خطب التوحيد وعهد الإمام علي (ع) لمالك الأشتر، الذي يُعد ميثاقاً مبكراً لحقوق الرعية والعدل الإداري في القرن الأول.',
        'وبالإضافة إلى الصحيفة السجادية ورسالة الحقوق للإمام السجاد (ع)، أرست جامعة الإمام الباقر والإمام الصادق (ع) دعائم الفقه الجعفري والكلام العقلي.'
      ],
      hadithTranslation:
        'فإنهم صنفان: إما أخ لك في الدين، وإما نظير لك في الخلق؛ فأشعر قلبك الرحمة للرعية.',
      hadithSource: 'نهج البلاغة، الكتاب ٥٣ (عهد مالك الأشتر)'
    },
    'historiography-method': {
      index: '٠٤',
      title: 'منهجية كتابة التاريخ حول آل علي والأيام الفاطمية',
      subtitle: 'كيف نقرأ ونمحّص روايات صدر الإسلام بموضوعية علمية؟',
      summary:
        'تتطلب المعرفة الدقيقة لتاريخ التشيع واستشهاد السيدة الزهراء (ع) الجمع بين أقدم كتب التاريخ العام في الإسلام وبين المصادر الروائية والدراسات النقدية التخصصية.',
      details: [
        'وثّق مؤرخو القرون الثاني والثالث والرابع للهجرة أمثال اليعقوبي والبلاذري والطبري والمسعودي وابن قتيبة، رغم تباين مشاربهم، ملامح مهمة من أحداث السقيفة وفدك واقتحام بيت فاطمة (ع).',
        'وإلى جانب تلك التواريخ، تقدم المصادر الشيعية الأصيلة ككتاب سليم بن قيس والاحتجاج للطبرسي وبحوث العلامة جعفر مرتضى العاملي ورسول جعفريان صورة متكاملة لصدر الإسلام.'
      ],
      hadithTranslation: 'رحم الله امرأً أحيا أمرنا وذكرنا وعلم الناس محاسن كلامنا.',
      hadithSource: 'عيون أخبار الرضا، ج ١، ص ٣٠٧'
    }
  },
  en: {
    'origin-of-shia': {
      index: '01',
      title: 'Meaning of "Shia" & Its Quranic and Prophetic Roots',
      subtitle: 'From the Prophet’s Devoted Companions to the School of Imamah',
      summary:
        'Linguistically meaning "followers" or "adherents," the term Shia was used in the Prophet’s own lifetime for devoted companions of Ali ibn Abi Talib (AS) such as Salman al-Farsi, Abu Dharr al-Ghifari, Miqdad ibn Aswad, and Ammar ibn Yasir.',
      details: [
        'In classical exegesis of Surah al-Bayyinah (98:7, "the best of creatures"), multiple Shia and Sunni transmissions report the Prophet addressing Imam Ali (AS): "You and your Shia are the triumphant on the Day of Resurrection."',
        'Shia Islam is not a later political splinter, but an authentic reading of Islam holding that prophetic guidance endures through the inseparable bond between the Quran and the Prophet’s Family (Ahl al-Bayt).'
      ],
      hadithTranslation:
        'I leave among you two weighty trusts: the Book of God and my progeny, my Household (Ahl al-Bayt); so long as you hold fast to both, you shall never go astray.',
      hadithSource: 'Mutawatir Hadith al-Thaqalayn · Sahih Muslim, Vol. 4, p. 1873 · Al-Kafi, Vol. 1'
    },
    'aal-ali-imamah': {
      index: '02',
      title: 'The School of Aal-e Ali (AS) & Philosophy of Imamah',
      subtitle: 'Why Spiritual Guardianship Differs Fundamentally from Dynastic Kingship',
      summary:
        'In the worldview of Aal-e Ali (AS), communal leadership is neither partisan bargaining nor hereditary monarchy; it is spiritual continuity, authoritative Quranic scholarship, and uncompromising social justice.',
      details: [
        'Imam Ali (AS)—the Gate of the City of Prophetic Knowledge and husband of Lady Fatimah (SA)—stands at the center of this lineage continued through eleven infallible Imams descended from Ali and Fatimah (AS).',
        'Four pillars define their conduct: strict equity in public treasury, rational monotheism over literalism, human dignity even toward adversaries, and resistance to doctrinal distortion.'
      ],
      hadithTranslation:
        'I am the city of knowledge and Ali is its gate; whoever seeks knowledge must enter through the gate.',
      hadithSource: 'Mustadrak al-Hakim, Vol. 3, p. 126 · Amali of Shaykh al-Saduq'
    },
    'intellectual-legacy': {
      index: '03',
      title: 'Written Heritage: From Nahj al-Balagha to Sahifa al-Sajjadiyya',
      subtitle: 'Treasures of Eloquence, Ethics, Supplication & Civic Law',
      summary:
        'Alongside historical chronicles, the Shia tradition forged one of the richest literary and philosophical canons in Islamic civilization—uniting governance, devotion, and jurisprudence.',
      details: [
        'Nahj al-Balagha (compiled by al-Sharif al-Radi) preserves Imam Ali’s (AS) sermons and his celebrated Epistle to Malik al-Ashtar—a landmark 1st-century charter of civic rights and accountable administration.',
        'Combined with Imam al-Sajjad’s (AS) Sahifa al-Sajjadiyya and Treatise on Rights, and the scholarly circle of Imams al-Baqir and al-Sadiq (AS), this legacy established Ja’fari jurisprudence and rational theology.'
      ],
      hadithTranslation:
        'People are of two kinds: either your brother in faith or your equal in creation; therefore infuse your heart with mercy and fairness toward all.',
      hadithSource: 'Nahj al-Balagha, Letter 53 (Epistle to Malik al-Ashtar)'
    },
    'historiography-method': {
      index: '04',
      title: 'Historiography of Aal-e Ali & the Fatimiyyah Events',
      subtitle: 'How Historians Cross-Examine Primary Chronicles of Early Islam',
      summary:
        'Rigorous study of early Shia history and the martyrdom of Lady Fatimah (SA) draws simultaneously upon Islam’s oldest general chronicles, narration compendiums, and modern critical studies.',
      details: [
        'Early historians of the 2nd–4th centuries AH—including al-Yaqubi, al-Baladhuri, al-Tabari, al-Masudi, and Ibn Qutaybah—recorded pivotal fragments concerning Saqifah, Fadak, and the confrontation at Fatimah’s residence.',
        'Alongside these chronicles, early Shia works like Kitab Sulaym ibn Qays and al-Ihtijaj, together with modern comparative research by Ja’far Murtada al-Amili and Rasul Ja’farian, construct a cohesive historical picture.'
      ],
      hadithTranslation:
        'May God show mercy to whoever keeps our cause alive and preserves the integrity of our heritage.',
      hadithSource: 'Uyun Akhbar al-Rida, Vol. 1, p. 307'
    }
  }
};

const TIMELINE_TRANSLATIONS: Record<
  LocaleNonFa,
  Record<
    string,
    Omit<TimelineEvent, 'id' | 'relatedTarget'> & { relatedLabel: string }
  >
> = {
  ar: {
    'tl-birth-fatimah': {
      dateHijri: '٢٠ جمادى الآخرة، ٥ للبعثة',
      eraLabel: 'العهد المكي',
      title: 'مولد السيدة فاطمة الزهراء (ع) ونزول سورة الكوثر',
      shortSubtitle: 'بداية امتداد النسل النبوي وسط ضغوط قريش',
      description:
        'في السنة الخامسة للبعثة وُلدت السيدة الزهراء (ع) بمكة، ونزلت سورة الكوثر رداً على طعن المشركين. شاركت منذ صغرها في صمود حصار شعب أبي طالب ومؤازرة النبي (ص) حتى لُقّبت بـ«أمّ أبيها».',
      significance:
        'يمثل مولدها في الإلهيات الشيعية فاتحة الامتداد المعنوي والنسلي للرسالة المحمدية وتكوين شجرة أهل البيت المباركة.',
      relatedLabel: 'قراءة فصل المولد وسنوات مكة'
    },
    'tl-marriage-kisa': {
      dateHijri: 'السنة ٢ – ٩ هـ',
      eraLabel: 'المدينة المنورة',
      title: 'الزواج من الإمام علي (ع)، حديث الكساء والمباهلة',
      shortSubtitle: 'تأسيس بيت أهل البيت ونزول آية التطهير',
      description:
        'تم القران السماوي بين الإمام علي (ع) والسيدة الزهراء (ع) في المدينة، وتلتْه واقعة أصحاب الكساء ونزول آية التطهير، ثم سورة الإنسان بعد الإيثار، وحضور الخمسة أهل الكساء في يوم المباهلة (١٠ هـ).',
      significance:
        'حددت هذه الوقائع المصداق الدقيق لـ«أهل البيت» في القرآن الكريم وأبرزت مكانة فاطمة (ع) بوصفها حلقة الوصل بين النبوة والإمامة.',
      relatedLabel: 'قراءة فصل بيت الوحي وآية التطهير'
    },
    'tl-ghadir': {
      dateHijri: '١٨ ذي الحجة سنة ١٠ هـ',
      eraLabel: 'حجة الوداع',
      title: 'واقعة غدير خم وإبلاغ حديث الثقلين',
      shortSubtitle: 'تنصيب الإمام علي (ع) لولاية الأمة وهدايتها',
      description:
        'ألقى النبي الأكرم (ص) في طريق عودته من حجة الوداع بغدير خم خطبته الجامعة ورفع يد علي بن أبي طالب (ع) قائلاً: «من كنت مولاه فهذا علي مولاه»، مؤكداً التلازم بين القرآن والعترة.',
      significance:
        'يمثل غدير خم الوثيقة التأسيسية للتشيع حول استمرار الهداية الإلهية عبر إمامة آل علي (عليهم السلام).',
      relatedLabel: 'الانتقال إلى قسم التشيع وآل علي'
    },
    'tl-saqifah-fadak': {
      dateHijri: 'الربع الأول سنة ١١ هـ',
      eraLabel: 'بعد رحيل النبي (ص)',
      title: 'رحيل النبي (ص)، السقيفة والخطبة الفدكية',
      shortSubtitle: 'وقفة السيدة الزهراء (ع) التاريخية في المسجد النبوي',
      description:
        'عقب وفاة النبي في ٢٨ صفر ١١ هـ وأحداث السقيفة، صودرت أرض فدك. دخلت الزهراء (ع) المسجد النبوي واحتجت بخطبتها الخالدة مستندة إلى التوحيد وحكمة الشرائع ونصوص الإرث القرآنية وأصل الإمامة.',
      significance:
        'الخطبة الفدكية هي أهم وثيقة فكرية وسياسية مكتوبة للدفاع عن شرعية الإمامة في الأيام الأولى بعد النبوة.',
      relatedLabel: 'قراءة فصل الخطبة الفدكية كاملاً'
    },
    'tl-martyrdom-fatimah': {
      dateHijri: '١٣ جمادى الأولى / ٣ جمادى الآخرة ١١ هـ',
      eraLabel: 'الأيام الفاطمية',
      title: 'الهجوم على بيت الوحي واستشهاد السيدة فاطمة (ع)',
      shortSubtitle: 'استشهاد المحسن بن علي (ع) والتشييع الليلي بالمدينة',
      description:
        'أثناء الإكراه على البيعة من الإمام علي (ع)، أدى اقتحام بيت الزهراء (ع) إلى إصابتها البالغة واستشهاد جنينها المحسن (ع). وبعد ٧٥ أو ٩٥ يوماً من المرض، استشهدت (ع) ودُفنت ليلاً سراً حسب وصيتها.',
      significance:
        'أصبح القبر المخفي للسيدة الزهراء (ع) رمزاً للضمير الحي ورفض الظلم في وجدان التاريخ الشيعي.',
      relatedLabel: 'عرض كتاب «بيت الأحزان» في المتجر'
    },
    'tl-imam-ali-kufa': {
      dateHijri: '٣٥ – ٤٠ هـ',
      eraLabel: 'الخلافة الظاهرية ونهج البلاغة',
      title: 'حكومة العدل للإمام علي (ع) في الكوفة واستشهاده في المحراب',
      shortSubtitle: 'تدوين تراث العدالة العلوية',
      description:
        'بعد خمس وعشرين سنة من الصبر صوناً لوحدة الأمة، بايع الناس الإمام علي (ع). نقل العاصمة إلى الكوفة وأحيا القسط في المال والقضاء، ثم استُشهد فجر ٢١ رمضان سنة ٤٠ هـ في مسجد الكوفة.',
      significance:
        'شكّلت خطبه ورسائله وحكمه التي جُمعت في «نهج البلاغة» أسمى مرجع لأخلاق الحكم في الحضارة الإسلامية.',
      relatedLabel: 'عرض كتاب «نهج البلاغة» في المتجر'
    },
    'tl-karbala': {
      dateHijri: '١٠ محرم سنة ٦١ هـ',
      eraLabel: 'نهضة عاشوراء',
      title: 'ثورة الإمام الحسين (ع) في كربلاء وخطب السيدة زينب (ع)',
      shortSubtitle: 'إحياء روح الإسلام وفضح الانحراف الأموي',
      description:
        'بعد استشهاد الإمام الحسن (ع) وتحويل الخلافة إلى ملك وراثي بيد يزيد، نهض الإمام الحسين (ع) ابن فاطمة الزهراء في كربلاء رافضاً الظلم واستُشهد مع أصحابه، وتولت السيدة زينب (ع) إبلاغ رسالة النهضة في الكوفة والشام.',
      significance:
        'رسمت عاشوراء خطاً فاصلاً أبدياً بين الإسلام النبوي العلوي وبين الاستبداد، ورسخت روح التضحية والإباء.',
      relatedLabel: 'مراجعة قسم تاريخ التشيع وآل علي'
    },
    'tl-jafari-school': {
      dateHijri: 'القرن ١ – ٤ هـ',
      eraLabel: 'النهضة العلمية والتدوين',
      title: 'جامعة الإمامين الباقر والصادق (ع) وتدوين الكتب الأربعة',
      shortSubtitle: 'ترسيخ الفقه والكلام والتاريخ في مدرسة أهل البيت',
      description:
        'في المرحلة الفاصلة بين الدولتين الأموية والعباسية، خرّج الإمامان الباقر والصادق (ع) آلاف العلماء في علوم القرآن والحديث والفقه والكلام، ودُوّن هذا التراث لاحقاً في القرنين الثالث والرابع في الأصول الشيعية الأربعة.',
      significance:
        'يمثل الفقه الجعفري والمدونات التاريخية الموثقة ثمرة مباشرة لتلك الحركة العلمية الكبرى في المدينة والكوفة.',
      relatedLabel: 'عرض كتاب «تاريخ التشيع» في المصادر'
    }
  },
  en: {
    'tl-birth-fatimah': {
      dateHijri: '20 Jumada al-Thani, Year 5 of Mission',
      eraLabel: 'Meccan Era',
      title: 'Birth of Lady Fatimah al-Zahra (SA) & Revelation of Surah al-Kawthar',
      shortSubtitle: 'Continuity of Prophetic Lineage Amid Meccan Persecution',
      description:
        'Born in Mecca five years into the Prophetic Mission, Fatimah (SA) embodied the divine promise of Surah al-Kawthar. From early childhood she endured the siege of Shi’b Abi Talib and stood beside her father, earning the title "Umm Abiha."',
      significance:
        'In Shia theology, her birth inaugurates the spiritual and generational continuity of the Prophet’s house (Ahl al-Bayt).',
      relatedLabel: 'Read Birth & Meccan Years Chapter'
    },
    'tl-marriage-kisa': {
      dateHijri: '2 AH – 9 AH',
      eraLabel: 'Medina',
      title: 'Marriage to Imam Ali (AS), Hadith al-Kisa & Mubahalah',
      shortSubtitle: 'Formation of Ahl al-Bayt & Verse of Purification',
      description:
        'The marriage of Imam Ali (AS) and Lady Fatimah (SA) in Medina preceded landmark Quranic moments: the Gathering Under the Cloak (Quran 33:33), Surah al-Insan honoring their three-day charity, and the Event of Mubahalah (10 AH).',
      significance:
        'These events defined the precise Quranic identity of Ahl al-Bayt and placed Fatimah (SA) as the bridge between Prophethood and Imamah.',
      relatedLabel: 'Read House of Light Chapter'
    },
    'tl-ghadir': {
      dateHijri: '18 Dhu al-Hijjah 10 AH',
      eraLabel: 'Farewell Pilgrimage',
      title: 'Event of Ghadir Khumm & Hadith al-Thaqalayn',
      shortSubtitle: 'Appointment of Imam Ali (AS) as Guardian & Guide of the Ummah',
      description:
        'Returning from the Farewell Pilgrimage, Prophet Muhammad (PBUH) addressed the assembly at Ghadir Khumm, raising Ali’s hand and declaring: "Whomever I am master of, Ali is his master," alongside emphasizing the Quran and his Ahl al-Bayt.',
      significance:
        'Ghadir Khumm stands as the foundational Shia covenant affirming unbroken divine guidance through the Imams of Aal-e Ali (AS).',
      relatedLabel: 'Explore Shia Islam & Aal-e Ali'
    },
    'tl-saqifah-fadak': {
      dateHijri: 'Early 11 AH',
      eraLabel: 'Post-Prophetic Transition',
      title: 'Passing of the Prophet (PBUH), Saqifah & the Sermon of Fadak',
      shortSubtitle: 'Lady Fatimah’s Historic Address Inside the Prophet’s Mosque',
      description:
        'Following 28 Safar 11 AH and the Saqifah assembly, the estate of Fadak was confiscated. Lady Fatimah (SA) entered the mosque and delivered the Fadak Sermon—synthesizing monotheism, Quranic inheritance law, and the imperative of Imamah.',
      significance:
        'The Fadak Sermon remains the earliest preserved intellectual and political manifesto defending rightful leadership after the Prophet.',
      relatedLabel: 'Read Full Fadak Sermon Chapter'
    },
    'tl-martyrdom-fatimah': {
      dateHijri: '13 Jumada al-Ula / 3 Jumada al-Thani 11 AH',
      eraLabel: 'Days of Fatimiyyah',
      title: 'Assault on the House of Revelation & Martyrdom of Fatimah (SA)',
      shortSubtitle: 'Martyrdom of Muhsin (AS) & Secret Night Burial in Medina',
      description:
        'During attempts to force Imam Ali’s allegiance, the raid on Fatimah’s residence inflicted fatal injuries and caused the martyrdom of Muhsin (AS). Seventy-five or ninety-five days after her father’s passing, she passed away and was buried secretly at night by her wish.',
      significance:
        'Lady Fatimah’s hidden grave became an enduring symbol of moral conscience and resistance against historical injustice.',
      relatedLabel: 'Inspect "Bayt al-Ahzan" in Bookshop'
    },
    'tl-imam-ali-kufa': {
      dateHijri: '35 – 40 AH',
      eraLabel: 'Caliphate & Nahj al-Balagha',
      title: 'Imam Ali’s (AS) Reign of Justice in Kufa & Martyrdom in Prayer',
      shortSubtitle: 'Codifying Alawi Civic Justice & Spiritual Wisdom',
      description:
        'After twenty-five years of patient restraint, the community turned to Imam Ali (AS) for leadership. Governing from Kufa, he restored treasury equity and judicial integrity until his martyrdom during dawn prayer on 21 Ramadan 40 AH.',
      significance:
        'His sermons, letters, and aphorisms collected in Nahj al-Balagha remain a pinnacle of ethical statecraft in Islamic thought.',
      relatedLabel: 'Inspect "Nahj al-Balagha" in Bookshop'
    },
    'tl-karbala': {
      dateHijri: '10 Muharram 61 AH',
      eraLabel: 'Uprising of Ashura',
      title: 'Stand of Imam Husayn (AS) at Karbala & Addresses of Lady Zaynab (SA)',
      shortSubtitle: 'Reviving Prophetic Conscience Against Umayyad Tyranny',
      description:
        'Confronting hereditary authoritarian rule, Imam Husayn (AS), son of Fatimah, stood at Karbala with his family and companions, giving his life to safeguard the moral core of Islam, while Lady Zaynab (SA) proclaimed his message in Kufa and Damascus.',
      significance:
        'Ashura drew an eternal moral line between prophetic justice and despotic power, shaping Shia ethical consciousness forever.',
      relatedLabel: 'View Shia History Section'
    },
    'tl-jafari-school': {
      dateHijri: '1st – 4th Centuries AH',
      eraLabel: 'Scholarly Renaissance',
      title: 'Academy of Imams al-Baqir & al-Sadiq (AS) & the Four Canonical Books',
      shortSubtitle: 'Systematizing Jurisprudence, Theology & Historical Documentation',
      description:
        'During the Umayyad–Abbasid transition, Imams Muhammad al-Baqir and Ja’far al-Sadiq (AS) trained thousands of scholars across Quranic exegesis, law, theology, and rational sciences—crystallized in the Four Major Shia Hadith Compendiums.',
      significance:
        'Ja’fari jurisprudence and foundational Islamic historiography emerged directly from this scholarly golden age.',
      relatedLabel: 'Inspect "History of Shi’ism" Book'
    }
  }
};

const BOOK_TRANSLATIONS: Record<
  LocaleNonFa,
  Record<
    string,
    Pick<
      BookItem,
      | 'title'
      | 'author'
      | 'translator'
      | 'eraLabel'
      | 'publisher'
      | 'binding'
      | 'shortSummary'
      | 'shiaRelevance'
      | 'historicalSources'
      | 'sampleExcerpt'
      | 'tableOfContents'
      | 'keywords'
    >
  >
> = {
  ar: {
    'book-bayt-al-ahzan': {
      title: 'بيت الأحزان في مصائب سيدة النسوان',
      author: 'الشيخ عباس القمي (المحدّث القمي)',
      translator: 'تحقيق وتقديم: مركز الدراسات الفاطمية',
      eraLabel: 'مرجع كلاسيكي أصيل (القرن ١٤ هـ)',
      publisher: 'دار دليل ما للنشر',
      binding: 'مجلد فني مذهّب',
      shortSummary:
        'أشهر وأشمل دراسة كلاسيكية حول حياة وفضائل والخطبة الفدكية ومرض واستشهاد السيدة فاطمة الزهراء (ع) استناداً إلى أمهات المصادر الروائية والتاريخية.',
      shiaRelevance:
        'شكّل هذا الكتاب طوال قرن كامل المرجع الأساسي لمجالس البحث وإحياء الأيام الفاطمية بجمعه الموثق والمنسق للروايات المتناثرة.',
      historicalSources: 'مستند إلى الاحتجاج، أمالي الصدوق، كشف الغمة وبحار الأنوار',
      sampleExcerpt:
        '«لما شاع نبأ رحيل خاتم الأنبياء في المدينة، تشكلت أولى الأزمات في سقيفة بني ساعدة، فنهضت فاطمة الصديقة (ع) مدافعة عن حريم الإمامة ومقيمة الحجة على الجميع...»',
      tableOfContents: [
        'الفصل الأول: مولد وأسماء وألقاب السيدة الزهراء (ع)',
        'الفصل الثاني: الزواج من أمير المؤمنين وآية التطهير',
        'الفصل الثالث: قصة السقيفة وفدك والنص الكامل للخطبة الفدكية',
        'الفصل الرابع: الهجوم على بيت الوحي واستشهاد المحسن والدفن الليلي'
      ],
      keywords: ['استشهاد الزهراء', 'فاطمة الزهراء', 'بيت الأحزان', 'الخطبة الفدكية', 'السقيفة', 'المحسن']
    },
    'book-sulaym': {
      title: 'كتاب سليم بن قيس الهلالي (أسرار آل محمد)',
      author: 'سليم بن قيس الهلالي (من أصحاب الإمام علي ع)',
      translator: 'تحقيق: محمد باقر الأنصاري الزنجاني',
      eraLabel: 'أقدم مصدر روائي في القرن ١ هـ',
      publisher: 'منشورات الهادي',
      binding: 'وزيري مجلد فني',
      shortSummary:
        'أقدم كتاب روائي باقٍ في التراث الإسلامي، يروي عن شهود العيان أحداث أواخر حياة النبي (ص)، السقيفة، واستشهاد الزهراء (ع)، وخلافة الإمام علي (ع).',
      shiaRelevance:
        'بشهادة كبار علماء الشيعة كالشيخ الطوسي والمجلسي، يمثل هذا الكتاب الحجر الأساس للتأريخ الشيعي التحليلي في القرن الهجري الأول.',
      historicalSources: 'مرويات مباشرة عن أمير المؤمنين (ع)، سلمان الفارسي، أبي ذر وابن عباس',
      sampleExcerpt:
        '«قال سلمان الفارسي: لما قُبض رسول الله وبايع الناس غير علي، جلس علي (ع) لجمع القرآن وثبت في بيت فاطمة (ع)...»',
      tableOfContents: [
        'القسم الأول: وقائع السقيفة ومناظرات المهاجرين والأنصار',
        'القسم الثاني: حادثة الهجوم على بيت فاطمة (ع) والمحاجّة',
        'القسم الثالث: خطب أمير المؤمنين في الغدير وصفين',
        'القسم الرابع: التعليقات والدراسة السندية للكتاب'
      ],
      keywords: ['السقيفة', 'سليم بن قيس', 'سلمان الفارسي', 'أبو ذر', 'الغدير', 'أسرار آل محمد']
    },
    'book-fadak-sadr': {
      title: 'فدك في التاريخ (تحليل سياسي وتاريخي للخطبة الفدكية)',
      author: 'الشهيد السيد محمد باقر الصدر',
      translator: 'نسخة محققة ومخرّجة المصادر',
      eraLabel: 'دراسة تحليلية حديثة رائدة',
      publisher: 'مؤسسة بوستان كتاب',
      binding: 'غلاف ورقي فاخر',
      shortSummary:
        'تحليل حقوقي وفكري معمّق لأسباب مصادرة فدك واستراتيجية السيدة فاطمة (ع) الذكية في المسجد النبوي لصون خط الولاية.',
      shiaRelevance:
        'يكشف السيد الصدر أن قضية فدك لم تكن نزاعاً مالياً عابراً، بل مواجهة عقائدية وسياسية حول شرعية القيادة بعد رسول الله (ص).',
      historicalSources: 'مقارنة نقدية لروايات البخاري، سيرة ابن هشام، فتوح البلدان والاحتجاج',
      sampleExcerpt:
        '«حين دخلت الزهراء (ع) المسجد، حوّلت مسألة فدك إلى منبر لمحاكمة الانحراف السياسي وأسقطت بمنطق القرآن الدعوى المختلقة...»',
      tableOfContents: [
        'القسم الأول: الطبيعة الاقتصادية والسياسية لأرض فدك',
        'القسم الثاني: دراسة نقدية لحديث «نحن معاشر الأنبياء لا نورث»',
        'القسم الثالث: تحليل مقاطع الخطبة التاريخية للسيدة الزهراء',
        'القسم الرابع: تداعيات قضية فدك في القرن الأول الهجري'
      ],
      keywords: ['فدك', 'الخطبة الفدكية', 'السقيفة', 'الإمامة', 'الشهيد الصدر', 'الولاية']
    },
    'book-yaqubi': {
      title: 'تاريخ اليعقوبي (مجلدان كاملان)',
      author: 'أحمد بن أبي يعقوب اليعقوبي (مؤرخ القرن ٣ هـ)',
      translator: 'طبعة محققة ومفهرسة',
      eraLabel: 'التاريخ الإسلامي المبكر (القرن ٣ هـ)',
      publisher: 'المكتبة العلمية والثقافية',
      binding: 'مجلدان بغلاف فني',
      shortSummary:
        'أحد أقدم وأصدق كتب التاريخ العام في العالم الإسلامي، يغطي السيرة النبوية وأحداث السقيفة والمدينة وخلافة الإمام علي (ع) ونهضة كربلاء بتوازن وأمانة.',
      shiaRelevance:
        'يحتل تاريخ اليعقوبي مكانة خاصة لكونه من التواريخ المبكرة القليلة التي حفظت خطب الإمام علي وموقف الزهراء وسير الأئمة بعيداً عن الرقابة الأموية.',
      historicalSources: 'مصادر أولية من المدينة والعراق في القرنين الثاني والثالث للهجرة',
      sampleExcerpt:
        '«وتخلّف جماعة من المهاجرين والأنصار عن بيعة أبي بكر ومالوا إلى علي بن أبي طالب، منهم العباس والفضل والزبير وسلمان وأبو ذر والمقداد...»',
      tableOfContents: [
        'المجلد الأول: التاريخ القديم وسيرة النبي الأكرم (ص)',
        'المجلد الثاني: أحداث السقيفة والمدينة وخلافة الإمام علي (ع)',
        'فصل خاص: نهضة الإمام الحسين (ع) وعاشوراء',
        'الخاتمة: عصر الأئمة حتى منتصف العهد العباسي'
      ],
      keywords: ['تاريخ اليعقوبي', 'السقيفة', 'كربلاء', 'عاشوراء', 'الإمام علي', 'أهل البيت']
    },
    'book-qazwini-fatimah': {
      title: 'فاطمة الزهراء (ع) من المهد إلى اللحد',
      author: 'السيد محمد كاظم القزويني',
      translator: 'النسخة العربية الكاملة',
      eraLabel: 'موسوعة سيرة تحليلية معاصرة',
      publisher: 'دار الآفاق',
      binding: 'مجلد فني بحافظة',
      shortSummary:
        'موسوعة شاملة وسلسة تستعرض كل محطات حياة الصديقة الكبرى (ع) منذ البعثة والهجرة حتى الدفاع عن الولاية وأيامها الأخيرة في المدينة.',
      shiaRelevance:
        'يستند الكتاب إلى أكثر من مئتي مصدر شيعي وسني للإجابة المنهجية عن أبرز الأسئلة التاريخية حول سيرة السيدة الزهراء (ع).',
      historicalSources: 'مجمع البيان، مناقب ابن شهرآشوب، مسند أحمد وتاريخ الطبري',
      sampleExcerpt:
        '«لفهم مقام فاطمة (ع) لا يكفي النظر إلى أيامها الأخيرة فقط؛ فقد كانت شريكة النبي في أقسى سنوات الدعوة ومربية الجيل الأول من أهل البيت...»',
      tableOfContents: [
        'القسم الأول: مكة ومولد الكوثر النبوي',
        'القسم الثاني: الحياة المشتركة مع الإمام علي وتربية الحسنين',
        'القسم الثالث: قراءة مواقفها بعد رحيل الرسول (ص)',
        'القسم الرابع: أيام المرض والوصية والاستشهاد المفجع'
      ],
      keywords: ['فاطمة الزهراء', 'القزويني', 'أم أبيها', 'المهد إلى اللحد', 'استشهاد الزهراء']
    },
    'book-shia-history': {
      title: 'تاريخ التشيع في إيران والعالم الإسلامي',
      author: 'د. رسول جعفريان',
      eraLabel: 'مرجع أكاديمي وحوزوي معاصر',
      publisher: 'دار العلم للنشر',
      binding: 'وزيري مجلد فني',
      shortSummary:
        'استعراض منهجي لنشأة التشيع في عصر النبي (ص)، ودور آل علي (ع) في القرون الثلاثة الأولى، ونشوء الحواضر العلمية الشيعية في الكوفة وقم وبغداد وخراسان.',
      shiaRelevance:
        'يُعد من أبرز المراجع الجامعية لفهم التحولات السياسية والثقافية والاجتماعية للتشيع من النشأة الأولى وحتى العصور المتأخرة.',
      historicalSources: 'أنساب الأشراف للبلاذري، مقاتل الطالبيين، رجال الكشي وتاريخ قم',
      sampleExcerpt:
        '«تشكلت النواة الأولى للتشيع منذ أيام البعثة حول النصوص النبوية في مقام علي (ع)، وتجذرت بعد غدير خم كتيار عقائدي أصيل...»',
      tableOfContents: [
        'الفصل الأول: جذور التشيع في القرآن والسنة النبوية',
        'الفصل الثاني: آل علي (ع) في عهد الخلفاء والعصر الأموي',
        'الفصل الثالث: النهضة العلمية للإمامين الباقر والصادق (ع)',
        'الفصل الرابع: تدوين المجاميع الروائية وانتشار التشيع'
      ],
      keywords: ['تاريخ التشيع', 'غدير خم', 'الإمام الصادق', 'آل علي', 'الكوفة', 'جعفريان']
    },
    'book-nahj-al-balagha': {
      title: 'نهج البلاغة (مع شرح وتحقيق تاريخي)',
      author: 'جمع الشريف الرضي (القرن ٤ هـ)',
      translator: 'تحقيق وتقديم: د. السيد جعفر شهيدي',
      eraLabel: 'نص أصيل من القرن ٤ هـ',
      publisher: 'المؤسسة العلمية والثقافية',
      binding: 'مجلد فاخر بلونين',
      shortSummary:
        'مختارات من خطب ورسائل وحكم الإمام علي بن أبي طالب (ع) في التوحيد وسيرة النبي والخطبة الشقشقية وعدالة الحكم والأخلاق الاجتماعية.',
      shiaRelevance:
        'أهم كتاب عقائدي وأدبي بعد القرآن الكريم في الفكر الشيعي، ويعكس بوضوح رؤية مدرسة آل علي (ع) وتفاعل أمير المؤمنين مع أحداث صدر الإسلام.',
      historicalSources: 'خطب ومكاتبات الإمام علي (ع) المسندة بين عامي ١١ و٤٠ هـ',
      sampleExcerpt:
        '«أما والله لولا حضور الحاضر وقيام الحجة بوجود الناصر وما أخذ الله على العلماء ألا يقارّوا على كظة ظالم ولا سغب مظلوم لألقيت حبلها على غاربها...»',
      tableOfContents: [
        'القسم الأول: خطب التوحيد والتاريخ والخطبة الشقشقية',
        'القسم الثاني: الرسائل وميثاق الحكم (عهد مالك الأشتر)',
        'القسم الثالث: القصار والحكم الأخلاقية والاجتماعية',
        'القسم الرابع: فهارس الأعلام والتعليقات التاريخية'
      ],
      keywords: ['نهج البلاغة', 'الإمام علي', 'الخطبة الشقشقية', 'مالك الأشتر', 'الشريف الرضي']
    },
    'book-maasat-al-zahra': {
      title: 'مأساة الزهراء (ع) — شبهات وردود (مجلدان)',
      author: 'العلامة السيد جعفر مرتضى العاملي',
      translator: 'الطبعة الكاملة الأصلية',
      eraLabel: 'نقد سندي ومقارن معاصر',
      publisher: 'مركز الدراسات الفكرية والإسلامية',
      binding: 'مجلدان بغلاف فني',
      shortSummary:
        'أوسع دراسة علمية وسندية في العصر الحديث ترد على الشبهات التاريخية حول اقتحام بيت الوحي واستشهاد المحسن (ع) ومصادر استشهاد الزهراء (ع).',
      shiaRelevance:
        'يضع الكتاب بمنهجية رجالية وتاريخية دقيقة نحو أربعين مصدراً سنياً معتبراً وعشرات المصادر الشيعية القديمة في إثبات أصل الواقعة.',
      historicalSources: 'مناقشة نصوص الطبري، ابن قتيبة (الإمامة والسياسة)، الشهرستاني والذهبي',
      sampleExcerpt:
        '«تثبت القراءة المقارنة لتواريخ القرون الأولى أن إنكار حوادث البيت الفاطمي يتعارض ليس فقط مع النصوص الشيعية، بل مع شهادات صريحة لغير الشيعة...»',
      tableOfContents: [
        'المجلد الأول: أسس النقد التاريخي وفحص تقارير السقيفة',
        'المجلد الأول: التهديد بالإحراق واقتحام بيت الوحي في مصادر الفريقين',
        'المجلد الثاني: أسانيد استشهاد المحسن (ع) ومناقشة التشكيكات',
        'المجلد الثاني: وثائق المرض والوصية والقبر المخفي'
      ],
      keywords: ['مأساة الزهراء', 'العاملي', 'استشهاد المحسن', 'القبر المخفي', 'اقتحام الدار']
    },
    'book-shia-dar-islam': {
      title: 'الشيعة في الإسلام',
      author: 'العلامة السيد محمد حسين الطباطبائي',
      eraLabel: 'نص فلسفي وكلامي تأسيسي',
      publisher: 'مؤسسة بوستان كتاب',
      binding: 'مجلد كلاسيكي',
      shortSummary:
        'بيان واضح وممنهج لنشأة التشيع وأصول العقيدة الإسلامية من منظور آل علي (ع)، ومكانة العقل والوحي، والتعريف بالأئمة الاثني عشر (ع).',
      shiaRelevance:
        'الكتاب الشهير لصاحب تفسير الميزان، ويُعد أوثق مدخل منهجي للتعريف بالتشيع الأصيل للمثقف العربي والعالمي.',
      historicalSources: 'القرآن الكريم والتفاسير المأثورة وأمهات مصادر الكلام الشيعي',
      sampleExcerpt:
        '«نشأ التشيع منذ اليوم الأول ملازماً للدعوة النبوية مؤكداً الترابط بين ظاهر الإسلام وباطنه، معتبراً الإمامة حافظةً لمعنى النبوة لا بديلةً عنها...»',
      tableOfContents: [
        'القسم الأول: نشأة التشيع وانتشاره في التاريخ الإسلامي',
        'القسم الثاني: منهج التفكير الديني في مدرسة أهل البيت (ع)',
        'القسم الثالث: أصول العقيدة (التوحيد، النبوة، الإمامة، المعاد)',
        'القسم الرابع: سيرة الأئمة الاثني عشر (ع)'
      ],
      keywords: ['الشيعة في الإسلام', 'العلامة الطباطبائي', 'الإمامة', 'الأئمة الاثنا عشر', 'الغدير']
    }
  },
  en: {
    'book-bayt-al-ahzan': {
      title: 'Bayt al-Ahzan: House of Sorrows of the Lady of All Worlds',
      author: 'Shaykh Abbas Qummi (Muhaddith Qummi)',
      translator: 'Critical Annotated Edition',
      eraLabel: 'Classical Reference Monograph (14th Century AH)',
      publisher: 'Dalil-e Ma Publications',
      binding: 'Gold-Embossed Hardcover',
      shortSummary:
        'The most comprehensive classical monograph documenting the virtues, life, Sermon of Fadak, final illness, and martyrdom of Lady Fatimah al-Zahra (SA) from primary chronicles.',
      shiaRelevance:
        'For over a century, Bayt al-Ahzan has served as the foundational anthology for Fatimiyyah scholarship, weaving scattered classical reports into a coherent documented narrative.',
      historicalSources: 'Drawn from Al-Ihtijaj, Amali al-Saduq, Kashf al-Ghummah & Bihar al-Anwar',
      sampleExcerpt:
        '"As news of the Seal of Prophets’ passing spread through Medina, the first crisis emerged at Saqifah, and Fatimah al-Siddiqah (SA) rose to establish divine proof in defense of Imamah..."',
      tableOfContents: [
        'Chapter 1: Birth, Titles & Honorifics of Lady Fatimah (SA)',
        'Chapter 2: Marriage to Amir al-Mu’minin & the Verse of Purification',
        'Chapter 3: Saqifah, Fadak & Complete Text of the Fadak Sermon',
        'Chapter 4: Assault on the House of Revelation, Muhsin & Secret Night Burial'
      ],
      keywords: ['Fatimah', 'Bayt al-Ahzan', 'Fadak Sermon', 'Saqifah', 'Martyrdom', 'Night Burial']
    },
    'book-sulaym': {
      title: 'Kitab Sulaym ibn Qays al-Hilali (Secrets of the Household of Muhammad)',
      author: 'Sulaym ibn Qays al-Hilali (Companion of Imam Ali AS)',
      translator: 'Edited & Annotated by M. B. Ansari Zanjani',
      eraLabel: 'Earliest Surviving 1st-Century AH Source',
      publisher: 'Al-Hadi Press',
      binding: 'Royal Hardcover',
      shortSummary:
        'The oldest surviving narration compendium in Islamic history, transmitting eyewitness accounts of the Prophet’s final days, Saqifah, the martyrdom of Fatimah (SA), and Imam Ali’s leadership.',
      shiaRelevance:
        'Recognized by classical Shia scholars including Shaykh al-Tusi and Allamah al-Majlisi as the cornerstone of 1st-century Shia historiography.',
      historicalSources: 'Direct transmissions from Imam Ali (AS), Salman al-Farsi, Abu Dharr & Ibn Abbas',
      sampleExcerpt:
        '"Salman al-Farsi narrated: When the Messenger of God passed away and people gave allegiance elsewhere, Ali (AS) devoted himself to compiling the Quran and stood firm in Fatimah’s house..."',
      tableOfContents: [
        'Part I: Events of Saqifah and Debates of Muhajirun & Ansar',
        'Part II: Confrontation at the House of Fatimah (SA)',
        'Part III: Imam Ali’s Addresses at Ghadir and Siffin',
        'Part IV: Isnad Analysis and Critical Manuscript Notes'
      ],
      keywords: ['Sulaym ibn Qays', 'Saqifah', 'Salman al-Farsi', 'Abu Dharr', 'Ghadir', 'First Century']
    },
    'book-fadak-sadr': {
      title: 'Fadak in History: Political & Legal Analysis of the Fadak Sermon',
      author: 'Martyr Sayyid Muhammad Baqir al-Sadr',
      translator: 'Translated & Annotated Academic Edition',
      eraLabel: 'Landmark Modern Critical Study',
      publisher: 'Bustan-e Ketab Press',
      binding: 'Fine Paperback',
      shortSummary:
        'A penetrating legal and political analysis of the confiscation of Fadak and Lady Fatimah’s strategic defense of Wilayah inside the Prophet’s Mosque.',
      shiaRelevance:
        'Al-Sadr demonstrates that the Fadak dispute was not a private property claim, but an ideological struggle over the legitimacy of succession after the Prophet (PBUH).',
      historicalSources: 'Comparative analysis of Sahih al-Bukhari, Ibn Hisham, al-Baladhuri & Al-Ihtijaj',
      sampleExcerpt:
        '"When al-Zahra (SA) stepped into the mosque, she transformed Fadak into a public tribunal examining political deviation and dismantled the fabricated report through Quranic logic..."',
      tableOfContents: [
        'Part I: Economic & Political Significance of the Estate of Fadak',
        'Part II: Examining the Report "Prophets Leave No Inheritance"',
        'Part III: Clause-by-Clause Analysis of Lady Fatimah’s Sermon',
        'Part IV: Long-Term Ramifications in the First Islamic Century'
      ],
      keywords: ['Fadak', 'Fadak Sermon', 'Saqifah', 'Imamah', 'Wilayah', 'Baqir al-Sadr']
    },
    'book-yaqubi': {
      title: 'Tarikh al-Yaqubi (Complete Two-Volume Chronicle)',
      author: 'Ahmad ibn Abi Yaqub al-Yaqubi (3rd Century AH Historian)',
      translator: 'Annotated Complete Edition',
      eraLabel: 'Early Islamic Chronicle (3rd Century AH)',
      publisher: 'Elmi va Farhangi Press',
      binding: 'Two-Volume Hardcover Set',
      shortSummary:
        'One of Islam’s earliest universal histories, documenting the Prophet’s biography, Saqifah, events in Medina, Imam Ali’s caliphate, and Karbala with remarkable balance.',
      shiaRelevance:
        'Tarikh al-Yaqubi is indispensable because it stands among the rare 3rd-century chronicles preserving Imam Ali’s sermons and Fatimah’s stance free from Umayyad censorship.',
      historicalSources: 'Primary 2nd–3rd century AH Medinan and Iraqi historical records',
      sampleExcerpt:
        '"A group of Muhajirun and Ansar withheld allegiance from Abu Bakr and inclined toward Ali ibn Abi Talib, among them al-Abbas, al-Fadl, al-Zubayr, Salman, Abu Dharr, and al-Miqdad..."',
      tableOfContents: [
        'Volume I: Pre-Islamic History & Biography of Prophet Muhammad (PBUH)',
        'Volume II: Saqifah, Medina & Caliphate of Imam Ali (AS)',
        'Special Section: Uprising of Imam Husayn (AS) at Karbala',
        'Closing Chapters: Era of the Imams up to the Mid-Abbasid Period'
      ],
      keywords: ['Yaqubi', 'Saqifah', 'Karbala', 'Ashura', 'Imam Ali', 'Ahl al-Bayt', 'Chronicle']
    },
    'book-qazwini-fatimah': {
      title: 'Fatimah al-Zahra (SA) from the Cradle to the Grave',
      author: 'Sayyid Muhammad Kazim al-Qazwini',
      translator: 'Complete Annotated Edition',
      eraLabel: 'Modern Comprehensive Biography',
      publisher: 'Afaq Publications',
      binding: 'Slipcase Hardcover',
      shortSummary:
        'An accessible yet deeply researched biography tracing every stage of Lady Fatimah’s life from Mecca and Medina to her defense of Wilayah and final days.',
      shiaRelevance:
        'Drawing from over 200 Shia and Sunni sources, this volume answers key historical questions for both general readers and researchers.',
      historicalSources: 'Majma al-Bayan, Manaqib Ibn Shahrashub, Musnad Ahmad & Tarikh al-Tabari',
      sampleExcerpt:
        '"To grasp Fatimah’s (SA) station, one cannot look solely at her final days; she shared the Prophet’s hardest years and nurtured the first generation of Ahl al-Bayt..."',
      tableOfContents: [
        'Part I: Mecca & Birth of the Prophetic Kawthar',
        'Part II: Life with Imam Ali (AS) & Raising al-Hasanayn',
        'Part III: Political & Theological Stances after the Prophet’s Passing',
        'Part IV: Illness, Testament & Heartbreaking Martyrdom'
      ],
      keywords: ['Fatimah', 'Qazwini', 'Umm Abiha', 'Martyrdom', 'Mecca', 'Medina']
    },
    'book-shia-history': {
      title: 'History of Shi’ism in Iran and the Islamic World',
      author: 'Dr. Rasul Ja’farian',
      eraLabel: 'Contemporary University & Seminary Textbook',
      publisher: 'Nashr-e Elm',
      binding: 'Royal Hardcover',
      shortSummary:
        'A rigorous historical survey covering the emergence of Shi’ism during the Prophet’s era, the role of Aal-e Ali (AS) in the first three centuries, and centers of learning in Kufa, Qom, and Baghdad.',
      shiaRelevance:
        'Widely adopted as a standard academic reference for tracing the political, intellectual, and social evolution of Shia Islam.',
      historicalSources: 'Ansab al-Ashraf, Maqatil al-Talibiyyin, Rijal al-Kashshi & Tarikh Qom',
      sampleExcerpt:
        '"The earliest nucleus of Shi’ism took shape alongside the prophetic mission around Prophetic declarations honoring Ali (AS), taking deep doctrinal root after Ghadir Khumm..."',
      tableOfContents: [
        'Chapter 1: Origins of Shi’ism in the Quran & Prophetic Sunnah',
        'Chapter 2: Aal-e Ali (AS) under the Early Caliphs & Umayyads',
        'Chapter 3: Scholarly Revival of Imams al-Baqir & al-Sadiq (AS)',
        'Chapter 4: Compilation of Hadith & Spread of Shi’ism'
      ],
      keywords: ['Shia History', 'Ghadir', 'Imam Sadiq', 'Aal-e Ali', 'Kufa', 'Qom', 'Jafarian']
    },
    'book-nahj-al-balagha': {
      title: 'Nahj al-Balagha: Peak of Eloquence (Annotated Edition)',
      author: 'Compiled by al-Sharif al-Radi (4th Century AH)',
      translator: 'Translation & Introduction by Dr. Jafar Shahidi',
      eraLabel: 'Primary 4th-Century AH Canon',
      publisher: 'Elmi va Farhangi Press',
      binding: 'Two-Tone Cloth Hardcover',
      shortSummary:
        'Selected sermons, letters, and maxims of Imam Ali ibn Abi Talib (AS) covering monotheism, the Shiqshiqiyyah Sermon on Saqifah, ethical statecraft, and human dignity.',
      shiaRelevance:
        'Second only to the Holy Quran in Shia spiritual and literary stature, offering direct insight into Imam Ali’s thought and response to early historical crises.',
      historicalSources: 'Authenticated sermons and letters of Imam Ali (AS) from 11 to 40 AH',
      sampleExcerpt:
        '"By God, had it not been for the presence of the throng and the covenant God took from the learned not to remain silent before the gluttony of the oppressor and hunger of the oppressed, I would have cast the reins of leadership upon its withers..."',
      tableOfContents: [
        'Section I: Theological Sermons & the Shiqshiqiyyah Address',
        'Section II: Letters & Charter of Governance to Malik al-Ashtar',
        'Section III: Aphorisms on Wisdom, Ethics & Society',
        'Section IV: Historical Index & Critical Annotations'
      ],
      keywords: ['Nahj al-Balagha', 'Imam Ali', 'Shiqshiqiyyah', 'Malik al-Ashtar', 'Justice', 'Sharif Radi']
    },
    'book-maasat-al-zahra': {
      title: 'The Tragedy of al-Zahra (Al-Ma’sat al-Zahra — 2 Vols.)',
      author: 'Allamah Sayyid Ja’far Murtada al-Amili',
      translator: 'Complete Scholarly Edition',
      eraLabel: 'Modern Comparative & Isnad Critique',
      publisher: 'Islamic Thought Research Press',
      binding: 'Two-Volume Hardcover',
      shortSummary:
        'The most exhaustive modern academic response to historical doubts regarding the raid on the House of Revelation, the martyrdom of Muhsin (AS), and Fatimah’s final days.',
      shiaRelevance:
        'Utilizing strict biographical and textual criticism, the author aligns nearly forty classical Sunni citations alongside dozens of early Shia chronicles.',
      historicalSources: 'Textual analysis of al-Tabari, Ibn Qutaybah, al-Shahrastani & al-Dhahabi',
      sampleExcerpt:
        '"Comparative examination of the earliest chronicles demonstrates that denying the events at Bayt al-Zahra contradicts not only Shia texts, but explicit testimonies of non-Shia historians..."',
      tableOfContents: [
        'Vol. I: Methodological Foundations & Analysis of Saqifah Reports',
        'Vol. I: Threat of Fire & Assault on the House in Dual-Tradition Sources',
        'Vol. II: Evidence on the Martyrdom of Muhsin (AS) & Replies to Doubts',
        'Vol. II: Illness, Final Testament & Concealed Burial'
      ],
      keywords: ['Tragedy of Zahra', 'Amili', 'Muhsin', 'Hidden Grave', 'Dual Sources', 'Martyrdom']
    },
    'book-shia-dar-islam': {
      title: 'Shi’ite Islam (Shia dar Islam)',
      author: 'Allamah Sayyid Muhammad Husayn Tabataba’i',
      eraLabel: 'Foundational Philosophical & Theological Text',
      publisher: 'Bustan-e Ketab Press',
      binding: 'Classic Hardcover',
      shortSummary:
        'A lucid, systematic introduction to the historical emergence of Shia Islam, its three modes of religious inquiry, doctrinal pillars, and biographies of the Twelve Imams (AS).',
      shiaRelevance:
        'Authored by the renowned exegete of Tafsir al-Mizan and translated worldwide as the premier authoritative introduction to Shia thought.',
      historicalSources: 'Holy Quran, classical exegeses & foundational Shia theological works',
      sampleExcerpt:
        '"Shi’ism arose from the very outset alongside the prophetic call, affirming the harmony between the outward law and inner spiritual reality of Islam..."',
      tableOfContents: [
        'Part I: Historical Origin and Growth of Shi’ism',
        'Part II: Methods of Religious Thought in Ahl al-Bayt’s School',
        'Part III: Core Doctrines (Tawhid, Prophethood, Imamah & Return)',
        'Part IV: Lives of the Twelve Imams (AS)'
      ],
      keywords: ['Shia Islam', 'Allamah Tabatabai', 'Imamah', 'Twelve Imams', 'Ghadir', 'Thaqalayn']
    }
  }
};

export function getLocalizedChapters(locale: AppLocale): FatimahChapter[] {
  if (locale === 'fa') return FATIMAH_CHAPTERS;
  const map = CHAPTER_TRANSLATIONS[locale];
  return FATIMAH_CHAPTERS.map((ch) => {
    const tr = map[ch.id];
    if (!tr) return ch;
    return {
      ...ch,
      index: tr.index,
      title: tr.title,
      subtitle: tr.subtitle,
      period: tr.period,
      paragraphs: tr.paragraphs,
      pullQuote: tr.pullQuote,
      sources: ch.sources.map((src, i) => ({
        ...src,
        ...(tr.sources[i] || {})
      }))
    };
  });
}

export function getLocalizedTeachings(locale: AppLocale): CoreTeaching[] {
  if (locale === 'fa') return CORE_TEACHINGS;
  const map = TEACHING_TRANSLATIONS[locale];
  return CORE_TEACHINGS.map((t) => {
    const tr = map[t.id];
    if (!tr) return t;
    return {
      ...t,
      ...tr
    };
  });
}

export function getLocalizedShiaPillars(locale: AppLocale): ShiaPillar[] {
  if (locale === 'fa') return SHIA_PILLARS;
  const map = SHIA_TRANSLATIONS[locale];
  return SHIA_PILLARS.map((p) => {
    const tr = map[p.id];
    if (!tr) return p;
    return {
      ...p,
      ...tr
    };
  });
}

export function getLocalizedTimeline(locale: AppLocale): TimelineEvent[] {
  if (locale === 'fa') return HISTORICAL_TIMELINE;
  const map = TIMELINE_TRANSLATIONS[locale];
  return HISTORICAL_TIMELINE.map((ev) => {
    const tr = map[ev.id];
    if (!tr) return ev;
    return {
      ...ev,
      dateHijri: tr.dateHijri,
      eraLabel: tr.eraLabel,
      title: tr.title,
      shortSubtitle: tr.shortSubtitle,
      description: tr.description,
      significance: tr.significance,
      relatedTarget: {
        ...ev.relatedTarget,
        label: tr.relatedLabel
      }
    };
  });
}

export function getLocalizedBooks(locale: AppLocale): BookItem[] {
  if (locale === 'fa') return BOOKS_CATALOG;
  const map = BOOK_TRANSLATIONS[locale];
  return BOOKS_CATALOG.map((book) => {
    const tr = map[book.id];
    if (!tr) return book;
    return {
      ...book,
      ...tr
    };
  });
}
