import { ContentPadding } from '@/components/ContentPadding';
import { NewsArticle_Plain } from '@/types/api/news-article/content-types/news-article/news-article';
import { strapiRequest } from '@/utils/api';
import { Metadata } from 'next';

export const generateStaticParams = async () => {
  const response =
    await strapiRequest<NewsArticle_Plain[]>(`/api/news-articles`);
  return response.success
    ? response.data.map((article) => ({ ...article, id: `${article.id}` }))
    : [];
};

type PageProps = { params: { id: string } };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const response =
    await strapiRequest<NewsArticle_Plain[]>(`/api/news-articles`);
  const title = response.success
    ? response.data.find((article) => `${article.id}` === `${params.id}`)?.title
    : 'Article';

  return {
    title: title,
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const response = await strapiRequest<NewsArticle_Plain>(
    `/api/news-articles/${params.id}`,
  );
  if (!response || !response.success) return <div>Article Not Found</div>;
  const article = response.data;

  return (
    <>
      <ContentPadding>
        <div>ARTICLE</div>
        <div>{article.title}</div>
        <div>{article.content}</div>
      </ContentPadding>
    </>
  );
}
