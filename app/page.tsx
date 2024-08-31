import Link from 'next/link'
import { Badge } from './components/ui/badge'
import Footer from './footer'
import Falling3D from './falling-3d'
import { Suspense } from 'react'

export default function Page() {
  return (
    <>
      {/* The Falling3D component will cover the entire screen */}
      <Suspense fallback={null}>
        <Falling3D />
      </Suspense>

      {/* Fade-In Overlay */}
      <div className='fade-in'></div>

      {/* Overlay Text Content */}
      <div className='max-h-[90vh] absolute inset-0 flex flex-col justify-center items-center z-10'>
        <div className='flex flex-col gap-12 sm:gap-24 text-center px-4 mx-auto max-w-[600px] w-full items-center'>
          <div className='flex flex-col gap-2'>
            <p className='text-xl'>NOAHGSOLOMON v.0.4.1</p>
            <p className='text-lg'>cs undergrad who just wants to cook.</p>

            <Link
              target='_blank'
              href={'/feed.xml'}
              className='text-base underline underline-offset-4 text-[#5692ae] hover:text-[#5692ae] visited:text-[#8466aa]'
            >
              rss feed
            </Link>
          </div>

          <div className='w-full flex flex-col'>
            <Link
              href={'/lexer-in-zig'}
              className='p-3 flex flex-col gap-2 rounded-lg relative hover:bg-[#1a1b2690] group'
            >
              <div className='flex flex-col gap-2 z-10'>
                <div className='flex flex-wrap w-full justify-between items-center'>
                  <p className='text-lg underline underline-offset-4 text-[#5692ae] hover:text-[#5692ae] group-visited:text-[#8466aa]'>
                    writing a lexer in zig
                  </p>
                  <p className='text-primary/60 text-sm'>aug 25, 2024</p>
                </div>
              </div>
            </Link>
            <Link href={'/ppo'} className='p-3 flex flex-col gap-2 rounded-lg relative hover:bg-[#1a1b2690] group'>
              <Badge variant='destructive' className='absolute -top-2 -right-2 hidden sm:block'>
                3D
              </Badge>
              <div className='flex flex-col gap-2 z-10'>
                <div className='flex flex-wrap w-full justify-between items-center'>
                  <p className='text-lg underline underline-offset-4 text-[#5692ae] hover:text-[#5692ae] group-visited:text-[#8466aa]'>
                    motivating ppo algo
                  </p>
                  <p className='text-primary/60 text-sm'>june 24, 2024</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer, also overlayed */}
      <Footer root={true} />
    </>
  )
}
