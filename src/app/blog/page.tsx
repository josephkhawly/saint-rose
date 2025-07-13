import SlideAndFade from '@/components/SlideAndFade'
import { Metadata } from 'next'
import TransitionLink from '@/components/TransitionLink'
import { BlogItem } from '@/lib/types'
import { formatIso, getBlogItems } from '@/lib/helpers'

export const metadata: Metadata = {
  title: 'Blog | Saint Rose',
}

function BlogPost({ blogItem }: { blogItem: BlogItem }) {
  return (
    <div className='regular-blog-post'>
      <div className='post-image-container'>
        <div className='image' style={{ backgroundImage: `url(${blogItem.headerImage})` }}></div>
      </div>
      <h5>{formatIso(blogItem.date)}</h5>
      <h3>{blogItem.title}</h3>
      <TransitionLink href={`/blog/${blogItem.id}`}>
        <div className='nav-arrow' />
      </TransitionLink>
    </div>
  )
}

export default async function Blog() {
  const posts = await getBlogItems(['title', 'date', 'headerImage', 'featured'])

  if (!posts) {
    return <div>Failed to load blog posts.</div>
  }

  const featuredPost = posts.find((blogItem) => blogItem.featured == true)
  const filteredBlogPosts = posts.filter((blogItem) => blogItem.featured == false)

  return (
    <div className='blog'>
      <div className='content'>
        <SlideAndFade delay={1}>
          <div className='content-body'>
            {featuredPost && (
              <div className='featured-blog-post'>
                <div className='post-image-container'>
                  <div
                    className='image'
                    style={{ backgroundImage: `url(${featuredPost.headerImage})` }}
                  />
                </div>
                <h5>FEATURED POST: {formatIso(featuredPost.date)}</h5>
                <h3>{featuredPost.title}</h3>
                <TransitionLink href={`/blog/${featuredPost.id}`}>
                  <div className='nav-arrow' />
                </TransitionLink>
              </div>
            )}
            <div className='blog-posts'>
              {filteredBlogPosts.map((blogItem) => (
                <BlogPost key={blogItem.id} blogItem={blogItem} />
              ))}
            </div>
          </div>
        </SlideAndFade>
      </div>
    </div>
  )
}
