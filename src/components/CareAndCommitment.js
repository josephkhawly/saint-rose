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
import Quotes from "./Quotes";
import Footer from "./Footer";
import classnames from "classnames";

class CareAndCommitment extends React.Component {
  constructor(props) {
    super(props);
    this.controller = new ScrollMagic.Controller();
    this.getMediaChangeTimeline = this.getMediaChangeTimeline.bind(this);
    this.playMediaChange = this.playMediaChange.bind(this);
    this.state = {
      images: [
        {
          url: "https://images.ctfassets.net/2f8bh3xz5t4r/5s1A2RVNx9CTzadvbs6maY/b0447d3aecd2068581cb5c09637dd193/care-and-commitment-1.jpg",
          height: "516px",
          tag: "@nadia",
        },
        {
          url: "https://images.ctfassets.net/2f8bh3xz5t4r/2Og1TW6e7ree1XYkWkBZ5D/1ecd1e750609c1731474ccd048445101/care-and-commitment-2.jpg",
          height: "516px",
          tag: "@nadia",
        },
        {
          url: "https://images.ctfassets.net/2f8bh3xz5t4r/5QKfCoUwfYOOj6tT8VKnWS/580c0091610bfbc746a8fc69532175df/care-and-commitment-3.jpg",
          height: "386px",
          tag: "@nadia",
        },
        {
          url: "https://images.ctfassets.net/2f8bh3xz5t4r/QLtKFWLrCGsN0qwRRVhmQ/fc69b3f6899d5f98576f277366fab32d/care-and-commitment-4.jpg",
          height: "516px",
          tag: "@nadia",
        },
        {
          url: "https://images.ctfassets.net/2f8bh3xz5t4r/2HeqXoczwHQLuFHhJFJxrs/202f826507ae3741d0f2534c7bf8bab2/care-and-commitment-5.jpg",
          height: "516px",
          tag: "@nadia",
        },
        {
          url: "https://images.ctfassets.net/2f8bh3xz5t4r/6GvNucnSE6FYyN4Uym8tg3/76c4c4427a590eab6506040c4e44a947/care-and-commitment-6.jpg",
          height: "516px",
          tag: "@nadia",
        },
      ],
    };
  }

  componentDidMount() {
    new ScrollMagic.Scene({
      triggerElement: ".content",
      offset: 100,
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

  renderPricingRow(title, value) {
    return (
      <li key={title}>
        <span>{title}</span>
        <span>{value}</span>
      </li>
    );
  }

  renderAsset(asset) {
    return (
      <div key={asset.url} className="review-image">
        <div
          className="review-image-file"
          style={{
            backgroundImage: `url(${asset.url})`,
            height: asset.height,
          }}
        />
        {/* <div className="tag">{asset.tag}</div> */}
      </div>
    );
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
          "This salon is gorgeous, and everyone was so lovely and friendly. I had my hair done by Anna, and she exceeded my expectations! She made me feel comfortable and confident, and I've honestly never felt better about my hair.",
        attribution: "Claire P.",
      },
      {
        quoteText:
          "This place is wonderful and tres chic! I work with Ramiro and he is fantastic - Very attentive, talented and just a great guy. I would recommend this place all day, every day! I was already sold on it, and today I got treated with their uber cute tea service which sealed the deal.",
        attribution: "Smita R.",
      },
      {
        quoteText:
          "I've found my new curl whisperer! Jackie took really great care of me and my curls have never looked so good. They offer you drinks and the front staff is also so nice and courteous.",
        attribution: "Shelvy C.",
      },
      {
        quoteText:
          "I cannot say enough great things about Saint Rose and my stylist, Ramiro! The whole experience was enjoyable and I LOVE MY HAIR! If you are looking for a sign — THIS IS IT.",
        attribution: "Nathalie E.",
      },
    ];
  }

  render() {
    return (
      <div className="care-and-commitment">
        <MediaQuery minWidth={DESKTOPTRANSITIONBP}>
          <Nav active={"why-we-do-it"} />
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
                  Why we do it &gt; <span>Care &amp; commitment</span>
                </div>
                <h3>
                  A new haircut is like a brand new outfit that is always on.
                </h3>
              </Fade>
            </div>

            <Fade bottom distance="50px" delay={3000}>
              <div
                className="section-hero-image"
                style={{
                  backgroundImage: `url("https://images.ctfassets.net/2f8bh3xz5t4r/1nFsEzedZnL3G04WGzuct1/762b2191bf4e43914e92cc6b034e7225/care-and-commitment-hero.jpg")`,
                }}
              />
            </Fade>

            <div className="section-text">
              <div className="text-container">
                <Fade bottom distance="50px">
                  <div className="left">
                    But what do our amazing clients actually say about us? Read
                    our reviews below and see why they keep coming back.
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

            {/* <div className="instagram-reviews">
              <div className="images">
                <div className="column">
                  {this.state.images.map((item, index) => {
                    if (index <= 1) {
                      return this.renderAsset(item);
                    }
                  })}
                </div>
                <div className="column">
                  {this.state.images.map((item, index) => {
                    if (index > 1 && index <= 3) {
                      return this.renderAsset(item);
                    }
                  })}
                </div>
                <div className="column">
                  {this.state.images.map((item, index) => {
                    if (index > 3 && index <= 5) {
                      return this.renderAsset(item);
                    }
                  })}
                </div>
              </div>
            </div> */}

            <div className="quotes">
              <div className="quotes-wrapper">
                <Quotes quotes={this.quotesData()} />
              </div>
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

export default CareAndCommitment;
