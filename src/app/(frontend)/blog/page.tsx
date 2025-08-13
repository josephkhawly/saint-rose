import SlideAndFade from '@/components/SlideAndFade'
import { Metadata } from 'next'
import TransitionLink from '@/components/TransitionLink'
import { formatIso, getBlogList } from '@/lib/helpers'

export const metadata: Metadata = {
  title: 'Blog | Saint Rose',
}

function BlogPost({ blogItem }) {
  return (
    <div className='regular-blog-post'>
      <div className='post-image-container'>
        <div
          className='image'
          style={{ backgroundImage: `url(${blogItem.headerImage?.url})` }}
        ></div>
      </div>
      <h5>{formatIso(blogItem.publishedAt)}</h5>
      <h3>{blogItem.title}</h3>
      <TransitionLink href={`/blog/${blogItem.slug}`}>
        <div className='nav-arrow' />
      </TransitionLink>
    </div>
  )
}

export default async function Blog() {
  const blogItems = await getBlogList()

  if (!blogItems) {
    return <div>Failed to load blog posts.</div>
  }

  const featuredPost = blogItems.find((blogItem) => blogItem.featured == true)
  const featuredPostIndex = blogItems.findIndex((blogItem) => blogItem.featured == true)
  const filteredBlogPosts =
    featuredPostIndex > -1 ? blogItems.toSpliced(featuredPostIndex, 1) : blogItems

  return (
    <div className='blog'>
      <div className='content'>
        <SlideAndFade delay={1}>
          <div className='content-body'>
            {featuredPost && (
              <div className='featured-blog-post'>
                {featuredPost.headerImage && typeof featuredPost.headerImage !== 'number' && (<div className='post-image-container'>
                  <div
                    className='image'
                    style={{ backgroundImage: `url(${featuredPost.headerImage?.url})` }}
                  />
                </div>)}
                <h5>FEATURED POST: {formatIso(featuredPost.publishedAt)}</h5>
                <h3>{featuredPost.title}</h3>
                <TransitionLink href={`/blog/${featuredPost.slug}`}>
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
