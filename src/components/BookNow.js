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

import Axios from "axios";

class BookNow extends React.Component {
  constructor(props) {
    super(props);
    this.controller = new ScrollMagic.Controller();
    this.getMediaChangeTimeline = this.getMediaChangeTimeline.bind(this);
    this.playMediaChange = this.playMediaChange.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.updateCheckboxGroup = this.updateCheckboxGroup.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      submitting: false,
      submitError: false,
      submitSuccess: false,
      errorMessage: "",
      hairLengthOptions: ["Short", "Mid-length", "Long"],
      hairThicknessOptions: ["Thin", "Average", "Thick"],
      hairTextureOptions: ["Straight", "Wavy", "Curly", "Coily"],
      servicesOptions: ["Color", "Cut", "Cut & color"],
      colorPermanentOptions: ["Yes", "No"],
      greysOptions: ["Yes", "No"],
      refreshOptions: ["Refresh", "Change"],
      previousTreatmentsOptions: [
        "None",
        "Brazillian Keratin Treatment",
        "Henna",
        "Stripped Color",
        "Vegetable Dye",
      ],
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      frontPhoto: "",
      backPhoto: "",
      inspirationPhoto: "",
      lastService: "",
      percentageGrey: "",
      currentColorDislikes: "",
      lastTreatment: "",
      hairLength: [],
      hairThickness: [],
      hairTexture: [],
      services: [],
      colorPermanent: [],
      greys: [],
      refresh: [],
      previousTreatments: [],
    };
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

  handleInput(field, value) {
    this.setState((state) => {
      return {
        [field]: value,
      };
    });
  }

  updateCheckboxGroup(parent, target, multipleAllowed) {
    if (multipleAllowed) {
      this.setState((state) => {
        const targetIndex = state[parent].indexOf(target);

        let staging = {};

        if (targetIndex > -1) {
          staging = {
            [parent]: [
              ...state[parent].slice(0, targetIndex),
              ...state[parent].slice(targetIndex + 1),
            ],
          };
        } else {
          staging = {
            [parent]: [...state[parent], ...[target]],
          };
        }

        return { ...state, ...staging };
      });
    } else {
      this.setState((state) => {
        const targetIndex = state[parent].indexOf(target);
        if (targetIndex > -1) {
          return {
            [parent]: [],
          };
        } else {
          return {
            [parent]: [target],
          };
        }
      });
    }
  }

  handleSubmit() {
    document.getElementById("submit-button").disabled = true;

    this.setState((state) => {
      return {
        submitting: true,
      };
    });

    const {
      firstName,
      lastName,
      email,
      phone,
      frontPhoto,
      backPhoto,
      inspirationPhoto,
      lastService,
      percentageGrey,
      currentColorDislikes,
      lastTreatment,
      hairLength,
      hairThickness,
      hairTexture,
      services,
      colorPermanent,
      greys,
      refresh,
      previousTreatments,
    } = this.state;

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    const data = new FormData();

    data.append("firstName", firstName);
    data.append("lastName", lastName);
    data.append("email", email);
    data.append("phone", phone);
    data.append("frontPhoto", frontPhoto);
    data.append("backPhoto", backPhoto);
    data.append("inspirationPhoto", inspirationPhoto);
    data.append("lastService", lastService);
    data.append("services", services.join(", "));

    if (services.includes("Cut")) {
      data.append("hairLength", hairLength.join(", "));
      data.append("hairThickness", hairThickness.join(", "));
      data.append("hairTexture", hairTexture.join(", "));
      // nulls
      data.append("percentageGrey", "");
      data.append("currentColorDislikes", "");
      data.append("lastTreatment", "");
      data.append("colorPermanent", [].join(", "));
      data.append("greys", [].join(", "));
      data.append("refresh", [].join(", "));
      data.append("previousTreatments", [].join(", "));
    } else if (services.includes("Color")) {
      data.append("percentageGrey", percentageGrey);
      data.append("currentColorDislikes", currentColorDislikes);
      data.append("lastTreatment", lastTreatment);
      data.append("colorPermanent", colorPermanent.join(", "));
      data.append("greys", greys.join(", "));
      data.append("refresh", refresh.join(", "));
      data.append("previousTreatments", previousTreatments.join(", "));
      // nulls
      data.append("hairLength", [].join(", "));
      data.append("hairThickness", [].join(", "));
      data.append("hairTexture", [].join(", "));
    } else if (services.includes("Cut & color")) {
      data.append("hairLength", hairLength.join(", "));
      data.append("hairThickness", hairThickness.join(", "));
      data.append("hairTexture", hairTexture.join(", "));

      data.append("percentageGrey", percentageGrey);
      data.append("currentColorDislikes", currentColorDislikes);
      data.append("lastTreatment", lastTreatment);
      data.append("colorPermanent", colorPermanent.join(", "));
      data.append("greys", greys.join(", "));
      data.append("refresh", refresh.join(", "));
      data.append("previousTreatments", previousTreatments.join(", "));
    } else {
      data.append("hairLength", [].join(", "));
      data.append("hairThickness", [].join(", "));
      data.append("hairTexture", [].join(", "));

      data.append("percentageGrey", "");
      data.append("currentColorDislikes", "");
      data.append("lastTreatment", "");
      data.append("colorPermanent", [].join(", "));
      data.append("greys", [].join(", "));
      data.append("refresh", [].join(", "));
      data.append("previousTreatments", [].join(", "));
    }

    // Axios.post("http://localhost:8080/book", data, config)
    Axios.post("/book", data, config)
      .then((response) => {
        // console.log("response: ", response);
        if (response.data.status === "success") {
          this.setState((state) => {
            return {
              submitting: false,
              submitSuccess: true,
            };
          });
        } else {
          this.setState((state) => {
            return {
              submitting: false,
              submitError: true,
              errorMessage: response.data.message
                ? response.data.message
                : "We had trouble submitting your request. Please give us a call.",
            };
          });
          document.getElementById("submit-button").disabled = false;
        }
      })
      .catch((error) => {
        // console.log("error: ", error);
        this.setState((state) => {
          return {
            submitting: false,
            submitError: true,
            errorMessage:
              "We had trouble submitting your request. Please give us a call.",
          };
        });
        document.getElementById("submit-button").disabled = false;
      });
  }

  renderCheckboxGroup(parent, options, multipleAllowed) {
    return (
      <div className="options-group">
        {this.state[options].map((option) => {
          return (
            <label className="option-checkbox" key={`${parent}${option}`}>
              <input
                type="checkbox"
                // name={field}
                // value={filters[field]}
                // checked={!!filters[field]}
                name={option}
                // value={true}
                checked={this.state[parent].includes(option)}
                onChange={(event) =>
                  this.updateCheckboxGroup(
                    parent,
                    event.target.name,
                    multipleAllowed
                  )
                }
              />
              <span className="checkbox"></span>
              <span className="text">
                {option}
                {/* {this.parseDisplayValues(field)} */}
              </span>
            </label>
          );
        })}
      </div>
    );
  }

  render() {
    const {
      submitting,
      submitError,
      submitSuccess,
      errorMessage,
      firstName,
      lastName,
      email,
      phone,
      frontPhoto,
      backPhoto,
      inspirationPhoto,
      lastService,
      percentageGrey,
      currentColorDislikes,
      lastTreatment,
      hairLength,
      hairThickness,
      services,
      colorPermanent,
      greys,
      refresh,
      previousTreatments,
    } = this.state;

    return (
      <div className="book-now">
        <MediaQuery minWidth={DESKTOPTRANSITIONBP}>
          <Nav active={"appointments"} />
        </MediaQuery>

        <MediaQuery maxWidth={MOBILEBP} onChange={this.playMediaChange}>
          <MobileNav expanded={false} />
        </MediaQuery>

        <div className="content-container">
          <div className="content">
            <Fade bottom delay={2000} distance="50px">
              <div className="sub-nav">Appointments</div>
            </Fade>
            <Fade bottom delay={2000} distance="50px">
              <div className="intro">
                <h3>
                  Ready for the hair of your dreams? Fill the form below to book
                  an appointment.
                </h3>
                <h6>
                  For all other inquiries please email{" "}
                  <a href="">info@hairbysaintrose.com</a>
                </h6>
              </div>
              <div className="form">
                <iframe
                  id="frameBooking"
                  src="https://na01.envisiongo.com/a/HairBySaintRose/OnlineBookingFrame.aspx"
                  width="100%"
                  height="400px"
                  frameBorder="0"
                  allowTransparency="true"
                ></iframe>
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

export default BookNow;
