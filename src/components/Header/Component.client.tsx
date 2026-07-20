'use client'
import { useEffect, useState } from 'react'
import { links } from '@/constants'
import { Header } from '@/payload-types'
import Link from 'next/link'

type CmsLink = NonNullable<Header['navItems']>[number]['link']

function resolveCmsLinkHref(link: CmsLink) {
  const { type, reference, url } = link
  if (type === 'reference' && typeof reference?.value === 'object' && reference.value.slug) {
    return `${reference.relationTo !== 'pages' ? `/${reference.relationTo}` : ''}/${reference.value.slug}`
  }
  return url ?? null
}

function MenuNavItem({
  href,
  label,
  index,
  menuOpen,
  onNavigate,
}: {
  href: string
  label: string
  index: number
  menuOpen: boolean
  onNavigate: () => void
}) {
  return (
    <li
      className={`transition-all duration-500 ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
      style={{ transitionDelay: menuOpen ? `${150 + index * 75}ms` : '0ms' }}
    >
      <Link
        href={href}
        onClick={onNavigate}
        className='text-4xl text-saint transition-colors md:text-6xl lg:text-7xl hover:text-rose'
      >
        {label}
      </Link>
    </li>
  )
}

function HeaderToolbar({
  overlay,
  menuLabel,
  onToggleMenu,
}: {
  overlay: boolean
  menuLabel: 'Menu' | 'Close'
  onToggleMenu: () => void
}) {
  const bookClass = overlay
    ? 'small-caps text-saint transition-colors'
    : 'uppercase transition-all duration-300 font-caslon text-black'
  const logoClass = overlay ? 'text-saint' : 'text-black transition-colors duration-300'
  const menuButtonClass = overlay ? 'text-saint' : 'duration-300 text-black'

  return (
    <div className='flex items-center justify-between p-6 lg:py-8 lg:px-12'>
      <a
        onClick={() => window.blvd.openBookingWidget()}
        className={`cursor-pointer text-xs hover:text-rose sm:text-sm ${bookClass}`}
      >
        <span className='hidden sm:inline'>Book Now</span>
        <span className='sm:hidden'>Book</span>
      </a>

      <Link
        href='/'
        onClick={overlay ? onToggleMenu : undefined}
        className={`absolute left-1/2 -translate-x-1/2 font-fautive text-2xl uppercase tracking-widest lg:text-5xl ${logoClass}`}
      >
        Saint Rose
      </Link>

      <button
        onClick={onToggleMenu}
        className={`group flex cursor-pointer items-center gap-3 transition-colors hover:text-rose ${menuButtonClass}`}
        aria-label={overlay ? 'Close menu' : 'Open menu'}
      >
        <span className='font-caslon text-xs uppercase'>{menuLabel}</span>
      </button>
    </div>
  )
}

export default function HeaderClient({ data }: { data: Header }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = data?.navItems || []
  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-saint/95 backdrop-blur-sm' : 'bg-transparent'}`}
      >
        <nav className='mx-auto'>
          <HeaderToolbar overlay={false} menuLabel='Menu' onToggleMenu={() => setMenuOpen(true)} />
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-100 transition-all duration-700 ${menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
      >
        <div
          className={`bg-black absolute inset-0 transition-transform duration-700 ease-out ${menuOpen ? 'translate-y-0' : '-translate-y-full'}`}
        />

        <div className='relative z-10 flex h-full flex-col'>
          <HeaderToolbar overlay menuLabel='Close' onToggleMenu={closeMenu} />

          <nav className='flex flex-1 flex-col items-center justify-center px-12 md:items-start md:justify-start md:py-12'>
            <ul className='space-y-6 text-center md:text-left md:space-y-8 lg:space-y-10'>
              {links.map(({ path, label }, index) => (
                <MenuNavItem
                  key={label}
                  href={path}
                  label={label}
                  index={index}
                  menuOpen={menuOpen}
                  onNavigate={closeMenu}
                />
              ))}
              {navItems.map(({ link }, index) => {
                const href = resolveCmsLinkHref(link)
                if (!href) return null
                return (
                  <MenuNavItem
                    key={link.label}
                    href={href}
                    label={link.label}
                    index={index}
                    menuOpen={menuOpen}
                    onNavigate={closeMenu}
                  />
                )
              })}
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}
