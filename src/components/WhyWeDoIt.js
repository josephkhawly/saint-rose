import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { TimelineMax as Timeline, Power1 } from "gsap";
import ScrollMagic from "scrollmagic";
import "imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap";

import Fade from "react-reveal/Fade";

// import { Tween, Timeline } from "react-gsap";
// import { Controller, Scene } from "react-scrollmagic";

import MediaQuery from "react-responsive";

import Nav from "./Nav";
import MobileNav from "./MobileNav";

import { MOBILEBP, DESKTOPTRANSITIONBP, DESKTOPBP } from "../constants";
import Footer from "./Footer";

class WhyWeDoIt extends React.Component {
  constructor(props) {
    super(props);
    this.controller = new ScrollMagic.Controller();
    this.getMediaChangeTimeline = this.getMediaChangeTimeline.bind(this);
    this.playMediaChange = this.playMediaChange.bind(this);
    this.loadDesktop = this.loadDesktop.bind(this);
    this.loadMobile = this.loadMobile.bind(this);
  }

  componentDidMount() {
    new ScrollMagic.Scene({
      triggerElement: ".content",
      offset: 50,
      triggerHook: "onLeave",
    })
      .setClassToggle(".nav-container", "scrolled")
      .addTo(this.controller);

    if (window.innerWidth >= DESKTOPBP) {
      this.loadDesktop();
    } else {
      this.loadMobile();
    }
  }

  loadDesktop() {
    var careAndCommitmentLinkTween = new Timeline().to(
      ".care-and-commitment-link",
      1.0,
      {
        right: "2000px",
      }
    );

    var policiesLinkTween = new Timeline().to(".policies-link", 1.0, {
      right: "0px",
    });

    new ScrollMagic.Scene({
      triggerElement: ".trigger",
      offset: -150,
      duration: "4000",
    })
      .setTween(careAndCommitmentLinkTween)
      .addTo(this.controller);

    new ScrollMagic.Scene({
      triggerElement: ".trigger",
      offset: -125,
      duration: "4000",
    })
      .setTween(policiesLinkTween)
      .addTo(this.controller);
  }

  loadMobile() {
    var careAndCommitmentLinkTween = new Timeline().to(
      ".care-and-commitment-link",
      1.0,
      {
        right: "2000px",
      }
    );

    var policiesLinkTween = new Timeline().to(".policies-link", 1.0, {
      right: "-600px",
    });

    new ScrollMagic.Scene({
      triggerElement: ".content",
      offset: 0,
      duration: "4000",
    })
      .setTween(careAndCommitmentLinkTween)
      .addTo(this.controller);

    new ScrollMagic.Scene({
      triggerElement: ".content",
      offset: 0,
      duration: "4000",
    })
      .setTween(policiesLinkTween)
      .addTo(this.controller);
  }

  getMediaChangeTimeline() {
    const timeline = new Timeline({ paused: true });
    const nav = document.querySelector(".nav-container");

    timeline.to(nav, 0.7, {
      opacity: 1,
      delay: 0.25,
    });

    return timeline;
  }

  playMediaChange() {
    this.controller.destroy(true);

    this.controller = new ScrollMagic.Controller();

    let timeline;
    timeline = this.getMediaChangeTimeline();
    window.loadPromise.then(() => requestAnimationFrame(() => timeline.play()));

    new ScrollMagic.Scene({
      triggerElement: ".content",
      offset: 50,
      triggerHook: "onLeave",
    })
      .setClassToggle(".nav-container", "scrolled")
      .addTo(this.controller);

    setTimeout(() => {
      if (window.innerWidth >= DESKTOPTRANSITIONBP) {
        this.loadDesktop();
      } else {
        this.loadMobile();
      }
    }, 0);
  }

  render() {
    return (
      <div className="why-we-do-it">
        <MediaQuery minWidth={DESKTOPTRANSITIONBP}>
          <Nav active={"why-we-do-it"} />
        </MediaQuery>

        <MediaQuery maxWidth={MOBILEBP} onChange={this.playMediaChange}>
          <MobileNav expanded={false} />
        </MediaQuery>

        <div className="content-container">
          <div className="content">
            <MediaQuery minWidth={DESKTOPTRANSITIONBP}>
              <div className="landing">
                <Fade delay={2000} distance="50px">
                  <div className="left">
                    <div
                      className="landing-image"
                      style={{
                        backgroundImage: `url("https://images.ctfassets.net/2f8bh3xz5t4r/2jCOf0oztbhOJ2QJQc4AOD/cd7df32d9e4fc13f714affa121fbe84f/why_we_do_it.jpg")`,
                      }}
                    />
                  </div>
                </Fade>

                <div className="right">
                  <div className="right--content">
                    <Fade bottom delay={2000} distance="50px">
                      <h5>Why we do it</h5>
                    </Fade>

                    <Fade bottom delay={2250} distance="50px">
                      <h3>
                        We do it because we care, and we believe in what we do.
                        Every team member and guest is are unique, we pay
                        attention to both.
                      </h3>
                    </Fade>
                  </div>
                </div>
              </div>
              <div className="trigger" />

              <Fade delay={2000}>
                {/* <Fade bottom delay={2500} distance="50px"> */}
                <div className="about-nav">
                  <div className="about-nav--link-container">
                    <div className="care-and-commitment-link">
                      <Link to={`/care-and-commitment`}>
                        Care &amp; commitment &bull; Care &amp; commitment
                        &bull; Care &amp; commitment &bull; Care &amp;
                        commitment &bull; Care &amp; commitment &bull; Care
                        &amp; commitment &bull;
                      </Link>
                    </div>
                  </div>
                  <div className="about-nav--link-container">
                    <div className="policies-link">
                      <Link to={`/policies`}>
                        Policies &bull; Policies &bull; Policies &bull; Policies
                        &bull; Policies &bull; Policies &bull; Policies &bull;
                        Policies &bull; Policies &bull; Policies &bull;
                      </Link>
                    </div>
                  </div>
                </div>
              </Fade>
            </MediaQuery>

            <MediaQuery maxWidth={MOBILEBP}>
              <div className="landing">
                <Fade bottom delay={2000} distance="50px">
                  <h5>Why we do it</h5>
                </Fade>

                <Fade bottom delay={2250} distance="50px">
                  <h3>
                    We do it because we care, and we believe in what we do.
                    Every team member and guest is are unique, we pay attention
                    to both.
                  </h3>
                </Fade>
              </div>

              <Fade bottom delay={2500} distance="50px">
                <div>
                  <div
                    className="landing-image"
                    style={{
                      backgroundImage: `url("https://images.ctfassets.net/2f8bh3xz5t4r/79jPYcJDpR8XLo3fFL451/b025748a4833196cdfd3ebdba7e75ad3/why-we-do-it-landing.jpg")`,
                    }}
                  />

                  <div className="trigger" />
                  {/* <Fade bottom delay={2500} distance="50px"> */}
                  <div className="about-nav">
                    <div className="about-nav--link-container">
                      <div className="care-and-commitment-link">
                        <Link to={`/care-and-commitment`}>
                          Care &amp; commitment &bull; Care &amp; commitment
                          &bull; Care &amp; commitment &bull; Care &amp;
                          commitment &bull; Care &amp; commitment &bull; Care
                          &amp; commitment &bull;
                        </Link>
                      </div>
                    </div>
                    <div className="about-nav--link-container">
                      <div className="policies-link">
                        <Link to={`/policies`}>
                          Policies &bull; Policies &bull; Policies &bull;
                          Policies &bull; Policies &bull; Policies &bull;
                          Policies &bull; Policies &bull; Policies &bull;
                          Policies &bull;
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Fade>
            </MediaQuery>

            <Footer />

            {/* <div id="trigger" />
                <div className="about-nav">
                  <div id="test">
                    <Controller>
                      <Scene duration={500} triggerElement="#test">
                        {progress => (
                          <Tween
                            to={{
                              left: "-50%"
                            }}
                            totalProgress={progress}
                            paused
                          >
                            <div className="our-team">
                              <Link to={`${match.url}/meet-the-team`}>
                                Meet the team
                              </Link>
                            </div>
                          </Tween>
                        )}
                      </Scene>
                    </Controller>
                  </div>
                  <div id="test2">
                    <Controller>
                      <Scene duration={500} triggerElement="#test2">
                        {progress => (
                          <Tween
                            to={{
                              left: "100%"
                            }}
                            totalProgress={progress}
                            paused
                          >
                            <div className="salon-experience">
                              <Link to={`${match.url}/the-salon-experience`}>
                                The salon experience
                              </Link>
                            </div>
                          </Tween>
                        )}
                      </Scene>
                    </Controller>
                  </div>
                </div> */}

            {/* <ul>
                <li>
                  <Link to={`${match.url}/meet-the-team`}>Meet the team</Link>
                </li>
                <li>
                  <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
                </li>
              </ul> */}
          </div>
        </div>
        <div className="entrance" />
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

export default WhyWeDoIt;
