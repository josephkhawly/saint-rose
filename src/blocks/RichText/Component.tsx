import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export const RichTextComponent = ({ content }: { content: SerializedEditorState }) => {
  return <RichText data={content} className={'payload-richtext'} />
}
