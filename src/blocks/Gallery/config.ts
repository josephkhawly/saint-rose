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
      name: 'orientation',
      type: 'radio',
      defaultValue: 'landscape',
      options: [
        { label: 'Portrait', value: 'portrait' },
        { label: 'Landscape', value: 'landscape' },
      ],
      admin: { layout: 'horizontal' },
    },
    {
      name: 'imagePosition',
      type: 'radio',
      defaultValue: 'right',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
      admin: {
        layout: 'horizontal',
        description: 'Side of the page for the carousel. The title sits on the opposite side.',
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
        },
      ],
      required: true,
      minRows: 1,
    },
  ],
}
