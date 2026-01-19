import { revalidateHours } from '@/hooks/revalidateHours'
import { GlobalConfig } from 'payload'

export const Hours: GlobalConfig = {
  slug: 'hours',
  label: 'Business Hours',
  fields: [
    {
      name: 'hours',
      type: 'textarea',
      required: true,

      admin: {
        description:
          'Enter the business hours for the salon. This will be displayed on the visit page and the footer.',
        rows: 5,
      },
    },
  ],
  admin: {
    hidden: true,
  },
  hooks: {
    afterChange: [revalidateHours],
  },
}
