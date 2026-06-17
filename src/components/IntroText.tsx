import Image, { StaticImageData } from "next/image";

export const IntroText = ({ title, introText, image }: { title: string; introText: string; image?: StaticImageData | string }) => {
  return (
    <section className='w-full px-6 py-32 md:py-40 lg:py-48'>
      <div className="relative flex flex-col md:flex-row items-end gap-12">
        <div className="w-full md:w-7/12">
          <h1 className="font-caslon text-xl uppercase">
            {title}
          </h1>
          <p className="max-w-2xl text-xl md:text-3xl text-pretty mt-4">
            {introText}
          </p>
        </div>
        {image && (
          <div className="w-full md:w-5/12 aspect-4/5 overflow-hidden">
            <Image className="w-full h-full object-cover grayscale-[0.2] contrast-125"
              alt="Close-up of a high-end salon interior with minimal stone textures, soft warm lighting, and a single designer chair in soft focus"
              src={image}
              placeholder='blur'
              width={500}
              height={500}
            />
          </div>
        )}
      </div>
    </section>
  )
}
