import Image from 'next/image'
import { StaffMember } from '@/payload-types'
import Link from 'next/link'

function StaffCard({
  index,
  staffMemberData,
}: {
  index: number
  staffMemberData: StaffMember
}) {
  const { name, role, photoSmall, instagram } = staffMemberData
  const photo =
    photoSmall && typeof photoSmall !== 'number' ? photoSmall : null

  if (!photo?.url) return null

  return (
    <li>
      <Image
        src={photo.url}
        alt={name}
        className='aspect-3/4 w-full object-cover'
        width={500}
        height={500}
        placeholder={photo.blurDataURL ? 'blur' : 'empty'}
        blurDataURL={photo.blurDataURL ?? undefined}
        sizes='(max-width: 639px) calc(100vw - 3rem), (max-width: 767px) 45vw, (max-width: 1279px) 30vw, 20vw'
        loading={index === 0 ? 'eager' : 'lazy'}
        fetchPriority={index === 0 ? 'high' : undefined}
      />
      <h3 className='mt-2 text-lg font-marist uppercase'>{name}</h3>
      <p className='text-base/5 italic'>{role}</p>
      {instagram && (
        <Link
          href={`https://www.instagram.com/${instagram}`}
          target='_blank'
          rel='noreferrer'
          className='mt-4 text-base/10 hover:text-rose transition-colors duration-300'
        >
          @{instagram}
        </Link>
      )}
    </li>
  )
}

export function StaffMemberGrid({
  staffMembers,
  columns,
}: {
  staffMembers: StaffMember[]
  columns: string
}) {

  return (
    <div className='py-24 md:py-32 lg:py-40' >
      <div className='mx-auto grid grid-cols-1 gap-20 px-6 lg:px-8 xl:grid-cols-3'>
        <div className='mx-auto max-w-2xl lg:mx-0'>
          <h2 className='text-lg tracking-tight text-pretty sm:text-xl uppercase'>
            Meet The Team
          </h2>
          <p className='mt-6 text-lg/6'>
            Not-your-ordinary-hairdressers. Meet the people behind the chair. See someone you vibe
            with? Let us know when you book and we&apos;ll make the match.
          </p>
        </div>
        <ul
          role='list'
          className={`mx-auto grid max-w-2xl gap-x-6 gap-y-20 ${columns} lg:mx-0 lg:max-w-none lg:gap-x-8 xl:col-span-2`}
        >
          {staffMembers.map((staffMember, index) => (
            <StaffCard key={staffMember.name} index={index} staffMemberData={staffMember} />
          ))}
        </ul>
      </div>
    </div>
  )
}
