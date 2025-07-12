'use client'

import SlideAndFade from './SlideAndFade'
import { motion } from 'motion/react'
import { MOBILEBP, DESKTOPBP } from '@/constants'
import { useState, useEffect } from 'react'

interface HeroSectionProps {
  title?: string
  video?: string
  image?: string
  leftText: string
  rightParagraphs?: string[]
  heroDelay?: number
}

function HeroSection({
  title,
  video,
  image,
  leftText,
  rightParagraphs = [],
  heroDelay = 0.7,
}: HeroSectionProps) {
  const [storyWidth, setStoryWidth] = useState('243px')
  useEffect(() => {
    if (window.innerWidth >= DESKTOPBP) {
      setStoryWidth('612px')
    } else if (window.innerWidth >= MOBILEBP) {
      setStoryWidth('612px')
    } else {
      setStoryWidth('243px')
    }
  }, [])

  return (
    <div className='hero'>
      {title && (
        <motion.div
          className='hero--title-bar'
          initial={{ width: 0 }}
          whileInView={{ width: storyWidth }}
          transition={{ duration: 0.7, ease: 'easeIn' }}
          viewport={{ once: true }}
        >
          <motion.div
            className='title-bar-text'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            viewport={{ once: true }}
          >
            {title}
          </motion.div>
        </motion.div>
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
          <SlideAndFade delay={0.25}>
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
