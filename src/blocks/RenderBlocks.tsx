import type { Page } from '@/payload-types'
import Quotes from '@/blocks/Quotes/Component'
import { RichTextComponent } from './RichText/Component'
import { BannerWithText } from './BannerWithText/Component'
import { Video } from './Video/Component'
import { ServiceGrid } from './Services/Component'
import { TeamGrid } from './TeamGrid/Component'
import { Gallery } from './Gallery/Component'
import { ImageAndTextColumn } from './ImageAndTextColumn/Component'
import { Intro } from './Intro/Component'
import { Steps } from './Steps/Component'

const blockComponents = {
  intro: Intro,
  quotes: Quotes,
  richText: RichTextComponent,
  bannerWithText: BannerWithText,
  video: Video,
  services: ServiceGrid,
  team: TeamGrid,
  gallery: Gallery,
  imageAndTextColumn: ImageAndTextColumn,
  steps: Steps,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <>
        {blocks.map((block) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]
            if (Block) {
              // @ts-expect-error - blockType is string
              return <Block key={block.id} {...block} disableInnerContainer />
            }
          }
          return null
        })}
      </>
    )
  }

  return null
}
