import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { TimelineMax as Timeline, Expo } from "gsap";
import ScrollMagic from "scrollmagic";
import "imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap";
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

class Nails extends React.Component {
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
      triggerHook: "onLeave",
    })
      .setClassToggle(".nav-container", "scrolled")
      .addTo(this.controller);

    var instagramLinkTween = new Timeline().to(
      ".instagram-link",
      1.0,
      { right: "2000px" }
      // { opacity: 0, immediateRender: false },
      // { opacity: 1, delay: 2, immediateRender: false }
      // { y: 50, visibility: "hidden", opacity: 0 },
      // { y: 0, visibility: "visible", opacity: 1, delay: 2 }
    );

    new ScrollMagic.Scene({
      triggerElement: ".scroll-nav--link-container", // y value not modified, so we can use element as trigger as well
      offset: -550, // start a little earlier
      // duration: 500
      duration: "4000",
      // triggerHook: "onEnter"
      // triggerHook: 0.9,
    })
      // .setTween(".our-team-link", 1, {
      //   right: window.innerWidth
      // })
      .setTween(instagramLinkTween)
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

  renderPricingRow(title, value) {
    return (
      <li key={title}>
        <div className="pricing-wrapper">
          <span className="title">{title}</span>
          <span className="price">{value}</span>
        </div>
      </li>
    );
  }

  renderPricingRowMobile(title, value) {
    return (
      <li key={title}>
        <div className="pricing-wrapper">
          <span className="title">{title}</span>
          <span className="price">{value}</span>
        </div>
      </li>
    );
  }

  nailsData() {
    return [
      { title: "Gel Manicure: One Hour & Thirty Minutes", price: "$130" },
      { title: "Gel Manicure with Nail Art: Two Hours ", price: "$130" },
      { title: "Hard Gel Overlay: One Hour & Thirty Minutes", price: "$130+" },
      { title: "Hard Gel Overlay with Nail Art: Two Hours", price: "$130+" },
      { title: "Nail Art Starting at ", price: "$10" },
      { title: "Gel Removal: 15 Minutes", price: "$10" },
      { title: "Hard Gel Removal: 30 Minutes", price: "$20" },
      { title: "Acrylic/Dip Powder Removal: 30 Minutes", price: "$15" },
      { title: "IBX: 15 Minutes", price: "$30" },
    ];
  }

  render() {
    return (
      <div className="nails">
        <MediaQuery minWidth={DESKTOPTRANSITIONBP}>
          <Nav active={"what-we-do"} />
        </MediaQuery>

        <MediaQuery maxWidth={MOBILEBP} onChange={this.playMediaChange}>
          <MobileNav expanded={false} />
        </MediaQuery>

        <div className="content-container">
          {/* <div className="spacer" style={{ height: "800px" }} /> */}
          <div className="content">
            <div className="landing">
              <Fade delay={2000}>
                <div className="sub-nav">
                  What we do &gt; <span>Nails</span>
                </div>
                <h3>
                  Nails are anything but an afterthought here. This is
                  definitely a trend you should get behind.
                </h3>
              </Fade>
            </div>

            <Fade bottom distance="50px" delay={3000}>
              <div
                className="section-hero-image"
                style={{
                  backgroundImage: `url("/images/nails-hero.jpg")`,
                }}
              />
            </Fade>

            <div className="section-text">
              <div className="text-container">
                <Fade bottom distance="50px">
                  <div className="left">
                    Jenya has been a nail artist for over a decade and loves
                    doing it - she&apos;s our secret weapon. Book your spot
                    today and get ready to get major compliments.
                  </div>
                </Fade>
              </div>
              <Fade bottom delay={250} distance="50px">
                <div className="text-container">
                  <div className="right">
                    <p>
                      Jenya has attended advanced training courses and studied
                      under numerous nail artists from Europe to Asia. Before
                      moving to Houston, Jenya led a boutique nail studio in
                      Russia that specialized in original designs and free-hand
                      painted nail art. Her obsession with details and
                      cleanliness is something she&apos;s known for by the
                      people she works with, and she is constantly learning new
                      styles and improving her techniques.
                    </p>
                  </div>
                </div>
              </Fade>
            </div>

            <div className={classnames("section-text", "pricing")}>
              <div className="text-container">
                <Fade bottom distance="50px">
                  <div className="left">
                    <h3>Pricing</h3>
                    <p>
                      *If you do not see the service listed that you would like
                      to book, please text or call (832) 539-3808 for pricing*
                    </p>
                    <p>
                      Our goal is to provide a unique and elevated customer
                      experience. Please let us know if there is anything we can
                      do make your visit more enjoyable.
                    </p>
                  </div>
                </Fade>
              </div>
              <Fade bottom delay={250} distance="50px">
                <div className="text-container">
                  <div className="right">
                    <div className="pricing-table">
                      <ul>
                        <MediaQuery minWidth={DESKTOPTRANSITIONBP}>
                          {this.nailsData().map((rowData) => {
                            return this.renderPricingRow(
                              rowData.title,
                              rowData.price
                            );
                          })}
                        </MediaQuery>

                        <MediaQuery
                          maxWidth={MOBILEBP}
                          onChange={this.playMediaChange}
                        >
                          {this.nailsData().map((rowData) => {
                            return this.renderPricingRowMobile(
                              rowData.title,
                              rowData.price
                            );
                          })}
                        </MediaQuery>
                      </ul>
                    </div>
                  </div>
                </div>
              </Fade>
            </div>

            {/* <div className="section-text">
              <div className="text-container">
                <div className="left">
                  <div className="pricing-intro">
                    <h3>Pricing</h3>
                    <p>
                      *If you do not see the service listed that you would like
                      to book, please call us at (346) 802-2183 for pricing*
                    </p>
                    <p>
                      Our goal is to provide a unique and elevated customer
                      experience. Please let us know if there is anything we can
                      do make your visit more enjoyable.
                    </p>
                  </div>
                </div>

                <div className="text-container">
                  <div className="right">
                    
                  </div>
                </div>
              </div>
            </div> */}

            <Fade delay={0}>
              <div className="scroll-nav--link-container">
                <div className="instagram-link">
                  <a href="https://www.instagram.com/euro_nails_tx/">
                    Follow Jenya on Instagram &bull; Follow Jenya on Instagram
                    &bull; Follow Jenya on Instagram &bull; Follow Jenya on
                    Instagram &bull;
                  </a>
                </div>
              </div>
            </Fade>

            <div className="instagram-container">
              {/* <Iframe
                url="https://cdn.lightwidget.com/widgets/375dfd408ec953c78a221d6932c29169.html"
                width="100%"
                height="auto"
                id="instagram-feed"
                className="instagram-feed"
                display="initial"
                position="relative"
              /> */}

              <Iframe
                src="//lightwidget.com/widgets/03a2a7a13d7f53468bedb662d1a84e66.html"
                scrolling="no"
                allowtransparency="true"
                class="lightwidget-widget"
                style="width:100%;border:0;overflow:hidden;"
              />
            </div>

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

export default Nails;
