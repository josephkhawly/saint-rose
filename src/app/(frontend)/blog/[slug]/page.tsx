import SlideAndFade from '@/components/SlideAndFade'
import { getBlogList, getBlogMetadata, getBlogPost } from '@/lib/helpers'
import { RichText } from '@payloadcms/richtext-lexical/react'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const blogPost = await getBlogMetadata({ slug })
  return {
    title: `${blogPost.title} | Blog | Saint Rose`,
  }
}

export async function generateStaticParams() {
  const blogPosts = await getBlogList()
  return blogPosts.map((blogPost) => ({
    slug: blogPost.slug,
  }))
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const blogPost = await getBlogPost({ slug })

  if (!blogPost) {
    return <div>Failed to load blog post.</div>
  }

  return (
    <div className='blog-post'>
      <div className='content'>
        <SlideAndFade delay={2}>
          <div className='content-header'>
            {blogPost.headerImage && typeof blogPost.headerImage !== 'number' && (
              <div className='featured-image-container'>
                <div
                  className='image'
                  style={{ backgroundImage: `url(${blogPost.headerImage?.url})` }}
                />
              </div>
            )}
          </div>
          <div className='content-body'>
            <div className='post-title'>{blogPost.title}</div>
            <RichText data={blogPost.content} className={'rich-text'} />
          </div>
        </SlideAndFade>
      </div>
    </div>
  )
}
