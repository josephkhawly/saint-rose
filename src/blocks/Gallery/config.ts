import { Block } from 'payload'

export const Gallery: Block = {
  slug: 'gallery',
  interfaceName: 'GalleryBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Optional title to display.',
      },
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Images or videos to display in the gallery.',
          },
        },
      ],
      required: true,
      minRows: 1,
    },
  ],
}
