import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { TimelineMax as Timeline, Power1 } from "gsap";
import ScrollMagic from "scrollmagic";
import "imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap";

import Fade from "react-reveal/Fade";

import MediaQuery from "react-responsive";

import Nav from "./Nav";
import MobileNav from "./MobileNav";

import { MOBILEBP, DESKTOPTRANSITIONBP, DESKTOPBP } from "../constants";
import Footer from "./Footer";

class WhatWeDo extends React.Component {
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
    var hairAndWaxingLinkTween = new Timeline().to(
      ".hair-and-waxing-link",
      1.0,
      {
        right: "2000px",
      }
    );

    var nailsLinkTween = new Timeline().to(".nails-link", 1.0, {
      right: "0px",
    });

    new ScrollMagic.Scene({
      triggerElement: ".trigger",
      offset: -150,
      duration: "4000",
    })
      .setTween(hairAndWaxingLinkTween)
      .addTo(this.controller);

    new ScrollMagic.Scene({
      triggerElement: ".trigger",
      offset: -125,
      duration: "4000",
    })
      .setTween(nailsLinkTween)
      .addTo(this.controller);
  }

  loadMobile() {
    var hairAndWaxingLinkTween = new Timeline().to(
      ".hair-and-waxing-link",
      1.0,
      {
        right: "2000px",
      }
    );

    var nailsLinkTween = new Timeline().to(".nails-link", 1.0, {
      right: "-600px",
    });

    new ScrollMagic.Scene({
      triggerElement: ".content",
      offset: 0,
      duration: "4000",
    })
      .setTween(hairAndWaxingLinkTween)
      .addTo(this.controller);

    new ScrollMagic.Scene({
      triggerElement: ".content",
      offset: 0,
      duration: "4000",
    })
      .setTween(nailsLinkTween)
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

    if (window.innerWidth >= DESKTOPTRANSITIONBP) {
      this.loadDesktop();
    } else {
      this.loadMobile();
    }

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
      <div className="what-we-do">
        <MediaQuery minWidth={DESKTOPTRANSITIONBP}>
          <Nav active={"what-we-do"} />
        </MediaQuery>

        <MediaQuery maxWidth={MOBILEBP} onChange={this.playMediaChange}>
          <MobileNav expanded={false} />
        </MediaQuery>

        <div className="content-container">
          <div className="content">
            <div className="landing">
              <MediaQuery minWidth={DESKTOPTRANSITIONBP}>
                <Fade delay={2000} distance="50px">
                  <div className="left">
                    <div
                      className="landing-image"
                      style={{
                        backgroundImage: `url("/images/what-we-do-landing.jpg")`,
                      }}
                    />
                    {/* <video id="who-we-are-vid" autoPlay loop muted playsInline>
                    <source
                      src={
                        "https://www.dropbox.com/s/r6ypsvjvr1179wd/Who%20We%20Are_Landing.mp4?raw=1"
                      }
                      type="video/mp4"
                    />
                  </video> */}
                  </div>
                </Fade>

                <div className="right">
                  <div className="right--content">
                    <Fade bottom delay={2000} distance="50px">
                      <h5>What we do</h5>
                    </Fade>

                    <Fade bottom delay={2250} distance="50px">
                      <h3>
                        All you wanted was the world, right? We&apos;ve got you
                        covered.
                      </h3>
                    </Fade>
                  </div>
                </div>
              </MediaQuery>

              <MediaQuery maxWidth={MOBILEBP}>
                <div className="right">
                  <div className="right--content">
                    <Fade bottom delay={2000} distance="50px">
                      <h5>What we do</h5>
                    </Fade>

                    <Fade bottom delay={2250} distance="50px">
                      <h3>
                        All you wanted was the world, right? We&apos;ve got you
                        covered.
                      </h3>
                    </Fade>
                  </div>
                </div>

                <Fade delay={2500} distance="50px">
                  <div className="left">
                    <div
                      className="landing-image"
                      style={{
                        backgroundImage: `url("/images/what-we-do-landing.jpg")`,
                      }}
                    />
                    {/* <video id="who-we-are-vid" autoPlay loop muted playsInline>
                    <source
                      src={
                        "https://www.dropbox.com/s/r6ypsvjvr1179wd/Who%20We%20Are_Landing.mp4?raw=1"
                      }
                      type="video/mp4"
                    />
                  </video> */}
                  </div>
                </Fade>
              </MediaQuery>
            </div>

            <div className="trigger" />
            <Fade delay={2000}>
              {/* <Fade bottom delay={2500} distance="50px"> */}
              <div className="about-nav">
                <div className="about-nav--link-container">
                  <div className="hair-and-waxing-link">
                    <Link to={`/hair`}>
                      Hair &amp; treatments &bull; Hair &amp; treatments &bull;
                      &bull; Hair &amp; treatments &bull; Hair &amp; treatments
                      &bull; Hair &amp; treatments &bull; Hair
                    </Link>
                  </div>
                </div>
                {/* <div className="about-nav--link-container">
                  <div className="nails-link">
                    <Link to={`/nails`}>
                      Nails &bull; Nails &bull; Nails &bull; Nails &bull; Nails
                      &bull; Nails &bull; Nails &bull; Nails &bull; Nails
                    </Link>
                  </div>
                </div> */}
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

export default WhatWeDo;
