import Link from 'next/link'
import Footer from './footer'
import Falling3D from './falling-3d'
import { Suspense } from 'react'
import { Layout } from '@/components/dom/Layout'
import LexerIcon from './Models/icons/lexer-icon'
import PPOIcon from './Models/icons/ppo-icon'

export default function Page() {
  return (
    <Layout>
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
              href={'/cfg-and-recursive-descent-parser'}
              className='p-3 flex flex-col gap-2 rounded-lg relative hover:bg-[#1a1b2690] group'
            >
              <div className='flex flex-col gap-2 z-10'>
                <div className='flex flex-wrap w-full gap-2 justify-between items-center'>
                  <div className='flex flex-row items-center gap-2'>
                    {/* <Suspense fallback={<div className='size-[80px]'></div>}> */}
                    {/*   <LexerIcon /> */}
                    {/* </Suspense> */}
                    <p className='text-lg underline underline-offset-4 text-[#5692ae] group-hover:text-[#5692ae] group-visited:text-[#8466aa]'>
                      recursive descent parser theory
                    </p>
                  </div>
                  <p className='text-primary/60 text-sm'>sept 2, 2024</p>
                </div>
              </div>
            </Link>
            <Link
              href={'/lexer-in-zig'}
              className='p-3 flex flex-col gap-2 rounded-lg relative hover:bg-[#1a1b2690] group'
            >
              <div className='flex flex-col gap-2 z-10'>
                <div className='flex flex-wrap w-full gap-2 justify-between items-center'>
                  <div className='flex flex-row items-center gap-2'>
                    {/* <Suspense fallback={<div className='size-[80px]'></div>}> */}
                    {/*   <LexerIcon /> */}
                    {/* </Suspense> */}
                    <p className='text-lg underline underline-offset-4 text-[#5692ae] group-hover:text-[#5692ae] group-visited:text-[#8466aa]'>
                      writing a lexer in zig
                    </p>
                  </div>
                  <p className='text-primary/60 text-sm'>aug 25, 2024</p>
                </div>
              </div>
            </Link>
            <Link href={'/ppo'} className='p-3 flex flex-col gap-2 rounded-lg relative hover:bg-[#1a1b2690] group'>
              <div className='flex flex-col gap-2 z-10'>
                <div className='flex flex-wrap gap-2 w-full justify-between items-center'>
                  <div className='flex flex-row items-center gap-2'>
                    {/* <Suspense fallback={<div className='pr-[80px] size-[80px]'>sup</div>}> */}
                    {/*   <PPOIcon /> */}
                    {/* </Suspense> */}
                    <p className='text-lg underline underline-offset-4 text-[#5692ae] group-hover:text-[#5692ae] group-visited:text-[#8466aa]'>
                      motivating ppo algo
                    </p>
                  </div>
                  <p className='text-primary/60 text-sm'>june 24, 2024</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer, also overlayed */}
      <Footer root={true} />
    </Layout>
  )
}
