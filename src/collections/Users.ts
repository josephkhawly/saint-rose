import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    hideAPIURL: process.env.NODE_ENV === 'production',
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
