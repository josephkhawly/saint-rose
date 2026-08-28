import { Block } from 'payload'

export const TeamGrid: Block = {
  slug: 'team',
  interfaceName: 'TeamGridBlock',
  imageURL: '/images/thumbnails/team.webp',
  fields: [
    {
      name: 'blockTitle',
      type: 'text',
      label: 'Block title',
      defaultValue: 'Meet The Team',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      defaultValue:
        "Not-your-ordinary-hairdressers. Meet the people behind the chair. See someone you vibe with? Let us know when you book and we'll make the match.",
    },
    {
      name: 'columns',
      type: 'number',
      max: 3,
      min: 1,
      defaultValue: 2,
      required: true,
      admin: {
        description: 'The maximum number of columns to display on large screens. Columns will be reduced automatically on smaller screens.',
      },
    },
  ],
}