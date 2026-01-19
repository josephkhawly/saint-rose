import { Block } from 'payload'

export const Video: Block = {
  slug: 'video',
  interfaceName: 'VideoBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Optional title to display above the video.',
        disabled: true,
      },
    },
    {
      name: 'video',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Optional description to display below the video.',
        disabled: true,
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'autoplay',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'loop',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'muted',
          label: 'Mute by default',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'controls',
          label: 'Show controls',
          type: 'checkbox',
          defaultValue: true,
        },
      ]
    }
  ],
}
