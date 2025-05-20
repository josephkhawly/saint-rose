import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import classNames from "classnames";

class MobileNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleOpenToggle = this.handleOpenToggle.bind(this);
  }

  componentWillUnmount() {
    document.body.style.overflow = "scroll";
  }

  handleOpenToggle() {
    if (this.state.open) {
      document.body.style.overflow = "scroll";
    } else {
      document.body.style.overflow = "hidden";
    }

    this.setState((state) => {
      return {
        open: !state.open,
      };
    });
  }

  render() {
    const { expanded } = this.props;
    const { open } = this.state;

    return (
      <div
        className={classNames("nav-container", {
          expanded: expanded,
          // open: true
          open: open,
        })}
      >
        {/* <div className={classNames("back-panel", backgroundColor)} /> */}
        <div className={classNames("nav")}>
          <div className="nav-content">
            <div className="nav-bar">
              <NavLink exact={true} to="/">
                <div className="nav-logo">Saint Rose</div>
              </NavLink>
              <button onClick={() => this.handleOpenToggle()}>
                <div className="hamburger">
                  <div className="hamburger-box">
                    <div className="hamburger-inner" />
                  </div>
                </div>
              </button>
            </div>
            <div className="nav-items">
              <ul className="links">
                <li>
                  <Link to="/contact">
                    <div>Contact</div>
                  </Link>
                </li>
                <li>
                  <Link to="/services">
                    <div>Services</div>
                  </Link>
                </li>
                <li>
                  <Link to="/policies">
                    <div>Policies</div>
                  </Link>
                </li>
                <li>
                  <Link to="/blog">
                    <div>Blog</div>
                  </Link>
                </li>
                <li>
                  <Link to="/about">
                    <div>About us</div>
                  </Link>
                </li>
                <li>
                  <a
                    className="book-now-button"
                    onClick={() => {
                      window.blvd.openBookingWidget();
                      this.handleOpenToggle();
                    }}
                  >
                    <div>Book now</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MobileNav;
