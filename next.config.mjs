import { withPayload } from '@payloadcms/next/withPayload'
import withPlaiceholder from '@plaiceholder/next'
/** @type {import('next').NextConfig} */

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

const nextConfig = {
  images: {
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
}

export default withPayload(withPlaiceholder(nextConfig))
