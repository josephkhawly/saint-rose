'use client'

import type { SelectFieldClientProps } from 'payload'
import React from 'react'
import { FieldLabel, ReactSelect, useField } from '@payloadcms/ui'

import { ACCENT_COLOR_OPTIONS, ACCENT_COLORS, type AccentColor } from './colors'

function ColorLabel({ color, label }: { color: string; label: string }) {
  return (
    <span style={{ alignItems: 'center', display: 'inline-flex', gap: 8 }}>
      <span
        aria-hidden
        style={{
          backgroundColor: color,
          border: '1px solid rgba(0, 0, 0, 0.15)',
          borderRadius: 2,
          display: 'inline-block',
          flexShrink: 0,
          height: 14,
          width: 14,
        }}
      />
      {label}
    </span>
  )
}

const options = ACCENT_COLOR_OPTIONS.map(({ label, value }) => ({
  label: <ColorLabel color={ACCENT_COLORS[value]} label={label} />,
  value,
}))

export const AccentColorField: React.FC<SelectFieldClientProps> = ({
  field,
  path: pathFromProps,
  readOnly,
}) => {
  const { label, required } = field
  const { disabled, path, setValue, value } = useField<AccentColor>({
    potentiallyStalePath: pathFromProps,
  })

  const selected =
    options.find((option) => option.value === value) ??
    options.find((option) => option.value === 'rose') ??
    null

  return (
    <div className="field-type select">
      <FieldLabel label={label} path={path} required={required} />
      <ReactSelect
        disabled={Boolean(readOnly || disabled)}
        isClearable={false}
        isSearchable={false}
        onChange={(option) => {
          if (option && !Array.isArray(option)) {
            setValue(option.value)
          }
        }}
        options={options}
        value={selected}
      />
    </div>
  )
}
