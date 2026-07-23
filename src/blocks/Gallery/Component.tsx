import type { GalleryBlock, Media } from '@/payload-types'
import { GalleryCarousel, type GalleryCarouselItem } from './GalleryCarousel'

type GalleryItem = GalleryBlock['items'][number]
type GalleryImage = Media

function hasImage(item: GalleryItem): item is GalleryItem & { media: GalleryImage } {
  return (
    typeof item.media !== 'number' &&
    Boolean(item.media.url) &&
    Boolean(item.media.mimeType?.includes('image'))
  )
}

export async function Gallery({ imagePosition, items, orientation, title }: GalleryBlock) {
  const images = items.filter(hasImage)

  if (images.length === 0) {
    return null
  }

  const carouselItems = await Promise.all(
    images.map<Promise<GalleryCarouselItem>>(async ({ id, media }, index) => ({
      alt: media.alt ?? '',
      blurDataURL: media.blurDataURL ?? undefined,
      height: media.height || 1,
      id: id ?? `${media.id}-${index}`,
      src: media.url,
      width: media.width || 1,
    })),
  )

  return (
    <GalleryCarousel
      imagePosition={imagePosition}
      items={carouselItems}
      orientation={orientation}
      title={title}
    />
  )
}
