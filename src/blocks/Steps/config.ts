import type { Block } from 'payload'

import { accentColorField } from '@/fields/accentColor'

export const Steps: Block = {
  slug: 'steps',
  interfaceName: 'StepsBlock',
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
    },
    {
      name: 'lede',
      type: 'textarea',
    },
    accentColorField({
      label: 'Numeral Color',
      defaultValue: 'rose',
    }),
    {
      name: 'steps',
      type: 'array',
      minRows: 2,
      required: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
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
      ],
    },
  ],
}
