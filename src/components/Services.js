import React from 'react'
import SlideAndFade from './SlideAndFade'
import Nav from './Nav'
import Footer from './Footer'
import classnames from 'classnames'
import HeroSection from './HeroSection'
import PricingTable from './PricingTable'
import { hairData, colorData, treatmentsData } from '../constants'

function Services() {
  return (
    <div className='services'>
      <Nav />
      <div className='content-container'>
        <div className='content'>
          <div className='landing'>
            <SlideAndFade delay={2250}>
              <div className='sub-nav'>Services</div>
              <h3>
                You want service that makes you feel your absolute best, and Saint Rose has a
                full-spectrum of services that make the cut. It&apos;s a match made in heaven.
              </h3>
            </SlideAndFade>
          </div>
          {/* --- New section --- */}
          <div className={classnames('haircut', 'section')}>
            <HeroSection
              video={
                'https://videos.ctfassets.net/2f8bh3xz5t4r/65IZapjKqmRfxmkQM2z88u/d5ecf70b7ef28bcbe86e7baa4ff91d3d/services.mp4'
              }
              leftText="It's not just hair. It's your hair, and we care about every single strand. Let's get creating, shall we?"
              rightParagraphs={[
                'We offer complimentary refreshments because you deserve it. This includes your choice of French-press coffee, a variety of loose-leaf teas served hot or cold, and white, red, and rosé wine.',
              ]}
              heroDelay={3000}
            />

            <SlideAndFade delay={250}>
              <div className='services-container'>
                <PricingTable title='Haircut &amp; Style' data={hairData} />
                <PricingTable title='Color Services' data={colorData} />
                <PricingTable title='Treatments' data={treatmentsData} />
              </div>
            </SlideAndFade>
          </div>

          <Footer />
        </div>
      </div>
      <div className='entrance' />
      <div className='exit' />
      <div className='exit-2' />
    </div>
  )
}

export default Services
