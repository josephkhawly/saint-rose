import { getAllEntriesByContentTypeApiEndpoint, processEntryListResponse } from '@/contentful'
import { BlogItem } from './types'
import config from '@payload-config'
import { getPayload } from 'payload'

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
  const payload = await getPayload({ config })
  const services = await payload.find({
    collection: 'service-menu',
  })
  return services.docs
}
