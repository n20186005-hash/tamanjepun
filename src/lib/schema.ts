import { FACTS } from '../data/site';
import type { FaqItem } from '../content/types';

interface AttractionOptions {
  url: string;
  image: string;
  description: string;
  /** @id kekal sama merentas bahasa supaya ia satu entiti, bukan tiga. */
  id?: string;
  name?: string;
  alternateName?: readonly string[];
}

/** TouristAttraction — fakta yang sama dipakai oleh ms / en / zh supaya NAP konsisten. */
export function attractionSchema({ url, image, description, id, name, alternateName }: AttractionOptions) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    '@id': id ?? `${url}#attraction`,
    name: name ?? FACTS.schemaName,
    alternateName: alternateName ? [...alternateName] : [...FACTS.alternateNames],
    url,
    image: [image],
    description,
    telephone: FACTS.phone,
    hasMap: FACTS.mapsUrl,
    isAccessibleForFree: false,
    priceRange: FACTS.priceRange,
    address: { '@type': 'PostalAddress', ...FACTS.address },
    geo: { '@type': 'GeoCoordinates', ...FACTS.geo },
    openingHours: `Mo-Su ${FACTS.opens}-${FACTS.closes}`,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: FACTS.opens,
        closes: FACTS.closes
      }
    ],
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Japanese tea house', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Koi pond & stone garden', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Kimono / yukata rental', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Parking area', value: true }
    ],
    touristType: ['Couples', 'Families', 'Photographers'],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: FACTS.ratingValue,
      reviewCount: String(FACTS.reviewCount),
      bestRating: '5',
      worstRating: '1'
    }
  };
}

/** FAQPage — hanya untuk soalan yang benar-benar dipaparkan pada halaman tersebut. */
export function faqSchema(faq: readonly FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a }
    }))
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url
    }))
  };
}
