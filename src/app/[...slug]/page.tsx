import { wpFetch } from '@/lib/wp';
import { generateStaticParams as realParams } from './generateStaticParams'; // ⭐️ import で回避！

type Post = {
  id: string;
  title: string;
  date: string;
  content: string;
};

// ⭐️ 関数名だけ export（Next.js が認識）
export { realParams as generateStaticParams };

export default async function Page({ params }: any) {
  // NOTE: any にすることで型推論の不具合をスキップ
  const uri = '/' + params.slug.join('/') + '/';

  const data = await wpFetch<{ postBy: Post | null }>(
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
    return <p>この記事は見つかりませんでした。</p>;
  }

  const { title, date, content } = data.postBy;

  return (
    <article className="prose mx-auto p-8">
      <h1>{title}</h1>
      <time dateTime={date}>
        {new Date(date).toLocaleDateString('ja-JP', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </time>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
}
