import { LivePreviewListener } from '@/components/LivePreviewListener'
import SlideAndFade from '@/components/SlideAndFade'
import { getBlogMetadata, getBlogPost } from '@/lib/helpers'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'
import styles from './blog-post.module.css'
import Image from 'next/image'
import { jsxConverters } from '@/components/Converters'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const blogPost = await getBlogMetadata({ slug })
  return {
    title: `${blogPost.title} | Blog | Saint Rose`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const blogPosts = await payload.find({
    collection: 'blog-posts',
    limit: 1000,
    depth: 1,
    draft: false,
    pagination: false,
    select: {
      slug: true,
    },
  })
  return blogPosts.docs.map((blogPost) => ({
    slug: blogPost.slug,
  }))
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await params
  const blogPost = await getBlogPost({ slug })

  if (!blogPost) {
    return notFound()
  }

  return (
    <div className={styles['blog-post']}>
      {draft && <LivePreviewListener />}
      <div className={styles.content}>
        <SlideAndFade delay={2}>
          <div className={styles['content-header']}>
            {blogPost.headerImage && typeof blogPost.headerImage !== 'number' && (
              <div className={styles['featured-image-container']}>
                <Image src={`https://3k4a31g25n.ufs.sh/f/${blogPost.headerImage._key}`} alt={blogPost.headerImage?.alt || ''} fill />
              </div>
            )}
          </div>
          <div className={styles['content-body']}>
            <div className={styles['post-title']}>{blogPost.title}</div>
            <RichText
              data={blogPost.content}
              className={styles['rich-text']}
              converters={jsxConverters}
            />
          </div>
        </SlideAndFade>
      </div>
    </div>
  )
}
