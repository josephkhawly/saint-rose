import type { CollectionConfig } from 'payload'

export const StaffMember: CollectionConfig = {
  slug: 'staff-member',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'displayType'],
  },
  orderable: true,
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
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
    },
    {
      name: 'photoSmall',
      label: 'Photo (Small)',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Photo to be displayed on the grid.',
      },
    },
    {
      name: 'photoLarge',
      label: 'Photo (Large)',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'displayType',
      label: 'Display in Modal',
      type: 'radio',
      options: ['bio', 'video'],
      defaultValue: 'bio',
      required: true,
    },
    {
      name: 'bio',
      type: 'textarea',
    },
    {
      name: 'video',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}