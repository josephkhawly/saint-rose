import config from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cacheTag as cacheTag } from 'next/cache'
import { cache } from 'react'
import { draftMode } from 'next/headers'

export function formatIso(isoString: string) {
  const date = new Date(isoString)
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' }
  return date.toLocaleString('en-US', options)
}

export async function getServices() {
  'use cache'
  cacheTag('services')
  const payload = await getPayload({ config })
  const services = await payload.find({
    collection: 'service-menu',
    select: {
      title: true,
      services: true,
    },
  })
  return services.docs
}

export async function getStaff() {
  'use cache'
  cacheTag('staff')
  const payload = await getPayload({ config })
  const staff = await payload.find({
    collection: 'staff-member',
  })
  return staff.docs
}

// type Global = keyof Config['globals']

export async function getGlobal(slug, depth = 1) {
  'use cache'
  cacheTag(`global_${slug}`)
  const payload = await getPayload({ config: config })

  const global = await payload.findGlobal({
    slug,
    depth,
  })

  return global
}

export const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'pages',
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

export const getBlogList = cache(async () => {
  const payload = await getPayload({ config })
  const blogList = await payload.find({
    collection: 'blog-posts',
    limit: 1000,
    sort: '-publishedAt',
    depth: 1,
    draft: false,
    select: {
      title: true,
      slug: true,
      featured: true,
      publishedAt: true,
      headerImage: true,
    },
  })
  return blogList.docs
})

export const getBlogMetadata = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config })
  const blogPost = await payload.find({
    collection: 'blog-posts',
    where: { slug: { equals: slug } },
    depth: 1,
    select: {
      title: true,
      slug: true,
    },
  })
  return blogPost.docs?.[0] || null
})

export const getBlogPost = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config })
  const blogPost = await payload.find({
    collection: 'blog-posts',
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    depth: 1,
    draft,
    where: { slug: { equals: slug } },
  })
  return blogPost.docs?.[0] || null
})
