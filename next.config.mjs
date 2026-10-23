import { withPayload } from '@payloadcms/next/withPayload'
import { withBotId } from 'botid/next/config'
import { withSentryConfig } from '@sentry/nextjs/config'
/** @type {import('next').NextConfig} */

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.NEXT_PUBLIC_SERVER_URL || 'http://saint-rose.localhost:1355'

const nextConfig = {
  images: {
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== 'production',
    qualities: [60, 75],
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
      {
        hostname: '3k4a31g25n.ufs.sh',
        pathname: '/f/*',
        protocol: 'https',
      },
    ],
    localPatterns: [
      {
        pathname: '/api/media/**',
      },
      {
        pathname: '/images/gallery/**',
      },
    ],
    minimumCacheTTL: 2678400, // 31 days
  },
  experimental: {
    useCache: true,
    turbopackFileSystemCacheForDev: true,
    turbopackFileSystemCacheForBuild: true,
    serverActions: {
      bodySizeLimit: '4.5mb',
    },
  },
  async redirects() {
    // Redirects for links in linkin.bio
    // We can remove these redirects once it's been updated
    return [
      {
        source: '/meet-the-team',
        destination: '/team',
        permanent: true,
      },
      {
        source: '/blog/15rHN4QlZfw4f0f3jSb7gW',
        destination: '/blog/the-face-shape-a-complete-guide',
        permanent: true,
      },
      {
        source: '/blog/76WRKxEhztWGAqTmOhQ9bA',
        destination: '/blog/our-top-tips-for-tackling-frizz--dryness-this-summer',
        permanent: true,
      },
      {
        source: '/blog/2hnTyV4mUAJ36q9erktUik',
        destination: '/blog/the-rose-list-our-favorite-patios-in-houston-for-summer-24',
        permanent: true,
      },
    ]
  },
  reactCompiler: true,
}

export default withSentryConfig(withBotId(withPayload(nextConfig)), {
  org: 'josephs-clients',
  project: 'saint-rose',
  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,
  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,
  // Route browser requests to Sentry through a Next.js rewrite to avoid ad blockers.
  // This can increase your server load as well as your hosting bill.
  tunnelRoute: '/monitoring',
})
