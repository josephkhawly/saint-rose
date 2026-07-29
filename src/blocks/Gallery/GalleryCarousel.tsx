'use client'

import { toRoman } from '@/lib/toRoman'
import Image from 'next/image'
import { useState } from 'react'

export interface GalleryCarouselItem {
  alt: string
  blurDataURL: string
  height: number
  id: string
  src: string
  width: number
}

interface GalleryCarouselProps {
  imagePosition?: 'left' | 'right' | null
  items: GalleryCarouselItem[]
  orientation?: 'landscape' | 'portrait' | null
  title?: null | string
}

function Arrow({ direction }: { direction: 'left' | 'right' }) {
  const path = direction === 'left' ? 'M15 4 7 12l8 8' : 'm9 4 8 8-8 8'

  return (
    <svg aria-hidden='true' fill='none' viewBox='0 0 24 24' className='size-6'>
      <path d={path} stroke='currentColor' strokeLinecap='square' strokeWidth='1.5' />
    </svg>
  )
}

export function GalleryCarousel({
  imagePosition = 'right',
  items,
  orientation = 'landscape',
  title,
}: GalleryCarouselProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [position, setPosition] = useState(1)
  const activeIndex =
    position === 0 ? items.length - 1 : position === items.length + 1 ? 0 : position - 1
  const slides = [
    { item: items[items.length - 1], key: `${items[items.length - 1].id}-clone-prev` },
    ...items.map((item) => ({ item, key: item.id })),
    { item: items[0], key: `${items[0].id}-clone-next` },
  ]
  const isImageLeft = imagePosition === 'left'
  const aspectClass = orientation === 'portrait' ? 'aspect-3/4' : 'aspect-4/3'
  const titleClass = isImageLeft
    ? 'text-center md:col-start-3 md:row-start-1 md:text-right'
    : 'text-center md:text-left'
  const carouselColumnClass = isImageLeft
    ? 'md:col-span-2 md:col-start-1 md:row-start-1'
    : 'md:col-span-2 md:col-start-2'
  const carouselAlignClass = isImageLeft ? 'md:w-4/5' : 'md:ml-auto md:w-4/5'

  const move = (direction: -1 | 1) => {
    if (isAnimating || items.length === 1) {
      return
    }

    setIsAnimating(true)
    setPosition((currentPosition) => currentPosition + direction)
  }

  const handleTransitionEnd = () => {
    setIsAnimating(false)

    if (position === 0) {
      setPosition(items.length)
    } else if (position === items.length + 1) {
      setPosition(1)
    }
  }

  return (
    <section className='mt-24 grid gap-10 md:mt-35 md:grid-cols-3 md:gap-13 container mx-auto'>
      {title ? (
        <h2 className={`font-ap-bold text-lg tracking-wide uppercase md:pt-10 ${titleClass}`}>
          {title}
        </h2>
      ) : null}

      <div className={carouselColumnClass}>
        <div
          className={`grid grid-cols-[2rem_minmax(0,1fr)_2rem] items-center gap-3 md:grid-cols-[2.5rem_minmax(0,1fr)_2.5rem] md:gap-5 ${carouselAlignClass}`}
        >
          <button
            type='button'
            aria-label='Previous image'
            className='flex size-8 items-center justify-center transition-opacity cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-default disabled:opacity-30 md:size-10'
            disabled={items.length === 1}
            onClick={() => move(-1)}
          >
            <Arrow direction='left' />
          </button>

          <div className={`overflow-hidden ${aspectClass}`}>
            <div
              className='flex h-full'
              onTransitionEnd={handleTransitionEnd}
              style={{
                transform: `translateX(-${position * 100}%)`,
                transition: isAnimating ? 'transform 500ms ease-in-out' : 'none',
              }}
            >
              {slides.map(({ item, key }) => (
                <div className='relative h-full min-w-full' key={key}>
                  <Image
                    fill
                    alt={item.alt}
                    className='object-cover'
                    placeholder={item.blurDataURL ? 'blur' : 'empty'}
                    blurDataURL={item.blurDataURL ?? undefined}
                    quality={60}
                    sizes='(max-width: 767px) calc(100vw - 7rem), 48vw'
                    src={item.src}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type='button'
            aria-label='Next image'
            className='flex size-8 items-center justify-center transition-opacity cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-default disabled:opacity-30 md:size-10'
            disabled={items.length === 1}
            onClick={() => move(1)}
          >
            <Arrow direction='right' />
          </button>

          <p className='col-start-2 text-right text-sm tracking-wider italic'>
            {toRoman(activeIndex + 1)}/{toRoman(items.length)}
          </p>
        </div>
      </div>
    </section>
  )
}
