export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  featured?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: 'uk-client',
    quote:
      "A UK based client was very grateful for all that was sewed for her despite the distance. There wasn't any alteration. Stitches on point, finishing on point. Lovely outfit for that special occasion.",
    author: 'International Client',
    location: 'United Kingdom',
    featured: true,
  },
  {
    id: 'gh-client-1',
    quote:
      'The attention to detail is unmatched. My engagement outfit fit perfectly and everyone kept asking where I got it made.',
    author: 'Ama K.',
    location: 'Accra, Ghana',
  },
  {
    id: 'gh-client-2',
    quote:
      'I trained at ABL Fashion Academy and now run my own sewing business. The training changed my life.',
    author: 'Akosua B.',
    location: 'Kasoa, Ghana',
  },
];
