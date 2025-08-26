import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import { Quotes } from '@/blocks/Quotes/config'
import { RichText } from '@/blocks/RichText/config'
import { BannerWithText } from '@/blocks/BannerWithText/config'
import { Video } from '@/blocks/Video/config'
import { revalidateDelete, revalidatePage } from '@/hooks/revalidatePage'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { generatePreviewPath } from '@/lib/generatePreviewPath'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { authenticated } from '@/access/authenticated'
import { Services } from '@/blocks/Services/config'
import { TeamGrid } from '@/blocks/TeamGrid/config'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  trash: true,
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    useAsTitle: 'title',
    hideAPIURL: process.env.NODE_ENV === 'production',
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'pages',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
        req,
      }),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'introText',
      type: 'text',
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [RichText, Quotes, BannerWithText, Video, Services, TeamGrid],
      required: true,
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 500, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
