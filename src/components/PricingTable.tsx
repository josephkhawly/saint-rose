'use client'

import { useState } from 'react'
import MediaQuery from 'react-responsive'
import { MOBILEBP, DESKTOPTRANSITIONBP } from '../constants'
import classnames from 'classnames'

interface PricingTableProps {
  title: string;
  data: { title: string; description?: string; price: string }[];
}

const PricingTable = ({ title, data }: PricingTableProps) => {
  const [open, setOpen] = useState(false)

  return (
    <div className='services-block'>
      <MediaQuery minWidth={DESKTOPTRANSITIONBP}>
        <div className='pricing-table'>
          <ul>
            <li className='header'>
              <div className='head'>{title}</div>
              <div className='tail'>Base Price</div>
            </li>
            {data.map(({ title, description, price }) => {
              return (
                <li className='pricing-row' key={title}>
                  <div className='head'>
                    <div className='title'>{title}</div>
                    {description && <div className='description'>{description}</div>}
                  </div>
                  <div className='tail'>${price}</div>
                </li>
              )
            })}
          </ul>
        </div>
      </MediaQuery>

      <MediaQuery maxWidth={MOBILEBP}>
        <div
          className={classnames('pricing-table', {
            open: open,
          })}
        >
          <ul>
            <li className='header'>
              <div className='title-container'>
                <div className='head'>{title}</div>
                <div
                  className={classnames('plusminus', {
                    active: open,
                  })}
                  onClick={() => {
                    setOpen((open) => !open)
                  }}
                ></div>
              </div>
              {open && <div className='tail'>Base Price</div>}
            </li>
            {open &&
              data.map(({ title, description, price }) => {
                return (
                  <li className='pricing-row' key={title}>
                    <div className='head'>
                      <div className='title'>{title}</div>
                      {description && <div className='description'>{description}</div>}
                    </div>
                    <div className='tail'>${price}</div>
                  </li>
                )
              })}
          </ul>
        </div>
      </MediaQuery>
    </div>
  )
}

export default PricingTable
