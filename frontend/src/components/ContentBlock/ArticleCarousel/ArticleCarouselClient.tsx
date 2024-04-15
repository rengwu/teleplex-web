'use client';

import { GenericReactHTMLNode } from '@/types';
import { cn, getStrapiImage } from '@/utils/common';
import { titleFont } from '@/app/globals';
import { ArticleCarousel_Plain } from '@/types/components/content-block/interfaces/ArticleCarousel';
import { NewsArticle_Plain } from '@/types/api/news-article/content-types/news-article/news-article';
import { ContentPadding } from '@/components/ContentPadding';
import { ButtonContainer } from '@/components/ButtonContainer';
import { Button } from '@/components/Button';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Link from 'next/link';

export function ArticleCarouselClient({
  data,
  articles = [],
  className,
  ...props
}: {
  articles?: NewsArticle_Plain[];
  data?: ArticleCarousel_Plain;
} & GenericReactHTMLNode) {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
  });

  return (
    <div className={cn('py-24 bg-gray-200/50', className)} {...props}>
      <ContentPadding>
        <div className="flex flex-row justify-between items-center mb-8">
          <div className={cn(titleFont.className, 'font-semibold text-3xl')}>
            {data?.title}
          </div>
          <Link href={`/articles`}>See More</Link>
        </div>

        <div className="overflow-visible" ref={emblaRef}>
          <div className="flex gap-8">
            {articles.map((article) => {
              const splitContent = article.content?.split(' ') ?? [];
              return (
                <Link
                  href={`/articles/${article.id}`}
                  className="flex-grow-0 flex-shrink-0 basis-full min-w-0 max-w-[460px]"
                  key={article.id}
                >
                  <div className="flex flex-col h-full overflow-hidden">
                    <div className="relative w-full h-full overflow-hidden rounded-lg aspect-[16/9]">
                      <Image
                        fill
                        alt={article.cover_image?.alternativeText ?? ''}
                        src={getStrapiImage(article.cover_image) ?? ''}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col p-4">
                      <div className="text-lg font-semibold">
                        {article.title}
                      </div>
                      <div className="mt-2">
                        {splitContent.slice(0, 40).join(' ')}
                        {splitContent.length > 40 ? '...' : ''}
                      </div>
                      {/* <div className="flex flex-row justify-end mt-4">
                        Read More
                      </div> */}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {data?.links && (
          <ButtonContainer>
            {data?.links.map((link) => (
              <Button href={link.href} key={link.label}>
                {link.label}
              </Button>
            ))}
          </ButtonContainer>
        )}
      </ContentPadding>
    </div>
  );
}
