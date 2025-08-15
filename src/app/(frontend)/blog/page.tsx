import SlideAndFade from '@/components/SlideAndFade'
import { Metadata } from 'next'
import TransitionLink from '@/components/TransitionLink'
import { formatIso, getBlogList } from '@/lib/helpers'
import Image from 'next/image'
import styles from './blog.module.css'

export const metadata: Metadata = {
  title: 'Blog | Saint Rose',
}

function BlogPost({ blogItem }) {
  return (
    <div className={styles['regular-blog-post']}>
      <div className={styles['post-image-container']}>
        <Image
          src={blogItem.headerImage?.url}
          alt={blogItem.headerImage?.alt || ''}
          className={styles.image}
          fill
        />
      </div>
      <h5>{formatIso(blogItem.publishedAt)}</h5>
      <h3>{blogItem.title}</h3>
      <TransitionLink href={`/blog/${blogItem.slug}`}>
        <Image src='/images/nav-arrow.svg' alt='' width={21} height={21} />
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
    <div className={styles.blog}>
      <SlideAndFade delay={1}>
        <div className={styles['content-body']}>
          {featuredPost && (
            <div className={styles['featured-blog-post']}>
              {featuredPost.headerImage && typeof featuredPost.headerImage !== 'number' && (
                <div className={styles['post-image-container']}>
                  <Image
                    src={featuredPost.headerImage?.url}
                    alt={featuredPost.headerImage?.alt || ''}
                    className={styles.image}
                    fill
                  />
                </div>
              )}
              <h5>FEATURED POST: {formatIso(featuredPost.publishedAt)}</h5>
              <h3>{featuredPost.title}</h3>
              <TransitionLink href={`/blog/${featuredPost.slug}`}>
                <Image src='/images/nav-arrow.svg' alt='' width={21} height={20} />
              </TransitionLink>
            </div>
          )}
          <div className={styles['blog-posts']}>
            {filteredBlogPosts.map((blogItem) => (
              <BlogPost key={blogItem.id} blogItem={blogItem} />
            ))}
          </div>
        </div>
      </SlideAndFade>
    </div>
  )
}
