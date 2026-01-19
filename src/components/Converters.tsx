import Image from 'next/image'
import type { DefaultNodeTypes, SerializedUploadNode } from '@payloadcms/richtext-lexical'
import { placeholderBlur } from '@/constants'
import { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'

type NodeTypes = DefaultNodeTypes

const CustomUploadComponent: React.FC<{
  node: SerializedUploadNode
}> = ({ node }) => {
  if (node.relationTo === 'media') {
    const uploadDoc = node.value
    if (typeof uploadDoc !== 'object') {
      return null
    }
    const { alt, height, url, width } = uploadDoc
    const aspectRatio = width / height
    return (
      <div style={{ aspectRatio, position: 'relative', margin: '32px 0' }}>
        <Image
          alt={alt || ''}
          src={url}
          fill
          quality={60}
          placeholder='blur'
          blurDataURL={placeholderBlur}
        />
      </div>
    )
  }

  return null
}

export const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  upload: ({ node }) => {
    return <CustomUploadComponent node={node} />
  },
})
