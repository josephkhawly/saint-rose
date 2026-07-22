import { Block } from 'payload'

export const ImageAndTextColumn: Block = {
  slug: 'imageAndTextColumn',
  interfaceName: 'ImageAndTextColumnBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'link',
          type: 'text',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'linkLabel',
          type: 'text',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'imagePosition',
      type: 'radio',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
      admin: {
        layout: 'horizontal',
      },
    },
  ],
}
