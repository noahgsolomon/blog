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
