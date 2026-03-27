import { config } from 'dotenv';
config();

import { version } from './server/utils/config';

export default defineNitroConfig({
  srcDir: 'server',
  compatibilityDate: '2025-03-05',

  experimental: {
    asyncContext: true,
    tasks: true,
  },

  preset: 'cloudflare_module',
  cloudflare: {
    deployConfig: true,    // generate wrangler.json for you
    nodeCompat: true,      // enables Node‑style polyfills (recommended for Node‑like libs)
  },

  scheduledTasks: {
    // Daily cron jobs (midnight)
    '0 0 * * *': ['jobs:clear-metrics:daily'],
    // Weekly cron jobs (Sunday midnight)
    '0 0 * * 0': ['jobs:clear-metrics:weekly'],
    // Monthly cron jobs (1st of month at midnight)
    '0 0 1 * *': ['jobs:clear-metrics:monthly'],
  },

  runtimeConfig: {
    public: {
      meta: {
        name: process.env.META_NAME || '',
        description: process.env.META_DESCRIPTION || '',
        version: version || '',
        captcha: (process.env.CAPTCHA === 'true').toString(),
        captchaClientKey: process.env.CAPTCHA_CLIENT_KEY || '',
      },
    },
    cryptoSecret: process.env.CRYPTO_SECRET,
    tmdbApiKey: process.env.TMDB_API_KEY,
    trakt: {
      clientId: process.env.TRAKT_CLIENT_ID,
      clientSecret: process.env.TRAKT_SECRET_ID,
    },
  },
});