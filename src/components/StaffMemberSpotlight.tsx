import SlideAndFade from './SlideAndFade'
import Image from 'next/image'
import * as motion from 'motion/react-client'
import styles from './staff-spotlight.module.css'

function Video({ link, closeHandler }) {
  return (
    <div className={styles['video-container']}>
      <div className={styles['inner-container']}>
        <button className={styles['close']} onClick={() => closeHandler()}>
          <Image src='/images/close.svg' alt='close' width={43} height={43} />
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
    <div className={styles['bio-container']}>
      <div className={styles['photo-container']}>
        <div className={styles['photo']} style={{ backgroundImage: `url(${photoLarge.url})` }} />
      </div>
      <div className={styles['inner-container']}>
        <div className={styles['text-container']}>
          <SlideAndFade delay={0.35} distance='150px'>
            <div className={styles['text']}>
              <button className={styles['close']} onClick={() => closeHandler()}>
                <Image src='/images/close.svg' alt='close' width={43} height={43} />
              </button>
              <h3>{name}</h3>
              <h5>{role}</h5>
              <div className={styles['bio']}>{bio}</div>
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
    <motion.div
      className={styles['staff-member-spotlight']}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      {video ? (
        <Video link={video.url} closeHandler={closeHandler} />
      ) : (
        <Bio
          name={name}
          role={role}
          photoLarge={photoLarge}
          bio={bio}
          closeHandler={closeHandler}
        />
      )}
    </motion.div>
  )
}

export default StaffMemberSpotlight
