import { revalidateStaff } from '@/hooks/revalidateStaff'
import type { CollectionConfig } from 'payload'

export const StaffMember: CollectionConfig = {
  slug: 'staff-member',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role'],
    hideAPIURL: process.env.NODE_ENV === 'production',
  },
  orderable: true,
  fields: [
    {
      type: 'row',
      fields: [
      ],
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'photoSmall',
      label: 'Headshot',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'This photo will be displayed on the grid.',
      },
    },
    {
      name: 'role',
      type: 'text',
      required: true,
    },
    {
      name: 'instagram',
      type: 'text',
      admin: {
        description: 'Instagram handle without the @',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateStaff],
  },
}
