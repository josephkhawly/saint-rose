import { withPayload } from '@payloadcms/next/withPayload'
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
    ]
  },
}

export default withPayload(nextConfig)
