import { GenericReactHTMLNode } from '@/types';
import { NewsArticle_Plain } from '@/types/api/news-article/content-types/news-article/news-article';
import { ArticleCarousel_Plain } from '@/types/components/content-block/interfaces/ArticleCarousel';
import { ArticleCarouselClient } from './ArticleCarouselClient';
import { strapiRequest } from '@/utils/api';

// handle fetching
const fetchMostRecentArticles = async (limit: number) => {
  const response = await strapiRequest<NewsArticle_Plain[]>(
    `/api/news-articles?pagination[page]=1&pagination[pageSize]=5&populate=deep&populate=*`,
  );
  return response.success ? response.data : [];
};

export async function ArticleCarousel({
  data,
  ...props
}: { data?: ArticleCarousel_Plain } & GenericReactHTMLNode) {
  const mode = data?.mode;
  let articles: NewsArticle_Plain[] = [];

  if (mode == 'featured') articles = data?.featured_articles ?? [];
  else if (mode == 'most_recent')
    articles = (await fetchMostRecentArticles(data?.limit ?? 5)) ?? [];

  return <ArticleCarouselClient data={data} articles={articles} {...props} />;
}
