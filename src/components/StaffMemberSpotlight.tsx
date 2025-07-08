import SlideAndFade from './SlideAndFade'
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

function Video({ link, closeHandler }) {
  return (
    <div className='video-container'>
      <div className='inner-container'>
        <button className='close' onClick={() => closeHandler()}>
          <Image src='/images/close.svg' alt='close' width={24} height={24} />
        </button>
        <video autoPlay controls>
          <source src={link} type='video/mp4' />
        </video>
      </div>
    </div>
  )
}

function Bio({ name, role, photoLarge, bio, closeHandler }) {
  return (
    <div className='bio-container'>
      <div className='photo-container'>
        <div className='photo' style={{ backgroundImage: `url(${photoLarge})` }} />
      </div>
      <div className='inner-container'>
        <div className='text-container'>
          <SlideAndFade delay={350} distance='150px'>
            <div className='text'>
              <button className='close' onClick={() => closeHandler()}>
                <Image src='/images/close.svg' alt='close' width={24} height={24} />
              </button>
              <h3>{name}</h3>
              <h5>{role}</h5>
              {documentToReactComponents(bio)}
            </div>
          </SlideAndFade>
        </div>
      </div>
    </div>
  )
}

function StaffMemberSpotlight({ staffMemberDetails, closeHandler }) {
  const { name, role, photoLarge, bio, video } = staffMemberDetails
  return (
    <div className='staff-member-spotlight'>
      {video ? (
        <Video link={video} closeHandler={closeHandler} />
      ) : (
        <Bio
          name={name}
          role={role}
          photoLarge={photoLarge}
          bio={bio}
          closeHandler={closeHandler}
        />
      )}
    </div>
  )
}

export default StaffMemberSpotlight
