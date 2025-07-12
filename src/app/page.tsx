'use client'

import { useEffect, useRef } from 'react'

import { Fade } from 'react-awesome-reveal'
import { useAnimate } from 'motion/react'
// import { Metadata } from 'next'

// export const metadata: Metadata = {
//   title: 'Saint Rose',
// }

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [scope, animate] = useAnimate()

  useEffect(() => {
    const initAnimation = async () => {
      await animate('.intro-rose', { opacity: 1 }, { duration: 1 })
      await animate('.intro-2', { right: '0' }, { duration: 0.7, delay: 0.25, ease: 'easeInOut' })
      // await animate('.nav-container', { opacity: 1 }, { duration: 0.7, delay: 0.25 })
      videoRef.current?.play()
    }
    initAnimation()
  }, [animate])

  return (
    <div className='home' ref={scope}>
      <div className='intro' />
      <div className='intro-2' />
      <div className='intro-rose' />

      <div className='content'>
        <Fade delay={4700}>
          <video
            id='vid'
            ref={videoRef}
            loop
            muted
            playsInline
            poster='https://images.ctfassets.net/2f8bh3xz5t4r/1nqNweH34tHLuhi0XUJW7d/d6bbe4cb30ee0a179a743a51b687e697/home-poster.jpg'
          >
            <source
              src={`https://videos.ctfassets.net/2f8bh3xz5t4r/4H6qMtbjwzG7i9j5zccoL6/f1a986700dd3e4139e5f4f8f02c8f463/home.mp4`}
              type='video/mp4'
            />
          </video>
        </Fade>
      </div>
    </div>
  )
}
