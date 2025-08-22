import { IntroText } from '@/components/IntroText'
import SlideAndFade from '@/components/SlideAndFade'
import { StaffMemberGrid } from '@/components/StaffMember'
import { getStaff } from '@/lib/helpers'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Team | Saint Rose',
}

export default async function Team() {
  const staffMembers = await getStaff()
  return (
    <div className='content'>
      <IntroText
        title='Meet the team'
        introText="Not-your-ordinary-hairdressers. Meet the people behind the chair. See someone you vibe with? Let us know when you book and we'll make the match."
      />

      <SlideAndFade delay={1.65}>
        <StaffMemberGrid staffMembers={staffMembers} />
      </SlideAndFade>
    </div>
  )
}
