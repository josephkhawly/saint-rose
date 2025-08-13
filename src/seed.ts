import { getPayload, Payload } from 'payload'
import config from '@payload-config'
import { hairData, colorData, treatmentsData } from './constants'
import fetch from 'node-fetch'
import fs from 'fs/promises'
import path from 'path'
import os from 'os'

const seedServices = async () => {
  const payload = await getPayload({ config })
  const serviceMenu = await payload.find({
    collection: 'service-menu',
    limit: 1,
  })

  if (serviceMenu.docs.length > 0) {
    console.log('services already seeded')
    return
  }

  const haircutAndStyle = await payload.create({
    collection: 'service-menu',
    data: {
      title: 'Haircut & Style',
      services: hairData,
    },
  })

  const colorServices = await payload.create({
    collection: 'service-menu',
    data: {
      title: 'Color Services',
      services: colorData,
    },
  })

  const treatments = await payload.create({
    collection: 'service-menu',
    data: {
      title: 'Treatments',
      services: treatmentsData,
    },
  })

  console.log(haircutAndStyle, colorServices, treatments)
}

// Helper to download a remote file to a temp path
async function downloadToTemp(url: string) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to download ${url}`)
  const filename = path.basename(new URL(url).pathname) || ''
  const tempPath = path.join(os.tmpdir(), `${filename}`)
  const buffer = await res.buffer()
  await fs.writeFile(tempPath, buffer)
  return tempPath
}

// Helper to upload a file to Payload's media collection
async function uploadMedia(payload: Payload, fileUrl: string, altText: string) {
  if (!fileUrl) return undefined
  try {
    if (!fileUrl.includes('https:')) {
      fileUrl = `https:${fileUrl}`
    }

    const tempPath = await downloadToTemp(fileUrl)
    const mediaDoc = await payload.create({
      collection: 'media',
      data: { alt: altText || 'Staff media' },
      filePath: tempPath,
    })
    await fs.unlink(tempPath)
    return mediaDoc.id
  } catch (err) {
    console.error('Failed to upload media:', fileUrl, err)
    return undefined
  }
}

;(async () => {
  // await seedServices()
  console.log('seeded')
})()
