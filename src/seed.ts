import { getPayload, Payload } from 'payload'
import config from '@payload-config'
import { hairData, colorData, treatmentsData } from './constants'
import fetch from 'node-fetch'
import fs from 'fs/promises'
import path from 'path'
import os from 'os'
import { getAllEntriesByContentTypeApiEndpoint, processStaffResponse } from './contentful'

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

const seedStaff = async () => {
  const payload = await getPayload({ config })
  const staff = await payload.find({
    collection: 'staff-member',
    limit: 1,
  })

  if (staff.docs.length > 0) {
    console.log('staff already seeded')
    return
  }

  // Fetch staff data from Contentful
  const staffEndpoint = getAllEntriesByContentTypeApiEndpoint('staff', [
    { key: 'order', value: 'fields.order' },
  ])
  const staffData = await fetch(staffEndpoint)
  const staffDataJson = await staffData.json()
  const staffMembers = processStaffResponse(staffDataJson)

  for (const member of staffMembers) {
    // Upload assets to media collection
    const photoSmallId = await uploadMedia(payload, member.photoSmall, `${member.name} small photo`)
    const photoLargeId = await uploadMedia(payload, member.photoLarge, `${member.name} large photo`)
    const videoId = await uploadMedia(payload, member.video, `${member.name} video`)

    // Determine displayType
    let displayType = 'bio'
    if (videoId) displayType = 'video'

    // Create staff-member doc
    await payload.create({
      collection: 'staff-member',
      data: {
        name: member.name,
        role: member.role,
        instagram: member.instagram || '',
        photoSmall: photoSmallId,
        photoLarge: photoLargeId,
        displayType: displayType as any, // type assertion to bypass TS error
        bio: member.bio || '',
        video: videoId,
      },
    })
    console.log(`Seeded staff: ${member.name}`)
  }
  console.log('All staff seeded!')
}

;(async () => {
  // await seedServices()
  await seedStaff()
  console.log('seeded')
})()
