/**
 * Scrape LEXGRO reviews and testimonial videos
 * Uses Firecrawl to get:
 * 1. YouTube testimonial videos
 * 2. Trustpilot reviews
 */
import 'dotenv/config';
import Firecrawl from '@mendable/firecrawl-js';
import * as fs from 'fs';

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY;

const URLS = {
  youtube: 'https://www.youtube.com/@LEXGRO/videos',
  trustpilot: 'https://www.trustpilot.com/review/lexgro.com',
};

const OUTPUT_DIR = 'scripts/research/output';

async function scrapeUrl(firecrawl: Firecrawl, name: string, url: string) {
  console.log(`\n=== Scraping ${name} ===`);
  console.log(`URL: ${url}`);

  try {
    const result = await firecrawl.scrape(url, {
      formats: ['markdown', 'html'],
    });

    // Result is a Document object directly (no .success check needed)
    console.log(`Success! Content length: ${result.markdown?.length || 0} chars`);

    // Save markdown
    if (result.markdown) {
      const filename = `${OUTPUT_DIR}/${name}.md`;
      fs.writeFileSync(filename, result.markdown);
      console.log(`Saved: ${filename}`);
    }

    // Save JSON with full data
    const jsonFilename = `${OUTPUT_DIR}/${name}.json`;
    fs.writeFileSync(jsonFilename, JSON.stringify(result, null, 2));
    console.log(`Saved: ${jsonFilename}`);

    return result;
  } catch (error) {
    console.error(`Error scraping ${name}:`, error);
    return null;
  }
}

async function extractYouTubeVideos(html: string) {
  // Extract video IDs and titles from YouTube page
  const videoPattern = /watch\?v=([a-zA-Z0-9_-]{11})/g;
  const matches = html.matchAll(videoPattern);
  const videoIds = [...new Set([...matches].map(m => m[1]))];

  console.log(`\nFound ${videoIds.length} unique YouTube video IDs:`);
  videoIds.forEach((id, i) => {
    console.log(`  ${i + 1}. https://youtube.com/watch?v=${id}`);
  });

  return videoIds;
}

async function main() {
  if (!FIRECRAWL_API_KEY) {
    console.error('FIRECRAWL_API_KEY not found');
    process.exit(1);
  }

  const firecrawl = new Firecrawl({ apiKey: FIRECRAWL_API_KEY });

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Scrape YouTube channel
  const ytResult = await scrapeUrl(firecrawl, 'lexgro-youtube', URLS.youtube);
  if (ytResult?.html) {
    const videoIds = await extractYouTubeVideos(ytResult.html);
    fs.writeFileSync(
      `${OUTPUT_DIR}/lexgro-youtube-video-ids.json`,
      JSON.stringify(videoIds, null, 2)
    );
  }

  // Scrape Trustpilot
  await scrapeUrl(firecrawl, 'lexgro-trustpilot', URLS.trustpilot);

  console.log('\n=== Done ===');
}

main();
