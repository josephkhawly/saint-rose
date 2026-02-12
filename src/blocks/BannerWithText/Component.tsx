import SlideAndFade from '../../components/SlideAndFade'
import * as motion from 'motion/react-client'
import styles from './banner.module.css'
import { BannerWithTextBlock } from '@/payload-types'
import Image from 'next/image'
import { placeholderBlur } from '@/constants'

type BannerWithTextProps = BannerWithTextBlock & {
  heroDelay?: number
}

export function BannerWithText({
  title,
  banner,
  leftText,
  rightText,
  heroDelay = 0.7,
}: BannerWithTextProps) {
  const hasBanner = banner && typeof banner !== 'number'
  return (
    <div className={styles.hero}>
      {title && (
        <motion.div
          className={styles['hero--title-bar']}
          initial={{ width: 0 }}
          whileInView={{ width: 'auto' }}
          transition={{ duration: 0.7, ease: 'easeIn' }}
          viewport={{ once: true }}
        >
          <motion.div
            className={styles['title-bar-text']}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            viewport={{ once: true }}
          >
            {title}
          </motion.div>
        </motion.div>
      )}
      <SlideAndFade delay={heroDelay}>
        {hasBanner && banner.mimeType?.includes('video') && (
          <div className={styles['video-container']}>
            <video className={styles['hero-video']} autoPlay loop muted playsInline>
              <source src={`https://3k4a31g25n.ufs.sh/f/${banner._key}`} type={banner.mimeType} />
            </video>
          </div>
        )}
        {hasBanner && banner.mimeType?.includes('image') && (
          <div className={styles['hero-image']}>
            <Image
              src={`https://3k4a31g25n.ufs.sh/f/${banner._key}`}
              alt={banner.alt || ''}
              fill
              style={{
                objectFit: 'cover',
              }}
              placeholder='blur'
              blurDataURL={placeholderBlur}
            />
          </div>
        )}
      </SlideAndFade>
      <div className={styles['hero-text']}>
        <div className={styles['text-container']}>
          <SlideAndFade>
            <div className={styles['left']}>{leftText}</div>
          </SlideAndFade>
        </div>
        <div className={styles['text-container']}>
          <SlideAndFade delay={0.25}>
            <div className={styles['right']}>{rightText}</div>
          </SlideAndFade>
        </div>
      </div>
    </div>
  )
}
