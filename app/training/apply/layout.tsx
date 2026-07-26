import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apply for Training',
  description:
    'Apply for fashion design and sewing training at ABL Fashion Training Academy in Kasoa, Ghana. Submit your application online and visit our office to complete registration.',
  openGraph: {
    title: 'Apply for Training | ABL Fashion Training Academy',
    description:
      'Submit your training application online. Programs from 6 months to 3 years.',
    images: ['/images/about-2.jpg'],
  },
};

export default function TrainingApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
