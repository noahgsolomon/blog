'use client'

import { Laptop2, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button, buttonVariants } from './ui/button'

export default function ThemeButton({ className = '' }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [theme, setThemee] = useState(resolvedTheme)

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setThemee(localStorage.getItem('theme') ?? '')
  }, [])

  if (!mounted) {
    return (
      <Button variant={'outline'} disabled={true} className='px-4 py-2 opacity-80 transition-all'>
        <Laptop2 className='size-4' />
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={buttonVariants({
          variant: 'outline',
          className: className,
        })}
      >
        {theme === 'light' ? (
          <SunIcon className='size-4' />
        ) : theme === 'dark' ? (
          <MoonIcon className='size-4' />
        ) : (
          <Laptop2 className='size-4' />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className='flex flex-col gap-1'>
        <Button
          variant={'outline'}
          size='sm'
          className='cursor-pointer gap-2'
          onClick={() => {
            setTheme('light')
            setThemee('light')
          }}
        >
          <SunIcon className='size-4' />
          Light
        </Button>
        <Button
          variant={'outline'}
          size='sm'
          className='cursor-pointer gap-2'
          onClick={() => {
            setTheme('dark')
            setThemee('dark')
          }}
        >
          <MoonIcon className='size-4' />
          Dark
        </Button>
        <Button
          variant={'outline'}
          size='sm'
          className='cursor-pointer gap-2'
          onClick={() => {
            setTheme('system')
            setThemee('system')
          }}
        >
          <Laptop2 className='size-4' />
          System
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
