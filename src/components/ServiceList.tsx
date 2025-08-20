'use client'

import { useState, useEffect } from 'react'
import { MOBILEBP } from '@/constants'
import classnames from 'classnames'
import styles from './service-list.module.css'

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
      className={classnames(styles['pricing-table'], {
        [styles['open']]: isMobile && open,
      })}
    >
      <ul>
        <li className={styles['header']}>
          {isMobile ? (
            <div className={styles['title-container']}>
              <div className={styles['head']}>{title}</div>
              <div
                className={classnames(styles['plusminus'], {
                  [styles['active']]: open,
                })}
                onClick={() => setOpen(!open)}
              />
            </div>
          ) : (
            <div className={styles['head']}>{title}</div>
          )}
          {(!isMobile || open) && <div className={styles['tail']}>Base Price</div>}
        </li>
        {(!isMobile || open) &&
          data.map(({ title, description, price }) => (
            <li className={styles['pricing-row']} key={title}>
              <div className={styles['head']}>
                <div className={styles['title']}>{title}</div>
                {description && <div className={styles['description']}>{description}</div>}
              </div>
              <div className={styles['tail']}>${price}</div>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default ServiceList
