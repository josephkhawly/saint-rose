import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import styles from './richtext.module.scss'

export const RichTextComponent = ({ content }: { content: SerializedEditorState }) => {
  return <RichText data={content} className={styles['payload-richtext']} />
}
