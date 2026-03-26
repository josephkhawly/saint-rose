'use client'
import { useState, useEffect } from 'react'
import { links } from '@/constants'
import { Header, Page } from '@/payload-types'
import Link from 'next/link'

type CMSLinkType = {
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages'
    value: Page | string | number
  } | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

function HeaderLink({ link, callback, menuOpen, index }: { link: CMSLinkType; callback?: () => void; menuOpen: boolean; index: number }) {
  const { type, reference, url, label } = link

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${reference.value.slug
      }`
      : url

  if (!href) return null

  return (
    <li
      className={`transition-all duration-500 ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      style={{
        transitionDelay: menuOpen ? `${150 + index * 75}ms` : '0ms',
      }}
    >
      <Link
        href={href}
        onClick={callback}
        className='text-4xl text-saint transition-colors md:text-6xl lg:text-7xl hover:text-rose'
      >
        {label}
      </Link>
    </li>
  )
}

export default function HeaderClient({ data }: { data: Header }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = data?.navItems || []

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-saint/95 backdrop-blur-sm' : 'bg-transparent'
          }`}
      >
        <nav className='mx-auto flex items-center justify-between p-6 lg:py-8 lg:px-12'>
          <a
            onClick={() => window.blvd.openBookingWidget()}
            className='text-xs uppercase transition-all duration-300 sm:text-sm font-caslon text-black hover:text-rose cursor-pointer'
          >
            <span className='hidden sm:inline'>Book Now</span>
            <span className='sm:hidden'>Book</span>
          </a>

          <Link
            href='/'
            className={`absolute left-1/2 -translate-x-1/2 font-fautive text-2xl lg:text-5xl tracking-widest text-black uppercase transition-colors duration-300`}
          >
            Saint Rose
          </Link>

          <button
            onClick={() => setMenuOpen(true)}
            className={`group flex items-center gap-3 transition-colors duration-300 cursor-pointer text-black hover:text-rose`}
            aria-label='Open menu'
          >
            <span className='uppercase text-xs font-caslon'>Menu</span>
          </button>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-100 transition-all duration-700 ${menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
          }`}
      >
        <div
          className={`bg-black absolute inset-0 transition-transform duration-700 ease-out ${menuOpen ? 'translate-y-0' : '-translate-y-full'
            }`}
        />

        <div className='relative z-10 flex h-full flex-col'>
          <div className='flex items-center justify-between p-6 lg:py-8 lg:px-12'>
            <a
              onClick={() => window.blvd.openBookingWidget()}
              className='small-caps text-xs tracking-widest text-saint transition-colors hover:text-rose sm:text-sm cursor-pointer'
            >
              <span className='hidden sm:inline'>Book Now</span>
              <span className='sm:hidden'>Book</span>
            </a>

            <Link
              href='/'
              onClick={() => setMenuOpen(false)}
              className='text-saint absolute left-1/2 -translate-x-1/2 font-fautive text-2xl lg:text-5xl tracking-widest uppercase'
            >
              Saint Rose
            </Link>

            <button
              onClick={() => setMenuOpen(false)}
              className='group flex items-center gap-3 text-saint transition-colors hover:text-rose cursor-pointer'
              aria-label='Close menu'
            >
              <span className='uppercase text-xs font-caslon'>Close</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className='flex flex-1 flex-col items-center justify-center px-12 md:items-start md:justify-start md:py-12'>
            <ul className='space-y-6 text-center md:text-left md:space-y-8 lg:space-y-10'>
              {links.map(({ path, label }, index) => (
                <li
                  key={label}
                  className={`transition-all duration-500 ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`}
                  style={{
                    transitionDelay: menuOpen ? `${150 + index * 75}ms` : '0ms',
                  }}
                >
                  <Link
                    href={path}
                    onClick={() => setMenuOpen(false)}
                    className='text-4xl text-saint transition-colors md:text-6xl lg:text-7xl hover:text-rose'
                  >
                    {label}
                  </Link>
                </li>
              ))}
              {navItems.map(({ link }, index) => (
                <HeaderLink key={link.label} link={link} callback={() => setMenuOpen(false)} menuOpen={menuOpen} index={index} />
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}
