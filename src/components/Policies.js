import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import Nav from './Nav'
import Footer from './Footer'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function Policies() {
  const container = useRef(null)

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: '.content',
        start: 'top+=50 top',
        end: 'bottom top',
        toggleClass: { targets: '.nav-container', className: 'scrolled' },
        scrub: false,
      })
    },
    { scope: container },
  )

  return (
    <div className='policies' ref={container}>
      <Nav />
      <div className='content-container'>
        <div className='content'>
          <Fade bottom delay={2000} distance='50px'>
            <div className='sub-nav'>Policies</div>
          </Fade>
          <Fade bottom delay={2000} distance='50px'>
            <div className='text-content'>
              <h3>
                We have rules in place for your protection, and for ours. Check out our policies and
                let us know if you have any questions.
              </h3>
              <div className='policies-body'>
                <h4>Cancellations</h4>
                <p>
                  Saint Rose is growing and spots are filling quickly. We want to make sure our
                  schedules are accurate when you book with us. When a client cancels last-minute or
                  fails to show up, we lose the opportunity to offer this time to someone else,
                  which is unfair to him or her and us. So we can better serve all of our wonderful
                  guests, appointments cancelled less than 24 hours in advance are subject to a 50%
                  cancellation fee of services booked, and day of cancellations and no-show
                  appointments are subject to a 100% fee of services booked. Thank you for your
                  understanding and continual support.
                </p>

                <h4>New Clients</h4>
                <p>
                  We require a credit card to hold your reservation. Your card will not be charged,
                  unless you fail to make it to your appointment or fail to call to reschedule
                  before the 24-hour window.
                </p>
                <h4>CHILDREN IN THE SALON</h4>
                <p>
                  At Saint Rose, we believe children are the future. Their playful spirit reminds us
                  that as adults, we shouldn&apos;t take life too seriously. As a courtesy to other
                  guests, we respectfully ask that your children remain with you for the duration of
                  your services, and that you bring something for them to play with. We are happy to
                  provide gummy bears and coloring books for all our Saint Rose littles.
                </p>
                <h4>HOW TO PREPARE FOR YOUR APPOINTMENT</h4>
                <ul>
                  <li>
                    <h6>CURLY CUTS</h6>
                    <p>
                      Please arrive with your hair clean, dry, detangled, and free of product.
                      Please do not put your hair up, twist out, braids, or up in a hat, etc. The
                      stylist will cut your hair in its most natural state.
                    </p>
                  </li>
                  <li>
                    <h6>WASH &amp; GO&apos;S</h6>
                    <p>Please arrive with your hair as de-tangled as possible.</p>
                  </li>
                  <li>
                    <h6>TREATMENTS</h6>
                    <p>
                      Unless a blow-dry has been booked after your treatment service, please bring a
                      hair tie or hair clip because you will be leaving the salon with damp hair.
                    </p>
                  </li>
                  <li>
                    <h6>COLOR SERVICES</h6>
                    <p>Please arrive with clean, detangled, dry hair.</p>
                  </li>
                </ul>
                <div className='cta'>
                  <Link to='/appointments'>Make an appointment</Link>

                  <p>
                    No more putting it off, honey - just book it already. We can&apos;t wait to see
                    you!
                  </p>
                </div>
              </div>
            </div>
          </Fade>
          <Footer />
        </div>
      </div>
      <div className='entrance' />
      <div className='exit' />
      <div className='exit-2' />
    </div>
  )
}

export default Policies
