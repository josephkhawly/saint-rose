import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { TimelineMax as Timeline, Power1 } from "gsap";
import ScrollMagic from "scrollmagic";
import Axios from "axios";

import { TransitionGroup, CSSTransition } from "react-transition-group";
import Fade from "react-reveal/Fade";

import MediaQuery from "react-responsive";

import Nav from "./Nav";
import MobileNav from "./MobileNav";

import { MOBILEBP, DESKTOPTRANSITIONBP, DESKTOPBP } from "../constants";
import Footer from "./Footer";

import {
  getAllEntriesByContentTypeApiEndpoint,
  getEntryApiEndpoint,
  processEntryListResponse,
  processSingletonWrappedResponse,
} from "../contentful";

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.controller = new ScrollMagic.Controller();
    this.getMediaChangeTimeline = this.getMediaChangeTimeline.bind(this);
    this.playMediaChange = this.playMediaChange.bind(this);

    this.state = {
      blogItems: [],
      assets: [],
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

    const options = [
      { key: "order", value: "-fields.date" },
      { key: "limit", value: "10" },
    ];

    const newsItemsEndpoint = getAllEntriesByContentTypeApiEndpoint(
      "blogPost",
      options
    );

    Axios.get(newsItemsEndpoint)
      .then((result) => {
        console.log("result: ", result);
        const expectedFields = ["title", "date", "headerImage", "featured"];

        const fetchedBlogItems = processEntryListResponse(
          result.data,
          expectedFields
        );

        console.log("fetchedBlogItems: ", fetchedBlogItems);

        this.setState((state) => {
          return {
            blogItems: fetchedBlogItems.entries,
            assets: [...state.assets, ...fetchedBlogItems.assets],
          };
        });
      })
      .catch((error) => console.log("error: ", error));
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

  formatIso(isoString) {
    const date = new Date(isoString);
    const options = { month: "short", day: "numeric", year: "numeric" };
    const formattedDate = date.toLocaleString("en-US", options);

    return formattedDate;
  }

  renderFeatured() {
    const { blogItems } = this.state;

    const featuredPost = blogItems.find(
      (blogItem) => blogItem.featured == true
    );

    // console.log("featuredPost: ", featuredPost);

    if (featuredPost) {
      return (
        <div className="featured-blog-post">
          <div className="post-image-container">
            <div
              className="image"
              style={{
                backgroundImage: `url(${featuredPost.headerImage})`,
              }}
            ></div>
          </div>
          <h5>FEATURED POST: {this.formatIso(featuredPost.date)}</h5>
          <h3>{featuredPost.title}</h3>
          <Link to={`/blog/${featuredPost.id}`}>
            <div className="nav-arrow" />
          </Link>
        </div>
      );
    }
  }

  renderFeed() {
    const { blogItems } = this.state;

    const featuredPostIndex = blogItems.findIndex(
      (blogItem) => blogItem.featured == true
    );

    let filteredBlogPosts = [];

    if (featuredPostIndex > -1) {
      filteredBlogPosts = blogItems.toSpliced(featuredPostIndex, 1);
    } else {
      filteredBlogPosts = blogItems;
    }

    return (
      <div className="blog-posts">
        <div className="c1">
          {this.renderPostsForColumn([0, 3, 6], filteredBlogPosts)}
        </div>

        <div className="c2">
          {this.renderPostsForColumn([1, 4, 7], filteredBlogPosts)}
        </div>

        <div className="c3">
          {this.renderPostsForColumn([2, 5, 8], filteredBlogPosts)}
        </div>
      </div>
    );
  }

  renderMobileFeed() {
    const { blogItems } = this.state;

    const featuredPostIndex = blogItems.findIndex(
      (blogItem) => blogItem.featured == true
    );

    let filteredBlogPosts = [];

    if (featuredPostIndex > -1) {
      filteredBlogPosts = blogItems.toSpliced(featuredPostIndex, 1);
    } else {
      filteredBlogPosts = blogItems;
    }

    return (
      <div className="blog-posts">
        {filteredBlogPosts.map((blogItem, index) => {
          return (
            <div key={index} className="regular-blog-post">
              <div className="post-image-container">
                <div
                  className="image"
                  style={{
                    backgroundImage: `url(${blogItem.headerImage})`,
                  }}
                ></div>
              </div>
              <h5>{this.formatIso(blogItem.date)}</h5>
              <h3>{blogItem.title}</h3>
              <Link to={`/blog/${blogItem.id}`}>
                <div className="nav-arrow" />
              </Link>
            </div>
          );
        })}
      </div>
    );
  }

  renderPostsForColumn(indexes, posts) {
    return posts.map((blogItem, index) => {
      if (indexes.includes(index)) {
        return (
          <div key={index} className="regular-blog-post">
            <div className="post-image-container">
              <div
                className="image"
                style={{
                  backgroundImage: `url(${blogItem.headerImage})`,
                }}
              ></div>
            </div>
            <h5>{this.formatIso(blogItem.date)}</h5>
            <h3>{blogItem.title}</h3>
            <Link to={`/blog/${blogItem.id}`}>
              <div className="nav-arrow" />
            </Link>
          </div>
        );
      }

      return;
    });
  }

  render() {
    return (
      <div className="blog">
        <MediaQuery minWidth={DESKTOPTRANSITIONBP}>
          <Nav active={"blog"} />
        </MediaQuery>

        <MediaQuery maxWidth={MOBILEBP} onChange={this.playMediaChange}>
          <MobileNav expanded={false} />
        </MediaQuery>

        <div className="content-container">
          <div className="content">
            <Fade bottom delay={2000} distance="50px">
              <div className="content-body">
                {this.renderFeatured()}

                <MediaQuery minWidth={DESKTOPTRANSITIONBP}>
                  {this.renderFeed()}
                </MediaQuery>
                <MediaQuery maxWidth={MOBILEBP}>
                  {this.renderMobileFeed()}
                </MediaQuery>
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

export default Blog;
