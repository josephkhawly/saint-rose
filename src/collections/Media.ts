import type { CollectionConfig } from 'payload'
import sharp from 'sharp'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [
      async ({ req, data, context }) => {
        if (context?.skipBlurHook) return data
        if (!req.file?.data) return data

        if (!req.file.mimetype?.startsWith('image/') || req.file.mimetype === 'image/svg+xml') {
          return data
        }

        const placeholder = await sharp(req.file.data)
          .resize(8, 8, { fit: 'inside' })
          .toFormat('webp')
          .webp({ quality: 30 })
          .toBuffer()

        data.blurDataURL = `data:image/webp;base64,${placeholder.toString('base64')}`

        return data
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      admin: {
        description: 'Description of the media for accessibility purposes.',
      },
    },
    {
      name: 'blurDataURL',
      type: 'text',
      admin: { readOnly: true, hidden: true },
    },
  ],
  upload: true,
  admin: {
    defaultColumns: ['filename', 'alt', 'updatedAt'],
  }
}
