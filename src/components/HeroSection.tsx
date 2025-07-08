'use client'

import SlideAndFade from './SlideAndFade'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Expo } from 'gsap'
import { MOBILEBP, DESKTOPBP } from '../constants'

gsap.registerPlugin(ScrollTrigger, useGSAP)

interface HeroSectionProps {
  title?: string
  video?: string
  image?: string
  leftText: string
  rightParagraphs?: string[]
  heroDelay?: number
}

const animateTitleBar = (selector, width) => {
  return gsap
    .timeline()
    .to(selector, { width, duration: 0.7, ease: Expo.easeIn })
    .to(`${selector} .title-bar-text`, { opacity: 1, duration: 1 })
}

function HeroSection({
  title,
  video,
  image,
  leftText,
  rightParagraphs = [],
  heroDelay = 700,
}: HeroSectionProps) {
  useGSAP(
    () => {
      // Responsive logic for title bar
      let storyWidth
      if (window.innerWidth >= DESKTOPBP) {
        storyWidth = '612px'
      } else if (window.innerWidth >= MOBILEBP) {
        storyWidth = '612px'
      } else {
        storyWidth = '243px'
      }

      // Our Story
      ScrollTrigger.create({
        trigger: '.hero',
        start: window.innerWidth < MOBILEBP ? 'top+=50 bottom' : 'top+=100 bottom',
        once: true,
        onEnter: () => animateTitleBar('.hero--title-bar', storyWidth).play(),
      })
    },
    { scope: document.querySelector('.content-container') },
  )
  return (
    <div className='hero'>
      {title && (
        <div className='hero--title-bar'>
          <div className='title-bar-text'>{title}</div>
        </div>
      )}
      <SlideAndFade delay={heroDelay}>
        {video && (
          <div className='video-container'>
            <video id='hero-video' autoPlay loop muted playsInline>
              <source src={video} type='video/mp4' />
            </video>
          </div>
        )}
        {image && (
          <div
            className='hero-image'
            style={{
              backgroundImage: `url(${image})`,
            }}
          />
        )}
      </SlideAndFade>
      <div className='hero-text'>
        <div className='text-container'>
          <SlideAndFade>
            <div className='left'>{leftText}</div>
          </SlideAndFade>
        </div>
        <div className='text-container'>
          <SlideAndFade delay={250}>
            <div className='right'>
              {rightParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </SlideAndFade>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
