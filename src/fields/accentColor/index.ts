import type { SelectField } from 'payload'

import deepMerge from '@/utils/deepMerge'

import { ACCENT_COLOR_OPTIONS } from './colors'

type AccentColorField = (overrides?: Partial<SelectField>) => SelectField

export const accentColorField: AccentColorField = (overrides = {}) =>
  deepMerge(
    {
      name: 'accentColor',
      type: 'select',
      label: 'Accent Color',
      defaultValue: 'rose',
      options: ACCENT_COLOR_OPTIONS,
      admin: {
        components: {
          Field: '@/fields/accentColor/AccentColorField#AccentColorField',
        },
      },
    } satisfies SelectField,
    overrides,
  )

export { ACCENT_COLOR_OPTIONS, ACCENT_COLORS, type AccentColor } from './colors'
