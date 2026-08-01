export interface Collection {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  size: 'large' | 'medium' | 'small' | 'wide';
}

export const collections: Collection[] = [
  {
    id: 'abl-hero-1',
    title: 'ABL Signature Piece',
    category: 'Custom Dresses',
    image: '/images/hero.jpg',
    description:
      'A signature ABL Fashion piece showcasing premium tailoring and timeless elegance.',
    size: 'large',
  },
  {
    id: 'abl-lookbook-1',
    title: 'ABL Collection Highlight',
    category: 'Custom Dresses',
    image: '/images/lookbook-1.jpg',
    description:
      'A curated highlight from the ABL Fashion collection, crafted with precision and care.',
    size: 'medium',
  },
  {
    id: 'bridal-gown-1',
    title: 'Ivory Bridal Gown',
    category: 'Bridal Gowns',
    image:
      '/images/image_7.jpeg',
    description:
      'A handcrafted ivory bridal gown with intricate lace detailing and a dramatic train, designed for the bride who wants to feel timeless.',
    size: 'small',
  },
  {
    id: 'church-dress-1',
    title: 'Sunday Elegance',
    category: 'Church Dresses',
    image:
      '/images/image_8.jpeg',
    description:
      'A graceful church dress in warm tones, designed for comfort and elegance through every Sunday service.',
    size: 'wide',
  },
  {
    id: 'kaftan-1',
    title: 'Emerald Kaftan',
    category: 'Kaftans',
    image:
      '/images/image_2.jpeg',
    description:
      'A flowing emerald kaftan with gold accents, perfect for festive gatherings and cultural celebrations.',
    size: 'medium',
  },
  {
    id: 'custom-dress-1',
    title: 'Statement Evening Gown',
    category: 'Custom Dresses',
    image:
      '/images/image_3.jpeg',
    description:
      'A custom evening gown designed from a client inspiration image, featuring a dramatic silhouette and premium finishing.',
    size: 'large',
  },
  {
    id: 'fascinator-1',
    title: 'Floral Fascinator',
    category: 'Fascinators',
    image:
      '/images/image_4.jpeg',
    description:
      'A handcrafted fascinator with floral detailing, designed to complete a sophisticated event look.',
    size: 'small',
  },
  {
    id: 'bridal-gown-2',
    title: 'Lace Bridal Couture',
    category: 'Bridal Gowns',
    image:
      '/images/image_1.jpeg',
    description:
      'A couture bridal piece with hand-appliqued lace and a fitted bodice, crafted over multiple fittings for the perfect silhouette.',
    size: 'wide',
  },
  {
    id: 'kente-2',
    title: 'Engagement Kente Set',
    category: 'Kente Outfits',
    image:
      '/images/image_5.jpeg',
    description:
      'A coordinated Kente set for traditional engagement ceremonies, styled with cultural authenticity and modern flair.',
    size: 'medium',
  },
  {
    id: 'custom-dress-2',
    title: 'Ankara Fusion Dress',
    category: 'Custom Dresses',
    image:
      '/images/image_6.jpeg',
    description:
      'A fusion dress combining ankara prints with modern tailoring, created as a one-of-a-kind custom piece.',
    size: 'large',
  },
  {
    id: 'church-dress-2',
    title: 'Embroidered Church Gown',
    category: 'Church Dresses',
    image:
      '/images/image_7.jpeg',
    description:
      'An embroidered church gown with a flowing silhouette, designed for graceful movement and all-day comfort.',
    size: 'medium',
  },
];

export const lookbookCategories = [
  'All',
  'Bridal Gowns',
  'Kente Outfits',
  "Traditional Wear",
  'Church Dresses',
  'Kaftans',
  'Custom Dresses',
  'Fascinators',
];
