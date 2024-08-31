import Link from 'next/link'

export default function Footer({ root }: { root: boolean }) {
  return (
    <footer className={root ? 'absolute bottom-0 w-full z-10' : 'w-full px-4'}>
      <div
        className={`text-left ${root ? 'items-center' : 'text-left'} mx-auto flex flex-col gap-2 pb-4 max-w-[750px]`}
      >
        <div className='flex flex-row gap-4'>
          {/* Updated Link component with visited state */}
          <Link
            target='_blank'
            href={'https://github.com/noahgsolomon'}
            className='underline underline-offset-4 text-[#5692ae] hover:text-[#5692ae] visited:text-[#8466aa]'
          >
            github
          </Link>
          <Link
            target='_blank'
            href={'https://twitter.com/noahgsolomon'}
            className='underline underline-offset-4 text-[#5692ae] hover:text-[#5692ae] visited:text-[#8466aa]'
          >
            x.com
          </Link>
          <Link
            target='_blank'
            href={'https://www.linkedin.com/in/noahgsolomon'}
            className='underline underline-offset-4 text-[#5692ae] hover:text-[#5692ae] visited:text-[#8466aa]'
          >
            linkedin
          </Link>
        </div>
        <p className='text-primary/60'>© 2024 noahgsolomon{root ? '' : '. all rights reserved.'}</p>
      </div>
    </footer>
  )
}
