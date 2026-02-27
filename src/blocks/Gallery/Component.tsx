// import { GalleryBlock } from '@/payload-types'

import { getBlurPlaceholder } from '@/utils/getBlurPlaceholder'
import Image from 'next/image'

// type GalleryProps = GalleryBlock

export function Gallery({ title, items }: any) {
  if (!items || items.length === 0) {
    return null
  }

  // Distribute items across 3 columns automatically
  const columns: Array<Array<(typeof items)[0]>> = [[], [], []]

  items.forEach((item, index) => {
    const columnIndex = index % 3
    columns[columnIndex].push(item)
  })

  const renderMedia = async (item: (typeof items)[0], key: string) => {
    if (!item.media || typeof item.media === 'number') {
      return null
    }

    const media = item.media
    const isVideo = media.mimeType?.includes('video')
    const isImage = media.mimeType?.includes('image')

    // Calculate aspect ratio from media dimensions
    const aspectRatio = media.width && media.height ? media.width / media.height : undefined

    if (isVideo) {
      return (
        <div key={key} className='bg-cover bg-center bg-repeat'>
          <video autoPlay muted playsInline loop className='w-full'>
            <source src={media.url || ''} type={media.mimeType || ''} />
          </video>
        </div>
      )
    }

    if (isImage && media.url) {
      const blurDataURL = await getBlurPlaceholder(media._key)
      return (
        <div
          style={{
            position: 'relative',
            aspectRatio,
          }}
        >
          <Image
            src={`https://3k4a31g25n.ufs.sh/f/${media._key}`}
            alt={media.alt || ''}
            fill
            quality={60}
            placeholder='blur'
            blurDataURL={blurDataURL}
          />
        </div>
      )
    }

    return null
  }

  return (
    <div className='mt-24 flex flex-col justify-between gap-13 md:mt-[140px] md:flex-row'>
      {columns.map((columnItems, columnIndex) => (
        <div key={columnIndex} className='mb-13 flex w-full flex-col gap-13 md:mb-0 md:w-1/3'>
          {columnIndex === 0 && title && (
            <div className='font-ap-bold text-center text-lg tracking-wide uppercase md:mt-10 md:mb-[30px] md:text-left'>
              {title}
            </div>
          )}
          {columnIndex === 2 && <div className='-mt-13 md:mt-5' />}
          {columnItems
            .map((item, itemIndex) => renderMedia(item, `${columnIndex}-${itemIndex}`))
            .filter(Boolean)}
        </div>
      ))}
    </div>
  )
}
