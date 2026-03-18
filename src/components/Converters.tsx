import Image from 'next/image'
import type { DefaultNodeTypes, SerializedUploadNode } from '@payloadcms/richtext-lexical'
import { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import { getBlurPlaceholder } from '@/utils/getBlurPlaceholder'

type NodeTypes = DefaultNodeTypes

const CustomUploadComponent: React.FC<{
  node: SerializedUploadNode
}> = async ({ node }) => {
  if (node.relationTo === 'media') {
    const uploadDoc = node.value
    if (typeof uploadDoc !== 'object') {
      return null
    }
    const { alt, height, _key, width } = uploadDoc
    const aspectRatio = width / height
    const blurDataURL = await getBlurPlaceholder(_key)
    return (
      <div style={{ aspectRatio, position: 'relative', margin: '32px 0' }}>
        <Image
          alt={alt || ''}
          src={`https://3k4a31g25n.ufs.sh/f/${_key}`}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          quality={60}
          placeholder='blur'
          blurDataURL={blurDataURL}
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
