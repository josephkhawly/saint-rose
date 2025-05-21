import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { TimelineMax as Timeline, Power1 } from "gsap";
import ScrollMagic from "scrollmagic";

import { TransitionGroup, CSSTransition } from "react-transition-group";
import Fade from "react-reveal/Fade";

import MediaQuery from "react-responsive";

import Nav from "./Nav";
import MobileNav from "./MobileNav";

import { MOBILEBP, DESKTOPTRANSITIONBP, DESKTOPBP } from "../constants";
import Footer from "./Footer";

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.controller = new ScrollMagic.Controller();
    this.getMediaChangeTimeline = this.getMediaChangeTimeline.bind(this);
    this.playMediaChange = this.playMediaChange.bind(this);

    this.state = {};
  }

  componentDidMount() {
    new ScrollMagic.Scene({
      triggerElement: ".content",
      offset: 50,
      triggerHook: "onLeave",
    })
      .setClassToggle(".nav-container", "scrolled")
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
  }

  render() {
    return (
      <div className="contact">
        <MediaQuery minWidth={DESKTOPTRANSITIONBP}>
          <Nav active={"contact"} />
        </MediaQuery>

        <MediaQuery maxWidth={MOBILEBP} onChange={this.playMediaChange}>
          <MobileNav expanded={false} />
        </MediaQuery>

        <div className="content-container">
          <div className="content">
            <Fade bottom delay={2000} distance="50px">
              <div className="sub-nav">Contact us</div>
            </Fade>
            <Fade bottom delay={2000} distance="50px">
              <div className="text-content">
                <h3>
                  Tucked away in the heart of one of Houston&rsquo;s most
                  eclectic and dynamic neighborhoods, Saint Rose was born out of
                  a dream to create one of the top beauty salons in Houston - a
                  space that is chic while also kind, warm, and inviting. Since
                  then, it has grown into something even better: the most
                  genuine and timeless luxury hair salon to hit Houston.
                </h3>
                <h3>
                  Within our walls you&rsquo;ll find haircuts that transform,
                  curly cuts that define, and more. From easy-going highlights
                  or dimensional low-lights to the boldest looks, it is our
                  delight to have you!
                </h3>

                <div className="location-contact-container">
                  <div className="location-and-hours-body">
                    <h4>Location & Hours</h4>

                    <div className="address">
                      <h5>1512 W Alabama St.</h5>
                      <h5>Houston, TX 77006</h5>
                    </div>

                    <div className="hours">
                      <h5>Tue-Fri 8:30AM-9PM</h5>
                      <h5>Sat 8:30AM-4PM</h5>
                    </div>

                    <div className="hours">
                      <h5>Closed Sundays & Mondays</h5>
                    </div>

                    <p>
                      Hours may vary based on client needs and stylist
                      availability.
                    </p>
                  </div>

                  <div className="contact-body">
                    <h4>Contact</h4>
                    <div className="address">
                      <h5>(346) 802-2183</h5>
                      <h5>info@hairbysaintrose.com</h5>
                    </div>
                  </div>
                </div>

                {/* <div className="section-hero-video-container">
                  <video autoPlay loop muted playsInline>
                    <source
                      src={
                        "https://videos.ctfassets.net/2f8bh3xz5t4r/3ltxO1rtvynBdWO47ALM0y/7d414ed1b9a7f7e6b4e1153668aa6fd4/salon-tour.mp4"
                      }
                      type="video/mp4"
                    />
                  </video>
                </div> */}

                <div className="gallery">
                  <div className="column">
                    <div className="gallery-title">Discover our space</div>
                    <div
                      className="column-image"
                      style={{
                        backgroundImage: `url(https://images.ctfassets.net/2f8bh3xz5t4r/6PgbL7Zc8JxqSvoDIfwDR4/f7b2d79308ca1a2178c9e7a7f18b2a6c/c_1_1.jpg)`,
                        aspectRatio: "0.8",
                      }}
                    />
                    <div
                      className="column-image"
                      style={{
                        backgroundImage: `url(https://images.ctfassets.net/2f8bh3xz5t4r/6lXTabiA3msvVfyx9GNFes/5d5dc3c3ed70ed01d9e06e5a486710aa/c_1_2.jpg)`,
                        aspectRatio: "0.61",
                      }}
                    />
                    <div className="column-image">
                      <video autoPlay muted playsInline loop>
                        <source
                          src="https://videos.ctfassets.net/2f8bh3xz5t4r/54xmu0jpxXcmEiGbXTxHe1/25eb5109ffff80260f6b64a7a17dfd2b/v-1.mp4"
                          type="video/mp4"
                        />
                      </video>
                    </div>
                    <div
                      className="column-image"
                      style={{
                        backgroundImage: `url(https://images.ctfassets.net/2f8bh3xz5t4r/3g3evUnBtw3ZlWgwZHUsWl/8e9280519ce994aa56319bea98192534/c_1_4.jpg)`,
                        aspectRatio: "0.8",
                      }}
                    />
                    <div
                      className="column-image"
                      style={{
                        backgroundImage: `url(https://images.ctfassets.net/2f8bh3xz5t4r/27HoTyNpYaQ0od9nzU3dWO/cc6f1505f986ea9a8f4e3af17169fb6a/c_1_5.jpg)`,
                        aspectRatio: "0.66",
                      }}
                    />
                  </div>

                  <div className="column">
                    <div
                      className="column-image"
                      style={{
                        backgroundImage: `url(https://images.ctfassets.net/2f8bh3xz5t4r/61m9c50ehouHJTOfmIPMxh/aef1750a615c2048177f2b188ce4ae9c/c_2_1.jpg)`,
                        aspectRatio: "0.66",
                      }}
                    />
                    <div
                      className="column-image"
                      style={{
                        backgroundImage: `url(https://images.ctfassets.net/2f8bh3xz5t4r/5VRT49vl9qtzWYHsOYNOsX/bd5eb0bd5aaa11b3c5eae71eeb4ecaff/c_2_2.jpg)`,
                        aspectRatio: "1.0",
                      }}
                    />
                    <div
                      className="column-image"
                      style={{
                        backgroundImage: `url(https://images.ctfassets.net/2f8bh3xz5t4r/3Epn6akY0LZmzMfwaYKJSp/6302772b17665acd5da08357a7ce8245/c_2_4.jpg)`,
                        aspectRatio: "0.66",
                      }}
                    />
                    <div
                      className="column-image"
                      style={{
                        backgroundImage: `url(https://images.ctfassets.net/2f8bh3xz5t4r/2OKA9h9y21WEBJAraobNRl/e9f9729d33b299eeaaedb6a2d52d6ed8/c_2_5.jpg)`,
                        aspectRatio: "0.66",
                      }}
                    />
                    <div className="column-image">
                      <video autoPlay muted playsInline loop>
                        <source
                          src="https://videos.ctfassets.net/2f8bh3xz5t4r/2ZlDuddqR0opcXdqJ93Zjf/dc6ad4ace3163c2c802f66fecd5f9979/v-2.mp4"
                          type="video/mp4"
                        />
                      </video>
                    </div>
                  </div>

                  <div className="column">
                    <div className="gallery-top-spacing"></div>
                    <div
                      className="column-image"
                      style={{
                        backgroundImage: `url(https://images.ctfassets.net/2f8bh3xz5t4r/4XntdFGKiZFtZ6HHeCzj9u/bf63aabfd450d9df4c9ce993a34ea86e/c_3_1.jpg)`,
                        aspectRatio: "0.66",
                      }}
                    />
                    <div
                      className="column-image"
                      style={{
                        backgroundImage: `url(https://images.ctfassets.net/2f8bh3xz5t4r/3nCrWqolePHVX5WbWk7zhA/08107b1de8a4f337c96eb1fe20589930/c_3_2.jpg)`,
                        aspectRatio: "0.75",
                      }}
                    />
                    {/* <div
                      className="column-image"
                      style={{
                        backgroundImage: `url(https://images.ctfassets.net/2f8bh3xz5t4r/6Tm0WNgkNkwytLehANJWIT/a05292ac357b60ad5b139fb2f76517ca/c_3_3.jpg)`,
                        aspectRatio: "1.0",
                      }}
                    /> */}
                    <div
                      className="column-image"
                      style={{
                        backgroundImage: `url(https://images.ctfassets.net/2f8bh3xz5t4r/5rIpYVFuQYX69sp0x5mock/60df469d2c929c25ed3813b108a8267e/c_3_4.jpg)`,
                        aspectRatio: "0.66",
                      }}
                    />
                    <div
                      className="column-image"
                      style={{
                        backgroundImage: `url(https://images.ctfassets.net/2f8bh3xz5t4r/7fcktTJ9iC6eQjF86Rd1GY/1ac5d4ba80b379d62c6732d4006bb641/c_3_5.jpg)`,
                        aspectRatio: "0.66",
                      }}
                    />
                    <div
                      className="column-image"
                      style={{
                        backgroundImage: `url(https://images.ctfassets.net/2f8bh3xz5t4r/5g2AjDUNqgMzo22L8oQ95X/ba0a35c5cb0edf39e0226b0c04dcd987/c_3_6.jpg)`,
                        aspectRatio: "0.66",
                      }}
                    />
                    {/* <div className="column-image">
                      <video autoPlay muted playsInline loop>
                        <source
                          src="https://videos.ctfassets.net/2f8bh3xz5t4r/11CKAnUnsMam2ert6HIiRQ/8841a7a10bfa58d33e906042d12ad1c4/v-3.mp4"
                          type="video/mp4"
                        />
                      </video>
                    </div> */}
                  </div>
                </div>
              </div>
            </Fade>
            <Footer />
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

export default Contact;
