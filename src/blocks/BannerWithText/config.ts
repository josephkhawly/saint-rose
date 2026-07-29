import { Block } from 'payload'

export const BannerWithText: Block = {
  slug: 'bannerWithText',
  interfaceName: 'BannerWithTextBlock',
  imageURL: '/images/thumbnails/banner.webp',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'banner',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Image or video to be used as the banner.',
            width: '50%',
          },
        },
        {
          name: 'imagePosition',
          type: 'radio',
          defaultValue: 'top',
          options: [
            { label: 'Top', value: 'top' },
            { label: 'Bottom', value: 'bottom' },
          ],
          admin: {
            layout: 'vertical',
            description: 'Place the banner above or below the text.',
            width: '50%',
          },
        },
      ],
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