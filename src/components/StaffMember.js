import React from "react";
import classNames from "classnames";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { TimelineMax as Timeline, Power1 } from "gsap";
import ScrollMagic from "scrollmagic";
import "imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap";

import Fade from "react-reveal/Fade";
import axios from "axios";

// import { Tween, Timeline } from "react-gsap";
// import { Controller, Scene } from "react-scrollmagic";

function StaffMember({ staffMemberData, staffMemberSelectHandler }) {
  const {
    name,
    role,
    photoSmall,
    photoLarge,
    bio,
    video,
    instagram,
    location,
  } = staffMemberData;
  const nameDecoration = video ? "name-with-video" : "name-with-bio";
  return (
    <div className="staff-member">
      <div className="photo-container">
        <div
          className="photo"
          style={{ backgroundImage: `url(https:${photoSmall})` }}
          onClick={() => staffMemberSelectHandler(staffMemberData)}
        />
        <div
          className="information"
          onClick={() => staffMemberSelectHandler(staffMemberData)}
        >
          <div className={classNames({ [nameDecoration]: true })}>{name}</div>
          <div className="role">{role}</div>
          <div className="location">{location}</div>
        </div>
        {instagram && (
          <div className="instagram">
            <span>
              <a href={`https://www.instagram.com/${instagram}/`}>
                @{instagram}
              </a>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default StaffMember;
