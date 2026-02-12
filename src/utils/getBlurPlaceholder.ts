import { getPlaiceholder } from 'plaiceholder'

export async function getBlurPlaceholder(key: string) {
  const res = await fetch(`https://3k4a31g25n.ufs.sh/f/${key}`)
  const buffer = Buffer.from(await res.arrayBuffer())

  const { base64 } = await getPlaiceholder(buffer, { size: 10 })

  return base64
}
