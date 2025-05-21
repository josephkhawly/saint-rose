import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { TimelineMax as Timeline, Expo } from "gsap";
import ScrollMagic from "scrollmagic";

import Iframe from "react-iframe";

import Fade from "react-reveal/Fade";

// import { Tween, Timeline } from "react-gsap";
// import { Controller, Scene } from "react-scrollmagic";

import MediaQuery from "react-responsive";

import Nav from "./Nav";
import MobileNav from "./MobileNav";

import { MOBILEBP, DESKTOPTRANSITIONBP, DESKTOPBP } from "../constants";
import Footer from "./Footer";
import classnames from "classnames";

class FooterWithNav extends React.Component {
  constructor(props) {
    super(props);
    this.controller = new ScrollMagic.Controller();
    this.getMediaChangeTimeline = this.getMediaChangeTimeline.bind(this);
    this.playMediaChange = this.playMediaChange.bind(this);
  }

  componentDidMount() {
    new ScrollMagic.Scene({
      triggerElement: ".content",
      offset: 100,
      triggerHook: "onLeave"
    })
      .setClassToggle(".nav-container", "scrolled")
      .addTo(this.controller);
  }

  getMediaChangeTimeline() {
    const timeline = new Timeline({ paused: true });
    const nav = document.querySelector(".nav-container");

    timeline.to(nav, 0.7, {
      opacity: 1,
      delay: 0.25
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
      triggerHook: "onLeave"
    })
      .setClassToggle(".nav-container", "scrolled")
      .addTo(this.controller);
  }

  render() {
    return (
      <div className="footer-with-nav">
        <MediaQuery minWidth={DESKTOPTRANSITIONBP}>
          <Nav active={"footer"} />
        </MediaQuery>

        <MediaQuery maxWidth={MOBILEBP} onChange={this.playMediaChange}>
          <MobileNav expanded={false} />
        </MediaQuery>

        <div className="content-container">
          {/* <div className="spacer" style={{ height: "800px" }} /> */}
          <div className="content">
            <Fade bottom distance="50px" delay={3000}>
              <Footer />
            </Fade>
          </div>
        </div>
        <div className="entrance" />
        <div className="exit" />
        <div className="exit-2" />
      </div>
    );
  }
}

export default FooterWithNav;
