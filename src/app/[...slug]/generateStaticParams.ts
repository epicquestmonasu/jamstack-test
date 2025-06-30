import { wpFetch } from '@/lib/wp';

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  const data = await wpFetch<{ posts: { nodes: { uri: string }[] } }>(`
    query AllPosts {
      posts(first: 100) {
        nodes {
          uri
        }
      }
    }
  `);

  return data.posts.nodes.map((post) => ({
    slug: post.uri.split('/').filter(Boolean),
  }));
}
