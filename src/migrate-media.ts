import { readFileSync } from 'node:fs'
import { getPayload } from 'payload'
import config from '@payload-config'

interface UploadThingExport {
  name: string
  key: string
  url: string
  size: number
  uploadedAt: string
}

const DRY_RUN = process.argv.includes('--dry-run')
const exportPath =
  process.argv.find((_, i, argv) => argv[i - 1] === '--export') ?? './uploadthing-export.json'

async function migrateMedia() {
  const payload = await getPayload({ config })

  const exported = JSON.parse(readFileSync(exportPath, 'utf-8')) as UploadThingExport[]

  // Index by filename for matching
  const byName = new Map(exported.map((f) => [f.name, f]))

  let totalMigrated = 0
  let totalSkipped = 0
  const failures: Array<{ id: number; filename: string; error: string }> = []
  const unmatchedDbRecords: Array<{ id: number; filename: string }> = []

  let page = 1

  for (;;) {
    const { docs, totalPages } = await payload.find({
      collection: 'media',
      limit: 50,
      page,
      depth: 0,
      sort: 'id',
    })

    if (docs.length === 0) break

    for (const doc of docs) {
      // Skip already-migrated records
      if (doc.url?.includes('blob.vercel-storage.com')) {
        totalSkipped++
        continue
      }

      const match = doc.filename ? byName.get(doc.filename) : undefined

      if (!match) {
        unmatchedDbRecords.push({
          id: doc.id,
          filename: doc.filename ?? 'unknown',
        })
        continue
      }

      try {
        payload.logger.info(`Downloading ${match.name} (id: ${doc.id}) from ${match.url}`)

        const response = await fetch(match.url)

        if (!response.ok) {
          throw new Error(`HTTP ${response.status} fetching ${match.url}`)
        }

        const buffer = Buffer.from(await response.arrayBuffer())

        if (DRY_RUN) {
          payload.logger.info(`[DRY RUN] Would re-upload ${match.name} (${buffer.length} bytes)`)
          totalMigrated++
          continue
        }

        await payload.update({
          collection: 'media',
          id: doc.id,
          data: { alt: doc.alt },
          file: {
            data: buffer,
            name: doc.filename ?? match.name,
            mimetype:
              doc.mimeType ?? response.headers.get('content-type') ?? 'application/octet-stream',
            size: buffer.length,
          },
        })

        totalMigrated++
        payload.logger.info(`Migrated ${match.name} (id: ${doc.id})`)
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        failures.push({
          id: doc.id,
          filename: doc.filename ?? 'unknown',
          error: message,
        })
        payload.logger.error(`Failed ${match.name} (id: ${doc.id}): ${message}`)
      }
    }

    if (page >= totalPages) break
    page++
  }

  payload.logger.info(
    `Done. Migrated: ${totalMigrated}, Skipped (already on Blob): ${totalSkipped}, ` +
      `Failed: ${failures.length}, Unmatched DB records: ${unmatchedDbRecords.length}`,
  )

  if (unmatchedDbRecords.length > 0) {
    payload.logger.info('DB records with no matching export entry:')
    for (const r of unmatchedDbRecords) {
      payload.logger.info(`  - ${r.filename} (id: ${r.id})`)
    }
  }

  // Sanity check in the other direction: exported files no DB record claimed
  const claimedNames = new Set(exported.filter((f) => f.name).map((f) => f.name))
  const unclaimedExports = exported.filter((f) => !claimedNames.has(f.name))
  if (unclaimedExports.length > 0) {
    payload.logger.info(
      `${unclaimedExports.length} exported files were not matched to any DB record (orphans in UploadThing)`,
    )
  }

  process.exit(failures.length > 0 ? 1 : 0)
}

migrateMedia()
