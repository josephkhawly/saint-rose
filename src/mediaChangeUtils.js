import { TimelineMax as Timeline } from 'gsap'
import ScrollMagic from 'scrollmagic'

function getMediaChangeTimeline() {
  const timeline = new Timeline({ paused: true })
  const nav = document.querySelector('.nav-container')
  timeline.to(nav, 0.7, {
    opacity: 1,
    delay: 0.25,
  })
  return timeline
}

export function playMediaChange(controllerRef) {
  const timeline = getMediaChangeTimeline()
  window.loadPromise.then(() => requestAnimationFrame(() => timeline.play()))
  new ScrollMagic.Scene({
    triggerElement: '.content',
    offset: 50,
    triggerHook: 'onLeave',
  })
    .setClassToggle('.nav-container', 'scrolled')
    .addTo(controllerRef.current)
}
