export const ACCENT_COLORS = {
  rose: '#bfa89e',
  'deep-rose': '#592e29',
  'dark-chocolate': '#36211a',
  mint: '#cfd9cc',
  lavender: '#ded1de',
  sky: '#9ebdc2',
  garden: '#3b4017',
  olive: '#8c7840',
  lima: '#e8f5b0',
} as const

export type AccentColor = keyof typeof ACCENT_COLORS

export const ACCENT_COLOR_OPTIONS: { label: string; value: AccentColor }[] = [
  { label: 'Rose', value: 'rose' },
  { label: 'Deep Rose', value: 'deep-rose' },
  { label: 'Dark Chocolate', value: 'dark-chocolate' },
  { label: 'Mint', value: 'mint' },
  { label: 'Lavender', value: 'lavender' },
  { label: 'Sky', value: 'sky' },
  { label: 'Garden', value: 'garden' },
  { label: 'Olive', value: 'olive' },
  { label: 'Lima', value: 'lima' },
]
