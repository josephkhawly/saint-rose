'use client'

import { useEffect } from 'react'
import { gsap, Power1 } from 'gsap'
import { usePathname } from 'next/navigation'

// const getHomeTimeline = () => {
//   const timeline = gsap.timeline({ paused: true })
//   const entrance = document.querySelector('.entrance')
//   timeline.to(entrance, { opacity: 1, delay: 1, ease: Power1.easeInOut, duration: 1 })
//   return timeline
// }

const animatePageIn = (isHome: boolean) => {
  const entrance = document.querySelector('.entrance')

  if (entrance) {
    const tl = gsap.timeline()

    if (isHome) {
      tl.set(entrance, {
        opacity: 1,
      }).to(entrance, {
        opacity: 0,
        ease: Power1.easeInOut,
        duration: 1,
      })
    }
    tl.set(entrance, {
      yPercent: 0,
    }).to(entrance, {
      yPercent: -100,
      ease: Power1.easeInOut,
      duration: 1,
    })

  }
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  useEffect(() => {
    animatePageIn(pathname === '/')
  }, [pathname])
  return (
    <div className='main-container'>
      {children}
      <div className='entrance' />
    </div>
  )
}
