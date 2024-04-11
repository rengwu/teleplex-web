import { getPageByName } from '@/api/page';
import { ContentBlock } from '@/components/ContentBlock';
import { Page_Plain } from '@/types/api/page/content-types/page/page';
import { strapiRequest } from '@/utils/api';
import { Metadata } from 'next';

export const generateStaticParams = async () => {
  const response = await strapiRequest<Page_Plain[]>(`/api/pages`);
  return response.success
    ? response.data.map((pg) => ({ ...pg, pageName: pg.name }))
    : [];
};

type PageProps = { params: { pageName: string } };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const page = await getPageByName(params.pageName);
  return {
    title: page?.displayTitle,
  };
}

export default async function Page({ params }: PageProps) {
  const page = await getPageByName(params.pageName);
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
