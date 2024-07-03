'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'

export default function PPOImage() {
  const theme = useTheme()
  return <Image src={`/ppo-${theme.resolvedTheme}.png`} alt='image prview' width={800} height={320} />
}
