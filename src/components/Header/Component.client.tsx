'use client'
import { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import { links } from '@/constants'
import { usePathname } from 'next/navigation'
import TransitionLink from '../TransitionLink'
import { motion } from 'motion/react'
import styles from './header.module.css'
import { Header, Page } from '@/payload-types'

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

function HeaderLink({ link, callback }: { link: CMSLinkType; callback?: () => void }) {
  const { type, reference, url, label } = link

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url

  if (!href) return null

  return (
    <li>
      <TransitionLink href={href} callback={callback}>
        {label}
      </TransitionLink>
    </li>
  )
}

export default function HeaderClient({ data }: { data: Header }) {
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()
  const nav = useRef(null)

  const navItems = data?.navItems || []

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
        nav.current.classList.add(styles['scrolled'])
      } else {
        nav.current.classList.remove(styles['scrolled'])
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
      className={classNames(styles['nav-container'], {
        [styles['open']]: isMobile && open,
      })}
    >
      <div className={styles['nav']}>
        <div className={styles['nav-content']}>
          {isMobile ? (
            <div className={styles['nav-bar']}>
              <TransitionLink href='/'>
                <div className={styles['nav-logo']}>Saint Rose</div>
              </TransitionLink>
              <button onClick={handleOpenToggle} aria-label='Toggle navigation'>
                <div className={styles['hamburger']}>
                  <div className={styles['hamburger-box']}>
                    <div
                      className={classNames(styles['hamburger-inner'], {
                        [styles['hamburger--spin']]: open,
                      })}
                    />
                  </div>
                </div>
              </button>
            </div>
          ) : (
            <div className={styles['nav-logo']}>
              <TransitionLink href='/'>Saint Rose</TransitionLink>
            </div>
          )}
          {isMobile ? (
            <div className={styles['nav-items']}>
              <ul className={styles['links']}>
                {links.map((link) => (
                  <li key={link.path}>
                    <TransitionLink href={link.path} callback={handleOpenToggle}>
                      {link.label}
                    </TransitionLink>
                  </li>
                ))}
                {navItems.map(({ link }) => (
                  <HeaderLink key={link.label} link={link} callback={handleOpenToggle} />
                ))}
                <li>
                  <a
                    className={styles['book-now-button']}
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
                {navItems.map(({ link }) => (
                  <HeaderLink key={link.label} link={link} />
                ))}
                <li>
                  <a
                    className={styles['book-now-button']}
                    onClick={() => window.blvd.openBookingWidget()}
                  >
                    book now
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  )
}
