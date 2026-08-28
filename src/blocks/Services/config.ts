import { Block } from 'payload'

export const Services: Block = {
  slug: 'services',
  interfaceName: 'ServicesBlock',
  imageURL: '/images/thumbnails/services.webp',
  fields: [
    {
      name: 'disclaimer',
      type: 'text',
      defaultValue:
        'Prices shown are starting rates and vary based on the level of the stylist.',
    },
  ],
}