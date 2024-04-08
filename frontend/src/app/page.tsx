import { getPageByName } from '@/api/page';
import Link from 'next/link';

export default async function Home() {
  const data = await getPageByName('home');

  return (
    <div>
      <div>Hello next-strapi-static</div>
      <div>
        <Link href="/about">About</Link>
        <Link href="/somerandomlink">somerandomlink</Link>
      </div>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
}
