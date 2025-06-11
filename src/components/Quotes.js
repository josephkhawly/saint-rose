import React, { useState } from 'react'

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
        <button onClick={handleNext}>
          <div className='arrow-right'></div>
        </button>
        <button onClick={handlePrevious}>
          <div className='arrow-left'></div>
        </button>
      </div>
    </div>
  )
}

export default Quotes
