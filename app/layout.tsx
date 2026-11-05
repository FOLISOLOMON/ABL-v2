import { MotionProvider } from '@/components/animation/motion-provider';
import './globals.css';
import type { Metadata } from 'next';
import { Bodoni_Moda, Inter } from 'next/font/google';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { WhatsAppFloat } from '@/components/layout/whatsapp-float';
import { siteConfig } from '@/data/site';

const bodoniModa = Bodoni_Moda({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '700'],
  adjustFontFallback: false,
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ablfashion.com'),
  title: {
    default: 'ABL Fashion | Premium Custom Fashion & Fashion Training in Ghana',
    template: '%s | ABL Fashion',
  },
  description:
    'ABL Fashion creates custom-made fashion, bridal wear, traditional outfits, modern clothing, and professional fashion training in Ghana. We sew to match your occasion.',
  keywords: [
    'ABL Fashion',
    'Ghanaian fashion',
    'custom sewing Ghana',
    'bridal wear Ghana',
    'fashion training Ghana',
    'Kasoa fashion',
    'African fashion',
    'bespoke clothing',
  ],
  openGraph: {
    title: 'ABL Fashion | Premium Custom Fashion & Fashion Training in Ghana',
    description:
      'Custom-made fashion, bridal wear, traditional outfits, and professional fashion training in Ghana. We sew to match your occasion.',
    type: 'website',
    locale: 'en_US',
    siteName: 'ABL Fashion',
    images: ['/images/logo/logo abl main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ABL Fashion | Premium Custom Fashion & Fashion Training',
    description:
      'Custom-made fashion, bridal wear, traditional outfits, and professional fashion training in Ghana.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/images/logo/favicon.png',
    apple: '/images/logo/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'ABL Fashion',
    description: 'Premium custom fashion and fashion training in Kasoa, Ghana.',
    image: 'https://ablfashion.com/images/logo/logo abl main.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Adam Nana Bus Stop, off Obom Road',
      addressLocality: 'Kasoa',
      addressCountry: 'GH',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+233548883475',
      contactType: 'customer service',
      availableLanguage: ['English'],
    },
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.facebook,
      siteConfig.social.tiktok,
    ],
  };

  return (
    <html lang="en" className={`${bodoniModa.variable} ${inter.variable}`}>
      <body className="font-body bg-ivory text-charcoal antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-orange-500 focus:text-white focus:rounded-full focus:text-sm focus:font-semibold"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content">
          <MotionProvider>{children}</MotionProvider>
        </main>
        <Footer />
        <WhatsAppFloat />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}