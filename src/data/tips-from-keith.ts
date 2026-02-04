/**
 * Tips from Keith - Quick Video Tips Data
 *
 * Short-form marketing tips from Keith Dyer
 * YouTube Channel: https://www.youtube.com/@LEXGRO
 */

export interface VideoTip {
  slug: string;
  title: string;
  description: string;
  duration: string;
  pubDate: string;
  topics: string[];
  youtubeId?: string;
}

export const tips: VideoTip[] = [
  {
    slug: 'google-ads-budget-mistakes',
    title: 'The #1 Google Ads Budget Mistake Law Firms Make',
    description: 'Most law firms waste money on Google Ads because they set their budgets wrong. Here\'s how to fix it.',
    duration: '3:45',
    pubDate: '2026-01-15',
    topics: ['Google Ads', 'Budget'],
  },
  {
    slug: 'intake-response-time',
    title: 'Why Your Intake Response Time Is Killing Your ROI',
    description: 'Speed to lead matters more than you think. Learn the data behind response times and conversion rates.',
    duration: '4:12',
    pubDate: '2026-01-08',
    topics: ['Intake', 'Conversion'],
  },
  {
    slug: 'lsa-optimization',
    title: 'Local Service Ads: 3 Quick Wins',
    description: 'Simple optimizations that can dramatically improve your LSA performance this week.',
    duration: '5:30',
    pubDate: '2025-12-18',
    topics: ['LSA', 'Optimization'],
  },
  {
    slug: 'seo-content-strategy',
    title: 'Stop Writing Blog Posts Nobody Reads',
    description: 'The content strategy shift that actually drives traffic and cases for law firms.',
    duration: '6:15',
    pubDate: '2025-12-11',
    topics: ['SEO', 'Content'],
  },
  {
    slug: 'facebook-ads-creative',
    title: 'Facebook Ad Creative That Works for PI Firms',
    description: 'What makes personal injury ads perform on Facebook? Real examples and principles.',
    duration: '4:45',
    pubDate: '2025-12-04',
    topics: ['Facebook Ads', 'Creative'],
  },
  {
    slug: 'referral-ask-timing',
    title: 'When to Ask for Referrals (Most Firms Get This Wrong)',
    description: 'The psychology of referral timing and how to build a system that works.',
    duration: '3:58',
    pubDate: '2025-11-27',
    topics: ['Referrals', 'Client Experience'],
  },
  {
    slug: 'marketing-metrics-matter',
    title: 'The Only 5 Marketing Metrics That Matter',
    description: 'Cut through the noise. Here are the numbers you should actually be tracking.',
    duration: '5:22',
    pubDate: '2025-11-20',
    topics: ['Analytics', 'ROI'],
  },
  {
    slug: 'video-testimonials-quick',
    title: 'How to Get Video Testimonials in Under 5 Minutes',
    description: 'A simple system for capturing powerful client testimonials without the awkwardness.',
    duration: '4:08',
    pubDate: '2025-11-13',
    topics: ['Testimonials', 'Video'],
  },
  {
    slug: 'brand-vs-performance',
    title: 'Brand vs Performance Marketing for Law Firms',
    description: 'Understanding when to invest in brand building vs direct response.',
    duration: '6:45',
    pubDate: '2025-11-06',
    topics: ['Strategy', 'Brand'],
  },
  {
    slug: 'agency-red-flags',
    title: '5 Red Flags When Hiring a Marketing Agency',
    description: 'Warning signs that your potential marketing partner might not deliver.',
    duration: '5:15',
    pubDate: '2025-10-30',
    topics: ['Vendors', 'Agencies'],
  },
  {
    slug: 'case-value-marketing',
    title: 'Marketing for Higher Case Values, Not Just More Cases',
    description: 'How to attract better cases through strategic marketing positioning.',
    duration: '4:32',
    pubDate: '2025-10-23',
    topics: ['Strategy', 'Positioning'],
  },
  {
    slug: 'retargeting-basics',
    title: 'Retargeting 101 for Law Firms',
    description: 'A beginner\'s guide to staying in front of potential clients who visited your site.',
    duration: '5:48',
    pubDate: '2025-10-16',
    topics: ['Retargeting', 'Paid Ads'],
  },
];

export function getSortedTips(): VideoTip[] {
  return [...tips].sort((a, b) =>
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
