import React from 'react'
import { useForm } from 'react-hook-form'
import SlideAndFade from './SlideAndFade'
import Nav from './Nav'
import Footer from './Footer'
import Axios from 'axios'

const positionOptions = ['Salon Coordinator', 'Stylist', 'Apprentice']
const licenseOptions = ['Yes', 'No']

const TextInput = ({ type = 'text', label, name, register, required, errors, ...rest }) => (
  <div className='form-field'>
    <label className='field-label'>
      {label}
      <input type={type} {...register(name, required)} aria-invalid={!!errors[name]} {...rest} />
      {errors[name] && (
        <span className='submit-error' role='alert'>
          {errors[name].message}
        </span>
      )}
    </label>
  </div>
)

const TextAreaInput = ({ label, name, register, rules, errors, ...rest }) => (
  <div className='form-field'>
    <label className='field-label'>
      {label}
      <textarea {...register(name, rules)} aria-invalid={!!errors[name]} {...rest} />
      {errors[name] && (
        <span className='submit-error' role='alert'>
          {errors[name].message}
        </span>
      )}
    </label>
  </div>
)

const FileInput = ({ label, name, register, rules, errors }) => (
  <div className='upload-file-container'>
    <div className='field-label'>{label}</div>
    <div className='upload-file-wrapper'>
      <input type='file' name={name} {...register(name, rules)} />
    </div>
    {errors[name] && (
      <span className='submit-error' role='alert'>
        {errors[name].message}
      </span>
    )}
  </div>
)

const RadioGroup = ({ label, name, options, register, rules, errors }) => (
  <div className='checkbox-group'>
    <div className='field-label'>{label}</div>
    <div className='options-group'>
      {options.map((option) => (
        <label className='option-checkbox' key={option}>
          <input type='radio' name={name} value={option} {...register(name, rules)} />
          <span className='checkbox'></span>
          <span className='text'>{option}</span>
        </label>
      ))}
    </div>
    {errors[name] && (
      <span className='submit-error' role='alert'>
        {errors[name].message}
      </span>
    )}
  </div>
)

function Careers() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      resumeFile: null,
      startDate: '',
      instagramHandle: '',
      license: '',
      position: '',
      question1: '',
      question2: '',
      question3: '',
      question4: '',
      question5: '',
      question6: '',
    },
    mode: 'onTouched',
  })
  const [submitError, setSubmitError] = React.useState('')

  const onSubmit = async (data) => {
    setSubmitError('')
    const formData = new FormData()
    formData.append('firstName', data.firstName)
    formData.append('lastName', data.lastName)
    formData.append('email', data.email)
    formData.append('phone', data.phone)
    formData.append('address', data.address)
    formData.append('resumeFile', data.resumeFile)
    formData.append('startDate', data.startDate)
    formData.append('instagramHandle', data.instagramHandle)
    formData.append('position', data.position)
    formData.append('license', data.license)
    formData.append('question1', data.question1)
    formData.append('question2', data.question2)
    formData.append('question3', data.question3)
    formData.append('question4', data.question4)
    formData.append('question5', data.question5)
    formData.append('question6', data.question6)
    try {
      const response = await Axios.post('/careers', formData, {
        headers: { 'content-type': 'multipart/form-data' },
      })
      if (response.data.status === 'success') {
        reset()
      } else {
        setSubmitError(
          response.data.message || 'We had trouble submitting your request. Please give us a call.',
        )
      }
    } catch (error) {
      setSubmitError('We had trouble submitting your request. Please give us a call.')
    }
  }

  return (
    <div className='careers'>
      <Nav />
      <div className='content-container'>
        <div className='content'>
          <SlideAndFade delay={1000}>
            <div className='sub-nav'>Careers</div>
          </SlideAndFade>
          <SlideAndFade delay={1000}>
            <div className='intro'>
              <h3>
                Thank you so much for your interest in Saint Rose. Please fill out the following
                form.
              </h3>
              <h6>
                If you have any specific questions or concerns please reach out to{' '}
                <a href='mailto:manager@hairbysaintrose.com'>manager@hairbysaintrose.com</a>
              </h6>
            </div>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
              <RadioGroup
                label='What position are you applying for?*'
                name='position'
                options={positionOptions}
                register={register}
                rules={{ required: 'Please select a position.' }}
                errors={errors}
              />
              <div className='form-row'>
                <TextInput
                  label='First Name*'
                  name='firstName'
                  register={register}
                  required={{ required: 'First name is required.' }}
                  errors={errors}
                />
                <TextInput
                  label='Last Name*'
                  name='lastName'
                  register={register}
                  required={{ required: 'Last name is required.' }}
                  errors={errors}
                />
              </div>
              <div className='form-row'>
                <TextInput
                  label='Email*'
                  name='email'
                  type='email'
                  register={register}
                  required={{
                    required: 'Email is required.',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Invalid email address.',
                    },
                  }}
                  errors={errors}
                />
                <TextInput
                  label='Phone*'
                  name='phone'
                  type='tel'
                  register={register}
                  required={{
                    required: 'Phone is required.',
                    pattern: {
                      value:
                        /^\+?1?\s?(\([2-9][0-9]{2}\)|[2-9][0-9]{2})[\s.-]?[0-9]{3}[\s.-]?[0-9]{4}$/,
                      message: 'Please enter a valid US phone number.',
                    },
                  }}
                  errors={errors}
                />
              </div>
              <div className='form-row'>
                <TextInput
                  label='Address*'
                  name='address'
                  register={register}
                  required={{ required: 'Address is required.' }}
                  errors={errors}
                />
                <TextInput
                  label='When can you start?*'
                  name='startDate'
                  type='date'
                  register={register}
                  required={{ required: 'Start date is required.' }}
                  errors={errors}
                />
              </div>
              <div className='form-row'>
                <TextInput
                  label='Business Instagram handle'
                  name='instagramHandle'
                  register={register}
                  errors={errors}
                />
                <RadioGroup
                  label='Do you have a valid Texas Cosmetology License?*'
                  name='license'
                  options={licenseOptions}
                  register={register}
                  rules={{ required: 'Please select an option.' }}
                  errors={errors}
                />
              </div>
              <div className='form-row'>
                <FileInput
                  label='Resume*'
                  name='resumeFile'
                  register={register}
                  rules={{ required: 'Resume is required.' }}
                  errors={errors}
                />
              </div>
              <span className='form-section'></span>
              <TextAreaInput
                label='What do you know about Saint Rose?'
                name='question1'
                register={register}
                rules={{ maxLength: { value: 800, message: 'Max 800 characters.' } }}
                errors={errors}
              />
              <TextAreaInput
                label='What are you looking for in a salon?'
                name='question2'
                register={register}
                rules={{ maxLength: { value: 800, message: 'Max 800 characters.' } }}
                errors={errors}
              />
              <TextAreaInput
                label='Give us an example of exceptional customer service.'
                name='question3'
                register={register}
                rules={{ maxLength: { value: 800, message: 'Max 800 characters.' } }}
                errors={errors}
              />
              <TextAreaInput
                label='How do you want to improve yourself in the next year?'
                name='question4'
                register={register}
                rules={{ maxLength: { value: 800, message: 'Max 800 characters.' } }}
                errors={errors}
              />
              <TextAreaInput
                label='Who has impacted you the most in your career and how?'
                name='question5'
                register={register}
                rules={{ maxLength: { value: 800, message: 'Max 800 characters.' } }}
                errors={errors}
              />
              <TextAreaInput
                label='Is there anything else you would like us to know?'
                name='question6'
                register={register}
                rules={{ maxLength: { value: 800, message: 'Max 800 characters.' } }}
                errors={errors}
              />
              <div className='form-footer'>
                <button
                  className='submit-button'
                  id='submit-button'
                  type='submit'
                  disabled={isSubmitting}
                >
                  {isSubmitSuccessful ? 'Sent!' : isSubmitting ? 'Sending...' : 'Submit'}
                </button>
                {submitError && (
                  <span className='submit-error' role='alert'>
                    {submitError}
                  </span>
                )}
              </div>
            </form>
          </SlideAndFade>
          <Footer />
        </div>
      </div>
      <div className='entrance' />
      <div className='exit' />
      <div className='exit-2' />
    </div>
  )
}

export default Careers
