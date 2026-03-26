'use client'

import { useState } from 'react'
import { toRoman } from '@/lib/toRoman'

const Quotes = ({ quotes }) => {
  const [current, setCurrent] = useState(0)

  const handleNext = () => {
    setCurrent((prevCurrent) => {
      if (prevCurrent + 1 >= quotes.length || quotes.length === 0) {
        return 0
      }
      return prevCurrent + 1
    })
  }

  const handlePrevious = () => {
    setCurrent((prevCurrent) => {
      if (prevCurrent - 1 < 0 || quotes.length === 0) {
        return quotes.length - 1
      }
      return prevCurrent - 1
    })
  }

  return (
    <section className='py-12 md:py-36'>
      <div className='max-w-4xl mr-auto px-10'>
        <div className='text-lg text-dark-chocolate font-caslon'>
          {toRoman(current + 1)}/{toRoman(quotes.length)}
        </div>
        <blockquote className='md:text-4xl text-xl mb-4 text-balance'>
          {quotes[current].quoteText}
        </blockquote>
        <cite className='italic'>— {quotes[current].attribution}</cite>
      </div>
      <div className='flex gap-8 mr-auto px-10 my-5 justify-between md:justify-start'>
        <button onClick={handlePrevious} className='text-2xl cursor-pointer'>
          ←
        </button>
        <button onClick={handleNext} className='text-2xl cursor-pointer'>
          →
        </button>
      </div>
    </section>
  )
}

export default Quotes
