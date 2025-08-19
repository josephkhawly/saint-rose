import HeaderClient from './Component.client'
import { getGlobal } from '@/lib/helpers'
import React from 'react'

import type { Header } from '@/payload-types'

export default async function Header() {
  const headerData: Header = await getGlobal('header', 1)

  return <HeaderClient data={headerData} />
}
