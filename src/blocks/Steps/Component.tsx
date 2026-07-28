import * as motion from 'motion/react-client'
import type { AccentColor } from '@/fields/accentColor'
import { toRoman } from '@/lib/toRoman'
import type { StepsBlock } from '@/payload-types'

const numeralColorClass = {
  rose: 'text-rose',
  'deep-rose': 'text-deep-rose',
  'dark-chocolate': 'text-dark-chocolate',
  mint: 'text-mint',
  lavender: 'text-lavender',
  sky: 'text-sky',
  garden: 'text-garden',
  olive: 'text-olive',
  lima: 'text-lima',
} as const satisfies Record<AccentColor, string>

type StepsProps = StepsBlock

export function Steps({ eyebrow, lede, accentColor = 'rose', steps }: StepsProps) {
  const accent =
    accentColor && accentColor in numeralColorClass ? (accentColor as AccentColor) : 'rose'

  return (
    <section className='w-full bg-saint px-6 pt-12 pb-24 md:px-12 md:pt-16 md:pb-32 lg:px-16 lg:pt-20 lg:pb-40 xl:px-24'>
      <div className='container mx-auto'>
        {(eyebrow || lede) && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1 }}
            className='mb-16 max-w-3xl md:mb-24 lg:mb-32'
          >
            {eyebrow && (
              <span className='small-caps mb-6 block text-sm font-marist text-dark-chocolate'>
                {eyebrow}
              </span>
            )}
            {lede && (
              <p className='whitespace-break-spaces text-2xl leading-[1.1] text-black md:text-3xl lg:text-4xl'>
                {lede}
              </p>
            )}
          </motion.div>
        )}

        <ol className='list-none'>
          {steps?.map((step, index) => (
            <li
              key={step.id ?? index}
              className={`border-dark-chocolate/20 pb-10 md:pb-14 lg:pb-16 ${
                index === 0 ? 'pt-0' : 'border-t pt-10 md:pt-14 lg:pt-16'
              }`}
            >
              <div className='grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8'>
                <motion.div
                  initial={{ opacity: 0, x: -32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1 }}
                  className='flex items-baseline gap-3 md:col-span-5'
                >
                  <span
                    className={`text-lg uppercase leading-none md:text-xl lg:text-2xl ${numeralColorClass[accent]}`}
                    aria-hidden
                  >
                    {toRoman(index + 1)}.
                  </span>
                  <h3 className='text-lg uppercase text-black md:text-xl lg:text-2xl'>
                    {step.title}
                  </h3>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className='md:col-span-5 md:col-start-8'
                >
                  <p className='whitespace-break-spaces text-base leading-relaxed text-black lg:text-lg'>
                    {step.description}
                  </p>
                  {step.link && (
                    <div className='mt-6'>
                      <a href={step.link} className='small-caps text-link text-sm font-marist'>
                        {step.linkLabel || 'Learn More'}
                      </a>
                    </div>
                  )}
                </motion.div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
