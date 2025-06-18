import React from 'react'
import { Link } from 'react-router-dom'

import { Fade } from 'react-awesome-reveal'

function Footer() {
  return (
    <Fade fraction={0.01} triggerOnce>
      <div className='footer'>
        <Fade triggerOnce>
          <div className='footer-container'>
            <div className='footer-logo'>
              <img src='/images/footer-rose.svg' />
            </div>

            <div className='footer-nav'>
              <div className='footer-nav-link'>
                <Link to='/careers'>careers</Link>
              </div>
              <div className='footer-nav-link'>
                <Link
                  to={{
                    pathname: 'https://hairbysaintrose.direct.salonservicegroup.com',
                  }}
                  target='_blank'
                >
                  shop
                </Link>
              </div>
            </div>

            <div className='footer-misc'>
              <div className='copyright'>&copy; {new Date().getFullYear()} Hair by Saint Rose</div>
              <div className='social'>
                <a
                  href='https://www.facebook.com/hairbysaintrose/'
                  target='_blank'
                  rel='noreferrer'
                >
                  <img src='/images/facebook.svg' alt='Facebook' className='social-logo' />
                </a>
                <a
                  href='https://www.instagram.com/hairbysaintrose'
                  target='_blank'
                  rel='noreferrer'
                >
                  <img src='/images/instagram.svg' alt='Instagram' className='social-logo' />
                </a>
                <a
                  href='https://www.youtube.com/channel/UC-m8XjZ7A9vwDpch45bJbtA'
                  target='_blank'
                  rel='noreferrer'
                >
                  <img src='/images/youtube.svg' alt='YouTube' className='social-logo' />
                </a>
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
