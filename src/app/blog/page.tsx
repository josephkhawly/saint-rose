import Link from 'next/link'
import { getAllEntriesByContentTypeApiEndpoint, processEntryListResponse } from '../../contentful'
import SlideAndFade from '../../components/SlideAndFade'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Saint Rose',
}

const formatIso = (isoString: string) => {
  const date = new Date(isoString)
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' }
  return date.toLocaleString('en-US', options)
}

interface BlogItem {
  id: string;
  title: string;
  date: string;
  headerImage: string;
  featured?: boolean;
}

function BlogPost({ blogItem }: { blogItem: BlogItem }) {
  return (
    <div className='regular-blog-post'>
      <div className='post-image-container'>
        <div className='image' style={{ backgroundImage: `url(${blogItem.headerImage})` }}></div>
      </div>
      <h5>{formatIso(blogItem.date)}</h5>
      <h3>{blogItem.title}</h3>
      <Link href={`/blog/${blogItem.id}`}>
        <div className='nav-arrow' />
      </Link>
    </div>
  )
}

export default async function Blog() {
  const options = [
    { key: 'order', value: '-fields.date' },
    { key: 'limit', value: '10' },
  ]
  const newsItemsEndpoint = getAllEntriesByContentTypeApiEndpoint('blogPost', options)
  const res = await fetch(newsItemsEndpoint, { next: { revalidate: 60 } })
  if (!res.ok) {
    return <div>Failed to load blog posts.</div>
  }
  const data = await res.json()
  const expectedFields = ['title', 'date', 'headerImage', 'featured']
  const fetchedBlogItems = processEntryListResponse(data, expectedFields)
  const blogItems: BlogItem[] = fetchedBlogItems.entries

  const featuredPost = blogItems.find((blogItem) => blogItem.featured == true)
  const featuredPostIndex = blogItems.findIndex((blogItem) => blogItem.featured == true)
  const filteredBlogPosts =
    featuredPostIndex > -1 ? blogItems.toSpliced(featuredPostIndex, 1) : blogItems

  return (
    <div className='blog'>
      <div className='content'>
        <SlideAndFade delay={1000}>
          <div className='content-body'>
            {featuredPost && (
              <div className='featured-blog-post'>
                <div className='post-image-container'>
                  <div
                    className='image'
                    style={{ backgroundImage: `url(${featuredPost.headerImage})` }}
                  ></div>
                </div>
                <h5>FEATURED POST: {formatIso(featuredPost.date)}</h5>
                <h3>{featuredPost.title}</h3>
                <Link href={`/blog/${featuredPost.id}`}>
                  <div className='nav-arrow' />
                </Link>
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
