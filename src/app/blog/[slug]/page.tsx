import SlideAndFade from '../../../components/SlideAndFade'
import { generateOptions } from '../../../components/richText'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { getEntryApiEndpoint, processEntryResponse } from '../../../contentful'

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: blogPostId } = await params
  const blogPostEndpoint = getEntryApiEndpoint(blogPostId)

  const res = await fetch(blogPostEndpoint, { next: { revalidate: 60 } })
  if (!res.ok) {
    return <div>Failed to load blog post.</div>
  }
  const data = await res.json()
  const expectedFields = ['title', 'date', 'headerImage', 'body']
  const { entry: blogPost, assets } = processEntryResponse(data, expectedFields)

  const options = generateOptions(assets)

  return (
    <div className='blog-post'>
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
