import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  TransitionGroup,
  CSSTransition,
  Transition,
} from "react-transition-group";

import { TimelineMax as Timeline, Power1 } from "gsap";
import ScrollMagic from "scrollmagic";
import "imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap";

import Fade from "react-reveal/Fade";
import MediaQuery from "react-responsive";

import Nav from "./Nav";
import MobileNav from "./MobileNav";

import { Fade as Slideshow } from "react-slideshow-image";

import Footer from "./Footer";

import { MOBILEBP, DESKTOPTRANSITIONBP, DESKTOPBP } from "../constants";

const getDefaultTimeline = () => {
  const timeline = new Timeline({ paused: true });
  // console.log("node: ", node);
  // console.log("node probe: ", node.parentNode);
  const introRose = document.querySelector(".intro-rose");
  const intro = document.querySelector(".intro");
  const intro2 = document.querySelector(".intro-2");
  const nav = document.querySelector(".nav-container");
  const content = document.querySelector(".content");

  // const nav = node.parentNode.querySelector(".nav");

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
    .to(introRose, 1, {
      opacity: 1,
      delay: 1,
    })
    // .to(intro, 2, {
    //   // opacity: 1,
    //   top: "0",
    //   delay: 2,
    //   delay: -1
    // })
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
    .to(intro2, 0.7, {
      // y: "100%",
      right: "0",
      delay: 0.25,
      ease: Power1.easeInOut,
      // display: "block"
    })
    .to(nav, 0.7, {
      opacity: 1,
      delay: 0.25,
    });

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

const play = () => {
  // const delay = appears ? 0 : 1;
  let timeline;

  // console.log("pathname:", pathname);

  timeline = getDefaultTimeline();
  window.loadPromise.then(() => requestAnimationFrame(() => timeline.play()));
};

const getMediaChangeTimeline = () => {
  const timeline = new Timeline({ paused: true });
  const nav = document.querySelector(".nav-container");

  timeline.to(nav, 0.7, {
    opacity: 1,
    delay: 0.25,
  });

  return timeline;
};

const playMediaChange = () => {
  let timeline;
  timeline = getMediaChangeTimeline();
  window.loadPromise.then(() => requestAnimationFrame(() => timeline.play()));
};

const exit = (node) => {
  const timeline = new Timeline({ paused: true });
  const exit = node.querySelector(".exit");
  // const exitTwo = node.querySelector(".exit-2");

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
    });

  // timeline.to(content, 3.15, { autoAlpha: 0, ease: Power1.easeOut });
  timeline.play();
};

class HomeCovid extends React.Component {
  constructor(props) {
    super(props);
    // this.controller = new ScrollMagic.Controller();
    // this.subNavController = new ScrollMagic.Controller();
  }

  componentDidMount() {
    // window.scrollTo(0, 0);
    play();

    // setTimeout(function() {
    //   console.log("play started");
    //   document.getElementById("vid").play();
    // }, 5800);

    // var tween = new Timeline().fromTo(
    //   ".fade",
    //   1.0,
    //   { y: 50, visibility: "hidden", opacity: 0 },
    //   { y: 0, visibility: "visible", opacity: 1, delay: 2 }
    // );

    // .to(".fade", 2.5, { y: 250, visibility: "visible", opacity: 0 })
    // .to(".fade", 2.5, { y: 0, visibility: "visible", opacity: 1, delay: 2 });

    // new ScrollMagic.Scene({
    //   triggerElement: ".loader",
    //   reverse: false
    // })
    //   .setTween(tween)
    //   .addTo(this.controller);

    // var navTween = new Timeline().fromTo(
    //   ".nav",
    //   1.0,
    //   { visibility: "hidden", opacity: 0, immediateRender: false },
    //   { visibility: "visible", opacity: 1, delay: 2, immediateRender: false }
    //   // { opacity: 0, immediateRender: false },
    //   // { opacity: 1, delay: 2, immediateRender: false }
    //   // { y: 50, visibility: "hidden", opacity: 0 },
    //   // { y: 0, visibility: "visible", opacity: 1, delay: 2 }
    // );

    // new ScrollMagic.Scene({
    //   triggerElement: ".nav", // y value not modified, so we can use element as trigger as well
    //   // offset: 150, // start a little later
    //   // triggerHook: 0.9,
    //   reverse: false
    // })
    //   .setTween(navTween)
    //   .addTo(this.controller);

    // var revealElements = document.getElementsByClassName("fade");
    // for (var i = 0; i < revealElements.length; i++) {
    //   // create a scene for each element
    //   var tween = new Timeline().fromTo(
    //     revealElements[i],
    //     1.0,
    //     // { opacity: 0, immediateRender: false },
    //     // { opacity: 1, delay: 2, immediateRender: false }
    //     { y: 50, visibility: "hidden", opacity: 0, immediateRender: false },
    //     {
    //       y: 0,
    //       visibility: "visible",
    //       opacity: 1,
    //       delay: 2,
    //       immediateRender: false
    //     }
    //   );

    //   console.log("element: ", revealElements[i]);
    //   new ScrollMagic.Scene({
    //     triggerElement: revealElements[i], // y value not modified, so we can use element as trigger as well
    //     offset: 150, // start a little later
    //     // triggerHook: 0.9,
    //     reverse: false
    //   })
    //     .setTween(tween)
    //     .addTo(this.controller);
    // }

    // new ScrollMagic.Scene({
    //   triggerElement: ".content",
    //   offset: 50,
    //   triggerHook: "onLeave"
    // })
    //   .setClassToggle(".nav-container", "scrolled")
    //   .addTo(this.controller);

    // var ourTeamLinkTween = new Timeline().to(
    //   ".our-team-link",
    //   1.0,
    //   { right: "2000px" }
    //   // { opacity: 0, immediateRender: false },
    //   // { opacity: 1, delay: 2, immediateRender: false }
    //   // { y: 50, visibility: "hidden", opacity: 0 },
    //   // { y: 0, visibility: "visible", opacity: 1, delay: 2 }
    // );

    // var salonExperienceLinkTween = new Timeline().to(
    //   ".salon-experience-link",
    //   1.0,
    //   { right: "0px" }
    // );

    // new ScrollMagic.Scene({
    //   triggerElement: ".trigger", // y value not modified, so we can use element as trigger as well
    //   offset: -150, // start a little later
    //   // duration: 500
    //   duration: "2000"
    //   // triggerHook: "onEnter"
    //   // triggerHook: 0.9,
    // })
    //   // .setTween(".our-team-link", 1, {
    //   //   right: window.innerWidth
    //   // })
    //   .setTween(ourTeamLinkTween)
    //   .addTo(this.controller);

    // new ScrollMagic.Scene({
    //   triggerElement: ".trigger", // y value not modified, so we can use element as trigger as well
    //   offset: -125, // start a little later
    //   // duration: "100%"
    //   duration: "2000"
    //   // triggerHook: "onEnter"
    //   // triggerHook: 0.9,
    // })
    //   .setTween(salonExperienceLinkTween)
    //   .addTo(this.controller);
  }

  render() {
    return (
      <div className="home">
        <div className="entrance" />

        <div className="intro" />
        <div className="intro-2" />
        <div className="intro-rose" />

        <MediaQuery minWidth={DESKTOPTRANSITIONBP}>
          <Nav active={"home"} />
        </MediaQuery>

        <MediaQuery maxWidth={MOBILEBP} onChange={playMediaChange}>
          <MobileNav expanded={false} />
        </MediaQuery>

        {/* <MediaQuery minWidth={DESKTOPTRANSITIONBP}> */}
        <Fade bottom delay={3800} distance="0px">
          <div className="content">
            <Fade bottom delay={4000} distance="50px">
              <div className="slide-container">
                <Slideshow
                  duration={2500}
                  transitionDuration={1000}
                  arrows={false}
                  defaultIndex={3}
                >
                  <div
                    className="image-container"
                    style={{
                      backgroundImage: `url("https://images.ctfassets.net/2f8bh3xz5t4r/482jgNsOdYwrF3tcTksANl/62d5b6562b4fa44fd3bce76d46cc0b88/C1.jpg")`,
                    }}
                  />

                  <div
                    className="image-container"
                    style={{
                      backgroundImage: `url("https://images.ctfassets.net/2f8bh3xz5t4r/3okC7fgTnxptAvgXWg0qyy/a1a5571fb2efed48aa3d6eb725a792ee/C2.jpg")`,
                    }}
                  />

                  <div
                    className="image-container"
                    style={{
                      backgroundImage: `url("https://images.ctfassets.net/2f8bh3xz5t4r/4hpCXvlp9ou7FzfGtxYv2O/1ef0b6d3015b92ffd0b249b709f161ea/C3.jpg")`,
                    }}
                  />

                  <div
                    className="image-container"
                    style={{
                      backgroundImage: `url("https://images.ctfassets.net/2f8bh3xz5t4r/58r3p29vKZHi22k5u0rBOz/c3bcd6370187e73b036497bb3f8e9798/C4.jpg")`,
                    }}
                  />
                </Slideshow>
              </div>

              {/* <div
                className="section-hero-image"
                style={{
                  backgroundImage: `url("https://images.ctfassets.net/2f8bh3xz5t4r/jfgPKv3N7tSXxUHQ0HWTG/aa07a01d61ae599f6fe1ed08400fff5d/IMG_1703.jpg")`,
                }}
              >
                <div className="home-alt-logo"></div>
              </div> */}

              <div className="text-content">
                <h3>We&rsquo;re back!</h3>
                <div className="body">
                  {/* <h4>Temporary closure</h4> */}
                  <p>
                    To our Saint Rose family: we’re excited to reopen our doors
                    and welcome you back to our space! We have been very busy
                    preparing not only one, but TWO LOCATIONS to serve all of
                    our wonderful guests. With two locations only 1.5 miles
                    apart, we will be able to spread our staff out in a way that
                    will follow the new guidelines of social distancing. This
                    will allow us to see the many missed appointments and also
                    the many of you who are requesting to get in.
                  </p>
                  <p>
                    Saint Rose’s current locations are:
                    <br />
                    2516 Sunset Blvd.
                    <br />
                    1512 W Alabama St.
                  </p>
                </div>

                <div className="body">
                  <h4>COVID-19 UPDATED GUIDELINES</h4>
                  <p>
                    We have guidelines set up for your protection, and for ours.
                    Check out our new guidelines and let us know if you have any
                    questions.
                  </p>
                  <Link to={`/covid`}>
                    <button>read guidelines</button>
                  </Link>
                </div>
              </div>
            </Fade>
            <Footer />
          </div>
        </Fade>
        {/* </MediaQuery> */}

        {/* <MediaQuery maxWidth={MOBILEBP}>
          <Fade bottom delay={3800} distance="0px">
            <div className="content">
              <Fade bottom delay={4000} distance="50px">
                <div
                  className="section-hero-image"
                  style={{
                    backgroundImage: `url("https://images.ctfassets.net/2f8bh3xz5t4r/jfgPKv3N7tSXxUHQ0HWTG/aa07a01d61ae599f6fe1ed08400fff5d/IMG_1703.jpg")`,
                  }}
                >
                  <div className="home-alt-logo"></div>
                </div>

                <div className="sub-nav">Update</div>

                <div className="text-content">
                  <h3>Transparency during Covid 19.</h3>
                  <div className="body">
                    <h4>Temporary closure</h4>
                    <p>
                      We’d like to inform all our guests that Saint Rose will be
                      closed until the government establishes it is safe for us
                      to reopen. As of now, the Federal Government has extended
                      the closure until April 30th, setting May 1st as our
                      potential return date. Our highest priority is to protect
                      the well-being of our staff and guests during this time.
                      It is in our hope that, by following the stay at home
                      guidelines, we will be able to contain the spread of
                      COVID-19 and get back to work sooner rather than later.
                    </p>
                    <p>
                      Please note: All clients will be contacted to take care of
                      moving their existing appointments closer to April 30th.
                      We will not make or move any existing appointments until
                      there is a clearer picture of when we can get back to
                      work.
                    </p>
                    <p>
                      If you wish to book on or after May 1st, or have any
                      questions, please contact info@hairbysaintrose.com
                    </p>
                  </div>
                  <div className="body">
                    <h4>Gratitude</h4>
                    <p>
                      We value and appreciate all of our wonderful guests and
                      want to thank them for their continued support and
                      understanding during this time. Many of you have asked
                      about ways to support our business and our amazing group
                      of hairstylists. We’ve set up different options for you.
                      Follow the link below to explore the ways in which you can
                      help!
                    </p>
                    <Link to={`/how-to-help`}>
                      <button>How to help</button>
                    </Link>
                  </div>
                </div>
              </Fade>
              <Footer />
            </div>
          </Fade>
        </MediaQuery> */}

        <div className="exit" />
        <div className="exit-2" />
      </div>
    );
  }
}

// function WhoWeAre({ match }) {
//   return (
//     <div className="who-we-are">
//       {/* <Route path={`${match.path}/:id`} component={AboutTwo} /> */}
//       <Route path={`${match.path}/meet-the-team`} component={MeetTheTeam} />

//       <Route
//         exact
//         path={match.path}
//         render={() => (
//           <div>
//             <div className="spacer" style={{ height: "1500px" }} />
//             <div className="content">
//               <Controller>
//                 <Scene
//                   // duration={100}
//                   offset={50}
//                   reverse={false}
//                   // triggerElement=".loader"
//                 >
//                   <Tween
//                     duration={15}
//                     staggerFrom={{ y: 50, visibility: "hidden", opacity: 0 }}
//                     staggerTo={{ y: 0, visibility: "visible", opacity: 1 }}
//                     stagger={1}
//                     onStartAll={() => {
//                       console.log("starting");
//                     }}
//                     onCompleteAll={() => {
//                       console.log("complete");
//                     }}
//                   >
//                     <div className="loader" />
//                     <h3>Who we are</h3>

//                     <h5 style={{ height: "2000px" }}>
//                       We are dedicated to each other, our craft, and you.
//                     </h5>
//                     <div>
//                       <h3>hello</h3>
//                     </div>
//                     <div>
//                       <h5 style={{ height: "2000px" }}>
//                         We are dedicated to each other, our craft, and you.
//                       </h5>
//                     </div>
//                   </Tween>
//                 </Scene>
//               </Controller>

//               <div id="trigger" />
//               <div className="about-nav">
//                 <div id="test">
//                   <Controller>
//                     <Scene duration={500} triggerElement="#test">
//                       {progress => (
//                         <Tween
//                           to={{
//                             left: "-50%"
//                           }}
//                           totalProgress={progress}
//                           paused
//                         >
//                           <div className="our-team">
//                             <Link to={`${match.url}/meet-the-team`}>
//                               Meet the team
//                             </Link>
//                           </div>
//                         </Tween>
//                       )}
//                     </Scene>
//                   </Controller>
//                 </div>
//                 <div id="test2">
//                   <Controller>
//                     <Scene duration={500} triggerElement="#test2">
//                       {progress => (
//                         <Tween
//                           to={{
//                             left: "100%"
//                           }}
//                           totalProgress={progress}
//                           paused
//                         >
//                           <div className="salon-experience">
//                             <Link to={`${match.url}/the-salon-experience`}>
//                               The salon experience
//                             </Link>
//                           </div>
//                         </Tween>
//                       )}
//                     </Scene>
//                   </Controller>
//                 </div>
//               </div>

//               <h5 style={{ height: "2000px" }}>Footer.</h5>

//               {/* <ul>
//               <li>
//                 <Link to={`${match.url}/meet-the-team`}>Meet the team</Link>
//               </li>
//               <li>
//                 <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
//               </li>
//             </ul> */}
//             </div>

//             <div className="entrance" />
//             <div className="exit" />
//           </div>
//         )}
//       />
//     </div>
//   );
// }

export default HomeCovid;
