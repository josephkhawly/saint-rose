import Link from 'next/link'
import { toRoman } from '@/lib/toRoman'

function Footer() {
  return (
    <footer className='pt-12 pb-5 lg:pt-11 lg:pb-[26px] w-full px-8'>
      <div className='flex flex-col md:flex-row md:gap-12 justify-between mb-12 md:mb-0'>
        <div className='text-sm'>
          <div className='flex flex-col gap-8'>
            <div className=''>
              <p className='text-sm'>3316 Mount Vernon, Houston</p>
              <p className='text-sm'>
                <Link href='tel:3468022183'>346 802 2183</Link>
              </p>
              <Link href='mailto:info@hairbysaintrose.com' className='lg:mb-[22px]'>
                info@hairbysaintrose.com
              </Link>
              <p className='text-sm'></p>
            </div>
            <div className='mb-9 flex gap-4'>
              <Link
                href='https://hairbysaintrose.direct.salonservicegroup.com'
                target='_blank'
                className='text-sm hover:text-rose transition-colors duration-300'
              >
                Shop
              </Link>
              {/* <p className='text-sm'>
                <Link href='/careers' className='hover:text-rose transition-colors duration-300'>
                  Careers
                </Link>
              </p> */}
            </div>
          </div>
        </div>
        <div className='flex flex-row md:flex-col gap-4 justify-start'>
          <Link
            href='https://www.instagram.com/hairbysaintrose/'
            target='_blank'
            rel='noreferrer'
            className='text-sm hover:text-rose transition-colors duration-300'
          >
            Instagram
          </Link>
          <Link
            href='https://www.facebook.com/hairbysaintrose/'
            target='_blank'
            rel='noreferrer'
            className='text-sm hover:text-rose transition-colors duration-300'
          >
            Facebook
          </Link>
          <Link
            href='https://www.youtube.com/channel/UC-m8XjZ7A9vwDpch45bJbtA'
            target='_blank'
            rel='noreferrer'
            className='text-sm hover:text-rose transition-colors duration-300'
          >
            YouTube
          </Link>
        </div>
      </div>
      <div className='text-xs'>
        <span className='mb-[9px] lg:mb-0 lg:mr-10 block lg:inline-block'>
          © {toRoman(new Date().getFullYear())} Saint Rose
        </span>
        <span>Site design by Joseph Khawly</span>
      </div>
      {/* Big Logo */}
      {/* <h1 className='font-fautive text-7xl md:text-8xl lg:text-[19rem] text-black text-center'>
        SAINT ROSE
      </h1> */}
    </footer>
  )
}

export default Footer
