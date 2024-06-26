'use client';

import { GenericReactHTMLNode } from '@/types';
import { cn } from '@/utils/common';
import Link from 'next/link';
import { ContentPadding } from './ContentPadding';
import {
  GLOBAL_CONTENT_MAX_WIDTH_PX,
  GLOBAL_HEADER_HEIGHT,
} from '@/app/globals';
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
          <div className="h-[36px] py-2 rounded">
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

export function SimpleHeader({ navItems = [] }: { navItems?: Menu_Plain[] }) {
  return (
    <Header
      // className="sticky top-0 w-full z-[10] backdrop-blur-[14px] mix-blend-difference"
      className="sticky top-0 w-full z-[10] bg-black/65 backdrop-blur-[14px]"
      style={{
        height: GLOBAL_HEADER_HEIGHT,
        textRendering: 'geometricPrecision',
      }}
      // fullWidth
      navItems={navItems}
    />
  );
}

export function FloatingHeader({ navItems = [] }: { navItems?: Menu_Plain[] }) {
  return (
    <div
      className="sticky w-full z-[10] backdrop-blur-[16px] mix-blend-difference contrast-[1.8] brightness-[0.9] saturate-[0.2] overflow-hidden shadow-2xl shadow-black/10 bg-gray-200 bg-opacity-[0.125]"
      style={{
        maxWidth: `clamp(100px, ${GLOBAL_CONTENT_MAX_WIDTH_PX}px, calc(100vw - 32px))`,
        top: '6px',
        left: '6px',
        right: '6px',
        borderRadius: '8px',
        marginBottom: `6px`,
      }}
    >
      <Header
        // className="bg-gray-200 bg-opacity-[0.125]"
        style={{
          height: `calc(${GLOBAL_HEADER_HEIGHT} - 6px)`,
        }}
        navItems={navItems}
      />
    </div>
  );
}
