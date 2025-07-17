'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import StaffMemberSpotlight from './StaffMemberSpotlight'
import { AnimatePresence } from 'motion/react'

function StaffCard({ staffMemberData, staffMemberSelectHandler }) {
  const { name, role, photoSmall, video, instagram } = staffMemberData
  return (
    <div className='staff-member'>
      <div
        className='photo-container'
        onClick={() => staffMemberSelectHandler && staffMemberSelectHandler(staffMemberData)}
      >
        <Image src={photoSmall.url} alt={name} className='photo' width={276} height={276} />
        <div className='name-container'>
          <div className='name'>{name}</div>
          <div className='name-decoration'>
            {video ? (
              <Image src='/images/play-bio.svg' alt='play' width={20} height={20} />
            ) : (
              <Image src='/images/plus-bio.svg' alt='plus' width={20} height={20} />
            )}
          </div>
        </div>
        <div className='role'>{role}</div>
      </div>
      {instagram && (
        <div className='instagram'>
          <span>
            <a href={`https://www.instagram.com/${instagram}/`} target='_blank' rel='noreferrer'>
              @{instagram}
            </a>
          </span>
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

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('disable-scroll')
    } else {
      document.body.classList.remove('disable-scroll')
    }
  }, [isModalOpen])

  return (
    <div className='staff-container'>
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
