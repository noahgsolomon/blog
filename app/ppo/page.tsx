'use client'

import { OrbitControls, PerspectiveCamera, PresentationControls } from '@react-three/drei'
import dynamic from 'next/dynamic'
import { Fragment, useEffect, useMemo, useState } from 'react'
import Lights from '@/Lights'
import PPO from './PPO'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import CameraControls from 'camera-controls'
import { Button, buttonVariants } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import ThemeButton from '@/components/ThemeButton'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import Markdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import slug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { cn } from '@/lib/utils'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
})

CameraControls.install({ THREE: THREE })

function Controls({ zoom, focus, pos = new THREE.Vector3(), look = new THREE.Vector3() }) {
  const camera = useThree((state) => state.camera)
  const gl = useThree((state) => state.gl)
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), [])
  return useFrame((state, delta) => {
    zoom ? pos.set(focus.x, focus.y, focus.z + 2) : pos.set(0, 0, 5)
    zoom ? look.set(focus.x, focus.y, focus.z - 2) : look.set(0, 0, 4)

    state.camera.position.lerp(pos, 0.5)
    state.camera.updateProjectionMatrix()

    controls.setLookAt(
      state.camera.position.x,
      state.camera.position.y,
      state.camera.position.z,
      look.x,
      look.y,
      look.z,
      true,
    )
    return controls.update(delta)
  })
}

const CHECKPOINTS = [
  {
    position: [-2, 0, 0],
    markdown: [
      `
## Proximal Policy Optimization (PPO)

PPO is a policy gradient method that alternates between sampling data through interaction with the environment, and optimizing a surrogate objective function using stochastic gradient ascent. The objective function is a clipped surrogate objective:

$$L^{CLIP}(\\theta) = \\hat{\\mathbb{E}}_t\\left[ \\min\\left( \\frac{\\pi_\\theta(a_t|s_t)}{\\pi_{\\theta_{old}}(a_t|s_t)} \\hat{A}_t, \\text{clip}\\left(\\frac{\\pi_\\theta(a_t|s_t)}{\\pi_{\\theta_{old}}(a_t|s_t)}, 1-\\epsilon, 1+\\epsilon\\right) \\hat{A}_t \\right)\\right]$$
`,
      `where $\\pi_\\theta$ is the policy, $\\hat{A}_t$ is an estimator of the advantage function at timestep $t$, $\\epsilon$ is a hyperparameter (small constant), and $\\theta_{old}$ is the vector of policy parameters before the update.
`,
      `where $\\pi_\\theta$ is the policy, $\\hat{A}_t$ is an estimator of the advantage function at timestep $t$, $\\epsilon$ is a hyperparameter (small constant), and $\\theta_{old}$ is the vector of policy parameters before the update.
`,
      `where $\\pi_\\theta$ is the policy, $\\hat{A}_t$ is an estimator of the advantage function at timestep $t$, $\\epsilon$ is a hyperparameter (small constant), and $\\theta_{old}$ is the vector of policy parameters before the update.
`,
      `where $\\pi_\\theta$ is the policy, $\\hat{A}_t$ is an estimator of the advantage function at timestep $t$, $\\epsilon$ is a hyperparameter (small constant), and $\\theta_{old}$ is the vector of policy parameters before the update.
`,
    ],
  },
  {
    position: [0, 0, 0],
    markdown: [
      `
## PPO Algorithm

1. Initialize policy parameters $\\theta_0$ and value function parameters $\\phi_0$
2. For $k = 0, 1, 2, \\dots$ do
   1. Collect set of trajectories $\\mathcal{D}_k = \\{\\tau_i\\}$ by running policy $\\pi_{\\theta_k}$ in the environment 
   2. Compute rewards-to-go $\\hat{R}_t$ and advantage estimates $\\hat{A}_t$ based on the current value function $V_{\\phi_k}$
`,
      `
3. Optimize surrogate objective with respect to $\\theta$, with $K$ epochs and minibatch size $M \\leq |\\mathcal{D}_k|$:
       $$\\theta_{k+1} = \\arg \\max_{\\theta} \\frac{1}{|\\mathcal{D}_k|} \\sum_{\\tau \\in \\mathcal{D}_k} \\sum_{t=0}^T \\min\\left( \\frac{\\pi_\\theta(a_t|s_t)}{\\pi_{\\theta_k}(a_t|s_t)} \\hat{A}_t, \\text{clip}\\left(\\frac{\\pi_\\theta(a_t|s_t)}{\\pi_{\\theta_k}(a_t|s_t)}, 1-\\epsilon, 1+\\epsilon\\right) \\hat{A}_t \\right)$$
   4. Fit value function by regression on mean-squared error:
       $$\\phi_{k+1} = \\arg \\min_{\\phi} \\frac{1}{|\\mathcal{D}_k| T} \\sum_{\\tau \\in \\mathcal{D}_k} \\sum_{t=0}^T \\left( V_\\phi(s_t) - \\hat{R}_t \\right)^2$$`,
    ],
  },
  {
    position: [2, 0, 0],
    markdown: [
      `
## Advantages of PPO

PPO has several advantages compared to other policy gradient methods:

1. **Stability**: PPO uses a surrogate objective that is clipped, which helps maintain stability by avoiding excessively large policy updates. The probability ratio $r_t(\\theta) = \\frac{\\pi_\\theta(a_t|s_t)}{\\pi_{\\theta_{old}}(a_t|s_t)}$ is constrained to stay within $[1-\\epsilon, 1+\\epsilon]$, where $\\epsilon$ is a small constant. 

2. **Sample Efficiency**: PPO is more sample efficient than methods like TRPO, needing fewer interactions with the environment to achieve good performance. It accomplishes this by allowing multiple epochs of minibatch updates.

3. **Simple to Implement**: The clipped surrogate objective is relatively simple to implement, not requiring complex second-order optimization like TRPO.

4. **Scalability**: PPO has been shown to scale well to challenging environments with high-dimensional observation and action spaces.
`,
    ],
  },
]

export default function Page() {
  const [isMounted, setIsMounted] = useState(false)
  const [zoom, setZoom] = useState(false)
  const [focus, setFocus] = useState({})
  const [currentPosition, setCurrentPosition] = useState(0)
  const [markdownIdx, setMarkdownIdx] = useState(0)

  useEffect(() => {
    setZoom(true)
    setFocus(new THREE.Vector3(...CHECKPOINTS[0].position))
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className='w-screen h-screen overflow-hidden'>
      <View className='touch-none w-full h-full '>
        <PPO />
        <Lights />
        <OrbitControls />
        <Controls zoom={zoom} focus={focus} />
      </View>
      <div className='shadow-md absolute bottom-1/4 right-4 md:bottom-24 md:right-24 rounded-lg border p-4 bg-card z-10 max-w-[60%] w-[400px] flex max-h-[50%] flex-col gap-4 overflow-y-auto'>
        <Carousel change={currentPosition}>
          <CarouselContent className='pointer-events-none'>
            {CHECKPOINTS[currentPosition % CHECKPOINTS.length].markdown.map((markdown, index) => (
              <CarouselItem key={index}>
                <Markdown
                  components={{
                    code: ({ className, children, ...props }) => {
                      const match = /language-(\w+)/.exec(className ?? '')
                      return match ? (
                        <div>
                          <p className='code-language'>{match[1]}</p>
                          <pre className={cn(className)}>
                            <code>{children}</code>
                          </pre>
                        </div>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      )
                    },
                  }}
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeKatex, rehypeHighlight]}
                >
                  {markdown}
                </Markdown>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className='flex w-full justify-center gap-4 pt-4 items-center'>
            <CarouselPrevious setMarkdownIdx={setMarkdownIdx} />
            <p className='font-bold text-xl'>
              {[
                ...Array.from({ length: CHECKPOINTS[currentPosition % CHECKPOINTS.length].markdown.length }).map(
                  (_, index) =>
                    index === markdownIdx ? (
                      <span key={index} className='text-blue-500'>
                        .
                      </span>
                    ) : index < markdownIdx ? (
                      <span key={index} className=' text-green-500'>
                        .
                      </span>
                    ) : (
                      <Fragment key={index}>.</Fragment>
                    ),
                ),
              ]}
            </p>
            <CarouselNext setMarkdownIdx={setMarkdownIdx} />
          </div>
        </Carousel>
        <div className='w-full flex flex-row gap-1'>
          <Button
            disabled={currentPosition === 0}
            size='sm'
            variant='outline'
            className='w-[20%]'
            onClick={() => {
              setFocus(new THREE.Vector3(...CHECKPOINTS[(currentPosition - 1) % CHECKPOINTS.length].position))
              setCurrentPosition((prev) => prev - 1)
              setMarkdownIdx(0)
            }}
          >
            Back
          </Button>
          <Button
            className='w-[80%]'
            size='sm'
            onClick={() => {
              setFocus(new THREE.Vector3(...CHECKPOINTS[(currentPosition + 1) % CHECKPOINTS.length].position))
              setCurrentPosition((prev) => prev + 1)
              setMarkdownIdx(0)
            }}
            disabled={markdownIdx < CHECKPOINTS[currentPosition % CHECKPOINTS.length].markdown.length - 1}
          >
            Continue
          </Button>
        </div>
      </div>
      <Link className={buttonVariants({ variant: 'outline', className: 'absolute top-4 left-4' })} href={'/'}>
        <ChevronLeft className='size-4' />
      </Link>
      <ThemeButton className='absolute top-4 right-4' />
      <Accordion
        className='shadow-md bg-card rounded-lg transition-all cursor-pointer z-20 absolute bottom-4 left-4'
        type='single'
        collapsible
      >
        <AccordionItem className='rounded-lg border px-4 py-1' value='item-1'>
          <AccordionTrigger>
            <div className='flex flex-col gap-1'>
              <p className='text-yellow-300 font-thin text-xs md:text-sm'>CHAPTER 2</p>
              <p className='font-thin text-xs md:text-sm text-left'>Learn</p>
            </div>
          </AccordionTrigger>
          <AccordionContent className='flex flex-col gap-2'>
            <AccordionItem className='group' value='chapter-1'>
              <div className='flex flex-col'>
                <p className='group-hover:text-blue-500 transition-all font-thin text-primary/70 text-[8px] md:text-[10px]'>
                  CHAPTER 1
                </p>
                <p className='font-thin text-xs md:text-sm'>Learn</p>
              </div>
            </AccordionItem>
            <AccordionItem className='group' value='chapter-2'>
              <div className='flex flex-col'>
                <p className='group-hover:text-blue-500 transition-all font-thin text-yellow-300 text-[8px] md:text-[10px]'>
                  CHAPTER 2
                </p>
                <p className='font-thin text-xs md:text-sm'>Learn</p>
              </div>
            </AccordionItem>
            <AccordionItem className='group' value='chapter-3'>
              <div className='flex flex-col'>
                <p className='font-thin text-primary/70 group-hover:text-blue-500 transition-all text-[8px] md:text-[10px]'>
                  CHAPTER 3
                </p>
                <p className=' font-thin text-xs md:text-sm'>Explore</p>
              </div>
            </AccordionItem>
            <AccordionItem className='group' value='chapter-4'>
              <div className='flex flex-col'>
                <p className='group-hover:text-blue-500 transition-all font-thin  text-primary/70 text-[8px] md:text-[10px]'>
                  CHAPTER 4
                </p>
                <p className='font-thin text-xs md:text-sm'>Build</p>
              </div>
            </AccordionItem>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
