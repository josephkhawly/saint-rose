import React, { useEffect } from 'react'

import { TimelineMax as Timeline, Power1 } from 'gsap'

import Fade from 'react-reveal/Fade'

import Nav from './Nav'

const getDefaultTimeline = () => {
  const timeline = new Timeline({ paused: true })
  const introRose = document.querySelector('.intro-rose')
  const intro2 = document.querySelector('.intro-2')
  const nav = document.querySelector('.nav-container')

  timeline
    .to(introRose, 1, {
      opacity: 1,
      delay: 1,
    })
    .to(intro2, 0.7, {
      right: '0',
      delay: 0.25,
      ease: Power1.easeInOut,
    })
    .to(nav, 0.7, {
      opacity: 1,
      delay: 0.25,
    })
    .call(playVideo)

  return timeline
}

const play = () => {
  let timeline

  timeline = getDefaultTimeline()
  window.loadPromise
    .then(() => requestAnimationFrame(() => timeline.play()))
    .then(() => {
      const video = document.getElementById('vid')
      video.pause()
    })
}

const playVideo = () => {
  const video = document.getElementById('vid')
  video.play()
}

const getMediaChangeTimeline = () => {
  const timeline = new Timeline({ paused: true })
  const nav = document.querySelector('.nav-container')

  timeline.to(nav, 0.7, {
    opacity: 1,
    delay: 0.25,
  })

  return timeline
}

const playMediaChange = () => {
  let timeline
  timeline = getMediaChangeTimeline()
  window.loadPromise.then(() => requestAnimationFrame(() => timeline.play()))
}

const Home = () => {
  useEffect(() => {
    play()
  }, [])

  return (
    <div className='home'>
      <div className='entrance' />

      <div className='intro' />
      <div className='intro-2' />
      <div className='intro-rose' />

      <Nav />

      <div className='content'>
        <Fade bottom delay={4700} distance='50px'>
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
      <div className='exit' />
      <div className='exit-2' />
    </div>
  )
}

export default Home
