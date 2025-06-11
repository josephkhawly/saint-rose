import React from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { TransitionGroup, Transition } from 'react-transition-group'

import { TimelineMax as Timeline, Power1 } from 'gsap'

import Home from './components/Home'
import Contact from './components/Contact'
import Services from './components/Services'
import About from './components/About'

import Policies from './components/Policies'
import Blog from './components/Blog'
import BlogPost from './components/BlogPost'

import Careers from './components/Careers'

import './assets/css/App.scss'

const getHomeTimeline = (node) => {
  const timeline = new Timeline({ paused: true })
  const entrance = node.querySelector('.entrance')

  timeline.to(entrance, 1, {
    opacity: 1,
    delay: 1,
    ease: Power1.easeInOut,
  })

  return timeline
}

const getDefaultTimeline = (node) => {
  const timeline = new Timeline({ paused: true })
  const entrance = node.querySelector('.entrance')

  const nav = node.querySelector('.nav-container')

  timeline
    .to(node, 0.0, {
      height: '100%',
      delay: 1,
    })
    .to(entrance, 1, {
      top: '0',
      delay: 0,
      ease: Power1.easeInOut,
      onStart: () => {
        window.scrollTo(0, 0)
      },
    })
    .to(
      nav,
      1.0,
      {
        opacity: 1,
        delay: 1,
      },
      '-=1',
    )

  return timeline
}

const play = (pathname, node, appears) => {
  const delay = appears ? 0 : 1
  let timeline

  if (pathname === '/') {
    timeline = getHomeTimeline(node, delay)
  } else {
    timeline = getDefaultTimeline(node, delay)
  }
  window.loadPromise.then(() => requestAnimationFrame(() => timeline.play()))
}

const exit = (pathname, node) => {
  const timeline = new Timeline({ paused: true })
  const exit = node.querySelector('.exit')

  timeline.to(exit, 1, {
    top: '0',
    ease: Power1.easeInOut,
  })

  timeline.play()
}

const App = () => (
  <div className='App'>
    <Router>
      <Route
        render={({ location }) => {
          const { pathname, key } = location
          return (
            <TransitionGroup component={null}>
              <Transition
                key={key}
                appear={true}
                onEnter={(node, appears) => play(pathname, node, appears)}
                onExit={(node) => exit(pathname, node)}
                timeout={{ enter: 2000, exit: 1000 }}
              >
                <Switch location={location}>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/contact' component={Contact} />
                  <Route exact path='/services' component={Services} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/policies' component={Policies} />
                  <Route exact path='/blog' component={Blog} />
                  <Route path='/blog/:id' component={BlogPost} />
                  <Route path='/careers' component={Careers} />
                </Switch>
              </Transition>
            </TransitionGroup>
          )
        }}
      />
    </Router>
  </div>
)

export default hot(module)(App)
