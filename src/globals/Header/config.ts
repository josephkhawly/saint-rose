import type { GlobalConfig } from 'payload'

import { accentColorField } from '@/fields/accentColor'
import { link } from '@/fields/link'
import { revalidateHeader } from '@/hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link(),
        accentColorField({
          name: 'hoverAccentColor',
          label: 'Hover Accent Color',
        }),
      ],
      maxRows: 6,
      admin: {
        components: {
          RowLabel: '@/globals/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
