import { getPlaiceholder } from 'plaiceholder'
import { getServerSideURL } from '@/utils/getURL'

function resolveImageUrl(url: string) {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }

  const base = process.env.PORT
    ? `http://${process.env.HOST || '127.0.0.1'}:${process.env.PORT}`
    : (process.env.PORTLESS_URL ?? getServerSideURL())

  return new URL(url, base).href
}

export async function getBlurPlaceholder(url: string) {
  const absoluteUrl = resolveImageUrl(url)
  const res = await fetch(absoluteUrl)

  if (!res.ok) {
    throw new Error(`Failed to fetch image for blur placeholder: ${res.status} ${absoluteUrl}`)
  }

  const buffer = Buffer.from(await res.arrayBuffer())
  const { base64 } = await getPlaiceholder(buffer, { size: 10 })

  return base64
}
