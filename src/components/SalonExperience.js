import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { TimelineMax as Timeline, Power1 } from "gsap";
import ScrollMagic from "scrollmagic";
import "imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Fade from "react-reveal/Fade";

// import { Tween, Timeline } from "react-gsap";
// import { Controller, Scene } from "react-scrollmagic";

import MediaQuery from "react-responsive";

import Nav from "./Nav";
import MobileNav from "./MobileNav";

import { MOBILEBP, DESKTOPTRANSITIONBP, DESKTOPBP } from "../constants";
import Gallery from "./Gallery";
import Footer from "./Footer";

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

class SalonExperience extends React.Component {
  constructor(props) {
    super(props);
    this.controller = new ScrollMagic.Controller();
    this.getMediaChangeTimeline = this.getMediaChangeTimeline.bind(this);
    this.playMediaChange = this.playMediaChange.bind(this);
    this.handleImageSelect = this.handleImageSelect.bind(this);
    this.handleClearImageSelect = this.handleClearImageSelect.bind(this);
    this.loadDesktop = this.loadDesktop.bind(this);
    this.loadMobile = this.loadMobile.bind(this);
    this.state = {
      showGallery: false,
      selectedGallery: null,
      initialGalleryIndex: 0,
      entry: [
        {
          type: "image",
          url: "https://images.ctfassets.net/2f8bh3xz5t4r/7KGnKkY6covAUbww3JFRWQ/a6d7448de532caa54d07ce7cf523b22c/entry_1.jpg",
          height: "544px",
        },
        {
          type: "video",
          url: "https://videos.ctfassets.net/2f8bh3xz5t4r/4AhAMVCOrn2nXH3cpaCPI5/21e0fbd901c4605b67b37e89e5ad7320/tea_cup.mp4",
          height: "262px",
        },
        {
          type: "image",
          url: "https://images.ctfassets.net/2f8bh3xz5t4r/6jPdZR2TZEns2i6fCHN6DZ/7e7afd65fde47d8f80f31be6d3c32663/entry_2.jpg",
          height: "262px",
        },
        {
          type: "image",
          url: "https://images.ctfassets.net/2f8bh3xz5t4r/1pqFngt4KFQd88WiyXOpu1/bf70371428922ecf0e54f0e907b2928b/entry_3.jpg",
          height: "544px",
        },
      ],
      interior: [
        {
          type: "image",
          url: "https://images.ctfassets.net/2f8bh3xz5t4r/6Tu0IcaEfnwINY6bNOmmB1/269f47a5a8231395c34d934f30c356a8/interior-1.jpg",
          height: "544px",
        },
        {
          type: "image",
          url: "https://images.ctfassets.net/2f8bh3xz5t4r/5kJI4I1mOGPUBntuSvzorK/1054d6b0df57aad5c69564524402aaf6/interior-2.jpg",
          height: "262px",
        },
        {
          type: "image",
          url: "https://images.ctfassets.net/2f8bh3xz5t4r/7j1IcTzWemSg3bMMD6RgUt/4fbe1d79dbf62c1d5e186cc977a23ba0/interior-3.jpg",
          height: "262px",
        },
        {
          type: "image",
          url: "https://images.ctfassets.net/2f8bh3xz5t4r/3bbZoi8KfXnMl8vxBc1LON/a5c962b4eeb2faa7c8a2862a78d9e486/interior-4.jpg",
          height: "262px",
        },
        {
          type: "image",
          url: "https://images.ctfassets.net/2f8bh3xz5t4r/01mEBVCXUAQwFPs3v9CwRP/92b58dea47ba1504045f6e14a3b46b3e/interior-5.jpg",
          height: "544px",
        },
      ],
      service: [
        {
          type: "image",
          url: "https://images.ctfassets.net/2f8bh3xz5t4r/1eybHmEYiwLtyUOxmfcryq/2e71ee5928583e634ca86a50f8b8f417/service-1.jpg",
          height: "544px",
        },
        {
          type: "video",
          url: "https://videos.ctfassets.net/2f8bh3xz5t4r/6XF8FFJN0X5TNpZA8tGn81/9e20a8e3ef86120045544478b6c8e645/service-hairdressers-montage.mp4",
          height: "262px",
        },
        {
          type: "video",
          url: "https://videos.ctfassets.net/2f8bh3xz5t4r/3uMHlhOFOhHetkbsVg8G2G/6eb30f2dd8ea6aea6e63eb11aa93610a/service-shampoo.mp4",
          height: "262px",
        },
        {
          type: "image",
          url: "https://images.ctfassets.net/2f8bh3xz5t4r/27xtkl4ZpXTsSEU9U7Pxyf/7843cd8aa7913729b7f5df766e62964e/service-2.jpg",
          height: "544px",
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

  handleImageSelect(imageSet, selectedIndex) {
    // console.log("called with data: ", staffMemberData);
    disableParentScroll();
    this.setState((state) => {
      if (state.showGallery) {
        return state;
      } else {
        return {
          showGallery: true,
          selectedGallery: imageSet,
          initialGalleryIndex: selectedIndex,
        };
      }
    });
  }

  handleClearImageSelect() {
    enableParentSCroll();
    this.setState((state) => {
      return {
        showGallery: false,
        selectedGallery: null,
        initialGalleryIndex: 0,
      };
    });
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
    var welcomeLinkTween = new Timeline().to(
      ".welcome-link",
      1.0,
      { right: "3000px" }
      // { opacity: 0, immediateRender: false },
      // { opacity: 1, delay: 2, immediateRender: false }
      // { y: 50, visibility: "hidden", opacity: 0 },
      // { y: 0, visibility: "visible", opacity: 1, delay: 2 }
    );

    new ScrollMagic.Scene({
      triggerElement: ".content", // y value not modified, so we can use element as trigger as well
      offset: 500,
      // duration: 500
      duration: "3000",
      // triggerHook: "onEnter"
      // triggerHook: 0.9,
    })
      // .setTween(".our-team-link", 1, {
      //   right: window.innerWidth
      // })
      .setTween(welcomeLinkTween)
      .addTo(this.controller);

    var wallpaperLinkTween = new Timeline().to(
      ".wallpaper-link",
      1.0,
      { right: "3000px" }
      // { opacity: 0, immediateRender: false },
      // { opacity: 1, delay: 2, immediateRender: false }
      // { y: 50, visibility: "hidden", opacity: 0 },
      // { y: 0, visibility: "visible", opacity: 1, delay: 2 }
    );

    new ScrollMagic.Scene({
      triggerElement: ".wallpaper-link", // y value not modified, so we can use element as trigger as well
      offset: -500,
      // duration: 500
      duration: "3000",
      // triggerHook: "onEnter"
      // triggerHook: 0.9,
    })
      // .setTween(".our-team-link", 1, {
      //   right: window.innerWidth
      // })
      .setTween(wallpaperLinkTween)
      .addTo(this.controller);

    var servicesLinkTween = new Timeline().to(
      ".services-link",
      1.0,
      { right: "3000px" }
      // { opacity: 0, immediateRender: false },
      // { opacity: 1, delay: 2, immediateRender: false }
      // { y: 50, visibility: "hidden", opacity: 0 },
      // { y: 0, visibility: "visible", opacity: 1, delay: 2 }
    );

    new ScrollMagic.Scene({
      triggerElement: ".services-link", // y value not modified, so we can use element as trigger as well
      offset: -500,
      // duration: 500
      duration: "3000",
      // triggerHook: "onEnter"
      // triggerHook: 0.9,
    })
      // .setTween(".our-team-link", 1, {
      //   right: window.innerWidth
      // })
      .setTween(servicesLinkTween)
      .addTo(this.controller);
  }

  loadMobile() {
    var welcomeLinkTween = new Timeline().to(
      ".welcome-link",
      1.0,
      { right: "2000px" }
      // { opacity: 0, immediateRender: false },
      // { opacity: 1, delay: 2, immediateRender: false }
      // { y: 50, visibility: "hidden", opacity: 0 },
      // { y: 0, visibility: "visible", opacity: 1, delay: 2 }
    );

    new ScrollMagic.Scene({
      triggerElement: ".content", // y value not modified, so we can use element as trigger as well
      offset: 0,
      // duration: 500
      duration: "4000",
      // triggerHook: "onEnter"
      // triggerHook: 0.9,
    })
      // .setTween(".our-team-link", 1, {
      //   right: window.innerWidth
      // })
      .setTween(welcomeLinkTween)
      .addTo(this.controller);

    var wallpaperLinkTween = new Timeline().to(
      ".wallpaper-link",
      1.0,
      { right: "2000px" }
      // { opacity: 0, immediateRender: false },
      // { opacity: 1, delay: 2, immediateRender: false }
      // { y: 50, visibility: "hidden", opacity: 0 },
      // { y: 0, visibility: "visible", opacity: 1, delay: 2 }
    );

    new ScrollMagic.Scene({
      triggerElement: ".wallpaper-link", // y value not modified, so we can use element as trigger as well
      offset: -300,
      // duration: 500
      duration: "4000",
      // triggerHook: "onEnter"
      // triggerHook: 0.9,
    })
      // .setTween(".our-team-link", 1, {
      //   right: window.innerWidth
      // })
      .setTween(wallpaperLinkTween)
      .addTo(this.controller);

    var servicesLinkTween = new Timeline().to(
      ".services-link",
      1.0,
      { right: "2000px" }
      // { opacity: 0, immediateRender: false },
      // { opacity: 1, delay: 2, immediateRender: false }
      // { y: 50, visibility: "hidden", opacity: 0 },
      // { y: 0, visibility: "visible", opacity: 1, delay: 2 }
    );

    new ScrollMagic.Scene({
      triggerElement: ".services-link", // y value not modified, so we can use element as trigger as well
      offset: -300,
      // duration: 500
      duration: "4000",
      // triggerHook: "onEnter"
      // triggerHook: 0.9,
    })
      // .setTween(".our-team-link", 1, {
      //   right: window.innerWidth
      // })
      .setTween(servicesLinkTween)
      .addTo(this.controller);
  }

  renderAsset(asset, category, index) {
    if (asset.type === "video") {
      return (
        <div
          key={asset.url}
          className="section-video"
          id={`${category}-${index}`}
          style={{
            height: asset.height,
          }}
          onClick={() => this.handleImageSelect(category, index)}
        >
          {/* add loop */}
          <video autoPlay muted playsInline loop>
            <source src={asset.url} type="video/mp4" />
          </video>
        </div>
      );
    }
    if (asset.type === "image") {
      return (
        <div
          key={asset.url}
          className="section-image"
          id={`${category}-${index}`}
          style={{
            backgroundImage: `url(${asset.url})`,
            height: asset.height,
          }}
          onClick={() => this.handleImageSelect(category, index)}
        />
      );
    }
  }

  renderAssetMobile(asset, category, index) {
    if (asset.type === "video") {
      return (
        <div
          key={asset.url}
          className="section-video"
          id={`${category}-${index}`}
          style={{
            height: asset.height,
          }}
        >
          {/* add loop */}
          <video autoPlay muted playsInline loop>
            <source src={asset.url} type="video/mp4" />
          </video>
        </div>
      );
    }
    if (asset.type === "image") {
      return (
        <div
          key={asset.url}
          className="section-image"
          id={`${category}-${index}`}
          style={{
            backgroundImage: `url(${asset.url})`,
            height: asset.height,
          }}
        />
      );
    }
  }

  render() {
    const { showGallery, selectedGallery, initialGalleryIndex } = this.state;
    return (
      <div className="salon-experience">
        <MediaQuery minWidth={DESKTOPTRANSITIONBP}>
          <Nav active={"what-we-do"} />
        </MediaQuery>

        <MediaQuery maxWidth={MOBILEBP} onChange={this.playMediaChange}>
          <MobileNav expanded={false} />
        </MediaQuery>

        <div className="content-container">
          <TransitionGroup component={null}>
            {showGallery && (
              <CSSTransition
                in={showGallery}
                timeout={500}
                classNames="display"
                unmountOnExit
              >
                {showGallery && (
                  <Gallery
                    items={this.state[selectedGallery]}
                    closeHandler={this.handleClearImageSelect}
                    initialGalleryIndex={initialGalleryIndex}
                  ></Gallery>
                )}
              </CSSTransition>
            )}
          </TransitionGroup>

          <div className="content">
            <MediaQuery minWidth={DESKTOPTRANSITIONBP}>
              <div className="landing">
                <div className="left">
                  <div className="left--content">
                    <Fade bottom delay={2250} distance="50px">
                      <h5>What we do</h5>
                    </Fade>

                    <Fade bottom delay={2300} distance="50px">
                      <h3>
                        All you wanted was the world, right? We&apos;ve got you
                        covered.
                      </h3>
                    </Fade>
                  </div>
                </div>
                <Fade delay={2250}>
                  <div className="right">
                    <span></span>
                  </div>
                </Fade>
              </div>

              <Fade delay={2300}>
                <div className="scroll-nav--link-container">
                  <div className="welcome-link">
                    Welcome to Saint Rose
                    {/* <Link to={`/hair-and-waxing`}>Welcome to Saint Rose</Link> */}
                  </div>
                </div>
              </Fade>
            </MediaQuery>

            <MediaQuery maxWidth={MOBILEBP}>
              <Fade bottom delay={2250} distance="50px">
                <div>
                  <div className="landing">
                    <div className="left">
                      <div className="left--content">
                        <h5>What we do</h5>

                        <h3>
                          All you wanted was the world, right? We&apos;ve got
                          you covered.
                        </h3>
                      </div>
                    </div>
                    <div className="right">
                      <span></span>
                    </div>
                  </div>

                  <div className="scroll-nav--link-container">
                    <div className="welcome-link">
                      Welcome to Saint Rose
                      {/* <Link to={`/hair-and-waxing`}>Welcome to Saint Rose</Link> */}
                    </div>
                  </div>
                </div>
              </Fade>
            </MediaQuery>

            {/* section */}

            <div className="section-text">
              <div className="text-container">
                <Fade bottom distance="50px">
                  <div className="left">
                    <div className="nested-quote">
                      I walk in every day and I see our guests smiling, having
                      drinks - they are just genuinely enjoying themselves here.
                      It&apos;s like a social club...unlike anything else.
                      <span>– Jenya Malkin</span>
                    </div>
                  </div>
                </Fade>
              </div>
              <Fade bottom delay={250} distance="50px">
                <div className="text-container">
                  <div className="right">
                    <p>
                      We offer complimentary refreshments because you deserve
                      it. This includes your choice of French-press coffee, a
                      variety of loose-leaf teas served hot or cold, and white,
                      red, and rosé wine. Can&apos;t get enough of us? Learn
                      more about The Salon Experience.
                    </p>
                  </div>
                </div>
              </Fade>
            </div>

            {/* section image block*/}

            <div className="section-images">
              <div className="title">
                <h5>01</h5>
                <h3>Entry</h3>
              </div>
              <MediaQuery minWidth={DESKTOPTRANSITIONBP}>
                <div className="images">
                  <div className="left">
                    {this.state.entry.map((item, index) => {
                      if (index <= 1) {
                        return this.renderAsset(item, "entry", index);
                      }
                    })}
                  </div>
                  <div className="right">
                    {this.state.entry.map((item, index) => {
                      if (index > 1) {
                        return this.renderAsset(item, "entry", index);
                      }
                    })}
                  </div>
                </div>
              </MediaQuery>

              <MediaQuery maxWidth={MOBILEBP}>
                <div className="images">
                  <div className="left">
                    {this.state.entry.map((item, index) => {
                      if (index <= 1) {
                        return this.renderAssetMobile(item, "entry", index);
                      }
                    })}
                  </div>
                  <div className="right">
                    {this.state.entry.map((item, index) => {
                      if (index > 1) {
                        return this.renderAssetMobile(item, "entry", index);
                      }
                    })}
                  </div>
                </div>
              </MediaQuery>
            </div>

            {/* section */}

            <Fade delay={200}>
              <div className="scroll-nav--link-container">
                <div className="wallpaper-link">
                  Can we talk about the wallpaper?
                </div>
              </div>
            </Fade>

            <div className="section-text">
              <div className="text-container">
                <Fade bottom distance="50px">
                  <div className="left">
                    We&apos;re not into building walls – just covering them with
                    beautiful wallpaper you can&apos;t take your eyes off of.
                  </div>
                </Fade>
              </div>
              <Fade bottom delay={250} distance="50px">
                <div className="text-container">
                  <div className="right">
                    <p>
                      Just like us, there&apos;s more than meets the eye when it
                      comes to our style - and we like to think we have a lot of
                      it. We know better than anyone that details matter, so we
                      set the mood for your experience by keeping all your
                      senses on point (take a closer look at our walls and
                      you&apos;ll see what we mean). You&apos;ve been looking
                      forward to this appointment forever, so we make it special
                      from the moment you walk in to the moment you hug us
                      goodbye. Self-care, wow-hair, and wallpaper that&apos;s
                      rare. That&apos;s Saint Rose.
                    </p>
                  </div>
                </div>
              </Fade>
            </div>

            <div className="section-video">
              {/* add loop */}
              <video autoPlay muted playsInline controls>
                <source
                  src={
                    "https://videos.ctfassets.net/2f8bh3xz5t4r/3ltxO1rtvynBdWO47ALM0y/7d414ed1b9a7f7e6b4e1153668aa6fd4/salon-tour.mp4"
                  }
                  type="video/mp4"
                />
              </video>
            </div>

            <div className="section-images">
              <div className="title">
                <h5>02</h5>
                <h3>Interior</h3>
              </div>

              <MediaQuery minWidth={DESKTOPTRANSITIONBP}>
                <div className="images">
                  <div className="left">
                    {this.state.interior.map((item, index) => {
                      if (index <= 1) {
                        return this.renderAsset(item, "interior", index);
                      }
                    })}
                  </div>
                  <div className="right">
                    {this.state.interior.map((item, index) => {
                      if (index > 1) {
                        return this.renderAsset(item, "interior", index);
                      }
                    })}
                  </div>
                </div>
              </MediaQuery>

              <MediaQuery maxWidth={MOBILEBP}>
                <div className="images">
                  <div className="left">
                    {this.state.interior.map((item, index) => {
                      if (index <= 1) {
                        return this.renderAssetMobile(item, "interior", index);
                      }
                    })}
                  </div>
                  <div className="right">
                    {this.state.interior.map((item, index) => {
                      if (index > 1) {
                        return this.renderAssetMobile(item, "interior", index);
                      }
                    })}
                  </div>
                </div>
              </MediaQuery>
            </div>

            {/* section */}

            <Fade delay={200}>
              <div className="scroll-nav--link-container">
                <div className="services-link">Services experience</div>
              </div>
            </Fade>

            <div className="section-text">
              <div className="text-container">
                <Fade bottom distance="50px">
                  <div className="left">
                    <div className="nested-quote">
                      We cater to our guests every day… it&apos;s our culture.
                      Listening and understanding is the key to a great
                      relationship with our guests.
                      <span>– Martin Ibarra</span>
                    </div>
                  </div>
                </Fade>
              </div>
              <Fade bottom delay={250} distance="50px">
                <div className="text-container">
                  <div className="right">
                    <p>
                      It&apos;s all in the details, and no one does it better
                      than we do. Our team has one major thing in common: we
                      just love serving others and making them happy. We want
                      you to feel special every step of the way when you&apos;re
                      with us, and leave us feeling even better than when you
                      walked in. Every greeting, service, and wave goodbye is
                      filled with genuine care and love. That&apos;s just the
                      way we Rose.
                    </p>
                  </div>
                </div>
              </Fade>
            </div>

            <div className="section-images">
              <div className="title">
                <h5>03</h5>
                <h3>Service</h3>
              </div>
              <MediaQuery minWidth={DESKTOPTRANSITIONBP}>
                <div className="images">
                  <div className="left">
                    {this.state.service.map((item, index) => {
                      if (index <= 1) {
                        return this.renderAsset(item, "service", index);
                      }
                    })}
                  </div>
                  <div className="right">
                    {this.state.service.map((item, index) => {
                      if (index > 1) {
                        return this.renderAsset(item, "service", index);
                      }
                    })}
                  </div>
                </div>
              </MediaQuery>

              <MediaQuery maxWidth={MOBILEBP}>
                <div className="images">
                  <div className="left">
                    {this.state.service.map((item, index) => {
                      if (index <= 1) {
                        return this.renderAssetMobile(item, "service", index);
                      }
                    })}
                  </div>
                  <div className="right">
                    {this.state.service.map((item, index) => {
                      if (index > 1) {
                        return this.renderAssetMobile(item, "service", index);
                      }
                    })}
                  </div>
                </div>
              </MediaQuery>
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

export default SalonExperience;
