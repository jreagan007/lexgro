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
    slug: 'building-marketing-team-from-scratch',
    title: 'Building a Law Firm Marketing Team from Scratch',
    description: 'How to hire, structure, and lead an in-house marketing team at a growing law firm.',
    longDescription: 'In this episode, we dive deep into the process of building an in-house marketing team from the ground up. Our guest shares their experience hiring their first marketing coordinator, when to bring specialists in-house vs outsource, and how to structure the team as the firm grows. We cover common mistakes, interview tips, and how to set realistic expectations with firm leadership.',
    guest: 'Sarah Mitchell',
    guestTitle: 'Chief Marketing Officer',
    guestFirm: 'Mitchell & Associates',
    number: 3,
    duration: '48:22',
    pubDate: '2025-12-15',
    topics: ['Team Building', 'Hiring', 'Leadership', 'Operations'],
  },
  {
    slug: 'attribution-multi-channel-marketing',
    title: 'Solving the Attribution Problem in Multi-Channel Marketing',
    description: 'How to track ROI across multiple marketing channels and make data-driven budget decisions.',
    longDescription: 'Attribution is one of the biggest challenges in law firm marketing. When a client comes from Google, then sees a billboard, then clicks a Facebook ad, who gets credit? This episode breaks down practical attribution models, the technology stack needed to track properly, and how to present data to partners who want simple answers to complex questions.',
    guest: 'Michael Chen',
    guestTitle: 'VP of Marketing',
    guestFirm: 'Chen Legal Group',
    number: 2,
    duration: '52:15',
    pubDate: '2025-11-20',
    topics: ['Attribution', 'Analytics', 'Budgeting', 'Multi-Channel'],
  },
  {
    slug: 'marketing-budget-conversations-partners',
    title: 'Having the Budget Conversation with Partners',
    description: 'Strategies for getting partner buy-in on marketing spend and proving ROI.',
    longDescription: 'Getting partners to approve marketing budgets is an art form. In this episode, we discuss how to frame marketing as an investment rather than an expense, create compelling business cases, handle objections, and build long-term trust with firm leadership. Our guest shares specific frameworks and templates they use for budget presentations.',
    guest: 'Jennifer Rodriguez',
    guestTitle: 'Director of Marketing',
    guestFirm: 'Rodriguez & Partners LLP',
    number: 1,
    duration: '44:38',
    pubDate: '2025-10-18',
    topics: ['Budgeting', 'Leadership', 'ROI', 'Strategy'],
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
