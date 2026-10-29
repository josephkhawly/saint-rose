import type { MetadataRoute } from 'next'

import config from '@payload-config'
import { getPayload } from 'payload'

import { getServerSideURL } from '@/utils/getURL'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = getServerSideURL()
  const payload = await getPayload({ config })

  const [pages, blogPosts] = await Promise.all([
    payload.find({
      collection: 'pages',
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      select: {
        slug: true,
        updatedAt: true,
      },
    }),
    payload.find({
      collection: 'blog-posts',
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      select: {
        slug: true,
        updatedAt: true,
      },
    }),
  ])

  const pageEntries: MetadataRoute.Sitemap = pages.docs.flatMap((page) => {
    if (!page.slug) return []

    return [
      {
        lastModified: page.updatedAt,
        url: page.slug === 'home' ? url : `${url}/${page.slug}`,
      },
    ]
  })

  const blogEntries: MetadataRoute.Sitemap = blogPosts.docs.flatMap((post) => {
    if (!post.slug) return []

    return [
      {
        lastModified: post.updatedAt,
        url: `${url}/blog/${post.slug}`,
      },
    ]
  })

  return [
    ...pageEntries,
    {
      url: `${url}/blog`,
    },
    {
      url: `${url}/careers`,
    },
    ...blogEntries,
  ]
}
