import React, { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import { links } from '../constants'

function Nav() {
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 989)
  const location = useLocation()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 989)
      if (window.innerWidth > 989) {
        setOpen(false)
        document.body.style.overflow = 'scroll'
      }
    }
    const handleScroll = () => {
      const nav = document.querySelector('.nav-container')
      if (location.pathname === '/' || window.scrollY > 50) {
        nav.classList.add('scrolled')
      } else {
        nav.classList.remove('scrolled')
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
  }, [location.pathname])

  const handleOpenToggle = () => {
    if (open) {
      document.body.style.overflow = 'scroll'
    } else {
      document.body.style.overflow = 'hidden'
    }
    setOpen(!open)
  }

  return (
    <div
      className={classNames('nav-container', {
        open: isMobile && open,
      })}
    >
      <div className={classNames('nav')}>
        <div className='nav-content'>
          {isMobile ? (
            <div className='nav-bar'>
              <NavLink exact to='/'>
                <div className='nav-logo'>Saint Rose</div>
              </NavLink>
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
              <Link to='/'>Saint Rose</Link>
            </div>
          )}
          {isMobile ? (
            <div className='nav-items'>
              <ul className='links'>
                {links.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} onClick={handleOpenToggle}>
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
                    <NavLink to={link.path} activeClassName='active-nav-link' exact>
                      {link.label}
                    </NavLink>
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
    </div>
  )
}

export default Nav
