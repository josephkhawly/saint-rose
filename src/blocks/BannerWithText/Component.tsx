import Image from 'next/image'
import * as motion from 'motion/react-client'
import type { BannerWithTextBlock } from '@/payload-types'

type BannerWithTextProps = BannerWithTextBlock

export function BannerWithText({ banner, leftText, rightText }: BannerWithTextProps) {
  const hasBanner = banner && typeof banner !== 'number'
  const isVideo = hasBanner && banner.mimeType?.startsWith('video/')
  const bannerAspectRatio =
    hasBanner && banner.width && banner.height ? banner.width / banner.height : undefined

  return (
    <section className='w-full min-h-screen bg-saint px-6 md:px-12 lg:px-16 xl:px-24 py-20 md:py-32'>
      <div className='container mx-auto flex flex-col gap-16 lg:gap-32'>
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1 }}
          className='flex flex-col gap-8 items-start pt-8 lg:pt-0 md:max-w-2/5'
        >
          {hasBanner &&
            (bannerAspectRatio ? (
              <div
                className='relative w-full overflow-hidden'
                style={{ aspectRatio: bannerAspectRatio }}
              >
                {isVideo ? (
                  <video className='h-full w-full' autoPlay loop muted playsInline>
                    <source src={banner.url ?? undefined} type={banner.mimeType ?? undefined} />
                  </video>
                ) : (
                  <Image
                    src={banner.url ?? ''}
                    alt={banner.alt ?? ''}
                    fill
                    sizes='(max-width: 768px) 100vw, 40vw'
                    placeholder={banner.blurDataURL ? 'blur' : 'empty'}
                    blurDataURL={banner.blurDataURL ?? undefined}
                  />
                )}
              </div>
            ) : isVideo ? (
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
                sizes='(max-width: 768px) 100vw, 40vw'
                placeholder={banner.blurDataURL ? 'blur' : 'empty'}
                blurDataURL={banner.blurDataURL ?? undefined}
              />
            ))}

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
    </section>
  )
}
