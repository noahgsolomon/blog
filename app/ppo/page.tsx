'use client'

import { Html, OrbitControls, PerspectiveCamera, PresentationControls } from '@react-three/drei'
import dynamic from 'next/dynamic'
import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import Lights from '@/Lights'
import PPO from './PPO'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import CameraControls from 'camera-controls'
import { Button, buttonVariants } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import rehypeRaw from 'rehype-raw'
import ThemeButton from '@/components/ThemeButton'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, ChevronLeft, Dot, Play } from 'lucide-react'
import Markdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import Image from 'next/image'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
})

CameraControls.install({ THREE: THREE })

function Controls({ zoom, focus, pos = new THREE.Vector3(), look = new THREE.Vector3(), chapterNumber }) {
  const lookOffset = useMemo(() => structuredClone(look), [chapterNumber])
  const camera = useThree((state) => state.camera)
  const gl = useThree((state) => state.gl)
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), [])
  return useFrame((state, delta) => {
    zoom ? pos.set(focus.x, focus.y, focus.z + 2) : pos.set(0, 0, 5)
    const targetLook = zoom
      ? new THREE.Vector3(focus.x + lookOffset.x, focus.y + lookOffset.y, focus.z - 2 + lookOffset.z)
      : new THREE.Vector3(0, 0, 4)

    state.camera.position.lerp(pos, 0.5)
    state.camera.updateProjectionMatrix()

    controls.setLookAt(
      state.camera.position.x,
      state.camera.position.y,
      state.camera.position.z,
      targetLook.x,
      targetLook.y,
      targetLook.z,
      true,
    )
    return controls.update(delta)
  })
}

const CHECKPOINTS = [
  {
    chapterName: 'Intro to RL',
    position: [-10, 4, 5],
    look: [0, -2, 0],
    markdown: [
      `## Reinforcement Learning
<br></br>
RL is a class of algorithms in Machine learning which can learn to navigate an environment in such a way to maximize a cumulative reward. By initially making random actions in an environment, and being informed of the quality of the action chosen, the agent is able to iteratively approach more optimal generalizations about this environment.
<br></br>
A valuable aspect of RL is that we do not even need to understand what the optimal solution will be which maximizes the reward. All that is needed for learning to take place is an environment, a way to observe that environment, and a reward signal which determines the value of any state. For this reason, one particularly important and challenging aspect of RL is how to model the environment states, and what reward we should assign to those states.
<br></br>
## Why do we even need this RL stuff? 
<br></br>
Can't we just pre-compute the most optimal action to take for any given state? The problem is the scale of possible states to experience and actions to choose from. As an example, if we take an atari screen's pixels as input to learn to play some game, where the size of the screen is 160x192 pixels in grayscale, each pixel would be able to take on 256 different values. 
<br></br> 
There being $160 \\times 192$ different pixels, the total number of states this policy function could receive as input would be $256^{(160 \\times 192)}$. (Costa Huang dissertation) For context, there are $10^{80}$ atoms in the known universe, so this problem is computationally infeasible to pre-compute a state-to-action mapping table.
<br></br>
### The essence
<br></br>
The essence of RL is to learn some function approximation called the policy, denoted as $\\pi$, which takes in as input the state $s$ of the agent in the environment and outputs an action $a$ to take to move us from the current state to a new state.
<br></br>
The chain of state-action pairs an agent experiences is called a trajectory, denoted as $\\tau = (s_0, a_0, s_1, a_1, \\dots, s_T)$.
<br></br>
This trajectory forms an episode, and can either end by reaching a terminal state (out of bounds, or final reward achieved, etc.) or by taking $T$ transitions, where $T$ is the maximum trajectory length.
`,
      `### Fundamentally there are only <u>two</u> phases in training. 
<br></br>
#### <u className="bg-blue-500/40">Step 1</u>
The first is the <u>data collection step</u>, which is when the agents navigate the environment, collecting information like the state transitions and actions taken, the probability outputted for the action chosen, the reward received from the new state, and more.

<br></br>
Mathematically, we can represent this as a tuple $(s_t, a_t, r_t, s_{t+1}, \\pi_\\theta(a_t|s_t))$, where $s_t$ is the current state, $a_t$ is the action taken, $r_t$ is the reward received, $s_{t+1}$ is the next state, and $\\pi_\\theta(a_t|s_t)$ is the probability of taking action $a_t$ given state $s_t$ under the current policy $\\pi_\\theta$.
<br></br>
#### <u className="bg-purple-500/40">Step 2</u>
The next step is the <u>optimization step</u> where we take this information and optimize our policy function $\\pi_\\theta$ so that we discourage taking actions in states which received low reward, and encourage taking actions in states where we received large reward.
<br></br>
This can be achieved by maximizing the expected cumulative reward $J(\\theta) = \\mathbb{E}_{\\tau \\sim \\pi_\\theta}[\\sum_{t=0}^T \\gamma^t r_t]$, where $\\tau$ is a trajectory sampled from the policy $\\pi_\\theta$, $\\gamma$ is the discount factor, and $T$ is the horizon length. By updating the policy parameters $\\theta$ using gradient ascent on $J(\\theta)$, we can improve the policy to take actions that lead to higher rewards.`,
      `## If you get anything from this section it should be this
<br></br>
An agent is situation in environment $E$, in which it observed states $s_t$ where $s \\in S$, the possibly infinite number of different states an agent might find itself, for all timesteps $t$, where $1 \\leq t \\leq T$, $T$ being the max trajectory length.
<br></br>
When situated in state $s_t$, the objective is to pick an action $a_t$ in which is most optimal with respect to our cumulative reward received. $a_t$ denotes the action we pick at time step $t$ based on our observation in $s_t$. Once we take this action, we arive in a new state $s_{t+1}$ which yields a reward $r_t$.<br></br>
Note, we ourselves need to come up with some reward function, which is what we want the critic (will explain more later) to predict as accurately as possible. $a_t$ is within the set $A$, where $A$ is all possible actions we can take. For simplicity, we can assume all actions in the set $A$ are valid for all states. (PPO Explained Paper)`,
    ],
  },
  {
    chapterName: 'Q Learning',
    position: [90, 0, 0],
    look: [0, 0, 0],
    markdown: [
      `### The essence
<br></br>
The essence of RL is to learn some function approximation called the policy, denoted as $\\pi$, which takes in as input the state $s$ of the agent in the environment and outputs an action $a$ to take to move us from the current state to a new state.
<br></br>
The chain of state-action pairs an agent experiences is called a trajectory, denoted as $\\tau = (s_0, a_0, s_1, a_1, \\dots, s_T)$.
<br></br>
This trajectory forms an episode, and can either end by reaching a terminal state (out of bounds, or final reward achieved, etc.) or by taking $T$ transitions, where $T$ is the maximum trajectory length.
`,
    ],
  },
  {
    chapterName: 'Deep Q Learning (DQN)',
    position: [190, 0, 0],
    look: [0, 0, 0],
    markdown: [
      `
`,
    ],
  },
]

export default function Page() {
  const [isMounted, setIsMounted] = useState(false)
  const [zoom, setZoom] = useState(false)
  const [focus, setFocus] = useState({})
  const [look, setLook] = useState(new THREE.Vector3())
  const [currentPosition, setCurrentPosition] = useState(0)

  const [markdownIdx, setMarkdownIdx] = useState(0)

  const markdownContainerRef = useRef(null)

  useEffect(() => {
    setZoom(true)
    setFocus(new THREE.Vector3(...CHECKPOINTS[0].position))
    setLook(new THREE.Vector3(...CHECKPOINTS[0].look))
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className='w-screen h-screen overflow-hidden flex flex-col lg:flex-row'>
      <div className='w-full lg:w-[60%] lg:h-full h-[50%] relative'>
        <View className=' touch-none w-full h-full '>
          <PPO />
          <Lights />
          {/* <OrbitControls /> */}
          <Controls look={look} zoom={zoom} focus={focus} chapterNumber={currentPosition % CHECKPOINTS.length} />
        </View>
        <ThemeButton className='absolute top-4 right-4' />
      </div>

      <div className='flex border-t lg:border-l shadow-md p-4 z-10 bg-card w-full lg:w-[40%] flex-col gap-4 h-[50%] lg:h-full overflow-y-hidden'>
        <div className='flex flex-col  h-full'>
          <div
            ref={markdownContainerRef}
            className='bg-popover h-[80%] lg:h-[750px] shadow-inner overflow-y-auto overflow-x-hidden border rounded-lg p-4 relative z-0'
          >
            {/* <div className='absolute bg-white/[7.5%] -top-4  -left-[16px] h-[110%] w-[50px]' />
            <div className='absolute bg-[#f9fb00]/[7.5%] -top-4  left-[34px] h-[110%] w-[50px]' />
            <div className='absolute bg-[#02feff]/[7.5%]  -top-4  left-[84px] h-[110%] w-[50px]' />
            <div className='absolute bg-[#01ff00]/[7.5%] -top-4  left-[134px] h-[110%] w-[50px]' />
            <div className='absolute bg-[#fd00fb]/[7.5%]  -top-4  left-[184px] h-[110%] w-[50px]' />
            <div className='absolute bg-[#fb0102]/[7.5%]  -top-4  left-[234px] h-[110%] w-[50px]' />
            <div className='absolute bg-[#0301fc]/[7.5%] -top-4  left-[284px] h-[110%] w-[50px]' />
            <div className='absolute bg-black/[7.5%] -top-4  left-[334px] h-full w-[50px]' /> */}
            <Markdown
              className='z-10 relative'
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex, rehypeHighlight, rehypeRaw]}
            >
              {CHECKPOINTS[currentPosition % CHECKPOINTS.length].markdown[markdownIdx]}
            </Markdown>
          </div>

          <div className='flex flex-col gap-4'>
            <div className='flex w-full justify-center gap-4 pt-4 items-center'>
              <Button
                variant='outline'
                size='icon'
                className='size-6'
                disabled={markdownIdx <= 0}
                onClick={() => {
                  setMarkdownIdx((prev) => prev - 1)
                  markdownContainerRef.current?.firstElementChild?.scrollIntoView()
                }}
              >
                <ArrowLeft className='size-4' />
              </Button>
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
              <Button
                size='icon'
                variant='outline'
                className='size-6'
                disabled={markdownIdx >= CHECKPOINTS[currentPosition % CHECKPOINTS.length].markdown.length - 1}
                onClick={() => {
                  setMarkdownIdx((prev) => prev + 1)
                  markdownContainerRef.current?.firstElementChild?.scrollIntoView()
                }}
              >
                <ArrowRight className='size-4' />
              </Button>
            </div>

            <div className='w-full flex flex-row gap-1'>
              <Button
                disabled={currentPosition === 0}
                size='sm'
                variant='outline'
                className='w-[20%]'
                onClick={() => {
                  setFocus(new THREE.Vector3(...CHECKPOINTS[(currentPosition - 1) % CHECKPOINTS.length].position))
                  setLook(new THREE.Vector3(...CHECKPOINTS[(currentPosition - 1) % CHECKPOINTS.length].look))

                  setCurrentPosition((prev) => prev - 1)
                  setMarkdownIdx(0)
                  markdownContainerRef.current?.firstElementChild?.scrollIntoView()
                }}
              >
                Back
              </Button>

              <Button
                className='w-[80%]'
                size='sm'
                disabled={markdownIdx < CHECKPOINTS[currentPosition % CHECKPOINTS.length].markdown.length - 1}
                onClick={() => {
                  setFocus(new THREE.Vector3(...CHECKPOINTS[(currentPosition + 1) % CHECKPOINTS.length].position))
                  setLook(new THREE.Vector3(...CHECKPOINTS[(currentPosition + 1) % CHECKPOINTS.length].look))

                  setCurrentPosition((prev) => prev + 1)
                  setMarkdownIdx(0)
                  markdownContainerRef.current?.firstElementChild?.scrollIntoView()
                }}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Link className={buttonVariants({ variant: 'outline', className: 'absolute top-4 left-4' })} href={'/'}>
        <ChevronLeft className='size-4' />
      </Link>
      <h1 className='text-2xl absolute z-20 top-12 left-1/2 lg:left-1/3 transform -translate-x-1/2 font-bold'>
        {currentPosition % CHECKPOINTS.length}. {CHECKPOINTS[currentPosition % CHECKPOINTS.length].chapterName}
      </h1>
      <Accordion
        className='hidden lg:block shadow-md bg-card rounded-lg transition-all cursor-pointer z-20 absolute bottom-4 left-4'
        type='single'
        collapsible
      >
        <AccordionItem className='rounded-lg border px-4 py-1' value='item-1'>
          <AccordionTrigger>
            <div className='flex flex-col gap-1'>
              <p className='text-yellow-300 font-thin text-xs md:text-sm'>
                CHAPTER {currentPosition % CHECKPOINTS.length}
              </p>
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
                  setLook(new THREE.Vector3(...CHECKPOINTS[index % CHECKPOINTS.length].look))
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
