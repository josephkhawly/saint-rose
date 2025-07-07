import SlideAndFade from '../../components/SlideAndFade'
import { submitCareerApplication } from '../actions'

const positionOptions = ['Salon Coordinator', 'Stylist', 'Apprentice']
const licenseOptions = ['Yes', 'No']

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
          <form className='form' action={submitCareerApplication}>
            <div className='checkbox-group'>
              <div className='field-label'>What position are you applying for?*</div>
              <div className='options-group'>
                {positionOptions.map((option) => (
                  <label className='option-checkbox' key={option}>
                    <input type='radio' name='position' value={option} required />
                    <span className='checkbox'></span>
                    <span className='text'>{option}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className='form-row'>
              <div className='form-field'>
                <label className='field-label'>
                  First Name*
                  <input type='text' name='firstName' required />
                </label>
              </div>
              <div className='form-field'>
                <label className='field-label'>
                  Last Name*
                  <input type='text' name='lastName' required />
                </label>
              </div>
            </div>
            <div className='form-row'>
              <div className='form-field'>
                <label className='field-label'>
                  Email*
                  <input type='email' name='email' required />
                </label>
              </div>
              <div className='form-field'>
                <label className='field-label'>
                  Phone*
                  <input
                    type='tel'
                    name='phone'
                    required
                    pattern='^\+?1?\s?(\([2-9][0-9]{2}\)|[2-9][0-9]{2})[\s.-]?[0-9]{3}[\s.-]?[0-9]{4}$'
                  />
                </label>
              </div>
            </div>
            <div className='form-row'>
              <div className='form-field'>
                <label className='field-label'>
                  Address*
                  <input type='text' name='address' required />
                </label>
              </div>
              <div className='form-field'>
                <label className='field-label'>
                  When can you start?*
                  <input type='date' name='startDate' required />
                </label>
              </div>
            </div>
            <div className='form-row'>
              <div className='form-field'>
                <label className='field-label'>
                  Business Instagram handle
                  <input type='text' name='instagramHandle' />
                </label>
              </div>
              <div className='checkbox-group'>
                <div className='field-label'>Do you have a valid Texas Cosmetology License?*</div>
                <div className='options-group'>
                  {licenseOptions.map((option) => (
                    <label className='option-checkbox' key={option}>
                      <input type='radio' name='license' value={option} required />
                      <span className='checkbox'></span>
                      <span className='text'>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className='form-row'>
              <div className='upload-file-container'>
                <div className='field-label'>Resume*</div>
                <div className='upload-file-wrapper'>
                  <input type='file' name='resumeFile' required />
                </div>
              </div>
            </div>
            <span className='form-section'></span>
            <div className='form-field'>
              <label className='field-label'>
                What do you know about Saint Rose?
                <textarea name='question1' maxLength={800} />
              </label>
            </div>
            <div className='form-field'>
              <label className='field-label'>
                What are you looking for in a salon?
                <textarea name='question2' maxLength={800} />
              </label>
            </div>
            <div className='form-field'>
              <label className='field-label'>
                Give us an example of exceptional customer service.
                <textarea name='question3' maxLength={800} />
              </label>
            </div>
            <div className='form-field'>
              <label className='field-label'>
                How do you want to improve yourself in the next year?
                <textarea name='question4' maxLength={800} />
              </label>
            </div>
            <div className='form-field'>
              <label className='field-label'>
                Who has impacted you the most in your career and how?
                <textarea name='question5' maxLength={800} />
              </label>
            </div>
            <div className='form-field'>
              <label className='field-label'>
                Is there anything else you would like us to know?
                <textarea name='question6' maxLength={800} />
              </label>
            </div>
            <div className='form-footer'>
              <button className='submit-button' id='submit-button' type='submit'>
                Submit
              </button>
            </div>
          </form>
        </SlideAndFade>
      </div>
    </div>
  )
}
