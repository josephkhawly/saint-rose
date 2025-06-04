import React from "react";
import { Link } from "react-router-dom";

import Fade from "react-reveal/Fade";

function Footer() {
  return (
    <Fade fraction={0.01}>
      <div className='footer'>
        <Fade>
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
              <div className='copyright'>&copy; 2023 Hair by Saint Rose</div>
              <div className='social'>
                <a href='https://www.facebook.com/hairbysaintrose/'>
                  <span className='facebook-logo'></span>
                </a>
                <a href='https://www.instagram.com/hairbysaintrose'>
                  <span className='instagram-logo'></span>
                </a>
                <a href='https://www.youtube.com/channel/UC-m8XjZ7A9vwDpch45bJbtA'>
                  <span className='youtube-logo'></span>
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

export default Footer;
