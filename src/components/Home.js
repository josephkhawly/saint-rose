import React, { useEffect } from 'react'

import { gsap, Power1 } from 'gsap'

import { Fade } from 'react-awesome-reveal'

const getDefaultTimeline = () => {
  const timeline = gsap.timeline({ paused: true })
  const introRose = document.querySelector('.intro-rose')
  const intro2 = document.querySelector('.intro-2')
  const nav = document.querySelector('.nav-container')

  timeline
    .to(introRose, { opacity: 1, delay: 1, duration: 1 })
    .to(intro2, { right: '0', delay: 0.25, ease: Power1.easeInOut, duration: 0.7 })
    .to(nav, { opacity: 1, delay: 0.25, duration: 0.7 })
    .call(playVideo)

  return timeline
}

const playVideo = () => {
  const video = document.getElementById('vid')
  video.play()
}

const Home = () => {
  useEffect(() => {
    const initAnimation = () => {
      const timeline = getDefaultTimeline()
      requestAnimationFrame(() => timeline.play())
    }

    if (document.readyState === 'complete') {
      initAnimation()
    } else {
      window.addEventListener('load', initAnimation, { once: true })
    }
  }, [])

  return (
    <div className='home'>
      <div className='intro' />
      <div className='intro-2' />
      <div className='intro-rose' />

      <div className='content'>
        <Fade delay={4700}>
          <video
            id='vid'
            // autoPlay="autoplay"
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

export default Home
