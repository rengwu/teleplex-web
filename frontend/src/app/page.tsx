import { getPageByName } from '@/api/page';
import { ContentBlock } from '@/components/ContentBlock';
import Link from 'next/link';

export default async function Home() {
  const page = await getPageByName('home');
  if (!page) return <div>Page Not Found</div>;

  const { blocks } = page ?? {};

  return (
    <>
      {blocks.map((block, index) => {
        return (
          <ContentBlock key={index} name={block.__component} data={block} />
        );
      })}
    </>
  );
}
