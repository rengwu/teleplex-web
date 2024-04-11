'use client';

import { GenericReactHTMLNode } from '@/types';
import { cn } from '@/utils/common';
import Link from 'next/link';
import { ContentPadding } from './ContentPadding';
import { GLOBAL_HEADER_HEIGHT } from '@/app/globals';

export function Header({
  className,
  innerClassName,
  style,
  ...rest
}: { innerClassName?: string } & GenericReactHTMLNode) {
  return (
    <div
      className={cn(
        'flex justify-center items-center text-white mix-blend-difference',
        className,
      )}
      style={{ height: GLOBAL_HEADER_HEIGHT, ...style }}
      {...rest}
    >
      <ContentPadding
        className={innerClassName}
        affectsHeight={false}
        innerClassName="flex justify-between w-full text-sm"
      >
        <Link href="/">TELEPLEX</Link>
        <div className="flex gap-4">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </ContentPadding>
    </div>
  );
}
