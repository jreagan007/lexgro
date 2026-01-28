/**
 * CMO Podcast Episodes Data
 *
 * Conversations with law firm marketing executives
 */

export interface CMOEpisode {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  guest: string;
  guestTitle: string;
  guestFirm: string;
  number: number;
  duration: string;
  pubDate: string;
  topics: string[];
}

export const cmoEpisodes: CMOEpisode[] = [
  {
    slug: 'building-sustainable-marketing-systems',
    title: 'Building Sustainable Marketing Systems for Law Firm Growth',
    description: 'Strategies for Consistent Client Acquisition and Long-Term Success.',
    longDescription: 'In this episode, we explore how to build marketing systems that generate consistent results month after month. Learn the frameworks for creating sustainable client acquisition channels that don\'t depend on constant manual effort, and how to set your firm up for long-term marketing success.',
    guest: 'Keith Dyer',
    guestTitle: 'Founder',
    guestFirm: 'LEXGRO',
    number: 3,
    duration: '45:00',
    pubDate: '2025-08-14',
    topics: ['Marketing Systems', 'Client Acquisition', 'Sustainability', 'Growth'],
  },
  {
    slug: 'breaking-through-growth-plateaus',
    title: 'Breaking Through Growth Plateaus',
    description: 'Smart Strategies for Scaling Your Law Firm.',
    longDescription: 'Every law firm hits growth plateaus. In this episode, we discuss the common barriers that prevent firms from reaching the next level and the strategic shifts needed to break through. From operational bottlenecks to marketing channel saturation, learn how to identify and overcome what\'s holding your firm back.',
    guest: 'Keith Dyer',
    guestTitle: 'Founder',
    guestFirm: 'LEXGRO',
    number: 2,
    duration: '42:00',
    pubDate: '2025-07-17',
    topics: ['Scaling', 'Growth Strategy', 'Plateaus', 'Operations'],
  },
  {
    slug: 'from-telecom-to-legal-marketing',
    title: "From Telecom to Legal Marketing: Keith Dyer's Journey",
    description: 'The story behind LEXGRO and the path to legal marketing expertise.',
    longDescription: 'In this introductory episode, Keith Dyer shares his journey from the telecom industry to becoming a legal marketing expert. Learn about the experiences that shaped LEXGRO\'s approach to law firm marketing and why the legal industry needs a different kind of marketing partner.',
    guest: 'Keith Dyer',
    guestTitle: 'Founder',
    guestFirm: 'LEXGRO',
    number: 1,
    duration: '38:00',
    pubDate: '2025-07-03',
    topics: ['Journey', 'Legal Marketing', 'LEXGRO', 'Introduction'],
  },
];

export function getSortedCMOEpisodes(): CMOEpisode[] {
  return [...cmoEpisodes].sort((a, b) =>
    new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
