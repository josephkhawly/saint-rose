import SlideAndFade from '@/components/SlideAndFade'
import { Metadata } from 'next'
import TransitionLink from '@/components/TransitionLink'
import { formatIso, getBlogList } from '@/lib/helpers'
import Image from 'next/image'
import styles from './blog.module.css'
import { getBlurPlaceholder } from '@/utils/getBlurPlaceholder'

export const metadata: Metadata = {
  title: 'Blog | Saint Rose',
}

async function BlogPost({ blogItem }) {
  const blurDataURL = blogItem.headerImage && typeof blogItem.headerImage !== 'number' ? await getBlurPlaceholder(blogItem.headerImage._key) : null
  return (
    <div className={styles['regular-blog-post']}>
      <div className='relative aspect-video'>
        <Image
          src={`https://3k4a31g25n.ufs.sh/f/${blogItem.headerImage._key}`}
          alt={blogItem.headerImage?.alt || ''}
          className={styles.image}
          fill
          placeholder='blur'
          blurDataURL={blurDataURL}
          sizes='(max-width: 768px) 100vw, 33vw'
        />
      </div>
      <h5>{formatIso(blogItem.publishedAt)}</h5>
      <h3>{blogItem.title}</h3>
      <TransitionLink href={`/blog/${blogItem.slug}`}>
        <Image src='/images/nav-arrow.svg' alt='' width={21} height={21} unoptimized />
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
                <div className='relative aspect-video w-full sm:aspect-[2/1] sm:w-3/4'>
                  <Image
                    src={`https://3k4a31g25n.ufs.sh/f/${featuredPost.headerImage._key}`}
                    alt={featuredPost.headerImage?.alt || ''}
                    className={styles.image}
                    fill
                    priority
                    fetchPriority='high'
                  />
                </div>
              )}
              <h5>FEATURED POST: {formatIso(featuredPost.publishedAt)}</h5>
              <h3>{featuredPost.title}</h3>
              <TransitionLink href={`/blog/${featuredPost.slug}`}>
                <Image src='/images/nav-arrow.svg' alt='' width={21} height={20} unoptimized />
              </TransitionLink>
            </div>
          )}
          <div className='grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3'>
            {filteredBlogPosts.map((blogItem) => (
              <BlogPost key={blogItem.id} blogItem={blogItem} />
            ))}
          </div>
        </div>
      </SlideAndFade>
    </div>
  )
}
