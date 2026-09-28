import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { resendAdapter } from '@payloadcms/email-resend'
import { seoPlugin } from '@payloadcms/plugin-seo'
import type { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { ServiceMenu } from './collections/ServiceMenu/ServiceMenu'
import { StaffMember } from './collections/StaffMember'
import { BlogPosts } from './collections/BlogPosts'
import { Hours } from './globals/Hours'
import { Pages } from './collections/Pages'
import { Footer } from './globals/Footer/config'
import { Header } from './globals/Header/config'
import type { BlogPost, Page } from './payload-types'
import { getServerSideURL } from './utils/getURL'

const generateTitle: GenerateTitle<BlogPost | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Saint Rose` : 'Saint Rose'
}

const generateURL: GenerateURL<BlogPost | Page> = ({ doc }) => {
  const url = getServerSideURL()
  return doc?.slug ? `${url}/${doc.slug}` : url
}

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  graphQL: {
    disable: true,
  },
  serverURL: getServerSideURL(),
  admin: {
    user: Users.slug,
    avatar: 'default',
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' - Saint Rose Admin',
    },
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  collections: [Users, Media, ServiceMenu, StaffMember, BlogPosts, Pages],
  globals: [Hours, Header, Footer],
  editor: lexicalEditor(),
  email: resendAdapter({
    apiKey: process.env.RESEND_API_KEY || '',
    defaultFromAddress: 'info@saintrose.beauty',
    defaultFromName: 'Saint Rose Admin',
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
    push: false,
  }),
  sharp,
  plugins: [
    seoPlugin({
      generateTitle,
      generateURL,
    }),
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      clientUploads: process.env.VERCEL === '1',
    }),
  ],
})
