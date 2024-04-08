import { getPageByName } from '@/api/page';
import { ContentBlock } from '@/components/ContentBlock';
import Link from 'next/link';

export default async function Home() {
  const page = await getPageByName('home');
  if (!page) return <div>Page Not Found</div>;

  const { blocks, name, displayTitle } = page ?? {};

  return (
    <div>
      <div>Hello next-strapi-static</div>
      <div>
        <Link href="/about">About</Link>
        <Link href="/somerandomlink">somerandomlink</Link>
      </div>
      <div>{JSON.stringify(page)}</div>
      <div>
        {blocks.map((block, index) => {
          return (
            <ContentBlock
              key={index}
              name={block.__component}
              data={block}
              style={{ border: '1px solid white' }}
            />
          );
        })}
      </div>
    </div>
  );
}
