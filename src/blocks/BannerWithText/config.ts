import { Block } from 'payload'

export const BannerWithText: Block = {
  slug: 'bannerWithText',
  interfaceName: 'BannerWithTextBlock',
  imageURL: '/images/thumbnails/banner.webp',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'banner',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Image or video to be used as the banner.',
      },
    },
    {
      name: 'leftText',
      type: 'text',
    },
    {
      name: 'rightText',
      type: 'textarea',
    },
  ],
}