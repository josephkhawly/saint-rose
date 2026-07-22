import Image from 'next/image'
import * as motion from 'motion/react-client'
import type { ImageAndTextColumnBlock } from '@/payload-types'
import { getBlurPlaceholder } from '@/utils/getBlurPlaceholder'

type ImageAndTextColumnProps = ImageAndTextColumnBlock

export async function ImageAndTextColumn({
  title,
  link,
  linkLabel,
  content,
  image,
  imagePosition = 'left',
}: ImageAndTextColumnProps) {
  const isImageRight = imagePosition === 'right'
  const hasImage = image && typeof image !== 'number'
  const imageSrc = hasImage && image._key ? `https://3k4a31g25n.ufs.sh/f/${image._key}` : null
  const imageAlt = hasImage ? image.alt || '' : ''
  const blurDataURL = hasImage && image._key ? await getBlurPlaceholder(image._key) : null

  const contentColumn = (
    <motion.div
      initial={{ opacity: 0, x: isImageRight ? -32 : 32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, delay: isImageRight ? 0 : 0.2 }}
      className='flex flex-col justify-start md:col-span-5'
    >
      <span className='small-caps text-sm font-marist mb-3'>{title}</span>

      <div className='text-md md:text-lg'>{content}</div>

      {link && (
        <div className='mt-6'>
          <a href={link} className='small-caps text-link text-sm font-marist'>
            {linkLabel || 'Read More'}
          </a>
        </div>
      )}
    </motion.div>
  )

  return (
    <section className='px-6 py-24 md:py-32 lg:px-12'>
      <div className={isImageRight ? 'ml-auto max-w-7xl' : 'mr-auto max-w-7xl'}>
        <div className='grid gap-12 md:grid-cols-12 md:gap-8 lg:gap-8'>
          {isImageRight && contentColumn}

          <motion.div
            initial={{ opacity: 0, x: isImageRight ? 32 : -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1 }}
            className='md:col-span-7'
          >
            {imageSrc && blurDataURL && (
              <div className='relative aspect-3/5 overflow-hidden'>
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className='object-cover'
                  sizes='(max-width: 768px) 100vw, 58vw'
                  placeholder='blur'
                  blurDataURL={blurDataURL}
                />
              </div>
            )}
          </motion.div>

          {!isImageRight && contentColumn}
        </div>
      </div>
    </section>
  )
}
