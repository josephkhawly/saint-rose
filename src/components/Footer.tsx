import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Fade } from 'react-awesome-reveal'

function Footer() {
  return (
    <Fade fraction={0.01} triggerOnce>
      <div className='footer'>
        <Fade triggerOnce>
          <div className='footer-container'>
            <div className='footer-logo'>
              <Image src='/images/footer-rose.svg' alt='Footer Rose' />
            </div>

            <div className='footer-nav'>
              <div className='footer-nav-link'>
                <Link href='/careers'>careers</Link>
              </div>
              <div className='footer-nav-link'>
                <Link
                  href='https://hairbysaintrose.direct.salonservicegroup.com'
                  target='_blank'
                >
                  shop
                </Link>
              </div>
            </div>

            <div className='footer-misc'>
              <div className='copyright'>&copy; {new Date().getFullYear()} Hair by Saint Rose</div>
              <div className='social'>
                <Link
                  href='https://www.facebook.com/hairbysaintrose/'
                  target='_blank'
                  rel='noreferrer'
                >
                  <Image src='/images/facebook.svg' alt='Facebook' className='social-logo' />
                </Link>
                <Link
                  href='https://www.instagram.com/hairbysaintrose'
                  target='_blank'
                  rel='noreferrer'
                >
                  <Image src='/images/instagram.svg' alt='Instagram' className='social-logo' />
                </Link>
                <Link
                  href='https://www.youtube.com/channel/UC-m8XjZ7A9vwDpch45bJbtA'
                  target='_blank'
                  rel='noreferrer'
                >
                  <Image src='/images/youtube.svg' alt='YouTube' className='social-logo' />
                </Link>
              </div>
              <div className='thirtythree'>website by thirtythree</div>
            </div>
          </div>
        </Fade>
      </div>
    </Fade>
  )
}

export default Footer
