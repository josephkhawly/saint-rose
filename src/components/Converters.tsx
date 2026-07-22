import Image from 'next/image'
import type { DefaultNodeTypes, SerializedUploadNode } from '@payloadcms/richtext-lexical'
import { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'

type NodeTypes = DefaultNodeTypes

const CustomUploadComponent: React.FC<{
  node: SerializedUploadNode
}> = async ({ node }) => {
  if (node.relationTo === 'media') {
    const uploadDoc = node.value
    if (typeof uploadDoc !== 'object') {
      return null
    }
    const { alt, blurDataURL, height, url, width } = uploadDoc
    const aspectRatio = width / height
    return (
      <div style={{ aspectRatio, position: 'relative', margin: '32px 0' }}>
        <Image
          alt={alt || ''}
          src={url}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          quality={60}
          placeholder={blurDataURL ? 'blur' : 'empty'}
          blurDataURL={blurDataURL ?? undefined}
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
