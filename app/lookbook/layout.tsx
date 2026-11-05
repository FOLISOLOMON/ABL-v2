import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lookbook',
  description:
    'Explore the ABL Fashion lookbook, a curated gallery of bridal gowns, Kente outfits, traditional wear, church dresses, kaftans, custom dresses, and fascinators.',
  openGraph: {
    title: 'Lookbook | ABL Fashion',
    description:
      'Explore the ABL Fashion lookbook, a curated gallery of bridal gowns, Kente outfits, traditional wear, church dresses, kaftans, custom dresses, and fascinators.',
    images: ['/images/hero.jpg'],
  },
};

export default function LookbookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
