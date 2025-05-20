import React, { Component } from "react";
import Fade from "react-reveal/Fade";

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: props.initialGalleryIndex
    };
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.loadContent = this.loadContent.bind(this);
  }

  getMediaChangeTimeline() {
    const timeline = new Timeline({ paused: true });
    const nav = document.querySelector(".nav-container");

    timeline.to(nav, 0.7, {
      opacity: 1,
      delay: 0.25
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
      triggerHook: "onLeave"
    })
      .setClassToggle(".nav-container", "scrolled")
      .addTo(this.controller);
  }

  handleNext() {
    const incrementCurrrent = (current, itemCount) => {
      if (current + 1 == itemCount || itemCount == 0) {
        return 0;
      }

      return current + 1;
    };

    this.setState(state => {
      const { current } = this.state;
      const { items } = this.props;

      return {
        current: incrementCurrrent(current, items.length)
      };
    });
  }

  handlePrevious() {
    const incrementCurrrent = (current, itemCount) => {
      if (itemCount == 0) {
        return 0;
      }

      if (current == 0) {
        return itemCount - 1;
      }

      return current - 1;
    };

    this.setState(state => {
      const { current } = this.state;
      const { items } = this.props;
      return {
        current: incrementCurrrent(current, items.length)
      };
    });
  }

  loadContent(item, index) {
    if (item.type === "image") {
      const imageStyles = {
        backgroundImage: `url(${item.url})`
      };
      return (
        <div
          className="image"
          style={imageStyles}
          key={`${item.url}${index}`}
        />
      );
    }

    return (
      <div className="video-container">
        <video className="video" key={`${item.url}${index}`} controls>
          <source src={item.url}></source>
        </video>
      </div>
    );
  }

  render() {
    const { current } = this.state;
    const { items, closeHandler, initialGalleryIndex } = this.props;

    return (
      <div className="gallery">
        <div className="gallery-content-wrapper">
          <Fade bottom distance="50px">
            <div className="gallery-content-container">
              <button className="right" onClick={this.handleNext}>
                <div className="arrow-right"></div>
              </button>
              <button className="left" onClick={this.handlePrevious}>
                <div className="arrow-left"></div>
              </button>
              <button className="close" onClick={() => closeHandler()}></button>
              <div className="asset-sizer">
                {this.loadContent(items[current], current)}
              </div>
            </div>
          </Fade>
        </div>
      </div>
    );
  }
}

export default Gallery;
