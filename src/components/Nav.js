import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { links } from "../constants";

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
              {links.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={classNames({
                      [activeNavLink]: active === link.active
                    })}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
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
