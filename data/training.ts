export interface TrainingProgram {
  id: string;
  duration: string;
  title: string;
  description: string;
  skills: string[];
  certificate: string;
  level: string;
}

export const trainingPrograms: TrainingProgram[] = [
  {
    id: '6-months',
    duration: '6 Months',
    title: 'Foundation Program',
    description:
      'A focused introduction to fashion design and sewing fundamentals. Perfect for beginners who want to build a strong foundation.',
    skills: ['Basic pattern drafting', 'Hand and machine stitching', 'Simple garment construction', 'Fabric selection basics'],
    certificate: 'Certificate of Completion',
    level: 'Beginner',
  },
  {
    id: '1-year',
    duration: '1 Year',
    title: 'Intermediate Program',
    description:
      'Build on your foundation with more complex garments and techniques. Start developing your personal design voice.',
    skills: ['Advanced pattern drafting', 'Complex garment construction', 'Finishing techniques', 'Style and design principles'],
    certificate: 'Diploma in Fashion Design',
    level: 'Intermediate',
  },
  {
    id: '1-year-6-months',
    duration: '1 Year 6 Months',
    title: 'Advanced Program',
    description:
      'Master advanced techniques and begin building a professional portfolio. Prepare for a career in fashion.',
    skills: ['Couture techniques', 'Bridal and formal wear', 'Tailoring and menswear', 'Portfolio development'],
    certificate: 'Advanced Diploma in Fashion Design',
    level: 'Advanced',
  },
  {
    id: '2-years',
    duration: '2 Years',
    title: 'Professional Program',
    description:
      'Comprehensive professional training covering design, construction, and the business of fashion.',
    skills: ['Full design process', 'Collection development', 'Fashion business basics', 'Client consultation'],
    certificate: 'Professional Fashion Design Certificate',
    level: 'Professional',
  },
  {
    id: '3-years',
    duration: '3 Years',
    title: 'Master Program',
    description:
      'Our most comprehensive program. Graduate as a fully trained fashion designer ready to launch your own brand or studio.',
    skills: ['Mastery of all techniques', 'Brand development', 'Production management', 'Industry internship'],
    certificate: 'Master Fashion Designer Certificate',
    level: 'Master',
  },
];

export const trainingSkills = [
  {
    title: 'Pattern Drafting',
    description: 'Learn to create precise patterns from measurements, the foundation of every great garment.',
    icon: 'Ruler',
  },
  {
    title: 'Cutting and Sewing',
    description: 'Master the art of cutting fabric accurately and sewing with precision and speed.',
    icon: 'Scissors',
  },
  {
    title: 'Finishing Techniques',
    description: 'Develop the refined finishing skills that separate good garments from exceptional ones.',
    icon: 'Sparkles',
  },
  {
    title: 'Garment Construction',
    description: 'Understand how garments come together, from first cut to final stitch.',
    icon: 'Shirt',
  },
  {
    title: 'Fashion Business Basics',
    description: 'Learn how to turn your craft into a career with pricing, client management, and branding.',
    icon: 'Briefcase',
  },
];

export const milestones = [
  {
    year: '2016',
    title: 'Founded',
    description: 'ABL Fashion opens its doors in Kasoa, Ghana with a vision to touch lives through fashion.',
  },
  {
    year: '2018',
    title: 'Growth in Custom Fashion',
    description: 'Expanded our client base across Ghana, building a reputation for precision and elegance.',
  },
  {
    year: '2020',
    title: 'Expansion into Training',
    description: 'Launched the ABL Fashion Training Academy to pass on skills to the next generation of designers.',
  },
  {
    year: '2023',
    title: 'International Recognition',
    description: 'Trusted by clients across the UK and beyond, with international orders becoming a regular part of our work.',
  },
];

export const valueProps = [
  {
    title: 'Precision Tailoring',
    description: 'Every garment is measured, cut, and stitched to your exact body for a fit that feels made for you, because it is.',
    icon: 'Ruler',
  },
  {
    title: 'Personalized Service',
    description: 'From your first consultation to your final fitting, you work directly with us to bring your vision to life.',
    icon: 'Heart',
  },
  {
    title: 'Elegant Finishing',
    description: 'The details matter. Our finishing techniques ensure every seam, hem, and detail meets a premium standard.',
    icon: 'Sparkles',
  },
  {
    title: 'Fashion Training Expertise',
    description: 'Years of teaching have refined our craft. When you learn from ABL, you learn from experience.',
    icon: 'GraduationCap',
  },
];

export const faqs = [
  {
    question: 'How long does sewing take?',
    answer:
      'Standard turnaround is 2 to 3 weeks depending on the complexity of the garment. Bridal and couture pieces may take longer due to multiple fittings and detailed work.',
  },
  {
    question: 'Do you accept urgent orders?',
    answer:
      'Yes, we accept urgent orders subject to our current workload. Rush orders may incur an additional fee. Contact us as early as possible to discuss your timeline.',
  },
  {
    question: 'Do you offer delivery?',
    answer:
      'Yes, we offer delivery within Ghana and can arrange international shipping for our clients abroad. Delivery costs are determined by location and package size.',
  },
  {
    question: 'Do you offer fashion training?',
    answer:
      'Yes, ABL Fashion Training Academy offers programs ranging from 6 months to 3 years, covering everything from basic sewing to advanced fashion design and business skills.',
  },
  {
    question: 'What are the training durations?',
    answer:
      'We offer 6-month, 1-year, 1.5-year, 2-year, and 3-year programs. Each program builds on the previous, taking you from beginner to master level.',
  },
  {
    question: 'How can I book a custom outfit?',
    answer:
      'You can book through our online booking page, call us directly, or message us on WhatsApp. We will schedule a consultation to discuss your style, occasion, and timeline.',
  },
  {
    question: 'Can I send an inspiration image?',
    answer:
      'Absolutely. You can upload inspiration images through our booking form or send them via WhatsApp. We use them as a reference to create your unique garment.',
  },
  {
    question: 'How can I contact ABL Fashion?',
    answer:
      'You can reach us by phone at 0548883475 or 0544746709, on WhatsApp at 0548883475, or by email at ablfashion.training@gmail.com. Visit us in Kasoa at Adam Nana Bus Stop, off Obom Road.',
  },
];
