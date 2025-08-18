'use client'

import { useAnimate, motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import styles from './intro.module.css'

export default function Intro() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [scope, animate] = useAnimate()
  const intro2Ref = useRef<HTMLDivElement>(null)
  const introRoseRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initAnimation = async () => {
      await animate(introRoseRef.current, { opacity: 1 }, { duration: 1 })
      await animate(
        intro2Ref.current,
        { right: '0' },
        { duration: 0.7, delay: 0.25, ease: 'easeInOut' },
      )
      videoRef.current?.play()
    }
    initAnimation()
  }, [animate])

  return (
    <div ref={scope}>
      <div ref={intro2Ref} className={styles['intro-2']} />
      <div ref={introRoseRef} className={styles['intro-rose']} />

      <div className='content'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 4.5 }}
        >
          <video
            id={styles.vid}
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
