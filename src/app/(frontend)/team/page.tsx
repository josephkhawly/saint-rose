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
    <div className='team'>
      <div className='content-container'>
        <div className='content'>
          <div className='inner-content-container'>
            <div className='header'>
              <SlideAndFade delay={1.25}>
                <h5>Meet the team</h5>
              </SlideAndFade>
              <SlideAndFade delay={1.45}>
                <h3>
                  Not-your-ordinary-hairdressers. Meet the people behind the chair. See someone you
                  vibe with? Let us know when you book and we&apos;ll make the match.
                </h3>
              </SlideAndFade>
            </div>

            <SlideAndFade delay={1.65}>
              <StaffMemberGrid staffMembers={staffMembers} />
            </SlideAndFade>
          </div>
        </div>
      </div>
    </div>
  )
}
