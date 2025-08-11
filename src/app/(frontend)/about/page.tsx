import Iframe from 'react-iframe'
import { Metadata } from 'next'
import { queryPageBySlug } from '@/lib/helpers'
import { RenderBlocks } from '@/blocks/RenderBlocks'

export const metadata: Metadata = {
  title: 'About Us | Saint Rose',
}

export default async function About() {
  const page = await queryPageBySlug({ slug: 'about' })
  return (
    <div className='about'>
      <div className='content-container'>
        <div className='content'>
          <RenderBlocks blocks={page?.layout || []} />

          <div className='our-clients'>
            <div className='instagram-reviews'>
              <Iframe
                url='https://cdn.lightwidget.com/widgets/d9467bad991b50808baea81bd806ab73.html'
                width='100%'
                height='auto'
                scrolling='no'
                display='initial'
                position='relative'
                // allowtransparency='true'
                // style='width:100%;border:0;overflow:hidden;'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
