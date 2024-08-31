'use client'
import BlogIcon3d from '@/blog-icon-3d'
import CloneFemaleChicken from '../CloneFemaleChicken'

export default function PPOIcon() {
  return <BlogIcon3d model={CloneFemaleChicken} props={{ scale: 0.3, rotation: [0, Math.PI * 0.25, 0] }} />
}
