import { Block } from 'payload'

export const BannerWithText: Block = {
  slug: 'bannerWithText',
  interfaceName: 'BannerWithTextBlock',
  imageURL: '/images/thumbnails/banner.webp',
  fields: [
    {
      name: 'banner',
      type: 'upload',
      relationTo: 'media',
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