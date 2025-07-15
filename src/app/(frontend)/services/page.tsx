import SlideAndFade from '@/components/SlideAndFade'
import classnames from 'classnames'
import HeroSection from '@/components/HeroSection'
import ServiceList from '@/components/ServiceList'
import { Metadata } from 'next'
import { getServices } from '@/lib/helpers'

// Revalidate every 60 seconds
export const revalidate = 60

export const metadata: Metadata = {
  title: 'Services | Saint Rose',
}

export default async function Services() {
  const services = await getServices()

  return (
    <div className='services'>
      <div className='content'>
        <div className='landing'>
          <SlideAndFade delay={1.25}>
            <div className='sub-nav'>Services</div>
            <h3>
              You want service that makes you feel your absolute best, and Saint Rose has a
              full-spectrum of services that make the cut. It&apos;s a match made in heaven.
            </h3>
          </SlideAndFade>
        </div>
        <div className={classnames('haircut', 'section')}>
          <HeroSection
            video={
              'https://videos.ctfassets.net/2f8bh3xz5t4r/65IZapjKqmRfxmkQM2z88u/d5ecf70b7ef28bcbe86e7baa4ff91d3d/services.mp4'
            }
            leftText="It's not just hair. It's your hair, and we care about every single strand. Let's get creating, shall we?"
            rightParagraphs={[
              'We offer complimentary refreshments because you deserve it. This includes your choice of French-press coffee, a variety of loose-leaf teas served hot or cold, and white, red, and rosé wine.',
            ]}
            heroDelay={2}
          />

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
