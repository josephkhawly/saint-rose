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
import { Gallery } from '@/blocks/Gallery/config'
import { ImageAndTextColumn } from '@/blocks/ImageAndTextColumn/config'
import { Intro } from '@/blocks/Intro/config'
import { Steps } from '@/blocks/Steps/config'
import { Visit } from '@/blocks/Visit/config'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

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
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'introText',
              type: 'text',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'introImage',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'imagePosition',
                  type: 'radio',
                  defaultValue: 'right',
                  options: [
                    { label: 'Left', value: 'left' },
                    { label: 'Right', value: 'right' },
                  ],
                  admin: {
                    layout: 'horizontal',
                    width: '50%',
                  },
                },
              ],
            },
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                Intro,
                RichText,
                Quotes,
                BannerWithText,
                Video,
                Services,
                TeamGrid,
                Gallery,
                ImageAndTextColumn,
                Steps,
                Visit,
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
              overrides: {
                admin: {
                  hidden: true,
                },
              },
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
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
