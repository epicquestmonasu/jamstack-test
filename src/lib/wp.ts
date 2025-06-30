// src/lib/wp.ts
export async function wpFetch<T>(query: string, variables: Record<string, any> = {}): Promise<T> {
  const res = await fetch(`${process.env.WP_URL}/graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    // ISR を効かせたいなら revalidate 指定
    next: { revalidate: 60 }
  });
  
  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('WPGraphQL error');
  }
  return json.data;
}
