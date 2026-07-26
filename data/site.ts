export const siteConfig = {
  name: 'ABL Fashion',
  fullName: 'ABL Fashion / Training',
  tagline: 'YOUR EXCELLENT SATISFACTION IS OUR JOY',
  philosophy: 'TO TOUCH LIVES THROUGH FASHION',
  mission: 'To Touch Lives Through Fashion',
  established: '2016',
  location: {
    short: 'Kasoa, Ghana',
    full: 'Kasoa, Adam Nana Bus Stop, off Obom Road, Ghana',
  },
  contact: {
    phone1: '0548883475',
    phone2: '0544746709',
    whatsapp: '0548883475',
    email: 'ablfashion.training@gmail.com',
  },
  social: {
    instagram: 'https://www.instagram.com/ablfashion.training',
    facebook: 'https://www.facebook.com/ablfashion.training',
    tiktok: 'https://www.tiktok.com/@ablfashion.training',
  },
  whatsappLink: 'https://wa.me/233548883475?text=Hello%20ABL%20Fashion%2C%20I%20would%20like%20to%20enquire%20about%20your%20services.',
  nav: [
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Lookbook', href: '/lookbook' },
    { label: 'Training', href: '/training' },
    { label: 'Contact', href: '/contact' },
  ],
} as const;

export const navLinks = siteConfig.nav;
