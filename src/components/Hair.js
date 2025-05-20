import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { TimelineMax as Timeline, Expo } from "gsap";
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
import classnames from "classnames";

class Hair extends React.Component {
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

    // setTimeout(() => {
    //   if (window.innerWidth >= DESKTOPTRANSITIONBP) {
    //     this.loadDesktop();
    //   } else {
    //     this.loadMobile();
    //   }
    // }, 0);
  }

  renderPricingRow(title, values) {
    return (
      <li key={title}>
        <div className="head">
          <span>{title}</span>
        </div>
        <div className="tail">
          {values.map((value, index) => (
            <span key={index}>{value}</span>
          ))}
        </div>
      </li>
    );
  }

  renderFullHeaderPricingRow(title, values) {
    return (
      <li key={title}>
        <div className="head-wide">
          <span>{title}</span>
        </div>
        <div className="tail-wide">
          {values.map((value, index) => (
            <span key={index}>{value}</span>
          ))}
        </div>
      </li>
    );
  }

  hairData() {
    return [
      {
        title: "Haircut",
        prices: ["$90", "$97", "$104", "$111", "$118", "$125", "$132"],
      },
      {
        title: "Curly Cut",
        prices: ["$132", "$137", "$142", "$147", "$152", "$157", "$162"],
      },
      {
        title: "Barber Cut",
        prices: ["$52", "$55", "$58", "$61", "$64", "$67", "$73"],
      },
      {
        title: "Transformation Haircut",
        prices: ["$111", "$121", "$131", "$141", "$151", "$161", "$171"],
      },
      {
        title: "Kid's Cut (under 10)",
        prices: ["$52", "$55", "$58", "$61", "$64", "$67", "$73"],
      },
      {
        title: "Special Occasion",
        prices: ["$137", "$143", "$149", "$155", "$161", "$175", "$186"],
      },
      {
        title: "Blow Dry",
        prices: ["$45", "$50", "$55", "$60", "$65", "$75", "$80"],
      },
      {
        title: "Wash & Go",
        prices: ["$71", "$77", "$83", "$89", "$95", "$107", "$113"],
      },
    ];
  }

  colorData() {
    return [
      {
        title: "Single Process",
        prices: ["$100", "$107", "$114", "$121", "$128", "$135", "$142"],
      },
      {
        title: "Base Shadowing / Gloss",
        prices: ["$34", "$36", "$38", "$40", "$42", "$44", "$46"],
      },
      {
        title: "Partial Balayage",
        prices: ["$229", "$240", "$251", "$262", "$273", "$284", "$299"],
      },
      {
        title: "Full Balayage",
        prices: ["$277", "$284", "$296", "$308", "$320", "$332", "$348"],
      },
      {
        title: "Partial Highlights",
        prices: ["$205", "$216", "$227", "$238", "$249", "$260", "$275"],
      },
      {
        title: "Full Highlights",
        prices: ["$219", "$230", "$241", "$252", "$263", "$274", "$289"],
      },
      // {
      //   title: "Keratin/Brazilian",
      //   prices: ["$330", "$340", "$350", "$360", "$370", "$400", "$410"],
      // },
    ];
  }

  // waxData() {
  //   return [
  //     { title: "Eyebrow", prices: ["$15", "$15", "$18", "$24"] },
  //     { title: "Lip", prices: ["$10", "$11", "$13", "$19"] },
  //     { title: "Chin", prices: ["$9", "$10", "$11", "$16"] },
  //   ];
  // }

  treatmentsData() {
    return [
      { title: "Kevin Murphy Treatment", prices: ["$39"] },
      { title: "Kevin Murphy Scalp Scrub", prices: ["$35"] },
      { title: "Kérastase Fusio Dose", prices: ["$49"] },
      { title: "Kérastase Scalp Scrub", prices: ["$35"] },
      { title: "Innersense Scalp Scrub", prices: ["$25"] },
      { title: "Leaf & Flower CBD Treatment", prices: ["$69"] },
      { title: "B3 Steam Treatment", prices: ["$59"] },
      { title: "K18 Treatment", prices: ["$28"] },
      { title: "Magic Sleek", prices: ["$350-$420"] },
      { title: "Keratin/Brazilian", prices: ["$330-400"] },
    ];
  }

  render() {
    return (
      <div className="hair-and-waxing">
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
              <Fade bottom delay={2250} distance="50px">
                <div className="sub-nav">
                  What we do &gt; <span>hair &amp; treatments</span>
                </div>
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
              <div className={classnames("haircut--title-bar", "title-bar")}>
                <div
                  className={classnames(
                    "haircut--title-bar-text",
                    "title-bar-text"
                  )}
                >
                  haircut &amp; style
                </div>
              </div>
              <Fade bottom distance="50px" delay={3000}>
                <div className="section-hero">
                  <video id="hair-loop-vid" autoPlay loop muted playsInline>
                    <source
                      src={
                        "https://videos.ctfassets.net/2f8bh3xz5t4r/1e5mBv5Bq2RpN5aIDHjwjL/816d169a8b31eaa061aca6c89d5f3baf/haircut-and-style-loop.mp4"
                      }
                      type="video/mp4"
                    />
                  </video>
                </div>
                {/* <div
                  className="section-hero-image"
                  style={{
                    backgroundImage: `url("/images/our-story-header.jpg")`
                  }}
                /> */}
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
                        white, red, and rosé wine. Can&apos;t get enough of us?
                        Learn more about{" "}
                        <Link to="salon-experience">The Salon Experience</Link>.
                      </p>
                    </div>
                  </div>
                </Fade>
              </div>

              <MediaQuery minWidth={DESKTOPTRANSITIONBP}>
                <div className="pricing-table">
                  <ul>
                    <li className="header">
                      <div className="head">
                        <span></span>
                      </div>
                      <div className="tail">
                        <span>Entry</span>
                        <span>Level 1</span>
                        <span>Level 2</span>
                        <span>Level 3</span>
                        <span>Level 4</span>
                        <span>Level 5</span>
                        <span>Level 6</span>
                      </div>
                    </li>
                    {this.hairData().map((rowData) => {
                      return this.renderPricingRow(
                        rowData.title,
                        rowData.prices
                      );
                    })}
                  </ul>
                </div>
              </MediaQuery>

              <MediaQuery maxWidth={MOBILEBP} onChange={this.playMediaChange}>
                <div className="pricing-table">
                  <ul>
                    <li className="header">
                      <div>
                        <h5>Prices are shown as follows:</h5>
                        <h6>
                          ENTRY | LEVEL 1 | LEVEL 2 | LEVEL 3 | LEVEL 4 | LEVEL
                          5 | LEVEL 6
                        </h6>
                      </div>
                    </li>
                    {this.hairData().map((rowData) => {
                      return this.renderPricingRow(
                        rowData.title,
                        rowData.prices
                      );
                    })}
                  </ul>
                </div>
              </MediaQuery>
            </div>

            {/* --- New section --- */}

            <div className={classnames("color", "section")}>
              <div className={classnames("color--title-bar", "title-bar")}>
                <div
                  className={classnames(
                    "color--title-bar-text",
                    "title-bar-text"
                  )}
                >
                  <MediaQuery minWidth={DESKTOPTRANSITIONBP}>
                    color services
                  </MediaQuery>

                  <MediaQuery maxWidth={MOBILEBP}>
                    color
                    <br />
                    services
                  </MediaQuery>
                </div>
              </div>
              <Fade bottom distance="50px" delay={0}>
                <div className="section-hero">
                  <video id="color-loop-vid" autoPlay loop muted playsInline>
                    <source
                      src={
                        "https://videos.ctfassets.net/2f8bh3xz5t4r/1BhbZRSK9M2oqJ6bvBJ3tZ/81c4788fb798ababbf1f070fcfbbe833/color-loop.mp4"
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
                      You live a colorful life, so show it! From easy going high
                      and low lights to the boldest looks, our colorists are
                      ready to make your hair dreams a reality.
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
                        white, red, and rosé wine. Can&apos;t get enough of us?
                        Learn more about{" "}
                        <Link to="salon-experience">The Salon Experience</Link>.
                      </p>
                    </div>
                  </div>
                </Fade>
              </div>
              <MediaQuery minWidth={DESKTOPTRANSITIONBP}>
                <div className="pricing-table">
                  <ul>
                    <li className="header-note">Starting prices for levels</li>
                    <li className="header">
                      <div className="head">
                        {/* <span className="header-note">
                          Starting prices for level:
                        </span> */}
                      </div>
                      <div className="tail">
                        <span>Entry</span>
                        <span>Level 1</span>
                        <span>Level 2</span>
                        <span>Level 3</span>
                        <span>Level 4</span>
                        <span>Level 5</span>
                        <span>Level 6</span>
                      </div>
                    </li>
                    {this.colorData().map((rowData) => {
                      return this.renderPricingRow(
                        rowData.title,
                        rowData.prices
                      );
                    })}
                  </ul>
                </div>
              </MediaQuery>

              <MediaQuery maxWidth={MOBILEBP} onChange={this.playMediaChange}>
                <div className="pricing-table">
                  <ul>
                    <li className="header">
                      <div>
                        <h5>Starting prices are shown as follows:</h5>
                        <h6>
                          ENTRY | LEVEL 1 | LEVEL 2 | LEVEL 3 | LEVEL 4 | LEVEL
                          5 | LEVEL 6
                        </h6>
                      </div>
                    </li>
                    {this.colorData().map((rowData) => {
                      return this.renderPricingRow(
                        rowData.title,
                        rowData.prices
                      );
                    })}
                  </ul>
                </div>
              </MediaQuery>
            </div>

            {/* --- New section --- */}

            <div className={classnames("treatments", "section", "last")}>
              <div className={classnames("treatments--title-bar", "title-bar")}>
                <div
                  className={classnames(
                    "treatments--title-bar-text",
                    "title-bar-text"
                  )}
                >
                  <MediaQuery minWidth={DESKTOPTRANSITIONBP}>
                    treatments
                  </MediaQuery>

                  <MediaQuery maxWidth={MOBILEBP}>treatments</MediaQuery>
                </div>
              </div>
              <Fade bottom distance="50px" delay={0}>
                <div className="section-hero">
                  <video id="wax-loop-vid" autoPlay loop muted playsInline>
                    <source
                      src={
                        "https://videos.ctfassets.net/2f8bh3xz5t4r/2GASeZyqbqazB1nZZ0oURX/625f40edbba8cd12392a34ff844937b1/waxing-loop.mp4"
                      }
                      type="video/mp4"
                    />
                  </video>
                </div>
              </Fade>
              <div className="section-text">
                <div className="text-container">
                  <Fade bottom distance="50px">
                    <div className="left"> </div>
                  </Fade>
                </div>
                <Fade bottom delay={250} distance="50px">
                  <div className="text-container">
                    <div className="right">
                      <p>
                        We offer complimentary refreshments because you deserve
                        it. This includes your choice of French-press coffee, a
                        variety of loose-leaf teas served hot or cold, and
                        white, red, and rosé wine. Can&apos;t get enough of us?
                        Learn more about{" "}
                        <Link to="salon-experience">The Salon Experience</Link>.
                      </p>
                    </div>
                  </div>
                </Fade>
              </div>
              <MediaQuery minWidth={DESKTOPTRANSITIONBP}>
                <div className={classnames("pricing-table", "last")}>
                  <ul>
                    {this.treatmentsData().map((rowData) => {
                      return this.renderFullHeaderPricingRow(
                        rowData.title,
                        rowData.prices
                      );
                    })}
                  </ul>
                </div>
              </MediaQuery>

              <MediaQuery maxWidth={MOBILEBP} onChange={this.playMediaChange}>
                <div className={classnames("pricing-table", "last")}>
                  <ul>
                    {this.treatmentsData().map((rowData) => {
                      return this.renderFullHeaderPricingRow(
                        rowData.title,
                        rowData.prices
                      );
                    })}
                  </ul>
                </div>
              </MediaQuery>
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

export default Hair;
