// Vercel serverless function for handling career applications
import fs from 'fs'
import formidable from 'formidable'
import postmark from 'postmark'

// Initialize Postmark client
const mailClient = new postmark.ServerClient(process.env.POSTMARK_API_KEY)

// Function to read file data
function readFile(file) {
  if (file) {
    return new Promise((resolve, reject) => {
      fs.readFile(file.filepath, function (error, data) {
        if (error) return reject(error)
        resolve(data)
      })
    })
  } else {
    return new Promise((resolve, reject) => {
      resolve(null)
    })
  }
}

// Function to send email
async function sendMail(fields, resumeFile) {
  try {
    // Since readFile already returns a promise, we can await it directly
    const resumeData = await readFile(resumeFile)

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
    } = fields

    const attachements = []

    attachements.push({
      content: resumeData.toString('base64'),
      contentType: resumeFile.mimetype,
      name: resumeFile.originalFilename,
    })

    const msg = {
      From: 'info@hairbysaintrose.com',
      To: 'info@hairbysaintrose.com',
      Subject: 'Submission from careers page',
      MessageStream: 'outbound',
      HtmlBody: `
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
      <strong>When can you start?:</strong> ${startDate}
      <br />
      <strong>Business Instagram handle:</strong> ${instagramHandle}
      <br />
      <strong>Do you have a valid Texas Cosmetology License?:</strong> ${license}
      <br />
      <strong>What do you know about Saint Rose?:</strong> ${question1}
      <br />
      <strong>What are you looking for in a salon?:</strong> ${question2}
      <br />
      <strong>Give us an example of exceptional customer service.:</strong> ${question3}
      <br />
      <strong>How do you want to improve yourself in the next year?:</strong> ${question4}
      <br />
      <strong>Who has impacted you the most in your career and how?:</strong> ${question5}
      <br />
      <strong>Is there anything else you would like us to know?:</strong> ${question6}
      <br />
      `,
      attachments: attachements,
    }

    await mailClient.sendEmail(msg)

    return { success: true } // Return appropriate response
  } catch (error) {
    console.error('Error sending mail:', error)
    throw error // Re-throw to be caught by the caller
  }
}

// Instead of using formidable's built-in file storage that writes to disk,
// we'll handle the file in memory since Vercel has an ephemeral filesystem
const parseForm = (req) => {
  return new Promise((resolve, reject) => {
    const form = formidable({
      multiples: true,
      keepExtensions: true,
      maxFieldsSize: 20 * 1024 * 1024,
      maxFileSize: 20 * 1024 * 1024,
      maxFields: 20,
    })

    form.parse(req, (error, fields, files) => {
      if (error) {
        reject(error)
      } else {
        resolve({ fields, files })
      }
    })
  })
}

// Main serverless function handler
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Method not allowed' })
  }

  try {
    const { fields, files } = await parseForm(req)

    if (!files.resumeFile) {
      return res.status(400).json({ status: 'error', message: 'Please include resume.' })
    }

    await sendMail(fields, files.resumeFile)
    return res.status(200).json({ status: 'success' })
  } catch (error) {
    console.error('Error processing career application:', error)
    return res.status(500).json({ status: 'error', message: 'Unable to process request.' })
  }
}
