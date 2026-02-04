/**
 * Client Testimonials Data
 *
 * Video testimonials and client success stories
 */

export interface Testimonial {
  name: string;
  title: string;
  firm: string;
  practiceArea: string;
  youtubeId?: string;
  quote?: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Clarke Speaks',
    title: 'Founder',
    firm: 'Speaks Law',
    practiceArea: 'Personal Injury and Workers Comp',
  },
  {
    name: 'Peter Davis',
    title: 'Founder',
    firm: 'Peter N. Davis and Associates',
    practiceArea: 'Personal Injury and Workers Comp',
  },
  {
    name: 'Eric Richardson',
    title: 'Founder',
    firm: 'ER Law',
    practiceArea: 'Personal Injury, Estate Planning and Family Law',
  },
  {
    name: 'Riah Greathouse',
    title: 'Founder',
    firm: 'Greathouse Law',
    practiceArea: 'Personal Injury',
  },
  {
    name: 'Drew Brown',
    title: 'Founder',
    firm: 'Greensboro Law Center',
    practiceArea: 'Personal Injury and Business',
  },
  {
    name: 'Barry Siegel',
    title: 'Founder',
    firm: 'Siegel Law Group',
    practiceArea: 'Estate Planning and Elder Law',
  },
  {
    name: 'Blake Swan',
    title: 'Founder',
    firm: 'Tennessee Injury Attorneys',
    practiceArea: 'Personal Injury and Business',
  },
  {
    name: 'Matthew Albrecht',
    title: 'Founder',
    firm: 'Albrecht Law',
    practiceArea: 'Personal Injury',
  },
  {
    name: 'Yunuen Alvarado Bustos',
    title: 'Marketing Manager',
    firm: 'Lincoln Goldfinch Law',
    practiceArea: 'Immigration',
  },
  {
    name: 'James Amaro',
    title: 'Founder',
    firm: 'Amaro Law Firm',
    practiceArea: 'Personal Injury',
  },
];

export function getTestimonialsWithVideos(): Testimonial[] {
  return testimonials.filter(t => t.youtubeId);
}
