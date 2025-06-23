import React, { useRef, useEffect, useState } from 'react'
import Axios from 'axios'
import SlideAndFade from './SlideAndFade'
import { generateOptions } from '../richText'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
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
      <div className='content'>
        <SlideAndFade delay={2000}>
          <div className='content-header'>
            <div className='featured-image-container'>
              <div className='image' style={{ backgroundImage: `url(${blogPost.headerImage})` }} />
            </div>
          </div>
          <div className='content-body'>
            <div className='post-title'>{blogPost.title}</div>
            <div className='rich-text'>{documentToReactComponents(blogPost.body, options)}</div>
          </div>
        </SlideAndFade>
      </div>
    </div>
  )
}

export default BlogPost
