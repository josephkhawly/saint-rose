import { PayloadRequest, CollectionSlug } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  'blog-posts': '/blog',
  pages: '',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  req: PayloadRequest
}

const getPreviewPath = (collection: keyof typeof collectionPrefixMap, slug: string) => {
  const prefix = collectionPrefixMap[collection] ?? ''

  if (collection === 'pages' && slug === 'home') {
    return '/'
  }

  return `${prefix}/${slug}`.replace(/\/+/g, '/')
}

export const generatePreviewPath = ({ collection, slug, req }: Props) => {
  const encodedParams = new URLSearchParams({
    slug,
    collection,
    path: getPreviewPath(collection, slug),
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  const isProduction =
    process.env.NODE_ENV === 'production' || Boolean(process.env.VERCEL_PROJECT_PRODUCTION_URL)

  const protocol = isProduction ? 'https:' : req.protocol

  const url = `${protocol}//${req.host}/next/preview?${encodedParams.toString()}`

  return url
}
