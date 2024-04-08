import { Page_Plain } from '@/types/api/page/content-types/page/page';
import { strapiRequest } from '@/utils/api';

// get deeply-populated page data by its name
export async function getPageByName(
  name: string,
): Promise<Page_Plain | undefined> {
  const pagesResponse = await strapiRequest<Page_Plain[]>(`/api/pages`);
  if (pagesResponse.success) {
    const index = pagesResponse.data.findIndex((page) => page.name === name);
    if (index >= 0) {
      const singlePageResponse = await strapiRequest<Page_Plain>(
        `/api/pages/${pagesResponse.data[index].id}?populate=deep&populate=*`,
      );
      if (singlePageResponse.success) {
        return singlePageResponse.data;
      }
    }
  }
  return undefined;
}
