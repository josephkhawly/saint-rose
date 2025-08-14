import { Metadata } from 'next'
import { queryPageBySlug } from '@/lib/helpers'
import { RenderBlocks } from '@/blocks/RenderBlocks'

export const metadata: Metadata = {
  title: 'About Us | Saint Rose',
}

export default async function About() {
  const page = await queryPageBySlug({ slug: 'about' })
  return (
    <div className='content'>
      <RenderBlocks blocks={page?.layout || []} />
    </div>
  )
}
