import { getAllEntriesByContentTypeApiEndpoint, processEntryListResponse } from '@/contentful'
import { BlogItem } from './types'
import config from '@payload-config'
import { Config, getPayload } from 'payload'
import { unstable_cacheTag as cacheTag } from 'next/cache'
import { cache } from 'react'

export function formatIso(isoString: string) {
  const date = new Date(isoString)
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' }
  return date.toLocaleString('en-US', options)
}

export async function getBlogItems(expectedFields: string[]): Promise<BlogItem[]> {
  const options = [
    { key: 'order', value: '-fields.date' },
    // { key: 'limit', value: '10' },
  ]
  const blogListEndpoint = getAllEntriesByContentTypeApiEndpoint('blogPost', options)
  const res = await fetch(blogListEndpoint, { next: { revalidate: 60 } }).then((res) => res.json())
  const fetchedBlogItems = processEntryListResponse(res, expectedFields)
  const blogItems: BlogItem[] = fetchedBlogItems.entries
  return blogItems
}

export async function getServices() {
  'use cache'
  cacheTag('services')
  const payload = await getPayload({ config })
  const services = await payload.find({
    collection: 'service-menu',
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
