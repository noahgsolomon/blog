import Link from 'next/link'

export default function Page() {
  return (
    <div className='flex flex-col gap-12 sm:gap-24 text-center px-4 mx-auto max-w-[600px] w-full sm:pt-48 items-center'>
      <div className='pt-24 flex flex-col gap-2'>
        <h1 className='text-3xl'>404</h1>
        <p>Page not found.</p>
        <Link href={'/'} className='underline underline-offset-4'>
          home
        </Link>
      </div>
    </div>
  )
}
