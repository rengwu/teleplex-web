import { getPageByName } from '@/api/page';
import { ContentBlock } from '@/components/ContentBlock';
import { Page, Page_Plain } from '@/types/api/page/content-types/page/page';
import { strapiRequest } from '@/utils/api';
import Link from 'next/link';

export async function generateStaticParams() {
  const response = await strapiRequest<Page_Plain[]>(`/api/pages`);
  return response.success
    ? response.data.map((pg) => ({ ...pg, pageName: pg.name }))
    : [];
}

export default async function Page({
  params,
}: {
  params: { pageName: string };
}) {
  const page = await getPageByName(params.pageName);
  if (!page) return <div>Page Not Found</div>;

  const { blocks, name, displayTitle } = page ?? {};

  return (
    <div>
      <div>
        Hello {name} {displayTitle}
      </div>
      <Link href="/">Back to Home</Link>
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
