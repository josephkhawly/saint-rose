'use client'

import React from 'react'
import { TransitionGroup, Transition } from 'react-transition-group'
import { gsap, Power1 } from 'gsap'
import { usePathname } from 'next/navigation'

const getHomeTimeline = (node: HTMLElement) => {
  const timeline = gsap.timeline({ paused: true })
  const entrance = node.querySelector('.entrance')
  timeline.to(entrance, { opacity: 1, delay: 1, ease: Power1.easeInOut, duration: 1 })
  return timeline
}

const getDefaultTimeline = (node: HTMLElement) => {
  const timeline = gsap.timeline({ paused: true })
  const entrance = node.querySelector('.entrance')
  const nav = node.querySelector('.nav-container')
  timeline
    .to(node, { height: '100%', delay: 1, duration: 0 })
    .to(entrance, {
      top: '0',
      delay: 0,
      ease: Power1.easeInOut,
      duration: 1,
      onStart: () => {
        window.scrollTo(0, 0)
      },
    })
    .to(nav, { opacity: 1, delay: 1, duration: 1 }, '-=1')
  return timeline
}

const play = (pathname: string, node: HTMLElement) => {
  let timeline
  if (pathname === '/') {
    timeline = getHomeTimeline(node)
  } else {
    timeline = getDefaultTimeline(node)
  }
  const initAnimation = () => {
    requestAnimationFrame(() => timeline.play())
  }
  if (document.readyState === 'complete') {
    initAnimation()
  } else {
    window.addEventListener('load', initAnimation, { once: true })
  }
}

const exit = (node: HTMLElement) => {
  const timeline = gsap.timeline({ paused: true })
  const exit = node.querySelector('.exit')
  timeline.to(exit, { top: '0', ease: Power1.easeInOut, duration: 1 })
  timeline.play()
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <TransitionGroup component={null}>
      <Transition
        key={pathname}
        appear={true}
        onEnter={(node: HTMLElement) => play(pathname, node)}
        onExit={(node: HTMLElement) => exit(node)}
        timeout={{ enter: 2000, exit: 1000 }}
      >
        <div className='main-container'>
          {children}
          <div className='entrance' />
          <div className='exit' />
          <div className='exit-2' />
        </div>
      </Transition>
    </TransitionGroup>
  )
}
