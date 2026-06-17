import { Metadata } from 'next'
import ApplyForm from '@/components/ApplyForm'

export const metadata: Metadata = {
  title: 'Careers | Saint Rose',
}

export default function Careers() {
  return (
    <article>
      <section className='w-full px-6 py-32 md:py-40 lg:py-48'>
        <h1 className='font-caslon text-xl uppercase'>Careers</h1>
        <p className='max-w-2xl text-xl md:text-3xl text-pretty mt-4'>
          Thank you so much for your interest in Saint Rose. Please fill out the following form.
        </p>
        <p className='max-w-2xl mt-6 text-base md:text-lg'>
          If you have any specific questions or concerns please reach out to{' '}
          <a
            href='mailto:manager@hairbysaintrose.com'
            className='underline underline-offset-4 transition-colors duration-300 hover:text-rose'
          >
            manager@hairbysaintrose.com
          </a>
        </p>
      </section>
      <ApplyForm />
    </article>
  )
}
