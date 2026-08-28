import { Block } from 'payload'

export const TeamGrid: Block = {
  slug: 'team',
  interfaceName: 'TeamGridBlock',
  imageURL: '/images/thumbnails/team.webp',
  fields: [
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