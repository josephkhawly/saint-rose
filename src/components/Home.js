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
    })
    .call(playVideo);
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
  window.loadPromise
    .then(() => requestAnimationFrame(() => timeline.play()))
    .then(() => {
      const video = document.getElementById("vid");
      // const source = document.createElement("source");
      video.pause();

      // source.setAttribute(
      //   "src",
      //   "https://videos.ctfassets.net/2f8bh3xz5t4r/HGLVHZV0hbxojWPMLMaoO/07a3a8492fe65530eca64748ed85f9e1/2022-home-mid.mp4"
      // );
      // source.setAttribute("type", "video/mp4");
      // video.appendChild(source);
      // video.play();
    });
};

const playVideo = () => {
  const video = document.getElementById("vid");
  video.play();
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

class Home extends React.Component {
  constructor(props) {
    super(props);
    // this.controller = new ScrollMagic.Controller();
    // this.subNavController = new ScrollMagic.Controller();
  }

  componentDidMount() {
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

        <div className="content">
          <Fade bottom delay={4700} distance="50px">
            {/* <video id="vid" autoPlay loop muted playsinline> */}
            <video
              id="vid"
              // autoPlay="autoplay"
              loop
              muted
              playsInline
              poster="https://images.ctfassets.net/2f8bh3xz5t4r/1nqNweH34tHLuhi0XUJW7d/d6bbe4cb30ee0a179a743a51b687e697/home-poster.jpg"
            >
              {/* <video autoPlay controls> */}
              {/* <source
              src={`https://s3.amazonaws.com/com.superheavyco.dev/home.mp4`}
              type="video/mp4"
            /> */}
              <source
                src={`https://videos.ctfassets.net/2f8bh3xz5t4r/4H6qMtbjwzG7i9j5zccoL6/f1a986700dd3e4139e5f4f8f02c8f463/home.mp4`}
                type="video/mp4"
              />
            </video>
          </Fade>
          {/* <div className="video"></div> */}
        </div>
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

export default Home;
