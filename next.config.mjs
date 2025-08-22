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
        hostname: '/api/media/**',
      },
    ],
  },
  experimental: {
    useCache: true,
  },
}

export default withPayload(nextConfig)
