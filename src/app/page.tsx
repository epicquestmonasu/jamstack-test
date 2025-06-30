// src/app/page.tsx
import { wpFetch } from '@/lib/wp';

type Post = { id: string; title: string };

export default async function Home() {
  // 10件だけ取るサンプル
  const data = await wpFetch<{ posts: { nodes: Post[] } }>(
    `query GetPosts {
       posts(first: 10) {
         nodes {
           id
           title
         }
       }
     }`
  );

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">WordPress Posts</h1>
      <ul className="list-disc pl-6 space-y-1">
        {data.posts.nodes.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </main>
  );
}
