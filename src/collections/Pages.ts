import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import { Quotes } from '@/blocks/Quotes/config'
import { RichText } from '@/blocks/RichText/config'
import { BannerWithText } from '@/blocks/BannerWithText/config'
import { revalidateDelete, revalidatePage } from '@/hooks/revalidatePage'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    // livePreview: {
    //   url: ({ data, req }) => {
    //     const path = generatePreviewPath({
    //       slug: typeof data?.slug === 'string' ? data.slug : '',
    //       collection: 'pages',
    //       req,
    //     })

    //     return path
    //   },
    // },
    // preview: (data, { req }) =>
    //   generatePreviewPath({
    //     slug: typeof data?.slug === 'string' ? data.slug : '',
    //     collection: 'pages',
    //     req,
    //   }),
    useAsTitle: 'title',
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
      blocks: [RichText, Quotes, BannerWithText],
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
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
