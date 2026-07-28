import Image from 'next/image'
import type { AccentColor } from '@/fields/accentColor'
import type { IntroBlock } from '@/payload-types'

const overlayBgClass = {
  rose: 'bg-rose',
  'deep-rose': 'bg-deep-rose',
  'dark-chocolate': 'bg-dark-chocolate',
  mint: 'bg-mint',
  lavender: 'bg-lavender',
  sky: 'bg-sky',
  garden: 'bg-garden',
  olive: 'bg-olive',
  lima: 'bg-lima',
} as const satisfies Record<AccentColor, string>

type IntroProps = IntroBlock

export function Intro({ introImage, overlayColor = 'rose' }: IntroProps) {
  const hasImage = introImage && typeof introImage !== 'number' && introImage.url
  const accent = overlayColor && overlayColor in overlayBgClass ? overlayColor : 'rose'

  return (
    <section className='relative h-screen flex items-center justify-center'>
      <div className='absolute inset-0 [clip-path:inset(0)]'>
        {hasImage && (
          <div className='fixed inset-0'>
            <Image
              src={introImage.url}
              alt={introImage.alt ?? ''}
              fill
              preload
              className='object-cover object-center'
              sizes='100vw'
              placeholder={introImage.blurDataURL ? 'blur' : 'empty'}
              blurDataURL={introImage.blurDataURL ?? undefined}
            />
          </div>
        )}
        <div className={`absolute inset-0 opacity-70 ${overlayBgClass[accent]}`} />
      </div>
      <div className='absolute bottom-0 w-full'>
        <h1 className='font-fautive whitespace-nowrap text-[clamp(2.75rem,18vw,19rem)] leading-none text-black text-center'>
          SAINT ROSE
        </h1>
      </div>
    </section>
  )
}
