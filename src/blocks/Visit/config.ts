import type { Block } from 'payload'

export const Visit: Block = {
  slug: 'visit',
  interfaceName: 'VisitBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Visit Us',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'addressLine1',
          type: 'text',
          required: true,
          defaultValue: '3316 Mount Vernon St',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'addressLine2',
          type: 'text',
          defaultValue: 'Houston, TX 77006',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'mapLink',
      type: 'text',
      defaultValue: 'https://maps.google.com/?q=3316+Mount+Vernon+St,+Houston,+TX+77006',
    },
    {
      name: 'hours',
      type: 'array',
      required: true,
      defaultValue: [
        { days: 'Tuesday – Friday', times: '9am – 6pm' },
        { days: 'Saturday', times: '9am – 5pm' },
        { days: 'Sunday – Monday', times: 'Closed' },
      ],
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'days',
              type: 'text',
              required: true,
              admin: {
                width: '50%',
              },
            },
            {
              name: 'times',
              type: 'text',
              required: true,
              admin: {
                width: '50%',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'phone',
          type: 'text',
          defaultValue: '346 802 2183',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'email',
          type: 'text',
          defaultValue: 'info@hairbysaintrose.com',
          admin: {
            width: '50%',
          },
        },
      ],
    },
  ],
}
