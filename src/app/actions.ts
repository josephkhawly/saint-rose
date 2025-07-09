'use server'

import { revalidatePath } from 'next/cache'
import * as z from 'zod/v4'

export async function submitCareerApplication(formData: FormData) {
  // Define Zod schema for the form
  const schema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.email('Invalid email address'),
    phone: z.string().min(1, 'Phone is required'),
    address: z.string().min(1, 'Address is required'),
    startDate: z.string().min(1, 'Start date is required'),
    instagramHandle: z.string().optional(),
    license: z.enum(['Yes', 'No']),
    position: z.enum(['Salon Coordinator', 'Stylist', 'Apprentice']),
    question1: z.string().max(800, 'Response must be 800 characters or less').optional(),
    question2: z.string().max(800, 'Response must be 800 characters or less').optional(),
    question3: z.string().max(800, 'Response must be 800 characters or less').optional(),
    question4: z.string().max(800, 'Response must be 800 characters or less').optional(),
    question5: z.string().max(800, 'Response must be 800 characters or less').optional(),
    question6: z.string().max(800, 'Response must be 800 characters or less').optional(),
    resumeFile: z
      .instanceof(File, { message: 'Resume file is required' })
      .refine((file) => file && file.size > 0, {
        message: 'Resume file is required',
      }),
  })

  // Extract fields from FormData
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

  const result = await schema.safeParseAsync(data)
  if (!result.success) {
    // Collect all error messages
    const messages = result.error.issues.map((issue) => issue.message)
    // return { status: 'error', message: messages.join(' ') }
  }

  // TODO: Implement file/email logic here
  revalidatePath('/careers')
  // return { status: 'success', message: 'Application submitted successfully.' }
}
