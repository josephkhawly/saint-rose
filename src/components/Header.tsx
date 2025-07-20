'use client'
import { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import { links } from '@/constants'
import { usePathname } from 'next/navigation'
import TransitionLink from './TransitionLink'
import { motion } from 'motion/react'

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
    handleResize()
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
    <motion.header
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, delay: pathname === '/' ? 2.3 : 1, ease: 'easeInOut' }}
      ref={nav}
      className={classNames('nav-container', {
        open: isMobile && open,
      })}
    >
      <div className={classNames('nav')}>
        <div className='nav-content'>
          {isMobile ? (
            <div className='nav-bar'>
              <TransitionLink href='/'>
                <div className='nav-logo'>Saint Rose</div>
              </TransitionLink>
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
              <TransitionLink href='/'>Saint Rose</TransitionLink>
            </div>
          )}
          {isMobile ? (
            <div className='nav-items'>
              <ul className='links'>
                {links.map((link) => (
                  <li key={link.path}>
                    <TransitionLink href={link.path} callback={handleOpenToggle}>
                      {link.label}
                    </TransitionLink>
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
                    <TransitionLink href={link.path}>{link.label}</TransitionLink>
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
    </motion.header>
  )
}

export default Header
