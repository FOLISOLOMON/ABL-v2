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
      'https://images.pexels.com/photos/1721934/pexels-photo-1721934.jpeg?auto=compress&cs=tinysrgb&w=1000',
    description:
      'A handcrafted ivory bridal gown with intricate lace detailing and a dramatic train, designed for the bride who wants to feel timeless.',
    size: 'small',
  },
  {
    id: 'church-dress-1',
    title: 'Sunday Elegance',
    category: 'Church Dresses',
    image:
      'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=1000',
    description:
      'A graceful church dress in warm tones, designed for comfort and elegance through every Sunday service.',
    size: 'wide',
  },
  {
    id: 'kaftan-1',
    title: 'Emerald Kaftan',
    category: 'Kaftans',
    image:
      'https://images.pexels.com/photos/3752077/pexels-photo-3752077.jpeg?auto=compress&cs=tinysrgb&w=800',
    description:
      'A flowing emerald kaftan with gold accents, perfect for festive gatherings and cultural celebrations.',
    size: 'medium',
  },
  {
    id: 'custom-dress-1',
    title: 'Statement Evening Gown',
    category: 'Custom Dresses',
    image:
      'https://images.pexels.com/photos/2065200/pexels-photo-2065200.jpeg?auto=compress&cs=tinysrgb&w=1000',
    description:
      'A custom evening gown designed from a client inspiration image, featuring a dramatic silhouette and premium finishing.',
    size: 'large',
  },
  {
    id: 'fascinator-1',
    title: 'Floral Fascinator',
    category: 'Fascinators',
    image:
      'https://images.pexels.com/photos/2703202/pexels-photo-2703202.jpeg?auto=compress&cs=tinysrgb&w=800',
    description:
      'A handcrafted fascinator with floral detailing, designed to complete a sophisticated event look.',
    size: 'small',
  },
  {
    id: 'bridal-gown-2',
    title: 'Lace Bridal Couture',
    category: 'Bridal Gowns',
    image:
      'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1000',
    description:
      'A couture bridal piece with hand-appliqued lace and a fitted bodice, crafted over multiple fittings for the perfect silhouette.',
    size: 'wide',
  },
  {
    id: 'kente-2',
    title: 'Engagement Kente Set',
    category: 'Kente Outfits',
    image:
      'https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=800',
    description:
      'A coordinated Kente set for traditional engagement ceremonies, styled with cultural authenticity and modern flair.',
    size: 'medium',
  },
  {
    id: 'custom-dress-2',
    title: 'Ankara Fusion Dress',
    category: 'Custom Dresses',
    image:
      'https://images.pexels.com/photos/3818956/pexels-photo-3818956.jpeg?auto=compress&cs=tinysrgb&w=1000',
    description:
      'A fusion dress combining ankara prints with modern tailoring, created as a one-of-a-kind custom piece.',
    size: 'large',
  },
  {
    id: 'church-dress-2',
    title: 'Embroidered Church Gown',
    category: 'Church Dresses',
    image:
      'https://images.pexels.com/photos/2065200/pexels-photo-2065200.jpeg?auto=compress&cs=tinysrgb&w=800',
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
