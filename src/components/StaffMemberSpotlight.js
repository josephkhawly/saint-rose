import React from "react";

import SlideAndFade from './SlideAndFade'

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
          <SlideAndFade delay={350} distance="150px">
            <div className="text">
              <button className="close" onClick={() => closeHandler()}>
                <img src="/images/close.svg" />
              </button>
              <h3>{name}</h3>
              <h5>{role}</h5>
              {documentToReactComponents(bio)}
            </div>
          </SlideAndFade>
        </div>
      </div>
    </div>
  );
}

function MobileBio(name, role, photoLarge, bio, closeHandler) {
  return (
    <div className="mobile-bio-container">
      <div className="text-container">
        <SlideAndFade delay={350} distance="150px">
          <div className="text">
            <button className="close" onClick={() => closeHandler()}>
              <img src="/images/close.svg" />
            </button>
            <h3>{name}</h3>
            <h5>{role}</h5>
            {documentToReactComponents(bio)}
          </div>
        </SlideAndFade>
      </div>
    </div>
  );
}

function StaffMemberSpotlight({ staffMemberDetails, closeHandler }) {
  const { name, role, photoLarge, bio, video } = staffMemberDetails;
  return (
    <div className="staff-member-spotlight">
      <MediaQuery minWidth={DESKTOPTRANSITIONBP}>
          {video
            ? Video(video, closeHandler)
            : Bio(name, role, photoLarge, bio, closeHandler)}
      </MediaQuery>

      <MediaQuery maxWidth={MOBILEBP}>
          {video
            ? Video(video, closeHandler)
            : MobileBio(name, role, photoLarge, bio, closeHandler)}
      </MediaQuery>
    </div>
  );
}

export default StaffMemberSpotlight;
