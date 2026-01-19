'use client'

import { useAnimate, motion } from 'motion/react'
import { useEffect, useRef } from 'react'

export default function Intro() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [scope, animate] = useAnimate()
  const wipe = useRef<HTMLDivElement>(null)
  const introRoseRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initAnimation = async () => {
      await animate(introRoseRef.current, { opacity: 1 }, { duration: 1 })
      await animate(wipe.current, { right: '0' }, { duration: 0.7, delay: 0.25, ease: 'easeInOut' })
      videoRef.current?.play()
    }
    initAnimation()
  }, [animate])

  return (
    <div ref={scope}>
      <div ref={wipe} className='fixed top-0 bottom-0 left-0 bg-black' />
      <div
        ref={introRoseRef}
        className='fixed top-0 right-0 bottom-0 left-0 bg-[url("/images/home-rose.svg")] bg-center bg-no-repeat opacity-0'
      />

      <div className='relative z-10'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 4.5 }}
        >
          <video
            className='h-screen w-full object-cover'
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
        </motion.div>
      </div>
    </div>
  )
}
