import type { Block } from 'payload'

import { accentColorField } from '@/fields/accentColor'

export const Intro: Block = {
  slug: 'intro',
  interfaceName: 'IntroBlock',
  imageURL: '/images/thumbnails/intro.webp',
  fields: [
    {
      name: 'introImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    accentColorField({
      name: 'overlayColor',
      label: 'Overlay Color',
      defaultValue: 'rose',
    }),
  ],
}
