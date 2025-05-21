import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { TimelineMax as Timeline, Power1 } from "gsap";
import ScrollMagic from "scrollmagic";

import { TransitionGroup, CSSTransition } from "react-transition-group";
import Fade from "react-reveal/Fade";

import MediaQuery from "react-responsive";

import Nav from "./Nav";
import MobileNav from "./MobileNav";

import { MOBILEBP, DESKTOPTRANSITIONBP, DESKTOPBP } from "../constants";
import Footer from "./Footer";

class Covid extends React.Component {
  constructor(props) {
    super(props);
    this.controller = new ScrollMagic.Controller();
    this.getMediaChangeTimeline = this.getMediaChangeTimeline.bind(this);
    this.playMediaChange = this.playMediaChange.bind(this);

    this.state = {};
  }

  componentDidMount() {
    new ScrollMagic.Scene({
      triggerElement: ".content",
      offset: 50,
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

  render() {
    return (
      <div className="covid">
        <MediaQuery minWidth={DESKTOPTRANSITIONBP}>
          <Nav active={"covid"} />
        </MediaQuery>

        <MediaQuery maxWidth={MOBILEBP} onChange={this.playMediaChange}>
          <MobileNav expanded={false} />
        </MediaQuery>

        <div className="content-container">
          <Fade bottom delay={2000} distance="50px">
            <div className="content">
              <div className="sub-nav">COVID-19 POLICIES</div>

              <div className="text-content">
                <h3>
                  We have guidelines set up for your protection, and for ours.
                </h3>
                <div className="body">
                  <h4>GUEST ARRIVALS</h4>
                  <ul>
                    <li>
                      Upon your arrival, please take notice of the signage
                      outside the salon. The signage will list instructions on
                      how to check in for your appointment.
                    </li>
                    <li>If you arrive early, please wait in your car.</li>
                    <li>
                      At this time, only one guest per appointment, including
                      children. If your child sees a stylist at the salon we can
                      make arrangements for their visit.
                    </li>
                    <li>
                      Unfortunately we are not offering our beautiful tea
                      service at this time. No outside beverages, extra
                      clothing, or accessories will be allowed in the salon.
                    </li>

                    <li>
                      Masks MUST be worn at all times. If you do not have a
                      mask, we have them available for purchase.
                    </li>
                  </ul>

                  <h4>Checking-in</h4>
                  <ul>
                    <li>
                      Once you have checked in, our front desk will notify you
                      when your stylist is ready to see you.
                    </li>
                    <li>
                      Upon entry, your stylist will greet you and we will ask
                      you to sanitize your hands and sign a COVID-19
                      questionnaire.
                    </li>
                    <li>
                      If you have been in contact with anyone that has tested
                      positive for COVID-19, traveled abroad, or have a fever or
                      flu-like symptoms within the last 15 days, you will need
                      to reschedule your appointment.
                    </li>
                    <li>
                      We will do a quick temperature check. If your temperature
                      is above 99.8, we will ask you to reschedule your
                      appointment.
                    </li>
                    <li>Masks MUST be worn at all times during services.</li>
                    <li>
                      We have set up several sanitation stations around the
                      salon for your use.
                    </li>
                  </ul>
                  <span className="list-note">
                    Please note: we have added a PPE Fee of $5 to all clients.
                  </span>

                  <h4>Checking out</h4>
                  <p>
                    Please be sure to bring a credit card only. We have rolled
                    out a contact-less checkout process, so we will not accept
                    cash or checks at this time.
                  </p>

                  <h4>Booking</h4>
                  <p>
                    Our front desk team has contacted all clients with missed
                    appointments from March-May, as well as all clients on our
                    waitlist.
                  </p>
                  <p>
                    If you have not had the chance to book, please contact us at{" "}
                    <a href="mailto:info@hairbysaintrose.com">
                      info@hairbysaintrose.com
                    </a>{" "}
                    or 346-802-2183.
                  </p>

                  <p>
                    <span className="note">
                      For all new clients inquiring about a consultation: We are
                      scheduling virtual consultations with our stylists. We
                      will be in touch with you directly.
                    </span>
                  </p>

                  <h4>CANCELLATION POLICY</h4>
                  <p>
                    Due to cleaning times and limited client capacity,
                    appointments cancelled less than 48 hours in advance are
                    subject to a 50% cancellation fee of services booked, and
                    no-shows are subject to a 100% fee of services booked.
                  </p>
                  <p>
                    Call or email the front desk team to cancel at anytime at{" "}
                    <a href="mailto:info@hairbysaintrose.com">
                      info@hairbysaintrose.com
                    </a>{" "}
                    or 346-802-2183
                  </p>
                </div>
              </div>
              <Footer delay={0} />
            </div>
          </Fade>
        </div>

        <div className="entrance" />
        <div className="exit" />
        <div className="exit-2" />
      </div>
    );
  }
}

export default Covid;
