'use client'

import { useState, useEffect } from 'react'
import { MOBILEBP } from '@/constants'
import classnames from 'classnames'
import styles from './service-list.module.css'
import { ServiceMenu } from '@/payload-types'

export const ServiceList = ({
  title,
  services,
}: Omit<ServiceMenu, 'id' | 'updatedAt' | 'createdAt'>) => {
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
          services.map(({ id, title, description, price }) => (
            <li className={styles['pricing-row']} key={id}>
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
