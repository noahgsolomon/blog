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
    <>
      {theme === 'light' ? (
        <Button
          onClick={() => {
            setTheme('dark')
            setThemee('dark')
          }}
          variant='outline'
        >
          <SunIcon className='size-4' />
        </Button>
      ) : theme === 'dark' ? (
        <Button
          onClick={() => {
            setTheme('light')
            setThemee('light')
          }}
          variant='outline'
        >
          <MoonIcon className='size-4' />
        </Button>
      ) : (
        <Button
          onClick={() => {
            setTheme('dark')
            setThemee('dark')
          }}
          variant='outline'
        >
          <SunIcon className='size-4' />
        </Button>
      )}
    </>
  )
}
