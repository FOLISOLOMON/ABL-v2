import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Consultation',
  description:
    'Book a consultation with ABL Fashion. Tell us about your needs and we will contact you to discuss how we can help bring your vision to life.',
  openGraph: {
    title: 'Book a Consultation | ABL Fashion',
    description:
      'Book a consultation with ABL Fashion. Tell us about your needs and we will contact you to discuss how we can help.',
    images: ['/images/hero.jpg'],
  },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
