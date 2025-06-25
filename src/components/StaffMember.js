import React from 'react'

function StaffMember({ staffMemberData, staffMemberSelectHandler }) {
  const { name, role, photoSmall, video, instagram } = staffMemberData
  return (
    <div className='staff-member'>
      <div className='photo-container' onClick={() => staffMemberSelectHandler(staffMemberData)}>
        <img src={photoSmall} alt={name} className='photo' />
        <div className='name-container'>
          <div className='name'>{name}</div>
          <div className='name-decoration'>
            {video ? (
              <img src='/images/play-bio.svg' alt='play' />
            ) : (
              <img src='/images/plus-bio.svg' alt='plus' />
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

export default StaffMember
