import SlideAndFade from '@/components/SlideAndFade'
// import { BannerWithText } from '@/blocks/BannerWithText/Component'
import ServiceList from '@/components/ServiceList'
import { Metadata } from 'next'
import { getServices } from '@/lib/helpers'
import { IntroText } from '@/components/IntroText'

export const metadata: Metadata = {
  title: 'Services | Saint Rose',
}

export default async function Services() {
  const services = await getServices()

  return (
    <div className='services'>
      <div className='content'>
        <IntroText
          title='Services'
          introText="You want service that makes you feel your absolute best, and Saint Rose has a full-spectrum of services that make the cut. It's a match made in heaven."
        />
        <div className={'section'}>
          {/* <BannerWithText
            banner={
              'https://videos.ctfassets.net/2f8bh3xz5t4r/65IZapjKqmRfxmkQM2z88u/d5ecf70b7ef28bcbe86e7baa4ff91d3d/services.mp4'
            }
            leftText="It's not just hair. It's your hair, and we care about every single strand. Let's get creating, shall we?"
            rightText='We offer complimentary refreshments because you deserve it. This includes your choice of French-press coffee, a variety of loose-leaf teas served hot or cold, and white, red, and rosé wine.'
            heroDelay={2}
          /> */}

          <SlideAndFade delay={0.25}>
            <div className='services-container'>
              {services.map((service) => (
                <ServiceList key={service.id} title={service.title} data={service.services} />
              ))}
            </div>
          </SlideAndFade>
        </div>
      </div>
    </div>
  )
}
