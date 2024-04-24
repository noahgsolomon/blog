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

const CHAPTERS = [{ chapter: 1, title: '', checkpointIdx: 0 }]

const CHECKPOINTS = [
  {
    chapterName: 'Intro to RL',
    position: [-2, 0, 0],
    markdown: [
      `## Reinforcement Learning

RL is a class of algorithms in Machine learning which can learn to navigate an environment in such a way to maximize the cumulative reward it receives. By initially making random actions in states, and being informed of the quality of the action chosen, the agent is able to iteratively approach more optimal generalizations about its environment.
    `,
      `A valuable aspect of RL is that we do not even need to understand what the optimal solution will be which maximizes the reward. All that is needed for learning to take place is an environment, a way to observe that environment, and a reward signal which determines the value of any state given the observation representation of the state. For this reason, one particularly important and challenging aspect of RL is 
\`\`\`blue
how to model the environment states, and what reward we should assign to those states.
\`\`\`
`,
      `Why do we even need this RL stuff? Can't we just pre-compute the most optimal action to take for any given state? The problem is the scale of possible states to experience and actions to choose from. As an example, if we take an atari screen's pixels as input to learn to play some game, where the size of the screen is 160x192 pixels in grayscale, each pixel would be able to take on 256 different values...
`,
      ` There being $160 \\times 192$ different pixels, the total number of states this policy function could receive as input would be $256^{(160 \\times 192)}$. (Costa Huang dissertation) For context, there are $10^{80}$ atoms in the known universe, so this problem is computationally infeasible to pre-compute a state-to-action mapping table.`,
      `The essence of RL is to learn some function approximation called the policy, denoted as $\\pi$, which takes in as input the state $s$ of the agent in the environment and outputs an action $a$ to take to move us from the current state to a new state.`,
      ` The chain of state-action pairs an agent experiences is called a trajectory, denoted as $\\tau = (s_0, a_0, s_1, a_1, \\dots, s_T)$. This trajectory forms an episode, and can either end by reaching a terminal state (out of bounds, or final reward achieved, etc.) or by taking $T$ transitions, where $T$ is the maximum trajectory length.`,

      `Fundamentally there are only two phases in training. The first is the data collection step, which is when the agents navigate the environment, collecting information like the state transitions and actions taken, the probability outputted for the action chosen, the reward received from the new state, and more.`,
      `Mathematically, we can represent this as a tuple $(s_t, a_t, r_t, s_{t+1}, \\pi_\\theta(a_t|s_t))$, where $s_t$ is the current state, $a_t$ is the action taken, $r_t$ is the reward received, $s_{t+1}$ is the next state, and $\\pi_\\theta(a_t|s_t)$ is the probability of taking action $a_t$ given state $s_t$ under the current policy $\\pi_\\theta$.`,
      `The next step is the optimization step where we take this information and optimize our policy function $\\pi_\\theta$ so that we discourage taking actions in states which received low reward, and encourage taking actions in states where we received large reward.`,
      `This can be achieved by maximizing the expected cumulative reward $J(\\theta) = \\mathbb{E}_{\\tau \\sim \\pi_\\theta}[\\sum_{t=0}^T \\gamma^t r_t]$, where $\\tau$ is a trajectory sampled from the policy $\\pi_\\theta$, $\\gamma$ is the discount factor, and $T$ is the horizon length. By updating the policy parameters $\\theta$ using gradient ascent on $J(\\theta)$, we can improve the policy to take actions that lead to higher rewards.`,
      `If you get anything from this section it should be this: An agent is situation in environment $E$, in which it observed states $s_t$ where $s \\in S$, the possibly infinite number of different states an agent might find itself, for all timesteps $t$, where $1 \\leq t \\leq T$, $T$ being the max trajectory length... `,
      `When situated in state $s_t$, the objective is to pick an action $a_t$ in which is most optimal with respect to our cumulative reward received. $a_t$ denotes the action we pick at time step $t$ based on our observation in $s_t$. Once we take this action, we arive in a new state $s_{t+1}$ which yields a reward $r_t$.`,
      `Note, we ourselves need to come up with some reward function, which is what we want the critic (will explain more later) to predict as accurately as possible. $a_t$ is within the set $A$, where $A$ is all possible actions we can take. For simplicity, we can assume all actions in the set $A$ are valid for all states. (PPO Explained Paper)`,
      `So the one sentence TL;DR:
      
Learn a function to convert states to actions s.t. the cumulative reward is maximized.`,
    ],
  },
  {
    chapterName: 'Intro to RL 2',
    position: [0, 0, 0],
    markdown: [
      `
  \`\`\`blue
  console.log('Hello, world!');
  \`\`\`
  `,
    ],
  },
  {
    chapterName: 'Intro to RL 3',
    position: [2, 0, 0],
    markdown: [
      `
## Advantages of PPO

PPO has several advantages compared to other policy gradient methods:

**Stability**: PPO uses a surrogate objective that is clipped, which helps maintain stability by avoiding excessively large policy updates. The probability ratio $r_t(\\theta) = \\frac{\\pi_\\theta(a_t|s_t)}{\\pi_{\\theta_{old}}(a_t|s_t)}$ is constrained to stay within $[1-\\epsilon, 1+\\epsilon]$, where $\\epsilon$ is a small constant. `,

      `**Sample Efficiency**: PPO is more sample efficient than methods like TRPO, needing fewer interactions with the environment to achieve good performance. It accomplishes this by allowing multiple epochs of minibatch updates.`,

      `**Simple to Implement**: The clipped surrogate objective is relatively simple to implement, not requiring complex second-order optimization like TRPO.`,

      `**Scalability**: PPO has been shown to scale well to challenging environments with high-dimensional observation and action spaces.
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
      <div className='shadow-md absolute bottom-1/4 right-4 md:bottom-24 md:right-24 rounded-lg border p-4 bg-card z-10 max-w-[60%] w-[400px] flex flex-col gap-4 max-h-[50%] overflow-y-hidden'>
        <Carousel className='touch-none' change={currentPosition}>
          <CarouselContent className='h-[300px] overflow-y-auto border rounded-lg p-1 bg-popover'>
            {CHECKPOINTS[currentPosition % CHECKPOINTS.length].markdown.map((markdown, index) => (
              <CarouselItem key={index}>
                <Markdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex, rehypeHighlight]}>
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
              <p className='text-yellow-300 font-thin text-xs md:text-sm'>CHAPTER {currentPosition}</p>
              <p className='font-thin text-xs md:text-sm text-left'>
                {CHECKPOINTS[currentPosition % CHECKPOINTS.length].chapterName}
              </p>
            </div>
          </AccordionTrigger>
          <AccordionContent className='flex flex-col gap-2'>
            {CHECKPOINTS.map((checkpoint, index) => (
              <AccordionItem
                onClick={() => {
                  setFocus(new THREE.Vector3(...CHECKPOINTS[index % CHECKPOINTS.length].position))
                  setCurrentPosition(index)
                  setMarkdownIdx(0)
                }}
                key={index}
                className='group'
                value='chapter-1'
              >
                <div className='flex flex-col'>
                  <p
                    className={`${index === currentPosition ? 'text-yellow-300' : ''} group-hover:text-blue-500 transition-all font-thin text-primary/70 text-[8px] md:text-[10px]`}
                  >
                    CHAPTER {index}
                  </p>
                  <p className='font-thin text-xs md:text-sm'>{checkpoint.chapterName}</p>
                </div>
              </AccordionItem>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
