import { Metadata } from 'next';
import Link from 'next/link';

export default async function Home() {
  // const site = await strapiRequest(`/api/site?populate=deep&populate=*`).data;

  return (
    <div>
      <div>Hello next-strapi-static</div>
      <div>
        <Link href="/about">About</Link>
        <Link href="/somerandomlink">somerandomlink</Link>
      </div>
    </div>
  );
}
