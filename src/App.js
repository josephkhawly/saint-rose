import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import {
  TransitionGroup,
  CSSTransition,
  Transition,
} from "react-transition-group";

import { TimelineMax as Timeline, Power1 } from "gsap";

// import "./assets/fonts/optima.woff";
// import "./assets/fonts/apercu-regular.woff";
// import "./assets/fonts/apercu-bold.woff";

import Nav from "./components/Nav";

import Home from "./components/Home";
// import HomeCovid from "./components/HomeCovid";
import Contact from "./components/Contact";
import Services from "./components/Services";
import About from "./components/About";

import Covid from "./components/Covid";
import WhoWeAre from "./components/WhoWeAre";
import WhatWeDo from "./components/WhatWeDo";
import MeetTheTeam from "./components/MeetTheTeam";
import Hair from "./components/Hair";
import Nails from "./components/Nails";
import CareAndCommitment from "./components/CareAndCommitment";
import SalonExperience from "./components/SalonExperience";
import Policies from "./components/Policies";
import Blog from "./components/Blog";
import BlogPost from "./components/BlogPost";

// import BookNow from "./components/BookNow";
import Careers from "./components/Careers";
import WhyWeDoIt from "./components/WhyWeDoIt";
import FooterWithNav from "./components/FooterWithNav";

import "./assets/css/App.scss";

function Index() {
  return (
    <div className="index">
      <div className="content">
        <h2>Home</h2>
      </div>
      <div className="entrance" />
      <div className="exit" />
    </div>
  );
}

function Users() {
  return <h2>Users</h2>;
}

const getHomeTimeline = (node, delay) => {
  const timeline = new Timeline({ paused: true });
  const entrance = node.querySelector(".entrance");

  timeline.to(entrance, 1, {
    opacity: 1,
    delay: 1,
    ease: Power1.easeInOut,
  });

  return timeline;
};

const getDefaultTimeline = (node, delay) => {
  const timeline = new Timeline({ paused: true });
  // console.log("node: ", node);
  // console.log("node probe: ", node.parentNode);
  const entrance = node.querySelector(".entrance");

  const content = node.querySelector(".content");

  // const nav = node.parentNode.querySelector(".nav");

  const nav = node.querySelector(".nav-container");

  // const wrap = node.querySelector(".who-we-are");
  // const contentInner = node.querySelector(".content--inner");

  // console.log("content: ", content);

  timeline
    // .from(node, 0.0, {
    //   display: "none",
    //   autoAlpha: 0,
    //   delay: 1,
    //   ease: Power1.easeIn
    // })
    .to(node, 0.0, {
      height: "100%",
      delay: 1,
      // onComplete: () => {
      //   window.scrollTo(0, 0);
      // },
    })
    // .from(node, 0.0, {
    //   // display: "none",
    //   visibility: "hidden",
    //   opacity: 0,
    //   delay: 1,
    //   ease: Power1.easeIn
    // })
    // .to(node, 0.0, {
    //   opacity: 1,
    //   delay: 1
    // })
    .to(entrance, 1, {
      // y: "100%",
      top: "0",
      delay: 0,
      ease: Power1.easeInOut,
      // display: "block"
      onStart: () => {
        window.scrollTo(0, 0);
      },
      // onComplete: () => {
      //   window.scrollTo(0, 0);
      // },
    })
    .to(
      nav,
      1.0,
      {
        opacity: 1,
        delay: 1,
        // onComplete: () => {
        //   window.scrollTo(0, 0);
        // },
      },
      "-=1"
    );
  // .to(content, 0.15, {
  //   alpha: 1,
  //   delay: 0.15,
  //   ease: Power1.easeIn
  // });
  // .to(content, 0.15, {
  //   display: "block",
  //   delay: 0.15,
  //   ease: Power1.easeIn
  // });

  // .to(entrance, 1, {
  //   // y: "100%",
  //   // bottom: 0,
  //   // delay: 0,
  //   // ease: Power1.easeInOut
  //   display: "none"
  // });
  // .to(entrance, 0, {});

  // .from(entrance, 1, { y: "100%", ease: Power1.easeInOut, delay: 0 });
  // .from(contentInner, 0.15, {
  //   autoAlpha: 0,
  //   delay: 0.15,
  //   ease: Power1.easeIn
  // });

  return timeline;
};

const play = (pathname, node, appears) => {
  // console.log("node set in play: ", node);
  const delay = appears ? 0 : 1;
  let timeline;

  // console.log("pathname:", pathname);

  if (pathname === "/") {
    timeline = getHomeTimeline(node, delay);
  } else {
    timeline = getDefaultTimeline(node, delay);
  }
  window.loadPromise.then(() => requestAnimationFrame(() => timeline.play()));

  // timeline = getDefaultTimeline(node, delay);

  // window.loadPromise.then(() => requestAnimationFrame(() => timeline.play()));
};

const exit = (pathname, node) => {
  const timeline = new Timeline({ paused: true });
  const exit = node.querySelector(".exit");
  // const exitTwo = node.querySelector(".exit-2");

  // console.log("exit path ", pathname);
  // console.log("exit: ", exit);

  // timeline.from(node, 0.3, {
  //   display: "none",
  //   autoAlpha: 0,
  //   ease: Power1.easeIn
  // });

  timeline
    // .set(exit, 1.15, { y: "10%", ease: Power1.easeInOut })
    .to(exit, 1, {
      // y: "100%",
      top: "0",
      ease: Power1.easeInOut,
      // display: "block"
      // onComplete: () => {
      //   window.scrollTo(0, 0);
      // },
    });

  // timeline.to(content, 3.15, { autoAlpha: 0, ease: Power1.easeOut });
  timeline.play();
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          {/* <Nav /> */}
          <Route
            render={({ location }) => {
              const { pathname, key } = location;
              return (
                <TransitionGroup component={null}>
                  <Transition
                    key={key}
                    appear={true}
                    onEnter={(node, appears) => play(pathname, node, appears)}
                    onExit={(node, appears) => exit(pathname, node)}
                    timeout={{ enter: 2000, exit: 1000 }}
                  >
                    <Switch location={location}>
                      {/* <Route exact path="/" component={Index} /> */}
                      <Route exact path="/" component={Home} />
                      {/* <Route path="/covid" component={Covid} /> */}
                      <Route exact path="/contact" component={Contact} />
                      <Route exact path="/services" component={Services} />
                      <Route exact path="/about" component={About} />
                      {/* 
                      <Route path="/who-we-are" component={WhoWeAre} />
                      <Route path="/what-we-do" component={WhatWeDo} />
                      <Route path="/why-we-do-it" component={WhyWeDoIt} />
                      <Route path="/meet-the-team" component={MeetTheTeam} />
                      <Route path="/hair" component={Hair} /> */}
                      {/* <Route path="/nails" component={Nails} /> */}
                      {/* <Route
                        path="/salon-experience"
                        component={SalonExperience}
                      />
                      <Route
                        path="/care-and-commitment"
                        component={CareAndCommitment}
                      /> */}
                      <Route exact path="/policies" component={Policies} />
                      <Route exact path="/blog" component={Blog} />
                      <Route path="/blog/:id" component={BlogPost} />
                      <Route path="/careers" component={Careers} />
                      {/* <Route path="/appointments" component={BookNow} /> */}
                      {/* <Route path="/contact" component={FooterWithNav} /> */}
                    </Switch>
                  </Transition>
                </TransitionGroup>
              );
            }}
          />
        </Router>
      </div>
    );
  }
}

export default hot(module)(App);
