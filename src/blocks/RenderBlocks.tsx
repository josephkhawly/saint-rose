import type { Page } from '@/payload-types'
import Quotes from '@/blocks/Quotes/Component'
import { RichTextComponent } from './RichText/Component'

const blockComponents = {
  quotes: Quotes,
  richText: RichTextComponent,
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
