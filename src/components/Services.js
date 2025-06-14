import React, { useState, useRef } from 'react'
import { Expo } from 'gsap'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Fade from 'react-reveal/Fade'
import MediaQuery from 'react-responsive'
import Nav from './Nav'
import { MOBILEBP, DESKTOPTRANSITIONBP } from '../constants'
import Footer from './Footer'
import classnames from 'classnames'
import { playMediaChange } from '../mediaChangeUtils'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function Services() {
  const [haircutOpen, setHaircutOpen] = useState(false)
  const [colorOpen, setColorOpen] = useState(false)
  const [treatmentsOpen, setTreatmentsOpen] = useState(false)
  const container = useRef(null)

  // Helper for title bar animation
  const animateTitleBar = (selector, width) => {
    return gsap
      .timeline()
      .to(selector, { width, duration: 0.7, ease: Expo.easeIn })
      .to(`${selector} .title-bar-text`, { opacity: 1, duration: 1 })
  }

  useGSAP(
    () => {
      // Responsive logic for title bars
      let haircutWidth, colorWidth, treatmentsWidth
      if (window.innerWidth >= MOBILEBP) {
        haircutWidth = '812px'
        colorWidth = '975px'
        treatmentsWidth = '675px'
      } else {
        haircutWidth = '334px'
        colorWidth = '244px'
        treatmentsWidth = '275px'
      }

      // Haircut
      ScrollTrigger.create({
        trigger: '.haircut',
        start: window.innerWidth < MOBILEBP ? 'top bottom' : 'top+=100 bottom',
        once: true,
        onEnter: () => animateTitleBar('.haircut--title-bar', haircutWidth).play(),
      })
      // Color
      ScrollTrigger.create({
        trigger: '.color',
        start: 'top+=100 bottom',
        once: true,
        onEnter: () => animateTitleBar('.color--title-bar', colorWidth).play(),
      })
      // Treatments
      ScrollTrigger.create({
        trigger: '.treatments',
        start: 'top+=100 bottom',
        once: true,
        onEnter: () => animateTitleBar('.treatments--title-bar', treatmentsWidth).play(),
      })
    },
    { scope: container },
  )

  const renderPricingRow = (title, description, price) => {
    return (
      <li className='pricing-row' key={title}>
        <div className='head'>
          <div className='title'>{title}</div>
          {description && <div className='description'>{description}</div>}
        </div>
        <div className='tail'>${price}</div>
      </li>
    )
  }

  const hairData = () => [
    {
      title: 'Haircut',
      description:
        'Starting with a shampoo and condition. Followed by a cut and style of your choice.',
      price: '97',
    },
    {
      title: 'Curly Cut',
      description:
        'After following our curly cut prep instructions, your stylist will cut your hair in its natural state, followed by a shampoo and condition. Afterward, your stylist will walk you through the styling and diffusing process.',
      price: '137',
    },
    {
      title: 'Barber Cut',
      description:
        'A short cut primarily using clippers and taking less than 45 mins. Includes shampoo and style.',
      price: '55',
    },
    {
      title: 'Transformation Cut',
      description:
        'A significant change with extra time allotted for instruction on styling your new do.',
      price: '121',
    },
    {
      title: 'Kids Cut',
      description: 'Guests 10 and under. Includes shampoo and blow dry.',
      price: '55',
    },
    {
      title: 'Special Occasion',
      description:
        'For any look requiring some or all hair to be pinned, teased, or quaffed. Does not include a wash or blow dry.',
      price: '143',
    },
    {
      title: 'Blow Dry',
      description:
        'Customized shampoo and conditioner for your hair needs to be followed by a style of your choice.',
      price: '50',
    },
    {
      title: 'Wash & Go',
      description:
        'A shampoo that is meant to cleanse, hydrate, and define curls to their optimal levels. Beginning with a thorough clarifying of the hair and scalp, then an application of a product customized for your hair, followed by a diffuse to set your style.',
      price: '77',
    },
  ]

  const colorData = () => [
    {
      title: 'Single Process',
      description:
        'A single color applied to cover gray, maintain hair color, or darken your hair color. Does not include blow dry.',
      price: '107',
    },
    {
      title: 'Gloss',
      description:
        'Demi-permanent color used to tint the hair or refresh a previous color service. Does not include blow dry.',
      price: '36',
    },
    {
      title: 'Face Frame Lightning',
      description:
        'A traditional foil or open-air technique, including the part line and area around the face. Blow dry not included.',
      price: '68',
    },
    {
      title: 'Partial Lightning',
      description:
        'A traditional foil or open-air technique, including the crown area of the head. Blow dry not included.',
      price: '151',
    },
    {
      title: 'Full Lightning',
      description:
        'A traditional foil or open-air technique, including the full head. Blow dry not included.',
      price: '206',
    },
  ]

  const treatmentsData = () => [
    { title: 'Kevin Murphy Treatment', price: '39' },
    { title: 'Kevin Murphy Scalp Scrub', price: '45' },
    { title: 'Kérastase Fusio Dose', price: '49' },
    { title: 'Kérastase Scalp Scrub', price: '35' },
    { title: 'Innersense Scalp Scrub', price: '27' },
    { title: 'Leaf & Flower CBD Treatment', price: '69' },
    { title: 'B3 Steam Treatment', price: '59' },
    { title: 'K18 Treatment', price: '28' },
    { title: 'Magic Sleek', price: '360' },
    { title: 'Keratin/Brazilian', price: '340' },
  ]

  const handleOpenToggle = (section) => {
    if (section === 'haircutOpen') setHaircutOpen((open) => !open)
    if (section === 'colorOpen') setColorOpen((open) => !open)
    if (section === 'treatmentsOpen') setTreatmentsOpen((open) => !open)
  }

  return (
    <div className='services'>
      <Nav />
      <div className='content-container'>
        {/* <div className="spacer" style={{ height: "800px" }} /> */}
        <div className='content'>
          <div className='landing'>
            <Fade bottom delay={2250} distance='50px'>
              <div className='sub-nav'>Services</div>
              <h3>
                You want service that makes you feel your absolute best, and Saint Rose has a
                full-spectrum of services that make the cut. It&apos;s a match made in heaven.
              </h3>
              {/* <a href="" target="_blank">
                Download full service sheet.
              </a> */}
            </Fade>
          </div>
          {/* --- New section --- */}
          <div className={classnames('haircut', 'section')}>
            <Fade bottom distance='50px' delay={3000}>
              <div className='section-hero'>
                <video id='hair-loop-vid' autoPlay loop muted playsInline>
                  <source
                    src={
                      'https://videos.ctfassets.net/2f8bh3xz5t4r/65IZapjKqmRfxmkQM2z88u/d5ecf70b7ef28bcbe86e7baa4ff91d3d/services.mp4'
                    }
                    type='video/mp4'
                  />
                </video>
              </div>
            </Fade>
            <div className='section-text'>
              <div className='text-container'>
                <Fade bottom distance='50px'>
                  <div className='left'>
                    It&apos;s not just hair. It&apos;s your hair, and we care about every single
                    strand. Let&apos;s get creating, shall we?
                  </div>
                </Fade>
              </div>
              <Fade bottom delay={250} distance='50px'>
                <div className='text-container'>
                  <div className='right'>
                    <p>
                      We offer complimentary refreshments because you deserve it. This includes your
                      choice of French-press coffee, a variety of loose-leaf teas served hot or
                      cold, and white, red, and rosé wine.
                    </p>
                  </div>
                </div>
              </Fade>
            </div>

            <Fade bottom delay={250} distance='50px'>
              <div className='services-container'>
                <div className='services-block'>
                  <MediaQuery minWidth={DESKTOPTRANSITIONBP}>
                    <div className='pricing-table'>
                      <ul>
                        <li className='header'>
                          <div className='head'>Haircut &amp; Style</div>
                          <div className='tail'>Base Price</div>
                        </li>
                        {hairData().map((rowData) => {
                          return renderPricingRow(rowData.title, rowData.description, rowData.price)
                        })}
                      </ul>
                    </div>
                  </MediaQuery>

                  <MediaQuery maxWidth={MOBILEBP} onChange={() => playMediaChange(container)}>
                    <div
                      className={classnames('pricing-table', {
                        open: haircutOpen,
                      })}
                    >
                      <ul>
                        <li className='header'>
                          <div className='title-container'>
                            <div className='head'>Haircut &amp; Style</div>
                            <div
                              className={classnames('plusminus', {
                                active: haircutOpen,
                              })}
                              onClick={() => {
                                handleOpenToggle('haircutOpen')
                              }}
                            ></div>
                          </div>
                          {haircutOpen && <div className='tail'>Base Price</div>}
                        </li>
                        {haircutOpen &&
                          hairData().map((rowData) => {
                            return renderPricingRow(
                              rowData.title,
                              rowData.description,
                              rowData.price,
                            )
                          })}
                      </ul>
                    </div>
                  </MediaQuery>
                </div>

                <div className='services-block'>
                  <MediaQuery minWidth={DESKTOPTRANSITIONBP}>
                    <div className='pricing-table'>
                      <ul>
                        <li className='header'>
                          <div className='head'>Color Services</div>
                          <div className='tail'>Base price</div>
                        </li>
                        {colorData().map((rowData) => {
                          return renderPricingRow(rowData.title, rowData.description, rowData.price)
                        })}
                      </ul>
                    </div>
                  </MediaQuery>

                  <MediaQuery maxWidth={MOBILEBP} onChange={() => playMediaChange(container)}>
                    <div
                      className={classnames('pricing-table', {
                        open: colorOpen,
                      })}
                    >
                      <ul>
                        <li className='header'>
                          <div className='title-container'>
                            <div className='head'>Color Services</div>
                            <div
                              className={classnames('plusminus', {
                                active: colorOpen,
                              })}
                              onClick={() => {
                                handleOpenToggle('colorOpen')
                              }}
                            ></div>
                          </div>
                          {colorOpen && <div className='tail'>Base Price</div>}
                        </li>
                        {colorOpen &&
                          colorData().map((rowData) => {
                            return renderPricingRow(
                              rowData.title,
                              rowData.description,
                              rowData.price,
                            )
                          })}
                      </ul>
                    </div>
                  </MediaQuery>
                </div>

                <div className='services-block'>
                  <MediaQuery minWidth={DESKTOPTRANSITIONBP}>
                    <div className='pricing-table'>
                      <ul>
                        <li className='header'>
                          <div className='head'>Treatments</div>
                          <div className='tail'>Base price</div>
                        </li>
                        {treatmentsData().map((rowData) => {
                          return renderPricingRow(rowData.title, rowData.description, rowData.price)
                        })}
                      </ul>
                    </div>
                  </MediaQuery>

                  <MediaQuery maxWidth={MOBILEBP} onChange={() => playMediaChange(container)}>
                    <div
                      className={classnames('pricing-table', {
                        open: treatmentsOpen,
                      })}
                    >
                      <ul>
                        <li className='header'>
                          <div className='title-container'>
                            <div className='head'>Treatments</div>
                            <div
                              className={classnames('plusminus', {
                                active: treatmentsOpen,
                              })}
                              onClick={() => {
                                handleOpenToggle('treatmentsOpen')
                              }}
                            ></div>
                          </div>
                          {treatmentsOpen && <div className='tail'>Base Price</div>}
                        </li>
                        {treatmentsOpen &&
                          treatmentsData().map((rowData) => {
                            return renderPricingRow(
                              rowData.title,
                              rowData.description,
                              rowData.price,
                            )
                          })}
                      </ul>
                    </div>
                  </MediaQuery>
                </div>
              </div>
            </Fade>
          </div>

          <Footer delay={0} />
        </div>
      </div>
      <div className='entrance' />
      <div className='exit' />
      <div className='exit-2' />
    </div>
  )
}

export default Services
