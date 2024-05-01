'use client';

import { GenericReactHTMLNode } from '@/types';
import { cn } from '@/utils/common';
import Link from 'next/link';
import { ContentPadding } from './ContentPadding';
import { GLOBAL_HEADER_HEIGHT } from '@/app/globals';
import { Menu_Plain } from '@/types/components/components/interfaces/Menu';
import { Brand } from './Brand';

export function Header({
  className,
  innerClassName,
  style,
  navItems = [],
  fullWidth,
  ...rest
}: {
  fullWidth?: boolean;
  innerClassName?: string;
  navItems?: Menu_Plain[];
} & GenericReactHTMLNode) {
  return (
    <div
      className={cn(
        'flex justify-center items-center text-white pointer-events-none',
        className,
      )}
      style={{
        height: GLOBAL_HEADER_HEIGHT,
        ...style,
      }}
      {...rest}
    >
      <ContentPadding
        className={innerClassName}
        affectsHeight={false}
        fullWidth={fullWidth}
        innerClassName="flex justify-between w-full text-sm"
      >
        <Link className="pointer-events-auto" href="/">
          <div className="h-[36px] py-2 rounded ">
            <Brand fill="white" className="h-full" />
          </div>
        </Link>
        <div className="flex gap-4 items-center">
          {/* TODO: implement dropdown for nested menus */}
          {navItems.map((navItem) => (
            <Link
              className="font-medium text-[14px] pointer-events-auto"
              key={navItem.href}
              href={navItem.href ?? ''}
            >
              {navItem.label}
            </Link>
          ))}
        </div>
      </ContentPadding>
    </div>
  );
}
