import { GenericReactHTMLNode } from '@/types';
import React from 'react';
import { DecoratedContent } from './DecoratedContent';
import { Hero } from './Hero';

const componentMap: { [key: string]: React.JSX.Element } = {
  'content-block.hero': <Hero />,
  'content-block.decorated-content': <DecoratedContent />,
};

export const ContentBlock = ({
  name,
  data,
  ...props
}: {
  name: string;
  data: any;
} & GenericReactHTMLNode) => {
  if (!(name in componentMap)) {
    return <></>;
  }
  return React.cloneElement(componentMap[name], { data, ...props });
};
