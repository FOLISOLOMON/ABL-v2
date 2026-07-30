export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  benefits: string[];
  image: string;
  featured?: boolean;
}

export const services: Service[] = [
  {
    id: 'custom-sewing',
    number: '01',
    title: 'Custom Sewing',
    description:
      'Bespoke garments crafted from scratch to your exact measurements, style, and occasion. Every stitch is intentional, every detail considered.',
    benefits: ['Made-to-measure precision', 'Personalized style consultation', 'Premium fabric selection', 'Expert finishing'],
    image:
      '/images/about-2.jpg',
    featured: true,
  },
  {
    id: 'bridal-wear',
    number: '02',
    title: 'Bridal Wear',
    description:
      'Your wedding day deserves a gown as unique as your love story. We create bridal wear that makes you feel extraordinary from the first fitting to the final walk down the aisle.',
    benefits: ['Custom bridal gowns', 'Bridal party outfits', 'Veils and accessories', 'Multiple fittings included'],
    image:
      '/images/about-3.jpg',
    featured: true,
  },
  {
    id: 'fascinators',
    number: '03',
    title: 'Fascinators',
    description:
      'Handcrafted headpieces that complete your look. Our fascinators are designed to turn heads and add that final touch of elegance to any occasion.',
    benefits: ['Custom designs', 'Premium materials', 'Matching accessories', 'Event-ready pieces'],
    image:
      'https://images.pexels.com/photos/2703202/pexels-photo-2703202.jpeg?auto=compress&cs=tinysrgb&w=1200',
    featured: true,
  },
  {
    id: 'womens-wear',
    number: '04',
    title: "Women's Wear",
    description:
      'Elegant, bold, and uniquely you. From everyday elegance to statement pieces, we design womenswear that celebrates every woman.',
    benefits: ['Dresses and gowns', 'Church and event wear', 'Office and casual wear', 'Custom designs'],
    image:
      '/images/lookbook-1.jpg',
    featured: true,
  },
  {
    id: 'childrens-wear',
    number: '05',
    title: "Children's Wear",
    description:
      'Comfortable, adorable, and made to last. We create children\'s outfits for birthdays, church, school events, and everyday moments worth remembering.',
    benefits: ['Birthday and event outfits', 'Church wear', 'Matching family sets', 'Comfortable fabrics'],
    image:
      'https://images.pexels.com/photos/1620763/pexels-photo-1620763.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'ready-to-wear',
    number: '06',
    title: 'Ready-to-Wear',
    description:
      'Curated collections of ready-to-wear fashion, designed and produced in-house. Premium quality without the wait, for when you need to look stunning now.',
    benefits: ['In-stock collections', 'Seasonal releases', 'Premium quality', 'Immediate availability'],
    image:
      'https://images.pexels.com/photos/2065200/pexels-photo-2065200.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'traditional-wear',
    number: '07',
    title: 'Traditional Wear',
    description:
      'Celebrating African heritage through every thread. Kente, ankara, and traditional Ghanaian garments designed with cultural pride and modern elegance.',
    benefits: ['Kente outfits', 'Ankara designs', 'Traditional ceremonies', 'Cultural events'],
    image:
      'https://images.pexels.com/photos/3818956/pexels-photo-3818956.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'custom-made-outfits',
    number: '08',
    title: 'Custom-Made Outfits',
    description:
      'Bring your inspiration, your idea, your vision. We turn it into a garment that fits perfectly and tells your story through fabric and form.',
    benefits: ['Design from inspiration', 'Full creative collaboration', 'Perfect measurements', 'One-of-a-kind pieces'],
    image:
      'https://images.pexels.com/photos/3752077/pexels-photo-3752077.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
];

export const featuredServices = services.filter((s) => s.featured);
