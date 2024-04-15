import { GenericReactHTMLNode } from '@/types';
import { ArticleCarousel } from './ArticleCarousel';
import { DecoratedContent } from './DecoratedContent';
import { Hero } from './Hero';
import { PageHero } from './PageHero';

export const componentMap: {
  [key: string]: JSX.Element;
} = {
  'content-block.hero': <Hero />,
  'content-block.decorated-content': <DecoratedContent />,
  'content-block.page-hero': <PageHero />,
  'content-block.article-carousel': <ArticleCarousel />,
};
