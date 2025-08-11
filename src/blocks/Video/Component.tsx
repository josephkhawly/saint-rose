import styles from './video.module.scss'
import { VideoBlock } from '@/payload-types'

type VideoProps = VideoBlock

export function Video({ video, title, description, autoplay, loop, muted, controls }: VideoProps) {
  const hasVideo = video && typeof video !== 'number'

  return (
    <div className={styles.videoContainer}>
      {title && <h2 className={styles.title}>{title}</h2>}

      {hasVideo && (
        <div className={styles.videoWrapper}>
          <video
            className={styles.video}
            autoPlay={autoplay}
            loop={loop}
            muted={muted}
            controls={controls}
            playsInline
          >
            <source src={video.url} type={video.mimeType} />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {description && <p className={styles.description}>{description}</p>}
    </div>
  )
}
