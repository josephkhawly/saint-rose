import { Block } from "payload";

export const Quotes: Block = {
  slug: 'quotes',
  interfaceName: 'QuotesBlock',
  fields: [
    {
      name: 'quotes',
      type: 'array',
      fields: [
        {
          name: 'quoteText',
          label: 'Quote Text',
          type: 'textarea',
          required: true,
        },
        {
          name: 'attribution',
          type: 'text',
          required: true,
        },
      ],
      required: true,
      minRows: 1,
      maxRows: 20,
    }
  ]
}