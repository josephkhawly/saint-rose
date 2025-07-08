'use client'

import { useState } from 'react'
import Image from 'next/image'

const Quotes = ({ quotes }: { quotes: any[] }) => {
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
    <div className='quotes'>
      <div className='quotes-gallery'>
        <div className='open-quote' />
        <div className='content'>
          {quotes.length > 0 && (
            <div>
              <h2>{`${quotes[current].quoteText}`}&rdquo;</h2>
              <h5>{quotes[current].attribution}</h5>
            </div>
          )}
        </div>

        <div className='controls'>
          <button onClick={handleNext} aria-label='Next Quote'>
            <Image src='/images/arrow-right.svg' alt='Next Quote' width={56} height={56} />
          </button>
          <button onClick={handlePrevious} aria-label='Previous Quote'>
            <Image src='/images/arrow-left.svg' alt='Previous Quote' width={56} height={56} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Quotes
