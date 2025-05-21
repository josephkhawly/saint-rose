import React from "react";


import Fade from "react-reveal/Fade";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import MediaQuery from "react-responsive";

import { MOBILEBP, DESKTOPTRANSITIONBP } from "../constants";

function Video(link, closeHandler) {
  return (
    <div className="video-container">
      <div className="inner-container">
        <button className="close" onClick={() => closeHandler()}>
          <img src="/images/close.svg" />
        </button>
        <video autoPlay controls>
          <source src={link} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

function Bio(name, role, photoLarge, bio, closeHandler) {
  return (
    <div className="bio-container">
      <div className="photo-container">
        <div
          className="photo"
          style={{ backgroundImage: `url(${photoLarge})` }}
        />
      </div>
      <div className="inner-container">
        <div className="text-container">
          <Fade bottom delay={350} distance="150px">
            <div className="text">
              <button className="close" onClick={() => closeHandler()}>
                <img src="/images/close.svg" />
              </button>
              <h3>{name}</h3>
              <h5>{role}</h5>
              {documentToReactComponents(bio)}
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
}

function MobileBio(name, role, photoLarge, bio, closeHandler) {
  return (
    <div className="mobile-bio-container">
      <div className="text-container">
        <Fade bottom delay={350} distance="150px">
          <div className="text">
            <button className="close" onClick={() => closeHandler()}>
              <img src="/images/close.svg" />
            </button>
            <h3>{name}</h3>
            <h5>{role}</h5>
            {documentToReactComponents(bio)}
          </div>
        </Fade>
      </div>
    </div>
  );
}

function StaffMemberSpotlight({ staffMemberDetails, closeHandler }) {
  const { name, role, photoSmall, photoLarge, bio, video } = staffMemberDetails;
  return (
    <div className="staff-member-spotlight">
      <MediaQuery minWidth={DESKTOPTRANSITIONBP}>
        <Fade bottom distance="50px">
          {video
            ? Video(video, closeHandler)
            : Bio(name, role, photoLarge, bio, closeHandler)}
        </Fade>
      </MediaQuery>

      <MediaQuery maxWidth={MOBILEBP}>
        <Fade bottom distance="50px">
          {video
            ? Video(video, closeHandler)
            : MobileBio(name, role, photoLarge, bio, closeHandler)}
        </Fade>
      </MediaQuery>
    </div>
  );
}

export default StaffMemberSpotlight;
