import { Block } from 'payload'

export const Services: Block = {
  slug: 'services',
  interfaceName: 'ServicesBlock',
  fields: [
    {
      name: 'columns',
      type: 'number',
      max: 3,
      min: 1,
      defaultValue: 2,
      required: true,
      admin: {
        description: 'The maximum number of columns to display on desktop.',
      },
    },
  ],
}