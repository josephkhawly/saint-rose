export const IntroText = ({ title, introText }: { title: string; introText: string }) => {
  return (
    <section className='w-full min-h-screen px-6 py-32 md:py-40 lg:py-48'>
      <div className="relative flex flex-col md:flex-row items-end gap-12">
        <div className="w-full md:w-7/12">
          <h1 className="font-caslon text-xl uppercase">
            {title}
          </h1>
          <p className="max-w-2xl text-xl md:text-3xl text-pretty mt-4">
            {introText}
          </p>
        </div>
      </div>
    </section>
  )
}
