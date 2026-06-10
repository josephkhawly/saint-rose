import introImage from '../../public/images/IMG_8220.jpg'

export default function Intro() {

  return (
    <section className='relative h-screen flex items-center justify-center'>
      <div
        className='absolute inset-0 bg-cover bg-center bg-fixed'
        style={{
          backgroundImage: `url(${introImage.src})`,
        }}
      >
        <div className='absolute inset-0 bg-rose opacity-70'></div>
      </div>
      <div className='absolute bottom-0 w-full'>
        <h1 className='font-fautive text-7xl md:text-8xl lg:text-[19rem] text-black text-center'>
          SAINT ROSE
        </h1>
      </div>
    </section>
  )
}
