'use client'

import { useActionState } from 'react'
import { submitCareerApplication } from '../app/actions'

const positionOptions = ['Salon Coordinator', 'Stylist', 'Apprentice']
const licenseOptions = ['Yes', 'No']

function FormField({
  label,
  name,
  type,
  required,
  error,
}: {
  label: string
  name: string
  type: string
  required?: boolean
  error?: string
}) {
  return (
    <div className='form-field'>
      <label className='field-label'>
        {label}
        {required && <span className='required'>*</span>}
        {type === 'textarea' ? (
          <textarea name={name} maxLength={800} />
        ) : (
          <input type={type} name={name} />
        )}
      </label>
      {error && <div className='field-error'>{error}</div>}
    </div>
  )
}

function CheckboxGroup({
  label,
  name,
  options,
  error,
}: {
  label: string
  name: string
  options: string[]
  error?: string
}) {
  return (
    <div className='checkbox-group'>
      <div className='field-label'>{label}*</div>
      <div className='options-group'>
        {options.map((option) => (
          <label className='option-checkbox' key={option}>
            <input type='radio' name={name} value={option} />
            <span className='checkbox'></span>
            <span className='text'>{option}</span>
          </label>
        ))}
      </div>
      {error && <div className='field-error'>{error}</div>}
    </div>
  )
}

export default function ApplyForm() {
  const [state, formAction, pending] = useActionState(submitCareerApplication, undefined)
  const fieldErrors = state?.fieldErrors || {}
  return (
    <form className='form' action={formAction}>
      <CheckboxGroup
        label='What position are you applying for?'
        name='position'
        options={positionOptions}
        error={fieldErrors.position}
      />
      <div className='form-row'>
        <FormField
          label='First Name'
          name='firstName'
          type='text'
          required
          error={fieldErrors.firstName}
        />
        <FormField
          label='Last Name'
          name='lastName'
          type='text'
          required
          error={fieldErrors.lastName}
        />
      </div>
      <div className='form-row'>
        <FormField label='Email' name='email' type='email' required error={fieldErrors.email} />
        <FormField label='Phone' name='phone' type='tel' required error={fieldErrors.phone} />
      </div>
      <div className='form-row'>
        <FormField
          label='Address'
          name='address'
          type='text'
          required
          error={fieldErrors.address}
        />
        <FormField
          label='When can you start?'
          name='startDate'
          type='date'
          required
          error={fieldErrors.startDate}
        />
      </div>
      <div className='form-row'>
        <FormField
          label='Business Instagram handle'
          name='instagramHandle'
          type='text'
          error={fieldErrors.instagramHandle}
        />
        <CheckboxGroup
          label='Do you have a valid Texas Cosmetology License?'
          name='license'
          options={licenseOptions}
          error={fieldErrors.license}
        />
      </div>
      <div className='form-row'>
        <div className='upload-file-container'>
          <div className='field-label'>Resume*</div>
          <div className='upload-file-wrapper'>
            <input
              type='file'
              name='resumeFile'
              accept='application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            />
          </div>
          {fieldErrors.resumeFile && <div className='field-error'>{fieldErrors.resumeFile}</div>}
        </div>
      </div>
      <span className='form-section'></span>
      <FormField
        label='What do you know about Saint Rose?'
        name='question1'
        type='textarea'
        error={fieldErrors.question1}
      />
      <FormField
        label='What are you looking for in a salon?'
        name='question2'
        type='textarea'
        error={fieldErrors.question2}
      />
      <FormField
        label='Give us an example of exceptional customer service.'
        name='question3'
        type='textarea'
        error={fieldErrors.question3}
      />
      <FormField
        label='How do you want to improve yourself in the next year?'
        name='question4'
        type='textarea'
        error={fieldErrors.question4}
      />
      <FormField
        label='Who has impacted you the most in your career and how?'
        name='question5'
        type='textarea'
        error={fieldErrors.question5}
      />
      <FormField
        label='Is there anything else you would like us to know?'
        name='question6'
        type='textarea'
        error={fieldErrors.question6}
      />
      <div className='form-footer'>
        <button className='submit-button' id='submit-button' type='submit' disabled={pending}>
          {pending ? 'Submitting...' : 'Submit'}
        </button>
        {state && state.errorMessage && <p className='error-message'>{state.errorMessage}</p>}
        {state && state.successMessage && <p className='success-message'>{state.successMessage}</p>}
      </div>
    </form>
  )
}
