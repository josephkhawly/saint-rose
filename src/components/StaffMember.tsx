'use client'

import Image from 'next/image'
import { useState } from 'react'
import StaffMemberSpotlight from './StaffMemberSpotlight'
import { AnimatePresence } from 'motion/react'
import { placeholderBlur } from '@/constants'

function StaffCard({ staffMemberData, staffMemberSelectHandler }) {
  const { name, role, photoSmall, video, instagram } = staffMemberData
  return (
    <div className='staff-member'>
      <div
        className='group'
        onClick={() => staffMemberSelectHandler && staffMemberSelectHandler(staffMemberData)}
      >
        <Image
          src={photoSmall.url}
          alt={name}
          className='aspect-square h-full w-full object-cover object-[center_10%] transition-all duration-500 group-hover:sepia-60'
          width={276}
          height={276}
          placeholder='blur'
          blurDataURL={placeholderBlur}
        />
        <div className='mt-[18px] flex items-center justify-between'>
          <div className='name'>{name}</div>
          {video ? (
            <Image src='/images/play-bio.svg' alt='play' width={20} height={20} />
          ) : (
            <Image src='/images/plus-bio.svg' alt='plus' width={20} height={20} />
          )}
        </div>
        <div className='role'>{role}</div>
      </div>
      {instagram && (
        <div className='instagram'>
          <Image src='/images/instagram-gray.svg' alt='Instagram' width={25} height={24} />
          <a
            href={`https://www.instagram.com/${instagram}/`}
            target='_blank'
            rel='noreferrer'
            className='text-light-gray-2 hover:text-gray font-ap no-underline'
          >
            @{instagram}
          </a>
        </div>
      )}
    </div>
  )
}

export function StaffMemberGrid({ staffMembers }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedStaffMember, setSelectedStaffMember] = useState({})

  const handleStaffMemberSelect = (staffMemberData) => {
    if (!isModalOpen) {
      setIsModalOpen(true)
      setSelectedStaffMember(staffMemberData)
    }
  }

  const handleClearStaffMemberSelect = () => {
    setIsModalOpen(false)
    setSelectedStaffMember({})
  }

  return (
    <div className='mx-6 mt-20 grid grid-cols-1 gap-x-7 gap-y-17 md:grid-cols-2 lg:grid-cols-3 lg:mx-21 xl:grid-cols-4'>
      <AnimatePresence>
        {isModalOpen && (
          <StaffMemberSpotlight
            staffMemberDetails={selectedStaffMember}
            closeHandler={handleClearStaffMemberSelect}
          />
        )}
      </AnimatePresence>
      {staffMembers.map((staffMemberData, index) => (
        <StaffCard
          key={index}
          staffMemberData={staffMemberData}
          staffMemberSelectHandler={handleStaffMemberSelect}
        />
      ))}
    </div>
  )
}
