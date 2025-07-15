import { getPayload } from 'payload'
import config from '@payload-config'
import { hairData, colorData, treatmentsData } from './constants'

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

(async () => {
  await seedServices()
  console.log('seeded')
})()
