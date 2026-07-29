import Image from 'next/image'
import * as motion from 'motion/react-client'
import Link from 'next/link'
import type { VisitBlock } from '@/payload-types'

type VisitProps = VisitBlock

export function Visit({
  title,
  image,
  addressLine1,
  addressLine2,
  mapLink,
  hours,
  phone,
  email,
}: VisitProps) {
  const phoneHref = phone ? `tel:${phone.replace(/\D/g, '')}` : undefined
  const hasImage = image && typeof image !== 'number' && image.url

  const sections = [
    {
      title: 'Location',
      content: (
        <>
          <p className='text-base leading-relaxed text-black lg:text-lg'>
            {addressLine1}
            {addressLine2 && (
              <>
                <br />
                {addressLine2}
              </>
            )}
          </p>
          {mapLink && (
            <div className='mt-6'>
              <a
                href={mapLink}
                target='_blank'
                rel='noreferrer'
                className='small-caps text-link text-sm font-marist'
              >
                Get Directions
              </a>
            </div>
          )}
        </>
      ),
    },
    {
      title: 'Hours',
      content: (
        <dl className='flex flex-col gap-2'>
          {hours?.map((row, index) => (
            <div
              key={row.id ?? index}
              className='flex items-baseline justify-end gap-4 text-base leading-relaxed text-black lg:text-lg'
            >
              <dt>{row.days}</dt>
              <dd>{row.times}</dd>
            </div>
          ))}
        </dl>
      ),
    },
    {
      title: 'Contact',
      content: (
        <div className='flex flex-col gap-2 text-base leading-relaxed text-black lg:text-lg'>
          {phone && (
            <Link href={phoneHref ?? ''} className='hover:text-rose transition-colors duration-300'>
              {phone}
            </Link>
          )}
          {email && (
            <Link
              href={`mailto:${email}`}
              className='hover:text-rose transition-colors duration-300'
            >
              {email}
            </Link>
          )}
        </div>
      ),
    },
  ]

  return (
    <section className='w-full px-6 pt-12 pb-24 md:px-12 md:pt-16 md:pb-32 lg:px-16 lg:pt-20 lg:pb-40 xl:px-24'>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8'>
          {(title || hasImage) && (
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1 }}
              className='md:col-span-5'
            >
              <div className='md:sticky md:top-40'>
                {title && (
                  <h2 className='text-3xl tracking-wide uppercase text-black md:text-4xl'>
                    {title}
                  </h2>
                )}
                {hasImage && (
                  <div className={`relative aspect-3/4 overflow-hidden ${title ? 'mt-8' : ''}`}>
                    <Image
                      src={image.url}
                      alt={image.alt ?? ''}
                      fill
                      className='object-cover'
                      sizes='(max-width: 768px) 100vw, 42vw'
                      placeholder={image.blurDataURL ? 'blur' : 'empty'}
                      blurDataURL={image.blurDataURL ?? undefined}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          )}

          <div className='flex flex-col gap-12 text-right md:col-span-5 md:col-start-8 md:gap-16 lg:gap-20'>
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, x: 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1, delay: index * 0.25 }}
              >
                <h3 className='mb-6 text-lg uppercase text-black md:text-xl lg:text-2xl'>
                  {section.title}
                </h3>
                {section.content}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
