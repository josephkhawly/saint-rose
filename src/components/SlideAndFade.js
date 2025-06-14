import React from 'react'
import { keyframes } from '@emotion/react'
import { Reveal } from 'react-awesome-reveal'

const fadeIn = (distance) => {
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

const SlideAndFade = ({ children, direction = 'up', delay = 0, distance = '50px', triggerOnce = true }) => {
  return (
    <Reveal keyframes={fadeIn(distance)} direction={direction} delay={delay} triggerOnce={triggerOnce}>
      {children}
    </Reveal>
  )
}

export default SlideAndFade
