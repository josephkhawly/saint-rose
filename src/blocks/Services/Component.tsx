import { ServiceList } from './ServiceList'
import { getServices } from '@/lib/helpers'
import { ServicesBlock } from '@/payload-types'

export async function ServiceGrid({ columns }: ServicesBlock) {
  const services = await getServices()

  const columnsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
  }

  return (
    <div
      className={`mt-[100px] grid md:gap-12 md:px-[84px] xl:mt-[118px] ${columnsClass[columns]}`}
    >
      {services.map(({ title, services }) => (
        <ServiceList key={title} title={title} services={services} />
      ))}
    </div>
  )
}
