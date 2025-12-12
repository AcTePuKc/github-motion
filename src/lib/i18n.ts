// src/lib/i18n.ts
type TranslationDictionary = { [key: string]: string };

export const AVAILABLE_LOCALES = [
  "en", "ar", "az", "ca", "cn", "zh-tw", "cs", "de", "sw", "ur", "bg", "bn", "es", "fa", "fi", "fr", "hi", "sa", "hu", "it", "ja", "kr", "nl", "pt-pt", "pt-br", "np", "el", "ro", "ru", "uk-ua", "id", "ml", "my", "ta", "sk", "tr", "pl", "uz", "vi", "se", "he", "fil", "th", "sr", "sr-latn", "no"
];

const LOCALE_DATA: {
  total: TranslationDictionary;
  longest: TranslationDictionary;
  current: TranslationDictionary;
} = {
  // 1. Total Contributions Label
  "total": {
    en: "Total Contributions",
    ar: "إجمالي المساهمات",
    az: "Ümumi töhfələr",
    ca: "Contribucions totals",
    cn: "总贡献数",
    "zh-tw": "總貢獻數",
    cs: "Celkem příspěvků",
    de: "Gesamtbeiträge",
    sw: "Jumla ya michango",
    ur: "کل شراکتیں",
    bg: "Общо приноси",
    bn: "সর্বমোট অবদান",
    es: "Contribuciones totales",
    fa: "مجموع مشارکت‌ها",
    fi: "Kontribuutiot yhteensä",
    fr: "Contributions totales",
    hi: "कुल योगदान",
    sa: "कुल-योगदानम्",
    hu: "Összes hozzájárulás",
    it: "Contributi totali",
    ja: "合計コントリビューション",
    kr: "총 기여",
    nl: "Totale bijdragen",
    "pt-pt": "Contribuições totais",
    "pt-br": "Contribuições totais",
    np: "कुल योगदानहरू",
    el: "Συνολικές συνεισφορές",
    ro: "Contribuții totale",
    ru: "Всего вкладов",
    "uk-ua": "Всього внесків",
    id: "Total Kontribusi",
    ml: "ആകെ സംഭാവനകൾ",
    my: "စုစုပေါင်း ပံ့ပိုးမှုများ",
    ta: "மொத்த பங்களிப்புகள்",
    sk: "Celkový počet príspevkov",
    tr: "Toplam Katkı",
    pl: "Łączna liczba kontrybucji",
    uz: "Umumiy hissalar",
    vi: "Tổng Số Đóng Góp",
    se: "Totalt antal bidrag",
    he: "סך כל התרומות",
    fil: "Kabuuang Kontribusyon",
    th: "จำนวนการมีส่วนร่วมทั้งหมด",
    sr: "Укупни доприноси",
    "sr-latn": "Ukupni doprinosi",
    no: "Totalt antall bidrag",
  },

  // 2. Longest Streak Label
  "longest": {
    en: "Longest Streak",
    ar: "أطول سلسلة",
    az: "Ən uzun silsilə",
    ca: "Ràtxa més llarga",
    cn: "最长连续记录",
    "zh-tw": "最長的連續紀錄",
    cs: "Nejdelší série",
    de: "Längste Streak",
    sw: "Mfululizo mrefu zaidi",
    ur: "طویل ترین سلسلہ",
    bg: "Най-дълга поредица",
    bn: "সর্বাধিক দীর্ঘ স্ট্রীক",
    es: "Racha más larga",
    fa: "طولانی‌ترین روند",
    fi: "Pisin putki",
    fr: "Plus longue série",
    hi: "सबसे लंबी स्ट्रीक",
    sa: "दीर्घतम-क्रम",
    hu: "Leghosszabb sorozat",
    it: "Serie più lunga",
    ja: "最長ストリーク",
    kr: "가장 긴 연속 기록",
    nl: "Langste streak",
    "pt-pt": "Sequência mais longa",
    "pt-br": "Sequência mais longa",
    np: "सबैभन्दा लामो स्ट्रिक",
    el: "Μεγαλύτερη σειρά",
    ro: "Cea mai lungă serie",
    ru: "Самая длинная серия",
    "uk-ua": "Найдовша серія",
    id: "Streak terpanjang",
    ml: "ഏറ്റവും ദീർഘമായ തുടർച്ച",
    my: "အရှည်ဆုံး စဉ်ဆက်မပြတ်မှု",
    ta: "அதிக நீளமான தொடர்ச்சி",
    sk: "Najdlhšia séria",
    tr: "En Uzun Seri",
    pl: "Najdłuższa passa",
    uz: "Eng uzun ketma-ketlik",
    vi: "Chuỗi dài nhất",
    se: "Längsta följd",
    he: "הרצף הארוך ביותר",
    fil: "Pinakamahabang streak",
    th: "สตรีคที่ยาวที่สุด",
    sr: "Најдужа серија",
    "sr-latn": "Najduža serija",
    no: "Lengste streak",
  },


  // 3. Current Streak Label
  "current": {
    en: "Current Streak",
    ar: "السلسلة الحالية",
    az: "Cari silsilə",
    ca: "Ràtxa actual",
    cn: "当前连续记录",
    "zh-tw": "目前的連續紀錄",
    cs: "Aktuální série",
    de: "Aktuelle Streak",
    sw: "Mfululizo wa sasa",
    ur: "موجودہ سلسلہ",
    bg: "Текуща поредица",
    bn: "বর্তমান স্ট্রীক",
    es: "Racha actual",
    fa: "روند فعلی",
    fi: "Nykyinen putki",
    fr: "Série actuelle",
    hi: "वर्तमान स्ट्रीक",
    sa: "वर्तमान-क्रम",
    hu: "Jelenlegi sorozat",
    it: "Serie attuale",
    ja: "現在のストリーク",
    kr: "현재 연속 기록",
    nl: "Huidige streak",
    "pt-pt": "Sequência atual",
    "pt-br": "Sequência atual",
    np: "हालको स्ट्रिक",
    el: "Τρέχουσα σειρά",
    ro: "Seria curentă",
    ru: "Текущая серия",
    "uk-ua": "Поточна серія",
    id: "Streak saat ini",
    ml: "നിലവിലെ തുടർച്ച",
    my: "လက်ရှိ စဉ်ဆက်မပြတ်မှု",
    ta: "தற்போதைய தொடர்ச்சி",
    sk: "Aktuálna séria",
    tr: "Mevcut Seri",
    pl: "Aktualna passa",
    uz: "Joriy ketma-ketlik",
    vi: "Chuỗi hiện tại",
    se: "Nuvarande följd",
    he: "רצף נוכחי",
    fil: "Kasalukuyang streak",
    th: "สตรีคปัจจุบัน",
    sr: "Тренутна серија",
    "sr-latn": "Trenutna serija",
    no: "Nåværende streak",
  }
};

export function getTranslations(locale: string) {
  const l = locale.toLowerCase();

  // Helper функция за безопасно взимане
  const getSafe = (dict: TranslationDictionary, key: string) => {
    return dict[key] || dict["en"];
  };

  return {
    total: getSafe(LOCALE_DATA.total, l),
    longest: getSafe(LOCALE_DATA.longest, l),
    current: getSafe(LOCALE_DATA.current, l),
  };
}