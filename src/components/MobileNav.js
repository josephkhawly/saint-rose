import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import classNames from 'classnames'
import { links } from '../constants'

const MobileNav = ({ expanded }) => {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'scroll'
    }
  },[])

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
        expanded: expanded,
        open: open,
      })}
    >
      <div className={classNames('nav')}>
        <div className='nav-content'>
          <div className='nav-bar'>
            <NavLink exact={true} to='/'>
              <div className='nav-logo'>Saint Rose</div>
            </NavLink>
            <button onClick={() => handleOpenToggle()}>
              <div className='hamburger'>
                <div className='hamburger-box'>
                  <div className='hamburger-inner' />
                </div>
              </div>
            </button>
          </div>
          <div className='nav-items'>
            <ul className='links'>
              {links.map((link) => (
                <li key={link.path}>
                  <Link to={link.path}>
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
        </div>
      </div>
    </div>
  )
}

export default MobileNav
