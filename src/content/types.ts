export interface FaqItem {
  q: string;
  a: string;
}

export interface FactRow {
  label: string;
  value: string;
}

export interface ArticleSection {
  h2: string;
  paras: string[];
  bullets?: string[];
}

export type ArticleKey = 'tickets' | 'transport' | 'photos';
export type LinkKey = 'home' | ArticleKey;

export interface Article {
  /** Arahan laluan: kekal sama untuk semua bahasa supaya hreflang sepadan. */
  key: ArticleKey;
  /** Label ringkas untuk navigasi & pautan dalaman. */
  nav: string;
  eyebrow: string;
  /** Tag <title> — ditulis untuk CTR, bukan sekadar nama tempat. */
  title: string;
  description: string;
  h1: string;
  lede: string;
  facts: FactRow[];
  factsTitle: string;
  sections: ArticleSection[];
  faq: FaqItem[];
  related: { key: LinkKey; label: string }[];
}

export interface GalleryItem {
  image: 'garden' | 'view' | 'colmar';
  alt: string;
  caption: string;
}

export interface PlanCard {
  icon: string;
  title: string;
  text: string;
}

export interface KeyValue {
  name: string;
  note: string;
}

export interface NearbyItem {
  name: string;
  meta: string;
  note: string;
}

export interface TransportItem {
  title: string;
  text: string;
  note?: string;
}

export interface Content {
  meta: {
    title: string;
    description: string;
  };
  brand: string;
  nav: {
    home: string;
    tickets: string;
    photos: string;
    transport: string;
    faq: string;
    map: string;
  };
  hero: {
    badge: string;
    rating: string;
    h1Lead: string;
    h1Accent: string;
    lede: string;
    ctaPlan: string;
    ctaMap: string;
    strip: string;
    imageAlt: string;
    stats: { label: string; value: string; note?: string }[];
  };
  about: {
    eyebrow: string;
    h2: string;
    paras: string[];
    calloutLabel: string;
    calloutText: string;
    caption: string;
  };
  gallery: { eyebrow: string; h2: string; intro: string; items: GalleryItem[] };
  plan: {
    eyebrow: string;
    h2: string;
    cards: PlanCard[];
    tickets: { eyebrow: string; h3: string; badge: string; rows: FactRow[]; note: string; disclaimer: string };
    parking: { eyebrow: string; h3: string; text: string; tips: string[] };
  };
  transport: { eyebrow: string; h2: string; intro: string; items: TransportItem[] };
  food: { eyebrow: string; h2: string; intro: string; items: KeyValue[] };
  nearby: { eyebrow: string; h2: string; intro: string; caption: string; items: NearbyItem[] };
  map: { eyebrow: string; h2: string; intro: string; addressLabel: string; cta: string };
  explore: { eyebrow: string; h2: string; intro: string; more: string };
  faq: { eyebrow: string; h2: string; items: FaqItem[] };
  closing: { eyebrow: string; h2: string; text: string };
  footer: {
    about: string;
    disclaimer: string;
    infoTitle: string;
    phoneLabel: string;
    hoursLabel: string;
    ratingTitle: string;
    ratingNote: string;
    bottom: string;
    exploreTitle: string;
    languageLabel: string;
  };
  articles: Record<ArticleKey, Article>;
  labels: { langSwitch: string; breadcrumbHome: string; jumpTo: string; reviews: string };
}
