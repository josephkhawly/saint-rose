import { seoPlugin } from '@payloadcms/plugin-seo'
import { Plugin } from 'payload'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'

import { BlogPost, Page } from '@/payload-types'
import { getServerSideURL } from '@/utils/getURL'

const generateTitle: GenerateTitle<BlogPost | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Saint Rose` : 'Saint Rose'
}

const generateURL: GenerateURL<BlogPost | Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  seoPlugin({
    generateTitle,
    generateURL,
  }),
]
