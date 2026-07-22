import { getBlogList } from '@/lib/helpers'
import { toRoman } from '@/lib/toRoman'
import { getBlurPlaceholder } from '@/utils/getBlurPlaceholder'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog | Saint Rose',
}

type BlogListItem = Awaited<ReturnType<typeof getBlogList>>[number]

async function BlogPostCard({
  blogItem,
  index,
}: {
  blogItem: BlogListItem
  index: number
}) {
  const headerImage =
    blogItem.headerImage && typeof blogItem.headerImage !== 'number'
      ? blogItem.headerImage
      : null
  const blurDataURL = headerImage ? await getBlurPlaceholder(headerImage.url) : null

  return (
    <Link href={`/blog/${blogItem.slug}`} className='group block'>
      <h2 className='font-marist text-sm font-bold uppercase'>
        {toRoman(index + 1)}. {blogItem.title}
      </h2>
      <div className='font-marist text-sm italic'>{new Date(blogItem.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
      {headerImage && (
        <div className='relative mt-4 aspect-3/4 w-full overflow-hidden'>
          <Image
            src={headerImage.url}
            alt={headerImage.alt || ''}
            className='object-cover'
            fill
            placeholder={blurDataURL ? 'blur' : undefined}
            blurDataURL={blurDataURL ?? undefined}
            sizes='(max-width: 768px) 100vw, 50vw'
          />
          <div className='pointer-events-none absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-30' />
        </div>
      )}
    </Link>
  )
}

export default async function Blog() {
  const blogItems = await getBlogList()

  if (!blogItems) {
    return <div>Failed to load blog posts.</div>
  }

  return (
    <article className='px-6 py-32 md:py-40 md:pl-12 md:pr-[18vw] lg:pl-20 lg:pr-[28vw] xl:pl-24 xl:pr-[32vw]'>
      <div className='grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-2 md:gap-y-20'>
        {blogItems.map((blogItem, index) => (
          <BlogPostCard key={blogItem.id} blogItem={blogItem} index={index} />
        ))}
      </div>
    </article>
  )
}
