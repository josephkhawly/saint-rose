'use client'

import { useActionState } from 'react'
import { submitCareerApplication } from '../app/(frontend)/actions'

const positionOptions = ['Salon Coordinator', 'Stylist', 'Apprentice']
const licenseOptions = ['Yes', 'No']

const inputClasses =
  'mt-3 block w-full h-12 border border-black/80 bg-transparent px-3.5 text-lg focus:border-deep-rose focus:outline-none transition-colors'
const textareaClasses =
  'mt-3 block w-full min-h-[124px] resize-y border border-black/80 bg-transparent px-3.5 py-2.5 text-lg focus:border-deep-rose focus:outline-none transition-colors'
const labelClasses = 'block text-base leading-8'
const fieldClasses = 'mb-10 md:mb-11'
const errorClasses = 'mt-3 block text-base text-red-600'

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
    <div className={fieldClasses}>
      <label className={labelClasses}>
        {label}
        {required && '*'}
        {type === 'textarea' ? (
          <textarea className={textareaClasses} name={name} maxLength={800} />
        ) : (
          <input className={inputClasses} type={type} name={name} />
        )}
      </label>
      {error && <div className={errorClasses}>{error}</div>}
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
    <div className={fieldClasses}>
      <div className={labelClasses}>{label}*</div>
      <div className='mt-3 space-y-3'>
        {options.map((option) => (
          <label className='flex cursor-pointer items-center gap-3' key={option}>
            <input type='radio' name={name} value={option} className='peer sr-only' />
            <span className='h-[19px] w-[19px] shrink-0 border border-black transition-colors peer-checked:bg-sky' />
            <span className='text-base leading-6'>{option}</span>
          </label>
        ))}
      </div>
      {error && <div className={errorClasses}>{error}</div>}
    </div>
  )
}

export default function ApplyForm() {
  const [state, formAction, pending] = useActionState(submitCareerApplication, undefined)
  const fieldErrors = state?.fieldErrors || {}

  return (
    <form
      className='max-w-7xl px-6 pb-24 md:pb-32'
      action={formAction}
    >
      <CheckboxGroup
        label='What position are you applying for?'
        name='position'
        options={positionOptions}
        error={fieldErrors.position}
      />

      <div className='grid grid-cols-1 gap-x-12 md:grid-cols-2'>
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

      <div className='grid grid-cols-1 gap-x-12 md:grid-cols-2'>
        <FormField label='Email' name='email' type='email' required error={fieldErrors.email} />
        <FormField label='Phone' name='phone' type='tel' required error={fieldErrors.phone} />
      </div>

      <div className='grid grid-cols-1 gap-x-12 md:grid-cols-2'>
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

      <div className='grid grid-cols-1 gap-x-12 md:grid-cols-2'>
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

      <div className='grid grid-cols-1 gap-x-12 md:grid-cols-2'>
        <div className={fieldClasses}>
          <div className={labelClasses}>Resume*</div>
          <input
            className='mt-3 block w-full text-sm capitalize file:mr-3.5 file:h-12 file:cursor-pointer file:border-0 file:bg-rose file:px-4 file:text-sm file:text-black file:uppercase'
            type='file'
            name='resumeFile'
            accept='application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          />
          {fieldErrors.resumeFile && (
            <div className={errorClasses}>{fieldErrors.resumeFile}</div>
          )}
        </div>
      </div>

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

      <div className='mt-16 max-w-3/4 pt-8 md:mt-24'>
        <button
          className='inline-flex h-12 w-[150px] cursor-pointer items-center justify-center bg-deep-rose text-sm uppercase text-white transition-colors duration-300 hover:bg-deep-rose disabled:cursor-not-allowed disabled:opacity-50'
          id='submit-button'
          type='submit'
          disabled={pending}
        >
          {pending ? 'Submitting...' : 'Submit'}
        </button>
        {state && state.errorMessage && (
          <p className='mt-6 text-base text-red-600'>{state.errorMessage}</p>
        )}
        {state && state.successMessage && (
          <p className='mt-6 text-base'>{state.successMessage}</p>
        )}
      </div>
    </form>
  )
}
