'use client';

import { GenericReactHTMLNode } from '@/types';
import { cn } from '@/utils/common';
import Link from 'next/link';
import { ContentPadding } from './ContentPadding';

export function Footer({
  className,
  innerClassName,
  innerStyle,
  ...rest
}: { innerClassName?: string; innerStyle: object } & GenericReactHTMLNode) {
  return (
    <div
      className={cn(
        'flex justify-center items-center border-t border-gray-300',
        className,
      )}
      {...rest}
    >
      <ContentPadding
        className={innerClassName}
        style={innerStyle}
        affectsHeight={false}
        innerClassName="flex justify-between w-full text-xs"
      >
        <Link href="/">TELEPLEX LOGO</Link>
        <div className="flex gap-4">This is a customizable footer</div>
        <div className="flex gap-4">Site by rengwu</div>
      </ContentPadding>
    </div>
  );
}
