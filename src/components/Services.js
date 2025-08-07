import React from "react";
import { TimelineMax as Timeline, Expo } from "gsap";
import ScrollMagic from "scrollmagic";


import Fade from "react-reveal/Fade";

import MediaQuery from "react-responsive";

import Nav from "./Nav";
import MobileNav from "./MobileNav";

import { MOBILEBP, DESKTOPTRANSITIONBP } from "../constants";
import Footer from "./Footer";
import classnames from "classnames";

class Services extends React.Component {
  constructor(props) {
    super(props);
    this.controller = new ScrollMagic.Controller();
    this.getMediaChangeTimeline = this.getMediaChangeTimeline.bind(this);
    this.playMediaChange = this.playMediaChange.bind(this);
    this.loadDesktop = this.loadDesktop.bind(this);
    this.loadMobile = this.loadMobile.bind(this);

    this.state = {
      haircutOpen: false,
      colorOpen: false,
      treatmentsOpen: false,
    };

    this.handleOpenToggle = this.handleOpenToggle.bind(this);
  }

  componentDidMount() {
    // window.scrollTo(0, 0);
    new ScrollMagic.Scene({
      triggerElement: ".content",
      offset: 100,
      triggerHook: "onLeave",
    })
      .setClassToggle(".nav-container", "scrolled")
      .addTo(this.controller);

    if (window.innerWidth >= MOBILEBP) {
      this.loadDesktop();
    } else {
      this.loadMobile();
    }
  }

  loadDesktop() {
    const haircutTitleBarTween = new Timeline()
      .to(".haircut--title-bar", 0.7, {
        width: "812px",
        ease: Expo.easeIn,
        delay: 2.5,
      })
      .to(".haircut--title-bar-text", 1, { opacity: 1, delay: 0 });

    const colorTitleBarTween = new Timeline()
      .to(".color--title-bar", 0.7, {
        width: "975px",
        ease: Expo.easeIn,
        delay: 0,
      })
      .to(".color--title-bar-text", 1, { opacity: 1, delay: 0 });

    const treatmentsTitleBarTween = new Timeline()
      .to(".treatments--title-bar", 0.7, {
        width: "675px",
        ease: Expo.easeIn,
        delay: 0,
      })
      .to(".treatments--title-bar-text", 1, { opacity: 1, delay: 0 });

    new ScrollMagic.Scene({
      triggerElement: ".haircut",
      triggerHook: "onEnter",
      offset: 100,
      reverse: false,
    })
      .setTween(haircutTitleBarTween)
      .addTo(this.controller);

    new ScrollMagic.Scene({
      triggerElement: ".color",
      triggerHook: "onEnter",
      offset: 100,
      reverse: false,
    })
      .setTween(colorTitleBarTween)
      .addTo(this.controller);

    new ScrollMagic.Scene({
      triggerElement: ".treatments",
      triggerHook: "onEnter",
      offset: 100,
      reverse: false,
    })
      .setTween(treatmentsTitleBarTween)
      .addTo(this.controller);
  }

  loadMobile() {
    const haircutTitleBarTween = new Timeline()
      .to(".haircut--title-bar", 0.7, {
        width: "334px",
        ease: Expo.easeIn,
        delay: 2.5,
      })
      .to(".haircut--title-bar-text", 1, { opacity: 1, delay: 0 });

    const colorTitleBarTween = new Timeline()
      .to(".color--title-bar", 0.7, {
        width: "244px",
        ease: Expo.easeIn,
        delay: 0,
      })
      .to(".color--title-bar-text", 1, { opacity: 1, delay: 0 });

    const treatmentsTitleBarTween = new Timeline()
      .to(".treatments--title-bar", 0.7, {
        width: "275px",
        ease: Expo.easeIn,
        delay: 0,
      })
      .to(".treatments--title-bar-text", 1, { opacity: 1, delay: 0 });

    new ScrollMagic.Scene({
      triggerElement: ".haircut",
      triggerHook: "onEnter",
      offset: 0,
      reverse: false,
    })
      .setTween(haircutTitleBarTween)
      .addTo(this.controller);

    new ScrollMagic.Scene({
      triggerElement: ".color",
      triggerHook: "onEnter",
      offset: 100,
      reverse: false,
    })
      .setTween(colorTitleBarTween)
      .addTo(this.controller);

    new ScrollMagic.Scene({
      triggerElement: ".treatments",
      triggerHook: "onEnter",
      offset: 100,
      reverse: false,
    })
      .setTween(treatmentsTitleBarTween)
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

    if (window.innerWidth >= MOBILEBP) {
      this.loadDesktop();
    } else {
      this.loadMobile();
    }
  }

  renderPricingRow(title, description, price) {
    return (
      <li className="pricing-row" key={title}>
        <div className="head">
          <div className="title">{title}</div>
          {description && <div className="description">{description}</div>}
        </div>
        <div className="tail">${price}</div>
      </li>
    );
  }

  hairData() {
    return [
      {
        title: "Haircut",
        description:
          "Starting with a shampoo and condition. Followed by a cut and style of your choice.",
        price: "101",
      },
      {
        title: "Curly Cut",
        description:
          "After following our curly cut prep instructions, your stylist will cut your hair in its natural state, followed by a shampoo and condition. Afterward, your stylist will walk you through the styling and diffusing process.",
        price: "131",
      },
      {
        title: "Barber Cut",
        description:
          "A short cut primarily using clippers and taking less than 45 mins. Includes shampoo and style.",
        price: "57",
      },
      {
        title: "Transformation Cut",
        description:
          "A significant change with extra time allotted for instruction on styling your new do.",
        price: "131",
      },
      {
        title: "Kids Cut",
        description: "Guests 10 and under. Includes shampoo and blow dry.",
        price: "57",
      },
      {
        title: "Special Occasion",
        description:
          "For any look requiring some or all hair to be pinned, teased, or quaffed. Does not include a wash or blow dry.",
        price: "143",
      },
      {
        title: "Blow Dry",
        description:
          "Customized shampoo and conditioner for your hair needs to be followed by a style of your choice.",
        price: "50",
      },
      {
        title: "Wash & Go",
        description:
          "A shampoo that is meant to cleanse, hydrate, and define curls to their optimal levels. Beginning with a thorough clarifying of the hair and scalp, then an application of a product customized for your hair, followed by a diffuse to set your style.",
        price: "65",
      },
    ];
  }

  colorData() {
    return [
      {
        title: "Single Process",
        description:
          "A single color applied to cover gray, maintain hair color, or darken your hair color. Does not include blow dry.",
        price: "121",
      },
      {
        title: "Gloss",
        description:
          "Demi-permanent color used to tint the hair or refresh a previous color service. Does not include blow dry.",
        price: "46",
      },
      {
        title: "Face Frame Lightening",
        description:
          "A traditional foil or open-air technique, including the part line and area around the face. Blow dry not included.",
        price: "150",
      },
      {
        title: "Partial Lightening",
        description:
          "A traditional foil or open-air technique, including the crown area of the head. Blow dry not included.",
        price: "233",
      },
      {
        title: "Full Lightening",
        description:
          "A traditional foil or open-air technique, including the full head. Blow dry not included.",
        price: "298",
      },
    ];
  }

  treatmentsData() {
    return [
      { title: "Kevin Murphy Treatment", price: "49" },
      { title: "Kérastase Fusio Dose", price: "49" },
      { title: "Innersense Scalp Scrub", price: "27" },
      { title: "Leaf & Flower CBD Treatment", price: "69" },
      { title: "B3 Steam Treatment", price: "69" },
      { title: "K18 Treatment", price: "28" },
      { title: "Magic Sleek", price: "170/hr" },
      { title: "Keratin/Brazilian", price: "150/hr" },
    ];
  }

  handleOpenToggle(section) {
    this.setState((state) => {
      return {
        [section]: !state[section],
      };
    });
  }

  render() {
    const { haircutOpen, colorOpen, treatmentsOpen } = this.state;

    return (
      <div className="services">
        <MediaQuery minWidth={DESKTOPTRANSITIONBP}>
          <Nav active={"services"} />
        </MediaQuery>

        <MediaQuery maxWidth={MOBILEBP} onChange={this.playMediaChange}>
          <MobileNav expanded={false} />
        </MediaQuery>

        <div className="content-container">
          {/* <div className="spacer" style={{ height: "800px" }} /> */}
          <div className="content">
            <div className="landing">
              <Fade bottom delay={2250} distance="50px">
                <div className="sub-nav">Services</div>
                <h3>
                  You want service that makes you feel your absolute best, and
                  Saint Rose has a full-spectrum of services that make the cut.
                  It&apos;s a match made in heaven.
                </h3>
                {/* <a href="" target="_blank">
                  Download full service sheet.
                </a> */}
              </Fade>
            </div>

            {/* --- New section --- */}

            <div className={classnames("haircut", "section")}>
              <Fade bottom distance="50px" delay={3000}>
                <div className="section-hero">
                  <video id="hair-loop-vid" autoPlay loop muted playsInline>
                    <source
                      src={
                        "https://videos.ctfassets.net/2f8bh3xz5t4r/65IZapjKqmRfxmkQM2z88u/d5ecf70b7ef28bcbe86e7baa4ff91d3d/services.mp4"
                      }
                      type="video/mp4"
                    />
                  </video>
                </div>
              </Fade>
              <div className="section-text">
                <div className="text-container">
                  <Fade bottom distance="50px">
                    <div className="left">
                      It&apos;s not just hair. It&apos;s your hair, and we care
                      about every single strand. Let&apos;s get creating, shall
                      we?
                    </div>
                  </Fade>
                </div>
                <Fade bottom delay={250} distance="50px">
                  <div className="text-container">
                    <div className="right">
                      <p>
                        We offer complimentary refreshments because you deserve
                        it. This includes your choice of French-press coffee, a
                        variety of loose-leaf teas served hot or cold, and
                        white, red, and rosé wine.
                      </p>
                    </div>
                  </div>
                </Fade>
              </div>

              <Fade bottom delay={250} distance="50px">
                <div className="services-container">
                  <div className="services-block">
                    <MediaQuery minWidth={DESKTOPTRANSITIONBP}>
                      <div className="pricing-table">
                        <ul>
                          <li className="header">
                            <div className="head">Haircut &amp; Style</div>
                            <div className="tail">Base Price</div>
                          </li>
                          {this.hairData().map((rowData) => {
                            return this.renderPricingRow(
                              rowData.title,
                              rowData.description,
                              rowData.price
                            );
                          })}
                        </ul>
                      </div>
                    </MediaQuery>

                    <MediaQuery
                      maxWidth={MOBILEBP}
                      onChange={this.playMediaChange}
                    >
                      <div
                        className={classnames("pricing-table", {
                          open: haircutOpen,
                        })}
                      >
                        <ul>
                          <li className="header">
                            <div className="title-container">
                              <div className="head">Haircut &amp; Style</div>
                              <div
                                className={classnames("plusminus", {
                                  active: haircutOpen,
                                })}
                                onClick={() => {
                                  this.handleOpenToggle("haircutOpen");
                                }}
                              ></div>
                            </div>
                            {haircutOpen && (
                              <div className="tail">Base Price</div>
                            )}
                          </li>
                          {haircutOpen &&
                            this.hairData().map((rowData) => {
                              return this.renderPricingRow(
                                rowData.title,
                                rowData.description,
                                rowData.price
                              );
                            })}
                        </ul>
                      </div>
                    </MediaQuery>
                  </div>

                  <div className="services-block">
                    <MediaQuery minWidth={DESKTOPTRANSITIONBP}>
                      <div className="pricing-table">
                        <ul>
                          <li className="header">
                            <div className="head">Color Services</div>
                            <div className="tail">Base price</div>
                          </li>
                          {this.colorData().map((rowData) => {
                            return this.renderPricingRow(
                              rowData.title,
                              rowData.description,
                              rowData.price
                            );
                          })}
                        </ul>
                      </div>
                    </MediaQuery>

                    <MediaQuery
                      maxWidth={MOBILEBP}
                      onChange={this.playMediaChange}
                    >
                      <div
                        className={classnames("pricing-table", {
                          open: colorOpen,
                        })}
                      >
                        <ul>
                          <li className="header">
                            <div className="title-container">
                              <div className="head">Color Services</div>
                              <div
                                className={classnames("plusminus", {
                                  active: colorOpen,
                                })}
                                onClick={() => {
                                  this.handleOpenToggle("colorOpen");
                                }}
                              ></div>
                            </div>
                            {colorOpen && (
                              <div className="tail">Base Price</div>
                            )}
                          </li>
                          {colorOpen &&
                            this.colorData().map((rowData) => {
                              return this.renderPricingRow(
                                rowData.title,
                                rowData.description,
                                rowData.price
                              );
                            })}
                        </ul>
                      </div>
                    </MediaQuery>
                  </div>

                  <div className="services-block">
                    <MediaQuery minWidth={DESKTOPTRANSITIONBP}>
                      <div className="pricing-table">
                        <ul>
                          <li className="header">
                            <div className="head">Treatments</div>
                            <div className="tail">Base price</div>
                          </li>
                          {this.treatmentsData().map((rowData) => {
                            return this.renderPricingRow(
                              rowData.title,
                              rowData.description,
                              rowData.price
                            );
                          })}
                        </ul>
                      </div>
                    </MediaQuery>

                    <MediaQuery
                      maxWidth={MOBILEBP}
                      onChange={this.playMediaChange}
                    >
                      <div
                        className={classnames("pricing-table", {
                          open: treatmentsOpen,
                        })}
                      >
                        <ul>
                          <li className="header">
                            <div className="title-container">
                              <div className="head">Treatments</div>
                              <div
                                className={classnames("plusminus", {
                                  active: treatmentsOpen,
                                })}
                                onClick={() => {
                                  this.handleOpenToggle("treatmentsOpen");
                                }}
                              ></div>
                            </div>
                            {treatmentsOpen && (
                              <div className="tail">Base Price</div>
                            )}
                          </li>
                          {treatmentsOpen &&
                            this.treatmentsData().map((rowData) => {
                              return this.renderPricingRow(
                                rowData.title,
                                rowData.description,
                                rowData.price
                              );
                            })}
                        </ul>
                      </div>
                    </MediaQuery>
                  </div>
                </div>
              </Fade>
            </div>

            <Footer delay={0} />
          </div>
        </div>
        <div className="entrance" />
        <div className="exit" />
        <div className="exit-2" />
      </div>
    );
  }
}

export default Services;
