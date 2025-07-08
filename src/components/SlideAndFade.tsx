'use client'

import { motion } from 'motion/react'
import { ReactNode } from 'react'

interface SlideAndFadeProps {
  children: ReactNode
  delay?: number
  distance?: string
}

const SlideAndFade = ({ children, delay = 0, distance = '50px' }: SlideAndFadeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: delay / 1000 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}

export default SlideAndFade
