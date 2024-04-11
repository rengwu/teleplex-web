'use client';

import { GenericReactHTMLNode } from '@/types';
import { cn } from '@/utils/common';
import Link from 'next/link';
import { ContentPadding } from './ContentPadding';
import { GLOBAL_HEADER_HEIGHT } from '@/app/globals';
import { Menu_Plain } from '@/types/components/components/interfaces/Menu';

export function Header({
  className,
  innerClassName,
  style,
  navItems = [],
  ...rest
}: {
  innerClassName?: string;
  navItems?: Menu_Plain[];
} & GenericReactHTMLNode) {
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
          {/* TODO: implement dropdown for nested menus */}
          {navItems.map((navItem) => (
            <Link key={navItem.href} href={navItem.href ?? ''}>
              {navItem.label}
            </Link>
          ))}
        </div>
      </ContentPadding>
    </div>
  );
}
