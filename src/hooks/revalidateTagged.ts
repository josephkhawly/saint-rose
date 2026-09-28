import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export function revalidateTagged(
  tag: string,
): CollectionAfterChangeHook & GlobalAfterChangeHook {
  return ({ doc, req: { payload, context } }) => {
    if (!context.disableRevalidate) {
      payload.logger.info(`Revalidating ${tag}`)
      revalidateTag(tag, 'max')
    }
    return doc
  }
}
