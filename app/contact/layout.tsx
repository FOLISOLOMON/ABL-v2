import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact ABL Fashion in Kasoa, Ghana. Call, WhatsApp, or email us. Find our location, FAQ, and quick actions to book a consultation or enquire about training.',
  openGraph: {
    title: 'Contact | ABL Fashion',
    description:
      'Contact ABL Fashion in Kasoa, Ghana. Call, WhatsApp, or email us.',
    images: ['/images/hero.jpg'],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
