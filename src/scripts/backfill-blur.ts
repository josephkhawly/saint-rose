import { getPayload } from 'payload'
import config from '@payload-config'
import sharp from 'sharp'

const CONCURRENCY = 5

async function generateBlur(
  url: string,
  mimetype: string | null | undefined,
): Promise<string | null> {
  if (!mimetype?.startsWith('image/') || mimetype === 'image/svg+xml') {
    return null
  }

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status}`)
  }

  const buffer = Buffer.from(await res.arrayBuffer())

  const placeholder = await sharp(buffer)
    .resize(8, 8, { fit: 'inside' })
    .toFormat('webp')
    .webp({ quality: 30 })
    .toBuffer()

  return `data:image/webp;base64,${placeholder.toString('base64')}`
}

async function backfill() {
  const payload = await getPayload({ config })

  let page = 1
  let processed = 0
  let failed = 0

  for (;;) {
    const { docs, hasNextPage } = await payload.find({
      collection: 'media',
      limit: 100,
      page,
      depth: 0,
      where: {
        or: [
          { blurDataURL: { exists: false } },
          { blurDataURL: { equals: null } },
          { blurDataURL: { equals: '' } },
        ],
      },
    })

    if (docs.length === 0) break

    for (let i = 0; i < docs.length; i += CONCURRENCY) {
      const batch = docs.slice(i, i + CONCURRENCY)

      await Promise.all(
        batch.map(async (doc) => {
          try {
            const url = doc.url!.startsWith('http')
              ? doc.url!
              : `${process.env.NEXT_PUBLIC_SITE_URL}${doc.url}`
            const blurDataURL = await generateBlur(url, doc.mimeType)
            if (!blurDataURL) return

            await payload.update({
              collection: 'media',
              id: doc.id,
              data: { blurDataURL },
              context: { skipBlurHook: true },
            })

            processed++
            console.log(`✓ ${doc.filename}`)
          } catch (err) {
            failed++
            console.error(`✗ ${doc.filename}:`, err)
          }
        }),
      )
    }

    if (!hasNextPage) break
    page++
  }

  console.log(`\nDone. ${processed} updated, ${failed} failed.`)
  process.exit(0)
}

backfill().catch((err) => {
  console.error(err)
  process.exit(1)
})
