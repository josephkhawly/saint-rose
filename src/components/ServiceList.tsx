'use client'

import { useState, useEffect } from 'react'
import { MOBILEBP } from '@/constants'
import classnames from 'classnames'

interface ServiceListProps {
  title: string
  data: { title: string; description?: string; price: number }[]
}

const ServiceList = ({ title, data }: ServiceListProps) => {
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= MOBILEBP)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return (
    <div
      className={classnames('pricing-table', {
        open: isMobile && open,
      })}
    >
      <ul>
        <li className='header'>
          {isMobile ? (
            <div className='title-container'>
              <div className='head'>{title}</div>
              <div
                className={classnames('plusminus', {
                  active: open,
                })}
                onClick={() => setOpen(!open)}
              />
            </div>
          ) : (
            <div className='head'>{title}</div>
          )}
          {(!isMobile || open) && <div className='tail'>Base Price</div>}
        </li>
        {(!isMobile || open) &&
          data.map(({ title, description, price }) => (
            <li className='pricing-row' key={title}>
              <div className='head'>
                <div className='title'>{title}</div>
                {description && <div className='description'>{description}</div>}
              </div>
              <div className='tail'>${price}</div>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default ServiceList
