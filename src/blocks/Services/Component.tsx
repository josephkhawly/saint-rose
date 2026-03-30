// import { ServiceList } from './ServiceList'
import { getServices } from '@/lib/helpers'
import { ServiceMenu } from '@/payload-types'
import Image, { StaticImageData } from 'next/image'

interface ServiceTableProps {
  title: string
  services: ServiceMenu['services']
  align?: 'left' | 'right'
  imageSrc?: StaticImageData | string
}

function ServiceTableTwoColumn({
  title,
  services,
  imageSrc,
}: ServiceTableProps) {
  return (
    <section className={`px-4 py-12 md:px-8`}>
      <div className='mx-auto '>
        <div className='grid grid-cols-1 md:grid-cols-12 gap-0'>
          <div className='md:col-span-5 mb-12 md:mb-0'>
            <div className="sticky top-40">
              <h2 className='text-3xl tracking-wide md:text-4xl uppercase mb-8'>{title}</h2>
              {imageSrc && (
                <div className="w-full aspect-square overflow-hidden mb-8">
                  <Image
                    className="w-full h-full object-cover"
                    width={500}
                    height={500}
                    alt={title}
                    src={imageSrc}
                    placeholder='blur'
                  />
                </div>
              )}
            </div>
          </div>

          <div className='md:col-start-7 md:col-span-6 space-y-12'>
            {services.map(({ title, description, price, hourly }) => (
              <div
                key={title}
                className="group py-6 border-b border-b-deep-rose/50 flex justify-between items-baseline transition-colors duration-500"
              >
                <div>
                  <h3 className="font-body text-lg uppercase text-black">{title}</h3>
                  <p className="font-body text-md text-black/70 mt-2 italic">{description || ''}</p>
                </div>
                <span className="font-headline text-2xl">{price}{hourly && '/hr'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export async function ServiceGrid() {
  const services = await getServices()

  return services.map(({ title, services }) => (
    <ServiceTableTwoColumn key={title} title={title} services={services} />
  ))
}