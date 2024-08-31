'use client'
import BlogIcon3d from '@/blog-icon-3d'
import CloneZig from '../CloneZig'
import CloneBunny from '../CloneBunny'

export default function LexerIcon() {
  return <BlogIcon3d model={CloneBunny} props={{ scale: 1, rotation: [0, Math.PI * 0.25, 0] }} />
}
