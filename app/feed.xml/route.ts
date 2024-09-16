import RSS from 'rss'

export async function GET() {
  const feed = new RSS({
    title: 'noahgsolomon',
    description: "Noah Solomon's Blog",
    generator: 'RSS for Node and Next.js',
    feed_url: 'https://noahgsolomon.com/feed.xml',
    site_url: 'https://noahgsolomon.com/',
    managingEditor: 'noahsolomon2003@gmail.com (Noah Solomon)',
    webMaster: 'noahsolomon2003@gmail.com (Noah Solomon)',
    copyright: `Copyright ${new Date().getFullYear().toString()}, Noah Solomon`,
    language: 'en-US',
    pubDate: new Date().toUTCString(),
    ttl: 60,
  })

  const allPosts = [
    {
      id: 'motivating-adam-optimizer',
      title: 'Motivating Adam Optimizer',
      description: 'Learn about adam optimizer from the optimization algorithms that preceded it.',
      tags: ['adam optimizer', 'ai', 'artificial intelligence', 'machine learning', 'neural networks'],
      date: '2024-09-16',
    },
    {
      id: 'cfg-and-recursive-descent-parser',
      title: 'CFG and Recursive Descent Parser Theory in Zig',
      description:
        'Learn about recursive descent parsing, context-free grammars, and their implementation in Zig. Explore the differences between regular and context-free languages, and build a mathematical parser using a top-down approach.',
      tags: ['recursive descent parser', 'zig', 'cfg', 'regular language'],
      date: '2024-09-02',
    },
    {
      id: 'lexer-in-zig',
      title: 'Writing a Lexer in Zig',
      description:
        'How to implement a lexer in Zig for a simple interpreted programming language, including concepts like lexemes, tokens, and scanning source code, with detailed steps and code examples.',
      tags: ['zig', 'lexer', 'interpreter'],
      date: '2024-08-25',
    },
  ]

  if (allPosts) {
    allPosts.map((post) => {
      feed.item({
        title: post.title,
        description: post.description,
        url: `https://noahgsolomon.com/${post.id}`,
        categories: post.tags || [],
        author: 'Noah Solomon',
        date: post.date,
      })
    })
  }

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}
