import Link from 'next/link'

export default function Page() {
  return (
    <div className='flex flex-col gap-2 items-center'>
      <h1 className='text-3xl'>404</h1>
      <p>Page not found.</p>
      <Link href={'/'} className='underline underline-offset-4'>
        home
      </Link>
    </div>
  )
}
