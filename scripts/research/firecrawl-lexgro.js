/**
 * Lexgro Firecrawl Script
 * Extract content, assets, and structure from current Framer site
 *
 * Usage:
 *   node scripts/research/firecrawl-lexgro.js map      - Get all URLs
 *   node scripts/research/firecrawl-lexgro.js crawl    - Crawl all pages
 *   node scripts/research/firecrawl-lexgro.js scrape   - Scrape single page
 *   node scripts/research/firecrawl-lexgro.js extract  - AI extraction of design tokens
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({ path: path.join(__dirname, '../../.env') });

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY;
const BASE_URL = 'https://api.firecrawl.dev/v1';
const OUTPUT_DIR = path.join(__dirname, 'output');

const LEXGRO_URL = 'https://lexgro.com';

async function firecrawlRequest(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Firecrawl API error: ${response.status} - ${error}`);
  }

  return response.json();
}

/**
 * Map the site - get all URLs
 */
async function mapSite() {
  console.log(`\nMapping: ${LEXGRO_URL}`);

  const result = await firecrawlRequest('/map', {
    method: 'POST',
    body: JSON.stringify({
      url: LEXGRO_URL,
      limit: 100,
      ignoreSitemap: false,
      includeSubdomains: false,
    }),
  });

  return result;
}

/**
 * Crawl the entire site
 */
async function crawlSite(options = {}) {
  console.log(`\nCrawling: ${LEXGRO_URL}`);

  const startResult = await firecrawlRequest('/crawl', {
    method: 'POST',
    body: JSON.stringify({
      url: LEXGRO_URL,
      limit: options.limit || 50,
      scrapeOptions: {
        formats: ['markdown', 'html'],
        onlyMainContent: false, // Get everything including nav, footer
        includeTags: ['style', 'link'], // Include style info
      },
      maxDepth: options.maxDepth || 3,
    }),
  });

  if (!startResult.id) {
    throw new Error('Failed to start crawl job');
  }

  console.log(`  Crawl job started: ${startResult.id}`);

  // Poll for completion
  let status = 'scraping';
  let result;

  while (status === 'scraping' || status === 'processing') {
    await new Promise(r => setTimeout(r, 5000));

    result = await firecrawlRequest(`/crawl/${startResult.id}`, {
      method: 'GET',
    });

    status = result.status;
    console.log(`  Status: ${status} (${result.completed || 0}/${result.total || '?'} pages)`);
  }

  return result;
}

/**
 * Scrape a single page with full HTML
 */
async function scrapePage(pageUrl) {
  console.log(`\nScraping: ${pageUrl}`);

  const result = await firecrawlRequest('/scrape', {
    method: 'POST',
    body: JSON.stringify({
      url: pageUrl,
      formats: ['markdown', 'html', 'screenshot'],
      onlyMainContent: false,
      waitFor: 3000, // Wait for Framer to render
    }),
  });

  return result;
}

/**
 * Extract design tokens using AI
 */
async function extractDesignTokens(urls) {
  console.log(`\nExtracting design tokens from ${urls.length} URLs`);

  const schema = {
    type: 'object',
    properties: {
      colors: {
        type: 'object',
        properties: {
          primary: { type: 'string' },
          secondary: { type: 'string' },
          accent: { type: 'string' },
          background: { type: 'string' },
          text: { type: 'string' },
          allColors: { type: 'array', items: { type: 'string' } },
        }
      },
      typography: {
        type: 'object',
        properties: {
          headingFont: { type: 'string' },
          bodyFont: { type: 'string' },
          fontWeights: { type: 'array', items: { type: 'string' } },
        }
      },
      navigation: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            label: { type: 'string' },
            url: { type: 'string' },
          }
        }
      },
      sections: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            description: { type: 'string' },
          }
        }
      },
      ctaButtons: { type: 'array', items: { type: 'string' } },
      socialLinks: { type: 'array', items: { type: 'string' } },
      logoDescription: { type: 'string' },
      heroHeadline: { type: 'string' },
      heroSubheadline: { type: 'string' },
      services: { type: 'array', items: { type: 'string' } },
      testimonials: { type: 'array', items: { type: 'string' } },
    },
  };

  const result = await firecrawlRequest('/extract', {
    method: 'POST',
    body: JSON.stringify({
      urls: urls,
      prompt: `Extract all design and content information from this law firm marketing website.
      Include: all colors (hex codes), fonts, navigation structure, page sections,
      CTA button text, services offered, testimonials, and any other key content.
      This is for migrating the site to a new platform.`,
      schema: schema,
    }),
  });

  return result;
}

// ============================================================
// MAIN FUNCTIONS
// ============================================================

async function runMap() {
  console.log('='.repeat(60));
  console.log('LEXGRO SITE MAPPING');
  console.log('='.repeat(60));

  const result = await mapSite();

  const output = {
    url: LEXGRO_URL,
    timestamp: new Date().toISOString(),
    totalUrls: result.links?.length || 0,
    urls: result.links || [],
  };

  const outputPath = path.join(OUTPUT_DIR, 'lexgro-sitemap.json');
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`\nFound ${output.totalUrls} URLs`);
  console.log(`Saved to: ${outputPath}`);

  // Also create a simple list
  if (output.urls.length > 0) {
    console.log('\nPages found:');
    output.urls.forEach(url => console.log(`  - ${url}`));
  }

  return output;
}

async function runCrawl() {
  console.log('='.repeat(60));
  console.log('LEXGRO FULL SITE CRAWL');
  console.log('='.repeat(60));

  const result = await crawlSite({ limit: 50, maxDepth: 3 });

  const output = {
    url: LEXGRO_URL,
    timestamp: new Date().toISOString(),
    pagesFound: result.data?.length || 0,
    pages: result.data || [],
  };

  const outputPath = path.join(OUTPUT_DIR, 'lexgro-crawl.json');
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`\nCrawled ${output.pagesFound} pages`);
  console.log(`Saved to: ${outputPath}`);

  // Generate markdown report
  let report = `# Lexgro.com Site Crawl Report\n\n`;
  report += `- **Generated:** ${output.timestamp}\n`;
  report += `- **Pages Crawled:** ${output.pagesFound}\n\n`;

  output.pages.forEach((page, i) => {
    const title = page.metadata?.title || 'Untitled';
    const url = page.metadata?.sourceURL || page.url;
    report += `## ${i + 1}. ${title}\n\n`;
    report += `**URL:** ${url}\n\n`;
    if (page.markdown) {
      report += `### Content Preview\n\n`;
      report += page.markdown.substring(0, 1000) + '...\n\n';
    }
    report += '---\n\n';
  });

  const reportPath = path.join(OUTPUT_DIR, 'LEXGRO_CRAWL_REPORT.md');
  fs.writeFileSync(reportPath, report);
  console.log(`Report saved to: ${reportPath}`);

  return output;
}

async function runScrape(pageUrl = LEXGRO_URL) {
  console.log('='.repeat(60));
  console.log('LEXGRO PAGE SCRAPE');
  console.log('='.repeat(60));

  const result = await scrapePage(pageUrl);

  const pageName = pageUrl.replace(LEXGRO_URL, '').replace(/\//g, '-') || 'home';
  const outputPath = path.join(OUTPUT_DIR, `lexgro-page-${pageName}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
  console.log(`\nSaved to: ${outputPath}`);

  // Save HTML separately
  if (result.data?.html) {
    const htmlPath = path.join(OUTPUT_DIR, `lexgro-page-${pageName}.html`);
    fs.writeFileSync(htmlPath, result.data.html);
    console.log(`HTML saved to: ${htmlPath}`);
  }

  // Save markdown separately
  if (result.data?.markdown) {
    const mdPath = path.join(OUTPUT_DIR, `lexgro-page-${pageName}.md`);
    fs.writeFileSync(mdPath, result.data.markdown);
    console.log(`Markdown saved to: ${mdPath}`);
  }

  // Save screenshot if available
  if (result.data?.screenshot) {
    const screenshotPath = path.join(OUTPUT_DIR, `lexgro-page-${pageName}.png`);
    const base64Data = result.data.screenshot.replace(/^data:image\/png;base64,/, '');
    fs.writeFileSync(screenshotPath, Buffer.from(base64Data, 'base64'));
    console.log(`Screenshot saved to: ${screenshotPath}`);
  }

  return result;
}

async function runExtract() {
  console.log('='.repeat(60));
  console.log('LEXGRO DESIGN TOKEN EXTRACTION');
  console.log('='.repeat(60));

  // First map to get all URLs
  const mapResult = await mapSite();
  const urls = mapResult.links || [LEXGRO_URL];

  // Extract from main pages
  const pagesToExtract = urls.slice(0, 5); // Top 5 pages
  const result = await extractDesignTokens(pagesToExtract);

  const outputPath = path.join(OUTPUT_DIR, 'lexgro-design-tokens.json');
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
  console.log(`\nSaved to: ${outputPath}`);

  return result;
}

async function runAll() {
  await runMap();
  await new Promise(r => setTimeout(r, 2000));
  await runCrawl();
  await new Promise(r => setTimeout(r, 2000));
  await runScrape();
  await new Promise(r => setTimeout(r, 2000));
  await runExtract();
}

// ============================================================
// CLI
// ============================================================

async function main() {
  if (!FIRECRAWL_API_KEY) {
    console.error('Error: FIRECRAWL_API_KEY not found in .env');
    process.exit(1);
  }

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const command = process.argv[2] || 'map';
  const arg = process.argv[3];

  console.log('='.repeat(60));
  console.log('Lexgro Firecrawl');
  console.log('='.repeat(60));
  console.log(`\nCommand: ${command}\n`);

  switch (command) {
    case 'map':
      await runMap();
      break;

    case 'crawl':
      await runCrawl();
      break;

    case 'scrape':
      await runScrape(arg || LEXGRO_URL);
      break;

    case 'extract':
      await runExtract();
      break;

    case 'all':
      await runAll();
      break;

    default:
      console.log('Usage:');
      console.log('  node firecrawl-lexgro.js map              - Map all URLs');
      console.log('  node firecrawl-lexgro.js crawl            - Crawl all pages');
      console.log('  node firecrawl-lexgro.js scrape [url]     - Scrape single page');
      console.log('  node firecrawl-lexgro.js extract          - AI design extraction');
      console.log('  node firecrawl-lexgro.js all              - Run everything');
  }

  console.log('\nDone!');
}

main().catch(console.error);
