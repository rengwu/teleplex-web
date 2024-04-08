import { Page, Page_Plain } from '@/types/api/page/content-types/page/page';
import { strapiRequest } from '@/utils/api';
import { Metadata } from 'next';
import { useParams } from 'next/navigation';

export async function generateStaticParams() {
  const response = await strapiRequest<Page_Plain[]>(`/api/pages`);
  console.log('RESPONSE', response);
  if (response.success) {
    const pages = response.data;
    return pages.map((page) => ({
      pageid: `${page.name}`,
    }));
  }
  return [];
}

export default async function Page({ params }: { params: { pageid: string } }) {
  const response = await strapiRequest<Page_Plain[]>(
    `/api/pages?filters[name][$eq]=${params.pageid}&populate=deep&populate=*`,
  );
  let page;
  if (response.success) {
    page = response.data[0];
  }

  console.log('HUH', params, page);

  return (
    <div>
      <div>Hello page</div>
    </div>
  );
}
