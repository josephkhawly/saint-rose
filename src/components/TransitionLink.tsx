'use client'
import { usePathname, useRouter } from 'next/navigation'
import { gsap, Power1 } from 'gsap'
import classNames from 'classnames'
import Link from 'next/link'

interface Props {
  href: string
  children: React.ReactNode
}

const animatePageOut = (href: string, router: any) => {
  const entrance = document.querySelector('.entrance')

  if (entrance) {
    const tl = gsap.timeline()

    tl.set([entrance], {
      yPercent: 100,
      opacity: 1,
    }).to([entrance], {
      yPercent: 0,
      ease: Power1.easeInOut,
      duration: 1,
      onComplete: () => {
        router.push(href)
      },
    })
  }
}

const TransitionLink = ({ href, children }: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const isHome = pathname === '/'

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (pathname !== href) {
      animatePageOut(href, router)
    }
  }

  return (
    <Link
      className={classNames({ active: pathname === href && !isHome })}
      onClick={handleClick}
      href={href}
    >
      {children}
    </Link>
  )
}

export default TransitionLink
