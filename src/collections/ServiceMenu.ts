import type { CollectionConfig } from 'payload'

export const ServiceMenu: CollectionConfig = {
  slug: 'service-menu',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'services',
      type: 'array',
      required: true,
      minRows: 1,
      labels: {
        singular: 'Service',
        plural: 'Services',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              label: 'Service Name',
              type: 'text',
              required: true,
            },
            {
              name: 'price',
              label: 'Base Price',
              type: 'number',
              required: true,
            },
          ],
        },
        {
          name: 'description',
          type: 'text',
        },
      ],
    },
  ],
}
