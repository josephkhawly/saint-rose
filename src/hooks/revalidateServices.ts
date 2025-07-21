import type { CollectionAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateServices: CollectionAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating services`)

    revalidateTag('services')
  }

  return doc
}
