import * as motion from 'motion/react-client'
import { BannerWithTextBlock } from '@/payload-types'
// import Image from 'next/image'
// import { placeholderBlur } from '@/constants'

type BannerWithTextProps = BannerWithTextBlock

export function BannerWithText({
  // title,
  // banner,
  leftText,
  rightText,
}: BannerWithTextProps) {
  // const hasBanner = banner && typeof banner !== 'number'
  return (
    <section className='w-full min-h-screen bg-saint px-6 md:px-12 lg:px-16 xl:px-24 py-20 md:py-32'>
      <div className='container mx-auto flex flex-col gap-16 lg:gap-32'>
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1 }}
          className='flex items-start pt-8 lg:pt-0 md:max-w-1/3'
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
          <p className='text-base lg:text-lg text-black'>{rightText}</p>
        </motion.div>
      </div>
    </section>
  )
}
