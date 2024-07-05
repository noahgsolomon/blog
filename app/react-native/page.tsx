import Image from 'next/image'

export default function Page() {
  return (
    <div className='w-screen h-screen'>
      <div className='flex flex-col  gap-24 md:px-24 px-4 max-w-[800px] mx-auto w-full'>
        {/* <Navbar /> */}
        <div className='pt-24 flex flex-col gap-2'>
          <p className='text-lg'>How does React Native Work? And how does expo fit into the picture?</p>
        </div>
        <Image src={'/thinking.jpg'} alt='thinking' width={300} height={300} className='' />
      </div>
    </div>
  )
}
