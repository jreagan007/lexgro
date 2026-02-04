// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: process.env.URL || 'https://lexgro.netlify.app',

  redirects: {
    // Service pages consolidation
    '/services/': '/how-we-work/',
    '/services/fractional-cmo/': '/how-we-work/',
    '/services/fractional-law-firm-cmo/': '/how-we-work/',

    // URL changes from Framer migration
    '/privacy-policy': '/privacy/',
    '/privacy-policy/': '/privacy/',

    // Vendor pages (redirect to main vendor page until subpages built)
    '/vendors/': '/services/vendor/',
    '/vendors/hire-a-trained-smi': '/services/vendor/',
    '/vendors/marketing-intake-training': '/services/vendor/',
    '/vendors/billboards': '/services/vendor/',
    '/vendors/media-buying': '/services/vendor/',
    '/vendors/hire-a-fractional-cfo': '/services/vendor/',
    '/vendors/hire-a-fractional-coo': '/services/vendor/',
    '/vendors/hire-a-fractional-cmo': '/services/vendor/',
    '/explore-vendors': '/services/vendor/',
    '/explore-vendors/': '/services/vendor/',
  },

  integrations: [
    react(),
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/admin') && !page.includes('/api') && !page.includes('/preview')
    })
  ],

  image: {
    service: { entrypoint: 'astro/assets/services/sharp' }
  },

  vite: {
    ssr: {
      noExternal: ['@chakra-ui/react', '@emotion/react', '@emotion/styled']
    },
    optimizeDeps: {
      include: ['@chakra-ui/react', '@emotion/react', '@emotion/styled', 'framer-motion']
    }
  }
});
