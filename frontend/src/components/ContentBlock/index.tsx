import { GenericReactHTMLNode } from '@/types';
import React from 'react';
import { componentMap } from './_components';
import { MissingContentBlock } from './MissingContentBlock';

export const ContentBlock = ({
  name,
  data,
  ...props
}: {
  name: string;
  data: any;
} & GenericReactHTMLNode) => {
  if (!(name in componentMap)) {
    return <MissingContentBlock name={name} />;
  }
  return React.cloneElement(componentMap[name], { data, ...props });
};
