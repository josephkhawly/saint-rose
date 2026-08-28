import { StaffMemberGrid } from './StaffMember'
import { getStaff } from '@/lib/helpers'
import { TeamGridBlock } from '@/payload-types'

export async function TeamGrid({ blockTitle, columns, description }: TeamGridBlock) {
  const staffMembers = await getStaff()

  const columnsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
  }

  return (
    <StaffMemberGrid
      blockTitle={blockTitle}
      columns={columnsClass[columns]}
      description={description}
      staffMembers={staffMembers}
    />
  )
}
