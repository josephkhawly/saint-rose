import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { TimelineMax as Timeline, Expo } from "gsap";
import ScrollMagic from "scrollmagic";


import Iframe from "react-iframe";

import Fade from "react-reveal/Fade";
import Axios from "axios";

import {
  TransitionGroup,
  CSSTransition,
} from "react-transition-group";

// import { Tween, Timeline } from "react-gsap";
// import { Controller, Scene } from "react-scrollmagic";

import MediaQuery from "react-responsive";

import Nav from "./Nav";
import MobileNav from "./MobileNav";

import { MOBILEBP, DESKTOPTRANSITIONBP, DESKTOPBP } from "../constants";
import StaffMember from "./StaffMember";
import StaffMemberSpotlight from "./StaffMemberSpotlight";

import Quotes from "./Quotes";

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

class About extends React.Component {
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

    const ourClientsTitleBarTween = new Timeline()
      .to(".our-clients--title-bar", 0.7, { width: "680px", ease: Expo.easeIn })
      .to(".title-bar-text", 1, { opacity: 1 });

    new ScrollMagic.Scene({
      triggerElement: ".our-story",
      triggerHook: "onEnter",
      offset: 100,
      reverse: false,
    })
      .setTween(ourStoryTitleBarTween)
      .addTo(this.controller);

    new ScrollMagic.Scene({
      triggerElement: ".our-clients",
      triggerHook: "onEnter",
      offset: 100,
      reverse: false,
    })
      .setTween(ourClientsTitleBarTween)
      .addTo(this.controller);
  }

  loadDesktopTransition() {
    const ourStoryTitleBarTween = new Timeline()
      .to(".our-story--title-bar", 0.7, { width: "612px", ease: Expo.easeIn })
      .to(".title-bar-text", 1, { opacity: 1 });

    const ourClientsTitleBarTween = new Timeline()
      .to(".our-clients--title-bar", 0.7, { width: "612px", ease: Expo.easeIn })
      .to(".title-bar-text", 1, { opacity: 1 });

    new ScrollMagic.Scene({
      triggerElement: ".our-story",
      triggerHook: "onEnter",
      offset: 100,
      reverse: false,
    })
      .setTween(ourStoryTitleBarTween)
      .addTo(this.controller);

    new ScrollMagic.Scene({
      triggerElement: ".our-clients",
      triggerHook: "onEnter",
      offset: 100,
      reverse: false,
    })
      .setTween(ourClientsTitleBarTween)
      .addTo(this.controller);
  }

  loadMobile() {
    const ourStoryTitleBarTween = new Timeline()
      .to(".our-story--title-bar", 0.7, { width: "243px", ease: Expo.easeIn })
      .to(".title-bar-text", 1, { opacity: 1 });

    const ourClientsTitleBarTween = new Timeline()
      .to(".our-clients--title-bar", 0.7, { width: "280px", ease: Expo.easeIn })
      .to(".title-bar-text", 1, { opacity: 1 });

    new ScrollMagic.Scene({
      triggerElement: ".our-story",
      triggerHook: "onEnter",
      offset: 50,
      reverse: false,
    })
      .setTween(ourStoryTitleBarTween)
      .addTo(this.controller);

    new ScrollMagic.Scene({
      triggerElement: ".our-clients",
      triggerHook: "onEnter",
      offset: 50,
      reverse: false,
    })
      .setTween(ourClientsTitleBarTween)
      .addTo(this.controller);
  }

  quotesData() {
    return [
      {
        quoteText:
          "Saint Rose is so much more than a salon! From the moment you walk in, you feel so taken care of. I love indulging in a glass of champagne in this beautiful space while I wait for my appointment. The washroom is a spa-like retreat with relaxing decor and soothing music. Those few hours I spend at Saint Rose every so often have really made my life in Houston better. It is absolutely one of my favorite places in the city and somewhere I'll miss dearly!",
        attribution: "Maggie S.",
      },
      {
        quoteText:
          "Tim is such an amazing colorist and always gives me my dream red hair whenever I swing by Houston. Everyone at the salon is like family and treats me and my mom as such - So sweet and attentive! Plus, the vibes are immaculate!",
        attribution: "Ariel K.",
      },
      {
        quoteText:
          "This is the most luscious place - Quaint and clean with great music, phenomenal service, great product selection, and the most pleasant vibe.",
        attribution: "Paige G.",
      },
      {
        quoteText:
          "This place is wonderful and tres chic! I work with Ramiro and he is fantastic - Very attentive, talented and just a great guy. I would recommend this place all day, every day! I was already sold on it, and today I got treated with their uber cute tea service which sealed the deal.",
        attribution: "Smita R.",
      },
      {
        quoteText:
          "I cannot say enough great things about Saint Rose and my stylist, Ramiro! The whole experience was enjoyable and I LOVE MY HAIR! If you are looking for a sign — THIS IS IT.",
        attribution: "Nathalie E.",
      },
      {
        quoteText:
          "From appointment set-up to the blow-dry, everyone was super helpful and responsive and welcoming. We already have a balayage scheduled for end of July so we will definitely be back and look forward to it! Thank you!!",
        attribution: "Karen M.",
      },
      {
        quoteText:
          "Everyone is so friendly. The ambiance is eccentric and peaceful at the same time. The owner, Tim, is the absolute best! Highly, highly recommended. I wouldn't go anywhere else.",
        attribution: "Carli D.",
      },
    ];
  }

  render() {
    const { staffMembers, selectedStaffMember, showSpotlight } = this.state;
    return (
      <div className="about">
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
          <Nav active={"about"} />
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
                        "https://videos.ctfassets.net/2f8bh3xz5t4r/3DuvQsjnxpIwzKaJZy1blR/030264480575e159921baa017a2b6a61/our-story.mp4"
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
                        world&apos;s top stylists and traveling all over the
                        country doing shows and working in salon education,
                        owner and founder Timothy Silmon dreamt up a place where
                        the beauty-obsessed could not only work, but also create
                        lasting connections through their craft. Saint Rose was
                        born out of Timothy&apos;s dream for a
                        &ldquo;non-salon&rdquo; - a space that is kind, warm,
                        and inviting. Since then, it has grown into something
                        even better: the most genuine and timeless beauty salon
                        to ever hit Houston. And it makes you feel right at
                        home.
                      </p>
                      <p>
                        The vintage TV, hand-crafted workspaces, couture
                        wallpaper, and quirky embellishments around the salon
                        all work to create an atmosphere that balances nostalgia
                        with the optimism of new ideas. &ldquo;I wanted to
                        create spaces that have a timeless feeling&rdquo;
                        Timothy says, &ldquo;a place where older generations
                        reminisce and the younger generations use it as backdrop
                        for the perfect photo&rdquo;.
                      </p>

                      <p>
                        From a snip of hair to a sip of our delicious loose-leaf
                        tea, we customize every experience our clients have.
                        Because who wants ordinary?
                      </p>
                    </div>
                  </div>
                </Fade>
              </div>
            </div>

            <div className="our-clients">
              <div className="our-clients--title-bar">
                <div className="title-bar-text">Our clients</div>
              </div>
              <Fade delay={700} bottom distance="50px">
                <div
                  className="section-hero-image"
                  style={{
                    backgroundImage: `url("https://images.ctfassets.net/2f8bh3xz5t4r/17EFNaEJN2pKw4jMIHAn3S/20152047334829e72ae6fa99ebcfadd6/our-clients.jpg")`,
                  }}
                />
                {/* <div className="section-hero-video-container">
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
                </div> */}
              </Fade>
              <div className="section-text">
                <div className="text-container">
                  <Fade bottom distance="50px">
                    <div className="left">
                      But what do our amazing clients actually say about us?
                      Read our reviews below and see why they keep coming back.
                    </div>
                  </Fade>
                </div>
                <Fade bottom delay={250} distance="50px">
                  <div className="text-container">
                    <div className="right">
                      <p>
                        We take our level of quality and care seriously and show
                        it through every moment of your time with us. Our guests
                        come back for the genuine commitment we have to them and
                        their needs and our consistency when we deliver. Book
                        today and experience Saint Rose for yourself.
                      </p>
                    </div>
                  </div>
                </Fade>
              </div>

              <div className="video-review">
                <video
                  id="who-we-are-vid"
                  autoPlay
                  loop
                  muted
                  controls
                  playsInline
                >
                  <source
                    src={
                      "https://videos.ctfassets.net/2f8bh3xz5t4r/5ZvdMsfyzeY51Loi7YRbPq/a7ffc0bfeef8b0bf403d30a583ae6b56/who_we_are.mp4"
                    }
                    type="video/mp4"
                  />
                </video>
              </div>

              <div className="instagram-reviews">
                <Iframe
                  src="https://cdn.lightwidget.com/widgets/d9467bad991b50808baea81bd806ab73.html"
                  width="100%"
                  height="auto"
                  scrolling="no"
                  // id="instagram-feed"
                  // className="lightwidget-widget"
                  display="initial"
                  position="relative"
                  allowtransparency="true"
                  // class="lightwidget-widget"
                  style="width:100%;border:0;overflow:hidden;"
                />
              </div>

              <div className="quotes">
                <div className="quotes-wrapper">
                  <Quotes quotes={this.quotesData()} />
                </div>
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

export default About;
