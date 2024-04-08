import { Loader2 } from 'lucide-react'

export default function ViewLoader() {
  return (
    <div className='flex w-full flex-col h-screen items-center justify-center'>
      <Loader2 className='w-6 h-6 text-primary/70 animate-spin' />
    </div>
  )
}
