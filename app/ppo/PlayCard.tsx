'use client'
import { Button } from '@/components/ui/button'
import { Html } from '@react-three/drei'
import usePlayStore from './store/PlayStore'
import { CHECKPOINTS } from './Checkpoints'
import Markdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import * as THREE from 'three'
import { cn } from '@/lib/utils'

export default function PlayCard({
  markdown,
  castShadow,
  position,
  distanceFactor,
  className,
}: {
  markdown: string
  castShadow?: boolean
  position?: [number, number, number]
  distanceFactor?: number
  className?: string
}) {
  const { currentPlayPosition, currentPosition, setFocus, setLook, setCurrentPlayPosition } = usePlayStore()

  return (
    <Html
      className={cn('flex flex-col gap-2', className)}
      castShadow={castShadow}
      position={position}
      distanceFactor={distanceFactor}
    >
      {' '}
      <div className='bg-popover/60 shadow-sm overflow-y-auto overflow-x-hidden border rounded-lg p-4 relative z-0 max-h-[250px] w-[300px] md:w-[400px]'>
        <Markdown
          className='z-10 relative'
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex, rehypeHighlight, rehypeRaw]}
        >
          {markdown}
        </Markdown>
      </div>
      <div className='w-full flex flex-row justify-between gap-2'>
        <Button
          onClick={() => {
            setFocus(new THREE.Vector3(...CHECKPOINTS[currentPosition].play[currentPlayPosition - 1].position))
            setLook(new THREE.Vector3(...CHECKPOINTS[currentPosition].play[currentPlayPosition - 1].look))
            setCurrentPlayPosition(currentPlayPosition - 1)
          }}
          className='w-[50%]'
          disabled={currentPlayPosition === 0}
          size='sm'
          variant='outline'
        >
          Back
        </Button>

        <Button
          onClick={() => {
            setFocus(new THREE.Vector3(...CHECKPOINTS[currentPosition].play[currentPlayPosition + 1].position))
            setLook(new THREE.Vector3(...CHECKPOINTS[currentPosition].play[currentPlayPosition + 1].look))
            setCurrentPlayPosition(currentPlayPosition + 1)
          }}
          disabled={currentPlayPosition >= CHECKPOINTS[currentPosition].play.length - 1}
          className='w-[50%]'
          size='sm'
        >
          Continue
        </Button>
      </div>
    </Html>
  )
}
