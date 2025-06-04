import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

function Nav({ active }) {
  const activeNavLink = "active-nav-link";
  const disabled = "disable-nav-link";
  return (
    <div className="nav-container">
      <div className={classNames("nav")}>
        <div className="nav-content">
          <div className="nav-logo">
            <Link
              to="/"
              className={classNames({
                [activeNavLink]: active === "home",
                [disabled]: active === "home",
              })}
            >
              Saint Rose
            </Link>
          </div>
          <div>
            <ul>
              <li>
                <Link
                  to="/contact"
                  className={classNames({
                    [activeNavLink]: active === "contact",
                  })}
                >
                  contact
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className={classNames({
                    [activeNavLink]: active === "services",
                  })}
                >
                  services
                </Link>
              </li>
              <li>
                <Link
                  to="/policies"
                  className={classNames({
                    [activeNavLink]: active === "policies",
                  })}
                >
                  policies
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className={classNames({
                    [activeNavLink]: active === "blog",
                  })}
                >
                  blog
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={classNames({
                    [activeNavLink]: active === "about",
                  })}
                >
                  about us
                </Link>
              </li>
              <li>
                <a
                  className="book-now-button"
                  onClick={() => window.blvd.openBookingWidget()}
                >
                  book now
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="divider" />
      </div>
    </div>
  );
}

export default Nav;
