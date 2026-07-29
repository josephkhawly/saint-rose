import Image from 'next/image'
import type { Media } from '@/payload-types'

type IntroTextProps = {
  title: string
  introText: string
  introImage?: number | Media | null
  imagePosition?: 'left' | 'right' | null
}

export const IntroText = ({
  title,
  introText,
  introImage,
  imagePosition = 'right',
}: IntroTextProps) => {
  const isImageLeft = imagePosition === 'left'
  const hasImage = introImage && typeof introImage !== 'number' && introImage.url
  const imageAlt = hasImage ? introImage.alt || '' : ''

  const textColumn = (
    <div className="w-full md:w-7/12">
      <h1 className="font-caslon text-xl uppercase">{title}</h1>
      <p className="max-w-2xl text-xl md:text-3xl text-pretty mt-4">{introText}</p>
    </div>
  )

  const imageColumn = hasImage ? (
    <div className="w-full md:w-5/12 aspect-4/5 overflow-hidden relative">
      <Image
        className="object-cover contrast-125"
        alt={imageAlt}
        src={introImage.url!}
        fill
        sizes="(max-width: 768px) 100vw, 42vw"
        placeholder={introImage.blurDataURL ? 'blur' : 'empty'}
        blurDataURL={introImage.blurDataURL ?? undefined}
        loading='eager'
      />
    </div>
  ) : null

  return (
    <section className="w-full px-6 py-32 md:py-40 lg:py-48">
      <div className="relative flex flex-col md:flex-row items-start gap-12">
        {isImageLeft && imageColumn}
        {textColumn}
        {!isImageLeft && imageColumn}
      </div>
    </section>
  )
}
