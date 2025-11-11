import { GalleryBlock } from '@/payload-types'
import styles from './gallery.module.css'

type GalleryProps = GalleryBlock

export function Gallery({ title, items }: GalleryProps) {
  if (!items || items.length === 0) {
    return null
  }

  // Distribute items across 3 columns automatically
  const columns: Array<Array<(typeof items)[0]>> = [[], [], []]

  items.forEach((item, index) => {
    const columnIndex = index % 3
    columns[columnIndex].push(item)
  })

  const renderMedia = (item: (typeof items)[0], key: string) => {
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
        <div key={key} className={styles['column-image']}>
          <video autoPlay muted playsInline loop>
            <source src={media.url || ''} type={media.mimeType || ''} />
          </video>
        </div>
      )
    }

    if (isImage && media.url) {
      return (
        <div
          key={key}
          className={styles['column-image']}
          style={{
            backgroundImage: `url(${media.url})`,
            ...(aspectRatio && { aspectRatio: aspectRatio.toString() }),
          }}
        />
      )
    }

    return null
  }

  return (
    <div className={styles.gallery}>
      {columns.map((columnItems, columnIndex) => (
        <div key={columnIndex} className={styles.column}>
          {columnIndex === 0 && title && <div className={styles['gallery-title']}>{title}</div>}
          {columnIndex === 2 && <div className={styles['gallery-top-spacing']}></div>}
          {columnItems
            .map((item, itemIndex) => renderMedia(item, `${columnIndex}-${itemIndex}`))
            .filter(Boolean)}
        </div>
      ))}
    </div>
  )
}
