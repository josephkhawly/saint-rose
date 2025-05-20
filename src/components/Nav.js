import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import classNames from "classnames";

// import WhoWeAre from "./WhoWeAre";

// function Index() {
//   return <h2>Home</h2>;
// }

// function Users() {
//   return <h2>Users</h2>;
// }

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
              {/* <Link to="/" className={active === "home" ? activeNavLink : null}> */}
              Saint Rose
            </Link>
          </div>
          <div>
            <ul>
              <li>
                {/* <Link
                  to="/who-we-are"
                  className={classNames({
                    [activeNavLink]:
                      active === "who-we-are" || active === "meet-the-team",
                    [disabled]: active === "who-we-are"
                  })}
                > */}
                <Link
                  to="/contact"
                  className={classNames({
                    [activeNavLink]: active === "contact",
                    // [disabled]: active === "who-we-are"
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
                    // [disabled]: active === "what-we-do"
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
                    // [disabled]: active === "why-we-do-it"
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
                    // [disabled]: active === "why-we-do-it"
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
                    // [disabled]: active === "why-we-do-it"
                  })}
                >
                  about us
                </Link>
              </li>
              {/* <li>
                <Link
                  to={{
                    pathname:
                      "https://hairbysaintrose.direct.salonservicegroup.com",
                  }}
                  target="_blank"
                  className={classNames({
                    [activeNavLink]: active === "shop",
                    // [disabled]: active === "what-we-do"
                  })}
                >
                  shop
                </Link>
              </li> */}

              {/* <li>
                <Link
                  to="/careers"
                  className={classNames({
                    [activeNavLink]: active === "careers",
                    // [disabled]: active === "why-we-do-it"
                  })}
                >
                  careers
                </Link>
              </li> */}

              <li>
                {/* <a href={`/${active}/#book-now`}> */}
                {/* <Link
                  to={`/${active}/#book-now`}
                  className={classNames("book-now-button", {
                    [activeNavLink]: active === "appointments",
                    // [disabled]: active === "book-now"
                  })}
                >
                  appointments
                </Link> */}
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
