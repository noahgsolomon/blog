'use client'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import Link from 'next/link'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import Footer from './footer'

export default function Blog({ md, date }: { md: string; date: string }) {
  return (
    <>
      <div className='grow'>
        <div className='flex flex-col px-4 mx-auto max-w-[800px] w-full pt-12 pb-8 min-h-[90vh]'>
          <Link
            href={'/'}
            className='underline underline-offset-4 pb-8 text-[#5692ae] hover:text-[#5692ae] visited:text-[#8466aa]'
          >
            home
          </Link>
          <p className='text-primary/60 pb-4'>{date}</p>
          <h1 className='border-b text-3xl pb-8'>writing a lexer in zig</h1>
          <Markdown
            components={{
              code: ({ className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className ?? '')
                return match ? (
                  <div>
                    {/* <p className='border inline-block bg-background p-1'>{match[1]}</p> */}
                    <SyntaxHighlighter style={nightOwl} language={match[1]}>
                      {children}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              },
              a: ({ href, children }) => (
                <Link
                  href={href}
                  className='underline underline-offset-4 text-[#5692ae] hover:text-[#5692ae] visited:text-[#8466aa]'
                >
                  {children}
                </Link>
              ),
            }}
            className='py-8 border-b flex flex-col gap-6 leading-relaxed tracking-wide'
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex, rehypeRaw]}
          >
            {md}
          </Markdown>
        </div>
      </div>
      <Footer root={false} />
    </>
  )
}
