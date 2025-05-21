import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { TimelineMax as Timeline, Expo } from "gsap";
import ScrollMagic from "scrollmagic";


import Fade from "react-reveal/Fade";
import Axios from "axios";

import {
  TransitionGroup,
  CSSTransition,
  Transition,
} from "react-transition-group";

// import { Tween, Timeline } from "react-gsap";
// import { Controller, Scene } from "react-scrollmagic";

import MediaQuery from "react-responsive";

import Nav from "./Nav";
import MobileNav from "./MobileNav";

import { MOBILEBP, DESKTOPTRANSITIONBP, DESKTOPBP } from "../constants";
import StaffMember from "./StaffMember";
import StaffMemberSpotlight from "./StaffMemberSpotlight";
import Footer from "./Footer";

function preloadImage(imageURL) {
  const img = new Image();
  img.src = imageURL;
}

function processResponse(responseData) {
  const assets = responseData.includes.Asset.map((asset) => {
    return { id: asset.sys.id, url: asset.fields.file.url };
  });

  const staffMembers = responseData.items.map((member) => {
    const fields = member.fields;

    const staging = {};
    staging.order = fields.order;
    staging.name = fields.name;
    staging.role = fields.role;
    staging.photoSmall = maybeGetAssetURL("smallPhoto", fields, assets);
    staging.photoLarge = maybeGetAssetURL("largePhoto", fields, assets);
    staging.bio = fields.bio;
    staging.video = maybeGetAssetURL("video", fields, assets);
    staging.instagram = fields.instagram;
    staging.location = fields.location;

    return staging;
  });

  return staffMembers;
}

function maybeGetAssetURL(field, fields, assets) {
  if (fields[field]) {
    const assetID = fields[field].sys.id;
    return getURLForAssetID(assetID, assets);
  } else {
    return undefined;
  }
}

function getURLForAssetID(id, assets) {
  const match = assets.find((asset) => asset.id === id);
  return match.url;
}

function disableParentScroll() {
  const root = document.documentElement;
  root.className += " disable-scroll";
  document.body.classList.add("disable-scroll");
}

function enableParentSCroll() {
  const root = document.documentElement;
  root.className = root.className.replace("disable-scroll", "");
  document.body.className = document.body.className.replace(
    "disable-scroll",
    ""
  );
}

// const ENDPOINT = "https://google.com";
const API_BASE_URL = "https://cdn.contentful.com";
const API_SPACE_ID = "2f8bh3xz5t4r";
const API_TOKEN = "w_iD0iNnkKr2HotiAweKs5FNWBeFFRyGyC8WZ05sY04";

class MeetTheTeam extends React.Component {
  constructor(props) {
    super(props);
    this.controller = new ScrollMagic.Controller();
    this.getMediaChangeTimeline = this.getMediaChangeTimeline.bind(this);
    this.playMediaChange = this.playMediaChange.bind(this);
    this.handleStaffMemberSelect = this.handleStaffMemberSelect.bind(this);
    this.loadDesktop = this.loadDesktop.bind(this);
    this.loadDesktopTransition = this.loadDesktopTransition.bind(this);
    this.loadMobile = this.loadMobile.bind(this);
    this.handleClearStaffMemberSelect =
      this.handleClearStaffMemberSelect.bind(this);
    this.state = {
      showSpotlight: false,
      selectedStaffMember: {},
      staffMembers: [
        {
          name: "",
          role: "",
          photoSmall: "",
          photoLarge: "",
          bio: "",
          video: "",
          location: "",
        },
        {
          name: "",
          role: "",
          photoSmall: "",
          photoLarge: "",
          bio: "",
          video: "",
          location: "",
        },
        {
          name: "",
          role: "",
          photoSmall: "",
          photoLarge: "",
          bio: "",
          video: "",
          location: "",
        },
        {
          name: "",
          role: "",
          photoSmall: "",
          photoLarge: "",
          bio: "",
          video: "",
          location: "",
        },
        {
          name: "",
          role: "",
          photoSmall: "",
          photoLarge: "",
          bio: "",
          video: "",
          location: "",
        },
        {
          name: "",
          role: "",
          photoSmall: "",
          photoLarge: "",
          bio: "",
          video: "",
          location: "",
        },
      ],
    };
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
    } else if (window.innerWidth >= MOBILEBP) {
      this.loadDesktopTransition();
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

  handleStaffMemberSelect(staffMemberData) {
    // console.log("called with data: ", staffMemberData);
    disableParentScroll();
    this.setState((state) => {
      if (state.showSpotlight) {
        return state;
      } else {
        return {
          showSpotlight: true,
          selectedStaffMember: staffMemberData,
        };
      }
    });
  }

  handleClearStaffMemberSelect() {
    enableParentSCroll();
    this.setState((state) => {
      return {
        showSpotlight: false,
        selectedStaffMember: {},
      };
    });
  }

  componentDidMount() {
    new ScrollMagic.Scene({
      triggerElement: ".content",
      offset: 100,
      triggerHook: "onLeave",
    })
      .setClassToggle(".nav-container", "scrolled")
      .addTo(this.controller);

    if (window.innerWidth >= DESKTOPBP) {
      this.loadDesktop();
    } else if (window.innerWidth >= MOBILEBP) {
      this.loadDesktopTransition();
    } else {
      this.loadMobile();
    }

    const staffEndpoint = `${API_BASE_URL}/spaces/${API_SPACE_ID}/entries?access_token=${API_TOKEN}&content_type=staff&order=fields.order`;

    Axios.get(staffEndpoint)
      .then((result) => {
        // console.log("result: ", result);
        const fetchedStaffMembers = processResponse(result.data);
        this.setState((state) => {
          return {
            staffMembers: fetchedStaffMembers,
          };
        });

        fetchedStaffMembers.map((member) => {
          preloadImage(member.photoSmall);
        });

        fetchedStaffMembers.map((member) => {
          preloadImage(member.photoLarge);
        });
      })
      .catch((error) => console.log("error: ", error));
  }

  componentWillUnmount() {
    enableParentSCroll();
  }

  loadDesktop() {
    const ourStoryTitleBarTween = new Timeline()
      .to(".our-story--title-bar", 0.7, { width: "612px", ease: Expo.easeIn })
      .to(".title-bar-text", 1, { opacity: 1 });

    new ScrollMagic.Scene({
      triggerElement: ".our-story",
      triggerHook: "onEnter",
      offset: 100,
      reverse: false,
    })
      .setTween(ourStoryTitleBarTween)
      .addTo(this.controller);
  }

  loadDesktopTransition() {
    const ourStoryTitleBarTween = new Timeline()
      .to(".our-story--title-bar", 0.7, { width: "612px", ease: Expo.easeIn })
      .to(".title-bar-text", 1, { opacity: 1 });

    new ScrollMagic.Scene({
      triggerElement: ".our-story",
      triggerHook: "onEnter",
      offset: 100,
      reverse: false,
    })
      .setTween(ourStoryTitleBarTween)
      .addTo(this.controller);
  }

  loadMobile() {
    const ourStoryTitleBarTween = new Timeline()
      .to(".our-story--title-bar", 0.7, { width: "243px", ease: Expo.easeIn })
      .to(".title-bar-text", 1, { opacity: 1 });

    new ScrollMagic.Scene({
      triggerElement: ".our-story",
      triggerHook: "onEnter",
      offset: 50,
      reverse: false,
    })
      .setTween(ourStoryTitleBarTween)
      .addTo(this.controller);
  }

  render() {
    const { staffMembers, selectedStaffMember, showSpotlight } = this.state;
    return (
      <div className="meet-the-team">
        <TransitionGroup component={null}>
          {showSpotlight && (
            <CSSTransition
              in={showSpotlight}
              timeout={500}
              classNames="display"
              unmountOnExit
            >
              <StaffMemberSpotlight
                staffMemberDetails={selectedStaffMember}
                closeHandler={this.handleClearStaffMemberSelect}
              />
            </CSSTransition>
          )}
        </TransitionGroup>

        <MediaQuery minWidth={DESKTOPTRANSITIONBP}>
          <Nav active={"meet-the-team"} />
        </MediaQuery>

        <MediaQuery maxWidth={MOBILEBP} onChange={this.playMediaChange}>
          <MobileNav expanded={false} />
        </MediaQuery>

        <div className="content-container">
          <div className="content">
            <div className="inner-content-container">
              <MediaQuery minWidth={DESKTOPTRANSITIONBP}>
                <div className="header">
                  <Fade bottom delay={2250} distance="50px">
                    <h5>Meet the team</h5>
                  </Fade>
                  <Fade bottom delay={2450} distance="50px">
                    <h3>
                      Not-your-ordinary-hairdressers. Meet the people behind the
                      chair. See someone you vibe with? Let us know when you
                      book and we&apos;ll make the match.
                    </h3>
                  </Fade>
                </div>

                <Fade bottom delay={2650} distance="50px">
                  <div className="staff-container">
                    {staffMembers.map((staffMemberData, index) => (
                      <StaffMember
                        key={index}
                        staffMemberData={staffMemberData}
                        staffMemberSelectHandler={this.handleStaffMemberSelect}
                      />
                    ))}
                  </div>
                </Fade>
              </MediaQuery>

              <MediaQuery maxWidth={MOBILEBP}>
                <Fade bottom delay={2250} distance="50px">
                  <div>
                    <div className="header">
                      <h5>Meet the team</h5>
                      <h3>
                        Not-your-ordinary-hairdressers. Meet the people behind
                        the chair. See someone you vibe with? Let us know when
                        you book and we&apos;ll make the match.
                      </h3>
                    </div>
                    <div className="staff-container">
                      {staffMembers.map((staffMemberData, index) => (
                        <StaffMember
                          key={index}
                          staffMemberData={staffMemberData}
                          staffMemberSelectHandler={
                            this.handleStaffMemberSelect
                          }
                        />
                      ))}
                    </div>
                  </div>
                </Fade>
              </MediaQuery>
            </div>

            <div className="our-story">
              <div className="our-story--title-bar">
                <div className="title-bar-text">Our story</div>
              </div>
              <Fade delay={700} bottom distance="50px">
                {/* <div
                  className="section-hero-image"
                  style={{
                    backgroundImage: `url("/images/our-story-header.jpg")`
                  }}
                /> */}
                <div className="section-hero-video-container">
                  <video
                    id="section-hero-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source
                      src={
                        "https://videos.ctfassets.net/2f8bh3xz5t4r/2ONf0079qZB9Ax86jrzyCu/fdbb4e691e453bfb1feaf0b5b4605636/our_story_hero.mp4"
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
                      There&apos;s a reason we&apos;re good at what we do, and
                      it&apos;s because of where we came from.
                    </div>
                  </Fade>
                </div>
                <Fade bottom delay={250} distance="50px">
                  <div className="text-container">
                    <div className="right">
                      <p>
                        After several years of training with some of the
                        country&apos;s top stylists and traveling all over the
                        country doing shows and working in salon education,
                        owner and founder Timothy Silmon dreamt up a place where
                        the beauty-obsessed could not only work, but also create
                        lasting connections through their craft. Saint Rose was
                        born out of Timothy&apos;s dream for a
                        &ldquo;non-salon&rdquo; – a space that is kind, warm,
                        and inviting. Since then, it has grown into something
                        even better: the most genuine and timeless beauty salon
                        to ever hit Houston. And it makes you feel right at
                        home.
                      </p>
                      <p>
                        Saint Rose is a place for bosses, dreamers, leaders, and
                        everything in between. From a snip of hair to a sip of
                        our delicious loose-leaf tea, we customize every
                        experience our clients have. Because who wants ordinary?
                      </p>
                    </div>
                  </div>
                </Fade>
              </div>
            </div>

            <Fade>
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

export default MeetTheTeam;
