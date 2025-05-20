import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { TimelineMax as Timeline, Power1 } from "gsap";
import ScrollMagic from "scrollmagic";
import Axios from "axios";
import "imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Fade from "react-reveal/Fade";

import MediaQuery from "react-responsive";

import Nav from "./Nav";
import MobileNav from "./MobileNav";

import { MOBILEBP, DESKTOPTRANSITIONBP, DESKTOPBP } from "../constants";

import { generateOptions } from "../richText";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import Footer from "./Footer";

import {
  getAllEntriesByContentTypeApiEndpoint,
  getEntryApiEndpoint,
  processEntryResponse,
  processEntryListResponse,
  processSingletonWrappedResponse,
} from "../contentful";

class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.controller = new ScrollMagic.Controller();
    this.getMediaChangeTimeline = this.getMediaChangeTimeline.bind(this);
    this.playMediaChange = this.playMediaChange.bind(this);

    this.state = {
      blogPost: {},
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

    const blogPostId = this.props.match.params.id;
    console.log("blogPostId: ", blogPostId);

    const blogPostEndpoint = getEntryApiEndpoint(blogPostId);

    Axios.get(blogPostEndpoint)
      .then((result) => {
        // console.log("result: ", result);
        const expectedFields = ["title", "date", "headerImage", "body"];

        const fetchedBlogPost = processEntryResponse(
          result.data,
          expectedFields
        );

        console.log("fetchedBlogPost: ", fetchedBlogPost);

        this.setState((state) => {
          return {
            blogPost: fetchedBlogPost.entry,
            assets: fetchedBlogPost.assets,
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

  render_post() {
    const { blogItems } = this.state;

    const featuredPost = blogItems.find(
      (blogItem) => blogItem.featured == true
    );

    if (featuredPost) {
      return (
        <div className="featured-blog-item">
          <div className="news-item-wrapper">
            <div className="news-image-container">
              <div
                className="image"
                style={{
                  backgroundImage: `url(${featuredPost.headerImage})`,
                }}
              ></div>
            </div>
            <h5>{featuredPost.date}</h5>
            <h3>{featuredPost.title}</h3>
            <div className="description-container">
              <p>{featuredPost.summary}</p>
              <Link to={`/blog/${featuredPost.id}`}>
                <div className="nav-arrow" />
              </Link>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    const options = generateOptions(this.state.assets);
    const { blogPost } = this.state;
    return (
      <div className="blog-post">
        <MediaQuery minWidth={DESKTOPTRANSITIONBP}>
          <Nav active={"blog"} />
        </MediaQuery>

        <MediaQuery maxWidth={MOBILEBP} onChange={this.playMediaChange}>
          <MobileNav expanded={false} />
        </MediaQuery>

        <div className="content-container">
          <div className="content">
            <Fade bottom delay={2000} distance="50px">
              <div className="content-header">
                <div className="featured-image-container">
                  <div
                    className="image"
                    style={{
                      backgroundImage: `url(${blogPost.headerImage})`,
                    }}
                  />
                </div>
              </div>
              <div className="content-body">
                <div className="postTitle">{blogPost.title}</div>
                <div className="rich-text">
                  {console.log("hello")}
                  {console.log(blogPost.body)}
                  {documentToReactComponents(blogPost.body, options)}
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

export default BlogPost;
