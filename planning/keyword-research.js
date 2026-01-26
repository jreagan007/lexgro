/**
 * Lexgro Keyword Research Script
 * Uses DataForSEO API to pull search volume and competition data
 *
 * Setup:
 *   export DATAFORSEO_LOGIN=your_email
 *   export DATAFORSEO_PASSWORD=your_password
 *
 * Usage:
 *   node scripts/lexgro-programmatic-seo/keyword-research.js
 *
 * API Docs: https://docs.dataforseo.com/v3/keywords_data/google_ads/search_volume/live/
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target keywords organized by category
const TARGET_KEYWORDS = {
  primary: [
    'fractional cmo for law firms',
    'law firm marketing agency',
    'legal marketing services',
    'law firm marketing services',
    'attorney marketing agency',
    'law firm marketing',
    'lawyer marketing',
  ],
  fractionalCMO: [
    'what is a fractional cmo',
    'fractional cmo cost',
    'fractional cmo vs marketing agency',
    'fractional cmo vs full time cmo',
    'when to hire a fractional cmo',
    'hire fractional cmo',
    'part time cmo',
    'outsourced cmo',
    'virtual cmo',
    'cmo as a service',
    'fractional cmo for small business',
  ],
  practiceSpecific: [
    'fractional cmo for personal injury law firms',
    'fractional cmo for immigration law firms',
    'fractional cmo for family law firms',
    'fractional cmo for estate planning law firms',
    'fractional cmo for bankruptcy law firms',
    'fractional cmo for mass tort firms',
    'personal injury law firm marketing',
    'personal injury lawyer marketing',
    'immigration law firm marketing',
    'family law marketing',
    'divorce lawyer marketing',
    'estate planning marketing',
    'bankruptcy attorney marketing',
    'criminal defense marketing',
    'mass tort marketing',
  ],
  seo: [
    'law firm seo',
    'law firm seo services',
    'lawyer seo',
    'attorney seo services',
    'legal seo services',
    'law firm seo cost',
    'is seo worth it for law firms',
    'how long does law firm seo take',
    'local seo for lawyers',
  ],
  ppc: [
    'law firm ppc',
    'law firm ppc management',
    'law firm google ads',
    'lawyer google ads',
    'law firm ppc cost',
    'lawyer cpc rates',
    'lsa vs google ads lawyers',
    'local services ads lawyers',
  ],
  webDesign: [
    'law firm web design',
    'lawyer website design',
    'law firm website development',
    'attorney website design',
  ],
  traditional: [
    'law firm tv advertising',
    'lawyer tv commercials',
    'law firm radio advertising',
    'law firm billboard advertising',
    'legal advertising agency',
    'lawyer advertising',
    'ctv advertising for lawyers',
  ],
  leadGen: [
    'law firm lead generation',
    'legal lead generation',
    'attorney lead generation',
    'personal injury leads',
    'law firm intake training',
    'legal intake services',
    'law firm answering service',
    'case acquisition cost',
    'cost per case personal injury',
  ],
  budget: [
    'law firm marketing budget',
    'how much should a law firm spend on marketing',
    'legal marketing roi',
    'law firm advertising cost',
    'how much do lawyers spend on advertising',
    'law firm marketing percentage',
  ],
  agencySelection: [
    'how to choose law firm marketing agency',
    'law firm marketing agency red flags',
    'signs marketing agency not working',
    'how to fire marketing agency',
    'agency vs in house marketing',
  ],
};

const ALL_KEYWORDS = Object.values(TARGET_KEYWORDS).flat();

async function fetchKeywordData() {
  const login = process.env.DATAFORSEO_LOGIN;
  const password = process.env.DATAFORSEO_PASSWORD;

  if (!login || !password) {
    console.error('Error: Set DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD environment variables');
    console.log('\nExample:');
    console.log('  export DATAFORSEO_LOGIN=your_email@example.com');
    console.log('  export DATAFORSEO_PASSWORD=your_api_password');
    console.log('  node scripts/lexgro-programmatic-seo/keyword-research.js');
    process.exit(1);
  }

  const credentials = Buffer.from(`${login}:${password}`).toString('base64');

  console.log(`Fetching data for ${ALL_KEYWORDS.length} keywords...\n`);

  const postData = [{
    keywords: ALL_KEYWORDS,
    language_code: 'en',
    location_code: 2840,
  }];

  try {
    const response = await fetch('https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (data.status_code !== 20000) {
      throw new Error(`API returned error: ${data.status_message}`);
    }

    return data.tasks[0].result;
  } catch (error) {
    console.error('Failed to fetch keyword data:', error.message);
    process.exit(1);
  }
}

function formatResults(results) {
  const output = {
    timestamp: new Date().toISOString(),
    summary: {
      totalKeywords: results.length,
      avgVolume: 0,
      highVolumeKeywords: [],
      lowCompetitionKeywords: [],
    },
    byCategory: {},
    allKeywords: [],
  };

  results.forEach(item => {
    const kwData = {
      keyword: item.keyword,
      volume: item.search_volume || 0,
      competition: item.competition || 'N/A',
      competitionIndex: item.competition_index || 0,
      cpc: item.cpc || 0,
      monthlySearches: item.monthly_searches || [],
    };

    output.allKeywords.push(kwData);

    if (kwData.volume > 200) {
      output.summary.highVolumeKeywords.push({
        keyword: kwData.keyword,
        volume: kwData.volume,
      });
    }

    if (kwData.competitionIndex < 0.5 && kwData.volume > 50) {
      output.summary.lowCompetitionKeywords.push({
        keyword: kwData.keyword,
        volume: kwData.volume,
        competitionIndex: kwData.competitionIndex,
      });
    }
  });

  const totalVolume = output.allKeywords.reduce((sum, kw) => sum + kw.volume, 0);
  output.summary.avgVolume = Math.round(totalVolume / output.allKeywords.length);
  output.summary.highVolumeKeywords.sort((a, b) => b.volume - a.volume);
  output.summary.lowCompetitionKeywords.sort((a, b) => b.volume - a.volume);

  Object.entries(TARGET_KEYWORDS).forEach(([category, keywords]) => {
    output.byCategory[category] = keywords.map(kw => {
      const found = output.allKeywords.find(item => item.keyword === kw);
      return found || { keyword: kw, volume: 0, competition: 'N/A', cpc: 0 };
    });
  });

  return output;
}

function generateReport(data) {
  let report = `# Lexgro Keyword Research Report

Generated: ${data.timestamp}

## Summary

- **Total Keywords Analyzed:** ${data.summary.totalKeywords}
- **Average Monthly Volume:** ${data.summary.avgVolume}
- **High Volume Keywords (>200/mo):** ${data.summary.highVolumeKeywords.length}
- **Low Competition Opportunities:** ${data.summary.lowCompetitionKeywords.length}

---

## High Volume Keywords

| Keyword | Monthly Volume |
|---------|----------------|
`;

  data.summary.highVolumeKeywords.slice(0, 20).forEach(kw => {
    report += `| ${kw.keyword} | ${kw.volume.toLocaleString()} |\n`;
  });

  report += `
---

## Low Competition Opportunities

| Keyword | Volume | Competition Index |
|---------|--------|-------------------|
`;

  data.summary.lowCompetitionKeywords.slice(0, 15).forEach(kw => {
    report += `| ${kw.keyword} | ${kw.volume.toLocaleString()} | ${kw.competitionIndex.toFixed(2)} |\n`;
  });

  Object.entries(data.byCategory).forEach(([category, keywords]) => {
    const categoryTitle = category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

    report += `
---

## ${categoryTitle}

| Keyword | Volume | Competition | CPC |
|---------|--------|-------------|-----|
`;

    keywords.forEach(kw => {
      report += `| ${kw.keyword} | ${kw.volume.toLocaleString()} | ${kw.competition} | $${kw.cpc.toFixed(2)} |\n`;
    });
  });

  report += `
---

## Recommended Priority Keywords

### Tier 1 (Primary Targets)
`;

  const tier1 = data.allKeywords
    .filter(kw => kw.volume > 100 && kw.competitionIndex < 0.7)
    .sort((a, b) => (b.volume / (b.competitionIndex + 0.1)) - (a.volume / (a.competitionIndex + 0.1)))
    .slice(0, 10);

  tier1.forEach((kw, i) => {
    report += `${i + 1}. **${kw.keyword}** - ${kw.volume.toLocaleString()}/mo, ${kw.competition} competition\n`;
  });

  report += `
### Tier 2 (Long-tail Opportunities)
`;

  const tier2 = data.allKeywords
    .filter(kw => kw.volume >= 20 && kw.volume <= 200 && kw.competitionIndex < 0.5)
    .sort((a, b) => b.volume - a.volume)
    .slice(0, 10);

  tier2.forEach((kw, i) => {
    report += `${i + 1}. **${kw.keyword}** - ${kw.volume.toLocaleString()}/mo, ${kw.competition} competition\n`;
  });

  report += `
---

*Data source: DataForSEO Google Ads API*
*Run: node scripts/lexgro-programmatic-seo/keyword-research.js*
`;

  return report;
}

async function main() {
  console.log('='.repeat(60));
  console.log('Lexgro Keyword Research');
  console.log('='.repeat(60));
  console.log('');

  const results = await fetchKeywordData();
  const formattedData = formatResults(results);

  const jsonPath = path.join(__dirname, 'keyword-data.json');
  fs.writeFileSync(jsonPath, JSON.stringify(formattedData, null, 2));
  console.log(`Raw data saved to: ${jsonPath}`);

  const report = generateReport(formattedData);
  const reportPath = path.join(__dirname, 'KEYWORD_RESEARCH_REPORT.md');
  fs.writeFileSync(reportPath, report);
  console.log(`Report saved to: ${reportPath}`);

  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total keywords: ${formattedData.summary.totalKeywords}`);
  console.log(`Average volume: ${formattedData.summary.avgVolume}/month`);
  console.log(`High volume keywords: ${formattedData.summary.highVolumeKeywords.length}`);
  console.log(`Low competition opportunities: ${formattedData.summary.lowCompetitionKeywords.length}`);

  if (formattedData.summary.highVolumeKeywords.length > 0) {
    console.log('\nTop 5 by volume:');
    formattedData.summary.highVolumeKeywords.slice(0, 5).forEach((kw, i) => {
      console.log(`  ${i + 1}. ${kw.keyword} (${kw.volume.toLocaleString()}/mo)`);
    });
  }
}

main();
