'use server'

import config from '@payload-config'
import { revalidatePath } from 'next/cache'
import { getPayload } from 'payload'
import * as z from 'zod/v4'

function getSubmittedValues(formData: FormData) {
  const get = (key: string) => {
    const value = formData.get(key)
    return typeof value === 'string' ? value : ''
  }

  return {
    address: get('address'),
    email: get('email'),
    firstName: get('firstName'),
    instagramHandle: get('instagramHandle'),
    lastName: get('lastName'),
    license: get('license'),
    phone: get('phone'),
    position: get('position'),
    question1: get('question1'),
    question2: get('question2'),
    question3: get('question3'),
    question4: get('question4'),
    question5: get('question5'),
    question6: get('question6'),
    startDate: get('startDate'),
  }
}

function formatStartDate(date: string) {
  const [year, month, day] = date.split('-')
  if (!year || !month || !day) return date
  return `${month}/${day}/${year}`
}

export async function submitCareerApplication(prevState: unknown, formData: FormData) {
  const schema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.email('Invalid email address'),
    phone: z.string().min(1, 'Phone is required'),
    address: z.string().min(1, 'Address is required'),
    startDate: z.string().min(1, 'Start date is required'),
    instagramHandle: z.string().optional(),
    license: z.enum(['Yes', 'No'], {
      error: 'Please select an option',
    }),
    position: z.enum(['Salon Coordinator', 'Stylist', 'Apprentice'], {
      error: 'Please select an option',
    }),
    question1: z.string().max(800, 'Response must be 800 characters or less').optional(),
    question2: z.string().max(800, 'Response must be 800 characters or less').optional(),
    question3: z.string().max(800, 'Response must be 800 characters or less').optional(),
    question4: z.string().max(800, 'Response must be 800 characters or less').optional(),
    question5: z.string().max(800, 'Response must be 800 characters or less').optional(),
    question6: z.string().max(800, 'Response must be 800 characters or less').optional(),
    resumeFile: z
      .file()
      .max(1024 * 1024 * 5, 'File must be less than 5MB')
      .mime(
        [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ],
        {
          error: 'File must be a PDF or Word document',
        },
      ),
  })

  const data = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    address: formData.get('address'),
    startDate: formData.get('startDate'),
    instagramHandle: formData.get('instagramHandle'),
    license: formData.get('license'),
    position: formData.get('position'),
    question1: formData.get('question1'),
    question2: formData.get('question2'),
    question3: formData.get('question3'),
    question4: formData.get('question4'),
    question5: formData.get('question5'),
    question6: formData.get('question6'),
    resumeFile: formData.get('resumeFile'),
  }

  const values = getSubmittedValues(formData)

  const result = await schema.safeParseAsync(data)
  if (!result.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of result.error.issues) {
      if (issue.path && issue.path.length > 0) {
        const field = issue.path[0] as string
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message
        }
      }
    }
    return { fieldErrors, formKey: crypto.randomUUID(), values }
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    startDate,
    instagramHandle,
    license,
    position,
    question1,
    question2,
    question3,
    question4,
    question5,
    question6,
    resumeFile,
  } = result.data

  try {
    const payload = await getPayload({ config })
    const resumeBuffer = Buffer.from(await resumeFile.arrayBuffer())

    await payload.sendEmail({
      to: 'joseph.khawly@gmail.com',
      subject: 'Submission from careers page',
      html: `
      <strong>What position are you applying for?:</strong> ${position}
      <br />
      <strong>First Name:</strong> ${firstName}
      <br />
      <strong>Last Name:</strong> ${lastName}
      <br />
      <strong>Email:</strong> ${email}
      <br />
      <strong>Phone:</strong> ${phone}
      <br />
      <strong>Address:</strong> ${address}
      <br />
      <strong>When can you start?:</strong> ${formatStartDate(startDate)}
      <br />
      <strong>Business Instagram handle:</strong> ${instagramHandle ?? ''}
      <br />
      <strong>Do you have a valid Texas Cosmetology License?:</strong> ${license}
      <br />
      <strong>What do you know about Saint Rose?:</strong> ${question1 ?? ''}
      <br />
      <strong>What are you looking for in a salon?:</strong> ${question2 ?? ''}
      <br />
      <strong>Give us an example of exceptional customer service.:</strong> ${question3 ?? ''}
      <br />
      <strong>How do you want to improve yourself in the next year?:</strong> ${question4 ?? ''}
      <br />
      <strong>Who has impacted you the most in your career and how?:</strong> ${question5 ?? ''}
      <br />
      <strong>Is there anything else you would like us to know?:</strong> ${question6 ?? ''}
      <br />
      `,
      attachments: [
        {
          filename: resumeFile.name,
          content: resumeBuffer,
        },
      ],
    })
  } catch (error) {
    console.error('Error sending career application email:', error)
    return {
      errorMessage: 'Unable to submit application. Please try again.',
      formKey: crypto.randomUUID(),
      values,
    }
  }

  revalidatePath('/careers')
  return { successMessage: 'Application submitted successfully.' }
}
