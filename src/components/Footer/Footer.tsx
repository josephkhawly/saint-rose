import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Fade } from 'react-awesome-reveal'
import TransitionLink from '../TransitionLink'
import styles from './footer.module.css'

function Footer() {
  return (
    <Fade fraction={0.01} triggerOnce>
      <div className={styles.footer}>
        <Fade triggerOnce>
          <div className={styles['footer-container']}>
            <div className={styles['footer-logo']}>
              <Image src='/images/footer-rose.svg' alt='Footer Rose' width={124} height={142} />
            </div>

            <div className={styles['footer-nav']}>
              <TransitionLink href='/careers'>careers</TransitionLink>
              <Link href='https://hairbysaintrose.direct.salonservicegroup.com' target='_blank'>
                shop
              </Link>
            </div>

            <div className={styles['footer-misc']}>
              <div className={styles['copyright']}>
                &copy; {new Date().getFullYear()} Hair by Saint Rose
              </div>
              <div className={styles['social']}>
                <Link
                  href='https://www.facebook.com/hairbysaintrose/'
                  target='_blank'
                  rel='noreferrer'
                >
                  <Image src='/images/facebook.svg' alt='Facebook' width={35} height={35} />
                </Link>
                <Link
                  href='https://www.instagram.com/hairbysaintrose'
                  target='_blank'
                  rel='noreferrer'
                >
                  <Image src='/images/instagram.svg' alt='Instagram' width={35} height={35} />
                </Link>
                <Link
                  href='https://www.youtube.com/channel/UC-m8XjZ7A9vwDpch45bJbtA'
                  target='_blank'
                  rel='noreferrer'
                >
                  <Image src='/images/youtube.svg' alt='YouTube' width={35} height={35} />
                </Link>
              </div>
              <div className={styles['thirtythree']}>website by thirtythree</div>
            </div>
          </div>
        </Fade>
      </div>
    </Fade>
  )
}

export default Footer
