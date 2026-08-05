import Image from 'next/image'
import * as motion from 'motion/react-client'
import type { BannerWithTextBlock } from '@/payload-types'

type BannerWithTextProps = BannerWithTextBlock & {
  isLcpCandidate?: boolean
}

export function BannerWithText({
  banner,
  imagePosition = 'top',
  isLcpCandidate = false,
  leftText,
  rightText,
}: BannerWithTextProps) {
  const hasBanner = banner && typeof banner !== 'number'
  const isVideo = hasBanner && banner.mimeType?.startsWith('video/')

  const media = hasBanner && (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1 }}
      className='w-full'
    >
      {isVideo ? (
        <video className='w-full h-auto' autoPlay loop muted playsInline>
          <source src={banner.url ?? undefined} type={banner.mimeType ?? undefined} />
        </video>
      ) : (
        <Image
          src={banner.url ?? ''}
          alt={banner.alt ?? ''}
          width={banner.width ?? 1200}
          height={banner.height ?? 900}
          className='w-full h-auto'
          sizes='100vw'
          placeholder={banner.blurDataURL ? 'blur' : 'empty'}
          blurDataURL={banner.blurDataURL ?? undefined}
          loading={isLcpCandidate ? 'eager' : 'lazy'}
          fetchPriority={isLcpCandidate ? 'high' : undefined}
        />
      )}
    </motion.div>
  )

  const text = (
    <div className='flex flex-col gap-16 lg:gap-32'>
      <motion.div
        initial={{ opacity: 0, x: -32 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1 }}
        className='flex flex-col gap-8 items-start pt-8 lg:pt-0 md:max-w-2/5'
      >
        <p className='text-2xl md:text-3xl lg:text-4xl xl:text-4xl leading-[1.1] text-black'>
          {leftText}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 32 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, delay: 0.3 }}
        className='flex flex-col md:pt-24 lg:pt-32 ml-auto md:max-w-1/3'
      >
        <p className='text-base whitespace-break-spaces lg:text-lg text-black'>{rightText}</p>
      </motion.div>
    </div>
  )

  return (
    <section className='w-full min-h-screen px-6 md:px-12 lg:px-16 xl:px-24 py-20 md:py-32'>
      <div className='container mx-auto flex flex-col gap-16 lg:gap-32'>
        {imagePosition === 'bottom' ? (
          <>
            {text}
            {media}
          </>
        ) : (
          <>
            {media}
            {text}
          </>
        )}
      </div>
    </section>
  )
}
