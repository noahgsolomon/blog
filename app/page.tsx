import Link from 'next/link'
import { Badge } from './components/ui/badge'

export default function Page() {
  return (
    <div className='flex flex-col gap-24 text-center px-4 mx-auto max-w-[600px] w-full py-64 items-center min-h-[90vh]'>
      <div className='pt-24 flex flex-col gap-2'>
        <p className='text-lg'>NOAHGSOLOMON v.0.4.1</p>
        <p>cs undergrad who just wants to cook.</p>
      </div>
      <div className='w-full flex flex-col'>
        <Link href={'/lexer-in-zig'} className='p-3 flex flex-col gap-2 rounded-lg relative hover:bg-[#1a1b26] group'>
          <div className='flex flex-col gap-2 z-10'>
            <div className='flex w-full justify-between items-center'>
              <p className='underline underline-offset-4 text-[#5692ae] hover:text-[#5692ae] group-visited:text-[#8466aa]'>
                writing a lexer in zig
              </p>
              <p className='text-primary/60 text-xs'>aug 25, 2024</p>
            </div>
          </div>
        </Link>
        <Link href={'/ppo'} className='p-3 flex flex-col gap-2 rounded-lg relative hover:bg-[#1a1b26] group'>
          <Badge variant='destructive' className='absolute -top-2 -right-2'>
            3D
          </Badge>
          <div className='flex flex-col gap-2 z-10'>
            <div className='flex w-full justify-between items-center'>
              <p className='underline underline-offset-4 text-[#5692ae] hover:text-[#5692ae] group-visited:text-[#8466aa]'>
                motivating the ppo algorithm
              </p>
              <p className='text-primary/60 text-xs'>june 24, 2024</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
