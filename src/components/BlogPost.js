import React, { useRef, useEffect, useState } from 'react'
import Axios from 'axios'
import Fade from 'react-reveal/Fade'
import Nav from './Nav'
import { generateOptions } from '../richText'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Footer from './Footer'
import { getEntryApiEndpoint, processEntryResponse } from '../contentful'

function BlogPost(props) {
  const container = useRef(null)
  const [blogPost, setBlogPost] = useState({})
  const [assets, setAssets] = useState([])

  useEffect(() => {
    const blogPostId = props.match.params.id
    const blogPostEndpoint = getEntryApiEndpoint(blogPostId)
    Axios.get(blogPostEndpoint)
      .then((result) => {
        const expectedFields = ['title', 'date', 'headerImage', 'body']
        const fetchedBlogPost = processEntryResponse(result.data, expectedFields)
        setBlogPost(fetchedBlogPost.entry)
        setAssets(fetchedBlogPost.assets)
      })
      .catch((error) => console.log('error: ', error))
  }, [props.match.params.id])

  const options = generateOptions(assets)

  return (
    <div className='blog-post' ref={container}>
      <Nav />
      <div className='content-container'>
        <div className='content'>
          <Fade bottom delay={2000} distance='50px'>
            <div className='content-header'>
              <div className='featured-image-container'>
                <div
                  className='image'
                  style={{ backgroundImage: `url(${blogPost.headerImage})` }}
                />
              </div>
            </div>
            <div className='content-body'>
              <div className='postTitle'>{blogPost.title}</div>
              <div className='rich-text'>{documentToReactComponents(blogPost.body, options)}</div>
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

export default BlogPost
