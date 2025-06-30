/* eslint-disable @typescript-eslint/no-explicit-any */

// src/lib/wp.ts

export async function wpFetch<T>(query: string, variables?: Record<string, any>): Promise<T> {
  const res = await fetch(process.env.WP_GRAPHQL_ENDPOINT as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    next: { revalidate: 60 }, // ISR: 必要に応じて調整
  });

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error('GraphQL fetch failed');
  }

  return json.data;
}
