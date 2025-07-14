import Intro from '@/components/Intro'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Saint Rose',
}

export default function Home() {
  return (
    <div className='home'>
      <Intro />
    </div>
  )
}
