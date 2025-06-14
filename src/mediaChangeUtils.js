import { TimelineMax as Timeline } from 'gsap'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

function getMediaChangeTimeline() {
  const timeline = new Timeline({ paused: true })
  const nav = document.querySelector('.nav-container')
  timeline.to(nav, 0.7, {
    opacity: 1,
    delay: 0.25,
  })
  return timeline
}

export function playMediaChange(containerRef) {
  const timeline = getMediaChangeTimeline()
  window.loadPromise.then(() => requestAnimationFrame(() => timeline.play()))
  ScrollTrigger.create({
    trigger: '.content',
    start: 'top+=50 top',
    end: 'bottom top',
    toggleClass: { targets: '.nav-container', className: 'scrolled' },
    scrub: false,
  })
}
