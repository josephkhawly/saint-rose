'use client'
import { keyframes } from '@emotion/react'
import { ReactNode } from 'react'
import { Reveal } from 'react-awesome-reveal'

interface SlideAndFadeProps {
  children: ReactNode;
  delay?: number;
  distance?: string;
}

const fadeIn = (distance: string) => {
  return keyframes`
    from {
      opacity: 0;
      transform: translateY(${distance});
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  `
}

const SlideAndFade = ({ children, delay = 0, distance = '50px' }: SlideAndFadeProps) => {
  return (
    <Reveal keyframes={fadeIn(distance)} delay={delay} triggerOnce>
      {children}
    </Reveal>
  )
}

export default SlideAndFade
