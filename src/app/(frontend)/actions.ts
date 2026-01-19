'use server'

import { revalidatePath } from 'next/cache'
import * as z from 'zod/v4'

export async function submitCareerApplication(prevState: any, formData: FormData) {
  // Define Zod schema for the form
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
      .max(1024 * 1024 * 20, 'File must be less than 20MB')
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
    // Map errors to fields
    const fieldErrors: Record<string, string> = {}
    for (const issue of result.error.issues) {
      if (issue.path && issue.path.length > 0) {
        const field = issue.path[0] as string
        // Only show the first error per field
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message
        }
      }
    }
    return { fieldErrors }
  }

  // TODO: Implement file/email logic here
  revalidatePath('/careers')
  return { successMessage: 'Application submitted successfully.' }
}
