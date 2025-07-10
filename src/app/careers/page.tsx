import { Metadata } from 'next'
import SlideAndFade from '../../components/SlideAndFade'
import ApplyForm from '../../components/ApplyForm'

export const metadata: Metadata = {
  title: 'Careers | Saint Rose',
}

export default function Careers() {
  return (
    <div className='careers'>
      <div className='content'>
        <SlideAndFade delay={1000}>
          <div className='sub-nav'>Careers</div>
        </SlideAndFade>
        <SlideAndFade delay={1000}>
          <div className='intro'>
            <h3>
              Thank you so much for your interest in Saint Rose. Please fill out the following form.
            </h3>
            <h6>
              If you have any specific questions or concerns please reach out to{' '}
              <a href='mailto:manager@hairbysaintrose.com'>manager@hairbysaintrose.com</a>
            </h6>
          </div>
          <ApplyForm />
        </SlideAndFade>
      </div>
    </div>
  )
}
