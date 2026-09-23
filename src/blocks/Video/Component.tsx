import styles from './video.module.css'
import type { Media } from '@/payload-types'

type VideoProps = {
  autoplay?: boolean | null
  controls?: boolean | null
  description?: string | null
  loop?: boolean | null
  muted?: boolean | null
  title?: string | null
  video: number | Media
}

export function Video({ video, title, description, autoplay, loop, muted, controls }: VideoProps) {
  const hasVideo = video && typeof video !== 'number'

  return (
    <div className={styles.videoContainer}>
      {title && <h2 className={styles.title}>{title}</h2>}

      {hasVideo && (
        <div className={styles.videoWrapper}>
          <video
            className={styles.video}
            autoPlay={autoplay ?? undefined}
            loop={loop ?? undefined}
            muted={muted ?? undefined}
            controls={controls ?? undefined}
            playsInline
          >
            <source src={video.url ?? undefined} type={video.mimeType ?? undefined} />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {description && <p className={styles.description}>{description}</p>}
    </div>
  )
}
