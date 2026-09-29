import { revalidateServices } from '@/hooks/revalidateServices'
import type { CollectionConfig } from 'payload'

export const ServiceMenu: CollectionConfig = {
  slug: 'service-menu',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'services'],
    hideAPIURL: process.env.NODE_ENV === 'production',
  },
  orderable: true,
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
      admin: {
        components: {
          RowLabel: '@/collections/ServiceMenu/RowLabel#RowLabel',
        },
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
          name: 'hourly',
          label: 'Hourly rate',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: "If checked, price will be displayed with '/hr' appended to it.",
          },
        },
        {
          name: 'description',
          type: 'text',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateServices],
  },
}
