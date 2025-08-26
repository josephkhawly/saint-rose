import { Block } from 'payload'

export const TeamGrid: Block = {
  slug: 'team',
  interfaceName: 'TeamGridBlock',
  fields: [
    {
      name: 'columns',
      type: 'number',
      max: 5,
      min: 1,
      defaultValue: 4,
      required: true,
      admin: {
        description: 'The maximum number of columns to display on large screens. Columns will be reduced automatically on smaller screens.',
      },
    },
  ],
}