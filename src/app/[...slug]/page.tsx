// src/app/[...slug]/page.tsx
import { wpFetch } from '../../lib/wp';  // 相対パスで wpFetch をインポート

type Post = {
  id: string;
  title: string;
  date: string;
  content: string;
};

type PageProps = {
  params: { slug: string[] };
};

export default async function PostPage({ params }: Params) {
  // URL のパス要素を組み立て → "/YYYY/MM/DD/slug/"
  const uri = '/' + params.slug.join('/') + '/';

  const data = await wpFetch<{
    postBy: Post | null;
  }>(
    `
      query GetPostByURI($uri: String!) {
        postBy(uri: $uri) {
          id
          title
          date
          content
        }
      }
    `,
    { uri }
  );

  if (!data.postBy) {
    return <p>これは今日の記事かな</p>;
  }

  const { title, date, content } = data.postBy;
  return (
    <article className="prose mx-auto p-8">
      <h1>{title}</h1>
      <time dateTime={date}>{new Date(date).toLocaleDateString()}</time>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
}
