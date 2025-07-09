'use client'
import { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import { links } from '../constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import TransitionLink from './TransitionLink'

function Header() {
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()
  const nav = useRef(null)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 989)
      if (window.innerWidth > 989) {
        setOpen(false)
        document.body.style.overflow = 'scroll'
      }
    }
    const handleScroll = () => {
      if (pathname === '/' || window.scrollY > 50) {
        nav.current.classList.add('scrolled')
      } else {
        nav.current.classList.remove('scrolled')
      }
    }
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    // Call handleScroll initially in case the user is already scrolled
    handleScroll()
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
      document.body.style.overflow = 'scroll'
    }
  }, [pathname, isMobile])

  const handleOpenToggle = () => {
    if (open) {
      document.body.style.overflow = 'scroll'
    } else {
      document.body.style.overflow = 'hidden'
    }
    setOpen(!open)
  }

  return (
    <header
      ref={nav}
      className={classNames('nav-container', {
        open: isMobile && open,
      })}
    >
      <div className={classNames('nav')}>
        <div className='nav-content'>
          {isMobile ? (
            <div className='nav-bar'>
              <Link href='/'>
                <div className='nav-logo'>Saint Rose</div>
              </Link>
              <button onClick={handleOpenToggle} aria-label='Toggle navigation'>
                <div className='hamburger'>
                  <div className='hamburger-box'>
                    <div className={classNames('hamburger-inner', { 'hamburger--spin': open })} />
                  </div>
                </div>
              </button>
            </div>
          ) : (
            <div className='nav-logo'>
              <TransitionLink href='/' label='Saint Rose' />
            </div>
          )}
          {isMobile ? (
            <div className='nav-items'>
              <ul className='links'>
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      onClick={handleOpenToggle}
                      className={classNames({ active: pathname === link.path })}
                    >
                      <div>{link.label}</div>
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    className='book-now-button'
                    onClick={() => {
                      window.blvd.openBookingWidget()
                      handleOpenToggle()
                    }}
                  >
                    <div>Book now</div>
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <div>
              <ul>
                {links.map((link) => (
                  <li key={link.path}>
                    <TransitionLink href={link.path} label={link.label} />
                  </li>
                ))}
                <li>
                  <a className='book-now-button' onClick={() => window.blvd.openBookingWidget()}>
                    book now
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className='divider' />
      </div>
    </header>
  )
}

export default Header
