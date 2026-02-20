import Link from 'next/link'
import Image from 'next/image'
import { Fade } from 'react-awesome-reveal'
import TransitionLink from '../TransitionLink'

function Footer() {
  return (
    <Fade fraction={0.01} triggerOnce>
      <footer className='text-secondary bg-black'>
        <Fade triggerOnce>
          <div className='flex flex-col items-center justify-center p-[84px]'>
            <div>
              <Image
                src='/images/footer-rose.svg'
                alt='Footer Rose'
                width={124}
                height={142}
                className='max-sm:w-[82px]'
              />
            </div>

            <div className='mt-12 flex w-full flex-col items-center justify-center gap-6 lg:flex-row'>
              <TransitionLink
                href='/careers'
                className='font-ap-bold text-secondary text-[15px] uppercase no-underline'
              >
                careers
              </TransitionLink>
              <Link
                href='https://hairbysaintrose.direct.salonservicegroup.com'
                target='_blank'
                className='font-ap-bold text-secondary text-[15px] uppercase no-underline'
              >
                shop
              </Link>
            </div>

            <div className='mt-12 flex flex-col items-center justify-center gap-8 lg:flex-row'>
              <p className='mt-[22px] lg:mt-0'>
                &copy; {new Date().getFullYear()} Hair by Saint Rose
              </p>
              <div className='order-first flex items-center gap-x-5 lg:order-none'>
                <Link
                  href='https://www.facebook.com/hairbysaintrose/'
                  target='_blank'
                  rel='noreferrer'
                >
                  <Image src='/images/facebook.svg' alt='Facebook' width={35} height={35} unoptimized />
                </Link>
                <Link
                  href='https://www.instagram.com/hairbysaintrose'
                  target='_blank'
                  rel='noreferrer'
                >
                  <Image src='/images/instagram.svg' alt='Instagram' width={35} height={35} unoptimized />
                </Link>
                <Link
                  href='https://www.youtube.com/channel/UC-m8XjZ7A9vwDpch45bJbtA'
                  target='_blank'
                  rel='noreferrer'
                >
                  <Image src='/images/youtube.svg' alt='YouTube' width={35} height={35} unoptimized />
                </Link>
              </div>
              <p>website by thirtythree</p>
            </div>
          </div>
        </Fade>
      </footer>
    </Fade>
  )
}

export default Footer
