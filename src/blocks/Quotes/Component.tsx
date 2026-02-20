'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './quotes.module.css'

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
    <div className={styles['quotes']}>
      <div className={styles['quotes-gallery']}>
        <Image src='/images/open-quote.svg' alt='Open Quote' width={50} height={50} unoptimized />
        <div className={styles['content']}>
          {quotes.length > 0 && (
            <div>
              <h2>{`${quotes[current].quoteText}`}&rdquo;</h2>
              <h5>{quotes[current].attribution}</h5>
            </div>
          )}
        </div>

        {quotes.length > 1 && (
          <div className={styles['controls']}>
            <button onClick={handleNext} aria-label='Next Quote'>
              <Image src='/images/arrow-right.svg' alt='Next Quote' width={56} height={56} unoptimized />
            </button>
            <button onClick={handlePrevious} aria-label='Previous Quote'>
              <Image src='/images/arrow-left.svg' alt='Previous Quote' width={56} height={56} unoptimized />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Quotes
