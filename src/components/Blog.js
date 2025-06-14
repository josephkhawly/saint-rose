import React, { useState, useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import Fade from 'react-reveal/Fade'
import MediaQuery from 'react-responsive'
import Nav from './Nav'
import { MOBILEBP, DESKTOPTRANSITIONBP } from '../constants'
import Footer from './Footer'
import { getAllEntriesByContentTypeApiEndpoint, processEntryListResponse } from '../contentful'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const formatIso = (isoString) => {
  const date = new Date(isoString)
  const options = { month: 'short', day: 'numeric', year: 'numeric' }
  const formattedDate = date.toLocaleString('en-US', options)
  return formattedDate
}

function BlogPost({ blogItem }) {
  return (
    <div className='regular-blog-post'>
      <div className='post-image-container'>
        <div className='image' style={{ backgroundImage: `url(${blogItem.headerImage})` }}></div>
      </div>
      <h5>{formatIso(blogItem.date)}</h5>
      <h3>{blogItem.title}</h3>
      <Link to={`/blog/${blogItem.id}`}>
        <div className='nav-arrow' />
      </Link>
    </div>
  )
}

function Blog() {
  const [blogItems, setBlogItems] = useState([])
  const [assets, setAssets] = useState([])
  const container = useRef(null)

  useEffect(() => {
    const options = [
      { key: 'order', value: '-fields.date' },
      { key: 'limit', value: '10' },
    ]
    const newsItemsEndpoint = getAllEntriesByContentTypeApiEndpoint('blogPost', options)
    Axios.get(newsItemsEndpoint)
      .then((result) => {
        const expectedFields = ['title', 'date', 'headerImage', 'featured']
        const fetchedBlogItems = processEntryListResponse(result.data, expectedFields)
        setBlogItems(fetchedBlogItems.entries)
        setAssets((prevAssets) => [...prevAssets, ...fetchedBlogItems.assets])
      })
      .catch((error) => console.log('error: ', error))
  }, [])

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: '.content',
        start: 'top+=50 top',
        end: 'bottom top',
        toggleClass: { targets: '.nav-container', className: 'scrolled' },
        scrub: false,
      })
    },
    { scope: container },
  )

  const renderFeatured = () => {
    const featuredPost = blogItems.find((blogItem) => blogItem.featured == true)
    if (featuredPost) {
      return (
        <div className='featured-blog-post'>
          <div className='post-image-container'>
            <div
              className='image'
              style={{ backgroundImage: `url(${featuredPost.headerImage})` }}
            ></div>
          </div>
          <h5>FEATURED POST: {formatIso(featuredPost.date)}</h5>
          <h3>{featuredPost.title}</h3>
          <Link to={`/blog/${featuredPost.id}`}>
            <div className='nav-arrow' />
          </Link>
        </div>
      )
    }
  }

  const renderPostsForColumn = (indexes, posts) => {
    return posts
      .filter((blogItem, index) => indexes.includes(index))
      .map((blogItem, index) => {
        return <BlogPost key={index} blogItem={blogItem} />
      })
  }

  const featuredPostIndex = blogItems.findIndex((blogItem) => blogItem.featured == true)
  let filteredBlogPosts = []
  if (featuredPostIndex > -1) {
    filteredBlogPosts = blogItems.toSpliced(featuredPostIndex, 1)
  } else {
    filteredBlogPosts = blogItems
  }

  const renderFeed = () => {
    return (
      <div className='blog-posts'>
        <div className='c1'>{renderPostsForColumn([0, 3, 6], filteredBlogPosts)}</div>
        <div className='c2'>{renderPostsForColumn([1, 4, 7], filteredBlogPosts)}</div>
        <div className='c3'>{renderPostsForColumn([2, 5, 8], filteredBlogPosts)}</div>
      </div>
    )
  }

  const renderMobileFeed = () => {
    return (
      <div className='blog-posts'>
        {filteredBlogPosts.map((blogItem, index) => {
          return <BlogPost key={index} blogItem={blogItem} />
        })}
      </div>
    )
  }

  return (
    <div className='blog' ref={container}>
      <Nav />
      <div className='content-container'>
        <div className='content'>
          <Fade bottom delay={2000} distance='50px'>
            <div className='content-body'>
              {renderFeatured()}
              <MediaQuery minWidth={DESKTOPTRANSITIONBP}>{renderFeed()}</MediaQuery>
              <MediaQuery maxWidth={MOBILEBP}>{renderMobileFeed()}</MediaQuery>
            </div>
          </Fade>
          <Footer />
        </div>
      </div>
      <div className='entrance' />
      <div className='exit' />
      <div className='exit-2' />
    </div>
  )
}

export default Blog
