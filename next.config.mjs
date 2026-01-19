import { withPayload } from "@payloadcms/next/withPayload";
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
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
}

export default withPayload(nextConfig)
