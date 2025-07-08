import Image from 'next/image'

function StaffMember({ staffMemberData, staffMemberSelectHandler }) {
  const { name, role, photoSmall, video, instagram } = staffMemberData
  return (
    <div className='staff-member'>
      <div
        className='photo-container'
        // onClick={() => staffMemberSelectHandler && staffMemberSelectHandler(staffMemberData)}
      >
        <Image src={`https:${photoSmall}`} alt={name} className='photo' width={276} height={276} />
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

export default StaffMember
