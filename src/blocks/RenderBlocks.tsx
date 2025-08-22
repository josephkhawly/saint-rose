import type { Page } from '@/payload-types'
import Quotes from '@/blocks/Quotes/Component'
import { RichTextComponent } from './RichText/Component'
import { BannerWithText } from './BannerWithText/Component'
import { Video } from './Video/Component'
import { ServiceGrid } from './Services/Component'

const blockComponents = {
  quotes: Quotes,
  richText: RichTextComponent,
  bannerWithText: BannerWithText,
  video: Video,
  services: ServiceGrid,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              // @ts-expect-error
              return <Block key={index} {...block} disableInnerContainer />
            }
          }
          return null
        })}
      </>
    )
  }

  return null
}
