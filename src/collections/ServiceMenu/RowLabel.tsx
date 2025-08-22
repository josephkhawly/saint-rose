'use client'
import { ServiceMenu } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<ServiceMenu['services']>[number]>()

  const label = data?.data?.title
    ? `Service ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data?.data?.title}`
    : 'Service'

  return <div>{label}</div>
}
