/**
 * Satu-satunya sumber fakta untuk seluruh laman.
 * Semua bahasa (ms / en / zh) membaca nilai yang sama supaya NAP, harga,
 * koordinat dan penilaian tidak pernah bercanggah antara halaman atau JSON-LD.
 */
export const FACTS = {
  name: 'Taman Jepun Bukit Tinggi',
  schemaName: 'Taman Jepun Bukit Tinggi (Japanese Garden / Japanese Village)',
  alternateNames: [
    'Japanese Village Bukit Tinggi',
    'Japanese Garden Bukit Tinggi',
    'Taman Jepun Bentong Pahang'
  ],
  address: {
    streetAddress: 'Jln Bukit Tinggi, Bukit Tinggi',
    addressLocality: 'Bentong',
    addressRegion: 'Pahang',
    postalCode: '28750',
    addressCountry: 'MY'
  },
  phone: '+60 11-2422 0686',
  phoneHref: '+601124220686',
  geo: {
    latitude: 3.419011196541175,
    longitude: 101.84008581213173
  },
  openingHours: '08:00 – 22:00',
  opens: '08:00',
  closes: '22:00',
  priceAdult: 'RM14',
  priceChild: 'RM7',
  priceRange: 'RM14 dewasa · RM7 kanak-kanak 4–12 tahun',
  ratingValue: '4.0',
  reviewCount: 9930,
  ratingSyncedAt: 'September 2026',
  mapsUrl: 'https://maps.app.goo.gl/GDoHNKf3BSZ2o6gW7',
  mapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.716821349576!2d101.84008581213173!3d3.419011196541175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc16d645e1893f%3A0x69723f6cd7c21420!2z5q2m5ZCJ5LiB5a6c5pel5pys6Iqx5Zut!5e0!3m2!1sms!2smy!4v1786583622753!5m2!1sms!2smy',
  images: {
    garden: { src: '/images/japanese-village-garden.jpg', width: 1000, height: 667 },
    view: { src: '/images/japanese-village-view.jpg', width: 1000, height: 667 },
    colmar: { src: '/images/colmar-tropicale.jpg', width: 800, height: 533 }
  },
  gaId: 'G-HXM22WWPKP',
  lastUpdated: 'September 2026'
} as const;

/** Angka ulasan dengan pemisah ribuan supaya paparan konsisten di semua bahasa. */
export const reviewCountLabel = FACTS.reviewCount.toLocaleString('en-US');
