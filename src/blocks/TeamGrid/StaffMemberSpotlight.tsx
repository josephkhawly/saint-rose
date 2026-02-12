import SlideAndFade from '@/components/SlideAndFade'
import Image from 'next/image'
import * as motion from 'motion/react-client'
import styles from './staff-spotlight.module.css'
import { useScrollLock } from 'usehooks-ts'

function Video({ link, closeHandler }) {
  return (
    <div className='fixed flex h-full w-full items-center justify-center'>
      <div className='relative flex w-full bg-black/95'>
        <button
          className='absolute top-6 right-6 z-10 cursor-pointer border-none bg-transparent outline-none md:top-12 md:right-12'
          onClick={closeHandler}
        >
          <Image src='/images/close.svg' alt='close' width={43} height={43} />
        </button>
        <video autoPlay controls className='h-[calc(100vh*0.9)] w-full object-contain'>
          <source src={link} type='video/mp4' />
        </video>
      </div>
    </div>
  )
}

function Bio({ name, role, photoLarge, bio, closeHandler }) {
  return (
    <div className='h-full w-full overflow-y-scroll'>
      <div className='fixed hidden h-full w-full items-center justify-center sm:flex'>
        <div className={styles['photo']} style={{ backgroundImage: `url(${photoLarge?.url})` }} />
      </div>
      <div className='relative flex justify-center'>
        <div className={styles['text-container']}>
          <SlideAndFade delay={0.35} distance='150px'>
            <div className={styles['text']}>
              <button
                className='absolute top-6 right-6 z-10 cursor-pointer border-none bg-transparent outline-none md:top-12 md:right-12'
                onClick={closeHandler}
              >
                <Image src='/images/close.svg' alt='close' width={43} height={43} />
              </button>
              <h3>{name}</h3>
              <h5>{role}</h5>
              <div className='whitespace-pre-wrap'>{bio}</div>
            </div>
          </SlideAndFade>
        </div>
      </div>
    </div>
  )
}

export default function StaffMemberSpotlight({ staffMemberDetails, closeHandler }) {
  const { name, role, photoLarge, bio, video } = staffMemberDetails
  useScrollLock()

  return (
    <motion.div
      className={styles['staff-member-spotlight']}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      {video ? (
        <Video link={`https://3k4a31g25n.ufs.sh/f/${video._key}`} closeHandler={closeHandler} />
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
