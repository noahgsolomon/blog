'use client'

import { AtSign, Github, Linkedin, Twitter } from 'lucide-react'
import { Button, buttonVariants } from './ui/button'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import XIcon from './icons/XIcon'
import ThemeButton from './ThemeButton'

const NavBar = () => {
  return (
    <>
      <header className='fixed left-0 right-0 top-0 z-20 border-b bg-card shadow-sm transition-all py-4'>
        <div className='flex items-center justify-between px-[10%] py-1'>
          <div className='flex flex-row items-center gap-2'>
            <Link href={'/'}>//n</Link>
          </div>

          <div className='flex flex-row gap-2'>
            <ThemeButton />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline'>
                  <AtSign className='size-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='flex flex-col gap-1'>
                <Link
                  target='_blank'
                  href={'https://github.com/noahgsolomon'}
                  className={buttonVariants({ variant: 'outline', size: 'sm', className: 'flex flex-row gap-2' })}
                >
                  <Github className='size-4 fill-[#333]' />
                  Github
                </Link>
                <Link
                  target='_blank'
                  href={'https://twitter.com/noahgsolomon'}
                  className={buttonVariants({ variant: 'outline', size: 'sm', className: 'flex flex-row gap-2' })}
                >
                  <XIcon className='size-4 fill-primary' />
                  Twitter
                </Link>
                <Link
                  target='_blank'
                  href={'https://www.linkedin.com/in/noahgsolomon'}
                  className={buttonVariants({ variant: 'outline', size: 'sm', className: 'flex flex-row gap-2' })}
                >
                  <Linkedin className='size-4' />
                  LinkedIn
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </>
  )
}

export default NavBar
