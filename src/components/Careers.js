import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { TimelineMax as Timeline, Power1 } from "gsap";
import ScrollMagic from "scrollmagic";
import "imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Fade from "react-reveal/Fade";

import MediaQuery from "react-responsive";

import Nav from "./Nav";
import MobileNav from "./MobileNav";

import { MOBILEBP, DESKTOPTRANSITIONBP, DESKTOPBP } from "../constants";

import Footer from "./Footer";

import Axios from "axios";

class Careers extends React.Component {
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
      positionOptions: ["Salon Coordinator", "Stylist", "Apprentice"],
      licenseOptions: ["Yes", "No"],
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      resumeFile: "",
      startDate: "",
      instagramHandle: "",
      license: [],
      position: [],
      question1: "",
      question2: "",
      question3: "",
      question4: "",
      question5: "",
      question6: "",

      // hairLengthOptions: ["Short", "Mid-length", "Long"],
      // hairThicknessOptions: ["Thin", "Average", "Thick"],
      // hairTextureOptions: ["Straight", "Wavy", "Curly", "Coily"],
      // servicesOptions: ["Color", "Cut", "Cut & color"],
      // colorPermanentOptions: ["Yes", "No"],
      // greysOptions: ["Yes", "No"],
      // refreshOptions: ["Refresh", "Change"],
      // previousTreatmentsOptions: [
      //   "None",
      //   "Brazillian Keratin Treatment",
      //   "Henna",
      //   "Stripped Color",
      //   "Vegetable Dye",
      // ],

      // frontPhoto: "",
      // backPhoto: "",
      // inspirationPhoto: "",
      // lastService: "",
      // percentageGrey: "",
      // currentColorDislikes: "",
      // lastTreatment: "",
      // hairLength: [],
      // hairThickness: [],
      // hairTexture: [],
      // services: [],
      // colorPermanent: [],
      // greys: [],
      // refresh: [],
      // previousTreatments: [],
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
      address,
      startDate,
      instagramHandle,
      license,
      position,
      resumeFile,
      question1,
      question2,
      question3,
      question4,
      question5,
      question6,
      // frontPhoto,
      // backPhoto,
      // inspirationPhoto,
      // lastService,
      // percentageGrey,
      // currentColorDislikes,
      // lastTreatment,
      // hairLength,
      // hairThickness,
      // hairTexture,
      // services,
      // colorPermanent,
      // greys,
      // refresh,
      // previousTreatments,
    } = this.state;

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    const data = new FormData();

    data.append("firstName", firstName);
    data.append("lastName", lastName);
    data.append("email", email);
    data.append("phone", phone);
    data.append("address", address);
    data.append("resumeFile", resumeFile);
    data.append("startDate", startDate);
    data.append("instagramHandle", instagramHandle);
    data.append("position", position.join(", "));
    data.append("license", license.join(", "));
    data.append("question1", question1);
    data.append("question2", question2);
    data.append("question3", question3);
    data.append("question4", question4);
    data.append("question5", question5);
    data.append("question6", question6);

    // Axios.post("http://localhost:8080/careers", data, config)
    Axios.post("/careers", data, config)
      .then((response) => {
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
      address,
      resumeFile,
      startDate,
      instagramHandle,
      license,
      position,
      question1,
      question2,
      question3,
      question4,
      question5,
      question6,
      // frontPhoto,
      // backPhoto,
      // inspirationPhoto,
      // lastService,
      // percentageGrey,
      // currentColorDislikes,
      // lastTreatment,
      // hairLength,
      // hairThickness,
      // services,
      // colorPermanent,
      // greys,
      // refresh,
      // previousTreatments,
    } = this.state;

    return (
      <div className="book-now">
        <MediaQuery minWidth={DESKTOPTRANSITIONBP}>
          <Nav active={"careers"} />
        </MediaQuery>

        <MediaQuery maxWidth={MOBILEBP} onChange={this.playMediaChange}>
          <MobileNav expanded={false} />
        </MediaQuery>

        <div className="content-container">
          <div className="content">
            <Fade bottom delay={2000} distance="50px">
              <div className="sub-nav">Careers</div>
            </Fade>
            <Fade bottom delay={2000} distance="50px">
              <div className="intro">
                <h3>
                  Thank you so much for your interest in Saint Rose. Please fill
                  out the following form.
                </h3>
                <h6>
                  If you have any specific questions or concerns please reach
                  out to <a href="">manager@hairbysaintrose.com</a>
                </h6>
              </div>
              <div className="form">
                {/* <span className="form-section"></span> */}
                <div className="checkbox-group">
                  <div className="field-label">
                    What position are you applying for?*
                  </div>

                  {this.renderCheckboxGroup(
                    "position",
                    "positionOptions",
                    false
                  )}
                </div>

                {/* <h4>Contact Information</h4> */}
                <div className="form-row">
                  <div className="form-field">
                    <label className="field-label">
                      First Name*
                      <input
                        type="text"
                        value={firstName}
                        onChange={(event) =>
                          this.handleInput("firstName", event.target.value)
                        }
                      />
                    </label>
                  </div>
                  <div className="form-field">
                    <label className="field-label">
                      Last Name*
                      <input
                        type="text"
                        value={lastName}
                        onChange={(event) =>
                          this.handleInput("lastName", event.target.value)
                        }
                      />
                    </label>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label className="field-label">
                      Email*
                      <input
                        type="text"
                        value={email}
                        onChange={(event) =>
                          this.handleInput("email", event.target.value)
                        }
                      />
                    </label>
                  </div>

                  <div className="form-field">
                    <label className="field-label">
                      Phone*
                      <input
                        type="text"
                        value={phone}
                        onChange={(event) =>
                          this.handleInput("phone", event.target.value)
                        }
                      />
                    </label>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label className="field-label">
                      Address*
                      <input
                        type="text"
                        value={address}
                        onChange={(event) =>
                          this.handleInput("address", event.target.value)
                        }
                      />
                    </label>
                  </div>

                  <div className="form-field">
                    <label className="field-label">
                      When can you start?*
                      <input
                        type="date"
                        value={startDate}
                        onChange={(event) =>
                          this.handleInput("startDate", event.target.value)
                        }
                      />
                    </label>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label className="field-label">
                      Business Instagram handle
                      <input
                        type="text"
                        value={instagramHandle}
                        onChange={(event) =>
                          this.handleInput(
                            "instagramHandle",
                            event.target.value
                          )
                        }
                      />
                    </label>
                  </div>

                  <div className="checkbox-group">
                    <div className="field-label">
                      Do you have a valid Texas Cosmetology License?*
                    </div>

                    {this.renderCheckboxGroup(
                      "license",
                      "licenseOptions",
                      false
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="upload-file-container">
                    <div className="field-label">Resume*</div>
                    <div className="upload-file-wrapper">
                      <button className="upload-file-button">
                        Choose File
                      </button>
                      <input
                        type="file"
                        name="resumeFile"
                        onChange={(event) =>
                          this.handleInput("resumeFile", event.target.files[0])
                        }
                      />
                      <div className="upload-status">
                        {resumeFile ? resumeFile.name : "No File Chosen"}
                      </div>
                    </div>
                  </div>
                </div>

                <span className="form-section"></span>
                <div className="form-field">
                  <label className="field-label">
                    What do you know about Saint Rose?
                    <textarea
                      value={question1}
                      onChange={(event) =>
                        this.handleInput("question1", event.target.value)
                      }
                      maxLength="800"
                    />
                  </label>
                </div>

                <div className="form-field">
                  <label className="field-label">
                    What are you looking for in a salon?
                    <textarea
                      value={question2}
                      onChange={(event) =>
                        this.handleInput("question2", event.target.value)
                      }
                      maxLength="800"
                    />
                  </label>
                </div>

                <div className="form-field">
                  <label className="field-label">
                    Give us an example of exceptional customer service.
                    <textarea
                      value={question3}
                      onChange={(event) =>
                        this.handleInput("question3", event.target.value)
                      }
                      maxLength="800"
                    />
                  </label>
                </div>

                <div className="form-field">
                  <label className="field-label">
                    How do you want to improve yourself in the next year?
                    <textarea
                      value={question4}
                      onChange={(event) =>
                        this.handleInput("question4", event.target.value)
                      }
                      maxLength="800"
                    />
                  </label>
                </div>

                <div className="form-field">
                  <label className="field-label">
                    Who has impacted you the most in your career and how?
                    <textarea
                      value={question5}
                      onChange={(event) =>
                        this.handleInput("question5", event.target.value)
                      }
                      maxLength="800"
                    />
                  </label>
                </div>

                <div className="form-field">
                  <label className="field-label">
                    Is there anything else you would like us to know?
                    <textarea
                      value={question6}
                      onChange={(event) =>
                        this.handleInput("question6", event.target.value)
                      }
                      maxLength="800"
                    />
                  </label>
                </div>

                {/* {(this.state.services.includes("Cut") ||
                  this.state.services.includes("Cut & color")) && (
                  <div>
                    <span className="form-section"></span>
                    <h4>Describe Your Hair</h4>

                    <div className="checkbox-group">
                      <div className="field-label">
                        What is your hair length?*
                      </div>

                      {this.renderCheckboxGroup(
                        "hairLength",
                        "hairLengthOptions",
                        false
                      )}
                    </div>

                    <div className="checkbox-group">
                      <div className="field-label">
                        What is your hair density?*
                      </div>

                      {this.renderCheckboxGroup(
                        "hairThickness",
                        "hairThicknessOptions",
                        false
                      )}
                    </div>

                    <div className="checkbox-group">
                      <div className="field-label">
                        What is your hair texture?*
                      </div>

                      {this.renderCheckboxGroup(
                        "hairTexture",
                        "hairTextureOptions",
                        false
                      )}
                    </div>
                  </div>
                )}

                {(this.state.services.includes("Color") ||
                  this.state.services.includes("Cut & color")) && (
                  <div>
                    <span className="form-section"></span>
                    <h4>Color Questionnaire</h4>

                    <div className="form-field">
                      <label className="field-label">
                        When was your last color service?*
                        <input
                          type="text"
                          value={lastService}
                          onChange={(event) =>
                            this.handleInput("lastService", event.target.value)
                          }
                        />
                      </label>
                    </div>

                    <div className="checkbox-group">
                      <div className="field-label">
                        Is the color permanent?*
                      </div>

                      {this.renderCheckboxGroup(
                        "colorPermanent",
                        "colorPermanentOptions",
                        false
                      )}
                    </div>

                    <div className="checkbox-group">
                      <div className="field-label">
                        Do you have grey hairs to cover?
                      </div>

                      {this.renderCheckboxGroup("greys", "greysOptions", false)}
                    </div>

                    <div className="form-field">
                      <label className="field-label">
                        If yes, please note percentage of grey.*
                        <input
                          type="text"
                          value={percentageGrey}
                          onChange={(event) =>
                            this.handleInput(
                              "percentageGrey",
                              event.target.value
                            )
                          }
                        />
                      </label>
                    </div>

                    <div className="checkbox-group">
                      <div className="field-label">
                        Are we refreshing your current color, or are we making a
                        change?
                      </div>

                      {this.renderCheckboxGroup(
                        "refresh",
                        "refreshOptions",
                        false
                      )}
                    </div>

                    <div className="form-field">
                      <label className="field-label">
                        What don’t you like about your current hair color?*
                        <input
                          type="text"
                          value={currentColorDislikes}
                          onChange={(event) =>
                            this.handleInput(
                              "currentColorDislikes",
                              event.target.value
                            )
                          }
                        />
                      </label>
                    </div>

                    <div className="checkbox-group">
                      <div className="field-label">
                        Have you ever had a Brazillian keratin treatment,
                        stripped your color, or used henna or vegetable dye?*
                        Select all that apply:
                      </div>

                      {this.renderCheckboxGroup(
                        "previousTreatments",
                        "previousTreatmentsOptions",
                        true
                      )}
                    </div>

                    <div className="form-field">
                      <label className="field-label">
                        If yes to any of above, when was the service?
                        <input
                          type="text"
                          value={lastTreatment}
                          onChange={(event) =>
                            this.handleInput(
                              "lastTreatment",
                              event.target.value
                            )
                          }
                        />
                      </label>
                    </div>
                  </div>
                )} */}

                <div className="form-footer">
                  {/* <p>
                    Please read our <Link to="/policies">policies</Link> before
                    coming to Saint Rose. We take what we do very seriously and
                    put these policies in place to respect your time and vice
                    versa!
                  </p>

                  <h4>Lets do this!</h4> */}
                  <button
                    className="submit-button"
                    id="submit-button"
                    onClick={this.handleSubmit}
                  >
                    {submitSuccess
                      ? "Sent!"
                      : submitting
                      ? "Sending..."
                      : "Submit"}
                  </button>
                  {submitError && (
                    <span className="submit-error">
                      {errorMessage
                        ? errorMessage
                        : "We had trouble submitting your request. Please give us a call."}
                    </span>
                  )}
                </div>
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

export default Careers;
